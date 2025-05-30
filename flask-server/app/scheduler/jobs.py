import logging
from app.services.fetch_air_quality import fetch_air_quality
from app.services.fetch_forecast import fetch_forecast
from app.services.fetch_indices import fetch_indices

logger = logging.getLogger(__name__)


def job_fetch_air_quality():
    logger.info("미세먼지 데이터를 갱신합니다.")
    fetch_air_quality()

def job_fetch_forecast():
    logger.info("단기예보 데이터를 갱신합니다.")
    fetch_forecast()

def job_fetch_indices():
    logger.info("자외선지수 데이터를 갱신합니다.")
    fetch_indices()