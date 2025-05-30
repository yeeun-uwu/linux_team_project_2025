#에어코리아 api 요청

from datetime import datetime, timedelta
import json
import pandas as pd
import requests
import os

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))

def fetch_air_quality():
      # app/services -> app -> flask-server
    key_file = os.path.join(BASE_DIR, 'api_key.json')
    with open(key_file) as f:
        api_key = json.load(f)
    api_key = api_key["key"]

    time = datetime.now()
    today = datetime.strftime(time, '%Y%m%d')
    #오늘 날짜 
    logger.info(f"{time} 시각 에어코리아 측정소별 실시간 측정정보를 요청합니다.")

    # 기본 URL
    base_url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty"
    # 에어코리아 측정소별 실시간 측정정보 조회 

    # 쿼리 파라미터 구성
    params = {
        'serviceKey' : api_key["dec"],
        'returnType' : 'json',
        'numOfRows': '100',
        'pageNo' : '1',
        'stationName' : '서대문구',
        'dataTerm' : 'DAILY',
        'ver' : '1.1'
    }

    # 요청 보내기
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
            try:
                data = response.json()
                items = data.get("response", {}).get("body", None)
                if items is None:
                    logger.error(f"API 응답에 'body' 데이터가 없습니다: {data}")
                    return None

                with open(os.path.join(BASE_DIR, "data/air_quality.json"), "w", encoding="utf-8") as f:
                    json.dump(items, f, ensure_ascii=False, indent=2)

                logger.info(f"{today} 에어코리아 측정소별 실시간 측정정보 저장 완료")
                return items

            except json.JSONDecodeError as e:
                logger.error(f"JSON 파싱 실패: {e}")
                logger.error(f"응답 내용: {response.text}")
                return None

    else:
        logger.error(f"오류 발생: {response.status_code} - {response.text}")
        return None