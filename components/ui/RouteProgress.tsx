"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface Controller {
  start: () => void;
  finish: () => void;
}

// Top-of-viewport loading bar for page transitions (YouTube / NProgress style).
// The App Router exposes no navigation events, so a navigation is detected from
// the click on an internal link (or back/forward) and completed when the
// pathname changes. The bar is driven imperatively through a ref, so no React
// state churn on every trickle tick.
export function RouteProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const controller = useRef<Controller | null>(null);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    let value = 0;
    let running = false;
    let trickle = 0;
    let safety = 0;
    let hideTimer = 0;
    let resetTimer = 0;

    const set = (v: number) => {
      value = v;
      el.style.transform = `scaleX(${v})`;
    };

    const finish = () => {
      if (!running) return;
      running = false;
      window.clearInterval(trickle);
      window.clearTimeout(safety);
      set(1);
      hideTimer = window.setTimeout(() => {
        el.style.opacity = "0";
        resetTimer = window.setTimeout(() => {
          el.style.transition = "none";
          set(0);
        }, 250);
      }, 200);
    };

    const start = () => {
      if (running) return;
      running = true;
      window.clearTimeout(hideTimer);
      window.clearTimeout(resetTimer);
      el.style.transition = "none";
      el.style.opacity = "1";
      set(0.08);
      void el.offsetWidth; // flush so the transition below animates from 8%
      el.style.transition = "transform 250ms ease-out, opacity 250ms ease";
      // Ease toward (never reaching) 90% until the page arrives.
      trickle = window.setInterval(() => set(value + (0.9 - value) * 0.1), 200);
      // Never leave the bar hanging if a navigation stalls or is cancelled.
      safety = window.setTimeout(finish, 12000);
    };

    controller.current = { start, finish };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (including hash-only jumps): no page transition happens.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };

    const onPopState = () => {
      if (window.location.pathname !== lastPath.current) start();
    };

    // Capture phase: runs before Next's Link handler calls preventDefault.
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.clearInterval(trickle);
      window.clearTimeout(safety);
      window.clearTimeout(hideTimer);
      window.clearTimeout(resetTimer);
      controller.current = null;
    };
  }, []);

  // The new page has arrived.
  useEffect(() => {
    lastPath.current = pathname;
    controller.current?.finish();
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]">
      <div
        ref={bar}
        className="h-full origin-left bg-primary opacity-0"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
