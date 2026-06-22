from pydantic import BaseModel

class WatchlistCreate(BaseModel):
    user_id: int
    content_id: int