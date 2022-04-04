from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .serializers import NotificationListSerializer


# 해당 유저의 is_activate=True 인 notification 목록
@api_view(['GET'])
def notification_list(request):
    notifications = get_list_or_404(Notification, user=request.user.pk, is_activate=True)
    serializer = NotificationListSerializer(notifications, many=True)
    return serializer.data


# 해당 유저, is_activate=True && is_read=false 인 notification 갯수 반납
@api_view(['GET'])
def notification_unread(request):
    notifications = get_list_or_404(Notification, user=request.user.pk, is_activate=True, is_read=False)
    len_notifications = len(notifications)
    return Response({f'complete: {len_notifications}'})


@api_view(['GET'])
def notification_detail(request, notification_pk):
    # 알람 조회 is_read => True로 변경
    notification = get_object_or_404(Notification, pk=notification_pk)
    serializer = NotificationListSerializer(notification)
    serializer.save(is_read=True)
    return serializer.data


@api_view(['DELETE'])
def notification_delete(request, notification_pk):
    # 알람 삭제
    notification = get_object_or_404(Notification, pk=notification_pk)
    notification.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
