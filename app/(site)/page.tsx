import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/ui/Faq";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import { HeroScene } from "@/components/home/HeroScene";
import { ArcScene } from "@/components/home/ArcScene";
import { CraftsScene } from "@/components/home/CraftsScene";
import { ClosingScene } from "@/components/home/ClosingScene";
import { SceneFx } from "@/components/home/SceneFx";
import { homeFaq, meet, testimonials } from "@/lib/data";
import s from "./home.module.css";

export const metadata: Metadata = {
  title: "Norrick | Your chapter starts here",
  description:
    "A creative home for filmmakers, actors, animators and crew. Bring your idea, find your people, and make something together.",
};

// The homepage tells one story: from "I have an idea" to "I finished something".
// Scenes: welcome + conversation (hero), Meet Norrick, the arc, the crafts,
// where Norrick itself began, members in their own words, questions, and a
// closing invitation. Scroll choreography lives in components/home.
export default function Home() {
  return (
    <main id="main-content" data-scenes className={s.home}>
      <SceneFx />
      <HeroScene />

      <section id="meet" className={s.meet} aria-labelledby="meet-title">
        <div className={s.meetTop} data-rise="children">
          <p className={s.label}>{meet.title}</p>
          <p className={s.label}>Made by creatives, for creatives</p>
        </div>
        <h2 id="meet-title" className={s.wide} data-lines>
          <span>Creativity</span>
          <span>
            lives <em>here.</em>
          </span>
        </h2>
        <div className={s.meetGrid}>
          <ScrollReveal text={meet.body} className={s.meetCopy} />
          <div className={s.meetAside}>
            <div className={s.meetPhotoWrap}>
              <span className={s.stamp} data-rotate="-30,20" aria-hidden>
                Made of
                <br />
                people.
              </span>
              <div className={s.meetPhoto} data-clip>
                <div data-parallax="8" style={{ position: "absolute", inset: 0 }}>
                  <Image
                    src="/about/about-group.jpg"
                    alt="Creatives from the Norrick community around a table"
                    fill
                    sizes="(max-width: 899px) 100vw, 44vw"
                  />
                </div>
              </div>
            </div>
            <Link href="/about" className={s.textLink} data-rise>
              This is our story <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <ArcScene />
      <CraftsScene />

      <section className={s.story} aria-labelledby="story-title">
        <figure className={s.poster} data-rotate="-9,-1">
          <Image
            src="/about/about1.jpg"
            alt="The cast of Love Series, the team’s first project, posed on a red sofa"
            width={1080}
            height={1080}
            sizes="(max-width: 899px) 90vw, 40vw"
          />
          <figcaption>Love Series, 2020. Where our story began.</figcaption>
        </figure>
        <div className={s.storyCopy}>
          <p className={s.label} data-rise>
            Every finished thing started somewhere
          </p>
          <h2 id="story-title" className={s.wide} data-lines>
            <span>“What if”</span>
            <span>becomes</span>
            <em>“we made it.”</em>
          </h2>
          <div data-rise="children">
            <p>
              We started as actors with no connections and no credits. So we made our own project. That first leap became Love
              Series, and the beginning of everything that followed.
            </p>
            <p>Norrick is for your first leap. And the people who take it with you.</p>
            <Link className={s.textLink} href="/about">
              Read the whole story <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="voices" className={s.voices} aria-labelledby="voices-title">
        <p className={s.label} data-rise>
          In their own words
        </p>
        <h2 id="voices-title" className={s.wide} data-lines style={{ marginTop: 24 }}>
          <span>The people</span>
          <span>
            make <em>the place.</em>
          </span>
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

      <section id="faq" className={s.faq} aria-labelledby="faq-title">
        <div>
          <p className={s.label} data-rise>
            Before you jump in
          </p>
          <h2 id="faq-title" className={s.wide} data-lines>
            <span>A few things</span>
            <em>to know.</em>
          </h2>
        </div>
        <div data-rise>
          <Faq items={homeFaq} />
        </div>
      </section>

      <ClosingScene />
    </main>
  );
}
