from calendar import c
from rest_framework import serializers

import community
from .models import Community, Member

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'

class CommunitySearchSerializer(serializers.ModelSerializer):
    is_joined = serializers.SerializerMethodField()
    class Meta:
        model = Community
        fields = ('id', 'name','is_joined')
    def get_is_joined(self, obj):
        return 3
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'