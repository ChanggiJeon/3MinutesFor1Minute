from django.db import models
from community.models import Community, Member


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
    reference_file = models.FileField(upload_to='minute/', null=True, blank=True)


class Participant(models.Model):
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    minute = models.ForeignKey(Minute, on_delete=models.CASCADE)
    is_assignee = models.BooleanField(default=False)


class Speech(models.Model):
    minute = models.ForeignKey(Minute, on_delete=models.CASCADE)
    participant = models.OneToOneField(Participant, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    title = models.TextField(blank=True)
    summary = models.TextField(blank=True)
    cloud_keyword = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    record_file = models.FileField(upload_to='record/', null=True, blank=True)

    def __str__(self):
        return self.title


class SpeechFile(models.Model):
    speech = models.ForeignKey(Speech, on_delete=models.CASCADE)
    reference_file = models.FileField(upload_to='speech/', null=True, blank=True)


class SpeechComment(models.Model):
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    speech = models.ForeignKey(Speech, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
