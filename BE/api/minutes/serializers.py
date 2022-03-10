from rest_framework import serializers
from .models import Minute, MinuteComment


class MinuteCommentSerializer(serializers.ModelSerializer):
    comments_filter = serializers.SerializerMethodField('filt')

    def filt(self, comment):
        comments = MinuteComment.objects.filter(parent=comment)
        serializer = MinuteCommentSerializer(comments, many=True)
        return serializer.data

    class Meta:
        model = MinuteComment
        fields = '__all__'
        read_only_fields = ('minute', )


class MinuteListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Minute
        fields = ('id', 'title', 'created_at', )


class MinuteSerializer(serializers.ModelSerializer):
    comments_filter = serializers.SerializerMethodField('filt')

    def filt(self, minute):
        comments = MinuteComment.objects.filter(minute=minute)
        serializer = MinuteCommentSerializer(comments, many=True)
        return serializer.data

    class Meta:
        model = Minute
        fields = '__all__'
