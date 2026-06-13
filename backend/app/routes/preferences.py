from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.oauth2 import verify_token
from app.database.db import get_db

from app.models.user import User
from app.models.preferences import UserPreference

from app.schemas.preferences_schema import PreferenceCreate

router = APIRouter(
    prefix="/preferences",
    tags=["Preferences"]
)


@router.post("/")
def create_preferences(
    preference: PreferenceCreate,
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

    existing_preferences = db.query(
        UserPreference
    ).filter(
        UserPreference.user_id == user.id
    ).first()

    if existing_preferences:
        raise HTTPException(
            status_code=400,
            detail="Preferences already exist"
        )

    new_preferences = UserPreference(
        user_id=user.id,
        favorite_genre=preference.favorite_genre,
        favorite_anime=preference.favorite_anime,
        favorite_music=preference.favorite_music,
        preferred_avatar=preference.preferred_avatar,
        mood=preference.mood
    )

    db.add(new_preferences)

    db.commit()

    db.refresh(new_preferences)

    return {
        "message": "Preferences saved successfully"
    }


@router.get("/me")
def get_preferences(
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    preferences = db.query(UserPreference).filter(
        UserPreference.user_id == user.id
    ).first()

    if not preferences:
        raise HTTPException(
            status_code=404,
            detail="Preferences not found"
        )

    return {
        "favorite_genre": preferences.favorite_genre,
        "favorite_anime": preferences.favorite_anime,
        "favorite_music": preferences.favorite_music,
        "preferred_avatar": preferences.preferred_avatar,
        "mood": preferences.mood
    }