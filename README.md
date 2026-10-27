# NIHONGO

A complete Japanese course from absolute zero to CEFR A1: 168 days in 24 weeks, about 15 minutes a day.

It's a single static web app (plain HTML and JavaScript). There's no build step and no server, and it needs no API keys.

## What's inside

- **168-day curriculum** in six stages: kana, simple sentences, everyday verbs, practical situations (restaurants, shopping, transport), personal expression, and A1 consolidation. The first 14 days are hand-curated. Every 7th day is a skills check.
- **Daily lesson flow:** Learn → Listen → Practice → Apply → Recall → Challenge. Quick, Standard and Deep modes take about 10, 15 and 20 minutes.
- **Exercise engine:** flashcards, multiple choice, kana drills, matching, sentence tiles, typing (romaji converts to kana as you type), error spotting, branching dialogues, reading and listening passages, and speaking self-checks.
- **Spaced repetition:** tracks every kana, word, kanji and grammar point, keeps recognition separate from recall, runs drills on kana you confuse, and keeps a mistake notebook.
- **Practice is limited to what you've learned.** Drills and wrong answer options only use completed lessons.
- **Progress:** accuracy by skill, consistency heatmap, and an A1 can-do profile based on demonstrated performance.
- **Library:** kana charts, vocabulary, grammar, sentences, expressions, kanji and culture notes.

## Run it

Open `index.html` through any static file server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or enable GitHub Pages for this repo (Settings → Pages → Deploy from branch → `main` / root).

Progress is saved in your browser's localStorage. Use **Settings → Export backup** to move it between devices.
Audio uses your device's built-in Japanese text-to-speech voice. That voice is synthesized, not recorded native speech.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page shell and styles |
| `data-core.js` | Kana, kanji, grammar points, stages, weeks, A1 competencies |
| `data-days-1/2/3.js` | Day-by-day lesson content (Days 1–56, 57–112, 113–168) |
| `engine.js` | Kana/romaji conversion, answer checking, spaced repetition, lesson generation |
| `app.js` | User interface |

## Tests

```bash
node test/validate.js        # data integrity across all 168 days
node test/sessions.js        # builds every lesson in every mode
node test/practice_scope.js  # practice never reaches past learned days
bash test/build.sh && python3 test/flows.py   # end-to-end browser flows (needs Playwright)
```
