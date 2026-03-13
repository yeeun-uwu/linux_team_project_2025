# 2025 LINUX TEAM PROJECT 

> 2025년 봄학기 '리눅스 실습 프로젝트' 과목 과제 팀 프로젝트입니다. <br/>
> Final team project for the Linux Practice Project course. <br/>
> This website provides weather updates and useful information tailored for Ewha Womans University students.
<br/>

# 안내사항
> 해당 레포지토리는 AWS EC2 Free Tier를 통해 2025.06.16까지 웹사이트가 운영됩니다. <br/>
> 로컬에서 시험해 보고 싶다면, ubuntu 환경에서 docker를 통해 실행할 수 있습니다. 
<br/>

## FEATURES

- 필요한 준비물을 챙기라는 말에 집중한 날씨🌨️ 안내 웹사이트
- 이화여자대학교 학생들을 이용자로 설정 > 학생들을 위한 서비스 추가
- 기온, 강수량, 미세먼지 등 기본적인 날씨 관련 서비스 기능
- 이화여대의 다양한 공구템들을 최저기온을 기준으로 날씨에 맞는 옷차림 추천
- 셔틀버스 운영시간 정보와 실시간 위치 확인 페이지로 리다이렉팅 기능
- 이화여대 인근 대피소 위치 안내
- 이화여대 내부 및 근처의 비 오는 날 위험한 길 안내
- 학생서비스센터의 복지 사업인 '우산 대여 서비스' 안내
- 현재 하늘 상황(맑음/흐림/비/눈)에 따른 재미를 위한 한 줄 코멘트
<br/>

## 로컬에서 테스트하고 싶다면? 
ubuntu 환경을 기준으로, docker를 통한 설치 및 실행이 가능합니다. 
<br/>

### 1. api 신청
공공데이터포털의 OPEN API를 이용하고 있기 때문에, 해당 사이트에서 직접 API를 신청하고 key를 발급받아야 합니다.
<br/>

#### 필요로 하는 api 목록:
기상청 생활기상지수 조회서비스 (https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15085288) <br/>
한국환경공단 에어코리아 대기오염정보 (https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861) <br/>
기상청 단기예보 조회서비스 (https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084) <br/>
<br/>

### 2. api 키 저장 
세 개의 api를 모두 신청한 상태에서, 
```
{
    "key" : {
        "enc" : "your-encrypted-api-key",
        "dec" : "your-decrypted-api-key"
    }
}
```

위와 같은 형태로 api_key.json 파일을 작성한 뒤, 해당 파일을 로컬에 저장하고 경로를 기억해 둡니다.
<br/>
### 3. 원하는 도메인 설정 
웹 서버처럼 운영하는 대신, 로컬에서 특정 도메인으로 접속하기 위한 설정입니다.  <br/>
`/etc/hosts` 파일에서 
```
127.0.0.1 example.com
```
처럼 원하는 주소를 입력해주세요. <br/>
일반 사용자 권한으로는 편집할 수 없으므로 `sudo`와 같은 명령어를 사용해주세요. 
<br/>

### 4. Docker를 통한 실행
1. 실행하려는 환경에서 `docker login` 명령어를 통해 Docker Hub에 로그인합니다.
<br/>

2. 해당하는 이미지를 Pull합니다. 아래 명령어를 실행해주세요.

```
docker pull yeeunuwu/linux-project-frontend:latest
docker pull yeeunuwu/linux-project-backend:latest
```
<br/>

3. docker-compose.yml 파일을 작성합니다.

```
version: '3.8'

services:
  frontend:
    image: yeeunuwu/linux-project-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    image: yeeunuwu/linux-project-backend:latest
    ports:
      - "5000:5000"
    volumes:
      - /home/ubuntu/api_key.json:/app/api_key.json:ro
    environment:
      - TZ=Asia/Seoul
```
**`/home/ubuntu/api_key.json`은 아까 api_key.json을 저장한 절대경로로 작성해 주세요.** <br/>
YAML 문법에 맞게, 띄어쓰기를 정확히 지켜 작성하셔야 합니다. <br/>
혹은, 포트 번호를 지정하고 싶다면 `"80:80"` 대신 `"8080:80"`처럼 지정해주세요.  <br/>
<br/>

4. 도커 컨테이너를 실행합니다. 
```
docker-compose up -d
```
<br/>

5. 아까 지정한 url로 이동하면 로컬에서 접속 및 테스트가 가능합니다. 포트 번호를 지정했다면, 지정한 포트 번호를 주소 뒤에 꼭 입력해주세요.

<br/>

**ports에서 앞쪽에 입력한 포트 번호가 ubuntu에서 실행되고 있을 경우 이미 주소가 사용되고 있다는 에러가 발생합니다.**
<br/>
**포트가 사용중이지 않은지 확인해주세요.**

<img src="https://github.com/user-attachments/assets/ddf5da36-80b4-42c5-afe7-3fee2757dcff" width="600">  <br/>
<br/>
이미지처럼 로컬 테스트가 가능합니다! 
 
