# Guitar Tab Generator — Codebase Map

**App name:** TabVerter  
**Course:** CSE 310 Group Project — Spring 2026  
**Purpose:** Upload a MusicXML sheet music file → convert it to guitar tablature → view and download the result.

**Core flow:**
```
Upload MusicXML (.xml / .mxl)
  → Flask backend receives and stores file
  → music21 (Python) parses notes and measures
  → Conversion logic maps pitch → string + fret (standard tuning)
  → Frontend displays result + Download button
```

---

## Quick Start

### Frontend (React)
```bash
npm install
npm run dev          # http://localhost:5173
```

### Backend (Flask + Python)
```bash
cd server
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env
python app.py            # http://localhost:5000
```

---

## Repo Structure

```
Guitar-Tabs-App/
├── agents/                     ← AI agent guidance files (this file lives here)
│   └── CODEBASE.md
│
├── src/                        ← React frontend (TypeScript + Vite)
│   ├── main.tsx                ← App entry point
│   ├── App.tsx                 ← Router: / → Upload, /download → DownloadPage
│   ├── Upload.tsx              ← Upload page component
│   ├── Upload.css              ← Upload page styles
│   ├── Download.tsx            ← Download page component
│   ├── MyButton.tsx            ← Reusable nav button component
│   ├── App.css                 ← Global app styles
│   ├── index.css               ← Base CSS reset and variables
│   └── assets/components/      ← Archived JSX prototypes (not in active routing)
│       ├── Header.tsx / .jsx
│       ├── Footer.tsx / .jsx
│       └── ...
│
├── server/                     ← Python Flask backend
│   ├── app.py                  ← Flask factory: registers all blueprints
│   ├── requirements.txt        ← Python dependencies (Flask, music21, etc.)
│   ├── .env.example            ← Environment variable template
│   ├── routes/
│   │   ├── health.py           ← GET  /health
│   │   ├── upload.py           ← POST /upload
│   │   ├── convert.py          ← POST /convert
│   │   └── download.py         ← GET  /download
│   ├── services/
│   │   ├── parser.py           ← music21: MusicXML file → note list
│   │   └── converter.py        ← note list → string + fret assignments
│   ├── middleware/
│   │   └── validate_file.py    ← File type/size guard (decorator)
│   └── uploads/                ← Temp file storage (gitignored contents)
│
├── docs/
│   └── conversion-approach.md  ← Why music21 was chosen over rule-based/API
│
├── public/
│   ├── guitar-favicon.png      ← App logo used in nav bar
│   ├── favicon.svg
│   └── icons.svg
│
├── index.html                  ← Vite HTML shell
├── package.json                ← Frontend dependencies and npm scripts
├── vite.config.ts              ← Vite build config
├── tsconfig.json               ← TypeScript config
├── styles.css                  ← Top-level CSS (mostly empty — use src/index.css)
│
├── README.md                   ← Project overview and team roles
├── plan.md                     ← Full sprint plan (Sprints 1–5) + open questions
├── backendplan.md              ← Backend architecture, endpoints, local setup
├── roles.md                    ← Team roles and responsibilities per sprint
└── sprint1.md                  ← Sprint 1 deliverables and task assignments
```

---

## Frontend Pages

| Route | Component | File | Description |
|---|---|---|---|
| `/` | `Upload` | `src/Upload.tsx` | File upload UI + "Capture Mode" button |
| `/download` | `DownloadPage` | `src/Download.tsx` | Result display + Download/Upload buttons |

**Shared component:**
- `src/MyButton.tsx` — renders an `<a href>` wrapping a `<button>`. Props: `text` (label), `location` (href path).

---

## Backend API Endpoints

| Method | Path | File | Description |
|---|---|---|---|
| GET | `/health` | `server/routes/health.py` | Confirms server is running |
| POST | `/upload` | `server/routes/upload.py` | Accepts `.xml` / `.mxl`, returns `file_id` |
| POST | `/convert` | `server/routes/convert.py` | Runs conversion, returns tab JSON |
| GET | `/download` | `server/routes/download.py` | Serves the output file |

**CORS:** Backend allows requests from `http://localhost:5173` (Vite dev server).

---

## Key Source Files

| File | What it does |
|---|---|
| `server/app.py` | Creates the Flask app and registers all blueprints |
| `server/services/parser.py` | Uses music21 to read MusicXML and extract notes (pitch, octave, MIDI, duration, measure) |
| `server/services/converter.py` | Maps MIDI numbers → guitar string + fret using standard tuning |
| `server/middleware/validate_file.py` | Rejects files that are not `.xml` / `.mxl` or exceed 5 MB |
| `src/App.tsx` | Sets up React Router with two routes |
| `src/Upload.tsx` | Main landing page — where users start |
| `src/Download.tsx` | Result page — where users view and download the tab |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | React + TypeScript | React 19, TS 6 |
| Frontend build tool | Vite | 8 |
| Routing | react-router-dom | 7 |
| Backend framework | Flask (Python) | 3.1 |
| Music parsing/conversion | music21 | 9.3 |
| File upload handling | Werkzeug (built into Flask) | 3.1 |
| CORS | flask-cors | 4.0 |

---

## Conversion Logic Summary

Music21 was chosen over manual rule-based parsing. See `docs/conversion-approach.md` for the full decision.

**Guitar tuning (standard):**

| String | Open Note | MIDI |
|---|---|---|
| 6 (lowest) | E2 | 40 |
| 5 | A2 | 45 |
| 4 | D3 | 50 |
| 3 | G3 | 55 |
| 2 | B3 | 59 |
| 1 (highest) | E4 | 64 |

**Mapping rule:** assign each note to the lowest-numbered (thickest) string that can play it within frets 0–12. Notes outside this range are flagged as `out_of_range`.

**MVP scope:** standard tuning only, single-melody input (no chords).

---

## Branching Strategy

```
main        ← production-ready only; no direct pushes
dev         ← shared integration branch; all PRs merge here
name/feature ← individual feature branches (e.g. rhino/upload-styling)
```

Current active branches: `main`, `dev`, `front-end`, `luke/backend-setup`, `joseph/music21`.

---

## Team

| Name | Role | Branch prefix |
|---|---|---|
| Hunter | Project Manager / Full-Stack Integrator | — |
| Ryan (Rhino) | Frontend Developer | `rhino/` |
| Luke & Hunter | Backend Developer | `luke/` |
| Joe | MusicXML / Conversion Developer | `joseph/` |
| Emily | Testing / Documentation / Rendering Lead | — |

---

## Documentation Files

| File | Contents |
|---|---|
| `README.md` | Project summary, team table, full tech stack rationale |
| `plan.md` | Sprint plan (Sprints 1–5), stretch goals, open questions |
| `backendplan.md` | Backend folder structure, endpoints, tuning table, local setup |
| `roles.md` | Role descriptions, sprint focus per role, collaboration expectations |
| `sprint1.md` | Sprint 1 deliverables, task owners, definition of done |
| `docs/conversion-approach.md` | music21 vs rule-based vs API comparison and final decision |
