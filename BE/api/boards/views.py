from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Board, BoardComment
from community.models import Community, Member
from .serializers import BoardListSerializer, BoardSerializer, BoardCommentSerializer


@api_view(['GET', 'POST'])
def board_list(request, community_pk):
    if request.method == 'GET':
        community = get_object_or_404(Community, pk=community_pk)
        boards = get_list_or_404(Board, community=community)
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
def board_detail(request, community_pk, board_pk):
    board = get_object_or_404(Board, pk=board_pk)
    me = get_object_or_404(Member, user=request.user)

    if request.method == 'GET':
        serializer = BoardSerializer(board)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        if me == board.member or me.is_admin:
            board.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        if me == board.member or me.is_admin:
            serializer = BoardSerializer(board, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST', 'DELETE', 'PUT'])
def board_comment(request, community_pk, board_pk, comment_pk=None):
    board = get_object_or_404(Board, pk=board_pk)
    me = get_object_or_404(Member, user=request.user)

    if request.method == 'POST':
        board = get_object_or_404(Board, pk=board_pk)
        serializer = BoardCommentSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(member=me, board=board)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        if me == board.member or me.is_admin:
            comment = get_object_or_404(BoardComment, pk=comment_pk)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        if me == board.member or me.is_admin:
            comment = get_object_or_404(BoardComment, pk=comment_pk)
            serializer = BoardCommentSerializer(comment, data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
