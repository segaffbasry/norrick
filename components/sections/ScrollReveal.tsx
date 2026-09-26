"use client";

import { useEffect, useRef } from "react";

// Big statement whose words go from dim to full ink as the block scrolls
// through the viewport. Driven imperatively (no React state per frame).
export function ScrollReveal({ text, className = "" }: { text: string; className?: string }) {
  const root = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top enters at 85% of the viewport, 1 when it reaches 30%.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.55)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = String(Math.min(1, Math.max(0.22, 0.22 + (lit - i) * 0.78)));
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={root} className={className}>
      {words.map((w, i) => (
        <span key={i} data-word style={{ opacity: 0.22 }} className="transition-opacity duration-300">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
