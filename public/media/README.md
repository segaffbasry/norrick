# Norrick media

- `animation-showcase.mp4` / `.jpg`: a short animation a Norrick animator sent
  in for use on the site. Shown on the homepage as "Animation by a Norrick
  member" (Animators tile).
- Everything in `/public/video` is licensed stock footage from Pexels (free to
  use, no attribution required: pexels.com/license), cut to ~6s, silent, and
  compressed for the web. Each clip's Pexels id is recorded in `lib/home.ts`.
  `hero.mp4` cuts together Pexels 8089230, 34677880, 26898433 and 9810699.

The brief is to replace the stock clips with approved community footage as it
arrives (with members' permission). Swap the files or the `src` values in
`lib/home.ts`: same shape (16:9, silent, about 6s) and a poster frame .jpg.
