// Monthly prices from the existing site. No inferred annual prices or usage counts.
import { authLinks } from "@/lib/auth-links";
export interface Plan {
  id: "free" | "creator" | "room" | "studio";
  name: string;
  monthly: number | null;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
}
export const pricingHero = { title: "Make room for your work", body: "Discover and hire for free. Choose the tools that support your production." };
export const plans: Plan[] = [
  { id: "free", name: "Free", monthly: 0, blurb: "Start your project together.", features: ["Production room", "Script, storyboard and mood board", "Tasks, milestones and team chat"], cta: { label: "Get started", href: authLinks.signUp } },
  { id: "creator", name: "Creator Pro", monthly: 6.99, blurb: "Help your work get discovered.", features: ["Production rooms", "Priority profile placement", "Verified profile badge", "Profile spotlights"], cta: { label: "Choose Creator Pro", href: authLinks.signUp } },
  { id: "room", name: "Production Room", monthly: 29, blurb: "Keep your crew and work together.", features: ["Creator Pro for your crew", "Asset storage", "Advanced tasks and milestones", "Exportable call sheets"], cta: { label: "Choose a room", href: authLinks.signUp } },
  { id: "studio", name: "Production Studio", monthly: null, blurb: "Support for studios and collectives.", features: ["Concurrent productions", "Production rooms", "Priority support"], cta: { label: "Talk to us", href: "/partnerships" } },
];
export const summaryCards = [
  { title: "Getting discovered", lead: [{ bold: "Free", rest: " to join and apply" }], body: "Build your profile and find collaborators. Creator Pro adds profile placement, a verified badge and production tools.", cta: { label: "Join Norrick", href: authLinks.signUp, main: true } },
  { title: "Hiring talent", lead: [{ bold: "Free", rest: " to post and hire" }], body: "Post roles, search talent and message creatives. Our team can also help you build a shortlist.", cta: { label: "For productions", href: "/partnerships", main: false } },
];
type Cell = boolean | string;
export const compareColumns = ["Free", "Creator Pro", "Production Room", "Production Studio"];
export const compareGroups: { title: string; rows: { label: string; values: [Cell, Cell, Cell, Cell] }[] }[] = [
  { title: "Work together", rows: [
    { label: "Production rooms", values: [true, true, true, true] },
    { label: "Exportable call sheets", values: [false, false, true, true] },
    { label: "Priority support", values: [false, false, false, true] },
  ] },
];
export const pricingFaq = [
  { q: "Is hiring free?", a: "Posting roles, searching talent and messaging creatives is free. Paid plans support running productions with your crew." },
  { q: "Which plan suits my work?", a: "Start with a free production room. Creator Pro supports your profile; Production Room supports a working crew. Studios can talk to us about their needs." },
  { q: "How does Norrick make money?", a: "Norrick earns from paid production plans and the optional concierge shortlist service." },
];
