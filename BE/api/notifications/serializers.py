from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ('id', 'content', 'is_read', )
        read_only_fields = ('id', )
