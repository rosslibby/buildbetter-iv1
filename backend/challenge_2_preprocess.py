from os.path import join

from utils.io import (
    read_raw_files,
    write_clean_file,
    DATA_DIR,
    CLEAN_DATA_FILE,
)
from utils.speaker_changes import (
    dedup_speaker_changes,
    convert_speaker_changes_to_ranges,
    get_ended_at,
)


def main():
    (
        speaker_changes,
        participants,
        transcript_lines,
        started_at,
    ) = read_raw_files()
    deduped_speaker_changes = dedup_speaker_changes(speaker_changes)
    ended_at = get_ended_at(transcript_lines, started_at)
    speaker_ranges = convert_speaker_changes_to_ranges(
        deduped_speaker_changes, started_at, ended_at
    )
    write_clean_file(
        speaker_ranges,
        participants,
        transcript_lines,
        CLEAN_DATA_FILE,
    )


if __name__ == "__main__":
    main()
