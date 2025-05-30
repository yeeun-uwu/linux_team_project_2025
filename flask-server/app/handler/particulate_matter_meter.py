import os
import json 
from datetime import datetime, timedelta

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def dusts() -> str:
    DATA_DIR = BASE_DIR + '/data/air_quality.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    data = data["items"]
    now = data[0]
    
    # 문자열 값을 숫자로 변환 (없을 경우를 대비해 예외 처리)
    try:
        pm10 = int(now["pm10Value24"])
    except (KeyError, ValueError):
        pm10 = -1  # 또는 None

    try:
        pm25 = int(now["pm25Value24"])
    except (KeyError, ValueError):
        pm25 = -1  # 또는 None

    # 등급 매핑
    def get_pm10_warning(value: int) -> str:
        if value <= 30:
            return "좋음"
        elif value <= 50:
            return "보통"
        elif value <= 100:
            return "나쁨"
        else:
            return "매우 나쁨"

    def get_pm25_warning(value: int) -> str:
        if value <= 15:
            return "좋음"
        elif value <= 25:
            return "보통"
        elif value <= 50:
            return "나쁨"
        else:
            return "매우 나쁨"

    pm10_warning = get_pm10_warning(pm10)
    pm25_warning = get_pm25_warning(pm25)

    return [[pm10, pm10_warning], [pm25, pm25_warning]]
