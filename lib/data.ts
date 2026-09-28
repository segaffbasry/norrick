// Site content. Static, no backend. Talent and job posts are clearly marked
// samples (shown under a work-in-progress note) until member listings connect.

export type PersonaId = "filmmakers" | "actors" | "animators" | "crew";

export interface Persona {
  id: PersonaId;
  label: string;
  headline: string;
  body: string;
  cta: string;
}

export const personas: Persona[] = [
  {
    id: "filmmakers",
    label: "Filmmakers",
    headline: "Your next crew is already here.",
    body: "Find the collaborators who share your ambition and get the project moving.",
    cta: "Assemble your team",
  },
  {
    id: "actors",
    label: "Actors",
    headline: "Get seen by people making things.",
    body: "Be discovered for real projects by filmmakers who are ready to shoot.",
    cta: "Find your next role",
  },
  {
    id: "animators",
    label: "Animators",
    headline: "Bring your worlds to life, together.",
    body: "Team up with storytellers and studios that value craft.",
    cta: "Show your reel",
  },
  {
    id: "crew",
    label: "Crew",
    headline: "The work happens because of you.",
    body: "Cinematographers, editors, sound and more, connected with productions that need them.",
    cta: "Get on set",
  },
];

export interface Project {
  id: string;
  title: string;
  format: string;
  persona: PersonaId;
  credit: string;
  image: string;
  creator: string;
  likes: number;
  views: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

// Real members. The wording is drawn from what each person told the team, so
// get each quote approved by the person before launch. Mark also agreed to
// record a ~20 second video testimonial: swap it in once it exists.
export const testimonials: Testimonial[] = [
  {
    id: "mark-wilhelm",
    quote:
      "Six months ago nobody was applying to the roles I posted. Lately a lot of people apply, and it's been super helpful. I've hired through Norrick and connected people to other projects.",
    name: "Mark Wilhelm",
    role: "Hires through Norrick",
  },
  {
    id: "makyla-paquette",
    quote: "It feels human. There are no follower counts, just connections. It's an equal playing field.",
    name: "Makyla Paquette",
    role: "Creative on Norrick",
  },
];

// --- Profile categories -------------------------------------------------------
// Roles, grouped by craft (persona). The animation pipeline roles (Concept
// Artist through Final Render / Compositor) follow the real production stages.

export type RoleId =
  | "director" | "producer" | "screenwriter"
  | "actor" | "voice-actor" | "mocap-performer"
  | "concept-artist" | "3d-modeler" | "surfacing-artist" | "animatic-editor"
  | "animator" | "lighting-artist" | "compositor" | "motion-designer"
  | "cinematographer" | "gaffer" | "editor" | "colourist"
  | "sound-designer" | "composer" | "production-designer";

export interface Role {
  id: RoleId;
  label: string;
  craft: PersonaId;
}

export const roles: Role[] = [
  { id: "director", label: "Director", craft: "filmmakers" },
  { id: "producer", label: "Producer", craft: "filmmakers" },
  { id: "screenwriter", label: "Writer", craft: "filmmakers" },

  { id: "actor", label: "Actor", craft: "actors" },
  { id: "voice-actor", label: "Voice Actor", craft: "actors" },
  { id: "mocap-performer", label: "Motion-capture Performer", craft: "actors" },

  { id: "concept-artist", label: "Concept Artist", craft: "animators" },
  { id: "3d-modeler", label: "3D Modeler", craft: "animators" },
  { id: "surfacing-artist", label: "Surfacing Artist", craft: "animators" },
  { id: "animatic-editor", label: "Animatic Editor", craft: "animators" },
  { id: "animator", label: "Animator", craft: "animators" },
  { id: "lighting-artist", label: "Lighting Artist", craft: "animators" },
  { id: "compositor", label: "Final Render / Compositor", craft: "animators" },
  { id: "motion-designer", label: "Motion Designer", craft: "animators" },

  { id: "cinematographer", label: "Cinematographer", craft: "crew" },
  { id: "gaffer", label: "Gaffer", craft: "crew" },
  { id: "editor", label: "Editor", craft: "crew" },
  { id: "colourist", label: "Colourist", craft: "crew" },
  { id: "sound-designer", label: "Sound Designer", craft: "crew" },
  { id: "composer", label: "Composer", craft: "crew" },
  { id: "production-designer", label: "Production Designer", craft: "crew" },
];

const allRoles = roles;
export const roleLabel = (id: RoleId) => roles.find((r) => r.id === id)?.label ?? id;

// Big category cards on the homepage. Together they partition all roles.
export interface CraftGroup {
  id: string;
  title: string;
  roles: RoleId[];
}

// --- Talent -------------------------------------------------------------------

export interface Talent {
  id: string;
  name: string;
  headline: string;
  persona: PersonaId;
  /** Every category this person works in. The first is their main one. */
  roles: RoleId[];
  location: string;
  followers: string;
  /** Profile counts shown in the side sheet (UMDB profile: connections, posts, followers, following). */
  connections: number;
  posts: number;
  following: number;
  stats: { value: string; label: string }[];
}

// Sample locations and follower counts, cycled by talent number.
const locations = [
  "Gothenburg, Sweden", "Dallas, USA", "Lagos, Nigeria", "Toronto, Canada",
  "London, UK", "Jakarta, Indonesia", "Berlin, Germany", "Sao Paulo, Brazil",
];
const followerCounts = ["241", "349", "128", "512", "96", "187", "403", "275"];

function talent(
  n: number,
  roles: RoleId[],
  headline: string,
  credits: string,
  collabs: string,
  rating: string,
): Talent {
  return {
    id: `ta${n}`,
    name: `Sample profile · ${allRoles.find((r) => r.id === roles[0])!.label}`,
    headline: headline.charAt(0).toUpperCase() + headline.slice(1),
    persona: allRoles.find((r) => r.id === roles[0])!.craft,
    roles,
    location: locations[n % locations.length],
    followers: followerCounts[n % followerCounts.length],
    connections: (n * 7) % 40,
    posts: 6 + ((n * 5) % 28),
    following: (n * 3) % 25,
    stats: [
      { value: credits, label: "Credits" },
      { value: collabs, label: "Collabs" },
      { value: rating, label: "Rating" },
    ],
  };
}

export const talents: Talent[] = [
  talent(1, ["director", "screenwriter", "editor"], "director of short-form narrative", "24", "75x", "5.0"),
  talent(2, ["actor", "voice-actor"], "character actor, stage and screen", "18", "13x", "4.9"),
  talent(3, ["animator", "concept-artist"], "2D and stop-motion animator", "31", "87x", "5.0"),
  talent(4, ["cinematographer", "gaffer", "editor"], "director of photography", "42", "60x", "4.8"),
  talent(5, ["producer", "director"], "documentary producer", "12", "9x", "5.0"),
  talent(6, ["voice-actor", "actor"], "voice actor, animation and games", "27", "22x", "4.9"),
  talent(7, ["concept-artist", "3d-modeler"], "concept artist, characters and worlds", "22", "30x", "4.9"),
  talent(8, ["3d-modeler", "surfacing-artist"], "hard-surface and character 3D modeler", "19", "17x", "4.8"),
  talent(9, ["surfacing-artist", "lighting-artist"], "surfacing and texture artist", "16", "12x", "4.9"),
  talent(10, ["animatic-editor", "editor", "animator"], "animatic editor and story reels", "14", "10x", "5.0"),
  talent(11, ["lighting-artist", "compositor"], "lighting artist, look development", "25", "26x", "4.9"),
  talent(12, ["compositor", "motion-designer"], "final render and compositing", "33", "44x", "5.0"),
  talent(13, ["motion-designer", "animator"], "motion designer, titles and VFX", "20", "41x", "5.0"),
  talent(14, ["screenwriter", "director"], "writer, drama and comedy", "15", "33x", "4.8"),
  talent(15, ["editor", "colourist"], "picture editor, narrative and documentary", "29", "31x", "4.9"),
  talent(16, ["colourist", "editor"], "colourist and finishing", "36", "28x", "4.9"),
  talent(17, ["sound-designer", "composer"], "sound designer and re-recording mixer", "48", "52x", "5.0"),
  talent(18, ["gaffer", "cinematographer"], "gaffer and lighting crew lead", "39", "35x", "4.8"),
  talent(19, ["composer", "sound-designer"], "composer for film and animation", "21", "19x", "4.9"),
  talent(20, ["production-designer", "concept-artist"], "production designer", "17", "14x", "4.7"),
  talent(21, ["mocap-performer", "actor"], "motion-capture performer", "13", "11x", "4.8"),
  talent(22, ["actor", "director"], "lead actor, commercial and indie", "22", "17x", "4.7"),
  talent(23, ["animator", "3d-modeler"], "character and 3D animator", "17", "14x", "4.9"),
];

// --- Job posts ----------------------------------------------------------------

export interface JobPost {
  id: string;
  company: string;
  blurb: string;
  categories: string;
  persona: PersonaId;
  /** Every role this post is hiring for. */
  roles: RoleId[];
  openRoles: number;
}

export const jobs: JobPost[] = [
  { id: "j1", company: "Coastal psychological short", blurb: "we are casting leads and supporting roles for a psychological short set in a coastal town. Shoot dates locked for next month.", categories: "Actors, Casting", persona: "actors", roles: ["actor", "voice-actor"], openRoles: 4 },
  { id: "j2", company: "Hand-drawn series pilot", blurb: "an animation studio building a hand-drawn series pilot and looking for character animators and background artists.", categories: "Animation, Series", persona: "animators", roles: ["animator", "concept-artist", "lighting-artist"], openRoles: 7 },
  { id: "j3", company: "Independent feature", blurb: "independent feature in pre-production, seeking a director of photography, gaffer, and 1st AC for a 20 day shoot.", categories: "Crew, Feature", persona: "crew", roles: ["cinematographer", "gaffer"], openRoles: 3 },
  { id: "j4", company: "Documentary slate", blurb: "producers wanted for a documentary slate. Experience with festival distribution is a plus.", categories: "Filmmakers, Documentary", persona: "filmmakers", roles: ["producer", "director"], openRoles: 1 },
  { id: "j5", company: "Music video", blurb: "music video production hiring an editor and colourist on a fast turnaround.", categories: "Crew, Music video", persona: "crew", roles: ["editor", "colourist"], openRoles: 2 },
  { id: "j6", company: "Shorts anthology", blurb: "writer-directors sought to pitch original shorts to a funded anthology.", categories: "Filmmakers, Anthology", persona: "filmmakers", roles: ["screenwriter", "director"], openRoles: 5 },
  { id: "j7", company: "First production room", blurb: "building a first production room and looking for one person per stage of the pipeline: concept, modelling, surfacing, animatic, animation, lighting and final render.", categories: "Animation, Pipeline", persona: "animators", roles: ["concept-artist", "3d-modeler", "surfacing-artist", "animatic-editor", "animator", "lighting-artist", "compositor"], openRoles: 7 },
];

// Footer "Main partners" row, from umdb.org "In collaboration with". Logo files
// were downloaded from umdb.org into /public/partners/ and render white on the
// dark footer. Falls back to the name as text if `logo` is unset.
export interface Partner {
  name: string;
  href: string;
  logo?: string;
}

export const partners: Partner[] = [
  { name: "DOC Institute", href: "https://docinstitute.com", logo: "/partners/DocInstitute.png" },
  { name: "AWS", href: "https://aws.amazon.com", logo: "/partners/AWS.png" },
  { name: "MongoDB", href: "https://www.mongodb.com", logo: "/partners/MongoDB.png" },
  { name: "HubSpot", href: "https://www.hubspot.com", logo: "/partners/HubSpot.png" },
  { name: "RevStar Consulting", href: "https://revstarconsulting.com", logo: "/partners/REV.png" },
];

export const homeFaq = [
  { q: "What is Norrick?", a: "A creative community for turning ideas into finished work. Norrick connects filmmakers, actors, animators and crew with the people they need to make something together." },
  { q: "Do I need experience to join?", a: "You can be making your first project or bringing years of experience. There is room for every stage of the journey. Start with your interests, your craft, and what you want to make." },
  { q: "Can I join without a project?", a: "Yes. You can look for collaborators, explore roles on other projects, or get to know the community while your next idea takes shape." },
  { q: "Is it free to join?", a: "Creating a profile and applying to roles is free. Paid plans add tools for running productions and working with a larger team. You can compare them on the Pricing page." },
  { q: "Where should I start?", a: "Head to Collaborate and choose what brings you here: an idea to make, a project to join, or people to meet. We will point you toward the next step." },
];

// "Meet Norrick": the second homepage section (Contra Labs "Meet the ecosystem"
// layout). Two sides of the platform, from the founder's questionnaire.
export const meet = {
  title: "Meet Norrick",
  body: "The place where ideas that started in someone's head become finished work. We connect creatives with the people they need, and productions with talent that shows up and finishes.",
  cards: [
    {
      label: "For creatives",
      title: "Find your team and build your credits",
      body: "Meet collaborators, join real productions, and finish work you're proud of.",
      cta: "Find jobs",
      href: "/jobs",
    },
    {
      label: "For productions",
      title: "Real talent, ready to start",
      body: "Search verified filmmakers, actors, animators and crew, and turn the work itself into promotional content.",
      cta: "Partner with us",
      href: "/partnerships",
    },
  ],
};
