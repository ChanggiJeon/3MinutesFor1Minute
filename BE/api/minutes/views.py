from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Minute, Participant, Speech, SpeechComment, MinuteFile, SpeechFile
from community.models import Community, Member
from notifications.models import Notification
from .serializers import (
    MinuteListSerializer,
    MinuteSerializer,
    CustomMinuteSerializer,
    MinuteCloseSerializer,
    SpeechSerializer,
    CustomSpeechSerializer,
    SpeechCommentSerializer
)
from community.serializers import MemberSerializer
import sys
sys.path.append('.')
from AI.STT.API.google import upload_file, transcribe_gcs
from AI.Summarization.summarize import summary as summary_def
from AI.Wordslist.wordslist import wordslist
from config.settings import MEDIA_ROOT
import datetime


def AI(file_path, file_name):
    upload_file(file_path, file_name)
    text = transcribe_gcs(file_name)

    if len(text) <= 5:
        raise Exception

    elif len(text) <= 300:
        summary = "전문이 300자 이하일때는 title과 summary가 제공되지 않습니다."

    else:
        summary = summary_def(text)

    cload_keyword = wordslist(text)
    return text, summary, cload_keyword


@api_view(['GET'])
def minute_list(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minutes = Minute.objects.filter(community=community)
    serializer = MinuteListSerializer(minutes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def minute_main(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    me = get_object_or_404(Member, user=request.user, community=community)
    participants = me.participant_set.all()
    minutes = []

    for participant in participants:
        if participant.minute.deadline > datetime.datetime.now():
            minutes.append(participant.minute)

    minutes_main = sorted(minutes, key=lambda x: x.deadline)[0:3]
    serializer = MinuteListSerializer(minutes_main, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CustomMinuteSerializer)
@api_view(['GET', 'POST'])
def minute_create(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)

    if request.method == 'GET':
        members = Member.objects.exclude(user=request.user)
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if datetime.datetime.strptime(request.data['deadline'], '%Y-%m-%dT%H:%M') <= datetime.datetime.now():
            return Response({'error: 잘못된 등록 마감 시간'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = MinuteSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(community=community)
            minute = get_object_or_404(Minute, pk=serializer.data['id'])
            me = get_object_or_404(Member, user=request.user, community=community)
            member_ids = set([me.id])

            if 'member_ids' in request.data and request.data['member_ids']:
                member_ids.update(request.data['member_ids'].split(','))

            for member_id in member_ids:
                if member_id == me.id:
                    assignee = Participant(member=me, minute=minute, is_assignee=True)
                    assignee.save()
                    notification = Notification(
                        user=me.user,
                        minute=minute,
                        content=f'{me.nickname}님께서 주최하신 {minute.title} 회의가 정상적으로 등록되었습니다.',
                        is_activate=True
                    )

                    notification.save()

                    notification_deadline = Notification(
                        user=me.user,
                        minute=minute,
                        content=f'{minute.title} 회의의 스피치 등록 마감이 1시간 남았습니다.',
                        is_activate=False
                    )

                    notification_deadline.save()

                else:
                    member = get_object_or_404(Member, pk=member_id, community=community)
                    participant = Participant(member=member, minute=minute)
                    participant.save()
                    notification = Notification(
                        user=member.user,
                        minute=minute,
                        content=f'{me.nickname}님께서 {member.nickname}님을 {minute.title} 회의의 참여자로 등록하였습니다.',
                        is_activate=True
                    )

                    notification.save()

                    notification_deadline = Notification(
                        user=member.user,
                        minute=minute,
                        content=f'{minute.title} 회의의 스피치 등록 마감이 1시간 남았습니다.',
                        is_activate=False
                    )

                    notification_deadline.save()

            for key, value in request.data.items():
                if 'reference_file' in key:
                    new_file = MinuteFile(minute=minute, filename=str(value), reference_file=value)
                    new_file.save()

            serializer = MinuteSerializer(minute)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def minute_detail(request, community_pk, minute_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    serializer = MinuteSerializer(minute)
    return Response(serializer.data)


@api_view(['DELETE'])
def minute_delete(request, community_pk, minute_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk)
    me = get_object_or_404(Member, user=request.user, community=community)
    assignee = minute.participant_set.get(is_assignee=True)

    if me == assignee.member or me.is_admin:
        minute.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'error: 권한 없음'}, status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=MinuteSerializer)
@api_view(['PUT'])
def minute_update(request, community_pk, minute_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)
    assignee = minute.participant_set.get(is_assignee=True)
    old_deadline = minute.deadline

    if 'deadline' in request.data and old_deadline != request.data['deadline'] \
        and datetime.datetime.strptime(request.data['deadline'], '%Y-%m-%dT%H:%M') <= datetime.datetime.now():
        return Response({'error: 잘못된 등록 마감 시간'}, status=status.HTTP_400_BAD_REQUEST)

    elif me == assignee.member or me.is_admin:
        serializer = MinuteSerializer(minute, data=request.data)
        participants = get_list_or_404(Participant, minute=minute)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            if minute.minutefile_set.all():
                past_files = minute.minutefile_set.all()

                for past_file in past_files:
                    past_file.delete()

            for key, value in request.data.items():
                if 'reference_file' in key:
                    new_file = MinuteFile(minute=minute, filename=str(value), reference_file=value)
                    new_file.save()

            if 'deadline' in request.data and old_deadline != request.data['deadline']:
                notifications = get_list_or_404(Notification, minute=minute, is_activate=False)

                if not notifications:
                    for participant in participants:
                        notification_deadline = Notification(
                            user=participant.member.user,
                            minute=minute,
                            content=f'{minute.title} 회의의 스피치 등록 마감이 1시간 남았습니다.',
                            is_activate=False
                        )

                        notification_deadline.save()

                for participant in participants:
                    notification_alarm = Notification(
                        user=participant.member.user,
                        minute=minute,
                        content=f'{minute.title} 회의의 스피치 등록 마감 시간이 변경되었습니다.',
                        is_activate=True
                    )

                    notification_alarm.save()
            serializer = MinuteSerializer(minute)
            return Response(serializer.data)
    return Response({'error: 권한 없음'}, status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=MinuteCloseSerializer)
@api_view(['PUT'])
def minute_close(request, community_pk, minute_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)
    assignee = minute.participant_set.get(is_assignee=True)

    if me == assignee.member or me.is_admin:
        serializer = MinuteCloseSerializer(minute, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            participants = get_list_or_404(Participant, minute=minute)

            for participant in participants:
                notification = Notification(
                    user=participant.member.user,
                    minute=minute,
                    content=f'{me.nickname}님께서 {minute.title} 회의를 종료하였습니다.',
                    is_activate=True
                )

                notification.save()
            serializer = MinuteSerializer(minute)
            return Response(serializer.data)
    return Response({'error: 권한 없음'}, status=status.HTTP_401_UNAUTHORIZED)


from config.settings import MEDIA_ROOT
from django.http import HttpResponse
import mimetypes


@api_view(['GET'])
def minute_file_download(request, community_pk, minute_pk, reference_file_pk):
    reference_file = get_object_or_404(MinuteFile, pk=reference_file_pk)
    file_name = reference_file.filename
    file_path = str(MEDIA_ROOT) + '/' + str(reference_file.reference_file)
    fl = open(file_path, 'rb')
    mime_types, _ = mimetypes.guess_type(file_path)
    response = HttpResponse(fl, content_type=mime_types)
    response['Content-Disposition'] = "attachment; filename=%s" % file_name
    return response


@api_view(['POST'])
def speech_create(request, community_pk, minute_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)

    if minute.is_closed or minute.deadline < datetime.datetime.now():
        return Response({'error: 종료된 회의'}, status=status.HTTP_400_BAD_REQUEST)

    me = get_object_or_404(Member, user=request.user, community=community)
    participant = get_object_or_404(Participant, member=me, minute=minute)

    if Speech.objects.filter(participant=participant).exists():
        return Response({'error: 이미 스피치 존재'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = SpeechSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(minute=minute, participant=participant)
        speech = get_object_or_404(Speech, pk=serializer.data['id'])

        for key, value in request.data.items():
            if 'reference_file' in key:
                new_file = SpeechFile(speech=speech, filename=str(value), reference_file=value)
                new_file.save()

        try: 
            file = speech.record_file
            file_path = str(MEDIA_ROOT) + f'/recordfile/{minute.pk}/'
            file_name = str(file).split('/')[-1]
            voice_text, summary, cloud_keyword = AI(file_path, file_name)

        except:
            speech.delete()
            return Response({'error: 잘못된 녹음'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = SpeechSerializer(speech, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(voice_text=voice_text, summary=summary, cloud_keyword=cloud_keyword)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def speech_detail(request, community_pk, minute_pk, speech_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    speech = get_object_or_404(Speech, pk=speech_pk, minute=minute)
    serializer = SpeechSerializer(speech)
    return Response(serializer.data)


@api_view(['DELETE'])
def speech_delete(request, community_pk, minute_pk, speech_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    speech = get_object_or_404(Speech, pk=speech_pk, minute=minute)
    me = get_object_or_404(Member, user=request.user, community=community)
    participant = me.participant_set.get(minute=minute)

    if minute.is_closed or minute.deadline < datetime.datetime.now():
        return Response(status=status.HTTP_400_BAD_REQUEST)

    elif participant == speech.participant:
        speech.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=CustomSpeechSerializer)
@api_view(['PUT'])
def speech_update(request, community_pk, minute_pk, speech_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    speech = get_object_or_404(Speech, pk=speech_pk, minute=minute)
    me = get_object_or_404(Member, user=request.user, community=community)
    participant = me.participant_set.get(minute=minute)

    if minute.is_closed or minute.deadline < datetime.datetime.now() or not request.data['title']:
        return Response({'error: 종료된 회의'}, status=status.HTTP_400_BAD_REQUEST)

    elif participant == speech.participant:
        serializer = SpeechSerializer(speech, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            speech = get_object_or_404(Speech, pk=serializer.data['id'])

            if speech.speechfile_set.all():
                past_files = speech.speechfile_set.all()

                for past_file in past_files:
                    past_file.delete()

            for key, value in request.data.items():
                if 'reference_file' in key:
                    new_file = SpeechFile(speech=speech, filename=str(value), reference_file=value)
                    new_file.save()

            serializer = SpeechSerializer(speech)
            return Response(serializer.data)
    return Response({'error: 권한 없음'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def speech_file_download(request, community_pk, minute_pk, speech_pk, reference_file_pk):
    reference_file = get_object_or_404(SpeechFile, pk=reference_file_pk)
    file_name = reference_file.filename
    file_path = str(MEDIA_ROOT) + '/' + str(reference_file.reference_file)
    fl = open(file_path, 'rb')
    mime_types, _ = mimetypes.guess_type(file_path)
    response = HttpResponse(fl, content_type=mime_types)
    response['Content-Disposition'] = "attachment; filename=%s" % file_name
    return response


@swagger_auto_schema(method='POST', request_body=SpeechCommentSerializer)
@api_view(['POST'])
def speech_comment_create(request, community_pk, minute_pk, speech_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    speech = get_object_or_404(Speech, pk=speech_pk, minute=minute)
    me = get_object_or_404(Member, user=request.user, community=community)
    serializer = SpeechCommentSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(member=me, speech=speech)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def speech_comment_delete(request, community_pk, minute_pk, speech_pk, comment_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    speech = get_object_or_404(Speech, pk=speech_pk, minute=minute)
    comment = get_object_or_404(SpeechComment, pk=comment_pk, speech=speech)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == comment.member:
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'error: 권한 없음'}, status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=SpeechCommentSerializer)
@api_view(['PUT'])
def speech_comment_update(request, community_pk, minute_pk, speech_pk, comment_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    speech = get_object_or_404(Speech, pk=speech_pk, minute=minute)
    comment = get_object_or_404(SpeechComment, pk=comment_pk, speech=speech)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == comment.member:
        serializer = SpeechCommentSerializer(comment, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    return Response({'error: 권한 없음'}, status=status.HTTP_401_UNAUTHORIZED)
