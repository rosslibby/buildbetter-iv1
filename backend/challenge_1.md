# Technical Interview Challenge #1

## Purpose
Much of programming well is being able to read code. This challenge assesses that ability. 

## Challenge
Read `challenge_2_preprocess.py` and imported modules. 

Write about the preprocessing steps to transform the csv files in `data/raw` to `clean_data.json`

## Answer

The instructions were very open-ended. I will cover this succinctly with the hopes that my ability to read and comprehend the code shows through the following outline:

**`read_raw_files`**
This method relies on the following:
- `read_csv`: open the asset located at the passed filepath argument `{filename}` by utilizing Python's CSV file read/write utility, `DictReader`. Extract each line from the file and return these at the end of the method
- `read_pydantic_models`: utilize the [_Pydantic_](https://pydantic-docs.helpmanual.io/) parsing library to read the passed CSV filepath `{path}/{filename}.csv`, going on to call `read_csv` to process the file and finally returning a JSONified version of that file, converting the CSV's headings (the first line, located at index 0) to keys and splitting each subsequent line by comma, assigning the comma-dilineated items as values to their respective key indices
- `__get_filename`: utilize the `{name}` argument to construct the filepath, complete with its enclosing directory and the `.csv` extension, e.g. `/backend/data/raw/participant_speaker_changes.csv`

The `read_raw_files` method returns a tuple containing lists of each file type: _ParticipantSpeakerChange_, _Participant_, _TranscriptLine_, and the time at which the processing occurred.

**`write_clean_file`**
This method accepts the lists for _ParticipantSpeakerChange_, _Participant_ and _TranscriptLine_, along with the filename associated with each of these lists. The `CleanData` method extends `pydantic`'s `BaseModel`, adding the following fields:
- `participant_speaker_ranges`: stores a `List` of the data extracted from the relevant _ParticipantSpeakerChange_ CSV
- `participants`: stores a `List` of the data extracted from the relevant _Participant_ CSV
- `transcript_lines`: stores a `List` of the data extracted from the relevant _TranscriptLine_ CSV

The cleaned data is then written to the `clean_data.json` file.

---

**`main`**
This method accepts the information processed in the `utils.io` methods, parsing speaker changes and writing that data - along with the imported information (`participants`, `transcript_lines`, `started_at`) - and writes all of these to the `clean_data.json` file by calling the `write_clean_file` method. I have run out of time so I am unable to go more in-depth as pertains to the `utils.speaker_changes` methods.