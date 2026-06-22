from pydantic import BaseModel
from typing import List

class FilterRequest(BaseModel):
    genre_ids: List[int]