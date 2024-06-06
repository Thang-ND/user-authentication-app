import aiomysql
from app.core.config import Settings


settings = Settings()

def get_connection():
    return aiomysql.connect(
        host=settings.db_host,
        user=settings.db_user,
        password=settings.db_pass,
        db=settings.db_name
    )