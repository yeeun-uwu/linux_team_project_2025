#에어코리아 api 파싱

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
base_url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty"

# 쿼리 파라미터 구성
params = {
    'serviceKey' : api_key["dec"],
    'returnType' : 'json',
    'numOfRows': 100,
    'pageNo' : 1,
    'sidoName' : '서울',
    'ver' : '1.3'
}

# 요청 보내기
response = requests.get(base_url, params=params)

# 응답 상태 확인
if response.status_code == 200:
    print(response.text)  # json 문자열 출력
else:
    print(f"오류 발생: {response.status_code}")

# api 호출 / 출력까지만 만들어둠 
