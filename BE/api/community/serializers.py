from rest_framework import serializers
from .models import Community, Member


class CommunitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields = ('private_code', )


class CommunitySearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Community
        fields = ('id', 'name', 'intro', 'image', )
        read_only_fields = ('id', )


class MemberListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        fields = '__all__'
        read_only_fields = ('user', 'community', )


class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        fields = '__all__'
        read_only_fields = ('user', 'community', 'is_admin', 'is_active', )


class CustomMemberSerializer(MemberSerializer):

    class Meta:
        model = Member
        fields = ('nickname', )


class CommunityDetailSerializer(serializers.ModelSerializer):
    member_set = MemberListSerializer(many=True)

    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'member_set', )
