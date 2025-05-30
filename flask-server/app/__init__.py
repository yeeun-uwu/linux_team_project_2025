from flask import Flask
from flask_cors import CORS
from app.scheduler.scheduler import init_scheduler
from app.routes import register_routes
from app.services.fetch_air_quality import fetch_air_quality
from app.services.fetch_forecast import fetch_forecast
from app.services.fetch_indices import fetch_indices
from app.services.fetch_realtime import fetch_realtime

def create_app():
    app = Flask(__name__)
    #app.config.from_object(Config)

    # CORS 허용 (React와 연동 시 필요)
    CORS(app)
    register_routes(app)
    
    #스케줄러 시작
    init_scheduler()

    #초기 1회 데이터 가져오기
    fetch_realtime()
    fetch_air_quality()
    fetch_forecast()
    fetch_indices()

    return app
