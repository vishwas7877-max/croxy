from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db

router = APIRouter(
    prefix="/genre",
    tags=["Genres"]
)


@router.get("/{genre_id}")
def get_anime_by_genre(
    genre_id: int,
    db: Session = Depends(get_db)
):
    result = db.execute(
        text("""
            SELECT
                c.id,
                c.title,
                c.description,
                c.rating,
                c.release_year

            FROM content c

            JOIN content_genres cg
                ON c.id = cg.content_id

            WHERE cg.genre_id = :genre_id

            ORDER BY c.rating DESC
        """),
        {
            "genre_id": genre_id
        }
    )

    return result.mappings().all()