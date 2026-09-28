"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { closingFilm } from "@/lib/home";
import { Film } from "@/components/home/Film";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

// Final scene. The film plays only inside the giant letters of "Find your
// people." Scrolling flies the camera into the O until the film fills the
// screen, then the invitation settles over it at normal size.
export function ClosingScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const sheet = q("[data-knockout]")[0] as HTMLElement;
      const target = q("[data-zoom]")[0] as HTMLElement;
      // Aim the zoom at the middle of the O, so the camera flies through a
      // letter rather than into the black between words.
      const aim = () => {
        gsap.set(sheet, { scale: 1 });
        const a = sheet.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        gsap.set(sheet, { transformOrigin: `${b.left + b.width / 2 - a.left}px ${b.top + b.height / 2 - a.top}px` });
      };
      aim();
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.9, invalidateOnRefresh: true, onRefreshInit: aim },
      })
        .fromTo(q("[data-knockout] p"), { scale: 0.9 }, { scale: 1, duration: 0.15 }, 0)
        .to(sheet, { scale: 40, duration: 0.6, ease: "power3.in" }, 0.15)
        .to(sheet, { opacity: 0, duration: 0.12 }, 0.62)
        .fromTo(q("[data-closing-content]"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.7)
        .to({}, { duration: 0.1 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} data-header="dark" className={s.closing} aria-labelledby="closing-title">
      <div className={s.closingStage}>
        <Film clip={closingFilm} className={s.closingVideo} />
        <div data-knockout className={s.knockout} aria-hidden>
          <p className={s.wide}>Find y<span data-zoom>o</span>ur people.</p>
        </div>
        <div data-closing-content className={s.closingContent}>
          <p>Have an idea? Invite people to collaborate on it, first project or fiftieth.</p>
          <h2 id="closing-title" className={s.sectionTitle}>Have an idea? Find your people.</h2>
          <Link href="https://umdb.org/collaborate" className={s.pill}>Collaborate</Link>
        </div>
        <p className={s.closingCredit}>{closingFilm.credit}</p>
      </div>
    </section>
  );
}
