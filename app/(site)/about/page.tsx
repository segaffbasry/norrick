import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutHero, chapters, empower, madeBy, teamQuote } from "@/lib/about";
import { testimonials } from "@/lib/data";
import { ChapterShowcase } from "@/components/sections/ChapterShowcase";
import { SceneFx } from "@/components/home/SceneFx";
import s from "../home.module.css";
import c from "../collaborate/collaborate.module.css";

export const metadata: Metadata = {
  title: "Our story | Norrick",
  description: "From a pandemic passion project to a home for creatives.",
};

// Our story. The words are the team's own (from umdb.org/about) and carry over
// unchanged; the layout follows the homepage: a photo-led opener, two story
// rows, the chapter-by-chapter scroll story, members' voices and an invitation.
function StoryRow({
  title,
  body,
  image,
  caption,
  children,
  flip = false,
}: {
  title: string;
  body: string;
  image: { src: string; alt: string };
  caption: string;
  children?: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <section className={s.story} style={flip ? { direction: "rtl" } : undefined}>
      <figure className={s.poster} style={{ direction: "ltr" }} data-rotate={flip ? "6,1" : "-6,-1"}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]" data-clip>
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 899px) 90vw, 45vw" className="object-cover" />
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
      <div className={s.storyCopy} style={{ direction: "ltr" }}>
        <h2 className={s.wide} data-lines style={{ fontSize: "clamp(1.2rem, 2.2vw, 2.1rem)" }}>
          <span>{title}</span>
        </h2>
        <div data-rise="children">
          <p>{body}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main id="main-content" data-scenes className={s.home}>
      <SceneFx />

      <section data-header="dark" className={c.top} aria-labelledby="about-title">
        <Image src="/about/about-event.jpg" alt="" fill priority sizes="100vw" className={c.film} />
        <div className={c.topInner}>
          <p className={c.label}>Our story</p>
          <h1 id="about-title" className={c.wide}>
            A new home for <span>creatives.</span>
          </h1>
          <p className={c.lede}>{aboutHero.body}</p>
        </div>
      </section>

      <StoryRow title={madeBy.title} body={madeBy.body} image={madeBy.image} caption={madeBy.caption}>
        <p>
          {madeBy.note}{" "}
          <Link href={madeBy.href} className="font-medium text-primary underline underline-offset-4">
            {madeBy.cta}
          </Link>
          .
        </p>
      </StoryRow>

      <StoryRow title={empower.title} body={empower.body} image={empower.image} caption={empower.caption} flip>

      </StoryRow>

      <section className="bg-surface px-[clamp(20px,5.5vw,96px)] pb-6 pt-24 md:pt-32" aria-labelledby="journey-title">
        <p className={`${s.label} text-primary`} data-rise>
          The journey
        </p>
        <h2 id="journey-title" className={`${s.wide} mt-6 text-[clamp(1.3rem,2.5vw,2.5rem)]`} data-lines>
          Our journey
        </h2>
        <div className="mt-12 md:mt-20">
          <ChapterShowcase chapters={chapters} />
        </div>
      </section>

      <section className={s.voices} style={{ background: "var(--color-background)" }} aria-labelledby="about-voices-title">
        <p className={s.label} data-rise>
          In their own words
        </p>
        <h2 id="about-voices-title" className={s.wide} data-lines style={{ marginTop: 24 }}>
          The people make the place
        </h2>
        <div className={s.quotes} data-rise="children">
          {testimonials.map((q) => (
            <figure key={q.id} className={s.quote}>
              <span className={s.quoteMark} aria-hidden>
                “
              </span>
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                <span className={s.initials} aria-hidden>
                  {q.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <strong>{q.name}</strong>
                  <small>{q.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section data-header="dark" className="bg-ink px-[clamp(20px,5.5vw,96px)] py-28 text-center text-white md:py-40">
        <figure className="mx-auto max-w-5xl" data-rise>
          <blockquote className="font-accent text-[clamp(1.2rem,2.4vw,2.4rem)] not-italic uppercase tracking-[0.01em] leading-[1.1]">“{teamQuote.quote}”</blockquote>
          <figcaption className={`${s.label} mt-8 text-primary-light`}>{teamQuote.by}</figcaption>
        </figure>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className={s.pill}>
            Join our journey 
          </Link>
          <Link href="/collaborate" className={`${s.pill} ${s.pillLight}`}>
            Find your people 
          </Link>
        </div>
      </section>
    </main>
  );
}
