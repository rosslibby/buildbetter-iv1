from datetime import datetime
from typing import List

from pydantic import BaseModel, EmailStr


# raw data schemas
class ParticipantSpeakerChange(BaseModel):
    participant_id: int
    timestamp: datetime


class Participant(BaseModel):
    name: str
    participant_id: int


class TranscriptLine(BaseModel):
    start: float
    end: float
    speaker: int
    text: str


# clean data schema
class ParticipantSpeakerRange(BaseModel):
    participant_id: int
    start: float
    end: float


class CleanData(BaseModel):
    participant_speaker_ranges: List[ParticipantSpeakerRange]
    participants: List[Participant]
    transcript_lines: List[TranscriptLine]
