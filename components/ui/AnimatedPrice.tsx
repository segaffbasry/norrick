"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const final = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

// A price that counts from its old value to its new one when it changes (e.g.
// Monthly -> Yearly). The text is written imperatively, so React never
// re-renders it mid-count; the initial text comes from `value` once. Skipped
// for reduced motion.
export function AnimatedPrice({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const [initial] = useState(() => final(value));

  useEffect(() => {
    const el = ref.current;
    if (!el || shown.current === value) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = value;
      el.textContent = final(value);
      return;
    }

    const proxy = { v: shown.current };
    const tween = gsap.to(proxy, {
      v: value,
      duration: 0.75,
      ease: "power2.out",
      onUpdate: () => {
        shown.current = proxy.v;
        el.textContent = `$${proxy.v.toFixed(2)}`;
      },
      onComplete: () => {
        shown.current = value;
        el.textContent = final(value);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {initial}
    </span>
  );
}
