// Competitions. Copy, dates, rules and cover art come from umdb.org/competitions.
// Judges are announced by the team; none are listed until they are confirmed.
import { authLinks } from "@/lib/auth-links";

export interface Competition {
  slug: string;
  title: string;
  status: string;
  tagline: string;
  /** One line for cards. */
  summary: string;
  /** Two headline numbers shown on the page cover and in the homepage tiles. */
  stats: { value: string; label: string }[];
  body: string[];
  stages?: string[];
  rules: string[];
  hashtag: string;
  cta: string;
  /** Cover art from umdb.org. Width and height keep the aspect ratio. */
  cover: { src: string; alt: string; width: number; height: number };
  /** Key dates and facts shown as a list in the Overview. */
  timeline?: { label: string; value: string }[];
  /** Prize table (cash and extras). */
  prizes?: { rank: string; cash: string; extras: string }[];
  prizeNote?: string;
  eligibility?: { text: string; categories?: string[] };
  scripts?: Script[];
  faq?: { q: string; a: string }[];
  judges?: { name: string; role: string }[];
  votedNote?: string;
  winners?: Winner[];
  /** A community clip shown in the Overview post in place of the poster. */
  video?: { src: string; poster: string; caption: string };
}

export interface Script {
  category: string;
  title: string;
  note: string;
  lines: string[];
}

export interface Winner {
  place: string;
  name: string;
  /** Only set when the prize is known. */
  prize?: string;
  location?: string;
  blurb: string;
  image: { src: string; alt: string };
}

export const howItWorks = [
  { title: "Submit your work", body: "Upload a video during the submission window." },
  { title: "The community watches", body: "Your entry goes live and viewers from all over discover it." },
  { title: "Voting decides", body: "One vote per viewer per entry. No changes, no removals." },
  { title: "Winners get featured", body: "Top entries earn prizes, placement and the spotlight." },
];

