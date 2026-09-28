# Norrick media

- `raquel-hernandez-3d.mp4` / `.jpg`: community clip supplied as `10 sec clip2.mp4`,
  credited to **Raquel Hernandez · 3D Artist** on the homepage Animators tile.
  Full submitted sequence (about 11 seconds), optimized to 1280×720 H.264,
  silent for decorative autoplay, with a poster from the three-second mark.
  Plays in the homepage hero.
- `patrick-parenteau-level-design.mp4` / `.jpg`: from Patrick Parenteau's
  `reel-PATRICKPARENTEAU_REEL2026.mp4` (85s demo reel), credited
  **Patrick Parenteau · Level Designer** (the title on his reel's opening card).
  Cut to the Mars base flyover, 0:30.7 to 0:44.6 (about 14 seconds), which
  leaves out the title and end cards (they carry his email address) and the
  editor screen captures. 1280×720 H.264, silent, poster from 0:39.5.
  Plays through the letters of the homepage closing scene.
- `animation-showcase.mp4` / `.jpg`: earlier community animation retained as
  an unused asset; replaced in the Animators tile by Raquel’s clip.
- Everything in `/public/video` is licensed stock footage from Pexels (free to
  use, no attribution required: pexels.com/license), cut to ~6s, silent, and
  compressed for the web. Each clip's Pexels id is recorded in `lib/home.ts`.
  `hero.mp4` cuts together Pexels 8089230, 34677880, 26898433 and 9810699.

The homepage uses community footage only; the stock clips are unused. More
member clips are arriving: add each one to `films` in `lib/home.ts` with its
credit, as a silent 16:9 .mp4 (720p, about 10 to 15 seconds, no title cards or
contact details) and a poster .jpg.
