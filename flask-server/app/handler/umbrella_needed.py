import os
import json 
from datetime import datetime, timedelta

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def umbrella_needed() -> bool:
    DATA_DIR = BASE_DIR + '/data/forecast.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # 자정~06시 제외
    def is_valid_time(item):
        time = item.get("fcstTime", "")
        return time.isdigit() and (600 < int(time) <= 2400)

    rain = [item for item in data if item["category"] == "POP" and is_valid_time(item)]
    form = [item for item in data if item["category"] == "PCP" and is_valid_time(item)]

    # 강수확률이 80 이상인 항목 존재 시 True
    for item in rain:
        try:
            if int(item["fcstValue"]) >= 80:
                return True
        except ValueError:
            continue  # 혹시 숫자가 아닌 값이 들어있을 경우 무시

    # 강수형태가 "강수없음"이 아닌 항목 존재 시 True
    for item in form:
        if item["fcstValue"] != "강수없음":
            return True

    return False