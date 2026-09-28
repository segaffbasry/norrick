"use client";

import { useEffect, useRef } from "react";
import type { Clip } from "@/lib/home";

// A silent, looping clip that only plays while it is on screen (saves data and
// battery with many clips on one page). Visitors who prefer reduced motion get
// the still poster frame instead. Decorative: hidden from screen readers.
export function Film({
  clip,
  className = "",
  eager = false,
}: {
  clip: Clip;
  className?: string;
  /** Start loading straight away (the hero); others wait until they come near the screen. */
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "25% 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={eager ? "auto" : "none"}
      poster={clip.poster}
      className={className}
    >
      <source src={clip.src} type="video/mp4" />
    </video>
  );
}
