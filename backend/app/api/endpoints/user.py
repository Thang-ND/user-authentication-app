from fastapi import APIRouter
from datetime import datetime, timedelta
from app.api.models.user import UserCreate, UserInDB
from app.core.config import Settings
from app.db.connection import get_connection
from fastapi import FastAPI, HTTPException, Depends, status
import aiomysql
import bcrypt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt


router = APIRouter()

# config class
settings = Settings()

# OAuth2PasswordBearer for token-based authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

def hashing_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

@router.post("/api/users")
async def create_user(user: UserCreate):
    async with get_connection() as connection:
        async with connection.cursor() as cursor:
            try:
                # Execute the SQL query to insert the user into the database
                await cursor.execute(
                    "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                    (user.username, user.email, hashing_password(user.password))
                )
                # Commit the transaction
                await connection.commit()
                # Return the created user
                return {"message": "User created successfully", "user": user}
            except aiomysql.MySQLError as e:
                # Rollback the transaction in case of an error
                await connection.rollback()
                # Raise HTTPException with appropriate error message
                raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")



async def get_user_by_email(email: str):
    async with get_connection() as connection:
        async with connection.cursor(aiomysql.DictCursor) as cursor:
            try:
                await cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                result = await cursor.fetchone()
                print(result)
                if result: 
                    return UserInDB(**result)
                
            except aiomysql.MySQLError as e:
                # Rollback the transaction in case of an error
                await connection.rollback()
                # Raise HTTPException with appropriate error message
                raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")
        
async def authenticate_user(email: str, password: str):
    user = await get_user_by_email(email)
    if not user: 
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

@router.post("/api/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data.username, form_data.password)
    user = await authenticate_user(form_data.username, form_data.password)
    if not user: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_mins)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        print("payload: " + payload)
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception
    user = await get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

@router.get("/api/users/get-info-current-user", response_model=UserInDB)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        print(payload)
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except:
        raise credentials_exception
    user = await get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

            


