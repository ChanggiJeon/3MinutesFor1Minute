from calendar import c
from rest_framework import serializers

import community
from .models import Community, Member

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'

class CommunitySearchSerializer(serializers.ModelSerializer):
    is_joined = serializers.BooleanField(read_only=True)
    class Meta:
        model = Community
        fields = ('id', 'name','is_joined')
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'