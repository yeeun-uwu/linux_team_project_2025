import os
import json 
from datetime import datetime, timedelta
from app.services.fetch_realtime import fetch_realtime

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def current_sky() -> str:
    DATA_DIR = BASE_DIR + '/data/realtime.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # 강수형태 
    pty = [item for item in data["item"] if item["category"] == "PTY"]

    if pty is None:
        logger.warning("PTY 데이터가 없습니다.")
        return None  # 혹은 기본값 반환
    
    pty = pty[0]  # 첫 번째 항목만 사용
    if pty["obsrValue"] == "0":
        FORECAST_DATA_DIR = BASE_DIR + '/data/forecast.json'
        with open(FORECAST_DATA_DIR, "r", encoding="utf-8") as f:
            forecast = json.load(f)
        
        # 현재 시각 → 가장 가까운 fcstTime 포맷(HHMM) 계산
        now = datetime.now()
        hour_block = now.replace(minute=0, second=0, microsecond=0)
        fcst_time = hour_block.strftime("%H%M") 

        sky = [item for item in forecast if item["category"] == "SKY" and item["fcstTime"] == fcst_time]
        sky = sky[0]

        if sky["fcstValue"] == "1":
            return "맑음"
        elif sky["fcstValue"] == "3" or sky["fcstValue"] == "4":
            return "흐림"
        
    if pty["obsrValue"] == "1" or pty["obsrValue"] == "2" or pty["obsrValue"] == "5" or pty["obsrValue"] == "6":
        return "비"
    elif pty["obsrValue"] == "3" or pty["obsrValue"] == "7":
        return "눈"