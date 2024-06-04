from datetime import datetime, timedelta
from app.api.endpoints import user
from app.api.models.user import UserCreate, UserInDB
from app.core.config import Settings
from app.db.connection import get_connection
from fastapi import FastAPI, HTTPException, Depends, status
import aiomysql
import bcrypt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt

# instance FastApi app
app = FastAPI()

app.include_router(user.router)

            


