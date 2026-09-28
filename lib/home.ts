// Homepage content: the journey from "I have an idea" to "I finished something".
//
// FOOTAGE: every clip in /public/video is licensed stock from Pexels (free to use,
// no attribution required, see pexels.com/license), cut and compressed for the
// web. The only exception is the animation in /public/media, which a Norrick
// animator sent in for use on the site. Swap each `src` for approved community
// footage as it arrives: same length (about 6s), silent, 16:9.
//
// CONVERSATION LINES: written to show the kind of thing members say. They carry
// a craft, never a name, and are not presented as quotes from real people. The
// brief is to replace them with real, approved member snippets.

export interface Clip {
  src: string;
  poster: string;
  /** Pexels video id, so the source can always be traced. */
  pexels?: number;
}

const clip = (name: string, pexels?: number): Clip => ({
  src: `/video/${name}.mp4`,
  poster: `/video/${name}.jpg`,
  pexels,
});

export const heroFilm: Clip = { src: "/video/hero.mp4", poster: "/video/hero.jpg" };
/** Pexels ids of the four shots cut together in hero.mp4, in order. */
export const heroFilmSources = [8089230, 34677880, 26898433, 9810699];

// Conversation that builds around the hero film as you scroll.
export const heroThread: { text: string; who: string; side: "left" | "right" }[] = [
  { text: "I’ve had this short film in my head for two years.", who: "Writer", side: "left" },
  { text: "Looking for a cinematographer who loves natural light.", who: "Director", side: "right" },
  { text: "I’m interested in this. I shoot on 16mm.", who: "Cinematographer", side: "left" },
  { text: "Rehearsal’s Thursday. Who’s in?", who: "Actor", side: "right" },
  { text: "We wrapped. We actually made it.", who: "Producer", side: "left" },
];

// The arc: one idea, all the way to finished.
export const arc: { line: string; accent: string; bubble: string; who: string; clip: Clip }[] = [
  {
    line: "It starts with an idea",
    accent: "you can’t let go of.",
    bubble: "What if we shot the whole thing in one take?",
    who: "Writer",
    clip: clip("chapter-idea", 8035615),
  },
  {
    line: "Then you find",
    accent: "the people who get it.",
    bubble: "Looking for someone who can draw the storyboards.",
    who: "Director",
    clip: clip("chapter-people", 6911912),
  },
  {
    line: "Someone says",
    accent: "“I’m in.”",
    bubble: "I’m interested in this. When do we start?",
    who: "Actor",
    clip: clip("chapter-rehearse", 6896049),
  },
  {
    line: "You roll",
    accent: "camera.",
    bubble: "Scene four, take two. Rolling.",
    who: "Assistant director",
    clip: clip("chapter-shoot", 9810147),
  },
  {
    line: "You find the story",
    accent: "in the edit.",
    bubble: "Okay. I think this is the cut.",
    who: "Editor",
    clip: clip("chapter-edit", 7699548),
  },
  {
    line: "And then,",
    accent: "you finished something.",
    bubble: "It’s done. Come and see it.",
    who: "Everyone",
    clip: clip("chapter-premiere", 7986770),
  },
];

export const crafts: { title: string; roles: string; clip: Clip; credit?: string }[] = [
  { title: "Filmmakers", roles: "Directors, producers, writers", clip: clip("craft-filmmakers", 37903880) },
  { title: "Actors", roles: "Screen, voice, motion capture", clip: clip("craft-actors", 8089230) },
  {
    title: "Animators",
    roles: "Concept to final render",
    clip: { src: "/media/animation-showcase.mp4", poster: "/media/animation-showcase.jpg" },
    credit: "Animation by a Norrick member",
  },
  { title: "Crew", roles: "Camera, lighting, sound, edit", clip: clip("craft-crew", 8089122) },
];

export const closingFilm = clip("closing", 8262689);
