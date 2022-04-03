import time, datetime

def activate_notification():
    #1. DB에서 is_activate == false인 notification 모두 조회
    #2. deadline마감시간이 현재시간보다 1시간 이내면 is_activate를 true로 바꾼다.
    # for noti in notifications:
    #     if(abs(noti.deadline-datetime.datetime.now().time())< 1h):
    #         noti.is_activate = True
    #3. 60초마다 반복.
    time.sleep(60)
