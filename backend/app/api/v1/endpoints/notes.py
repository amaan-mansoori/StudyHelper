from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.db.session import get_db
from app.models.all_models import Note, User
from app.schemas.note import NoteCreate, NoteResponse

router = APIRouter()

@router.get("/", response_model=List[NoteResponse])
async def read_notes(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve notes.
    """
    result = await db.execute(
        select(Note).where(Note.owner_id == current_user.id).offset(skip).limit(limit)
    )
    return result.scalars().all()

@router.post("/", response_model=NoteResponse)
async def create_note(
    *,
    db: AsyncSession = Depends(get_db),
    note_in: NoteCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Create new note.
    """
    note = Note(
        title=note_in.title,
        content=note_in.content,
        file_url=note_in.file_url,
        owner_id=current_user.id
    )
    db.add(note)
    await db.commit()
    await db.refresh(note)
    return note
