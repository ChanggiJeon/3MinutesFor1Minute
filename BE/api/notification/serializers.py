from rest_framework import serializers
from .models import Notification
from minutes.models import Minute
from minutes.serializers import MinuteSerializer


class NotificationListSerializer(serializers.ModelSerializer):
    deadline = serializers.SerializerMethodField('deadline_detect')

    def deadline_detect(self, minute):
        deadline = Minute.objects.get(minute=minute).deadline
        serializer = MinuteSerializer(deadline, many=True)
        return serializer.data

    class Meta:
        model = Notification
        fields = ('id', 'is_read', 'content', 'deadline', )
        read_only_field = ('id', )
