from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base


class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    favorite_genre = Column(String)

    favorite_anime = Column(String)

    favorite_music = Column(String)

    preferred_avatar = Column(String)

    mood = Column(String)