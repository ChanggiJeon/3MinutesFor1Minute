from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Board, BoardComment, BoardFile
from community.models import Community, Member
from .serializers import (
    BoardListSerializer,
    BoardSerializer,
    CustomBoardSerializer,
    BoardCommentSerializer,
    CustomBoardCommentSerializer
)


@api_view(['GET'])
def board_list(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    boards = Board.objects.filter(community=community)
    serializer = BoardListSerializer(boards, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CustomBoardSerializer)
@api_view(['POST'])
def board_create(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    me = get_object_or_404(Member, user=request.user, community=community)
    serializer = BoardSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(member=me, community=community)
        board = get_object_or_404(Board, pk=serializer.data['id'])

        for key, value in request.data.items():
            if 'reference_file' in key:
                new_file = BoardFile(board=board, filename=str(value), reference_file=value)
                new_file.save()

        serializer = BoardSerializer(board)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def board_detail(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    serializer = BoardSerializer(board)
    return Response(serializer.data)


@api_view(['DELETE'])
def board_delete(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == board.member or me.is_admin:
        board.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=CustomBoardSerializer)
@api_view(['PUT'])
def board_update(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == board.member or me.is_admin:
        serializer = BoardSerializer(board, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            board = get_object_or_404(Board, pk=serializer.data['id'])

            if board.boardfile_set.all():
                past_files = board.boardfile_set.all()

                for past_file in past_files:
                    past_file.delete()

            for key, value in request.data.items():
                if 'reference_file' in key:
                    new_file = BoardFile(board=board, filename=str(value), reference_file=value)
                    new_file.save()

            serializer = BoardSerializer(board)
            return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


from config.settings import MEDIA_ROOT
from django.http import HttpResponse
import mimetypes


@api_view(['GET'])
def board_file_download(request, community_pk, board_pk, reference_file_pk):
    reference_file = get_object_or_404(BoardFile, pk=reference_file_pk)
    file_name = str(reference_file.reference_file)[7:]
    file_path = str(MEDIA_ROOT) + '/' + str(reference_file.reference_file)
    fl = open(file_path, 'rb')
    mime_types, _ = mimetypes.guess_type(file_path)
    response = HttpResponse(fl, content_type=mime_types)
    response['Content-Disposition'] = "attachment; filename=%s" % file_name
    return response


@swagger_auto_schema(method='POST', request_body=CustomBoardCommentSerializer)
@api_view(['POST'])
def board_comment_create(request, community_pk, board_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)
    serializer = BoardCommentSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(member=me, board=board)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def board_comment_delete(request, community_pk, board_pk, comment_pk):
    community = get_object_or_404(Community, pk=community_pk)
    board = get_object_or_404(Board, pk=board_pk, community=community)
    me = get_object_or_404(Member, user=request.user, community=community)

    if me == board.member or me.is_admin:
        comment = get_object_or_404(BoardComment, pk=comment_pk, board=board)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=CustomBoardCommentSerializer)
@api_view(['PUT'])
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
