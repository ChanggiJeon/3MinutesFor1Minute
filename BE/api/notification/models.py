from django.db import models
from community.models import Member
from minutes.models import Minute


class Notification(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    minute = models.ForeignKey(Minute, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    is_activate = models.BooleanField()
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.content
