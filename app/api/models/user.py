from typing import Optional
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import Field

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserInDB(BaseModel):
    id: int
    username: str
    email: str
    password: str

class RegisterFormUser(OAuth2PasswordRequestForm):
    email: str = Field(..., title="Email address", description="The email address of the user")

    class Config:
        orm_mode = True
