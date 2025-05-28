from flask import Blueprint, jsonify
from http import HTTPStatus
from app.handler.now_temp import now_temp
from app.handler.max_min_temp import  max_min_temp
from app.handler.particulate_matter_meter import dusts

current_bp = Blueprint('current', __name__)

@current_bp.route("/temp", methods=["GET"])
def now_temp_routes():
    try:
        temp = now_temp()
        return jsonify({
            "body": {
                "items": [
                    {
                        "temperature": temp,
                        "unit": "°C"
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
    
@current_bp.route("/max-min-temp", methods=["GET"])
def max_min_temp_route():
    try:
        temps = max_min_temp()
        return jsonify({
            "body": {
                "items": [
                    {   
                        "itemCode" : "min temp",
                        "Value": temps[0],
                        "unit" : "°C"
                    },
                    {
                        "itemCode" : "max temp",
                        "Value": temps[1],
                        "unit" : "°C"
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
    
@current_bp.route("/dust", methods=["GET"])
def dust_route():
    try:
        dust = dusts()
        #    return [[pm10, pm10_warning], [pm25, pm25_warning]]
        return jsonify({
            "body": {
                "items": [
                    {   
                        "itemCode" : "PM10",
                        "Value": dust[0][0],
                        "Level" : dust[0][1],
                        "unit" : "㎍/㎥"
                    },
                    {
                        "itemCode" : "PM25",
                        "Value": dust[1][0],
                        "Level" : dust[1][1],
                        "unit" : "㎍/㎥"
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR