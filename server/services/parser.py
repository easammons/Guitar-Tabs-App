import os
import music21
from flask import current_app

GUITAR_MIDI_MIN = 40  # open low E string
GUITAR_MIDI_MAX = 88  # E6, well above highest fret


def _extract_melody_stream(score: music21.stream.Score) -> list:
    """Return the highest in-range note at each beat offset across all parts.

    Used for multi-staff input (e.g. piano). At each beat:
    - Notes below GUITAR_MIDI_MIN or above GUITAR_MIDI_MAX are ignored.
    - If multiple in-range notes share the same offset, only the highest
      (by MIDI number) is kept.
    - If only rests exist at an offset, one rest is kept.
    - Offsets with no in-range note AND no rest are omitted entirely.
    """
    from collections import defaultdict

    notes_by_offset: dict[float, list] = defaultdict(list)
    rests_by_offset: dict[float, list] = defaultdict(list)

    for part in score.parts:
        for el in part.flatten().notesAndRests:
            offset = float(el.offset)
            if isinstance(el, music21.note.Rest):
                rests_by_offset[offset].append(el)
            elif isinstance(el, music21.note.Note):
                if GUITAR_MIDI_MIN <= el.pitch.midi <= GUITAR_MIDI_MAX:
                    notes_by_offset[offset].append(el)
            elif isinstance(el, music21.chord.Chord):
                in_range = [
                    p for p in el.pitches
                    if GUITAR_MIDI_MIN <= p.midi <= GUITAR_MIDI_MAX
                ]
                if in_range:
                    notes_by_offset[offset].append(el)

    all_offsets = sorted(set(notes_by_offset) | set(rests_by_offset))
    result = []
    for offset in all_offsets:
        if notes_by_offset[offset]:
            best = max(
                notes_by_offset[offset],
                key=lambda el: (
                    el.pitch.midi
                    if isinstance(el, music21.note.Note)
                    else max(p.midi for p in el.pitches)
                ),
            )
            result.append(best)
        else:
            result.append(rests_by_offset[offset][0])

    return result


def _chord_quality(chord: music21.chord.Chord) -> tuple[str, str]:
    """Map a music21 chord to (short_quality, name_suffix).

    short_quality is what chord_voicer understands; name_suffix builds the
    human-readable chord name (e.g. '' -> C, 'm' -> Am, '7' -> G7).
    Unrecognized qualities return ('other', ...) so the voicer falls back to a
    literal voicing of the written notes.
    """
    common = chord.commonName
    if 'dominant seventh' in common:
        return 'dom7', '7'
    if 'major seventh' in common:
        return 'maj7', 'maj7'
    if 'minor seventh' in common:
        return 'min7', 'm7'
    if 'major triad' in common:
        return 'major', ''
    if 'minor triad' in common:
        return 'minor', 'm'
    return 'other', f' {common}'


def parse_musicxml(file_id: str) -> list[dict]:
    """Parse a MusicXML file and return a list of note/chord/rest dicts.

    Note dict:  type='note', pitch, octave, midi, duration, measure.
    Rest dict:  type='rest', pitch='R', octave/midi=None, duration, measure.
    Chord dict: type='chord', root, root_pc, quality, name, common_name,
                midis, pitches, duration, measure. Octave/voicing of the written
                notes is preserved in midis/pitches; the converter substitutes a
                guitar-friendly shape based on root + quality.
    """
    path = os.path.join(current_app.config['UPLOAD_FOLDER'], file_id)
    score = music21.converter.parse(path)
    notes = []
    for element in score.flatten().notesAndRests:
        if isinstance(element, music21.chord.Chord):
            root = element.root()
            quality, suffix = _chord_quality(element)
            pitches = sorted(element.pitches, key=lambda p: p.midi)
            notes.append({
                'type': 'chord',
                'root': root.name,
                'root_pc': root.pitchClass,
                'quality': quality,
                'name': f'{root.name}{suffix}',
                'common_name': element.commonName,
                'midis': [p.midi for p in pitches],
                'pitches': [p.nameWithOctave for p in pitches],
                'duration': float(element.quarterLength),
                'measure': element.measureNumber,
            })
        elif isinstance(element, music21.note.Note):
            notes.append({
                'type': 'note',
                'pitch': element.pitch.name,
                'octave': element.pitch.octave,
                'midi': element.pitch.midi,
                'duration': float(element.quarterLength),
                'measure': element.measureNumber,
            })
        elif isinstance(element, music21.note.Rest):
            notes.append({
                'type': 'rest',
                'pitch': 'R',
                'octave': None,
                'midi': None,
                'duration': float(element.quarterLength),
                'measure': element.measureNumber,
            })
    return notes
