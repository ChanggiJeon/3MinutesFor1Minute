from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    profile_image = models.ImageField(upload_to='images/', null=True)
    creatd_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=16, blank=True)

    def __str__(self):
        return self.name
