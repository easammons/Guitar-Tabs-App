# Sprint 1 — Planning & Architecture
**Project:** Guitar Tab Generator  
**Course:** CSE 310 Group Project — Spring 2026  
**Sprint Duration:** Weeks 1–2 (2 weeks)  
**Sprint Goal:** Align the team, resolve all architectural unknowns, lock in decisions, and set up the repo and tooling so that Sprint 2 can begin with zero blockers.

---

## Team

| Name | Role |
|---|---|
| Hunter | Project Manager / Full-Stack Integrator |
| Ryan | Frontend Developer |
| Luke & Hunter | Backend Developer |
| Joe | MusicXML / Conversion Developer |
| Emily | Testing / Documentation / Rendering Lead |

--1

## Sprint 1 Goals

By the end of Sprint 2, the team must have answered every open question that would block coding. No one should start Sprint 2 wondering what library to use, how files get named, or who owns what branch.

**Definition of Done for Sprint 1:**
- [x] All five deliverables below are complete
- [x] `PROJECT PLAN.md` is updated with every decision made this sprint
- [ ] GitHub repo is live and every team member has pushed at least one commit
- [ ] `sprint1.md` is committed to the repo
- [ ] Sprint 3 can begin immediately with no unresolved blockers

---

## Deliverables & Task Assignments

### Deliverable 1 — GitHub Repository & Branching Strategy
**Owner: Hunter (PM)**  
**Support: Everyone**

The repo must be created, structured, and accessible to all five teammates before any other work begins. This is the single highest priority task of the sprint — nothing else can be parallelized until this is done.

**Tasks:**
- [ ] **Hunter** — Create base folder structure: `/client`, `/server`, `/docs`
- [ ] **Hunter** — Add a `main` branch protection rule (no direct pushes, require PR review)
- [ ] **Hunter** — Create a `dev` branch as the shared integration branch
- [ ] **Hunter** — Add a `.gitignore` for Node.js and React projects
- [ ] **Hunter** — Open GitHub Issues for every task in this sprint plan (one issue per task)
- [ ] **Everyone** — Clone the repo, create a personal branch (`name/setup`), push a small change (e.g., add your name to a scratch file), and open a PR to confirm you can use the workflow
- [ ] **Hunter** — Document the agreed branching strategy in `docs/CONTRIBUTING.md`

**Agreed Branching Convention (to document):**
```
main          ← production-ready only
dev           ← shared integration branch (PRs merge here)
name/feature  ← individual feature branches
```

---

### Deliverable 2 — Tech Stack Finalized
**Owner: Hunter (PM) — facilitates decision; everyone votes**  
**Support: Luke (Backend), Rhino (Frontend)**

The README already proposes a stack. This sprint confirms or adjusts it so everyone is aligned before writing a single line of app code.

**Tasks:**
- [ ] **Hunter** — Host a 30-minute team sync to review the proposed stack
- [x] **Luke & Hunter** — Confirm Node.js + Express + TypeScript for the backend (or document why you are pivoting)
- [x] **Rhino** — Confirm React + TypeScript + Vite for the frontend (or document why you are pivoting)
- [ ] **Hunter** — Update `PROJECT PLAN.md` with the finalized stack and the reason for each choice
- [ ] **Hunter** — Document the agreed folder structure inside `PROJECT PLAN.md`:
  ```
  /client    ← React frontend (Vite + TypeScript)
  /server    ← Node/Express backend (TypeScript)
  /docs      ← Sprint plans, architecture notes, team docs
  ```

**Decision Checklist (must be answered before sprint ends):**
- [ ] Are we using Vite or Create React App? *(Vite is strongly recommended)*
- [ ] Are we using `npm` or `yarn`? Pick one, stick to it.
- [ ] What Node version is the team standardizing on? (Suggest 20 LTS)
- [ ] Are we using ESLint + Prettier? If yes, who sets it up? *(Suggest Luke/Hunter in Sprint 2)*

---

### Deliverable 3 — Conversion Approach Decided
**Owner: My Boi Jo (Conversion Developer)**  
**Support: Emily (research support), Luke (backend feasibility)**

This is the most critical technical decision of the entire project. The conversion approach affects Sprint 3, 4, and 5 directly. It must be locked in by end of Sprint 1.

**Tasks:**
- [ ] **My Boi Jo** — Research the MusicXML schema. Answer: what fields exist? (notes, pitch, octave, duration, measure, lyric, rest)
- [ ] **My Boi Jo** — Read at least 1 real `.xml` MusicXML files
- [ ] **My Boi Jo** — Research rule-based pitch → fret mapping. Map out how you would convert a pitch (e.g., E4) to a string + fret in standard tuning (E2 A2 D3 G3 B3 E4)
- [ ] **My Boi Jo** — Research `music21` (Python) as an alternative — note: would require a Python microservice alongside the Node backend
- [ ] **Emily** — Find and test at least 3 real MusicXML files from free sources 
- [ ] **My Boi Jo + Emily** — Write a brief comparison doc: rule-based vs. music21 vs. OpenAI Vision in `docs/conversion-approach.md`
- [ ] **Hunter** — Facilitate final team decision meeting; document the chosen approach in `PROJECT PLAN.md`

