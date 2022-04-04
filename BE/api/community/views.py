from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Community, Member
from .serializers import CommunitySerializer, MemberSerializer, CommunitySearchSerializer, CommunityDetailSerializer
from accounts.serializers import UserSerializer
import string
import random


# 1. 커뮤니티 생성
# 난수 생성 함수
def make_random_code():
    code_list = string.ascii_uppercase + '0123456789'
    code = ''

    for _ in range(10):
        code += random.choice(code_list)
    return code


@api_view(['GET'])
def community_list(request):
    members = get_list_or_404(Member, user=request.user)
    communities = [member.community for member in members]
    serializer = CommunitySearchSerializer(communities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def profile(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    member = get_object_or_404(Member, user=request.user, community=community)
    serializer = MemberSerializer(member)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CommunitySerializer)
@api_view(['POST'])
def community_create(request):
    while True:
        code = make_random_code()

        if not Community.objects.filter(private_code=code):
            break

    community_serializer = CommunitySerializer(data=request.data)

    if community_serializer.is_valid(raise_exception=True):
        community = community_serializer.save(private_code=code)
        member = Member()
        member.user = request.user
        member.community = community
        member.is_admin = True
        member.is_active = True
        member.nickname = request.user.name
        member.save()
        return Response(community_serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def uniquecheck_community_name(request, community_name):
    if not 5 <= len(community_name) <= 16:
        return Response({'error: 커뮤니티 명은 5자 이상 16자 이하로 정해야합니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if Community.objects.filter(name=community_name):
        return Response({'error: 커뮤니티 명이 중복됩니다.'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'response: 사용 가능한 이름입니다.'}, status=status.HTTP_200_OK)


# 2. 커뮤니티 가입 신청
@swagger_auto_schema(method='POST', request_body=MemberSerializer)
@api_view(['POST'])
def community_apply(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    serializer = MemberSerializer(data=request.data)

    if community.member_set.filter(user_id=request.user.pk).exists():
        return Response({'error: 이미 가입된 커뮤니티 입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid(raise_exception=True):
        if request.data.get('nickname'):
            serializer.save(user=request.user, community=community)

        else:
            serializer.save(user=request.user, community=community, nickname=request.user.name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({'error: 미입력된 정보가 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_for_code(request, code):
    code = code.upper()
    community = get_object_or_404(Community, private_code=code)

    if community:
        serializer = CommunitySearchSerializer(community)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'error: 해당 코드의 커뮤니티가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def search_for_name(request, keyword):
    communities = Community.objects.filter(name__icontains=keyword)

    if communities:
        serializers = CommunitySearchSerializer(communities, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    return Response('error: 해당 이름의 커뮤니티가 존재하지 않습니다.', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def uniquecheck_member_nickname(request, community_pk, nickname):
    if not 2 <= len(nickname) <= 16:
        return Response({'error: 닉네임은 2자 이상 16자 이하로 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    members = get_list_or_404(Member, community_id=community_pk)

    for member in members:
        if member.nickname == nickname:
            return Response({'error: 중복되는 닉네임이 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'response: 사용 가능한 닉네임입니다.'}, status=status.HTTP_200_OK)


@swagger_auto_schema(method='PUT', request_body=CommunitySerializer)
@api_view(['GET', 'PUT', 'DELETE'])
def community_detail_update_or_delete(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)

    if request.method == 'GET':
        serializer = CommunityDetailSerializer(community)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if not community.member_set.filter(is_admin=True, user_id=request.user.id):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'PUT':
        serializer = CommunitySerializer(instance=community, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        community.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def community_get_members(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    members = community.member_set.all()
    serializer = MemberSerializer(members, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# 가입 승인
@api_view(['GET'])
def members_get_waiting(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)

    if community.member_set.filter(user_id=request.user.id, is_admin=True):
        waiting_members = community.member_set.filter(is_active=False)
        serializer = MemberSerializer(waiting_members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PUT'])
def approve_waiting_member(request, community_pk, member_pk):
    community = get_object_or_404(Community, pk=community_pk)

    if community.member_set.filter(user_id=request.user.id, is_admin=True):
        waiting_member = get_object_or_404(Member, pk=member_pk)
        waiting_member.is_active = True
        ret = waiting_member.save()
        serializer = MemberSerializer(ret)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


# 구성원 초대
@api_view(['GET'])
def find_user(request, keyword):
    User = get_user_model()

    if keyword:
        users = User.objects.filter(username__icontains=keyword) | User.objects.filter(name__icontains=keyword)

    else:
        return Response({'error: 아이디 또는 닉네임을 검색해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    if not users:
        return Response({'error: 해당 유저가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def invite_user(request, community_pk, user_pk):
    community = get_object_or_404(Community, pk=community_pk)

    if community.member_set.filter(pk=user_pk):
        return Response({'error: 이미 가입한 사용자입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = MemberSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, community=community, nickname=request.user.name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# 멤버 조회 / 수정 / 삭제
@api_view(['GET'])
def member_detail(request, community_pk, member_pk):
    commnuity = get_object_or_404(Community, pk=community_pk)

    if not commnuity.member_set.filter(user_id=request.user.pk):
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    member = get_object_or_404(Member, pk=member_pk)
    serializer = MemberSerializer(member)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(method='PUT', request_body=MemberSerializer)
@api_view(['PUT'])
def member_update(request, community_pk, member_pk):
    community = get_object_or_404(Community, pk=community_pk)
    member = community.member_set.get(id=member_pk)

    if member.user != request.user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    serializer = MemberSerializer(instance=member, data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def member_delete(request, community_pk, member_pk):
    community = get_object_or_404(Community, pk=community_pk)
    member = get_object_or_404(Member, pk=member_pk)

    if community.member_set.filter(user_id=request.user.id):
        reporter = community.member_set.get(user_id=request.user.id)

        if reporter.is_admin == True or member_pk == reporter.id:
            member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
