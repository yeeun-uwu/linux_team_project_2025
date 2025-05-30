from datetime import datetime, timedelta

def time_calc(time_now : datetime) -> str:
    hour = time_now.hour
    minute = time_now.minute

    if minute <= 10:
        return f"{hour-1:02d}00"
    else:
        return f"{hour:02d}00"
    
    '''
    초단기실황조회의 base_time은 정시단위
    정시 10분 이후부터 조회된다고 함
    > 6시 5분이면 5시로 조회하도록 해야함 
    '''