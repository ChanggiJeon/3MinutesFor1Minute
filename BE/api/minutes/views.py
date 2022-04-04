from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Minute, Participant, Speech, SpeechComment, MinuteFile, SpeechFile
from community.models import Community, Member
from .serializers import (
    MinuteListSerializer,
    MinuteSerializer,
    CustomMinuteSerializer,
    SpeechSerializer,
    CustomSpeechSerializer,
    SpeechCommentSerializer
)
from community.serializers import MemberSerializer
import sys
sys.path.append('.')
from AI.STT.API.google import upload_file, transcribe_gcs
from AI.Summarization.summarize import summarize
from AI.Summarization.summarize import summary as summary_def
from AI.Wordslist.wordslist import wordslist
from config.settings import MEDIA_ROOT


def AI(file_path, file_name):
    upload_file(file_path, file_name)
    text = transcribe_gcs(file_name)
    title = summary_def(text)
    summary = summarize(text, ratio=0.4)
    cload_keyword = wordslist(text)
    return text, title, cload_keyword, summary


@api_view(['GET'])
def minute_list(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minutes = get_list_or_404(Minute, community=community)
    serializer = MinuteListSerializer(minutes, many=True)
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
        serializer = MinuteSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(community=community)
            minute = get_object_or_404(Minute, pk=serializer.data['id'])
            me = get_object_or_404(Member, user=request.user, community=community)
            member_ids = set(request.data['member_ids'])
            member_ids.add(me.id)

            for member_id in member_ids:
                if member_id == me.id:
                    assignee = Participant(member=me, minute=minute, is_assignee=True)
                    assignee.save()

                else:
                    member = get_object_or_404(Member, pk=member_id, community=community)
                    participant = Participant(member=member, minute=minute)
                    participant.save()
            for key, value in request.data.items():
                if 'reference_file' in key:
                    new_file = MinuteFile(minute=minute, reference_file=value)
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
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=MinuteSerializer)
@api_view(['PUT'])
def minute_update(request, community_pk, minute_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)
    assignee = minute.participant_set.get(is_assignee=True)

    if minute.is_closed:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    elif me == assignee.member or me.is_admin:
        serializer = MinuteSerializer(minute, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            minute = get_object_or_404(Minute, pk=serializer.data['id'])
            if minute.reference_file_set.all():
                past_files = minute.reference_file_set.all()
                for past_file in past_files:
                    past_file.delete()
            for key, value in request.data.items():
                if 'reference_file' in key:
                    new_file = MinuteFile(minute=minute, reference_file=value)
                    new_file.save()
            return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)

import mimetypes

from config.settings import MEDIA_ROOT
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage

@api_view(['GET'])
def minute_file_download(request,community_pk,minute_pk,reference_file_pk):
    reference_file = get_object_or_404(MinuteFile, pk=reference_file_pk)
    file_name = str(reference_file.reference_file)[7:]
    file_path = str(MEDIA_ROOT) + '/' +str(reference_file.reference_file)
    fl = open(file_path, 'rb')
    mime_types, _ = mimetypes.guess_type(file_path)
    response = HttpResponse(fl, content_type=mime_types)
    response['Content-Disposition'] = "attachment; filename=%s" % file_name
    return response

@swagger_auto_schema(method='POST', request_body=CustomSpeechSerializer)
@api_view(['POST'])
def speech_create(request, community_pk, minute_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)
    participant = me.participant_set.get(minute=minute)
    serializer = SpeechSerializer(data=request.data)

    if minute.is_closed:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    elif serializer.is_valid(raise_exception=True):
        serializer.save(minute=minute, participant=participant)
        speech = get_object_or_404(Speech, pk=serializer.data['id'])
        for key, value in request.data.items():
            if 'reference_file' in key:
                new_file = SpeechFile(speech=speech, reference_file=value)
                new_file.save()
        file = speech.record_file
        file_path = str(MEDIA_ROOT) + '\\record\\'
        file_name = str(file)[7:]
        text, title, cloud_keyword, summary = AI(file_path, file_name)
        # print('file: {}\n file_path: {}\n file_name:{}\n, text: {}\n title: {}\n cloud_keyword: {}\n summary: {}'.format(file, file_path, file_name, text, title, cloud_keyword, summary))
        serializer = SpeechSerializer(speech, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(content=text, title=title, cloud_keyword=cloud_keyword, summary=summary)
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

    if minute.is_closed:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    elif participant == speech.participant:
        speech.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=SpeechSerializer)
@api_view(['PUT'])
def speech_update(request, community_pk, minute_pk, speech_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minute = get_object_or_404(Minute, pk=minute_pk, community=community)
    speech = get_object_or_404(Speech, pk=speech_pk, minute=minute)
    me = get_object_or_404(Member, user=request.user, community=community)
    participant = me.participant_set.get(minute=minute)

    if minute.is_closed:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    elif participant == speech.participant:
        serializer = SpeechSerializer(speech, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            speech = get_object_or_404(Speech, pk=serializer.data['id'])
            if speech.reference_file_set.all():
                past_files = speech.reference_file_set.all()
                for past_file in past_files:
                    past_file.delete()
            for key, value in request.data.items():
                if 'reference_file' in key:
                    new_file = Speech(speech=speech, reference_file=value)
                    new_file.save()
            return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
def speech_file_download(request,community_pk, minute_pk,speech_pk,reference_file_pk):
    reference_file = get_object_or_404(SpeechFile, pk=reference_file_pk)
    file_name = str(reference_file.reference_file)[7:]
    file_path = str(MEDIA_ROOT) + '/' +str(reference_file.reference_file)
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
    return Response(status=status.HTTP_401_UNAUTHORIZED)


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
    return Response(status=status.HTTP_401_UNAUTHORIZED)
