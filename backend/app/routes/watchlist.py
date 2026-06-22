from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db
from app.schemas.watchlist_schema import WatchlistCreate

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])


@router.post("/add")
def add_to_watchlist(
    watchlist: WatchlistCreate,
    db: Session = Depends(get_db)
):

    existing = db.execute(
        text("""
            SELECT id
            FROM watchlists
            WHERE user_id = :user_id
            AND content_id = :content_id
        """),
        {
            "user_id": watchlist.user_id,
            "content_id": watchlist.content_id
        }
    ).fetchone()

    if existing:
        return {"message": "Anime already in watchlist"}

    db.execute(
        text("""
            INSERT INTO watchlists (user_id, content_id)
            VALUES (:user_id, :content_id)
        """),
        {
            "user_id": watchlist.user_id,
            "content_id": watchlist.content_id
        }
    )

    db.commit()

    return {"message": "Added to watchlist"}

@router.get("/{user_id}")
def get_watchlist(
    user_id: int,
    db: Session = Depends(get_db)
):
    result = db.execute(
        text("""
            SELECT
                w.id,
                c.id AS content_id,
                c.title,
                c.rating,
                c.release_year
            FROM watchlists w
            JOIN content c
                ON w.content_id = c.id
            WHERE w.user_id = :user_id
        """),
        {"user_id": user_id}
    )

    rows = result.mappings().all()

    return rows


@router.delete("/{user_id}/{content_id}")
def remove_from_watchlist(
    user_id: int,
    content_id: int,
    db: Session = Depends(get_db)
):
    db.execute(
        text("""
            DELETE FROM watchlists
            WHERE user_id = :user_id
            AND content_id = :content_id
        """),
        {
            "user_id": user_id,
            "content_id": content_id
        }
    )

    db.commit()

    return {"message": "Removed from watchlist"}