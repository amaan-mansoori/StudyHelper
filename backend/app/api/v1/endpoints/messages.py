from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_

from app.api import deps
from app.db.session import get_db
from app.models.all_models import Message, User
from app.schemas.message import MessageCreate, MessageResponse

router = APIRouter()

@router.get("/{user_id}", response_model=List[MessageResponse])
async def read_messages(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Get messages between current user and specific user_id.
    """
    query = select(Message).where(
        or_(
            and_(Message.sender_id == current_user.id, Message.receiver_id == user_id),
            and_(Message.sender_id == user_id, Message.receiver_id == current_user.id)
        )
    ).order_by(Message.timestamp).offset(skip).limit(limit)
    
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/", response_model=MessageResponse)
async def create_message(
    *,
    db: AsyncSession = Depends(get_db),
    message_in: MessageCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Send a message.
    """
    if current_user.id == message_in.receiver_id:
        raise HTTPException(status_code=400, detail="Cannot send message to yourself")
        
    message = Message(
        content=message_in.content,
        sender_id=current_user.id,
        receiver_id=message_in.receiver_id,
        assignment_id=message_in.assignment_id
    )
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return message
