import os
import json 
from datetime import datetime, timedelta

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
print(BASE_DIR)

def mask_needed() -> bool:
    DATA_DIR = BASE_DIR + '/data/air_quality.json'
    with open(DATA_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    data = data["items"][0]
    if int(data["pm25Value24"]) >= 26 or int(data["pm10Value24"]) >= 51:
        return True
    else:
        return False