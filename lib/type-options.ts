// Typeface options for the client to choose from before anything is committed.
// Each can be previewed on /type-options, or across the whole site with
// ?type=a|b|c (remembered in this browser; ?type=off returns to the current type).
// The fonts themselves are loaded in app/fonts.ts; the switch lives in globals.css.

export const typeOptions = [
  {
    id: "a",
    name: "Bricolage Grotesque",
    pairing: "Headlines and body in one family",
    mood: "Editorial with character. Ink-trap cuts give it bite at poster size, and it relaxes into a warm, readable text face.",
    display: "var(--font-bricolage)",
    body: "var(--font-bricolage)",
  },
  {
    id: "b",
    name: "Syne + Instrument Sans",
    pairing: "Syne ExtraBold headlines, Instrument Sans body",
    mood: "Art-house. Wide, heavy and unmistakably creative, balanced by a crisp, slightly condensed text face.",
    display: "var(--font-syne)",
    body: "var(--font-instrument-sans)",
  },
  {
    id: "c",
    name: "Big Shoulders + Schibsted Grotesk",
    pairing: "Big Shoulders Black headlines, Schibsted Grotesk body",
    mood: "Cinema marquee. Tall, condensed film-poster capitals with a sharp newsroom sans underneath.",
    display: "var(--font-big-shoulders)",
    body: "var(--font-schibsted)",
  },
] as const;

export type TypeOptionId = (typeof typeOptions)[number]["id"];
