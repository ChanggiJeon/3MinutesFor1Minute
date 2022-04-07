from rest_framework import serializers
from .models import Minute, MinuteFile, Participant, Speech, SpeechFile, SpeechComment
from community.serializers import CustomMemberSerializer


class MinuteFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = MinuteFile
        fields = '__all__'
        read_only_fields = ('minute', )


class SpeechFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpeechFile
        fields = '__all__'
        

class ParticipantSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer(read_only=True)

    class Meta:
        model = Participant
        fields = '__all__'
        read_only_fields = ('member', 'minute', 'is_assignee', )


class SpeechCommentSerializer(serializers.ModelSerializer):
    member = CustomMemberSerializer(read_only=True)

    class Meta:
        model = SpeechComment
        fields = '__all__'
        read_only_fields = ('member', 'speech', )


class SpeechListSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer()

    class Meta:
        model = Speech
        fields = ('id', 'participant', 'title', 'updated_at', )
        read_only_fields = ('id', 'participant', 'updated_at', )


class SpeechSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    speechfile_set = SpeechFileSerializer(many=True, read_only=True)
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
    speechfile_set = SpeechFileSerializer(many=True, read_only=True)

    class Meta:
        model = Speech
        fields = ('title', 'content', 'voice_text', 'summary', 'cloud_keyword', 'speechfile_set', )


class MinuteListSerializer(serializers.ModelSerializer):
    assignee = serializers.SerializerMethodField('assign')

    def assign(self, minute):
        participant = Participant.objects.get(minute=minute, is_assignee=True)
        serializer = ParticipantSerializer(participant)
        return serializer.data

    class Meta:
        model = Minute
        fields = ('id', 'title', 'is_closed', 'deadline', 'created_at', 'assignee', )
        read_only_fields = ('id', 'is_closed', 'created_at', 'assignee', )


class MinuteSerializer(serializers.ModelSerializer):
    minutefile_set = MinuteFileSerializer(many=True, read_only=True)
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
    member_ids = serializers.ListField()
    minutefile_set = MinuteFileSerializer(many=True, read_only=True)

    class Meta:
        model = Minute
        fields = '__all__'
        read_only_fields = ('community', 'conclusion', 'is_closed', )


class MinuteCloseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Minute
        fields = ('conclusion', 'is_closed', )
