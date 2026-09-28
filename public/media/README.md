# Norrick media

- `raquel-hernandez-3d.mp4` / `.jpg`: community clip supplied as `10 sec clip2.mp4`,
  credited to **Raquel Hernandez · 3D Artist** on the homepage Animators tile.
  Full submitted sequence (about 11 seconds), optimized to 1280×720 H.264,
  silent for decorative autoplay, with a poster from the three-second mark.
- `animation-showcase.mp4` / `.jpg`: earlier community animation retained as
  an unused asset; replaced in the Animators tile by Raquel’s clip.
- Everything in `/public/video` is licensed stock footage from Pexels (free to
  use, no attribution required: pexels.com/license), cut to ~6s, silent, and
  compressed for the web. Each clip's Pexels id is recorded in `lib/home.ts`.
  `hero.mp4` cuts together Pexels 8089230, 34677880, 26898433 and 9810699.

The brief is to replace the stock clips with approved community footage as it
arrives (with members' permission). Swap the files or the `src` values in
`lib/home.ts`: same shape (16:9, silent, about 6s) and a poster frame .jpg.
