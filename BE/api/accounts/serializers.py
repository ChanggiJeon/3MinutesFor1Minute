from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, max_length=16)
    password = serializers.CharField(min_length=8, max_length=20, write_only=True)
    password_confirm = password
    email = serializers.EmailField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password', 'password_confirm', 'email', 'name', 'profile_image', )
        read_only_fields = ('id', )


class AuthenticateSerializer(UserSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', )


class UserUpdateSerializer(UserSerializer):
    password = serializers.CharField(min_length=8, max_length=20, write_only=True, required=False)
    new_password = password
    new_password_confirm = password

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'new_password', 'new_password_confirm', 'profile_image', )
