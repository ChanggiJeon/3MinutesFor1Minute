from ctypes import sizeof
from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from community.models import Community, Member
from .serializers import (

)
from community.serializers import MemberSerializer

#해당 유저의 is_activate=True 인 notification 목록
@api_view(['GET'])
def notification_list(request):
    user = request.user
    notifications = get_list_or_404(Notification, user=user, is_activate=True)
    
    pass

#해당 유저, is_activate=True && is_read=false 인 notification 갯수 반납.
@api_view(['GET'])
def notification_unread(request):
    user = request.user
    notifications = get_list_or_404(Notification, user=user, is_read=False, is_activate=True)
    new_notifications = len(notifications)
    return Response({'response: {}'.format(new_notifications)})

@api_view(['GET'])
def notification_detail():
    #알람 조회 is_read => True로 변경.
    pass

@api_view(['DELETE'])
def notification_delete():
    #알람 삭제
    pass