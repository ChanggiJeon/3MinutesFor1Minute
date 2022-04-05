from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from minutes.models import Minute
from .serializers import NotificationSerializer


# 해당 유저의 is_activate=True 인 notification 목록
@api_view(['GET'])
def notification_list(request):
    notifications = Notification.objects.filter(user=request.user, is_activate=True)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)


# 해당 유저, is_activate=True && is_read=false 인 notification 갯수 반납
@api_view(['GET'])
def notification_unread(request):
    notifications = Notification.objects.filter(user=request.user, is_activate=True, is_read=False)
    len_notifications = len(notifications)
    return Response({'response': len_notifications})


# 알람 조회 is_read => True로 변경
@api_view(['GET'])
def notification_detail(request, notification_pk):
    notification = get_object_or_404(Notification, pk=notification_pk)
    notification.is_read = True
    notification.save()
    minute = get_object_or_404(Minute, pk=notification.minute.id)
    return Response({'community_id': minute.community.id, 'minute_id': notification.minute.id})


# 알람 삭제
@api_view(['DELETE'])
def notification_delete(request, notification_pk):
    notification = get_object_or_404(Notification, pk=notification_pk)
    notification.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
