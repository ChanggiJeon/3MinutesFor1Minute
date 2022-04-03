from rest_framework import serializers
from .models import Board, BoardComment, BoardFile
from community.serializers import CustomMemberSerializer


class BoardCommentSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer()

    class Meta:
        model = BoardComment
        fields = '__all__'
        read_only_fields = ('member', 'board', )


class BoardListSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer()

    class Meta:
        model = Board
        fields = '__all__'
        read_only_fields = ('member', 'community', )


class BoardSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer()
    board_comments = serializers.SerializerMethodField('bc_filter')

    def bc_filter(self, board):
        comments = BoardComment.objects.filter(board=board)
        serializer = BoardCommentSerializer(comments, many=True)
        return serializer.data

    class BoardFileSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = BoardFile
            fileds = '__all__'

    class Meta:
        model = Board
        fields = '__all__'
        read_only_fields = ('member', 'community', )
