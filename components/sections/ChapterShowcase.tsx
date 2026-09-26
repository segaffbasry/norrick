"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Chapter } from "@/lib/about";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Scroll story: each chapter takes a full screen on the left; the picture on
// the right stays pinned (one screen tall, under the 5rem header) and swaps to
// the chapter that is in the middle of the viewport. On small screens the
// picture sits above each chapter instead. Images are grey placeholders.
export function ChapterShowcase({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  // The chapter crossing the middle band of the viewport becomes active.
  useEffect(() => {
    const els = items.current.filter((el): el is HTMLLIElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <ol>
        {chapters.map((c, i) => (
          <li
            key={c.title}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            aria-current={i === active ? "step" : undefined}
            className="flex flex-col justify-center border-t border-border py-10 lg:min-h-[calc(100svh-5rem)] lg:py-16"
          >
            {/* Small screens: the picture sits with its chapter */}
            {c.image ? (
              <div className="relative mb-6 h-56 overflow-hidden rounded-card sm:h-72 lg:hidden">
                <Image src={c.image.src} alt={c.image.alt} fill sizes="100vw" className="object-cover" />
              </div>
            ) : (
              <ImagePlaceholder className="mb-6 h-56 rounded-card sm:h-72 lg:hidden" />
            )}

            <div className={`transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-30"}`}>
              <span className="eyebrow">{c.label}</span>
              <h3 className="mt-3 text-[clamp(2rem,1.3rem+2.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">{c.title}</h3>
              <p className="mt-5 max-w-xl text-lead text-copy">{c.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Large screens: one pinned, full-height picture that changes per chapter */}
      <div className="hidden lg:block">
        <div
          aria-hidden
          className="sticky top-[5.5rem] h-[calc(100svh-6.5rem)] overflow-hidden rounded-card bg-placeholder"
        >
          {chapters.map((c, i) => (
            <div
              key={c.title}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
              style={{ background: `color-mix(in oklab, var(--color-ink) ${i * 2}%, var(--color-placeholder))` }}
            >
              {c.image && <Image src={c.image.src} alt="" fill sizes="50vw" className="object-cover" />}
              <span className="eyebrow absolute left-6 top-6 rounded-pill bg-background px-3 py-1.5 !text-foreground">{c.title}</span>
              {!c.image && (
                <span className="absolute bottom-6 left-6 font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-foreground">
                  {c.label}
                </span>
              )}
            </div>
          ))}
          <span className="eyebrow absolute right-6 top-6 rounded-pill bg-background px-3 py-1.5 !text-foreground">
            {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
