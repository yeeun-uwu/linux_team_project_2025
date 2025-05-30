from flask import Blueprint, jsonify
from http import HTTPStatus
from app.handler.mask_needed import mask_needed
from app.handler.sunscreen_needed import sunscreen_needed
from app.handler.umbrella_needed import umbrella_needed
from app.handler.temp_forecast import temp_forecast

today_bp = Blueprint('today', __name__)

@today_bp.route("/need", methods=["GET"])
def current_temp():
    try:
        return jsonify({
            "body" : {
                "items": [
                    {
                        "need_mask": mask_needed(),
                        "need_sunscreen": sunscreen_needed(),
                        "need_umbrella": umbrella_needed(),
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
    
@today_bp.route("/temp-forecast", methods=["GET"])
def temp_forecast_route():
    forecast = temp_forecast()
    if forecast is None:
        return jsonify({"error": "Forecast data not available"}), HTTPStatus.NOT_FOUND
    try:
        return jsonify({
            "body": {
                "items": [
                    {
                        "itemCode": "temp-forecast",
                        "forecast": forecast
                    }
                ]
            }
        }), HTTPStatus.OK
    except Exception as e:
        return jsonify({"error":str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR