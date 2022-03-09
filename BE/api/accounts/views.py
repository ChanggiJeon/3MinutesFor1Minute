from django.shortcuts import render

# rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer

# Create your views here.
@api_view(['POST'])
def signup(request):
    if request.data.get('password') != request.data.get('password_confirm'):
        return Response({'error: 비밀번호가 일치하지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    serializers = UserSerializer(data=request.data)
    if serializers.is_valid(raise_exception=True):
        user = serializers.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response('good' + serializers.data, status=status.HTTP_201_CREATED)
