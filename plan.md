# GUITAR TAB GENERATOR
> CSE 310 Group Project — Spring 2026 | 5 Sprints × 2 Weeks

---

## Project Overview

A web application that takes a MusicXML sheet music file as input, converts it to guitar tablature, and outputs a downloadable MusicXML tab file. Users can also view the generated tab directly in the browser.

**Core Flow:**
```
Upload MusicXML → Parse → Convert to Guitar Tab → Display in App + Download as MusicXML
```

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React (TypeScript) | Web now, React Native path later |
| Backend | Node.js + Express (TypeScript) | Keeps stack in one language |
| Music Parsing | TBD | See Model section |
| File Format | MusicXML (`.xml` / `.mxl`) | Industry standard for notation |
| Hosting | TBD | |

> **Mobile Path:** React → React Native is the cleanest upgrade path when the time comes. Keep components generic (no DOM-specific APIs) to ease migration.

---

## Model / Conversion Logic

> **Status: TBD — to be decided during Sprint 1 planning.**

Options to research:
- [ ] OpenAI Vision API — read sheet music image/file, output tab notation
- [ ] `music21` Python library — programmatic MusicXML parsing and pitch mapping
- [ ] Dedicated music recognition API (e.g., Audiveris for OMR)
- [ ] Rule-based pitch → string/fret mapping (no ML needed for MusicXML input)

> Note: Since input is MusicXML (structured data, not images), a rule-based approach mapping notes → guitar strings/frets may be viable without any ML for the MVP.

---

## API Integrations

| API / Service | Purpose | Status |
|---|---|---|
| TBD (see Model section) | Sheet music → tab conversion | TBD |

---

## Stretch Goals (Post-MVP)

- [ ] Image upload (photo of sheet music) → OCR → tab
- [ ] PDF upload → extract notation → tab
- [ ] Multiple guitar tunings

---

## Sprint Plan

### Sprint 1 — Planning *(Weeks 1–2)*

**Goal:** Align the team, research unknowns, lock in architecture, assign roles.

**Deliverables:**
- [ ] Team roles assigned (even if skills are unknown — assign ownership areas)
- [ ] Tech stack finalized (confirm React + Node or pivot)
- [ ] Model/conversion approach decided (rule-based vs. API vs. ML)
- [ ] GitHub repo created, branching strategy agreed on
- [ ] Wireframes sketched (upload screen, viewer screen, download button)
- [ ] MusicXML format researched — understand the schema structure → [[MusicXML]]
- [ ] `PROJECT PLAN.md` updated with all decisions from Sprint 1

**Research Tasks:**
- [ ] What does a MusicXML file look like? (notes, measures, pitch, duration) → [[MusicXML]]
- [ ] How do guitar tabs represent the same information? (string, fret, measure)
- [ ] What library/API will handle the conversion?
- [ ] What does a MusicXML tab output look like? (find a sample)

---

### Sprint 2 — Setup + File Upload *(Weeks 3–4)*

**Goal:** Working app skeleton — user can upload a MusicXML file and see confirmation.

**Deliverables:**
- [ ] React app scaffolded (Vite + TypeScript recommended)
- [ ] Node/Express backend running with a health-check endpoint
- [ ] File upload UI component (drag-and-drop or file picker)
- [ ] Backend receives `.xml` / `.mxl` file and returns success response
- [ ] Basic routing: `/upload` page, `/result` page placeholder
- [ ] Project deployed to a dev environment (even localhost with shared instructions)
- [ ] README with setup instructions so all 5 teammates can run it

**Out of Scope:**
- Parsing the file contents (Sprint 3)
- Any conversion logic (Sprint 4)

---

### Sprint 3 — Parse MusicXML + Display *(Weeks 5–6)*

**Goal:** App reads the uploaded MusicXML and displays the original sheet music data in the browser.

**Deliverables:**
- [ ] Backend parses MusicXML file (extract: notes, measures, pitch, lyrics)
- [ ] API endpoint returns structured JSON of the parsed sheet music
- [ ] Frontend displays parsed data in a readable format (even plain text list is fine for now)
- [ ] Error handling for malformed or unsupported files
- [ ] At least 3 real MusicXML test files used for testing

**Questions to answer this sprint:**
- What fields from MusicXML do we need? (pitch, duration, lyric, measure number)
- What format does the frontend need to render tabs?

