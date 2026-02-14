from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.db.session import get_db
from app.models.all_models import Assignment, AssignmentStatus, User
from app.schemas.assignment import AssignmentCreate, AssignmentResponse

router = APIRouter()

@router.get("/", response_model=List[AssignmentResponse])
async def read_assignments(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve assignments.
    """
    result = await db.execute(select(Assignment).offset(skip).limit(limit))
    return result.scalars().all()

@router.post("/", response_model=AssignmentResponse)
async def create_assignment(
    *,
    db: AsyncSession = Depends(get_db),
    assignment_in: AssignmentCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Create new assignment.
    """
    assignment = Assignment(
        title=assignment_in.title,
        description=assignment_in.description,
        budget=assignment_in.budget,
        status=AssignmentStatus.OPEN,
        owner_id=current_user.id
    )
    db.add(assignment)
    await db.commit()
    await db.refresh(assignment)
    return assignment
