from django.db import models
from django.conf import settings


class Board(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    upload = models.FileField(upload_to='', max_length=15, null=True)
    is_notice = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class BoardComment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
