from apscheduler.schedulers.background import BackgroundScheduler
from app.scheduler.jobs import (
    job_fetch_air_quality,
    job_fetch_forecast,
    job_fetch_indices
)

def init_scheduler():
    scheduler = BackgroundScheduler()

    # 작업 등록
    scheduler.add_job(job_fetch_air_quality, 'cron', minute=0)
    scheduler.add_job(job_fetch_forecast, 'cron', hour=0, minute=0)
    scheduler.add_job(job_fetch_indices, 'cron', hour=0, minute=30)

    scheduler.start()
