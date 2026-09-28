# Norrick creative direction: review notes

## The brief (Malcolm, Untoldcine)

Not a SaaS marketplace template: no numbered steps, no stat pills, no
placeholder copy. Locked palette. Hero: "Welcome to Norrick. Your chapter starts
here." over community video, turning into chat-bubble snippets of what people
are making and looking for, leading to the collaboration page. An emotional arc
from "I have an idea" to "I finished something". Keep the About story, the
"Meet Norrick" copy and the Mark and Makyla testimonials.

## What is built

- **Palette**: purple #6a21f2, black, white (tints only). `theme-color` is the
  brand purple. Type: Archivo run wide for statements (echoes the wordmark),
  Bebas Neue condensed accents, Inter body.
- **Home** (`/`): film hero that pulls back into a frame as a conversation
  builds around it; Meet Norrick (copy verbatim); a sideways scroll through six
  chapters of one idea being made; a crafts band whose giant words react to
  scroll speed; the Love Series story; Mark and Makyla; FAQ; a closing scene
  where the film plays inside the words "Let's make something" and then fills
  the screen. No statistics anywhere.
- **Collaborate** (`/collaborate`): a conversation. Norrick asks what brings you
  here, you answer in a bubble, pick a craft, and go to the right directory.
- **Our story** (`/about`): the team's own words, unchanged, in the new style.
  No stats strip; the chapter story has word labels instead of numbers.
- **For productions** (`/partnerships`): rebuilt with true material only (free
  role posts, production rooms, competitions, Mark's quote, real partner logos).
  The invented companies, figures and quotes are gone.
- Sign-in / sign-up side panel, share image (`app/opengraph-image.jpg`), and
  all visible "Placeholder" / "Name Surname" copy cleaned up. Talent and job
  directories stay clearly labelled as samples.

## Footage

Stock from Pexels (free licence, no attribution needed), cut to about 6s, silent,
compressed (about 6.5 MB for all clips). Ids are recorded in `lib/home.ts`. The
Animators tile uses the real animation a Norrick member sent in. Replace clips
with approved community footage as it arrives; see `public/media/README.md`.

## Still needed from the team

- Community clips (with permission) to replace the stock footage.
- Real member snippets for the conversation lines (currently written examples,
  shown with a craft, never a name).
- Mark and Makyla to approve their quote wording and titles.
- Legal pages: company name, contact email, age and the other bracketed items.
- Judges for 7 Stages of Animation, once confirmed.
