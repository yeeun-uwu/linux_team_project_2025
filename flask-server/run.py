from app import create_app
from app.storage.logging_config import setup_logging
from app.handler.now_temp import now_temp
<<<<<<< HEAD
from app.handler.umbrella_needed import umbrella_needed
from app.handler.sunscreen_needed import sunscreen_needed
=======
from app.services.fetch_air_quality import fetch_air_quality
from app.services.fetch_forecast import fetch_forecast
>>>>>>> origin/ryun-new

# 로깅 설정
setup_logging()

#Flask 앱 생성/실행
app = create_app()

if __name__ == "__main__":
    # 함수 테스트하면 여기에 추가
    print(now_temp())
<<<<<<< HEAD
    print(umbrella_needed())
    print(sunscreen_needed())
    
=======
    fetch_air_quality()
    fetch_forecast()
>>>>>>> origin/ryun-new
    

    # 서버 실행
    app.run(host="127.0.0.1", port=5000, debug=True)
