// Placeholder content only. Static, no backend. Replace copy as it is finalised.

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
    body: "Placeholder copy for directors and producers: find the collaborators who share your ambition and get the project moving.",
    cta: "Assemble your team",
  },
  {
    id: "actors",
    label: "Actors",
    headline: "Get seen by people making things.",
    body: "Placeholder copy for actors: be discovered for real projects by filmmakers who are ready to shoot.",
    cta: "Find your next role",
  },
  {
    id: "animators",
    label: "Animators",
    headline: "Bring your worlds to life, together.",
    body: "Placeholder copy for animators: team up with storytellers and studios that value craft.",
    cta: "Show your reel",
  },
  {
    id: "crew",
    label: "Crew",
    headline: "The work happens because of you.",
    body: "Placeholder copy for crew: cinematographers, editors, sound, and more, connected with productions that need them.",
    cta: "Get on set",
  },
];

// Warm, inviting copy. Grounded in the founder's story: everyone starts with
// nothing, and the right people around you are what gets you there.
export const problem = {
  eyebrow: "Why Norrick",
  headline: "Everyone starts with nothing. You shouldn't have to start alone.",
  body: "The right people around you are what gets you there. Norrick helps you find them.",
  cycle: {
    label: "How it grows",
    steps: ["Meet your team", "Finish the work", "Earn your credit"],
    note: "Every finished project opens the door to the next one.",
  },
  points: [
    {
      title: "Find your people",
      body: "Great work starts with the right team. Filmmakers, actors, animators and crew, all in one place, so you can meet the people who fit your project.",
    },
    {
      title: "Get your first credit",
      body: "Everyone needs a first credit. Join a real production, build your reel, and be seen for what you can do.",
    },
    {
      title: "Finish, and be seen",
      body: "Finished work deserves an audience. Share what you make with a community that celebrates it, and let it lead to what comes next.",
    },
  ],
};

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

export const projects: Project[] = [
  {
    id: "p1",
    title: "Placeholder Title One",
    format: "Short film",
    persona: "filmmakers",
    credit: "Directed by Name Surname",
    image: "/media/poster-placeholder.svg",
    creator: "Name Surname",
    likes: 6,
    views: 129,
  },
  {
    id: "p2",
    title: "Placeholder Title Two",
    format: "Animated short",
    persona: "animators",
    credit: "Animated by Name Surname",
    image: "/media/poster-placeholder.svg",
    creator: "Name Surname",
    likes: 18,
    views: 219,
  },
  {
    id: "p3",
    title: "Placeholder Title Three",
    format: "Feature",
    persona: "actors",
    credit: "Starring Name Surname",
    image: "/media/poster-placeholder.svg",
    creator: "Name Surname",
    likes: 9,
    views: 151,
  },
  {
    id: "p4",
    title: "Placeholder Title Four",
    format: "Music video",
    persona: "crew",
    credit: "DoP Name Surname",
    image: "/media/poster-placeholder.svg",
    creator: "Name Surname",
    likes: 13,
    views: 113,
  },
  {
    id: "p5",
    title: "Placeholder Title Five",
    format: "Documentary",
    persona: "filmmakers",
    credit: "Produced by Name Surname",
    image: "/media/poster-placeholder.svg",
    creator: "Name Surname",
    likes: 16,
    views: 39,
  },
  {
    id: "p6",
    title: "Placeholder Title Six",
    format: "Series",
    persona: "crew",
    credit: "Edited by Name Surname",
    image: "/media/poster-placeholder.svg",
    creator: "Name Surname",
    likes: 5,
    views: 44,
  },
];

// Stacked "cascade" rows shown right before the FAQ: big title left, one clear
// line right. Content follows the real plans (production rooms, free profile).
export const howRows = [
  {
    title: "How it works",
    body: "Join, meet the people who fit your craft, and build together in a production room until the work ships.",
  },
  {
    title: "What you get",
    body: "A free profile and unlimited applications. Production rooms with tasks, milestones and team chat. A verified badge, and real credits to point at.",
  },
  {
    title: "Who it's for",
    body: "Filmmakers, actors, animators and crew at any stage, and productions that need real talent, fast.",
  },
];

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

export const finalCta = {
  headline: "Make something together.",
  body: "Placeholder closing line inviting people to join the community.",
  primary: "Join Norrick",
  secondary: "See how it works",
};

// --- Discover section (Hero -> section 2): trending, talents, job posts -------

export interface TrendingTopic {
  id: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
}

