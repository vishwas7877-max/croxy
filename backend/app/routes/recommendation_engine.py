from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.db import get_db

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendation Engine"]
)


@router.get("/user/{user_id}")
def personalized_recommendations(
    user_id: int,
    db: Session = Depends(get_db)
):

    # User preference
    preference = db.execute(
        text("""
            SELECT favorite_genre
            FROM user_preferences
            WHERE user_id = :user_id
        """),
        {"user_id": user_id}
    ).fetchone()

    favorite_genre = None

    if preference:
        favorite_genre = preference.favorite_genre

    # Watch history genres (NO DISTINCT)
    watched_genres = db.execute(
        text("""
            SELECT g.name
            FROM watch_history wh
            JOIN content_genres cg
                ON wh.content_id = cg.content_id
            JOIN genres g
                ON cg.genre_id = g.id
            WHERE wh.user_id = :user_id
        """),
        {"user_id": user_id}
    ).fetchall()

    watched_genres = [
        row.name for row in watched_genres
    ]

    # Liked genres (NO DISTINCT)
    liked_genres = db.execute(
        text("""
            SELECT g.name
            FROM liked_content lc
            JOIN content_genres cg
                ON lc.content_id = cg.content_id
            JOIN genres g
                ON cg.genre_id = g.id
            WHERE lc.user_id = :user_id
        """),
        {"user_id": user_id}
    ).fetchall()

    liked_genres = [
        row.name for row in liked_genres
    ]

    # Build genre profile
    genre_profile = {}

    # Watch history weight = 1
    for genre in watched_genres:
        genre_profile[genre] = (
            genre_profile.get(genre, 0) + 1
        )

    # Like weight = 2
    for genre in liked_genres:
        genre_profile[genre] = (
            genre_profile.get(genre, 0) + 2
        )

    # Candidate anime
    anime = db.execute(
        text("""
            SELECT
                c.id,
                c.title,
                c.description,
                c.rating,
                c.release_year,
                g.name AS genre_name

            FROM content c

            JOIN content_genres cg
                ON c.id = cg.content_id

            JOIN genres g
                ON cg.genre_id = g.id

            WHERE c.id NOT IN (
                SELECT content_id
                FROM watch_history
                WHERE user_id = :user_id
            )

            AND c.id NOT IN (
                SELECT content_id
                FROM liked_content
                WHERE user_id = :user_id
            )
        """),
        {"user_id": user_id}
    ).mappings().all()

    recommendations = {}

    for row in anime:

        anime_id = row["id"]

        if anime_id not in recommendations:

            recommendations[anime_id] = {
                "id": row["id"],
                "title": row["title"],
                "description": row["description"],
                "rating": row["rating"],
                "release_year": row["release_year"],
                "recommendation_score": 0,
                "genre_matches": []
            }

        genre = row["genre_name"]

        # Frequency score
        if genre in genre_profile:

            recommendations[anime_id]["recommendation_score"] += (
                genre_profile[genre]
            )

            recommendations[anime_id]["genre_matches"].append(
                f"{genre} ({genre_profile[genre]})"
            )

        # Favorite genre bonus
        if genre == favorite_genre:
            recommendations[anime_id]["recommendation_score"] += 3

    # Rating bonus
    for anime_data in recommendations.values():

        if anime_data["rating"] >= 9:
            anime_data["recommendation_score"] += 2

        elif anime_data["rating"] >= 8:
            anime_data["recommendation_score"] += 1

    recommendations = sorted(
        recommendations.values(),
        key=lambda x: (
            x["recommendation_score"],
            x["rating"]
        ),
        reverse=True
    )

    return {
        "genre_profile": genre_profile,
        "recommendations": recommendations[:10]
    }