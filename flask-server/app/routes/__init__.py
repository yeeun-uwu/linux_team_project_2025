from app.routes.now_temp_routes import temp_bp
#라우트 등록

def register_routes(app):
    app.register_blueprint(temp_bp)

    return app
    
