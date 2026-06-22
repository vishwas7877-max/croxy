from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get("/next-watch/{user_id}")
def next_watch(
    user_id: int,
    db: Session = Depends(get_db)
):

    # Last watched anime
    last_watched = db.execute(
        text("""
            SELECT content_id
            FROM watch_history
            WHERE user_id = :user_id
            ORDER BY watched_at DESC
            LIMIT 1
        """),
        {"user_id": user_id}
    ).fetchone()

    if not last_watched:
        return {
            "message": "No watch history found"
        }

    content_id = last_watched.content_id

    # Similar anime recommendation
    recommendations = db.execute(
        text("""
            SELECT DISTINCT
                c.id,
                c.title,
                c.rating,
                c.release_year

            FROM content c

            JOIN content_genres cg
                ON c.id = cg.content_id

            WHERE cg.genre_id IN (

                SELECT genre_id
                FROM content_genres
                WHERE content_id = :content_id

            )

            AND c.id != :content_id

            AND c.id NOT IN (

                SELECT content_id
                FROM watch_history
                WHERE user_id = :user_id

            )

            ORDER BY c.rating DESC

            LIMIT 5
        """),
        {
            "content_id": content_id,
            "user_id": user_id
        }
    )

    return recommendations.mappings().all()