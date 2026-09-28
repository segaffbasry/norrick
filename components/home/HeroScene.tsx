import { heroFilm } from "@/lib/home";
import { Film } from "@/components/home/Film";
import s from "@/app/(site)/home.module.css";

export function HeroScene() {
  return (
    <section id="hero" data-header="dark" className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroStage}>
        <div className={s.heroFrame}>
          <Film clip={heroFilm} eager className={s.heroVideo} />
          <div className={s.heroShade} />
        </div>
        <div className={s.heroTitle}>
          <p className={s.filmCredit}>Raquel Hernandez · 3D Artist</p>
          <h1 id="hero-title" className={s.wide}>Your chapter starts <em>here.</em></h1>
        </div>
      </div>
    </section>
  );
}
