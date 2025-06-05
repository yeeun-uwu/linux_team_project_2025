#초단기실황 요청 (단기예보 조회서비스 - 초단기실황)

from datetime import datetime, timedelta
import json
import pandas as pd
import requests
from app.utils.time_calc import time_calc

import logging
logger = logging.getLogger(__name__)

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))

def fetch_realtime():
    
    key_file = os.path.join(BASE_DIR, 'api_key.json')
    with open(key_file) as f:
        api_key = json.load(f)
    api_key = api_key["key"]

    now = datetime.now()
    date = now.strftime("%Y%m%d")
    hour = time_calc(now)
    logger.info(f"{date} {hour} 단기예보 - 초단기실황을 요청합니다.")

    # 기본 URL
    base_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"

    # 쿼리 파라미터 구성
    params = {
        'serviceKey' : api_key["dec"],
        'numOfRows' : "10",
        "pageNo" : "1",
        "dataType": "json",
        'base_date' : date,
        'base_time' : hour,
        'nx' : '59',
        'ny': '126'
    }

    # 요청 보내기
    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        items = data["response"]["body"]["items"]

        with open(BASE_DIR+"/data/realtime.json", "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii= False, indent=2)

        logger.info(f"{date} {hour} 초단기실황 저장 완료")
    else:
        logger.error(f"오류 발생: {response.status_code} - {response.text}")