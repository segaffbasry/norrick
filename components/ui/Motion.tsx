"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// Soft appear animations, modelled on the Framer "appear" effects on
// contra.com/partners: elements start faint and slightly low, then ease up into
// place. Small pieces travel 28px, larger blocks 56px. Photos inside rounded
// frames also settle from a slight zoom. No blur. Nothing here changes layout, and it is skipped entirely for
// people who prefer reduced motion.
//
// Elements are hidden by CSS (globals.css) only while <html> has `gsap-ready`,
// which the inline script in app/layout.tsx adds before first paint and removes
// again after 4s if this component never started. So content can never stay
// invisible. The selectors below MUST match the ones in globals.css.
// The first screen is animated by CSS instead (see globals.css), so it never waits for JS.
const BLOCKS = [
  "main > section:not(:first-child) > .shell > *",
  "main > section:not(:first-child) > div:not(.shell):not(.absolute)",
  "main > .shell:not(:first-child) > *",
].join(", ");
const STAGGER = "[data-stagger] > *";

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("gsap-ready")) return;
    root.setAttribute("data-motion-init", "");

    const ctx = gsap.context(() => {
      // Below the fold: rise and fade in as it scrolls into view. Items that
      // enter together cascade with a small stagger.
      const reveal = (selector: string, y: number, duration: number, stagger: number) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;
        gsap.set(items, { y });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          interval: 0.1,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration, ease: "power4.out", stagger, overwrite: true, clearProps: "transform" }),
        });
      };
      reveal(BLOCKS, 56, 1.3, 0.12);
      reveal(STAGGER, 28, 1, 0.1);

      // Photos clipped by a rounded frame: settle from a slight zoom as they
      // scroll in. The first screen does this in CSS instead.
      gsap.utils.toArray<HTMLImageElement>("main img").forEach((img) => {
        // The nearest ancestor (up to 3 levels) that clips the photo is its frame.
        let frame: HTMLElement | null = img.parentElement;
        for (let i = 0; i < 3 && frame && getComputedStyle(frame).overflow !== "hidden"; i++) frame = frame.parentElement;
        if (!frame || getComputedStyle(frame).overflow !== "hidden") return;
        if (img.closest("#hero, main > section:first-child")) return;
        gsap.fromTo(
          img,
          { scale: 1.14 },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: frame, start: "top 92%", once: true },
          },
        );
      });
    });

    // Heights shift once fonts and images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
