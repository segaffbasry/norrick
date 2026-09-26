// Real pricing, taken from umdb.org/premium (plans, prices, feature table).
// Not on the page (behind sign-in) and therefore assumptions to confirm:
//  - button labels on the plan cards
//  - FAQ answers (written only from the visible pricing)
//  - yearly prices: the page says "Save ~17%"; that equals 2 months free, so
//    yearly = 10 x monthly ($69.90 and $290).

export interface Plan {
  id: "free" | "creator" | "room" | "studio";
  eyebrow: string;
  name: string;
  /** Monthly price in dollars. null = custom ("Let's talk"). */
  monthly: number | null;
  /** Yearly billing: total per year and the per-month equivalent. */
  yearly?: { total: number; perMonth: number };
  /** Shown instead of a price when monthly is null. */
  priceLabel?: string;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
}

export const pricingHero = {
  title: ["Hiring is free.", "You pay to run your team."],
  body: "One simple idea: discover and hire for free. Pay when you're running a production with your crew.",
  yearlySaving: "Save ~17%",
};

export const plans: Plan[] = [
  {
    id: "free",
    eyebrow: "Your first project",
    name: "Free Production Room",
    monthly: 0,
    blurb: "Everything to run one project.",
    features: [
      "1 production room",
      "Up to 3 seats",
      "Assets: script, storyboard, mood board",
      "Tasks, milestones & team chat",
    ],
    cta: { label: "Get started free", href: "/signup" },
  },
  {
    id: "creator",
    eyebrow: "Getting discovered",
    name: "Creator Pro",
    monthly: 6.99,
    yearly: { total: 69.9, perMonth: 5.83 },
    blurb: "Priority placement, verified badge & enhanced insights",
    features: [
      "2 production rooms",
      "Up to 7 total seats per room",
      "Priority profile placement",
      "Verified profile badge",
      "Enhanced AI insights",
      "Profile boost in spotlights",
    ],
    cta: { label: "Upgrade to Creator Pro", href: "/signup" },
  },
  {
    id: "room",
    eyebrow: "Working crews",
    name: "Production Room",
    monthly: 29,
    yearly: { total: 290, perMonth: 24.17 },
    blurb: "For crews managing multiple productions",
    features: [
      "Everything in Free Production Room",
      "Up to 15 seats (every seat gets Creator Pro included)",
      "10 production rooms",
      "More asset storage",
      "Advanced tasks & milestones",
      "Exportable call sheets",
    ],
    cta: { label: "Start a Production Room", href: "/signup" },
    highlight: true,
  },
  {
    id: "studio",
    eyebrow: "Studios & collectives",
    name: "Production Studio",
    monthly: null,
    priceLabel: "Let's talk",
    blurb: "When you run many productions",
    features: [
      "Everything in Production Room",
      "Unlimited production rooms",
      "30+ seats",
      "Multiple concurrent productions",
      "Priority support",
    ],
    cta: { label: "Talk to us", href: "/partnerships" },
  },
];

export const summaryCards = [
  {
    title: "Just getting discovered",
    lead: [
      { bold: "Free", rest: " to join & apply" },
      { bold: "$6.99/mo", rest: " Creator Pro" },
    ],
    body: "Free profile + unlimited applications. Creator Pro adds 2 production rooms with up to 7 total seats per room, priority profile placement, a verified badge, and enhanced AI insights.",
    cta: { label: "Upgrade to Creator Pro", href: "/signup", main: true },
  },
  {
    title: "Hiring talent",
    lead: [
      { bold: "Free", rest: " to post & hire" },
      { bold: "Concierge", rest: " on request" },
    ],
    body: "Post roles, search talent and message creatives free. Want it done for you? Our team builds your shortlist for a service fee.",
    cta: { label: "For Studios", href: "/partnerships", main: false },
  },
];

// Compare features. Columns follow `plans` order. true = included, false = locked.
type Cell = boolean | string;
export const compareColumns = ["Free Production Room", "Creator Pro", "Production Room", "Production Studio"];
export const compareGroups: { title: string; rows: { label: string; values: [Cell, Cell, Cell, Cell] }[] }[] = [
  {
    title: "Competitions",
    rows: [
      { label: "Enter community competitions", values: [true, true, true, true] },
      { label: "Submission analytics", values: [false, true, true, true] },
    ],
  },
  {
    title: "Messaging",
    rows: [
      { label: "Direct messages", values: ["10/wk", "Unlimited", true, true] },
      { label: "Priority inbox routing", values: [false, false, true, true] },
      { label: "Group threads", values: [false, true, true, true] },
    ],
  },
  {
    title: "Production rooms",
    rows: [
      { label: "Production rooms limit", values: ["1 Room", "2 Rooms", "10 Rooms", "Unlimited"] },
      { label: "Seat limit", values: ["3 seats", "7 seats", "15 seats", "30+ seats"] },
      { label: "Exportable call sheets", values: [false, false, true, true] },
      { label: "Priority support", values: [false, false, false, true] },
    ],
  },
];

export const proQuotes = [
  { id: "q1", quote: "Placeholder quote: the first place we go to reach the film and animation community.", name: "Name Surname", role: "Head of Production @ Placeholder Pictures" },
  { id: "q2", quote: "Placeholder quote: we can post any role and know we will get relevant applicants.", name: "Name Surname", role: "Casting Director @ Placeholder Studio" },
  { id: "q3", quote: "Placeholder quote: Norrick helped our crew hiring tremendously.", name: "Name Surname", role: "Founder @ Placeholder Films" },
];

// Answers are written from the visible pricing only. Confirm wording.
export const pricingFaq = [
  {
    q: "Is hiring really free?",
    a: "Yes. Posting roles, searching talent and messaging creatives is free. You only pay when you run a production with your crew, or if you ask our team to build a shortlist for you.",
  },
  {
    q: "When does a team start paying?",
    a: "The Free Production Room covers one project with up to 3 seats. When you need more rooms, more seats or advanced tools, a Production Room ($29/mo) gives you 10 rooms and 15 seats. Studios running many productions can talk to us.",
  },
  {
    q: "Creator Pro vs a Team: which do I need?",
    a: "Creator Pro ($6.99/mo) is for individuals who want to get discovered: priority placement, a verified badge and enhanced insights, plus 2 production rooms. A Production Room ($29/mo) is for crews managing multiple productions, and every seat on it gets Creator Pro included.",
  },
  {
    q: "How does Norrick make money?",
    a: "Discovering and hiring stay free. We earn from paid plans (Creator Pro, Production Room and Production Studio) and from the concierge shortlist service, which is charged as a service fee.",
  },
];
