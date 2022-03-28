from rest_framework import serializers
from .models import Minute, Participant, Speech, SpeechComment


class ParticipantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Participant
        fields = '__all__'
        read_only_fields = ('minute', 'is_assignee', )


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


class CustomSpeechSerializer(SpeechSerializer):

    class Meta:
        model = Speech
        fields = '__all__'
        read_only_fields = ('participant', 'minute', 'content', 'summary', 'cloud_keyword', )


class MinuteListSerializer(serializers.ModelSerializer):
    assignee = serializers.SerializerMethodField('assign')

    def assign(self, minute):
        participant = Participant.objects.filter(minute=minute, is_assignee=True)
        serializer = ParticipantSerializer(participant, many=True)
        return serializer.data

    class Meta:
        model = Minute
        fields = ('id', 'title', 'is_closed', 'deadline', 'created_at', 'assignee', )
        read_only_fields = ('id', 'created_at', )


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
        read_only_fields = ('community', )


class CustomMinuteSerializer(MinuteSerializer):
    participants = serializers.ListField()

    class Meta:
        model = Minute
        fields = '__all__'
        read_only_fields = ('community', 'conclusion', 'is_closed', )
