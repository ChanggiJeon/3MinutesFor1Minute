from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


def profile_image_path(instance, filename):
    return f'user/user_{instance.pk}/{filename}'


class User(AbstractUser):
    name = models.CharField(max_length=16, blank=True)
    profile_image = ProcessedImageField(
        upload_to=profile_image_path,
        processors=[ResizeToFill(125, 125)],
        format='JPEG',
        options={'quality': 80},
        null=True,
        blank=True,
    )
