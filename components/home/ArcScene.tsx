import { arc } from "@/lib/home";
import s from "@/app/(site)/home.module.css";

export function ArcScene() {
  return (
    <section className={s.journey} aria-labelledby="arc-title">
      <h2 id="arc-title" className={s.sectionTitle}>From idea to finished work</h2>
      <svg className={s.journeyLine} viewBox="0 0 1000 60" fill="none" aria-hidden preserveAspectRatio="none">
        <path d="M1 35C90 6 155 58 255 30S405 5 495 34S680 55 750 27S905 14 999 31" pathLength="1" />
      </svg>
      <ol className={s.journeyGrid}>
        {arc.map((chapter) => <li key={chapter.title}><h3>{chapter.title}</h3><p>{chapter.body}</p></li>)}
      </ol>
    </section>
  );
}
