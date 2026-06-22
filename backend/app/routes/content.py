from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import Query
from app.database.db import get_db
from app.models.content import Content
from app.schemas.content_schema import ContentResponse
from sqlalchemy import text
router = APIRouter()

@router.get("/content", response_model=list[ContentResponse])
def get_content(db: Session = Depends(get_db)):
    return db.query(Content).all()

@router.get("/content/{content_id}", response_model=ContentResponse)
def get_single_content(content_id: int, db: Session = Depends(get_db)):
    
    content = db.query(Content).filter(
        Content.id == content_id
    ).first()

    return content

@router.get("/search", response_model=list[ContentResponse])
def search_content(
    title: str = Query(...),
    db: Session = Depends(get_db)
):

    results = db.query(Content).filter(
        Content.title.ilike(f"%{title}%")
    ).all()

    return results

@router.get("/recommended/{content_id}")
def get_recommendations(
    content_id: int,
    db: Session = Depends(get_db)
):

    query = text("""

    SELECT DISTINCT c.id, c.title, c.rating

    FROM content c

    JOIN content_genres cg
        ON c.id = cg.content_id

    WHERE cg.genre_id IN (

        SELECT genre_id
        FROM content_genres
        WHERE content_id = :content_id

    )

    AND c.id != :content_id

    ORDER BY c.rating DESC

    LIMIT 5

    """)

    results = db.execute(
        query,
        {"content_id": content_id}
    ).fetchall()

    return [
        {
            "id": row.id,
            "title": row.title,
            "rating": row.rating
        }
        for row in results
    ]
