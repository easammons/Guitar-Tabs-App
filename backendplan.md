# Backend Development — Guitar Tab Generator

> CSE 310 Group Project | Node.js + Express + TypeScript

---

## Stack

| Layer         | Technology                     |
|---------------|--------------------------------|
| Runtime       | Node.js                        |
| Framework     | Express                        |
| Language      | TypeScript                     |
| File uploads  | Multer (MusicXML `.xml`/`.mxl`)|
| Music parsing | TBD (see [[PROJECT PLAN]])     |

---

## Folder Structure (planned)

```
backend/
├── src/
│   ├── routes/
│   │   ├── upload.ts        # POST /upload
│   │   └── convert.ts       # POST /convert
│   ├── middleware/
│   │   └── validateFile.ts  # check file type/size
│   ├── services/
│   │   ├── parser.ts        # MusicXML → JSON
│   │   └── converter.ts     # JSON → guitar tab
│   └── index.ts             # app entry point
├── .env
├── package.json
└── tsconfig.json
```

---

## Key Endpoints

| Method | Path        | Purpose                                      |
|--------|-------------|----------------------------------------------|
| GET    | `/health`   | Health check — confirms server is running    |
| POST   | `/upload`   | Receive `.xml` / `.mxl` file, return success |
| POST   | `/convert`  | Run conversion, return structured tab JSON   |
| GET    | `/download` | Return the generated MusicXML output file    |

---

## Sprint Responsibilities

### Sprint 2 — Setup + File Upload
- [ ] Scaffold Express + TypeScript project
- [ ] `GET /health` endpoint
- [ ] `POST /upload` — accept file, return success response
- [ ] Multer config for `.xml` / `.mxl`
- [ ] README with local setup instructions for teammates

### Sprint 3 — Parse MusicXML
- [ ] `POST /convert` calls parser service
- [ ] Parser extracts: notes, measures, pitch, duration, lyrics
- [ ] Returns structured JSON to frontend
- [ ] Error handling for malformed files

### Sprint 4 — Conversion Logic
- [ ] Converter maps pitch + octave → guitar string + fret (standard tuning E A D G B e)
- [ ] Generates output MusicXML with tab notation
- [ ] `GET /download` serves the output file

---

## File Upload Setup (Multer)

```ts
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/xml', 'text/xml', 'application/vnd.recordare.musicxml+xml'];
    cb(null, allowed.includes(file.mimetype));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File received', size: req.file.size });
});
```

---

## Standard Guitar Tuning Reference

Used by the conversion logic to map pitches → fret numbers.

| String | Open Note | MIDI Range |
|--------|-----------|------------|
| 6 (low)| E2        | 40–55      |
| 5      | A2        | 45–60      |
| 4      | D3        | 50–65      |
| 3      | G3        | 55–70      |
| 2      | B3        | 59–74      |
| 1 (high)| E4       | 64–79      |

---

## Environment Variables

```
PORT=3001
MAX_FILE_SIZE_MB=5
```

---
