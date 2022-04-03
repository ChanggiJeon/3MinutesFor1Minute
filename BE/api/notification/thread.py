from django.shortcuts import get_list_or_404
from notification.models import Notification
import time, datetime, threading


def activate_notification():
    #1. DB에서 is_activate == false인 notification 모두 조회
    #2. deadline마감시간이 현재시간보다 1시간 이내면 is_activate를 true로 바꾼다.
    # for noti in notifications:
    #     if(abs(noti.deadline-datetime.datetime.now().time())< 1h):
    #         noti.is_activate = True
    #3. 60초마다 반복.
    notifications = get_list_or_404(Notification, is_activate=False)

    for notification in notifications:
        if (notification.minute.deadline - datetime.now()).seconds <= 3600:
            notification.is_activate = True
            notification.save()
            print('is_active')
    print('is_active2')

    time.sleep(50)
