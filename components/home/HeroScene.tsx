"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroFilm, heroThread } from "@/lib/home";
import { Film } from "@/components/home/Film";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

// Where each line of the conversation sits around the shrunken film.
const tops = {
  desktop: ["16%", "26%", "43%", "56%", "70%"],
  // Phones show four lines (the rehearsal line is skipped) under a smaller frame.
  mobile: ["47%", "56%", "65%", "65%", "74%"],
};

// Scene one. "Welcome to Norrick. Your chapter starts here." over community
// film, full screen. As you scroll the stage holds in place (sticky): the headline
// lifts away, the film pulls back into a frame, and a conversation builds up
// around it, from an idea to "we made it". Then it hands over to the page.
export function HeroScene() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const desktop = !!ctx.conditions?.desktop;
        const q = gsap.utils.selector(el);
        const bubbles = q("[data-hero-bubble]");
        const stage = q("[data-hero-stage]")[0] as HTMLElement;
        const canvas = q("[data-hero-canvas]");
        const sideInset = desktop ? 31 : 5;
        // Keep the artwork at stage size while its containing box crops it.
        // Video and shade now share overflow clipping instead of separate
        // compositor layers trying to catch up with an animated clip-path.
        const sizeCanvas = () => gsap.set(canvas, { width: stage.clientWidth, height: stage.clientHeight });
        sizeCanvas();
        bubbles.forEach((b, i) => ((b as HTMLElement).style.setProperty("--top", tops[desktop ? "desktop" : "mobile"][i])));

        // (The entrance on load is pure CSS, see .heroLine in home.module.css,
        // so it starts on first paint instead of waiting for this script.)

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          // The section is tall and its stage is position: sticky (CSS), so
          // nothing is pinned with position: fixed. (Switching a playing
          // <video> to fixed makes Chrome stop painting it.)
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            // Lenis already smooths scrolling; a second scrub delay leaves
            // the frame behind when returning quickly to the top.
            scrub: true,
            invalidateOnRefresh: true,
            onRefreshInit: sizeCanvas,
          },
        });
        tl.to(q("[data-hero-title]"), { yPercent: -35, opacity: 0, duration: 0.22 }, 0)
          .to(q("[data-hero-cue]"), { opacity: 0, duration: 0.08 }, 0)
          .fromTo(
            q("[data-hero-frame]"),
            { top: "0%", right: "0%", bottom: "0%", left: "0%", borderRadius: 0 },
            {
              top: "11%",
              right: `${sideInset}%`,
              bottom: desktop ? "19%" : "57%",
              left: `${sideInset}%`,
              borderRadius: desktop ? 28 : 22,
              ease: "power2.inOut",
              duration: 0.34,
            },
            0.06,
          )
          .fromTo(
            canvas,
            { x: 0, y: 0 },
            {
              x: () => -stage.clientWidth * sideInset / 100,
              y: () => -stage.clientHeight * 0.11,
              ease: "power2.inOut",
              duration: 0.34,
            },
            0.06,
          )
          .fromTo(q("[data-hero-video]"), { scale: 1.18 }, { scale: 1, duration: 0.45 }, 0)
          .fromTo(
            bubbles,
            { opacity: 0, y: 70, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.12, stagger: 0.1, ease: "back.out(1.7)" },
            0.3,
          )
          .fromTo(q("[data-hero-next]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.86)
          .to({}, { duration: 0.08 });
      },
    );
    return () => mm.revert();
  }, []);

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
              <p data-hero-welcome className={s.heroWelcome}>
                Welcome to <b>Norrick.</b>
              </p>
              <h1 id="hero-title" className={s.wide}>
                <span data-hero-line className={s.heroLine}>
                  <span>Your chapter</span>
                </span>
                <span data-hero-line className={s.heroLine}>
                  <span>
                    starts <em>here.</em>
                  </span>
                </span>
              </h1>
            </div>
            <p data-hero-cue className={s.heroCue} aria-hidden>
              Scroll <i />
            </p>
          </div>
        </div>

        <ol className={s.thread} aria-label="Conversations on Norrick">
          {heroThread.map((line, i) => (
            <li
              key={line.text}
              data-hero-bubble
              style={{ "--top": tops.desktop[i] } as React.CSSProperties}
              className={`${s.bubble} ${line.side === "left" ? s.bubbleLeft : s.bubbleRight}`}
            >
              <span className={s.bubbleWho}>{line.who}</span>
              <span className={s.bubbleText}>{line.text}</span>
            </li>
          ))}
        </ol>

        <div data-hero-next className={s.heroNext}>
          <p>Every chapter starts with a conversation.</p>
          <Link href="/collaborate" className={s.pill}>
            Find your people <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
