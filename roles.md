# Team Roles

## Project: Guitar Tab Generator

This document explains the main team roles for our Guitar Tab Generator project. These roles give each team member a clear focus area, but everyone can still help each other when needed.

---

## Role Overview

| Role | Main Focus |
|---|---|
| Project Manager / Full-Stack Integrator | Team organization, GitHub, sprint progress, and connecting the app pieces together |
| Frontend Developer | React UI, upload page, result page, styling, and user experience |
| Backend Developer | Node/Express server, API routes, file uploads, and backend structure |
| MusicXML / Conversion Developer | MusicXML parsing, pitch mapping, and guitar tab conversion |
| Testing / Tab Research / Documentation Lead | Test files, bug checking, tab rendering research, README, and demo prep |

---

## 1. Project Manager / Full-Stack Integrator

### Main Responsibility

The Project Manager / Full-Stack Integrator helps keep the team organized and makes sure the separate parts of the app work together.

### Responsibilities

- Help plan each sprint.
- Keep track of team progress and deadlines.
- Manage GitHub issues, branches, and pull requests.
- Make sure the frontend and backend connect correctly.
- Help resolve merge conflicts.
- Check that the project plan stays updated.
- Help teammates when they are blocked.
- Make sure the final app is ready for the class demo.

### Sprint Focus

- **Sprint 1:** Assign roles, create GitHub repo, help finalize the tech stack and architecture.
- **Sprint 2:** Make sure the frontend and backend setup can run together.
- **Sprint 3:** Help connect parsed MusicXML data to the frontend.
- **Sprint 4:** Help connect conversion output to the download/display flow.
- **Sprint 5:** Help polish the app and prepare the final demo.

---

## 2. Frontend Developer

### Main Responsibility

The Frontend Developer builds the user-facing part of the application using React and TypeScript.

### Responsibilities

- Set up the React app.
- Build the upload page.
- Build the result page.
- Create the file upload component.
- Add loading states and error messages.
- Add a download button for the converted MusicXML file.
- Make the app look clean and presentable.
- Connect frontend components to backend API endpoints.
- Help make the app easy to use during the final demo.

### Sprint Focus

- **Sprint 1:** Help create wireframes for the upload screen, result screen, and download flow.
- **Sprint 2:** Build the upload UI and basic routing.
- **Sprint 3:** Display parsed MusicXML data in the browser.
- **Sprint 4:** Display converted guitar tab data.
- **Sprint 5:** Polish the UI and improve the final user experience.

---

## 3. Backend Developer

### Main Responsibility

The Backend Developer builds the server-side part of the application using Node.js, Express, and TypeScript.

### Responsibilities

- Set up the Express backend.
- Create a health-check endpoint.
- Create API routes for upload, parsing, conversion, and download.
- Handle `.xml` and `.mxl` file uploads.
- Validate uploaded files.
- Return clear success and error responses.
- Connect backend routes to the parsing and conversion logic.
- Help keep the backend organized and maintainable.

### Sprint Focus

- **Sprint 1:** Help decide backend architecture and API route structure.
- **Sprint 2:** Build the backend skeleton and file upload endpoint.
- **Sprint 3:** Add the route that parses MusicXML and returns structured JSON.
- **Sprint 4:** Add routes for conversion and downloading the output file.
- **Sprint 5:** Improve backend error handling and support the final demo.

---

## 4. MusicXML / Conversion Developer

### Main Responsibility

The MusicXML / Conversion Developer owns the core logic of the project: reading MusicXML data and converting it into guitar tablature.

### Responsibilities

- Research the MusicXML format.
- Understand how notes, measures, pitch, octave, duration, and lyrics are represented.
- Decide what MusicXML fields are needed for the MVP.
- Parse notes and measures from uploaded MusicXML files.
- Build a pitch-to-string-and-fret mapping system.
- Convert standard notation into guitar tab notation.
- Preserve important data like measures and lyrics when possible.
- Help generate the output MusicXML tab file.
- Test the conversion logic with real MusicXML files.

### Sprint Focus

- **Sprint 1:** Research MusicXML and decide the conversion approach.
- **Sprint 2:** Support backend setup by identifying what file data needs to be saved or passed forward.
- **Sprint 3:** Build or help build the MusicXML parser.
- **Sprint 4:** Build the main sheet music to guitar tab conversion logic.
- **Sprint 5:** Help fix conversion edge cases and improve output quality.

---

## 5. Testing / Tab Research / Documentation Lead

### Main Responsibility

The Testing / Tab Research / Documentation Lead makes sure the app works with real files, researches how to display guitar tabs, and keeps project documentation clear.

### Responsibilities

- Find real MusicXML files for testing.
- Test the upload feature with valid and invalid files.
- Test broken, empty, or unsupported files.
- Check that parsed note data looks correct.
- Check that converted guitar tab output makes sense.
- Research tab rendering libraries such as VexFlow or OpenSheetMusicDisplay.
- Decide whether visual tab rendering or plain-text tab display is more realistic for the MVP.
- Document bugs and edge cases.
- Keep the README and setup instructions updated.
- Help prepare the final demo or demo video.

### Sprint Focus

- **Sprint 1:** Research MusicXML examples, tab rendering options, and test file sources.
- **Sprint 2:** Test upload flow and setup instructions.
- **Sprint 3:** Test parsed MusicXML output with multiple files.
- **Sprint 4:** Test conversion output and report incorrect tabs.
- **Sprint 5:** Test the full flow from upload to download and help prepare the final demo.

---

## What Tab Research Means

Tab research means figuring out how guitar tablature should be displayed in the browser.

This includes answering questions like:

- Can we display guitar tab visually in the browser?
- Can VexFlow or OpenSheetMusicDisplay render guitar tabs?
- Can the rendering library work with React?
- Can it render MusicXML directly, or do we need to convert the data first?
- Is visual rendering realistic for the MVP?
- Should we use a simpler text-based tab display first?

The goal is to find the simplest reliable way to show the generated tab to the user.

---

## What Testing Means

Testing means making sure the app works before the final demo.

The tester should check things like:

- A valid `.xml` MusicXML file uploads successfully.
- An invalid file type like `.jpg` or `.pdf` is rejected.
- A broken or empty MusicXML file shows a clear error message.
- The backend extracts notes, measures, pitch, and duration correctly.
- The conversion creates string and fret numbers.
- The app displays the result in the browser.
- The download button returns a MusicXML file.
- The full flow works: upload → parse → convert → display → download.

The goal is to find problems before the final presentation.

---

## Collaboration Expectations

Even though each person has a main role, the team should still work together. If one person finishes early, they should help someone else. If someone gets stuck, they should ask for help early instead of waiting until the end of the sprint.

Each teammate should:

- Communicate progress regularly.
- Push code often.
- Write clear commit messages.
- Pull the latest code before starting work.
- Avoid working on the same file at the same time when possible.
- Ask for help when blocked.
- Review each other's work before merging.

---

## Suggested GitHub Workflow

1. Create a branch for each feature or task.
2. Make changes on that branch.
3. Commit changes with a clear message.
4. Push the branch to GitHub.
5. Open a pull request.
6. Have at least one teammate review it.
7. Merge after it works and does not break the app.

Example branch names:

```txt
frontend-upload-page
backend-file-upload
musicxml-parser
conversion-logic
tab-rendering-research
readme-updates
