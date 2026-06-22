from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db

router = APIRouter(
    prefix="/top-rated",
    tags=["Top Rated"]
)


@router.get("/")
def get_top_rated(
    db: Session = Depends(get_db)
):
    result = db.execute(
        text("""
            SELECT
                id,
                title,
                description,
                rating,
                release_year
            FROM content
            ORDER BY rating DESC
            LIMIT 10
        """)
    )

    return result.mappings().all()