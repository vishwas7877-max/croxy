from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db
from app.schemas.filter_schema import FilterRequest

router = APIRouter(
    prefix="/filter",
    tags=["Filter"]
)


@router.post("/")
def filter_anime(
    filters: FilterRequest,
    db: Session = Depends(get_db)
):
    genre_ids = filters.genre_ids
    total_selected = len(genre_ids)

    genre_list = ",".join(str(g) for g in genre_ids)

    filtered_query = f"""
        SELECT
            c.id,
            c.title,
            c.description,
            c.rating,
            c.release_year,
            COUNT(cg.genre_id) AS match_score

        FROM content c

        JOIN content_genres cg
            ON c.id = cg.content_id

        WHERE cg.genre_id IN ({genre_list})

        GROUP BY
            c.id,
            c.title,
            c.description,
            c.rating,
            c.release_year

        ORDER BY
            match_score DESC,
            c.rating DESC
    """

    filtered_result = db.execute(text(filtered_query))
    filtered_content = filtered_result.mappings().all()

    # Add match percentage
    filtered_content = [
        {
            **row,
            "match_percentage": round(
                (row["match_score"] / total_selected) * 100,
                2
            )
        }
        for row in filtered_content
    ]

    top_rated = sorted(
        filtered_content,
        key=lambda x: x["rating"],
        reverse=True
    )

    return {
        "filtered_content": filtered_content,
        "top_rated": top_rated
    }