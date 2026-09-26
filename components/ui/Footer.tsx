import Link from "next/link";
import { partners } from "@/lib/data";
import { Wordmark } from "@/components/ui/Logo";

// Placeholder link groups. Replace hrefs as real pages exist.
const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "For talent",
    links: [
      { label: "Explore talent", href: "/talent" },
      { label: "Explore job posts", href: "/jobs" },
      { label: "Showcase your reel", href: "/#work" },
      { label: "Competitions", href: "/competitions" },
      { label: "Community", href: "/#work" },
    ],
  },
  {
    title: "For productions",
    links: [
      { label: "Overview", href: "/#process" },
      { label: "Post a job", href: "/login" },
      { label: "Find crew", href: "/talent" },
      { label: "Promotional content", href: "/partnerships" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/partnerships#request" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
];

// Dark footer: logo + tagline on the left, uppercase-headed link columns on
// the right, legal row underneath (The Hub-style footer).
export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-ink-foreground">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
          <div>
            <Link href="/" aria-label="Norrick, home" className="inline-flex text-white">
              <Wordmark className="h-8 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs text-lead text-ink-foreground/90">
              Placeholder: we connect filmmakers, actors, animators, and crew to
              make the work.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow !text-primary-light">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-body text-ink-foreground transition-colors hover:text-primary-light">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Partners: own strip so every logo keeps its proportions, equal height, one line. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-ink-foreground/15 pt-8 sm:flex-row sm:items-center sm:gap-10">
          <h2 className="eyebrow shrink-0 !text-primary-light">Main partners</h2>
          <ul className="flex flex-nowrap items-center gap-x-5 overflow-x-auto sm:gap-x-9 [scrollbar-width:none]">
            {partners.map((partner) => (
              <li key={partner.name} className="shrink-0">
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${partner.name} (opens in a new tab)`}
                  className="inline-flex h-3 items-center font-display text-small font-medium text-ink-foreground opacity-70 transition-opacity hover:opacity-100 sm:h-4"
                >
                  {partner.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={partner.logo} alt={partner.name} className="h-full w-auto max-w-none brightness-0 invert" />
                  ) : (
                    partner.name
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-body text-ink-foreground/70">
          <span>&copy; 2026 Norrick</span>
          <Link href="/terms" className="hover:text-ink-foreground">Terms</Link>
          <Link href="/privacy" className="hover:text-ink-foreground">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
