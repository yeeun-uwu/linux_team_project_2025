import os
import json 
from datetime import datetime, timedelta

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def rain_info() -> list:
    FORECAST_DATA_DIR = BASE_DIR + '/data/forecast.json'
    with open(FORECAST_DATA_DIR, "r", encoding="utf-8") as f:
        forecast = json.load(f)
    
    REALTIME_DATA_DIR = BASE_DIR + '/data/realtime.json'
    with open(REALTIME_DATA_DIR, "r", encoding="utf-8") as f:
        realtime = json.load(f)

    # 현재 시각 → 가장 가까운 fcstTime 포맷(HHMM) 계산
    now = datetime.now()
    hour_block = now.replace(minute=0, second=0, microsecond=0)
    fcst_time = hour_block.strftime("%H%M") 

    realtime = realtime["item"] 
    
    # 강수확률(POP) 중 현재 시간에 해당하는 데이터 추출
    pop = next((item for item in forecast if item["category"] == "POP" and item["fcstTime"] == fcst_time), None)

    # 강수량(RN1) 추출
    pcp = next((item for item in realtime if item["category"] == "RN1"), None)

    if pop is None and pcp is None:
        logger.warning(f"{fcst_time} 시각의 강수 데이터 없음.")
        return []

    return [
        {"category": "강수확률", "value": pop["fcstValue"] if pop else None},
        {"category": "강수량", "value": pcp["obsrValue"] if pcp else None}
    ]
