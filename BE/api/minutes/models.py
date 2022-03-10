from django.db import models
from django.conf import settings


class Minute(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    summary = models.TextField(null=True)
    keyword = models.TextField(null=True)
    record_file = models.FileField(upload_to='', null=True)
    text_file = models.FileField(upload_to='', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class MinuteComment(models.Model):
    minute = models.ForeignKey(Minute, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
