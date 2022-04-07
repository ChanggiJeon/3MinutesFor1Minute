import datetime, time
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
import django
django.setup()
from django.shortcuts import get_list_or_404
from notifications.models import Notification
from minutes.models import Minute, Participant
import concurrent.futures


def activate_notification():
    try:
        notifications = get_list_or_404(Notification, is_activate=False)

        for notification in notifications:
            if (notification.minute.deadline - datetime.datetime.now()).seconds <= 3600:
                notification.is_activate = True
                notification.save()

        minutes = get_list_or_404(Minute, is_closed=False)

        for minute in minutes:
            if (minute.deadline - datetime.datetime.now()).seconds <= 0:
                minute.is_closed = True
                minute.save()
                participants = get_list_or_404(Participant, minute=minute)

                for participant in participants:
                    notification = Notification(
                        user=participant.member.user,
                        minute=minute,
                        content=f'{minute.title} 회의가 마감되었습니다.',
                        is_activate=True
                    )

                    notification.save()

    except:
        print("there is no notification such conditions")

    time.sleep(45)


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        while True:
            future = executor.submit(activate_notification)
