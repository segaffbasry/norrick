import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/ui/Faq";
import { HeroScene } from "@/components/home/HeroScene";
import { LiveCalls } from "@/components/home/LiveCalls";
import { ArcScene } from "@/components/home/ArcScene";
import { ClosingScene } from "@/components/home/ClosingScene";
import { TestimonialCards } from "@/components/sections/TestimonialCards";
import { homeFaq, testimonials } from "@/lib/data";
import s from "./home.module.css";

export const metadata: Metadata = {
  title: "Norrick | Your chapter starts here",
  description: "A creative hub where ideas become finished work. Creatives find their people. Productions find talent that finishes.",
};

export default function Home() {
  return (
    <main id="main-content" data-scenes className={s.home}>
      <HeroScene />
      <LiveCalls />
      <section id="meet" className={s.meet} aria-labelledby="meet-title">
        <div className={s.meetGrid}>
          <div className={s.meetCopy}>
            <h2 id="meet-title" className={s.sectionTitle}>Meet Norrick</h2>
            <p>Where ideas become finished work. Creatives find their people. Productions find talent that finishes.</p>
            <Link href="/about" className={s.textLink}>This is our story</Link>
          </div>
          <div className={s.meetPhoto}><Image src="/about/about-group.jpg" alt="Creatives from the Norrick community around a table" fill sizes="(max-width: 699px) 90vw, 44vw" className="object-cover" /></div>
        </div>
      </section>
      <ArcScene />
      <section className={s.story} aria-labelledby="story-title">
        <figure className={s.poster}><Image src="/about/about1.jpg" alt="The cast of Love Series, the team’s first project, on a red sofa" width={1080} height={1080} sizes="(max-width: 699px) 90vw, 40vw" /><figcaption>Love Series. Where our story began.</figcaption></figure>
        <div className={s.storyCopy}>
          <h2 id="story-title" className={s.sectionTitle}>Our first leap</h2>
          <p>We started as actors with no connections and no credits. So we made our own project. That first leap became Love Series, and the beginning of everything that followed.</p>
          <p>Norrick is for your first leap. And the people who take it with you.</p>
          <Link className={s.textLink} href="/about">Read the whole story</Link>
        </div>
      </section>
      <section id="voices" className={s.voices} aria-labelledby="voices-title">
        <h2 id="voices-title" className={s.sectionTitle}>The people make the place</h2>
        <TestimonialCards items={testimonials} />
      </section>
      <section id="faq" className={s.faq} aria-labelledby="faq-title">
        <h2 id="faq-title" className={s.sectionTitle}>Good to know</h2>
        <Faq items={homeFaq} />
      </section>
      <ClosingScene />
    </main>
  );
}
