# Standard tuning open-string MIDI values, strings 6 (low E) → 1 (high E)
OPEN_MIDI = [40, 45, 50, 55, 59, 64]


def midi_to_string_fret(midi: int) -> dict | None:
    """Map a MIDI note number to the lowest guitar string that can play it.

    Returns {'string': 1-6, 'fret': 0-12} or None if out of playable range.
    """
    for string_num, open_note in enumerate(OPEN_MIDI, start=1):
        fret = midi - open_note
        if 0 <= fret <= 12:
            return {'string': string_num, 'fret': fret}
    return None


def convert_notes_to_tab(notes: list[dict]) -> list[dict]:
    """Convert parsed notes to guitar tab assignments.

    Sprint 4: implement conversion logic.
    """
    # TODO (Sprint 4): uncomment to enable full conversion
    # tab = []
    # for note in notes:
    #     if note['pitch'] == 'R':
    #         tab.append({**note, 'string': None, 'fret': None, 'flag': 'rest'})
    #         continue
    #     placement = midi_to_string_fret(note['midi'])
    #     if placement is None:
    #         tab.append({**note, 'string': None, 'fret': None, 'flag': 'out_of_range'})
    #     else:
    #         tab.append({**note, **placement, 'flag': None})
    # return tab
    return notes
