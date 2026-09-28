"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Chapter } from "@/lib/about";

// Scroll story: each chapter takes a full screen on the left; the picture on
// the right stays pinned (one screen tall, under the 5rem header) and swaps to
// the chapter that is in the middle of the viewport. On small screens the
// picture sits above each chapter instead. A chapter without a photo gets a
// purple panel with its title.
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
              <div className="mb-6 flex h-56 items-end rounded-card bg-primary p-6 sm:h-72 lg:hidden">
                <span className="font-display text-[2.5rem] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-white [font-stretch:125%]">
                  {c.title}
                </span>
              </div>
            )}

            <div className={`transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-30"}`}>
              <span className="eyebrow !text-primary">{c.label}</span>
              <h3 className="mt-3 font-display text-[clamp(2rem,1.3rem+2.4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] [font-stretch:125%]">
                {c.title}
              </h3>
              <p className="mt-5 max-w-xl text-lead text-copy">{c.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Large screens: one pinned, full-height picture that changes per chapter */}
      <div className="hidden lg:block">
        <div
          aria-hidden
          className="sticky top-[5.5rem] h-[calc(100svh-6.5rem)] overflow-hidden rounded-[28px] bg-ink"
        >
          {chapters.map((c, i) => (
            <div
              key={c.title}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
            >
              {c.image && <Image src={c.image.src} alt="" fill sizes="50vw" className="object-cover" />}
              <span className="eyebrow absolute left-6 top-6 rounded-pill bg-background px-3 py-1.5 !text-foreground">{c.title}</span>
              {!c.image && (
                <span className="absolute inset-0 flex items-end bg-primary p-8">
                  <span className="font-display text-[clamp(2.4rem,4.2vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-white [font-stretch:125%]">
                    {c.title}
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
