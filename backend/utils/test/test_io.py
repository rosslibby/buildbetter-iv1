import tempfile
from datetime import datetime
from typing import List, Tuple

from pydantic import BaseModel, parse_obj_as

from utils.io import (
    read_csv,
    read_pydantic_models,
    read_raw_files,
    write_clean_file,
)
from utils.schemas import (
    ParticipantSpeakerRange,
    Participant,
    TranscriptLine,
    CleanData,
)

test_csv = """col_1,col_2
1,hello
3,world"""
test_objs = [
    {"col_1": "1", "col_2": "hello"},
    {"col_1": "3", "col_2": "world"},
]


class Model(BaseModel):
    col_1: int
    col_2: str


def __write_tempfile() -> str:
    tmp = tempfile.mktemp()
    with open(tmp, "w") as fp:
        fp.write(test_csv)
    return tmp


def test_read_csv():
    tmp = __write_tempfile()
    assert read_csv(tmp) == test_objs


def test_read_pydantic_models():
    tmp = __write_tempfile()
    assert read_pydantic_models(tmp, Model) == parse_obj_as(
        List[Model], test_objs
    )


def test_read_raw_files():
    rv = read_raw_files()
    assert isinstance(rv, Tuple)
    assert all([isinstance(val, List) for val in rv[:-1]])
    assert isinstance(rv[-1], datetime)


def test_write_clean_file():
    tmp = __write_tempfile()
    data = CleanData(
        participant_speaker_ranges=[
            ParticipantSpeakerRange(participant_id=1, start=0, end=1)
        ],
        participants=[Participant(participant_id=1, name="Bob Saget")],
        transcript_lines=[
            TranscriptLine(start=0, end=1, speaker=0, text="hello world")
        ],
    )
    write_clean_file(
        participant_speaker_ranges=data.participant_speaker_ranges,
        participants=data.participants,
        transcript_lines=data.transcript_lines,
        filename=tmp,
    )
    CleanData.parse_file(tmp)
