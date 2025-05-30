#생활기상지수 요청

from datetime import datetime, timedelta
import json
import pandas as pd
import requests
import os

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))


def fetch_indices():
    key_file = os.path.join(BASE_DIR, 'api_key.json')
    with open(key_file) as f:
        api_key = json.load(f)
    api_key = api_key["key"]

    now = datetime.now()
    time = datetime.strftime(now, "%Y%m%d") + "00"
    #오늘 날짜 
    logger.info(f"{time} 기준 자외선지수 정보를 요청합니다.")

    # 기본 URL
    base_url = "http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4"

    # 쿼리 파라미터 구성
    params = {
        'serviceKey' : api_key["dec"],
        'numOfRows' : 10,
        'pageNo' : 1,
        'areaNo': '1141058500',   # 신촌동
        'time': time,     # 시간 (yyyyMMddHH), 하루 한번 호출해서 저장하는걸로 하고 그냥 자정 정보 기준으로 
        'dataType': 'json'
    }

    # 요청 보내기
    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        try:
            data = response.json()
            items = data.get("response", {}).get("body", {}).get("items", {}).get("item", [])
            items.append({"updateTime": now.strftime("%Y%m%d%H")})  # 현재 시간 추가

            with open(BASE_DIR + "/data/indices.json", "w", encoding="utf-8") as f:
                json.dump(items, f, ensure_ascii=False, indent=2)

            logger.info(f"{time} 시각의 자외선지수 예보 저장 완료")
            return items

        except json.JSONDecodeError as e:
            logger.error(f"JSON 파싱 실패: {e}")
            logger.error(f"응답 내용: {response.text}")
            return None

    else:
        logger.error(f"오류 발생: {response.status_code} - {response.text}")
        return None
