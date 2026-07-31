# hey stranger

A private, swipeable love-letter postcard. Vite + React, deployable on Vercel.

## What's in it

- Opening "hey stranger" slide with her photo and a **Begin** button.
- 20 full-bleed photo cards, each with a line of text underneath.
- Swipe (mobile), tap left/right, or arrow keys to move between cards.
- Background music, mutable with the button top-right.
- Thin gold progress thread at the top.

## 1. Add your content (all in the app, no code changes needed)

**Photos** — put your images in `public/photos/`, named to match:
- `0.jpg` — her photo on the opening slide
- `1.jpg` through `20.jpg` — one per card

**Text** — open `src/data/slides.js` and edit the `text` for each slide to the
real reasons. It's plain text in quotes, safe to edit straight in GitHub's
web editor from your phone.

**Song** — I couldn't include "Those Eyes" by New West myself (copyright), so
add your own copy of the file as `public/audio/those-eyes.mp3`. Any MP3 works
— just keep that exact filename, or update the `src` in `src/App.jsx` (search
for `those-eyes.mp3`) if you name it differently.

## 2. Get it into GitHub (from your phone, no terminal needed)

1. Go to github.com → **New repository** → name it (e.g. `hey-stranger`) → Create.
2. On the repo page, tap **Add file → Upload files**.
3. Upload every file/folder from this project, keeping the same folder
   structure (`src/`, `public/`, `package.json`, etc).
4. Commit directly to `main`.

To add photos/song later, use **Add file → Upload files** again and upload
into `public/photos` or `public/audio`.

## 3. Deploy on Vercel

1. Go to vercel.com → **Add New → Project**.
2. Import the GitHub repo you just created.
3. Vercel auto-detects Vite — leave the defaults (`npm run build`, output
   `dist`) and click **Deploy**.
4. Every push to `main` after that redeploys automatically.

## Notes

- If the browser blocks autoplay with sound, tapping **Begin** should still
  start it — that button click is what unlocks audio on most phones. The
  speaker icon top-right is a manual fallback.
- Missing a photo file just leaves that card's background a soft gradient
  instead of breaking anything.
