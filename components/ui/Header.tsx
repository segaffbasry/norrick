"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";

// Nav is grouped by audience and separated by hairline dividers (The Hub-style):
// [talent] | [productions] | [company] | [account]. Each group is its own labelled list so
// it is clear, visually and for screen readers, who each link is for.
// `match` is the pathname for which the link shows as active; with `prefix` it
// also matches everything beneath it (e.g. every /jobs/[id] page).
// Below the lg breakpoint the groups move into a full-height menu panel.
interface NavLink {
  label: string;
  href: string;
  match?: string;
  prefix?: boolean;
}

const talentLinks: NavLink[] = [
  { label: "Find jobs", href: "/jobs", match: "/jobs", prefix: true },
  { label: "Browse talent", href: "/talent", match: "/talent" },
];

const productionLinks: NavLink[] = [
  { label: "Pricing", href: "/pricing", match: "/pricing" },
  { label: "Partnerships", href: "/partnerships", match: "/partnerships" },
];

const companyLinks: NavLink[] = [{ label: "About", href: "/about", match: "/about" }];

const groups = [
  { label: "For talent", links: talentLinks },
  { label: "For productions", links: productionLinks },
  { label: "Company", links: companyLinks },
];

const isActive = (l: NavLink, pathname: string) =>
  l.match ? (l.prefix ? pathname.startsWith(l.match) : pathname === l.match) : false;

const linkClass =
  "relative flex h-full items-center px-3 text-body font-medium transition-colors focus-visible:outline-offset-[-2px] " +
  // 2px bar along the bottom edge of the header for the active item.
  "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent";

function NavGroup({ label, links, pathname }: { label: string; links: NavLink[]; pathname: string }) {
  return (
    <ul aria-label={label} className="flex h-full items-center">
      {links.map((l) => {
        const active = isActive(l, pathname);
        return (
          <li key={l.label} className="h-full">
            <Link
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`${linkClass} ${active ? "text-primary after:!bg-primary" : "text-copy hover:text-muted"}`}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Divider() {
  return <span aria-hidden className="mx-3 h-8 w-px shrink-0 bg-border" />;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Mobile menu: lock page scroll while open, close on Escape, and close if the
  // window grows past the breakpoint where the desktop nav takes over.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      html.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-background pt-3">
      <div className="shell">
        <div className="flex h-[68px] items-center gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Norrick, home"
            className="flex shrink-0 items-center text-primary"
          >
            <Wordmark className="h-[22px] w-auto" />
          </Link>

          <nav aria-label="Primary" className="ml-auto flex h-full items-center">
            <div className="hidden h-full items-center lg:flex">
              <NavGroup label="For talent" links={talentLinks} pathname={pathname} />
              <Divider />
              <NavGroup label="For productions" links={productionLinks} pathname={pathname} />
              <NavGroup label="Company" links={companyLinks} pathname={pathname} />
              <Divider />
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden px-3 text-body font-medium text-copy transition-colors hover:text-muted sm:block"
              >
                Log in
              </Link>
              <Button href="/signup">Sign up</Button>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="grid size-12 place-items-center rounded-pill border border-border text-foreground transition-colors hover:bg-surface lg:hidden"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu panel: fills the screen below the header */}
      <div
        id="mobile-menu"
        hidden={!open}
        data-lenis-prevent
        className="absolute inset-x-0 top-full h-[calc(100svh-5rem)] overflow-y-auto overscroll-contain border-t border-border bg-background lg:hidden"
      >
        <div className="shell flex min-h-full flex-col py-6">
          {groups.map((group) => (
            <div key={group.label} className="border-b border-border py-5 first:pt-0">
              <p className="eyebrow">{group.label}</p>
              <ul aria-label={group.label} className="mt-2">
                {group.links.map((l) => {
                  const active = isActive(l, pathname);
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`block py-2.5 font-display text-[1.75rem] leading-tight tracking-[-0.02em] transition-colors ${
                          active ? "text-primary" : "text-foreground hover:text-muted"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button href="/login" variant="outline" onClick={() => setOpen(false)}>
              Log in
            </Button>
            <Button href="/signup" onClick={() => setOpen(false)}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
