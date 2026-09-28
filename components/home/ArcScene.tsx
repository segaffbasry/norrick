"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { arc } from "@/lib/home";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

// The hand-drawn line, in a 1000 × 100 design box. It is redrawn at the band's
// real pixel size so the stroke stays even and the dash maths stays exact.
const LINE = "M0 50C60 22 110 78 175 55S290 18 350 44S455 86 520 58S640 14 700 40S820 84 880 56S960 30 1000 46";
const lineAt = (width: number, height: number) => {
  let i = 0;
  return LINE.replace(/-?\d+(\.\d+)?/g, (n) => ((i++ % 2 ? (+n * height) / 100 : (+n * width) / 1000)).toFixed(1));
};

// From idea to finished. On large screens the stage holds (sticky) while the
// four chapters travel sideways past you. Above them a hand-drawn line draws
// itself left to right, a pen tip riding its end, and doubles as the progress
// bar. Each photo drifts inside its frame and its words rise as it arrives.
// Phones get a simple stack.
export function ArcScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const track = q("[data-arc-track]")[0] as HTMLElement;
      const distance = () => track.scrollWidth - window.innerWidth;
      // Tall enough for the sideways distance plus one screen; the inner stage
      // is position: sticky (CSS), so nothing needs position: fixed.
      const setHeight = () => (el.style.height = `${distance() + window.innerHeight}px`);
      setHeight();
      ScrollTrigger.addEventListener("refreshInit", setHeight);
      const span = { trigger: el, start: "top top", end: "bottom bottom", invalidateOnRefresh: true };

      const move = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { ...span, scrub: 0.8 } });

      // The line spans the whole track while the track slides left, so its
      // drawing edge sweeps across the screen from left to right.
      const band = el.querySelector<SVGSVGElement>("[data-arc-band]")!;
      const paths = Array.from(band.querySelectorAll("path"));
      const path = el.querySelector<SVGPathElement>("[data-arc-line]")!;
      const tip = q("[data-arc-tip]")[0] as HTMLElement;
      const drawn = { progress: 0 };
      let length = 0;
      const render = () => {
        const point = path.getPointAtLength(length * drawn.progress);
        path.style.strokeDashoffset = `${length * (1 - drawn.progress)}`;
        gsap.set(tip, { x: point.x, y: point.y });
      };
      const layout = () => {
        const width = band.clientWidth;
        const height = band.clientHeight;
        band.setAttribute("viewBox", `0 0 ${width} ${height}`);
        paths.forEach((p) => p.setAttribute("d", lineAt(width, height)));
        length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        render();
      };
      layout();
      ScrollTrigger.addEventListener("refresh", layout);
      gsap.to(drawn, { progress: 1, ease: "none", scrollTrigger: { ...span, scrub: 0.8 }, onUpdate: render });

      q("[data-chapter]").forEach((chapter) => {
        const photo = chapter.querySelector("[data-chapter-photo]");
        const text = chapter.querySelector("[data-chapter-text]");
        if (photo) {
          gsap.fromTo(photo, { xPercent: -7, scale: 1.22 }, {
            xPercent: 7, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: chapter, containerAnimation: move, start: "left right", end: "right left", scrub: true },
          });
        }
        gsap.timeline({ scrollTrigger: { trigger: chapter, containerAnimation: move, start: "left 75%", toggleActions: "play none none reverse" } })
          .from(chapter, { clipPath: "inset(12% 0% 12% 0% round 28px)", duration: 1.1, ease: "expo.out" })
          .from(text?.children ?? [], { yPercent: 70, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.1);
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setHeight);
        ScrollTrigger.removeEventListener("refresh", layout);
        el.style.height = "";
      };
    });

    mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.selector(el)("[data-chapter]").forEach((chapter) => {
        gsap.from(chapter, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 88%" } });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={s.arc} aria-labelledby="arc-title">
      <div className={s.arcPin}>
        <div className={s.arcHead}>
          <h2 id="arc-title" className={s.sectionTitle}>From idea to finished work</h2>
        </div>
        <div data-arc-track className={s.arcTrack}>
          <div className={s.arcBand} aria-hidden>
            <svg data-arc-band fill="none">
              <path className={s.arcGuide} d={LINE} />
              <path data-arc-line d={LINE} />
            </svg>
            <i data-arc-tip className={s.arcTip} />
          </div>
          <ol className={s.arcList}>
            {arc.map((chapter) => (
              <li key={chapter.title} data-chapter className={s.chapter}>
                <div data-chapter-photo className={s.chapterPhoto}>
                  <Image src={chapter.photo} alt={chapter.alt} fill sizes="(max-width: 899px) 90vw, 46vw" />
                </div>
                <div data-chapter-text className={s.chapterText}>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
