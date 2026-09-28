"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroFilm } from "@/lib/home";
import { postedAgo } from "@/lib/open-calls-data";
import { Film } from "@/components/home/Film";
import { useOpenCalls } from "@/components/home/useOpenCalls";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

// Vertical slots for the calls on each side of the framed film. Right-hand
// calls sit half a step lower than the left, so the two sides interleave.
function slot(index: number, count: number) {
  const side = index % 2;
  const perSide = Math.ceil(count / 2);
  const row = Math.floor(index / 2);
  const step = 48 / perSide;
  return `${24 + step * (row + 0.3 + side * 0.4)}%`;
}

// Scene one: community film, full screen, one line of type at the bottom.
// On large screens the stage holds (sticky) while you scroll: the headline
// lifts away, the film pulls back into a frame, and the live Open calls from
// Collaborate pop in around it, newest first. Phones and reduced motion get the
// film, then the calls stacked underneath.
export function HeroScene() {
  const root = useRef<HTMLElement>(null);
  const { calls, available, now } = useOpenCalls();
  const count = calls.length;
  // The calls row appears once the feed has answered, so nothing flashes over
  // the headline while the page is still loading.
  const ready = available !== null;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const stage = q("[data-hero-stage]")[0] as HTMLElement;
      const canvas = q("[data-hero-canvas]");
      const inset = 29;
      // The canvas stays stage-sized while the frame around it crops in, so the
      // film is revealed through a window instead of squashed.
      const sizeCanvas = () => gsap.set(canvas, { width: stage.clientWidth, height: stage.clientHeight });
      sizeCanvas();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: sizeCanvas,
        },
      })
        .to(q("[data-hero-title]"), { yPercent: -40, opacity: 0, duration: 0.2 }, 0)
        .to(q("[data-hero-cue]"), { opacity: 0, duration: 0.06 }, 0)
        .fromTo(
          q("[data-hero-frame]"),
          { top: "0%", right: "0%", bottom: "0%", left: "0%", borderRadius: 0 },
          { top: "15%", right: `${inset}%`, bottom: "21%", left: `${inset}%`, borderRadius: 28, ease: "power2.inOut", duration: 0.34 },
          0.06,
        )
        .fromTo(
          canvas,
          { x: 0, y: 0 },
          { x: () => -stage.clientWidth * inset / 100, y: () => -stage.clientHeight * 0.15, ease: "power2.inOut", duration: 0.34 },
          0.06,
        )
        .fromTo(q("[data-hero-video]"), { scale: 1.2 }, { scale: 1, duration: 0.45 }, 0);
      // The calls and the row under them only exist once the feed answers.
      const calls = q("[data-hero-call]");
      const next = q("[data-hero-next]");
      if (calls.length) {
        tl.fromTo(calls, { opacity: 0, y: 70, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.12, stagger: 0.08, ease: "back.out(1.7)" }, 0.32);
      }
      if (next.length) tl.fromTo(next, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.8);
      tl.to({}, { duration: 0.08 }, 0.9);
    });
    return () => mm.revert();
    // Rebuild once the calls arrive, so every bubble joins the timeline.
  }, [count, ready]);

  return (
    <section ref={root} id="hero" data-header="dark" className={s.hero} aria-labelledby="hero-title">
      <div data-hero-stage className={s.heroStage}>
        <div data-hero-frame className={s.heroFrame}>
          <div data-hero-canvas className={s.heroCanvas}>
            <div data-hero-video className={s.heroVideo}>
              <Film clip={heroFilm} eager className={s.heroVideo} />
            </div>
            <div className={s.heroShade} />
            <div data-hero-title className={s.heroTitle}>
              <p className={s.filmCredit}>{heroFilm.credit}</p>
              <h1 id="hero-title" className={s.wide}>
                <span className={s.heroLine}><span>Your chapter starts <em>here.</em></span></span>
              </h1>
            </div>
            <p data-hero-cue className={s.heroCue} aria-hidden>Scroll <i /></p>
          </div>
        </div>

        <h2 id="calls-title" className="sr-only">Open calls on Collaborate</h2>
        {count > 0 && (
          <ul className={s.thread} aria-labelledby="calls-title">
            {calls.map((call, i) => (
              <li
                key={call.id}
                data-hero-call
                style={{ "--top": slot(i, count) } as React.CSSProperties}
                className={`${s.bubble} ${i % 2 ? s.bubbleRight : s.bubbleLeft}`}
              >
                <a href={call.url} className={s.bubbleLink}>
                  <time className={s.bubbleWho} dateTime={call.createdAt}>{postedAgo(call.createdAt, now)}</time>
                  <span className={s.bubbleText}>{call.role} for <strong>{call.project}</strong></span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {ready && <div data-hero-next className={s.heroNext}>
          <div>
            <p>Find your people</p>
            <small>Projects on Norrick looking for collaborators.</small>
          </div>
          <a href="https://umdb.org/collaborate" className={s.pill}>All open calls</a>
        </div>}
      </div>
    </section>
  );
}
