# Generated by Django 4.0.3 on 2022-03-21 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0002_alter_member_nickname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='authority',
            new_name='is_admin',
        ),
        migrations.RenameField(
            model_name='member',
            old_name='profile',
            new_name='profile_image',
        ),
    ]
