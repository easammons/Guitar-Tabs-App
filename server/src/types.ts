// ── Type definitions ──────────────────────────────────────────

export type NoteType = 'whole' | 'half' | 'quarter' | 'eighth' | 'sixteenth' | 'thirty-second' | 'sixty-fourth';

// ── Parser output ──────────────────────────────────────────────

export interface ParsedNote {
  midi: number;          // absolute MIDI pitch (e.g. 64 = E4)
  step: string;          // pitch letter: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
  alter: number;         // semitone shift: -1 (flat), 0 (natural), 1 (sharp)
  octave: number;        // scientific octave number
  duration: number;      // raw MusicXML divisions value
  type: NoteType;        // 'whole' | 'half' | 'quarter' | 'eighth' etc.
  isRest: boolean;       // true when this is a rest, not a pitch
  measureNumber: number; // which measure this belongs to (1-based)
  chordIndex: number;    // position within a simultaneous chord group (0 = first)
  isChordNote: boolean;  // true when <chord/> preceded this note in MusicXML
}

export interface ParsedMeasure {
  number: number;
  notes: ParsedNote[];   // all notes in order, chord members included
}

export interface ParsedScore {
  measures: ParsedMeasure[];
  divisions: number;     // divisions-per-quarter-note from <divisions> element
  tempo?: number;        // BPM if found in <sound> or <metronome>
}

// ── ChordSimplifier output ─────────────────────────────────────

export interface NoteGroup {
  midi: number[];          // MIDI values of all notes sounding simultaneously
  measureNumber: number;
  duration: number;
  type: NoteType;
  isRest: boolean;
}

export interface SimplifiedChord {
  midi: number[];          // essential tones only: root + 3rd + 5th (+ optional 7th)
  originalMidi: number[];  // what came in before simplification (for debugging)
  measureNumber: number;
  duration: number;
  type: NoteType;
  isRest: boolean;
}

// ── GuitarVoicer output ────────────────────────────────────────

export interface GuitarNote {
  midi: number;
  string: number;   // 1 (high E) through 6 (low E) — MusicXML string convention
  fret: number;     // 0 = open string
  step: string;     // pitch letter — needed for MusicXML <step> element in output
  alter: number;    // semitone shift — needed for MusicXML <alter> element in output
  octave: number;
}

export interface GuitarChord {
  notes: GuitarNote[];
  measureNumber: number;
  duration: number;
  type: NoteType;
  isRest: boolean;
  fretSpan: number;       // max fret - min fret across voiced notes (0 for open/single)
  spanExceeded: boolean;  // true if best voicing required > 4 frets
}

// ── API response ───────────────────────────────────────────────

export interface ConvertResponse {
  outputXml: string;      // full MusicXML with <string>/<fret> — for download
  notes: GuitarChord[];   // structured tab data — for future in-browser rendering
}
