from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Board, BoardComment
from community.models import Community, Member
from .serializers import BoardListSerializer, BoardSerializer, BoardCommentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def board_list(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    boards = get_list_or_404(Board, community=community)
    serializer = BoardListSerializer(boards, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=BoardSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def board_create(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    me = get_object_or_404(Member, user=request.user, community=community)
    serializer = BoardSerializer(data=request.data)
    print('1')
    print(serializer)

    if serializer.is_valid(raise_exception=True):
        serializer.save(member=me, community=community)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def board_detail(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    serializer = BoardSerializer(board)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def board_delete(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == board.member or me.is_admin:
        board.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=BoardSerializer)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def board_update(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == board.member or me.is_admin:
        serializer = BoardSerializer(board, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='POST', request_body=BoardCommentSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def board_comment_create(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)
    serializer = BoardCommentSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(member=me, board=board)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def board_comment_delete(request, community_pk, board_pk, comment_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == board.member or me.is_admin:
        comment = get_object_or_404(BoardComment, pk=comment_pk, board=board)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=BoardCommentSerializer)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def board_comment_update(request, community_pk, board_pk, comment_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == board.member or me.is_admin:
        comment = get_object_or_404(BoardComment, pk=comment_pk, board=board)
        serializer = BoardCommentSerializer(comment, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
