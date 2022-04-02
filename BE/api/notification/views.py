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

@api_view(['GET'])
def notification_list():
    #해당 유저의 is_activate=True 인 notification 목록
    pass

@api_view(['GET'])
def notification_unread():
    #해당 유저, is_activate=True && is_read=false 인 notification 갯수 반납.
    pass

@api_view(['GET'])
def notification_detail():
    #알람 조회 is_read => True로 변경.
    pass

@api_view(['DELETE'])
def notification_delete():
    #알람 삭제
    pass