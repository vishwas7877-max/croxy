from fastapi import FastAPI
from app.database.db import engine, Base
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.models.preferences import UserPreference
from app.routes.preferences import router as preferences_router
from app.routes.recommendations import router as recommendation_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.content import router as content_router
from app.routes.watchlist import router as watchlist_router
from app.routes.like import router as like_router
from app.routes.history import router as history_router
from app.routes.recommendation import router as recommendation_router
from app.routes.genre import router as genre_router
from app.routes.top_rated import router as top_rated_router
from app.routes.filter import router as filter_router
from app.routes.recommendation_engine import router as recommendation_engine_router











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
app.include_router(content_router)
app.include_router(watchlist_router)
app.include_router(like_router)
app.include_router(history_router)
app.include_router(recommendation_router)
app.include_router(genre_router)
app.include_router(top_rated_router)
app.include_router(filter_router)
app.include_router(recommendation_engine_router)







@app.get("/")
def home():
    return {
        "message": "Croxy Backend Running"
    }