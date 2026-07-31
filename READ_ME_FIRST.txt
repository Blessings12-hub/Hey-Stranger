This zip only contains the files that changed. Drop these into your existing
repo, overwriting the old ones, then do the following cleanup:

1. public/photos/ now has 0.jpg through 18.jpg (renamed, in alphabetical
   order of your original filenames — I had no way to know which order you
   actually wanted, so double check 0.jpg is the one you want on the opener
   and reorder/rename any you'd like swapped).
   -> Delete the old randomly-named .jpeg files from public/photos/ in your
      repo, they're replaced by these.

2. src/data/slides.js — trimmed to 18 entries to match your 18 photos
   (you uploaded 19 images total: 1 for the opener + 18 for cards).

3. src/App.jsx — the "Begin" tap now also retries playback on your very
   next tap anywhere if the browser blocks it the first time. This is the
   most reliable autoplay behavior the web allows; no browser lets audio
   with sound start with zero user interaction.

4. README.md — updated card count (18, not 20).

Your those-eyes.mp3 is unchanged and not included here since it didn't change.
