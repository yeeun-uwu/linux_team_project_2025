#단기예보 데이터 요청 (단기예보 조회서비스 - 단기예보조회)

from datetime import datetime, timedelta
import json
import pandas as pd
import requests
import os

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))

def fetch_forecast():
    key_file = os.path.join(BASE_DIR, 'api_key.json')
    with open(key_file) as f:
        api_key = json.load(f)
    api_key = api_key["key"]

    now = datetime.now()
    yesterday = now - timedelta(days=1)
    time = yesterday.strftime("%Y%m%d")
    logger.info(f"{time}일 23시 단기예보 - 단기예보조회를 요청합니다.")

    # 기본 URL
    base_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"

    # 쿼리 파라미터 구성
    params = {
        'serviceKey' : api_key["dec"],
        "pageNo" : "1",
        'numOfRows' : "1000",
        "dataType": "json",
        'base_date' : time,
        'base_time' : '2300',
        'nx' : '59',
        'ny': '126'
    }

    # 요청 보내기
    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        try:
            data = response.json()
            items = data.get("response", {}).get("body", {}).get("items", {}).get("item", [])
            daily = [a for a in items if a.get("fcstDate") == now.strftime("%Y%m%d")]

            with open(os.path.join(BASE_DIR, "data/forecast.json"), "w", encoding="utf-8") as f:
                json.dump(daily, f, ensure_ascii=False, indent=2)

            logger.info(f"{time} 23시 단기예보 저장 완료")
            return True

        except json.JSONDecodeError as e:
            logger.error(f"JSON 파싱 실패: {e}")
            logger.error(f"응답 내용: {response.text}")
            return False

    else:
        logger.error(f"오류 발생: {response.status_code} - {response.text}")
        return False
