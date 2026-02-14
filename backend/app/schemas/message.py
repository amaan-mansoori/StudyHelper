from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class MessageBase(BaseModel):
    content: str
    assignment_id: Optional[int] = None

class MessageCreate(MessageBase):
    receiver_id: int

class MessageResponse(MessageBase):
    id: int
    sender_id: int
    receiver_id: int
    timestamp: datetime
    
    model_config = ConfigDict(from_attributes=True)
