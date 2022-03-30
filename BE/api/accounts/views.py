from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from config.settings import REDIRECT_PAGE
from .models import User
from .serializers import UserSerializer
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
        user.is_active=False
        user.save()
        current_site = get_current_site(request)
        domain = current_site.domain
        uidb = urlsafe_base64_encode(force_bytes(user.pk))
        token = urlsafe_base64_encode(force_bytes(user.email))
        message = f"아래 링크를 클릭하면 회원가입 인증이 완료됩니다.\n\n회원가입 링크 : http://{domain}/api/accounts/activate/{uidb}/{token}/\n\n감사합니다."
        mail_title = "이메일 인증을 완료해주세요."
        mail_to = user.email
        email = EmailMessage(mail_title, message, to=[mail_to])
        email.send()
        return Response(serializers.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def activate(request, uidb, token):
    uid = force_str(urlsafe_base64_decode(uidb))
    user = get_object_or_404(User, pk=uid)
    mail = force_str(urlsafe_base64_decode(token))
    if mail == user.email:
        user.is_active = True
        user.save()
        return redirect(REDIRECT_PAGE)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete(request, username):
    User = get_user_model()
    user = get_object_or_404(User, username=username)

    if request.user == user:
        user.delete()
        return Response({'delete: 탈퇴 완료'}, status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([AllowAny])
def unique_check_username(request, username):
    User = get_user_model()

    if User.objects.filter(username=username):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def unique_check_email(request, email):
    User = get_user_model()

    if User.objects.filter(email=email):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def profile(request, username):
    User = get_user_model()
    user = get_object_or_404(User, username=username)

    if request.user == user:
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
