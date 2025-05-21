from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    #app.config.from_object(Config)

    # CORS 허용 (React와 연동 시 필요)
    CORS(app)
    '''
    # 라우트 등록
    app.register_blueprint(forecast_bp)
    app.register_blueprint(realtime_bp)
    app.register_blueprint(air_quality_bp)
    app.register_blueprint(indices_bp)

    # 스케줄러 등록 및 시작
    scheduler = BackgroundScheduler()
    register_jobs(scheduler)  # → jobs.py에서 정의
    scheduler.start()
    '''

    return app
