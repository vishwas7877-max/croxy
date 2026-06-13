from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.oauth2 import verify_token
from app.database.db import get_db

from app.models.user import User
from app.models.preferences import UserPreference

router = APIRouter(
    prefix="/recommend",
    tags=["Recommendations"]
)


anime_db = {
    "Action": {
        "Energetic": [
            "Attack on Titan",
            "Jujutsu Kaisen",
            "Demon Slayer"
        ],
        "Calm": [
            "Samurai Champloo",
            "Cowboy Bebop"
        ]
    },

    "Romance": {
        "Happy": [
            "Horimiya",
            "Your Name"
        ],
        "Sad": [
            "Clannad",
            "Plastic Memories"
        ]
    },

    "Comedy": {
        "Energetic": [
            "Gintama",
            "Konosuba"
        ],
        "Relaxed": [
            "Spy x Family",
            "Nichijou"
        ]
    }
}


music_db = {
    "Energetic": [
        "Phonk",
        "EDM",
        "Trap"
    ],

    "Relaxed": [
        "Lo-fi",
        "Jazz",
        "Ambient"
    ],

    "Sad": [
        "Slow Piano",
        "Acoustic",
        "Soft Indie"
    ],

    "Happy": [
        "Pop",
        "Dance",
        "Funk"
    ]
}


@router.get("/anime")
def recommend_anime(
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    preferences = db.query(UserPreference).filter(
        UserPreference.user_id == user.id
    ).first()

    if not preferences:
        raise HTTPException(
            status_code=404,
            detail="Preferences not found"
        )

    genre = preferences.favorite_genre
    mood = preferences.mood

    recommendations = anime_db.get(
        genre,
        {}
    ).get(
        mood,
        ["One Piece"]
    )

    return {
        "user": user.username,
        "genre": genre,
        "mood": mood,
        "recommendations": recommendations
    }


@router.get("/music")
def recommend_music(
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    preferences = db.query(UserPreference).filter(
        UserPreference.user_id == user.id
    ).first()

    if not preferences:
        raise HTTPException(
            status_code=404,
            detail="Preferences not found"
        )

    mood = preferences.mood

    recommendations = music_db.get(
        mood,
        ["Lo-fi"]
    )

    return {
        "user": user.username,
        "mood": mood,
        "music_recommendations": recommendations
    }