from django.db import models
from community.models import Member
from minutes.models import Speech

class Notification(models.Model):
    user = models.ForeignKey(Member, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    speech = models.ForeignKey(Speech, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    is_activate = models.BooleanField()

    def __str__(self):
        return self.content