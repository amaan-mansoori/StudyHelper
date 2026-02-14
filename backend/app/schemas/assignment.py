from pydantic import BaseModel, ConfigDict
from typing import Optional
from app.models.all_models import AssignmentStatus

class AssignmentBase(BaseModel):
    title: str
    description: str
    budget: float
    status: AssignmentStatus = AssignmentStatus.OPEN

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentUpdate(AssignmentBase):
    pass

class AssignmentResponse(AssignmentBase):
    id: int
    owner_id: int
    
    model_config = ConfigDict(from_attributes=True)
