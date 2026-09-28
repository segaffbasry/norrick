import Link from "next/link";
import { partners } from "@/lib/data";
import { Wordmark } from "@/components/ui/Logo";

const columns = [
  { title: "Find your people", links: [{ label: "Collaborate", href: "/collaborate" }, { label: "Browse talent", href: "/talent" }, { label: "Opportunities", href: "/jobs" }, { label: "Creative challenges", href: "/competitions" }] },
  { title: "Get to know us", links: [{ label: "Our story", href: "/about" }, { label: "Partnerships", href: "/partnerships" }, { label: "Pricing", href: "/pricing" }, { label: "Join Norrick", href: "/signup" }] },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1800px] px-6 pb-8 pt-16 lg:px-[5.5vw] lg:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div><p className="max-w-sm font-display text-3xl leading-tight tracking-tight">A home for the ones<br />who create.</p><p className="mt-5 max-w-xs text-sm text-primary-light">Find your people. Make the work.<br />See where it takes you.</p></div>
          {columns.map((column) => <nav key={column.title} aria-label={column.title}><h2 className="text-[10px] uppercase tracking-[.14em] text-primary-light">{column.title}</h2><ul className="mt-5 space-y-3">{column.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm hover:text-primary-light">{link.label}</Link></li>)}</ul></nav>)}
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-7 border-t border-white/15 pt-7">
          <p className="text-[10px] uppercase tracking-widest text-primary-light">In good company</p>
          {partners.map((partner) => <a key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={`${partner.name} (opens in a new tab)`} className="opacity-65 transition-opacity hover:opacity-100">{partner.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={partner.logo} alt={partner.name} className="h-3 w-auto brightness-0 invert sm:h-4" />
          ) : partner.name}</a>)}
        </div>
        <Link href="/" aria-label="Norrick, home" className="mt-16 block text-primary-light"><Wordmark className="h-auto w-full" /></Link>
        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-[11px] text-primary-light"><span>© {new Date().getFullYear()} Norrick. Make your own story.</span><div className="flex gap-6"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div></div>
      </div>
    </footer>
  );
}
