import os
import json 
from datetime import datetime, timedelta
from app.services.fetch_forecast import fetch_forecast

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def temp_forecast() -> list:
    DATA_DIR = BASE_DIR + '/data/forecast.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)

    if data[0]["fcstDate"] != datetime.now().strftime("%Y%m%d"):
        logger.info("예보가 오래되었습니다. 새 정보를 요청합니다.")
        fetch_forecast()
        with open(DATA_DIR, "r", encoding="utf-8") as f:
            data = json.load(f)
    
    # 기온만 필터링해서 시간별로 리턴 
    temps = [
    {"fcstTime": item["fcstTime"], "fcstValue": int(item["fcstValue"])}
    for item in data if item["category"] == "TMP"]

    # fcstTime 기준 정렬 후 값만 추출
    sorted_tmps = sorted(temps, key=lambda x: int(x["fcstTime"]))
    temperature_dict = [
        {"hour": f'{int(item["fcstTime"][:2]):02d}시', "temp": int(item["fcstValue"])}
        for item in sorted_tmps
    ]
    return temperature_dict
