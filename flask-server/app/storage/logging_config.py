import logging
import os
from datetime import datetime, timedelta

def setup_logging():
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
    LOG_DIR = BASE_DIR + '/log'
    os.makedirs(LOG_DIR, exist_ok=True)

    logging.basicConfig(
        
        filename = f'{LOG_DIR}/{datetime.now().strftime("%Y%m%d")}.log',
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        encoding='utf-8'
    )

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s] %(message)s'))
    logging.getLogger().addHandler(console_handler)