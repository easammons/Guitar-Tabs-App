# Guitar-Tabs-App
This app creates guitar tabs from a pdf of sheet music. The idea is that
it will take a pdf of sheet music and convert it into playable guitar tabs.
Users will be able to take sheet music they own and convert it into
the tabs for easier guitar playing.

# Roles of everyone on the team
| Name           | Role / Focus Area                         | Responsibilities                                                               |
| ---------------| ----------------------------------------  | ------------------------------------------------------------------------------ |
| Hunter         | Project Manager / Full-Stack Integrator   | Sprint planning, GitHub management, team coordination, integration             |
| Rhino          | Frontend Developer                        | React UI, upload page, result page, download button, styling                   |
| Luke & Hunter  | Backend Developer                         | Express server, API routes, file upload handling, backend setup                |
| My Boi Jo      | MusicXML / Conversion Developer           | MusicXML parsing, pitch mapping, guitar tab conversion, output file generation |
| Emily          | Testing / Documentation / Rendering Lead  | Test files, error testing, README, tab viewer research, final demo prep        |


## Tech Stack

This project uses a full-stack TypeScript web application structure.

| Layer | Technology | Why We Chose It |
|---|---|---|
| Frontend | React + TypeScript | React makes it easy to build a modern, component-based user interface. TypeScript helps catch errors earlier and makes the code easier to maintain as the project grows. |
| Backend | Node.js + Express + TypeScript | Node.js lets us use JavaScript/TypeScript on both the frontend and backend, which keeps the stack simpler for the team. Express is lightweight and easy to use for creating API routes, file upload endpoints, and conversion endpoints. |
| File Format | MusicXML | MusicXML is a common standard for digital sheet music. Since it stores music data in a structured format, it is easier to parse than images or PDFs. |
| Music Parsing / Conversion | Rule-based MusicXML parsing and pitch-to-fret mapping | For the MVP, we are focusing on MusicXML input instead of image recognition. This lets us work with structured data and build a more reliable conversion process without needing machine learning. |
| Rendering | TBD, likely VexFlow or OpenSheetMusicDisplay | These libraries can help display music notation or tablature in the browser. We will research which one works best for rendering generated guitar tab. |
| Hosting | TBD | Hosting will be decided after the core app flow is working. Possible options include Render, Railway, Vercel, or another simple deployment platform. |

## Why We Chose This Stack

We chose this stack because it keeps the project realistic for a student team while still being useful and resume-worthy. React gives us a strong frontend framework for building the upload screen, results page, and tab viewer. Node.js and Express give us a simple backend for handling uploaded MusicXML files, parsing them, converting them, and returning downloadable output.

Using TypeScript across the project helps the team write safer code and makes it easier to understand what kind of data is moving between the frontend, backend, and conversion logic. Since MusicXML is structured data, we can start with a rule-based conversion system instead of depending on AI or image recognition for the MVP.

## Major Tradeoffs

### React + TypeScript

**Pros:**
- Great for building interactive web apps.
- Component-based structure makes the UI easier to organize.
- TypeScript helps prevent bugs and improves maintainability.
- Gives us a possible path toward React Native later.

**Tradeoffs:**
- TypeScript adds extra setup and can slow down development at first.
- Some teammates may need time to get comfortable with React components, props, and state.

### Node.js + Express

**Pros:**
- Simple backend setup.
- Uses the same language family as the frontend.
- Good for file upload routes and API endpoints.
- Easy for a small team to understand and maintain.

**Tradeoffs:**
- Node.js may not have as many mature music-processing libraries as Python.
- If we decide to use a Python library like `music21`, we may need a separate Python service or script.

### MusicXML Input

**Pros:**
- MusicXML is structured and easier to parse than images or PDFs.
- More reliable for an MVP.
- Avoids the complexity and cost of AI vision or OCR.
- Makes pitch, duration, and measure data easier to extract.

**Tradeoffs:**
- Users must already have a MusicXML file.
- It does not support photo or PDF input in the MVP.
- Some MusicXML files may have different structures, so parsing may still require edge-case handling.

### Rule-Based Conversion

**Pros:**
- No API cost.
- More predictable than AI output.
- Easier to test with known input and output.
- Works well for standard guitar tuning and basic notation.

**Tradeoffs:**
- Guitar fingering is not always obvious because the same note can often be played on multiple strings.
- The first version may choose technically correct tabs that are not always the easiest to play.
- More advanced features like alternate tunings, chords, and complex arrangements may be harder to support.

### Rendering Library TBD

**Pros:**
- A rendering library can save time compared to building a tab viewer from scratch.
- Libraries like VexFlow or OpenSheetMusicDisplay may help display notation directly in the browser.

**Tradeoffs:**
- We need to research which library supports guitar tablature best.
- Some libraries may be hard to customize.
- Rendering MusicXML output may take extra setup and testing.

## Summary

Overall, this stack gives us the best balance between simplicity, reliability, and long-term potential. The MVP focuses on a clean web app that uploads MusicXML, parses it, converts it into guitar tablature, displays the result, and allows the user to download the converted file. More advanced input types like PDF or photo upload can be added later after the core MusicXML pipeline works.
