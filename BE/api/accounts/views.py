from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    UserSerializer,
    AuthenticateSerializer,
    UserUpdateSerializer
)
from community.views import make_random_code
import re


@swagger_auto_schema(method='POST', request_body=UserSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    password_confirm = request.data.get('password_confirm')
    username_check = re.findall('[a-z]', username)
    username_check += re.findall('[A-Z]', username)

    if len(username) < 5 or len(username) > 16 or not username_check or re.findall('[`~!@#$%^&*(),<.>/?]+', username):
        return Response({'error: 아이디 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    if password != password_confirm:
        return Response({'error: password mismatch'}, status.HTTP_400_BAD_REQUEST)

    if len(password) < 8 or len(password) > 20 or not re.findall('[a-z]', password) or not re.findall('[A-Z]', password) \
        or not re.findall('[0-9]+', password) or not re.findall('[`~!@#$%^&*(),<.>/?]+', password):
        return Response({'error: 비밀번호 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    serializers = UserSerializer(data=request.data)

    if serializers.is_valid(raise_exception=True):
        user = serializers.save()
        user.set_password(request.data.get('password'))

        if not user.name:
            user.name = username

        user.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def unique_check_username(request, username):
    User = get_user_model()

    if User.objects.filter(username=username):
        return Response({'error: ID 중복'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def unique_check_email(request, email):
    User = get_user_model()

    if User.objects.filter(email=email):
        return Response({'error: 이메일 중복'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        code = make_random_code()
        message = f'아래의 인증번호를 사용하여 이메일 주소 인증을 완료하면 다음 단계로 진행이 가능합니다.\n\n인증번호 : {code}\n\n감사합니다.'
        mail_title = '3Minutes for 1Minute 회원가입을 위한 인증번호 발송 메일입니다.'
        mail_to = email
        email = EmailMessage(mail_title, message, to=[mail_to])
        email.send()
        return Response({'code': code})


@swagger_auto_schema(method='DELETE', request_body=AuthenticateSerializer)
@api_view(['DELETE'])
def delete(request):
    User = get_user_model()
    user = get_object_or_404(User, username=request.data['username'])

    if request.user == user and user.check_password(request.data['password']):
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='PUT', request_body=UserUpdateSerializer)
@api_view(['PUT'])
def update(request):
    User = get_user_model()
    user = get_object_or_404(User, username=request.data['username'])
    password = request.data.get('password')
    new_password = request.data.get('new_password')
    new_password_confirm = request.data.get('new_password_confirm')

    if request.user == user and user.check_password(password):
        serializer = UserUpdateSerializer(user, data=request.data)

        if serializer.is_valid(raise_exception=True):
            me = serializer.save()

        if new_password:
            if password == new_password or new_password != new_password_confirm:
                return Response({'error: password mismatch'}, status.HTTP_400_BAD_REQUEST)

            if len(new_password) < 8 or len(new_password) > 20 or not re.findall('[a-z]', new_password) or not re.findall('[A-Z]', new_password) \
                or not re.findall('[0-9]+', new_password) or not re.findall('[`~!@#$%^&*(),<.>/?]+', new_password):
                return Response({'error: 비밀번호 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

            me.set_password(new_password)
            me.save()
        return Response(serializer.data)
    return Response({'error: 본인 인증 실패'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def self(request):
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def profile(request, username):
    User = get_user_model()
    user = get_object_or_404(User, username=username)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def find_username(request, email, name):
    User = get_user_model()
    user = get_object_or_404(User, email=email, name=name)
    username = user.username
    message = f'회원님의 아이디는 아래와 같습니다.\n\n아이디 : {username}\n\n감사합니다.'
    mail_title = '3Minutes for 1Minute 회원님의 아이디입니다.'
    mail_to = email
    email = EmailMessage(mail_title, message, to=[mail_to])
    email.send()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def find_password(request, username, email, name):
    User = get_user_model()
    user = get_object_or_404(User, username=username, email=email, name=name)
    password = make_random_code()
    user.set_password(password)
    user.save()
    message = f'아래의 임시 비밀번호를 사용하여 로그인하시어 비밀번호를 변경해주시길 바랍니다.\n\n임시 비밀번호 : {password}\n\n감사합니다.'
    mail_title = '3Minutes for 1Minute 회원님의 임시 비밀번호입니다.'
    mail_to = email
    email = EmailMessage(mail_title, message, to=[mail_to])
    email.send()
    return Response(status=status.HTTP_200_OK)
