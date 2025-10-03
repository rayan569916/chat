import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "mysql+pymysql://root:root@localhost:3306/chat_schema")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "mysecret")
    JWT_SECRET_KEY = "toMyNiggaPac"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
