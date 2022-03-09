from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    profile_image=models.ImageField(blank=True, upload_to='images/')
    creatd_at=models.DateTimeField(auto_now_add=True)