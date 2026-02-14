from pydantic import BaseModel, ConfigDict
from typing import Optional

class NoteBase(BaseModel):
    title: str
    content: Optional[str] = None
    file_url: Optional[str] = None

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class NoteResponse(NoteBase):
    id: int
    owner_id: int
    
    model_config = ConfigDict(from_attributes=True)
