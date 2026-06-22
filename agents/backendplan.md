# Backend Development — Guitar Tab Generator

> CSE 310 Group Project | Python + Flask + music21

---

## Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Runtime       | Python 3.11+                        |
| Framework     | Flask                               |
| Language      | Python                              |
| File uploads  | Werkzeug (built into Flask)         |
| Music parsing | music21 (MusicXML parsing + theory) |
| CORS          | flask-cors                          |

---

## Folder Structure

```
server/
├── app.py                  # Flask app factory + blueprint registration
├── requirements.txt        # Pinned dependencies
├── .env                    # gitignored — copy from .env.example
├── .env.example            # committed template
├── routes/
│   ├── __init__.py
│   ├── health.py           # GET /health
│   ├── upload.py           # POST /upload
│   ├── convert.py          # POST /convert
│   └── download.py         # GET /download
├── services/
│   ├── __init__.py
│   ├── parser.py           # music21: MusicXML → note list
│   └── converter.py        # note list → string/fret assignments
├── middleware/
│   ├── __init__.py
│   └── validate_file.py    # file type guard (decorator)
└── uploads/                # temp storage (gitignored contents)
    └── .gitkeep
```

---

## Key Endpoints

| Method | Path        | Purpose                                      |
|--------|-------------|----------------------------------------------|
| GET    | `/health`   | Health check — confirms server is running    |
| POST   | `/upload`   | Receive `.xml` / `.mxl` file, return file_id |
| POST   | `/convert`  | Run conversion, return structured tab JSON   |
| GET    | `/download` | Serve the uploaded/output file               |

---

## Sprint Responsibilities

### Sprint 2 — Setup + File Upload ✅
- [x] Scaffold Flask project with blueprints
- [x] `GET /health` endpoint
- [x] `POST /upload` — validate file type/size, save, return file_id
- [x] File validation middleware (`.xml` / `.mxl` only, 5MB max)
- [ ] README with local setup instructions for teammates

### Sprint 3 — Parse MusicXML
- [ ] Implement `services/parser.py` with music21
- [ ] Extract: pitch, octave, midi, duration, measure per note
- [ ] `POST /convert` returns structured note JSON
- [ ] Error handling for malformed files (422 response)

### Sprint 4 — Conversion Logic
- [ ] Implement `services/converter.py` — MIDI → string + fret
- [ ] Out-of-range notes flagged (not silently dropped)
- [ ] `GET /download` serves output file

---

## Standard Guitar Tuning Reference

Used by the conversion logic to map pitches → fret numbers.

| String | Open Note | Open MIDI |
|--------|-----------|-----------|
| 6 (low)| E2        | 40        |
| 5      | A2        | 45        |
| 4      | D3        | 50        |
| 3      | G3        | 55        |
| 2      | B3        | 59        |
| 1 (high)| E4       | 64        |

Strategy: assign each note to the lowest-numbered (thickest) string that can play it within frets 0–12.

---

## Local Setup

```bash
cd server
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

Server runs on `http://localhost:5000`.

---

## Environment Variables

```
PORT=5000
MAX_FILE_SIZE_MB=5
```

---
