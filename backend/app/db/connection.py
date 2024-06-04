import aiomysql
from app.core.config import Settings


settings = Settings()

async def get_connection():
    return await aiomysql.connect(
        host=settings.db_host,
        user=settings.db_user,
        password=settings.db_pass,
        db=settings.db_name
    )