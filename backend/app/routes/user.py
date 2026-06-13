from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.oauth2 import verify_token
from app.database.db import get_db
from app.models.user import User

router = APIRouter(
    prefix="/user",
    tags=["User"]
)


@router.get("/profile")
def profile(current_user: str = Depends(verify_token)):

    return {
        "message": "Protected route accessed",
        "user": current_user
    }


@router.get("/me")
def get_current_user(
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

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }