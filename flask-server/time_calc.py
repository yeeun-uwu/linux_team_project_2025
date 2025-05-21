from datetime import datetime, timedelta

def UltraSrtNcst_time(time_now : datetime) -> str:
    hour = time_now.hour
    minute = time_now.minute

    if minute <= 10:
        return f"{hour-1}00"
    else:
        return f"{hour}00"
    
    '''
    초단기실황조회의 base_time은 정시단위
    정시 10분 이후부터 조회된다고 함
    > 6시 5분이면 5시로 조회하도록 해야함 
    '''

def UltraSrtFcst_time(time_now : datetime) -> str:
    hour = time_now.hour
    minute = time_now.minute

    if minute <= 45:
        return f"{hour-1}30"
    else:
        return f"{hour}30"
    '''
    초단기예보조회의 base_time은 30분단위
    매시각 45분 이후 호출된다고 함 > 1400 넣어도 1430 호출되는걸 확인 
    '''

def Mid_time(time_now : datetime) -> str:
    ym = datetime.strftime(time_now, "%Y%m")
    day = time_now.day
    hour = time_now.hour
    minute = time_now.minute

    if hour >= 18:
        return f"{ym}{day}1800"
    elif hour >= 6:
        return f"{ym}{day}0600"
    else:
        return f"{ym}{day-1}1800"

    '''
    일 2회 생성(6시, 오후 6시)
    가까운 이전 시각으로 바꿔주는 함수 
    '''