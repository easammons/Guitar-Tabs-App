import os
from flask import current_app


def parse_musicxml(file_id: str) -> list[dict]:
    """Parse a MusicXML file and return a list of note dicts.

    Each note dict contains: pitch, octave, midi, duration, measure.
    Rests use pitch='R' with octave/midi=None.

    Sprint 3: implement with music21.
    """
    # TODO (Sprint 3): replace stub with music21 implementation
    # import music21
    # path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_id)
    # score = music21.converter.parse(path)
    # notes = []
    # for element in score.flatten().notesAndRests:
    #     if isinstance(element, music21.note.Note):
    #         notes.append({
    #             'pitch': element.pitch.name,
    #             'octave': element.pitch.octave,
    #             'midi': element.pitch.midi,
    #             'duration': float(element.quarterLength),
    #             'measure': element.measureNumber,
    #         })
    #     elif isinstance(element, music21.note.Rest):
    #         notes.append({
    #             'pitch': 'R',
    #             'octave': None,
    #             'midi': None,
    #             'duration': float(element.quarterLength),
    #             'measure': element.measureNumber,
    #         })
    # return notes
    return []
