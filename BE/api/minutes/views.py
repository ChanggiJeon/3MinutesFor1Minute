from django.shortcuts import get_list_or_404, get_object_or_404
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


@api_view(['GET', 'POST'])
def minute_create(request, community_pk):
    if request.method == 'GET':
        community = get_object_or_404(Community, pk=community_pk)
        members = community.member_set.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MinuteSerializer(data=request.data.minute)
        me = get_object_or_404(Member, user=request.user)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            minute = get_object_or_404(Minute, pk=serializer.data['id'])

            for nickname in request.data.nicknames:
                if me.nickname == nickname:
                    participant = Participant(minute=minute, is_assignee=True)

                else:
                    participant = Participant(minute=minute)
                participant.save()
            serializer = MinuteSerializer(minute)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def minute_detail(request, community_pk, minute_pk):
    minute = get_object_or_404(Minute, pk=minute_pk)
    me = get_object_or_404(Member, user=request.user)
    assignee = minute.participant_set.filter(is_assignee=True)

    if request.method == 'GET':
        serializer = MinuteSerializer(minute)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        if me == assignee.member or me.is_admin:
            minute.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        if minute.is_closed:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            if me == assignee.member or me.is_admin:
                serializer = MinuteSerializer(minute, data=request.data)

                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def speech(request, community_pk, minute_pk, speech_pk=None):
    if request.method == 'GET':
        speech = get_object_or_404(Speech, pk=speech_pk)
        serializer = SpeechSerializer(speech)
        return Response(serializer.data)

    else:
        minute = get_object_or_404(Minute, pk=minute_pk)
        me = get_object_or_404(Member, user=request.user)
        assignee = minute.participant_set.filter(is_assignee=True)

        if minute.is_closed:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            if request.method == 'POST':
                participant = get_object_or_404(Participant, pk=request.user.id)
                serializer = SpeechCommentSerializer(data=request.data)

                if serializer.is_valid(raise_exception=True):
                    serializer.save(minute=minute, participant=participant)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

            elif request.method == 'DELETE':
                if me == assignee.member or me.is_admin:
                    speech = get_object_or_404(Speech, pk=speech_pk)
                    speech.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)

            elif request.method == 'PUT':
                if me == assignee.member or me.is_admin:
                    speech = get_object_or_404(Speech, pk=speech_pk)
                    serializer = SpeechCommentSerializer(speech, data=request.data)

                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
                        return Response(serializer.data)
            return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST', 'DELETE', 'PUT'])
def speech_comment(request, community_pk, minute_pk, speech_pk, comment_pk=None):
    me = get_object_or_404(Member, user=request.user)

    if request.method == 'POST':
        speech = get_object_or_404(Speech, pk=speech_pk)
        serializer = SpeechCommentSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(speech=speech)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        comment = get_object_or_404(SpeechComment, pk=comment_pk)

        if me == comment.member or me.is_admin:
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        comment = get_object_or_404(SpeechComment, pk=comment_pk)

        if me == comment.member or me.is_admin:
            serializer = SpeechCommentSerializer(comment, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
