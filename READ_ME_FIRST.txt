Changed files only:

1. public/photos/19.jpg — the new photo, added as the 19th and final slide.

2. src/data/slides.js — added the new finale entry (long paragraph) pointing
   at 19.jpg.

3. src/App.jsx + src/App.css:
   - Opener (the "hey stranger" screen) is now a full-bleed background photo
     using 0.jpg, with a soft scrim so the text stays readable, instead of
     the small circular photo it was before.
   - Added a "magic" layer on the opener: small gold sparkles that twinkle
     in and out at random spots over the photo.
   - The finale paragraph slide automatically switches to a smaller,
     upright font and scrolls if it runs long, so the long paragraph
     doesn't get cut off or overflow the screen.

Nothing else changed — your other photos (0.jpg–18.jpg) and the song are
untouched.
