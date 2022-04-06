import datetime, time
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django
django.setup()
from django.shortcuts import get_list_or_404, get_object_or_404
from minutes.models import Minute
from notifications.models import Notification
import concurrent.futures


def activate_notification():
    try:
        notifications = get_list_or_404(Notification, is_activate=False)

        for notification in notifications:
            diff = notification.minute.deadline - datetime.datetime.now()

            if diff.seconds <= 0:
                minute = get_object_or_404(Minute, pk=notification.minute.pk)
                minute.is_closed = True
                minute.save()

            elif diff.seconds <= 3600:
                notification.is_activate = True
                notification.save()

    except:
        print("there is no notification such conditions")

    time.sleep(50)


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        while True:
            future = executor.submit(activate_notification)
