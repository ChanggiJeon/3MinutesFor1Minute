from django.db import models
from minutes.models import Participant

class Notification(models.Model):
    user = models.ForeignKey(Participant, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    deadline = models.DateTimeField()
    is_read = models.BooleanField(default=False)
    is_activate = models.BooleanField()

    def __str__(self):
        return self.title