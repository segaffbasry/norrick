// Placeholder B2B / partnerships content.

export const partnerHero = {
  eyebrow: "Partner program",
  title: "Build a professional production pipeline",
  body: "Placeholder: connect your production with proven talent and turn the work itself into promotional content that reaches the right audience.",
  cta: "Request partnership",
};

export const trustedBy = {
  label: "Trusted by 1K+ creatives and 50+ production teams like",
  names: [
    "Studio One", "Placeholder Pictures", "Northlight Films", "Kite Animation",
    "Third Act", "Loop Sound", "Field Recording Co", "Harbor Lane",
    "Brightside Media", "Ninth Frame", "Open Reel", "Paper Moon",
  ],
};

export const intro = {
  title: "Connecting productions with the talent of the future",
  body: "Placeholder: hands-off talent matching and professional promotional content at scale, trusted by ambitious productions.",
};

export const story = {
  eyebrow: "Success story",
  title: "How Placeholder Pictures built a talent pipeline with Norrick",
  quote: "Placeholder quote: Norrick lets us run like a much larger team without adding headcount.",
  name: "Name Surname",
  role: "Head of Production, Placeholder Pictures",
  stats: [
    { value: "1.9K+", label: "verified crew members" },
    { value: "7.7K+", label: "paid projects" },
    { value: "$25M+", label: "in production opportunities" },
  ],
};

export interface Feature {
  title: string;
  body: string;
  points: string[];
  badges: string[];
}

export const features: Feature[] = [
  {
    title: "Turn productions into a content engine",
    body: "Placeholder: generate a steady flow of new projects and behind-the-scenes content from every production you run.",
    points: [
      "Hands-off setup: Norrick manages briefs, marketing and shortlisting",
      "Amplified to the right audience for predictable, high-quality content",
      "Clear reporting to track performance and return",
    ],
    badges: ["Verified crew", "Verified cast", "Verified animator"],
  },
  {
    title: "Discover and showcase your best collaborators",
    body: "Placeholder: surface the most talented people you work with and what they are making.",
    points: [
      "Identify top collaborators as verified talent with a dedicated badge",
      "Track the projects they build and the credits they earn",
      "Give your team direct access to trusted talent for hands-on support",
    ],
    badges: ["Recommended 12x", "Top rated", "Verified"],
  },
  {
    title: "Flood social with professional-grade content",
    body: "Placeholder: proof-driven content that positions your production as the one everyone wants to work on.",
    points: [
      "Hundreds of participants and submissions per campaign",
      "Millions of impressions across Instagram, YouTube and LinkedIn",
      "Custom co-branded marketing assets and ad campaigns",
    ],
    badges: ["Co-branded", "Campaign live"],
  },
];

export const reach = [
  { value: "600+", label: "participants per campaign" },
  { value: "300+", label: "submissions on average" },
  { value: "1M+", label: "social impressions" },
];

export const partnerQuotes = [
  { id: "pq1", quote: "Placeholder quote: Norrick gets us in front of the right creatives. It has been instrumental in growing our awareness.", name: "Name Surname", role: "Founder, Placeholder Studio", stats: [{ value: "1.8M", label: "monthly impressions" }, { value: "15%", label: "click through rate" }] },
  { id: "pq2", quote: "Placeholder quote: we partnered to find top talent, and quickly became customers too, hiring 40 people in two weeks.", name: "Name Surname", role: "Chief of Staff, Placeholder Films", stats: [{ value: "40", label: "hires in 2 weeks" }, { value: "4.9", label: "average rating" }] },
];

export const partnerFaq = [
  { q: "What is Norrick's partner network?", a: "Placeholder answer. Describe the program and what partners receive." },
  { q: "What is the value of the partner network?", a: "Placeholder answer. Reach, verified talent and professional content." },
  { q: "What does Norrick handle?", a: "Placeholder answer. Setup, marketing assets, ad campaigns, shortlisting and reporting." },
  { q: "How do I partner with Norrick?", a: "Placeholder answer. Submit your interest and the team will be in touch." },
  { q: "Who decides which talent joins my network?", a: "Placeholder answer. The selection is entirely your decision." },
];
