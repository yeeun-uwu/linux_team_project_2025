import os
import json 
from datetime import datetime, timedelta
from app.services.fetch_forecast import fetch_forecast

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def max_min_temp() -> list:
    DATA_DIR = BASE_DIR + '/data/forecast.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)

    if data[0]["fcstDate"] != datetime.now().strftime("%Y%m%d"):
        logger.info("예보가 오래되었습니다. 새 정보를 요청합니다.")
        fetch_forecast()
    
    # 기온만 필터링해서 최소 최대 리턴
    temps = [int(item["fcstValue"]) for item in data if item["category"] == "TMP"]
    return [min(temps), max(temps)] if temps else [None, None]
