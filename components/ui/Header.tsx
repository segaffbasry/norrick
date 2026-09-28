"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/Logo";
import styles from "./Header.module.css";

const links = [
  { label: "Collaborate", href: "/collaborate" },
  { label: "Our story", href: "/about" },
  { label: "Opportunities", href: "/jobs" },
];

// Pages that open on a dark, full-bleed section: the bar starts transparent over it.
const darkOpeners = ["/", "/about", "/collaborate", "/partnerships"];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // "overlay": transparent over the top of the homepage film.
  // "dark": black while a section marked data-header="dark" sits under the bar.
  const [tone, setTone] = useState<"light" | "dark" | "overlay">(darkOpeners.includes(pathname) ? "overlay" : "light");
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const shown = open ? "light" : tone;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = 40;
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-header="dark"]')).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= line && r.bottom > line;
      });
      // Transparent over a dark opener at the very top; solid once you scroll.
      setTone(dark ? (window.scrollY < 40 ? "overlay" : "dark") : "light");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const outside = [...document.querySelectorAll<HTMLElement>("main, footer")];
    const inertValues = outside.map((element) => element.inert);
    outside.forEach((element) => { element.inert = true; });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key !== "Tab") return;
      const focusable = [...(header.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])].filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (mq.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", resize);
    return () => {
      document.documentElement.style.overflow = previous;
      outside.forEach((element, index) => { element.inert = inertValues[index]; });
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header ref={header} data-tone={shown} className={`${styles.header} ${pathname === "/" ? styles.overHero : ""}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-4 focus:text-foreground">Skip to content</a>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" aria-label="Norrick, home" onClick={() => setOpen(false)} className={styles.logo}><Wordmark className="h-[22px] w-auto" /></Link>
        <div className={styles.navigation}>
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined} className={styles.navLink}>{link.label}</Link>)}
          </nav>
          <span aria-hidden className={styles.divider} />
          <Link href="/login" className={`${styles.navLink} hidden sm:block`}>Log in</Link>
          <Link href="/signup" className={styles.join}>Join Norrick </Link>
          <button ref={toggle} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className={`${styles.menuButton} lg:hidden`}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
          </button>
        </div>
      </div>
      <nav id="mobile-menu" aria-label="Mobile navigation" hidden={!open} data-lenis-prevent className="absolute inset-x-0 top-full h-[calc(100svh-80px)] overflow-auto border-t border-border bg-background px-6 py-10 text-foreground lg:hidden">
        <p className="eyebrow">Your next chapter</p>
        {[...links, { label: "Browse talent", href: "/talent" }, { label: "Join the community", href: "/signup" }, { label: "Log in", href: "/login" }].map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-border py-5 font-display text-[clamp(1.4rem,6vw,2rem)] tracking-tight hover:text-primary">{link.label} </Link>)}
      </nav>
    </header>
  );
}
