from pydantic import BaseModel


class PreferenceCreate(BaseModel):

    favorite_genre: str

    favorite_anime: str

    favorite_music: str

    preferred_avatar: str

    mood: str