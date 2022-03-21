import re

from django.shortcuts import get_object_or_404, render

# rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import get_user_model
from .serializers import UserSerializer

# Create your views here.
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    password_confirm = request.data.get('password_confirm')
    username_check = re.findall('[a-z]', username)
    username_check += re.findall('[A-Z]', username)
    if len(username) < 5 or len(username) > 16 or not username_check or re.findall('[`~!@#$%^&*(),<.>/?]+',username):
        return Response({'error: 아이디 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)
    if password != password_confirm:
        return Response({'error: password mismatch'}, status.HTTP_400_BAD_REQUEST)
    if len(password) < 8 or len(password) > 20 or not re.findall('[a-z]', password) or not re.findall('[A-Z]', password) \
        or not re.findall('[0-9]+',password) or not re.findall('[`~!@#$%^&*(),<.>/?]+',password):
        return Response({'error: 비밀번호 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)
    serializers = UserSerializer(data=request.data)
    if serializers.is_valid(raise_exception=True):
        if not request.data.get('nickname'):
            user = serializers.save(nickname=username)
        else:
            user = serializers.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def delete(request):
    username = request.data.get('username')
    User = get_user_model()
    user = get_object_or_404(User, username=username)
    user.delete()
    return Response({'delete: 탈퇴 완료'}, status=status.HTTP_204_NO_CONTENT)
