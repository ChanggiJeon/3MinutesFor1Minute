from rest_framework import serializers
from .models import Notification


class NotificationListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ('is_read','content','speech')


