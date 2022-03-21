from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Board, BoardComment
from community.models import Member
from .serializers import BoardListSerializer, BoardSerializer, BoardCommentSerializer


@api_view(['GET', 'POST'])
def board_list(request):
    if request.method == 'GET':
        boards = get_list_or_404(Board)
        serializer = BoardListSerializer(boards, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BoardSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            member = get_object_or_404(Member, user=request.user)
            community = member.community
            serializer.save(member=member, community=community)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def board_detail(request, board_pk):
    member = get_object_or_404(Member, user=request.user)
    board = get_object_or_404(Board, pk=board_pk)

    if request.method == 'GET':
        serializer = BoardSerializer(board)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        if member.user == request.user:
            board.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        if member.user == request.user:
            serializer = BoardSerializer(board, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)


@api_view(['POST', 'DELETE', 'PUT'])
def board_comment(request, board_pk, comment_pk=None):
    member = get_object_or_404(Member, user=request.user)

    if request.method == 'POST':
        board = get_object_or_404(Board, pk=board_pk)
        serializer = BoardCommentSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(member=member, board=board)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        if member.user == request.user:
            comment = get_object_or_404(BoardComment, pk=comment_pk)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        if member.user == request.user:
            comment = get_object_or_404(BoardComment, pk=comment_pk)
            serializer = BoardCommentSerializer(comment, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
