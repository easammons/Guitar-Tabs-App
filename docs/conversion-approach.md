# Conversion Approach — Guitar Tab Generator

## Decision: music21 (Python)

After comparing options, the team chose **music21** as the conversion library.

---

## Options Considered

### Option 1: Rule-based (manual pitch → fret mapping)
- Parse MusicXML manually using an XML library
- Map pitch + octave to MIDI number, then MIDI → string/fret with a lookup table
- **Pros:** No extra dependencies, full control, runs in Node
- **Cons:** Have to handle every MusicXML edge case manually (ties, chords, accidentals, multi-part scores); significant parser work with no music theory awareness

### Option 2: music21 (Python)
- MIT library built specifically for music analysis and MusicXML
- Handles parsing, pitch resolution, octave normalization, chord detection natively
- **Pros:** Battle-tested music theory library, handles edge cases (ties, accidentals, multi-part), built-in MIDI number support, supports multiple tunings
- **Cons:** Requires Python backend (not Node); adds music21 as a dependency (~50MB)

### Option 3: OpenAI Vision API
- Upload a photo/scan of sheet music, use AI to interpret it
- **Pros:** Handles handwritten or non-MusicXML input
- **Cons:** Requires API key + cost, unreliable for precise tab generation, not deterministic — deferred to stretch goal

---

## Chosen Approach: music21

music21 is the clear choice for the MVP because:

1. **MusicXML is its native format** — no custom parsing needed
2. **MIDI numbers are built in** — `note.pitch.midi` gives us exactly what we need for string/fret mapping
3. **Handles complexity we'd otherwise need to build** — tied notes, accidentals, rests, multi-part scores
4. **Standard tuning support** — maps cleanly to our OPEN_MIDI = [40, 45, 50, 55, 59, 64] lookup

The tradeoff of requiring a Python backend (instead of staying in Node) is acceptable — Luke owns the backend and the team agreed to go full Python with Flask.

---

## MVP Scope

- Standard tuning only: E A D G B e
- Single-melody input (no chords for MVP)
- Notes below E2 (MIDI 40) or above ~F5: flagged as `out_of_range`, not silently dropped
- `.mxl` (compressed MusicXML) and `.xml` both supported via music21
