"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { arc } from "@/lib/home";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

// Line-art marks for each chapter, drawn on a 24-unit grid.
const marks: Record<string, React.ReactNode> = {
  Idea: (
    <>
      <circle pathLength="1" cx="12" cy="12" r="3.5" />
      <path pathLength="1" d="M12 2.5v3.5M12 18v3.5M2.5 12H6M18 12h3.5M5.3 5.3l2.5 2.5M16.2 16.2l2.5 2.5M5.3 18.7l2.5-2.5M16.2 7.8l2.5-2.5" />
    </>
  ),
  People: (
    <>
      <circle pathLength="1" cx="8.5" cy="8.5" r="3" />
      <circle pathLength="1" cx="15.5" cy="8.5" r="3" />
      <path pathLength="1" d="M2.5 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M9.5 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
    </>
  ),
  Make: (
    <>
      <rect pathLength="1" x="3" y="9" width="18" height="11" rx="1.5" />
      <path pathLength="1" d="M3 9 4.5 4h15L21 9M8.5 4 7 9M13.5 4 12 9M18.5 4 17 9" />
    </>
  ),
  Finished: (
    <>
      <rect pathLength="1" x="2.5" y="4" width="19" height="13" rx="2" />
      <path pathLength="1" d="M10 8v5l4.5-2.5zM8 20.5h8M12 17v3.5" />
    </>
  ),
};

// A hand-drawn wire through the given points: gentle S-curves that alternate
// sides, so it reads as drawn by hand rather than ruled.
function wire(points: { x: number; y: number }[], vertical: boolean, swing: number) {
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const side = i % 2 ? 1 : -1;
    const c1 = vertical ? { x: a.x + swing * side, y: a.y + (b.y - a.y) * 0.35 } : { x: a.x + (b.x - a.x) * 0.35, y: a.y - swing * side };
    const c2 = vertical ? { x: b.x - swing * side, y: b.y - (b.y - a.y) * 0.35 } : { x: b.x - (b.x - a.x) * 0.35, y: b.y + swing * side };
    d += `C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

// From idea to finished, as a diagram. A hand-drawn wire runs through four
// chapters; as you scroll it draws itself, a pen tip riding its end, and each
// chapter lights up when the wire reaches it: its mark draws in and its words
// rise. Large screens hold the stage (sticky) and run left to right; phones run
// top to bottom through the section. Reduced motion shows it fully drawn.
export function ArcScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const diagram = el.querySelector<HTMLElement>("[data-diagram]")!;
    const svg = diagram.querySelector("svg")!;
    const paths = Array.from(svg.querySelectorAll("path"));
    const line = diagram.querySelector<SVGPathElement>("[data-wire-line]")!;
    const tip = diagram.querySelector<HTMLElement>("[data-wire-tip]")!;
    const nodes = Array.from(diagram.querySelectorAll<HTMLElement>("[data-node]"));

    const mm = gsap.matchMedia();
    mm.add(
      {
        wide: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        narrow: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        still: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { wide, still } = ctx.conditions ?? {};
        const drawn = { progress: still ? 1 : 0 };
        let length = 0;
        let stops: number[] = [];

        const render = () => {
          const at = length * drawn.progress;
          line.style.strokeDashoffset = `${length - at}`;
          const point = line.getPointAtLength(at);
          gsap.set(tip, { x: point.x, y: point.y, opacity: drawn.progress > 0.002 && drawn.progress < 0.998 ? 1 : 0 });
          nodes.forEach((node, i) => node.toggleAttribute("data-active", at >= stops[i] - 2));
        };

        // Measure the chapter marks and run the wire through their centres,
        // starting from the diagram's edge.
        const layout = () => {
          const box = diagram.getBoundingClientRect();
          const centres = nodes.map((node) => {
            const r = node.querySelector("[data-node-mark]")!.getBoundingClientRect();
            return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
          });
          const vertical = !wide;
          const start = vertical ? { x: centres[0].x, y: 0 } : { x: 0, y: centres[0].y };
          const points = [start, ...centres];
          svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
          const d = wire(points, vertical, vertical ? 18 : 46);
          paths.forEach((p) => p.setAttribute("d", d));
          length = line.getTotalLength();
          line.style.strokeDasharray = `${length} ${length}`;
          // Distance along the wire to each chapter, from the same curve cut short.
          const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
          stops = centres.map((_, i) => {
            probe.setAttribute("d", wire(points.slice(0, i + 2), vertical, vertical ? 18 : 46));
            return probe.getTotalLength();
          });
          render();
        };

        diagram.setAttribute("data-armed", "");
        layout();
        ScrollTrigger.addEventListener("refresh", layout);
        if (!still) {
          gsap.to(drawn, {
            progress: 1,
            ease: "none",
            onUpdate: render,
            scrollTrigger: wide
              ? { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true }
              : { trigger: diagram, start: "top 70%", end: "bottom 65%", scrub: 0.6, invalidateOnRefresh: true },
          });
        }
        return () => {
          ScrollTrigger.removeEventListener("refresh", layout);
          diagram.removeAttribute("data-armed");
          nodes.forEach((node) => node.removeAttribute("data-active"));
        };
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={s.arc} aria-labelledby="arc-title">
      <div className={s.arcPin}>
        <h2 id="arc-title" className={`${s.sectionTitle} ${s.arcHead}`}>From idea to finished work</h2>
        <div data-diagram className={s.diagram}>
          <svg className={s.wire} fill="none" aria-hidden>
            <path className={s.wireGuide} />
            <path data-wire-line className={s.wireLine} />
          </svg>
          <i data-wire-tip className={s.wireTip} aria-hidden />
          <ol className={s.nodes}>
            {arc.map((chapter) => (
              <li key={chapter.title} data-node className={s.node}>
                <span data-node-mark className={s.nodeMark}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>{marks[chapter.title]}</svg>
                </span>
                <div className={s.nodeText}>
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
