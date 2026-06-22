from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db
from app.schemas.history_schema import HistoryCreate

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.post("/")
def add_history(
    history: HistoryCreate,
    db: Session = Depends(get_db)
):
    existing = db.execute(
        text("""
            SELECT id
            FROM watch_history
            WHERE user_id = :user_id
            AND content_id = :content_id
        """),
        {
            "user_id": history.user_id,
            "content_id": history.content_id
        }
    ).fetchone()

    if existing:
        db.execute(
            text("""
                UPDATE watch_history
                SET progress_percent = :progress_percent,
                    watched_at = CURRENT_TIMESTAMP
                WHERE user_id = :user_id
                AND content_id = :content_id
            """),
            {
                "user_id": history.user_id,
                "content_id": history.content_id,
                "progress_percent": history.progress_percent
            }
        )

        db.commit()

        return {"message": "History updated"}

    db.execute(
        text("""
            INSERT INTO watch_history (
                user_id,
                content_id,
                progress_percent
            )
            VALUES (
                :user_id,
                :content_id,
                :progress_percent
            )
        """),
        {
            "user_id": history.user_id,
            "content_id": history.content_id,
            "progress_percent": history.progress_percent
        }
    )

    db.commit()

    return {"message": "History added successfully"}


@router.get("/{user_id}")
def get_history(
    user_id: int,
    db: Session = Depends(get_db)
):
    result = db.execute(
        text("""
            SELECT
                h.id,
                c.id AS content_id,
                c.title,
                h.progress_percent,
                h.watched_at

            FROM watch_history h

            JOIN content c
                ON h.content_id = c.id

            WHERE h.user_id = :user_id

            ORDER BY h.watched_at DESC
        """),
        {
            "user_id": user_id
        }
    )

    return result.mappings().all()


@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    db: Session = Depends(get_db)
):
    db.execute(
        text("""
            DELETE FROM watch_history
            WHERE id = :history_id
        """),
        {
            "history_id": history_id
        }
    )

    db.commit()

    return {"message": "History removed successfully"}