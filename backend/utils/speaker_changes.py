from datetime import datetime, timedelta
from typing import List

from toolz import sliding_window

from utils.schemas import (
    ParticipantSpeakerChange,
    ParticipantSpeakerRange,
    TranscriptLine,
)


def get_ended_at(
    transcript_lines: List[TranscriptLine], started_at: datetime
) -> datetime:
    largest_end_seconds = max(line.end for line in transcript_lines)
    return started_at + timedelta(seconds=largest_end_seconds)


def convert_speaker_changes_to_ranges(
    speaker_changes: List[ParticipantSpeakerChange],
    started_at: datetime,
    ended_at: datetime,
) -> List[ParticipantSpeakerRange]:
    if len(speaker_changes) == 0:
        return []
    speaker_ranges: List[ParticipantSpeakerRange] = []
    for cur, next_ in sliding_window(2, speaker_changes):
        cur: ParticipantSpeakerChange
        next_: ParticipantSpeakerChange
        assert cur.participant_id != next_.participant_id
        start = (cur.timestamp - started_at).total_seconds()
        end = (next_.timestamp - started_at).total_seconds()
        speaker_ranges.append(
            ParticipantSpeakerRange(
                participant_id=cur.participant_id, start=start, end=end
            )
        )
    # fill in last range
    cur = speaker_changes[-1]
    start = (cur.timestamp - started_at).total_seconds()
    end = (ended_at - started_at).total_seconds()
    speaker_ranges.append(
        ParticipantSpeakerRange(
            participant_id=cur.participant_id, start=start, end=end
        )
    )
    return speaker_ranges


def dedup_speaker_changes(speaker_changes: List[ParticipantSpeakerChange]):
    if len(speaker_changes) in [0, 1]:
        return speaker_changes
    deduped_speaker_changes: List[ParticipantSpeakerChange] = [
        speaker_changes[0]
    ]
    for cur_speaker_change in speaker_changes[1:]:
        prev_speaker_change = deduped_speaker_changes[-1]
        if (
            cur_speaker_change.participant_id
            != prev_speaker_change.participant_id
        ):
            deduped_speaker_changes.append(cur_speaker_change)
    return deduped_speaker_changes
