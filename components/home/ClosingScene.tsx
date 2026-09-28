"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { closingFilm } from "@/lib/home";
import { Film } from "@/components/home/Film";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

// Final scene. The film plays only inside the giant letters of "Let's make
// something". Scrolling flies the camera into the letters until the film fills
// the screen, and the invitation fades up over it.
export function ClosingScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.9 },
      });
      tl.fromTo(q("[data-knockout] p"), { scale: 0.9 }, { scale: 1, duration: 0.15 }, 0)
        .to(q("[data-knockout]"), { scale: 34, duration: 0.6, ease: "power3.in" }, 0.15)
        .to(q("[data-knockout]"), { opacity: 0, duration: 0.12 }, 0.62)
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
        <p className={s.wide}>
          Let’s make
          <br />
          something
        </p>
      </div>
      <div data-closing-content className={s.closingContent}>
        <p className={s.label}>Your idea deserves a beginning</p>
        <h2 id="closing-title" className={s.wide}>
          Start your <em>chapter.</em>
        </h2>
        <p>Bring your curiosity. Bring your craft. Bring yourself.</p>
        <div className={s.closingActions}>
          <Link href="/signup" className={s.pill}>
            Join Norrick <span aria-hidden>↗</span>
          </Link>
          <Link href="/collaborate" className={`${s.pill} ${s.pillLight}`}>
            Find your people <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
