import logging
import os
from datetime import datetime, timedelta

def setup_logging():
    log_dir = 'flask-server/log'
    os.makedirs(log_dir, exist_ok=True)

    logging.basicConfig(
        
        filename = f'flask-server/log/{datetime.now().strftime("%Y%m%d")}.log',
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        encoding='utf-8'
    )

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s] %(message)s'))
    logging.getLogger().addHandler(console_handler)