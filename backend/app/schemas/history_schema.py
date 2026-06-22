from pydantic import BaseModel,Field

class HistoryCreate(BaseModel):
    user_id: int
    content_id: int
    progress_percent: float = Field(
        ge=0,
        le=100
    )