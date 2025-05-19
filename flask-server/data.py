from datetime import datetime, timedelta
import json
import pandas as pd
import requests
import time_calc as tc

# 키 파일 열고 저장
# 개인키이기떄문에 테스트를 위해서는 각자 공공데이터포털에서 api 접근 요청 필요 

key_file = 'api_key.json'
with open(key_file) as f:
    api_key = json.load(f)
api_key = api_key["key"]

# api를 사용할 때 필요한 정보가 저장된 json 호출 
url_file = 'api_info.json'
with open(url_file) as f:
    api_datas = json.load(f)
api_url_endpoint = api_datas["url_endpoint"]
api_basetime = api_datas["base_time"]

#단기예보 조회서비스 예시 엑셀 파일에서 대현동은 x, y 제공 x
#신촌동과 북아현동은 제공하는데 그 사이 지점이기 떄문에 둘 중 한 곳을 사용할 수 있음
#혹은 서대문구 좌표를 사용할 수 있음
#현재는 신촌동으로 입력해둠 

time = datetime.now()
print(time)
today = datetime.strftime(time, '%Y%m%d')
#오늘 날짜 
'''
print(tc.UltraSrtNcst_time(time))
print(tc.UltraSrtFcst_time(time))
print(tc.Mid_time(time))
#필요한 형식으로 변환된 시간 출력 테스트 
'''

Vil_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/'
Mid_url = 'http://apis.data.go.kr/1360000/MidFcstInfoService'

Vil_params ={'serviceKey' : api_key['dec'], 
         'pageNo' : '1', 
         'numOfRows' : '1000', 
         'dataType' : 'JSON', 
         'base_date' : today, 
         'base_time' : '', 
         'nx' : '59', 
         'ny' : '126' }
#단기예보 정보 요청에 필요한 parameter 

'''
response = requests.get(Vil_url, params=Vil_params)
res = json.loads(response.text)
print(res)
'''

''' 
일단 중기예보도 신청해 두었으나 당일의 데이터만 확인할거면 단기예보로 충분해 보임
황사/미세먼지는 환경부 에어코리아 대기오염정보 api를 통해 예보등급을 확인하는게 편리할 것 같음.
자외선지수는 기상청 생활기상지수 조회서비스 api를 통해 받아올 수 있음 
'''

