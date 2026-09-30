// About page content. Story text is taken from umdb.org/about (the team's own
// words). Visuals are placeholders until real stills exist.
import { authLinks } from "@/lib/auth-links";

export const aboutHero = {
  title: "A new home for creatives",
  body: "From a pandemic passion project to a creative hub for people who make things.",
};

// Two feature rows: a text card beside a photo (grey placeholder) with a caption pill.
export const madeBy = {
  title: "Made by creatives, for creatives",
  body: "In 2020, during the pandemic, we were actors trying to make it. We started with no connections and no credits, so we made our own project, and learned just how hard it is for creatives to break through.",
  note: "Want to join us?",
  cta: "Sign up",
  href: authLinks.signUp,
  caption: "Love Series, 2020",
  image: { src: "/about/about1.jpg", alt: "The cast of Love Series, posed on a red sofa" },
};

export const empower = {
  title: "Building the creative hub we wish we had",
  body: "We interviewed countless creatives from universities, film schools and acting programs. The pattern was clear: most graduate without a support system, without connections, without a roadmap. So we built the place we wish we had when we started.",
  caption: "The team, today",
  image: { src: "/about/about2.jpg", alt: "Five members of the team laughing together for a group photo" },
};

export const statement = {
  label: "Who we are",
  text: "From a pandemic passion project to a creative hub for people who make things. We built the creative hub we wish we had when we started.",
  body: "Today, Norrick is a creative hub where creatives showcase their work, backed by a growing community that helps you build projects from the start, with people by your side the whole way.",
};


export interface Chapter {
  label: string;
  title: string;
  body: string;
  /** Optional photo shown instead of the grey placeholder. */
  image?: { src: string; alt: string };
}

export const chapters: Chapter[] = [
  {
    label: "2020",
    title: "The Beginning",
    image: { src: "/about/about1.jpg", alt: "The cast of Love Series, posed on a red sofa" },
    body: "In 2020, during the pandemic, we were actors trying to make it. We decided to create our own project to get a demo ready. That project became Love Series, a web series that taught us everything about filmmaking, from production to post. But more importantly, it showed us how hard it is for creatives to break through.",
  },
  {
    label: "The wall",
    title: "The Struggle",
    body: "We hit a wall. We couldn't get the right team together, and distribution felt impossible. No one would take us seriously without credits, but we couldn't get credits without opportunities. It was a vicious cycle. We managed eventually, but the struggle stuck.",
  },
  {
    label: "Failing forward",
    title: "The First Attempt",
    image: { src: "/about/about-event.jpg", alt: "A speaker with a microphone talking with a host at an UntoldCine screening event" },
    body: "Our founder, Malcolm Mokwe, started a streaming creative hub to combat the distribution problem. It was rough around the edges. Honestly, it was pretty bad. But he launched it anyway, believing in failing forward.",
  },
  {
    label: "The pattern",
    title: "The Realization",
    image: { src: "/about/about-group.jpg", alt: "A group of creatives smiling around a table in a restaurant" },
    body: "We traced the full journey of marketing a creative project. We interviewed countless creatives from universities, film schools, acting programs. The pattern was clear: most creatives graduate without a support system, without connections, without a roadmap. We went deeper. What if we could build the creative hub we wish we had when we started? That's how we arrived at Norrick.",
  },
  {
    label: "Nov 2025",
    title: "The Launch",
    image: { src: "/about/about-studio.jpg", alt: "A smiling man in a suit seated for an interview on a film studio set" },
    body: "In November 2025, we launched Norrick, a creative hub for creatives. The community grew through word of mouth.",
  },
  {
    label: "Now",
    title: "Today",
    image: { src: "/about/about2.jpg", alt: "Five members of the team laughing together for a group photo" },
    body: "Today, Norrick is a creative hub where creatives showcase their work, backed by a growing community that helps you build projects from the start, with people by your side the whole way.",
  },
];

export const journey = {
  eyebrow: "The journey",
  title: "From an idea to a community",
  body: "Sign up and discover the world that awaits you.",
  cta: "Join Norrick",
};

export const teamQuote = {
  quote: "From a pandemic passion project to a creative community. This is just the beginning.",
  by: "Norrick",
};
