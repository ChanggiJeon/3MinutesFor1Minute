from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Minute, MinuteComment
from .serializers import MinuteListSerializer, MinuteSerializer, MinuteCommentSerializer


@api_view(['GET', 'POST'])
def minute_list(request):
    if request.method == 'GET':
        minutes = get_list_or_404(Minute)
        serializer = MinuteListSerializer(minutes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MinuteSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def minute_detail(request, minute_pk):
    minute = get_object_or_404(Minute, pk=minute_pk)

    if request.method == 'GET':
        serializer = MinuteSerializer(minute)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        minute.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = MinuteSerializer(minute, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['POST', 'DELETE', 'PUT'])
def minute_comment(request, minute_pk, comment_pk=None):
    if request.method == 'POST':
        minute = get_object_or_404(Minute, pk=minute_pk)
        serializer = MinuteCommentSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(minute=minute)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        comment = get_object_or_404(MinuteComment, pk=comment_pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        comment = get_object_or_404(MinuteComment, pk=comment_pk)
        serializer = MinuteCommentSerializer(comment, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