export const trending: TrendingTopic[] = [
  {
    id: "tr1",
    title: "Short Film Challenge",
    body: "Placeholder: submit your film to win the monthly community prize.",
    stats: [
      { value: "$5K", label: "Prize" },
      { value: "6d", label: "Left" },
    ],
  },
  {
    id: "tr2",
    title: "Casting Calls",
    body: "Placeholder: open roles from productions that are ready to shoot this month.",
    stats: [
      { value: "786", label: "Actors" },
      { value: "168", label: "Roles" },
    ],
  },
  {
    id: "tr3",
    title: "Animation Jam",
    body: "Placeholder: team up with writers and sound designers on a 48-hour animated short.",
    stats: [
      { value: "24K", label: "Members" },
      { value: "38K", label: "Posts" },
    ],
  },
  {
    id: "tr4",
    title: "Crew Wanted",
    body: "Placeholder: cinematographers, editors and sound, matched to productions that need them.",
    stats: [
      { value: "6.6K", label: "Crew" },
      { value: "4.6K", label: "Gigs" },
    ],
  },
  {
    id: "tr5",
    title: "Festival Season",
    body: "Placeholder: get your finished work seen by programmers and buyers.",
    stats: [
      { value: "2.3K", label: "Entries" },
      { value: "1.2K", label: "Screenings" },
    ],
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

export const craftGroups: CraftGroup[] = [
  { id: "filmmakers", title: "Filmmakers", roles: ["director", "producer", "screenwriter"] },
  { id: "actors", title: "Actors", roles: ["actor", "voice-actor", "mocap-performer"] },
  {
    id: "animators",
    title: "Animators",
    roles: ["concept-artist", "3d-modeler", "surfacing-artist", "animatic-editor", "animator", "lighting-artist", "compositor"],
  },
  { id: "camera-light", title: "Camera & Light", roles: ["cinematographer", "gaffer"] },
  { id: "picture-sound", title: "Picture & Sound", roles: ["editor", "colourist", "sound-designer", "composer"] },
  { id: "design-motion", title: "Design & Motion", roles: ["production-designer", "motion-designer"] },
];

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

// Placeholder locations and follower counts, cycled by talent number.
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
    name: "Name Surname",
    headline: `Placeholder: ${headline}`,
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
  { id: "j1", company: "Placeholder Pictures", blurb: "Placeholder: we are casting leads and supporting roles for a psychological short set in a coastal town. Shoot dates locked for next month.", categories: "Actors, Casting", persona: "actors", roles: ["actor", "voice-actor"], openRoles: 4 },
  { id: "j2", company: "Placeholder Studio", blurb: "Placeholder: an animation studio building a hand-drawn series pilot and looking for character animators and background artists.", categories: "Animation, Series", persona: "animators", roles: ["animator", "concept-artist", "lighting-artist"], openRoles: 7 },
  { id: "j3", company: "Placeholder Films", blurb: "Placeholder: independent feature in pre-production, seeking a director of photography, gaffer, and 1st AC for a 20 day shoot.", categories: "Crew, Feature", persona: "crew", roles: ["cinematographer", "gaffer"], openRoles: 3 },
  { id: "j4", company: "Placeholder Collective", blurb: "Placeholder: producers wanted for a documentary slate. Experience with festival distribution is a plus.", categories: "Filmmakers, Documentary", persona: "filmmakers", roles: ["producer", "director"], openRoles: 1 },
  { id: "j5", company: "Placeholder Works", blurb: "Placeholder: music video production hiring an editor and colourist on a fast turnaround.", categories: "Crew, Music video", persona: "crew", roles: ["editor", "colourist"], openRoles: 2 },
  { id: "j6", company: "Placeholder Lab", blurb: "Placeholder: writer-directors sought to pitch original shorts to a funded anthology.", categories: "Filmmakers, Anthology", persona: "filmmakers", roles: ["screenwriter", "director"], openRoles: 5 },
  { id: "j7", company: "Placeholder Production Room", blurb: "Placeholder: building a first production room and looking for one person per stage of the pipeline: concept, modelling, surfacing, animatic, animation, lighting and final render.", categories: "Animation, Pipeline", persona: "animators", roles: ["concept-artist", "3d-modeler", "surfacing-artist", "animatic-editor", "animator", "lighting-artist", "compositor"], openRoles: 7 },
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
  { q: "What is Norrick?", a: "Placeholder answer. Norrick connects filmmakers, actors, animators and crew with each other and with productions." },
  { q: "Who can join?", a: "Placeholder answer. Anyone making or working on film and animation, at any stage of their career." },
  { q: "Is it free to join?", a: "Placeholder answer. Creating a profile is free. Explain what paid plans add." },
  { q: "How do productions find talent?", a: "Placeholder answer. Browse verified talent or post a job and let applicants come to you." },
  { q: "How do I get verified?", a: "Placeholder answer. Complete a real collaboration and earn a verified badge." },
  { q: "What happens after we connect?", a: "Placeholder answer. Message, agree the work, and build something that ships." },
];

// Homepage hero. Headline draws on the founder's own words ("the place where
// things that were just an idea in someone's head actually became real").
// Stat figures come from the About page.
export const hero = {
  title: "Where creatives find their people.",
  /** Phrase inside `title` that gets the underline. */
  highlight: "find their people",
  body: "Norrick connects filmmakers, actors, animators and crew with each other and with productions.",
  // Figures as shown on umdb.org.
  stats: [
    { value: "2,100+", label: "Creatives worldwide" },
    { value: "560+", label: "Active every month" },
    { value: "Free", label: "To join and apply" },
  ],
};

// The earlier full-bleed hero (roles + stats) now closes the page.
export const closingHero = {
  title: "Your next project starts here.",
  body: hero.body,
  stats: hero.stats,
};

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