---

### Sprint 4 — Conversion: Sheet Music → Guitar Tab *(Weeks 7–8)*

**Goal:** Convert parsed MusicXML note data into guitar tab notation and produce a MusicXML tab output.

**Deliverables:**
- [ ] Conversion logic: map each note (pitch + octave) to a guitar string + fret number
- [ ] Output MusicXML file generated with tab notation (using a template structure)
- [ ] Lyrics carried over from input to output
- [ ] Measures preserved in output
- [ ] Download endpoint: user can download the output `.xml` file
- [ ] Conversion tested against Sprint 3 test files

**Key Decision (finalized in Sprint 1):**
- If rule-based: implement pitch → fret mapping table (E2–E6 standard tuning)
- If API: integrate the chosen API here

---

### Sprint 5 — Render Output + Polish *(Weeks 9–10)*

**Goal:** Full end-to-end working app. Output MusicXML renders visually in-browser. App is presentable.

**Deliverables:**
- [ ] In-app tab viewer (render MusicXML output as readable guitar tab — library TBD e.g. VexFlow, OSMD)
- [ ] Download button for the output MusicXML file
- [ ] Full flow tested end-to-end with multiple input files
- [ ] UI polished — consistent styling, loading states, error messages
- [ ] Demo video or live demo prepared for class
- [ ] README finalized

**Stretch (if time allows):**
- [ ] PDF input support
- [ ] Image input support

---

## Team

| Name | Role / Focus Area | Skills (TBD) |
|---|---|---|
| TBD | Frontend | |
| TBD | Frontend | |
| TBD | Backend | |
| TBD | Backend / Conversion | |
| TBD | Full Stack / PM | |

> Roles to be locked in during Sprint 1.

---

## Photo Input Feasibility Research

> Research conducted 2026-05-04 — covers the "Image upload (photo of sheet music)" stretch goal.

**Goal:** Allow users to upload or photograph a physical sheet of guitar tabs and have the app extract the notation and convert it to MusicXML.

### Pipeline

```
User photo → Image preprocessing → AI Vision API → Parse output → MusicXML
```

### Recommended Approach: Claude Vision API

Send the image directly to a vision-capable model (e.g. `claude-sonnet-4-6`) and prompt it to extract tab notation and return structured MusicXML. This collapses the OCR + parsing steps into one API call.

```js
// Rough Node.js sketch
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 4096,
  messages: [{
    role: "user",
    content: [
      { type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageBase64 } },
      { type: "text", text: "Extract all guitar tab notation from this image and return it as MusicXML." }
    ]
  }]
});
```

### Alternative: Audiveris (open source OMR)

- Optical Music Recognition tool that outputs MusicXML directly
- Best for printed sheet music with standard notation
- Runs locally — no API cost
- Harder to integrate into a Node.js web app (Java-based)

### Photo Quality Considerations

| Condition | Expected Accuracy |
|---|---|
| Clear, flat, well-lit printed sheet | Good |
| Standard printed tab notation | Good |
| Handwritten tabs | Poor |
| Angled / crumpled paper | Poor |
| Low resolution or dark lighting | Poor |

### Cost Estimate (Claude API)

- ~$0.01–0.05 per image depending on resolution
- Build in rate limiting and user feedback for low-quality images

### Why It's Feasible

- Vision APIs already handle document/text extraction well
- Guitar tab notation (dashes, fret numbers, string lines) is structured enough that a vision model can reliably parse it
- The output schema (MusicXML) is well-documented — can be included in the prompt as a template
- React Native (our mobile path) supports camera capture natively, so photo → upload flow translates directly to mobile

### Recommended Sprint

Add to **Sprint 5** stretch goals or as a **Sprint 6** extension if the team has time. The core MusicXML pipeline must be working first — photo input is an additional input method, not a replacement.

---

## Open Questions

- [ ] What library handles MusicXML → guitar tab conversion? (Sprint 1 blocker)
- [ ] What library renders MusicXML in the browser? (VexFlow? OpenSheetMusicDisplay?)
- [ ] Standard tuning only (E A D G B e), or support alternate tunings?
- [ ] Do we handle multi-instrument files? Or only single-melody inputs?
- [ ] What happens if a note is out of standard guitar range?
