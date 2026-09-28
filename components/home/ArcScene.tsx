"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { arc } from "@/lib/home";
import { Film } from "@/components/home/Film";
import s from "@/app/(site)/home.module.css";

gsap.registerPlugin(ScrollTrigger);

// Scene three: one idea, all the way to finished. On large screens the stage
// holds (sticky) while the chapters travel sideways past you; each film settles as it
// arrives and its line of conversation pops in. Phones get a simple stack.
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

      // The section is exactly as tall as the sideways distance plus one
      // screen; its inner stage is position: sticky (CSS), so nothing is pinned
      // with position: fixed (which can stop playing videos from painting).
      const setHeight = () => (el.style.height = `${distance() + window.innerHeight}px`);
      setHeight();
      ScrollTrigger.addEventListener("refreshInit", setHeight);

      const move = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
      });

      gsap.to(q("[data-arc-progress]"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true },
      });

      q("[data-chapter]").forEach((chapter) => {
        const video = chapter.querySelector("[data-chapter-video]");
        const bubble = chapter.querySelector("[data-chapter-bubble]");
        const text = chapter.querySelector("[data-chapter-text]");
        // Film drifts inside its frame for the whole crossing (parallax).
        if (video) {
          gsap.fromTo(
            video,
            { xPercent: -8, scale: 1.25 },
            {
              xPercent: 8,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: chapter, containerAnimation: move, start: "left right", end: "right left", scrub: true },
            },
          );
        }
        const pop = gsap.timeline({
          scrollTrigger: { trigger: chapter, containerAnimation: move, start: "left 72%", toggleActions: "play none none reverse" },
        });
        if (text) pop.from(text.children, { yPercent: 60, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 });
        if (bubble) pop.from(bubble, { scale: 0.6, opacity: 0, y: -20, duration: 0.7, ease: "back.out(2)", transformOrigin: "top right" }, 0.15);
      });

      // The heading drifts left a little faster than you scroll, then fades.
      gsap.to(q("[data-arc-head]"), {
        xPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance() * 0.6}`, scrub: true, invalidateOnRefresh: true },
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setHeight);
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
    <section ref={root} data-header="dark" className={s.arc} aria-labelledby="arc-title">
      <div className={s.arcPin}>
        <div data-arc-head className={s.arcHead}>
          <h2 id="arc-title" className={s.wide}>
            From <em>“I have an idea”</em>
            <br />
            to <em>“I finished something.”</em>
          </h2>
          <p>Every finished film, scene and frame started as a thought somebody couldn’t let go of. This is how it gets made.</p>
        </div>

        <ol data-arc-track className={s.arcTrack}>
          {arc.map((c) => (
            <li key={c.clip.src} data-chapter className={s.chapter}>
              <div data-chapter-video className={s.chapterVideo}>
                <Film clip={c.clip} className={s.chapterVideo} />
              </div>
              <p data-chapter-bubble className={s.chapterBubble}>
                <span className={s.bubbleWho}>{c.who}</span>
                <span className={s.bubbleText}>{c.bubble}</span>
              </p>
              <div data-chapter-text className={s.chapterText}>
                <h3 className={s.wide}>
                  <span style={{ display: "block" }}>{c.line}</span>
                  <em>{c.accent}</em>
                </h3>
              </div>
            </li>
          ))}
          <li data-chapter className={`${s.chapter} ${s.chapterEnd}`}>
            <p className={s.label}>Now it’s your turn</p>
            <div data-chapter-text>
              <h3 className={s.wide}>
                <span style={{ display: "block" }}>Your chapter</span>
                <em>starts here.</em>
              </h3>
              <Link href="/collaborate" className={`${s.pill} ${s.pillLight}`} style={{ marginTop: 32 }}>
                Start with your idea <span aria-hidden>↗</span>
              </Link>
            </div>
          </li>
        </ol>
        <div className={s.arcProgress} aria-hidden>
          <i data-arc-progress />
        </div>
      </div>
    </section>
  );
}
