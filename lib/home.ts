// Community footage. Every clip carries its maker's credit, shown on screen
// with it. To add a member or pilot clip: drop a silent 16:9 .mp4 (720p, about
// 10 to 15s) and a poster .jpg into /public/media, add it here, and point a
// scene at it. See /public/media/README.md for how each file was cut.
export interface Clip { src: string; poster: string; credit: string }

export const films = {
  raquel: {
    src: "/media/raquel-hernandez-3d.mp4",
    poster: "/media/raquel-hernandez-3d.jpg",
    credit: "Raquel Hernandez · 3D Artist",
  },
  patrick: {
    src: "/media/patrick-parenteau-level-design.mp4",
    poster: "/media/patrick-parenteau-level-design.jpg",
    credit: "Patrick Parenteau · Level Designer",
  },
} satisfies Record<string, Clip>;

export const heroFilm: Clip = films.raquel;
/** Plays through the letters of the closing scene. */
export const closingFilm: Clip = films.patrick;

// The journey. Photos are from Norrick's own events and shoots (/public/about).
export const arc = [
  { title: "Idea", body: "A story you want to tell. A world you want to build.", photo: "/about/about-event.jpg", alt: "A creative talking through an idea on stage at a Norrick screening" },
  { title: "People", body: "Find collaborators who want to make it with you.", photo: "/about/about2.jpg", alt: "Five members of the Norrick community laughing together" },
  { title: "Make", body: "Bring your craft. Work through it together.", photo: "/about/about-studio.jpg", alt: "An actor on set between a camera and a boom mic" },
  { title: "Finished", body: "Put the work out into the world. Start your next chapter.", photo: "/about/about1.jpg", alt: "The cast of Love Series, a finished Norrick project" },
];
