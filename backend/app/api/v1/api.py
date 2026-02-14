from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, notes, assignments, messages

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(notes.router, prefix="/notes", tags=["notes"])
api_router.include_router(assignments.router, prefix="/assignments", tags=["assignments"])
api_router.include_router(messages.router, prefix="/messages", tags=["messages"])
