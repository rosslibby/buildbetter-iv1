from datetime import datetime, timedelta

from utils.schemas import (
    TranscriptLine,
    ParticipantSpeakerChange,
    ParticipantSpeakerRange,
)
from utils.speaker_changes import (
    get_ended_at,
    convert_speaker_changes_to_ranges,
    dedup_speaker_changes,
)


def test_get_ended_at():
    now = datetime.now()
    ended_at = get_ended_at(
        [
            TranscriptLine(start=1.0, end=2.0, speaker=0, text="hello"),
            TranscriptLine(start=2.0, end=3.0, speaker=1, text="world"),
        ],
        now,
    )
    assert ended_at == (now + timedelta(seconds=3.0))


def test_convert_speaker_changes_to_ranges():
    to_hour_resolution_args = dict(year=2020, month=1, day=1, hour=6)
    speaker_changes = [
        ParticipantSpeakerChange(
            participant_id=1,
            timestamp=datetime(**to_hour_resolution_args, second=30),
        ),
        ParticipantSpeakerChange(
            participant_id=2,
            timestamp=datetime(**to_hour_resolution_args, minute=1),
        ),
    ]
    started_at = datetime(**to_hour_resolution_args)
    ended_at = datetime(**to_hour_resolution_args, minute=1, second=30)
    rv = convert_speaker_changes_to_ranges(
        speaker_changes, started_at, ended_at
    )
    assert rv == [
        ParticipantSpeakerRange(participant_id=1, start=30.0, end=60.0),
        ParticipantSpeakerRange(participant_id=2, start=60.0, end=90),
    ]


def test_dedup_speaker_changes():
    to_hour_resolution_args = dict(year=2020, month=1, day=1, hour=6)
    speaker_changes = [
        ParticipantSpeakerChange(
            participant_id=1,
            timestamp=datetime(**to_hour_resolution_args, second=30),
        ),
        ParticipantSpeakerChange(
            participant_id=1,
            timestamp=datetime(**to_hour_resolution_args, second=35),
        ),
        ParticipantSpeakerChange(
            participant_id=2,
            timestamp=datetime(**to_hour_resolution_args, second=36),
        ),
        ParticipantSpeakerChange(
            participant_id=2,
            timestamp=datetime(**to_hour_resolution_args, second=40),
        ),
    ]
    assert dedup_speaker_changes(speaker_changes) == [
        speaker_changes[0],
        speaker_changes[2],
    ]
