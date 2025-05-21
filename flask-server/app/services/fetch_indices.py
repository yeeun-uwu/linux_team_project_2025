#생활기상지수 파싱

from datetime import datetime, timedelta
import json
import pandas as pd
import requests


key_file = 'flask-server/api_key.json'
with open(key_file) as f:
    api_key = json.load(f)
api_key = api_key["key"]

time = datetime.now()
print(time)
today = datetime.strftime(time, '%Y%m%d')
#오늘 날짜 

# 기본 URL
base_url = "http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4"

# 쿼리 파라미터 구성
params = {
    'serviceKey' : api_key["dec"],
    'numOfRows' : 10,
    'pageNo' : 1,
    'areaNo': '1141058500',   # 신촌동
    'time': today+'03',     # 시간 (yyyyMMddHH)
    'dataType': 'json'         # 또는 'json' 사용 가능
}

# 요청 보내기
response = requests.get(base_url, params=params)

# 응답 상태 확인
if response.status_code == 200:
    print(response.text)  # json 문자열 출력
else:
    print(f"오류 발생: {response.status_code}")

#리퀘스트 + 출력까지만 일단 구현함