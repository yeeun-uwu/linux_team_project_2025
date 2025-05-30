from flask import Blueprint, jsonify
from app.handler.now_temp import now_temp

temp_bp = Blueprint('current', __name__)

@temp_bp.route("/api/current/temp", methods=["GET"])
def current_temp():
    try:
        temp = now_temp()
        return jsonify({
            "temperature": temp,
            "unit" : "°C"
        }), 200
    except Exception as e:
        return jsonify({"error":str(e)}), 500