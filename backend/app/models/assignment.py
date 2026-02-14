from sqlalchemy import String, Integer, ForeignKey, Text, Float, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base
import enum

class AssignmentStatus(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class Assignment(Base):
    __tablename__ = "assignments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    budget: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[AssignmentStatus] = mapped_column(default=AssignmentStatus.OPEN)
    owner_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", backref="assignments")
