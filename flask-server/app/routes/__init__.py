from app.routes.current_routes import current_bp
from app.routes.today_routes import today_bp
#라우트 등록

def register_routes(app):
    app.register_blueprint(current_bp, url_prefix="/api/current")
    app.register_blueprint(today_bp, url_prefix="/api/today")

    return app
    
