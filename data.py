from datetime import datetime, timedelta
import json
import pandas as pd
import requests

key_file = 'api_key.json'
with open(key_file) as f:
    api_key = json.load(f)
api_key = api_key["key"]

#단기예보 조회서비스 예시 엑셀 파일에서 대현동은 x, y 제공 x
#신촌동과 북아현동은 제공하는데 그 사이 지점이기 떄문에 둘 중 한 곳을 사용할 수 있음
#혹은 서대문구 좌표를 사용할 수 있음
#현재는 신촌동으로 입력해둠 

today = datetime.strftime(datetime.now(), '%Y%m%d')
#오늘 날짜 

Vil_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
Vil_params ={'serviceKey' : api_key['dec'], 
         'pageNo' : '1', 
         'numOfRows' : '1000', 
         'dataType' : 'JSON', 
         'base_date' : today, 
         'base_time' : '0600', 
         'nx' : '59', 
         'ny' : '126' }
#단기예보 정보 요청에 필요한 parameter 

response = requests.get(Vil_url, params=Vil_params)
res = json.loads(response.text)
print(res)


