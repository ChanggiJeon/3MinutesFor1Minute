from tkinter import CASCADE
from django.db import models
from django.conf import settings

# Create your models here.
class Community(models.Model):
    name = models.CharField(max_length=16)
    intro = models.CharField(max_length=100, blank=True)
    private_code = models.CharField(max_length=10, blank=True)
    is_private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Member(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=16)
    bio = models.CharField(max_length=100, blank=True)
    authority = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    profile = models.ImageField(blank=True, upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True)
