from dotenv import load_dotenv
import os

class Settings:
    def __init__(self):
        # MySQL database connection parameters
        load_dotenv()
        self.db_host = os.getenv("DB_HOST")
        self.db_user = os.getenv("DB_USER")
        self.db_pass = os.getenv("DB_PASSWORD")
        self.db_name = os.getenv("DB_NAME")

        # Secret key for JWT encoding and decoding
        self.secret_key = os.getenv("SECRET_KEY")
        self.algorithm = os.getenv("ALGORITHM")
        self.access_token_expire_mins = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))