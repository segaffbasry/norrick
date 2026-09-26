import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutHero, aboutStats, chapters, empower, journey, madeBy, teamQuote } from "@/lib/about";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ChapterShowcase } from "@/components/sections/ChapterShowcase";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "About | Norrick",
  description: "From a pandemic passion project to a platform empowering 1,000+ emerging creatives.",
};

function Pin() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

// A photo (grey placeholder) with a caption pill at the bottom-left.
function Photo({
  caption,
  image,
  className = "",
}: {
  caption: string;
  image?: { src: string; alt: string };
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-panel ${className}`}>
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      ) : (
        <ImagePlaceholder className="absolute inset-0" />
      )}
      <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-pill bg-background px-4 py-2.5 text-small font-medium text-foreground sm:bottom-6 sm:left-6">
        <Pin />
        {caption}
      </span>
    </div>
  );
}

// About, in the layout of contra.com/mission: centered hero, stat cards, two
// text-card + photo rows (the second mirrored), the story timeline,
// testimonials, and a closing call to action.
export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-y pb-8 md:pb-10">
        <div className="shell text-center">
          <p className="eyebrow">About</p>
          <h1 className="mx-auto mt-5 max-w-[16ch] text-[clamp(2.75rem,1.4rem+5.5vw,6rem)] leading-[1] tracking-[-0.04em]">
            {aboutHero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.125rem,1rem+0.55vw,1.5rem)] leading-snug text-muted">{aboutHero.body}</p>
        </div>
      </section>

      {/* Stat cards */}
      <section aria-label="Norrick in numbers" className="pb-4 md:pb-6">
        <div className="shell">
          <dl data-stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {aboutStats.map((s, i) => (
              <div
                key={s.label}
                className={`flex min-h-[11rem] flex-col justify-between rounded-panel p-5 sm:p-7 md:min-h-[15rem] ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-tile"
                }`}
              >
                <dd className="font-display text-[clamp(2rem,1.4rem+2.6vw,4rem)] leading-none tracking-[-0.03em]">{s.value}</dd>
                <dt className={`text-body ${i === 0 ? "opacity-85" : "text-muted"}`}>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Made by creatives: text card left, photo right */}
      <section className="py-3 md:py-4">
        <div className="shell">
          <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
            <div className="flex flex-col justify-center rounded-panel bg-surface p-7 sm:p-10 lg:p-14">
              <h2 className="text-[clamp(2.25rem,1.3rem+3.4vw,4.5rem)] leading-[1.02] tracking-[-0.035em]">{madeBy.title}</h2>
              <p className="mt-6 max-w-lg text-lead text-copy">{madeBy.body}</p>
              <p className="mt-6 text-body text-copy">
                {madeBy.note}{" "}
                <Link href={madeBy.href} className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                  {madeBy.cta}
                </Link>
                .
              </p>
            </div>
            <Photo caption={madeBy.caption} image={madeBy.image} className="min-h-[22rem] lg:min-h-[34rem]" />
          </div>
        </div>
      </section>

      {/* Building the platform: photo left, text card right (mirrored) */}
      <section className="py-3 md:py-4">
        <div className="shell">
          <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
            <Photo caption={empower.caption} image={empower.image} className="min-h-[22rem] lg:min-h-[34rem]" />
            <div className="flex flex-col justify-center rounded-panel bg-surface p-7 sm:p-10 lg:p-14">
              <h2 className="text-[clamp(2.25rem,1.3rem+3.4vw,4.5rem)] leading-[1.02] tracking-[-0.035em]">{empower.title}</h2>
              <p className="mt-6 max-w-lg text-lead text-copy">{empower.body}</p>
              <p className="mt-8 max-w-md text-body text-copy">
                <strong className="font-display text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
                  {empower.stat.value}
                </strong>{" "}
                <span className="block pt-2 text-lead text-muted">{empower.stat.label}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The journey: the story, chapter by chapter */}
      <section className="mt-12 bg-surface pb-6 pt-20 md:mt-20 md:pt-28">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow">{journey.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] leading-[1] tracking-[-0.03em]">{journey.title}</h2>
            <p className="mt-6 max-w-md text-lead text-copy">{journey.body}</p>
            <Button href="/signup" className="mt-8">
              {journey.cta} <span aria-hidden>&rarr;</span>
            </Button>
          </div>

          <div className="mt-12 md:mt-20">
            <ChapterShowcase chapters={chapters} />
          </div>
        </div>
      </section>

      {/* Community */}
      <Testimonials title="Why our community loves Norrick" subtitle="Hear from creatives and productions" />

      {/* Team quote + call to action */}
      <section className="section-y pt-0 md:pt-0">
        <div className="shell">
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-display text-[clamp(1.75rem,1rem+2.6vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.02em]">
              &ldquo;{teamQuote.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-body text-muted">{teamQuote.by}</figcaption>
          </figure>

          <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center gap-6 rounded-panel bg-primary px-6 py-14 text-center text-primary-foreground md:py-20">
            <h2 className="text-[clamp(2.25rem,1.3rem+3.6vw,4.5rem)] leading-[1] tracking-[-0.035em]">Join our journey</h2>
            <p className="max-w-md text-lead opacity-85">Sign up and discover the world that awaits you.</p>
            <Button href="/signup" className="!border-background !bg-background !text-primary hover:!bg-primary-soft">
              Join Norrick <span aria-hidden>&rarr;</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
