import string
import random
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import get_user_model

from .models import Community, Member

from .serializers import CommunitySerializer, MemberSerializer
# Create your views here.
# 난수 생성 함수
def make_random_code():
    code_list = string.ascii_letters + '0123456789'
    code = ''
    for i in range(10):
        code += random.choice(code_list)
    return code

@api_view(['POST'])
def community_create(request):
    while True:
        code = make_random_code()
        if not Community.objects.filter(private_code=code):
            break 
    community_serializer = CommunitySerializer(data=request.data)
    User = get_user_model()
    user = get_object_or_404(User, username=request.user)
    name = request.data.get('name')
    if not 5 <= len(name) <= 16:
        return Response('error: 커뮤니티 명은 5자 이상 16자 이하로 정해야합니다.', status=status.HTTP_400_BAD_REQUEST)
    if Community.objects.filter(name=name):
        return Response('error: 커뮤니티 명이 중복됩니다.', status=status.HTTP_400_BAD_REQUEST)
    if community_serializer.is_valid(raise_exception=True):
        community = community_serializer.save(private_code=code)
        member = Member()
        member.user = request.user
        member.community = community
        member.authority = True
        member.is_active = True
        member.nickname = user.nickname
        print(3)
        member.save()
        print(4)
        return Response(community_serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def community_detail_update_or_delete(request):
    pass