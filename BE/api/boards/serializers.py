from rest_framework import serializers
from .models import Board, BoardComment


class BoardCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = BoardComment
        fields = '__all__'
        read_only_fields = ('member', 'board', )


class BoardListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ('id', 'member', 'title', 'is_notice', )
        read_only_fields = ('id', 'member', )


class BoardSerializer(serializers.ModelSerializer):
    board_comments = serializers.SerializerMethodField('bc_filter')

    def bc_filter(self, board):
        comments = BoardComment.objects.filter(board=board)
        serializer = BoardCommentSerializer(comments, many=True)
        return serializer.data

    class Meta:
        model = Board
        fields = '__all__'
        read_only_fields = ('member', 'community', )
