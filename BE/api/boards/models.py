from django.db import models
from community.models import Community, Member


class Board(models.Model):
    member = models.ForeignKey(Member, on_delete=models.PROTECT)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    is_notice = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    upload = models.FileField(upload_to='board/', max_length=30, blank=True)

    def __str__(self):
        return self.title


class BoardComment(models.Model):
    member = models.ForeignKey(Member, on_delete=models.PROTECT)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
