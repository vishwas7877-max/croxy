from fastapi import FastAPI

from app.database.db import engine, Base
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.models.preferences import UserPreference
from app.routes.preferences import router as preferences_router
from app.routes.recommendations import router as recommendation_router
from fastapi.middleware.cors import CORSMiddleware






Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Croxy Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(preferences_router)
app.include_router(recommendation_router)

@app.get("/")
def home():
    return {
        "message": "Croxy Backend Running"
    }