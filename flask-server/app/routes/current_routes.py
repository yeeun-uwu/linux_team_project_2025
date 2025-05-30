from flask import Blueprint, jsonify
from http import HTTPStatus
from app.handler.now_temp import now_temp
from app.handler.max_min_temp import  max_min_temp
from app.handler.particulate_matter_meter import dusts
from app.handler.rain_info import rain_info
from app.handler.uv_level import uv_level
from app.handler.current_sky import current_sky
# 현재 날씨 관련 라우트 정의

current_bp = Blueprint('current', __name__)

# 현재 기온 라우트트
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
    
# 금일의 최고/최저 기온 라우트
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
    
# 현재 미세먼지/초미세먼지 라우트
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
                        "issueVal": dust[0][0],
                        "Level" : dust[0][1],
                        "unit" : "㎍/㎥"
                    },
                    {
                        "itemCode" : "PM25",
                        "issueVal": dust[1][0],
                        "Level" : dust[1][1],
                        "unit" : "㎍/㎥"
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
    
# 현재 강수확률/강수량 라우트
@current_bp.route("/rain", methods=["GET"])
def rain_route():
    try:
        rain = rain_info()
        #   return [
        #{"category": "강수확률", "value": pop["fcstValue"] if pop else None},
        #{"category": "강수량", "value": pcp["obsrValue"] if pcp else None}]
        return jsonify({
            "body": {
                "items": [
                    {   
                        "itemCode" : "probability",
                        "Value": rain[0]["value"],
                        "unit" : "%"
                    },
                    {
                        "itemCode" : "amount",
                        "Value": rain[1]["value"],
                        "unit" : "mm"
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
    
# 현재 자외선 지수 라우트
@current_bp.route("/uv", methods=["GET"])
def uv_route():
    try:
        uv = uv_level()
        return jsonify({
            "body": {
                "items": [
                    {   
                        "itemCode" : "uvIndex",
                        "Value": uv,
                        "unit" : ""
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
    
# 현재 하늘 상태 라우트
@current_bp.route("/sky", methods=["GET"])
def sky_route():
    try:
        sky = current_sky()
        return jsonify({
            "body": {
                "items": [
                    {   
                        "itemCode" : "sky",
                        "Value": sky,
                        "unit" : ""
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR