"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { crafts } from "@/lib/home";
import { Film } from "@/components/home/Film";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

const words = ["Filmmakers", "Actors", "Animators", "Writers", "Crew"];

function Row({ outline = false }: { outline?: boolean }) {
  // Two identical halves, so sliding by -50% loops seamlessly.
  return (
    <div data-marquee className={`${s.marquee} ${s.wide}`} aria-hidden>
      {[0, 1].map((half) => (
        <span key={half}>
          {words.map((w, i) => (
            <Fragment key={w}>
              {i % 2 === 1 ? <em>{w.toLowerCase()}</em> : <span className={outline ? s.marqueeOutline : undefined}>{w}</span>}
              <span className={s.star}>✳</span>
            </Fragment>
          ))}
        </span>
      ))}
    </div>
  );
}

// Scene four: who it's for. Two rows of the crafts drift in opposite
// directions; scrolling pushes them faster, skews them with the speed and
// flips them with your direction. Below, one film per craft.
export function CraftsScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-marquee]", el);
      const loops = rows.map((row, i) =>
        gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 }),
      );
      const skew = gsap.quickTo(rows, "skewX", { duration: 0.5, ease: "power3" });
      let direction = 1;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          direction = self.direction;
          const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(v) / 350);
          loops.forEach((loop) => {
            gsap.to(loop, { timeScale: direction * boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
          });
          skew(gsap.utils.clamp(-12, 12, v / -220));
        },
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });

      gsap.from(gsap.utils.toArray("[data-craft]", el), {
        y: 90,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el.querySelector("[data-craft-grid]"), start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.crafts} aria-labelledby="crafts-title">
      <Row />
      <Row outline />
      <div className={s.craftIntro}>
        <h2 id="crafts-title" className={s.label}>
          Everyone it takes to make something
        </h2>
        <p>The people behind the camera, in front of it, and at the desk long after everyone else has gone home.</p>
      </div>
      <ul data-craft-grid className={s.craftGrid}>
        {crafts.map((c) => (
          <li key={c.title} data-craft>
            <Link href="/collaborate" className={s.craft}>
              <Film clip={c.clip} />
              {c.credit && <span className={s.craftCredit}>{c.credit}</span>}
              <div className={s.craftText}>
                <h3 className={s.wide}>{c.title}</h3>
                <p>{c.roles}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
