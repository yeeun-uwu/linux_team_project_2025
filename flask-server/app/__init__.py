from flask import Flask
from flask_cors import CORS
from app.scheduler.scheduler import init_scheduler
from app.routes import register_routes

def create_app():
    app = Flask(__name__)
    #app.config.from_object(Config)

    # CORS 허용 (React와 연동 시 필요)
    CORS(app)
    register_routes(app)
    
    #스케줄러 시작
    init_scheduler()

    return app
