from pydantic import BaseModel

class ContentResponse(BaseModel):
    id: int
    title: str
    content_type: str
    description: str | None = None
    release_year: int | None = None
    rating: float | None = None

    class Config:
        from_attributes = True