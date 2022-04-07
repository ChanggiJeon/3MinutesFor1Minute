from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


def image_path(instance, filename):
    return f'community/{instance.pk}/{filename}'


def profile_image_path(instance, filename):
    return f'member/{instance.user.pk}/{filename}'


class Community(models.Model):
    name = models.CharField(max_length=16)
    intro = models.CharField(max_length=100, blank=True)
    private_code = models.CharField(max_length=10, blank=True)
    is_private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    image = ProcessedImageField(
        upload_to=image_path,
        format='JPEG',
        options={'quality': 100},
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name


class Member(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=16, blank=True)
    bio = models.CharField(max_length=100, blank=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    profile_image = ProcessedImageField(
        upload_to=profile_image_path,
        processors=[ResizeToFill(250, 250)],
        format='JPEG',
        options={'quality': 100},
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.nickname
