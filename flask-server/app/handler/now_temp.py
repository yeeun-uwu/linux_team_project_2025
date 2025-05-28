import os
import json 
from datetime import datetime, timedelta
from app.services.fetch_realtime import fetch_realtime

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)


def is_outdated(base_date: str, base_time: str, threshold_minutes: int = 70) -> bool:
    base_datetime = datetime.strptime(base_date + base_time, "%Y%m%d%H%M")
    now = datetime.now()
    
    # 시간 차이 계산 (절댓값 X, base_datetime이 오래됐는지만 확인)
    time_diff = now - base_datetime

    return time_diff.total_seconds() > threshold_minutes * 60


def now_temp() -> str:
    DATA_DIR = BASE_DIR + '/data/realtime.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    temp = [item for item in data["item"] if item["category"] == "T1H"]
    temp = temp[0]

    if is_outdated(temp["baseDate"], temp["baseTime"], 70):
        logger.info("실시간 정보가 오래되었습니다. 새 정보를 요청합니다.")
        fetch_realtime()
    
    return float(temp["obsrValue"])
