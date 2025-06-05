import os
import json 
from datetime import datetime, timedelta
from app.services.fetch_indices import fetch_indices

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def uv_level() -> int:
    DATA_DIR = BASE_DIR + '/data/indices.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    try:
        update_time_str = data[1]["updateTime"]  # 예: "2025052800"
        update_time = datetime.strptime(update_time_str, "%Y%m%d%H")
        now = datetime.now()

        time_diff = now - update_time
        hours_diff = int(time_diff.total_seconds() // 3600)

        needs_update = hours_diff >= 24

    except (KeyError, IndexError, ValueError) as e:
        # 파일 구조가 예상과 다르거나 형식이 틀린 경우
        logging.warning(f"updateTime 처리 중 오류 발생: {e}")
        return {
            "needs_update": True,
            "hours_since_update": None,
            "update_time_str": None,
            "error": str(e)
        }

    if needs_update:
        logger.info("UV 지수 정보가 오래되었습니다. 새 정보를 요청합니다.")
        fetch_indices()

    uv_data = data[0]
    hour = hours_diff - (hours_diff % 3)
    return int(uv_data[f"h{hour}"]) if f"h{hour}" in uv_data else 0
