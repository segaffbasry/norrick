"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Lenis smooth scrolling, configured to match contralabs.com/jobs (options read
// from its live instance): lerp 0.1, smooth wheel, no touch smoothing, both
// multipliers 1, autoRaf, anchor links, auto toggle, nested scrolling allowed.
// Skipped for people who prefer reduced motion.
//
// It also makes sure every link click lands at the top of the page:
//  - a link to another page resets the scroll once the new page is in (Lenis can
//    otherwise hold on to the old page's scroll target);
//  - a link to the page you are already on scrolls back to the top.
// Links with a #hash keep their anchor behaviour, and browser back/forward keeps
// its own scroll restoration.
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const navigating = useRef(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      lenisRef.current = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        orientation: "vertical",
        gestureOrientation: "vertical",
        overscroll: true,
        autoRaf: true,
        anchors: true,
        autoToggle: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;

      if (url.pathname !== window.location.pathname) {
        navigating.current = true;
      } else if (lenisRef.current) {
        lenisRef.current.scrollTo(0);
      } else {
        window.scrollTo({ top: 0 });
      }
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A page change that came from a link click: start at the top.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!navigating.current) return;
    navigating.current = false;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
