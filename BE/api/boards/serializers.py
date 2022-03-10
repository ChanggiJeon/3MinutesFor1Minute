from rest_framework import serializers
from .models import Board, BoardComment


class BoardCommentSerializer(serializers.ModelSerializer):
    comments_filter = serializers.SerializerMethodField('filt')

    def filt(self, comment):
        comments = BoardComment.objects.filter(parent=comment)
        serializer = BoardCommentSerializer(comments, many=True)
        return serializer.data

    class Meta:
        model = BoardComment
        fields = '__all__'
        read_only_fields = ('board', )


class BoardListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ('id', 'title', 'is_notice', )


class BoardSerializer(serializers.ModelSerializer):
    comments_filter = serializers.SerializerMethodField('filt')

    def filt(self, board):
        comments = BoardComment.objects.filter(board=board)
        serializer = BoardCommentSerializer(comments, many=True)
        return serializer.data

    class Meta:
        model = Board
        fields = '__all__'
