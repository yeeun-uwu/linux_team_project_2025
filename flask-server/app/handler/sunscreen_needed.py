import os
import json 
from datetime import datetime, timedelta
from app.services.fetch_indices import fetch_indices

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def sunscreen_needed() -> bool:
    DATA_DIR = BASE_DIR + '/data/indices.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)

    try:
        update_time = data[1].get("updateTime", "")
        today_midnight = datetime.now().strftime("%Y%m%d") + "00"
        if update_time != today_midnight:
            fetch_indices()
    except (IndexError, AttributeError) as e:
        logger.warning(f"[자외선지수] updateTime 확인 실패: {e}")

    uv_data = data[0] if isinstance(data, list) and len(data) > 0 else {}

    for i in range(0, 25, 3):  # h0, h3, ..., h24
        key = f"h{i}"
        value = uv_data.get(key, "")
        if value.strip() == "":
            continue  # 값이 비어있을 경우 무시
        try:
            if int(value) >= 3:
                return True
        except ValueError:
            continue  # 숫자로 변환 불가능하면 무시

    return False