from rest_framework import serializers
from .models import Board, BoardComment, BoardFile
from community.serializers import CustomMemberSerializer


class BoardFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = BoardFile
        fields = '__all__'
        read_only_fields = ('board', )


class BoardCommentSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer(read_only=True)

    class Meta:
        model = BoardComment
        fields = '__all__'
        read_only_fields = ('member', 'board', )


class CustomBoardCommentSerializer(BoardCommentSerializer):

    class Meta:
        model = BoardComment
        fields = ('content', )


class BoardListSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer(read_only=True)

    class Meta:
        model = Board
        fields = '__all__'
        read_only_fields = ('member', 'community', )


class BoardSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer(read_only=True)
    boardfile_set = BoardFileSerializer(many=True, read_only=True)
    board_comments = serializers.SerializerMethodField('bc_filter')

    def bc_filter(self, board):
        comments = BoardComment.objects.filter(board=board)
        serializer = BoardCommentSerializer(comments, many=True)
        return serializer.data

    class Meta:
        model = Board
        fields = '__all__'
        read_only_fields = ('member', 'community', )


class CustomBoardSerializer(BoardSerializer):
    boardfile_set = BoardFileSerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields = ('title', 'content', 'is_notice', )
