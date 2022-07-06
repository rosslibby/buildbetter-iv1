import csv
from datetime import datetime
from os.path import join
from typing import Dict, List, Type, TypeVar, Tuple

from pydantic import BaseModel, parse_obj_as

from utils.schemas import (
    ParticipantSpeakerChange,
    Participant,
    TranscriptLine,
    ParticipantSpeakerRange,
    CleanData,
)

DATA_DIR = "./data"
CLEAN_DATA_FILE = f"{DATA_DIR}/clean_data.json"
RAW_DATA_DIR = f"{DATA_DIR}/raw"
T = TypeVar("T", bound=BaseModel)


def read_csv(filename: str) -> List[Dict[str, str]]:
    with open(filename) as fp:
        reader = csv.DictReader(fp)
        lines = list(reader)
    return lines


def read_pydantic_models(filename: str, model: Type[T]) -> List[T]:
    objs = read_csv(filename)
    return parse_obj_as(List[model], objs)


def __get_filename(name):
    return join(RAW_DATA_DIR, f"{name}.csv")


def read_raw_files() -> Tuple[
    List[ParticipantSpeakerChange],
    List[Participant],
    List[TranscriptLine],
    datetime,
]:
    speaker_changes = read_pydantic_models(
        __get_filename("participant_speaker_changes"), ParticipantSpeakerChange
    )
    participants = read_pydantic_models(
        __get_filename("participants"), Participant
    )
    transcript_lines = read_pydantic_models(
        __get_filename("transcript_lines"), TranscriptLine
    )
    with open(join(RAW_DATA_DIR, "started_at")) as fp:
        started_at_iso = fp.read()
    started_at = datetime.fromisoformat(started_at_iso)
    return speaker_changes, participants, transcript_lines, started_at


def write_clean_file(
    participant_speaker_ranges: List[ParticipantSpeakerRange],
    participants: List[Participant],
    transcript_lines: List[TranscriptLine],
    filename: str,
):
    clean_data = CleanData(
        participant_speaker_ranges=participant_speaker_ranges,
        participants=participants,
        transcript_lines=transcript_lines,
    )
    with open(filename, "w") as fp:
        fp.write(clean_data.json())
