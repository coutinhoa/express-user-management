from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: str
    profession: str
    age: int
    location: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserUpdate(UserBase):
    name: Optional [str]=None
    email: Optional [str]=None
    profession: Optional [str]=None
    age: Optional [int]=None
    location: Optional [str]=None