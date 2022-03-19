from rest_framework import serializers
from .models import Community, Member

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'

class CommunitySearchSerializer(serializers.ModelSerializer):
    # is_joined = serializers.SerializerMethodField()
    class Meta:
        model = Community
        fields = ('id', 'name')
        # fields = ('id', 'name','is_joined')
    # def get_is_joined(self, obj):
    #     print(self.context)
    #     for member in obj.member_set.all():
    #         if self.context == member.user:
    #             return True
    #     return False



class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
        read_only_fields = ('user', 'community')


class CommunityDetailSerializer(serializers.ModelSerializer):
    class MemberListSerializer(serializers.ModelSerializer):
        class Meta:
            model = Member
            fields = '__all__'
    member_set = MemberListSerializer(many=True, read_only=True)
    class Meta:
        model = Community
        fields = ('id','name','intro','private_code','is_private','member_set')