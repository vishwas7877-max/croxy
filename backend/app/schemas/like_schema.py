from pydantic import BaseModel

class LikeCreate(BaseModel):
    user_id: int
    content_id: int
