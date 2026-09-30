import Link from "next/link";
import { FooterWordmark } from "@/components/ui/FooterWordmark";
import { authLinks } from "@/lib/auth-links";

const columns = [
  { title: "Find your people", links: [{ label: "Collaborate", href: "/collaborate" }, { label: "Browse talent", href: "/talent" }, { label: "Opportunities", href: "/jobs" }, { label: "Creative challenges", href: "/competitions" }] },
  { title: "Get to know us", links: [{ label: "Our story", href: "/about" }, { label: "Partnerships", href: "/partnerships" }, { label: "Pricing", href: "/pricing" }, { label: "Join Norrick", href: authLinks.signUp }] },
];

export function Footer() {
  return (
    <footer data-header="dark" className="overflow-hidden bg-ink text-ink-foreground">
      <div className="shell pb-8 pt-16 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div><p className="font-display text-2xl leading-tight tracking-tight lg:text-3xl">A home for the ones who create.</p><p className="mt-5 max-w-xs text-sm text-white/70">Find your people. Make the work. See where it takes you.</p></div>
          {columns.map((column) => <nav key={column.title} aria-label={column.title}><h2 className="text-[10px] uppercase tracking-[.14em] text-primary-light">{column.title}</h2><ul className="mt-5 space-y-3">{column.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm hover:text-primary-light">{link.label}</Link></li>)}</ul></nav>)}
        </div>
        <FooterWordmark />
        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-[11px] text-white/60"><span>© {new Date().getFullYear()} Norrick. Make your own story.</span><div className="flex gap-6"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div></div>
      </div>
    </footer>
  );
}