export const competitions: Competition[] = [
  {
    slug: "7-stages-animation",
    title: "7 Stages of Animation",
    status: "Coming soon",
    tagline: "One project. Seven stages. Build your crew.",
    summary: "Our biggest competition: take one project from concept to final render with a team of 4 to 7.",
    stats: [
      { value: "Sep 23", label: "Team formation opens" },
      { value: "4 to 7", label: "People per team" },
    ],
    cover: {
      src: "/competitions/7-stages-animation.jpg",
      alt: "7 Stages of Animation poster: a stylised 3D character and the seven stages along the bottom",
      width: 2000,
      height: 1547,
    },
    body: [
      "Our biggest competition. One project. Seven stages. Build your crew. Teams of 4 to 7: modelers, animators, storyboard artists, whoever you build with. Your captain needs Creator Pro, and one account covers the whole team.",
      "Survive the pipeline. Every stage, your team ships a real deliverable. Through the early stages the community votes you forward. For the final stages, a judges' panel takes the call, where craft decides, not popularity.",
      "Nobody leaves empty. Every stage you complete becomes a permanent verified credit on your profile. Eliminated teams keep every remaining brief and can finish the full pipeline on the Open Track.",
      "Finish all seven and your film screens at the finale. The winning team's film is distributed on UntoldCine.com, receives a recorded professional critique, and gets the full marketing push. We don't pay winners, we launch them.",
    ],
    stages: ["Concept", "3D Modeling", "Surfacing", "Animatic", "Animation", "Lighting", "Final Render"],
    timeline: [
      { label: "Team formation opens", value: "September 23" },
      { label: "Team size", value: "4 to 7 people" },
      { label: "Captain", value: "Creator Pro, one account covers the whole team" },
      { label: "Prize", value: "Distribution on UntoldCine.com, a recorded professional critique and the full marketing push" },
    ],
    eligibility: {
      text: "Anyone 18+ with a complete profile, open worldwide. Teams are formed in a production room.",
      categories: ["3D Animation", "2D Animation", "Character Design", "Motion Graphics", "Experimental"],
    },
    rules: [
      "All participants are 18+ with a complete profile. Open worldwide.",
      "One project per team, 4 to 7 members, formed in a production room. The captain holds an active Creator Pro subscription for the whole competition, covers the whole team, and is the entrant of record.",
      "Each stage's brief and deliverable are revealed at the start of that stage, to registered teams only, and must be made within that stage's window. No late submissions.",
      "Community voting decides who advances through the early stages. A judges' panel decides the final stages and the winner. Vote totals reset every stage, so no team carries a lead.",
      "To advance in a community-voted stage, a team must vote on at least 20% of the remaining entries.",
      "Fake accounts, vote buying and bots mean immediate disqualification and permanent removal.",
      "All visual and audio assets must be original to the team or fully licensed.",
      "Eliminated teams keep Open Track access to every remaining brief and their production room through the finale. Completed-stage credits are permanent.",
      "A community-voted Audience Award runs alongside the judged final stages.",
      "By entering, the team lets us feature, stream and distribute stage deliverables and the final film on UMDb and UntoldCine.com for promotion. The team keeps ownership of its work.",
      "Employees of Untold Studios Corp. and their immediate family are not eligible.",
    ],
    hashtag: "7stagesofanimation",
    cta: "Get notified",
    video: {
      src: "/media/animation-showcase.mp4",
      poster: "/media/animation-showcase.jpg",
      caption: "A short animation sent in by one of our community animators.",
    },
    votedNote: "The community votes teams through the early stages. The judges’ panel for the final stages will be announced before team formation opens.",
    faq: [
      { q: "Who can join?", a: "Anyone 18+ with a complete profile. Open worldwide." },
      {
        q: "How do teams work?",
        a: "One project per team, 4 to 7 members. Teams are formed in a production room. The captain holds an active Creator Pro subscription for the whole competition. One subscription covers the entire team, and the captain is the official entrant.",
      },
      {
        q: "What are the stages?",
        a: "Concept, 3D Modeling, Surfacing, Animatic, Animation, Lighting and Final Render. Each stage has its own brief, deliverable and deadline, revealed at the start of that stage to registered teams only. No late submissions.",
      },
      {
        q: "How does judging work?",
        a: "Community voting decides who advances through the early stages. A judges' panel takes over for the final stages and picks the winner. Vote totals reset at the start of every stage, so no team carries a lead in from earlier rounds.",
      },
      {
        q: "Do I have to vote to stay in?",
        a: "Yes. To advance in a community-voted stage, your team needs to vote on at least 20% of the remaining entries. This keeps voting genuine and discourages block voting.",
      },
      {
        q: "What happens if my team gets eliminated?",
        a: "You are not locked out. Eliminated teams keep Open Track access, so you still get every remaining stage's brief and keep your production room through the finale. Any stage you completed stays credited to you permanently.",
      },
      { q: "Is there anything for teams that don't win?", a: "Yes. An Audience Award, voted by the community, runs alongside the judged final stages." },
      {
        q: "Who owns the work we make?",
        a: "You do. By entering, you let us feature, stream and distribute your stage deliverables and final film on UMDb and UntoldCine.com for promotion, but ownership stays with your team.",
      },
      { q: "What disqualifies a team?", a: "Fake accounts, vote buying and bots. They mean immediate disqualification and permanent removal." },
      { q: "Can employees of Untold Studios enter?", a: "No. Employees of Untold Studios Corp. and their immediate family are not eligible." },
      {
        q: "Is there a cost to enter?",
        a: "There is no separate entry fee. The team captain needs an active Creator Pro subscription ($6.99/month) for the duration of the competition. One subscription covers the whole team, up to 7 members. Regular team members don't pay anything.",
      },
    ],
  },
  {
    slug: "48-hours-vertical-film",
    title: "48 Hours Vertical Film Showcase",
    status: "Closed",
    tagline: "One team. Secret brief. Vertical film. Crew up and create.",
    summary: "Crew up and make one vertical film from a brief kept secret until kick-off.",
    stats: [
      { value: "3+", label: "People per team" },
      { value: "Free", label: "To enter" },
    ],
    cover: {
      src: "/competitions/48-hours-vertical-film.jpg",
      alt: "48 Hours Vertical Film Showcase poster: a camera crew on set, kick-off August 21st",
      width: 1920,
      height: 1080,
    },
    body: [
      "You don't enter this one alone. Build a team of at least three: actors, editors, writers, whoever you create with.",
      "The brief is secret. It drops August 21 at 8PM ET, to registered teams only. The only way to see it is to be in.",
      "Your team has until August 28 at 8PM ET to write, shoot and deliver one vertical film. 1 to 5 minutes, 9:16 only. Camera or phone, just make something great.",
      "Community voting cuts the field to 25, then to 5 finalists. A judges' panel picks the winner. Every entrant earns a permanent Official Selection badge.",
      "The winning team's film is distributed on UntoldCine.com with the whole community marketing it forward. Finalists get featured placement and 2 months of Creator Pro.",
    ],
    timeline: [
      { label: "Team formation opens", value: "August 14" },
      { label: "Brief drops", value: "August 21, 8PM ET" },
      { label: "Films due", value: "August 28, 8PM ET" },
      { label: "Community voting", value: "August 31 to September 14" },
      { label: "Prize", value: "Headline feature and distribution on UntoldCine.com, the spotlight across the community, and 2 months of free Creator Pro" },
    ],
    eligibility: {
      text: "Any filmmaker 18+ with a complete profile (headshot and bio at minimum). No geographic restrictions, open worldwide.",
    },
    rules: [
      "All filmmakers are 18+ with a complete profile. Headshot and bio at minimum; demo reel and credits are encouraged. Open worldwide.",
      "Team competition: one film per team, minimum three members, formed in a production room. The registered captain is the entrant of record and the same film competes through every round. Teams of three enter free; a fourth member or more needs Creator Pro.",
      "Vertical 9:16 only, minimum 1080x1920, 1 to 5 minutes. No horizontal reframes and no black bars.",
      "The brief is revealed only to registered teams at kick-off, August 21 at 8:00 PM ET. Your film must include the required elements in the brief and be made entirely inside the window, ending August 28 at 8:00 PM ET. Previously made films are not accepted. No late entries.",
      "Original audio, or music you own or are licensed to use. No copyrighted commercial music without a valid licence.",
      "Footage must be original to the team or fully licensed.",
      "Community voting selects the finalists and a judges' panel selects the winner. Fake accounts, vote buying and bots mean immediate disqualification and permanent removal.",
      "By entering, the team lets us feature, stream and distribute the film on UMDb and UntoldCine.com for promotion. The team keeps ownership of the film.",
      "Employees of Untold Studios Corp. and their immediate family are not eligible.",
    ],
    hashtag: "48hourvertical",
    cta: "Get notified for the next one",
    votedNote: "Community voting picks the finalists. A judges' panel picks the winner.",
    faq: [
      { q: "Is it really free to enter?", a: "Yes. Your captain just needs Creator Pro if the team has more than three members, and that covers the whole team." },
      { q: "What does a complete profile mean?", a: "A headshot, a bio, a demo reel uploaded to the creative hub, and at least one credit listed." },
      { q: "What format does my film have to be in?", a: "Vertical 9:16 only, minimum 1080x1920. No horizontal reframes and no black bars." },
      {
        q: "When does filming start and end?",
        a: "Filming starts the moment the brief drops on Friday, August 21 at 8PM ET, and everything is due Friday, August 28 at 8PM ET. The whole film is made inside that window, with no pre-shot footage.",
      },
      { q: "Can I use music in my film?", a: "Original audio, or music you fully own or are licensed to use. No copyrighted commercial music without a valid licence." },
      { q: "What do I win just for entering?", a: "A permanent Official Selection badge on your profile and a 1-year Bedtracks music licence." },
      { q: "How does voting work?", a: "Three rounds: all entries, then the top 1,000, then the top 25, then the top 5. Each round is 3 days, with one vote per account per round. A judges' panel picks the winner from the finalists." },
      { q: "How do I get more votes?", a: "Share your voting link everywhere: Instagram, TikTok, Facebook, X, anywhere. Every voter needs a free account, so ask your followers to register and vote." },
      { q: "Can I submit a film I already made?", a: "No. It must be created inside the competition window." },
      { q: "What happens if I miss the deadline?", a: "Your submission will not be accepted. Not one second late." },
      { q: "Who can enter?", a: "Any filmmaker 18+ with a complete profile. No geographic restrictions, open worldwide." },
      { q: "More questions?", a: "Email admin@untoldcine.com." },
    ],
  },
  {
    slug: "breakthrough-actor-showcase",
    title: "Breakthrough Actor Showcase",
    status: "Closed",
    tagline: "Three stages. No judges. $1,800 in prizes.",
    summary: "Three community-voted stages for actors worldwide, with $1,800 in prizes and no judges.",
    stats: [
      { value: "$1,800", label: "In prizes" },
      { value: "3 stages", label: "Community voted" },
    ],
    cover: {
      src: "/competitions/breakthrough-actor-showcase.jpg",
      alt: "Breakthrough Actor Showcase poster: $1,800 in prizes, three stages, free to enter",
      width: 1920,
      height: 1080,
    },
    body: [
      "Every actor has a moment they've been waiting to perform. This is it. The Breakthrough Actor Showcase is the first ever acting competition on the creative hub, and the community decides everything.",
      "Just actors, one script, and an audience ready to vote for the performance that moves them most. Every entrant performs the same official monologue. Same words. Different actors. The community votes on interpretation, presence and truth.",
      "Three stages cut from all entries to the Top 25 to the Final Five. The winner is decided by the people. First place wins $1,000 cash and the Breakthrough Actor of the Year title, permanently on their profile.",
      "Every entrant walks away with an Official Selection badge. A real credential, not a participation trophy. Two categories: Dramatic Monologue and Comedy Monologue. Free to enter and open to all actors worldwide.",
    ],
    timeline: [
      { label: "Submissions", value: "May 19 to June 8, 2026" },
      { label: "Voting", value: "June 8 to July 1, 2026" },
      { label: "Winners announced", value: "July 5, 2026" },
      { label: "Prize", value: "$1,800 in prizes: 1st $1,000, 2nd $500, 3rd $300" },
    ],
    prizes: [
      { rank: "1st place", cash: "$1,000", extras: "Breakthrough Actor of the Year badge, permanent on your profile" },
      { rank: "2nd place", cash: "$500", extras: "Outstanding Performance badge, permanent on your profile" },
      { rank: "3rd place", cash: "$300", extras: "Emerging Talent Award badge, permanent on your profile" },
    ],
    prizeNote: "Cash prizes are in Canadian dollars.",
    eligibility: {
      text: "Any actor 16+ with a profile, wherever you are. Choose one category and it stays fixed for all three stages.",
      categories: ["Dramatic Monologue", "Comedy Monologue"],
    },
    rules: [
      "Free to enter, all three stages.",
      "Choose Dramatic Monologue or Comedy Monologue. Your category stays fixed for all three stages.",
      "Every entrant performs the same official script. The community votes on interpretation, not material.",
      "The top 25 most voted performances from Stage 1 advance to the Semi Finals. The top 5 from the Semi Finals advance to the Final. All decided by community vote, with no judges. Ties at a cutoff all advance.",
      "One vote per stage per category. You can't vote for your own entry, and voting needs a free account.",
      "Every valid entry earns a permanent Official Selection badge. Shortlist goes to all 25 Semi Finalists, Finalist to the Final Five, and Breakthrough Actor of the Year to first place only.",
      "You must follow @umdb_ on Instagram before submissions close.",
      "Under Canadian contest law, all winners must correctly answer a skill-testing question (mathematical) before a prize can be claimed. The question is presented at the time of claim, and failing to answer correctly disqualifies the winner from prize collection.",
    ],
    hashtag: "breakthroughactor",
    cta: "Get notified for the next one",
    votedNote: "There are no judges. The community votes.",
    winners: [
      {
        place: "1st place",
        name: "Eric Hanson",
        prize: "Grand prize $1,000",
        blurb: "This year's Breakthrough Actor. Eric's performance stood above the rest: talent, creativity and dedication.",
        image: { src: "/competitions/breakthrough/eric-hanson.jpg", alt: "Portrait of Eric Hanson" },
      },
      {
        place: "2nd place",
        name: "Ofure Aidelomo",
        prize: "$500",
        blurb: "A standout among this year's finalists. An outstanding performance that marks real talent and a bright future ahead.",
        image: { src: "/competitions/breakthrough/ofure-aidelomo.jpg", alt: "Portrait of Ofure Aidelomo" },
      },
      {
        place: "3rd place",
        name: "Mi-Cha-El West Jr.",
        prize: "$300",
        location: "Los Angeles",
        blurb: "Born in New Haven, now in Los Angeles. A dynamic entertainer in fashion and acting, bringing confidence, authenticity and presence.",
        image: { src: "/competitions/breakthrough/mi-cha-el-west.jpg", alt: "Portrait of Mi-Cha-El West Jr." },
      },
    ],
    scripts: [
      {
        category: "Dramatic Monologue",
        title: "Still Here",
        note: "Director's note: do not play this as tragedy. The power is in the stillness. The final two words should land like a decision, not a confession. 60 to 90 seconds. The actor stands alone with no props and speaks directly to the audience.",
        lines: [
          "I used to think growing up meant having answers.",
          "(pause)",
          "But I'm standing here and I still don't know what I'm doing half the time.",
          "(beat)",
          "I just, I keep going.",
          "Because stopping feels worse than not knowing.",
          "(something remembered)",
          "Someone told me once that courage isn't the absence of fear.",
          "It's being terrified and doing it anyway.",
          "(quietly)",
          "I think about that a lot.",
          "(directly to audience)",
          "I think about that on the days when everything feels like too much,",
          "(long pause)",
          "and I'm still here.",
          "(final beat)",
          "Still here.",
        ],
      },
      {
        category: "Comedy Monologue",
        title: "The Plan",
        note: "Director's note: play the specificity, not the joke. The actor is relaxed and self-aware and speaks to the audience as if confiding in a friend. The final line goes directly to camera; hold the audience's eye and do not look away first. 60 to 90 seconds.",
        lines: [
          "So I had a plan.",
          "(beat)",
          "A very good plan.",
          "A detailed, colour-coded, three-year plan.",
          "(pause, then dry)",
          "And then life looked at my plan, smiled politely, and said absolutely not.",
          "(shrug)",
          "I've made peace with it.",
          "Mostly.",
          "(small confession)",
          "There's still one spreadsheet I haven't been able to delete yet but, we're working on it.",
          "(leaning in)",
          "The thing is, nobody's plan actually works.",
          "We're all just pretending we know what we're doing and hoping nobody notices.",
          "(direct hold eye contact)",
          "You noticed, didn't you.",
        ],
      },
    ],
    faq: [
      { q: "Is it free to enter?", a: "Yes. Completely free, all three stages." },
      {
        q: "How do I enter?",
        a: "Complete your profile with a headshot, bio, demo reel and at least one credit. Then open the Breakthrough Actor Showcase, select your category, access the official script, film your performance and upload your video directly through the creative hub.",
      },
      { q: "Do I write my own monologue?", a: "No. The official script is provided for each stage and every entrant performs the same one. The community votes on interpretation, not material." },
      { q: "How does advancement work?", a: "The top 25 most voted performances from Stage 1 advance to the Semi Finals. The top 5 most voted from the Semi Finals advance to the Final. All decided by community vote. No judges." },
      { q: "What happens if there is a tie?", a: "All tied performers at the cutoff position advance to the next stage." },
      { q: "When did each stage open?", a: "Stage 1 opened May 19 at 8pm EST, Stage 2 on June 5 at 12pm EST, and Stage 3 on June 20 at 12pm EST." },
      { q: "How did voting work?", a: "You needed a free account to vote. One vote per stage per category, one for Dramatic and one for Comedy. You could not vote for your own entry." },
      {
        q: "What badges can I earn?",
        a: "Official Selection for every valid entrant, Shortlist for all 25 Semi Finalists, Finalist for the Final Five, and Breakthrough Actor of the Year for first place only. All badges are permanent on your profile.",
      },
      { q: "Do I need an Instagram account to enter?", a: "You needed to follow @umdb_ on Instagram before submissions closed. It was required for eligibility and for being featured and reposted." },
      { q: "When were winners announced?", a: "July 5, 2026, on the creative hub and on @umdb_." },
      { q: "How are prizes paid?", a: "Prize details are confirmed with winners directly after the announcement, using the contact information on their profile." },
      { q: "Can I enter if I am not in Canada?", a: "Yes. The competition is open to all actors aged 16 and over, wherever you are." },
      { q: "Who do I contact with a question?", a: "Email competitions@umdb.org and the team will get back to you within 24 hours." },
    ],
  },
];

export const competitionSlugs = competitions.map((c) => c.slug);
export const getCompetition = (slug: string) => competitions.find((c) => c.slug === slug) ?? null;

// Copy for the homepage section.
export const competitionsSection = {
  moreTitle: "More competitions",
  viewAll: "View all competitions",
  hiring: {
    title: "Hiring for your next production?",
    body: "Posting a role is free. Creatives apply directly.",
    cta: "Post a job for free",
    href: authLinks.signIn,
  },
};
