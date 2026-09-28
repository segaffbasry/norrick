"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll effects for the quieter homepage sections, driven by data attributes
// so the sections themselves stay server-rendered:
//   data-lines        each child line rises out of its own mask
//   data-rise         fades up when it enters (children cascade)
//   data-clip         a photo frame opens from the bottom
//   data-parallax=N   drifts N% against the scroll
//   data-rotate="a,b" turns from a to b degrees while it crosses the screen
// Skipped entirely for reduced motion; everything is visible by default.
export function SceneFx() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const main = document.querySelector("main[data-scenes]");
      if (!main) return;
      const all = <T extends Element>(sel: string) => Array.from(main.querySelectorAll<T & HTMLElement>(sel));

      all("[data-lines]").forEach((el) => {
        const lines = Array.from(el.children) as HTMLElement[];
        lines.forEach((line) => {
          const mask = document.createElement("span");
          mask.style.cssText = "display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em";
          line.style.display = "block";
          line.replaceWith(mask);
          mask.appendChild(line);
        });
        gsap.from(lines, {
          yPercent: 115,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      all("[data-rise]").forEach((el) => {
        const targets = el.dataset.rise === "children" ? Array.from(el.children) : el;
        gsap.from(targets, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      all("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });

      all("[data-parallax]").forEach((el) => {
        const n = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -n },
          { yPercent: n, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      all("[data-rotate]").forEach((el) => {
        const [from, to] = (el.dataset.rotate ?? "0,0").split(",").map(Number);
        gsap.fromTo(
          el,
          { rotate: from },
          { rotate: to, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    });
    return () => mm.revert();
  }, []);

  return null;
}
