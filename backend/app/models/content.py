from sqlalchemy import Column, Integer, String, Float, Text
from app.database.db import Base

class Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    content_type = Column(String, nullable=False)

    description = Column(Text)

    release_year = Column(Integer)

    rating = Column(Float)

    popularity_score = Column(Float)