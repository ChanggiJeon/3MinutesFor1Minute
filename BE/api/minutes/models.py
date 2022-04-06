from django.db import models
from community.models import Community, Member


def record_file_path(instance, filename):
    return f'recordfile/{instance.minute.pk}/{filename}'


def minute_file_path(instance, filename):
    return f'minutefile/{instance.minute.pk}/{filename}'


def speech_file_path(instance, filename):
    return f'speechfile/{instance.speech.pk}/{filename}'


class Minute(models.Model):
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=300)
    conclusion = models.TextField(max_length=300, blank=True)
    is_closed = models.BooleanField(default=False)
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class MinuteFile(models.Model):
    minute = models.ForeignKey(Minute, on_delete=models.CASCADE)
    filename = models.CharField(max_length=100, blank=True)
    reference_file = models.FileField(upload_to=minute_file_path, null=True, blank=True)


class Participant(models.Model):
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    minute = models.ForeignKey(Minute, on_delete=models.CASCADE)
    is_assignee = models.BooleanField(default=False)


class Speech(models.Model):
    minute = models.ForeignKey(Minute, on_delete=models.CASCADE)
    participant = models.OneToOneField(Participant, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    content = models.TextField(blank=True)
    voice_text = models.TextField(blank=True)
    summary = models.TextField(blank=True)
    cloud_keyword = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    record_file = models.FileField(upload_to=record_file_path, null=True, blank=True)

    def __str__(self):
        return self.title


class SpeechFile(models.Model):
    speech = models.ForeignKey(Speech, on_delete=models.CASCADE)
    filename = models.CharField(max_length=100, blank=True)
    reference_file = models.FileField(upload_to=speech_file_path, null=True, blank=True)


class SpeechComment(models.Model):
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    speech = models.ForeignKey(Speech, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
