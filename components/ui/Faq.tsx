"use client";

import { gsap } from "gsap";
import { useRef, useState } from "react";

// Native <details> accordion (keyboard and screen readers work as usual), with
// tall rows, hairline separators and a primary-coloured plus that turns into a
// cross. Each answer eases open and shut (height + fade) with GSAP, the same
// way as the pricing compare table; instant for reduced motion.
function FaqItem({ q, a }: { q: string; a: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const wantOpen = useRef(false);
  const [expanded, setExpanded] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    const d = details.current;
    const b = body.current;
    if (!d || !b) return;
    // Reduced motion: let the browser toggle it (onToggle keeps the icon in sync).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    wantOpen.current = !wantOpen.current;
    setExpanded(wantOpen.current);
    tween.current?.kill();
    gsap.set(b, { overflow: "hidden" });

    if (wantOpen.current) {
      // From fully closed the body starts at 0; if a close is still running, pick up from where it is.
      const from = d.open ? { height: b.offsetHeight, opacity: +getComputedStyle(b).opacity } : { height: 0, opacity: 0 };
      d.open = true;
      tween.current = gsap.fromTo(
        b,
        from,
        {
          height: "auto",
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => void gsap.set(b, { clearProps: "height,opacity,overflow" }),
        },
      );
    } else {
      tween.current = gsap.to(b, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          d.open = false;
          gsap.set(b, { clearProps: "height,opacity,overflow" });
        },
      });
    }
  };

  return (
    <details
      ref={details}
      onToggle={(e) => {
        wantOpen.current = e.currentTarget.open;
        setExpanded(e.currentTarget.open);
      }}
    >
      <summary
        onClick={toggle}
        className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-display text-lead font-medium transition-colors hover:text-primary-light [&::-webkit-details-marker]:hidden"
      >
        {q}
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={`size-6 shrink-0 text-primary-light transition-transform duration-300 ease-out ${expanded ? "rotate-45" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 4v16M4 12h16" />
        </svg>
      </summary>
      <div ref={body}>
        <p className="max-w-2xl pb-7 text-body text-muted">{a}</p>
      </div>
    </details>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border border-b border-border">
      {items.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}
