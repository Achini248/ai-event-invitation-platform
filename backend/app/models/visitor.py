from pydantic import BaseModel, EmailStr, field_validator


class VisitorRequest(BaseModel):
    name: str
    email: str
    interest: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be empty")
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v

    @field_validator("email")
    @classmethod
    def email_format(cls, v: str) -> str:
        v = v.strip().lower()
        if "@" not in v or "." not in v.split("@")[-1]:
            raise ValueError("Enter a valid email address")
        return v

    @field_validator("interest")
    @classmethod
    def interest_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Professional focus cannot be empty")
        if len(v) < 10:
            raise ValueError("Please describe your focus in at least 10 characters")
        return v
