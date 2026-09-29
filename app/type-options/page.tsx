import type { Metadata } from "next";
import Link from "next/link";
import { typeOptions } from "@/lib/type-options";
import { heroFilm } from "@/lib/home";
import s from "./type.module.css";

export const metadata: Metadata = {
  title: "Type options | Norrick",
  robots: { index: false, follow: false },
};

// Scales that even out how wide each face sets, so every specimen headline
// fills one line at the same measure (mirrors --type-scale in globals.css).
const scale: Record<string, number> = { current: 1, a: 1.28, b: 0.69, c: 1.7 };

const specimens = [
  { id: "current", name: "Current: Archivo Expanded + Inter", pairing: "Archivo Expanded headlines, Bebas Neue accent, Inter body", mood: "What the site uses today, for comparison.", display: "var(--font-archivo)", body: "var(--font-inter)", accent: "var(--font-bebas-neue)" },
  ...typeOptions.map((option) => ({ ...option, name: `Option ${option.id.toUpperCase()}: ${option.name}`, accent: option.display })),
];

export default function TypeOptions() {
  return (
    <main className={s.page}>
      <header className={s.intro}>
        <Link href="/" className={s.back}>Norrick</Link>
        <h1>Type options</h1>
        <p>Three directions for headlines and body, set in the site’s own words. Each one can also be tried across the whole site: pick one below, then browse normally. A small bar at the bottom lets you switch or go back.</p>
      </header>

      {specimens.map((option) => (
        <section key={option.id} className={s.option} style={{ "--display": option.display, "--body": option.body, "--accent": option.accent, "--scale": scale[option.id] } as React.CSSProperties} aria-labelledby={`type-${option.id}`}>
          <div className={s.meta}>
            <h2 id={`type-${option.id}`}>{option.name}</h2>
            <p className={s.pairing}>{option.pairing}</p>
            <p>{option.mood}</p>
            <a href={option.id === "current" ? "/?type=off" : `/?type=${option.id}`} className={s.try}>
              {option.id === "current" ? "Browse with the current type" : "See the whole site in this type"}
            </a>
          </div>

          <div className={s.hero} style={{ backgroundImage: `url(${heroFilm.poster})` }}>
            <p className={s.credit}>{heroFilm.credit}</p>
            <p className={s.headline}>Your chapter starts <em>here.</em></p>
          </div>

          <div className={s.sample}>
            <div>
              <p className={s.title}>Meet Norrick</p>
              <p className={s.body}>Where ideas become finished work. Creatives find their people. Productions find talent that finishes.</p>
            </div>
            <div className={s.bits}>
              <p className={s.bubble}>3D animator, environment, lighting and compositing artists for <strong>DORKA</strong></p>
              <div className={s.row}>
                <span className={s.pill}>Join Norrick</span>
                <span className={s.glyphs}>Aa Gg Rr 0123</span>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
