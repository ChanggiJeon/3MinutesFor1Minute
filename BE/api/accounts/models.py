from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=16, blank=True)
    creatd_at = models.DateTimeField(auto_now_add=True)
    profile_image = models.ImageField(upload_to='images/', null=True)
