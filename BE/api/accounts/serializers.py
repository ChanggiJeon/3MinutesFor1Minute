from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password', 'email', 'name', )
        read_only_fields = ('id', )
        write_only_fields = ('password', )
