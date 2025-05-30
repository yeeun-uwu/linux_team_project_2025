from app import create_app
from app.storage.logging_config import setup_logging

# 로깅 설정
setup_logging()

#Flask 앱 생성/실행
app = create_app()

if __name__ == "__main__":
    # 함수 테스트하면 여기에 추가
    

    # 서버 실행
    app.run(host="127.0.0.1", port=5000, debug=True)
