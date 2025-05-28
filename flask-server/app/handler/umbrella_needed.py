import os
import json 
from datetime import datetime, timedelta

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def umbrella_needed() -> bool:
    DATA_DIR = BASE_DIR + '/data/forecast.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    data = data["items"]
    rain = [item for item in data if item["category"] == "POP"] #강수확률
    form = [item for item in data if item["category"] == "PCP"] #강수형태 
    if int(data["pm25Value24"]) >= 26 or int(data["pm10Value24"]) >= 51:
        return True
    else:
        return False