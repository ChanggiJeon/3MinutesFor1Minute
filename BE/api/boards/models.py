from django.db import models
from community.models import Community, Member

        
def file_path(instance, filename):
    return f'boardfile/{instance.board.pk}/{filename}'


class Board(models.Model):
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    is_notice = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class BoardFile(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    filename = models.CharField(max_length=100, blank=True)
    reference_file = models.FileField(upload_to=file_path, null=True, blank=True)


class BoardComment(models.Model):
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
