import string
import random
from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import get_user_model

from .models import Community, Member

from .serializers import CommunitySerializer, MemberSerializer, CommunitySearchSerializer
from community import serializers

# 1. 커뮤니티 생성
## 난수 생성 함수
def make_random_code():
    code_list = string.ascii_uppercase + '0123456789'
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
    if community_serializer.is_valid(raise_exception=True):
        community = community_serializer.save(private_code=code)
        member = Member()
        member.user = request.user
        member.community = community
        member.authority = True
        member.is_active = True
        member.nickname = user.nickname
        member.save()
        return Response(community_serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def uniquecheck_commnity_name(request):
    community_name = request.data.get('name')
    if not 5 <= len(community_name) <= 16:
        return Response('error: 커뮤니티 명은 5자 이상 16자 이하로 정해야합니다.', status=status.HTTP_400_BAD_REQUEST)
    if Community.objects.filter(name=community_name):
        return Response('error: 커뮤니티 명이 중복됩니다.', status=status.HTTP_400_BAD_REQUEST)
    return Response('complete: 사용 가능한 이름입니다.', status=status.HTTP_200_OK)

# 2. 커뮤니티 가입 신청
@api_view(['POST'])
def community_apply(request, community_pk):
    
    pass


@api_view(['GET'])
def search_for_code(request):
    code = request.data.get('private_code')
    code = code.upper()
    community = get_object_or_404(Community, private_code=code)
    member = community.member_set.all()
    if community:
        if member.filter(user_id=request.user.pk).exists():
            serializer = CommunitySearchSerializer(community)
        else:
            serializer = CommunitySearchSerializer(community)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response('error: 해당 코드의 커뮤니티가 존재하지 않습니다.', status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
def search_for_name(request):
    keyword = request.data.get('keyword')
    communities = Community.objects.filter(name__icontains=keyword)    
    if communities:
        serializers = CommunitySearchSerializer(communities, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    return Response('error: 해당 이름의 커뮤니티가 존재하지 않습니다.', status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def uniquecheck_member_nickname(request,community_pk):
    nickname = request.data.get('nickname')
    members = get_list_or_404(Member, community_id=community_pk)
    for member in members:
        if member.nickname == nickname:
            return Response('error: 중복되는 닉네임이 있습니다.', status=status.HTTP_400_BAD_REQUEST)
    return Response('complete: 사용 가능한 닉네임입니다.', status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
def community_detail_update_or_delete(request):
    pass