from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Minute, Participant, Speech, SpeechComment
from community.models import Community, Member
from .serializers import MinuteListSerializer, MinuteSerializer, SpeechSerializer, SpeechCommentSerializer
from community.serializers import MemberSerializer


@api_view(['GET'])
def minute_list(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    minutes = get_list_or_404(Minute, community=community)
    serializer = MinuteListSerializer(minutes, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=MinuteSerializer)
@api_view(['GET', 'POST'])
def minute_create(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)

    if request.method == 'GET':
        members = community.member_set.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if request.user.id:
            serializer = MinuteSerializer(data=request.data.minute)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                minute = get_object_or_404(Minute, pk=serializer.data['id'])
                me = get_object_or_404(Member, user=request.user, community=community)

                for nickname in request.data.nicknames:
                    if me.nickname == nickname:
                        participant = Participant(minute=minute, is_assignee=True)

                    else:
                        participant = Participant(minute=minute)
                    participant.save()
                serializer = MinuteSerializer(minute)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def minute_detail(request, community_pk, minute_pk):
    minute = get_object_or_404(Minute, pk=minute_pk)
    serializer = MinuteSerializer(minute)
    return Response(serializer.data)


@api_view(['DELETE'])
def minute_delete(request, community_pk, minute_pk):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        minute = get_object_or_404(Minute, pk=minute_pk)
        me = get_object_or_404(Member, user=request.user, community=community)
        assignee = minute.participant_set.filter(is_assignee=True)

        if me == assignee.member or me.is_admin:
            minute.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=MinuteSerializer)
@api_view(['PUT'])
def minute_update(request, community_pk, minute_pk):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        minute = get_object_or_404(Minute, pk=minute_pk)
        me = get_object_or_404(Member, user=request.user, community=community)
        assignee = minute.participant_set.filter(is_assignee=True)

        if minute.is_closed:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        elif me == assignee.member or me.is_admin:
            serializer = MinuteSerializer(minute, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='POST', request_body=SpeechSerializer)
@api_view(['POST'])
def speech_create(request, community_pk, minute_pk, speech_pk=None):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        minute = get_object_or_404(Minute, pk=minute_pk)
        me = get_object_or_404(Member, user=request.user, community=community)
        participant = me.participant_set.filter(minute=minute)
        serializer = SpeechSerializer(data=request.data)

        if minute.is_closed:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        elif serializer.is_valid(raise_exception=True):
            serializer.save(minute=minute, participant=participant)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def speech_detail(request, community_pk, minute_pk, speech_pk):
    speech = get_object_or_404(Speech, pk=speech_pk)
    serializer = SpeechSerializer(speech)
    return Response(serializer.data)


@api_view(['DELETE'])
def speech_delete(request, community_pk, minute_pk, speech_pk=None):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        minute = get_object_or_404(Minute, pk=minute_pk)
        speech = get_object_or_404(Speech, pk=speech_pk)
        me = get_object_or_404(Member, user=request.user, community=community)
        participant = me.participant_set.filter(minute=minute)

        if minute.is_closed:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        elif participant == speech.participant:
            speech.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=SpeechSerializer)
@api_view(['PUT'])
def speech_update(request, community_pk, minute_pk, speech_pk=None):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        minute = get_object_or_404(Minute, pk=minute_pk)
        speech = get_object_or_404(Speech, pk=speech_pk)
        me = get_object_or_404(Member, user=request.user, community=community)
        participant = me.participant_set.filter(minute=minute)

        if minute.is_closed:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        elif participant == speech.participant:
            serializer = SpeechSerializer(speech, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='POST', request_body=SpeechCommentSerializer)
@api_view(['POST'])
def speech_comment_create(request, community_pk, minute_pk, speech_pk, comment_pk=None):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        speech = get_object_or_404(Speech, pk=speech_pk)
        me = get_object_or_404(Member, user=request.user, community=community)
        serializer = SpeechCommentSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(member=me, speech=speech)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def speech_comment_delete(request, community_pk, minute_pk, speech_pk, comment_pk=None):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        comment = get_object_or_404(SpeechComment, pk=comment_pk)
        me = get_object_or_404(Member, user=request.user, community=community)

        if me == comment.member:
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=SpeechCommentSerializer)
@api_view(['PUT'])
def speech_comment_update(request, community_pk, minute_pk, speech_pk, comment_pk=None):
    if request.user.id:
        community = get_object_or_404(Community, pk=community_pk)
        comment = get_object_or_404(SpeechComment, pk=comment_pk)
        me = get_object_or_404(Member, user=request.user, community=community)

        if me == comment.member:
            serializer = SpeechCommentSerializer(comment, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
