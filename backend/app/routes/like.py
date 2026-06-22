from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db
from app.schemas.like_schema import LikeCreate

router = APIRouter(
    prefix="/like",
    tags=["Likes"]
)


@router.post("/")
def add_like(
    like: LikeCreate,
    db: Session = Depends(get_db)
):
    existing = db.execute(
        text("""
            SELECT id
            FROM liked_content
            WHERE user_id = :user_id
            AND content_id = :content_id
        """),
        {
            "user_id": like.user_id,
            "content_id": like.content_id
        }
    ).fetchone()

    if existing:
        return {"message": "Anime already liked"}

    db.execute(
        text("""
            INSERT INTO liked_content (user_id, content_id)
            VALUES (:user_id, :content_id)
        """),
        {
            "user_id": like.user_id,
            "content_id": like.content_id
        }
    )

    db.commit()

    return {"message": "Anime liked successfully"}


@router.get("/{user_id}")
def get_likes(
    user_id: int,
    db: Session = Depends(get_db)
):
    result = db.execute(
        text("""
            SELECT
                l.id,
                c.id AS content_id,
                c.title,
                c.rating,
                c.release_year

            FROM liked_content l

            JOIN content c
                ON l.content_id = c.id

            WHERE l.user_id = :user_id
        """),
        {
            "user_id": user_id
        }
    )

    return result.mappings().all()


@router.delete("/{user_id}/{content_id}")
def remove_like(
    user_id: int,
    content_id: int,
    db: Session = Depends(get_db)
):
    db.execute(
        text("""
            DELETE FROM liked_content
            WHERE user_id = :user_id
            AND content_id = :content_id
        """),
        {
            "user_id": user_id,
            "content_id": content_id
        }
    )

    db.commit()

    return {"message": "Like removed successfully"}