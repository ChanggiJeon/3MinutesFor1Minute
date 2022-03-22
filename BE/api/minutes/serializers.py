from rest_framework import serializers
from .models import Minute, Participant, Speech, SpeechComment


class ParticipantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = ('member', 'is_asigned', )
        read_only_fields = ('member', )


class SpeechCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpeechComment
        fields = '__all__'
        read_only_fields = ('member', 'speech', )


class SpeechListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Speech
        fields = ('title', )


class SpeechSerializer(serializers.ModelSerializer):
    speech_comments = serializers.SerializerMethodField('sc_filter')

    def sc_filter(self, speech):
        comments = SpeechComment.objects.filter(speech=speech)
        serializer = SpeechCommentSerializer(comments, many=True)
        return serializer.data

    class Meta:
        model = Speech
        fields = '__all__'
        read_only_fields = ('participant', 'minute', )


class MinuteListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Minute
        fields = ('id', 'participant', 'title', 'is_closed', 'created_at', )
        read_only_fields = ('id', 'participant', 'created_at', )


class MinuteSerializer(serializers.ModelSerializer):
    minute_participants = serializers.SerializerMethodField('mp_filter')
    minute_speeches = serializers.SerializerMethodField('ms_filter')

    def mp_filter(self, minute):
        participants = Participant.objects.filter(minute=minute)
        serializer = ParticipantSerializer(participants, many=True)
        return serializer.data

    def ms_filter(self, minute):
        speeches = Speech.objects.filter(minute=minute)
        serializer = SpeechListSerializer(speeches, many=True)
        return serializer.data

    class Meta:
        model = Minute
        fields = '__all__'
        read_only_fields = ('participant', 'community', )