**Decision must answer:**
- [ ] Rule-based mapping, music21 Python service, or API? *(Team already leans rule-based — confirm or pivot)*
- [ ] Standard tuning only for MVP? (E A D G B e — strongly recommend yes)
- [ ] Single-melody input only for MVP? (no chords, no multi-instrument — strongly recommend yes)
- [ ] What happens if a note is below E2 or above E4? (document the edge case handling plan)

---

### Deliverable 4 — Wireframes
**Owner: Rhino (Frontend Developer)**  
**Support: Hunter (feedback), Emily (user flow feedback)**

Wireframes do not need to be pixel-perfect. They must show the team what screens exist and what each screen contains so that Sprint 2 development has a clear target.

**Tasks:**
- [ ] **Rhino** — Sketch the wireframes for the webapp
- [ ] **Hunter + Emily** — Review wireframes and leave written feedback before end of sprint
- [ ] **Rhino** — Update wireframes based on feedback; finalize and re-commit

---

### Deliverable 5 — Rendering Library Decision
**Owner: Emily (Testing / Documentation / Rendering Lead)**  
**Support: Rhino (frontend feasibility check)**

The team needs to know before Sprint 5 whether visual tab rendering is achievable. Emily researches this now so it does not become a surprise blocker in the final sprint.

**Tasks:**
- [ ] **Emily** — Research VexFlow: does it support guitar tablature? Can it render from MusicXML or from a JSON structure? Does it work with React?
- [ ] **Emily** — Research OpenSheetMusicDisplay (OSMD): same questions
- [ ] **Emily** — Research plain-text tab rendering as a fallback: what would ASCII guitar tab look like in a `<pre>` block?
- [ ] **Emily** — Write a short recommendation doc in `docs/rendering-research.md` covering all three options with pros/cons and a recommended MVP approach
- [ ] **Rhino** — Review Emily's recommendation and confirm whether the suggested library is feasible to integrate with React
- [ ] **Hunter** — Document the rendering decision (or "defer to Sprint 5") in `PROJECT PLAN.md`

**Key Questions Emily Must Answer:**
- [ ] Can VexFlow render guitar tabs (6-string tablature) — not just standard notation?
- [ ] Does OSMD support MusicXML tab output natively?
- [ ] Is plain-text ASCII tab output a realistic MVP fallback if the library is too complex?

---

## Research Tasks Summary

| Task | Owner | Output |
|---|---|---|
| MusicXML schema deep dive | My Boi Jo | `docs/musicxml-notes.md` |
| Find + commit 3 test MusicXML files | Emily | `docs/test-files/` |
| Conversion approach comparison | My Boi Jo + Emily | `docs/conversion-approach.md` |
| VexFlow / OSMD / ASCII tab research | Emily | `docs/rendering-research.md` |
| Wireframes (all 4 screens) | Rhino | `docs/wireframes/` |
| Branching strategy + repo setup | Hunter | `docs/CONTRIBUTING.md` |
| Tech stack confirmation | Hunter (facilitates) | `PROJECT PLAN.md` |

---

## Open Questions (Must Be Closed by End of Sprint 1)

These are the questions from the project plan that are currently marked TBD. Every one of them must have a written answer in `PROJECT PLAN.md` before this sprint is considered done.

| # | Question | Owner |
|---|---|---|
| 1 | Rule-based vs. music21 vs. API for conversion? | My Boi Jo |
| 2 | Which rendering library (VexFlow, OSMD, plain text)? | Emily |
| 3 | Standard tuning only, or support alternate tunings in MVP? | My Boi Jo |
| 4 | Single-melody only, or handle chords/multi-instrument in MVP? | My Boi Jo |
| 5 | What happens when a note is out of guitar range? | My Boi Jo |
| 6 | Vite or CRA? npm or yarn? Node version? | Hunter |
| 7 | Hosting platform (Render, Railway, Vercel)? | Hunter (can defer to Sprint 4 if needed) |

---

## Sprint 1 Risks
WE FAIL!

---

## Notes for Sprint 2

Once Sprint 1 is complete, Sprint 2 begins with:
- **Rhino** scaffolding the React app (Vite + TypeScript) in `/client`
- **Luke & Hunter** scaffolding the Express backend in `/server` with a `/health` endpoint
- **My Boi Jo** beginning to prototype the MusicXML parser (standalone script, not integrated yet)
- **Emily** writing the first set of upload tests and keeping `README.md` updated

No Sprint 2 work should begin until the Sprint 1 Definition of Done is fully checked off.

---

*Sprint 1 Plan authored by Hunter + Luke — Guitar Tab Generator — CSE 310 Spring 2026*
