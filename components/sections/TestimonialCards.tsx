import type { Testimonial } from "@/lib/data";
import s from "@/app/(site)/home.module.css";

/** Supply a real video and optional poster when a member's recording is ready. */
export function TestimonialCards({ items }: { items: Testimonial[] }) {
  return <div className={s.quotes}>{items.map((q) => (
    <figure key={q.id} className={s.quote}>
      {q.video ? <video className={s.testimonialVideo} src={q.video.src} poster={q.video.poster} controls playsInline preload="none" aria-label={`${q.name}'s testimonial`}>{q.video.captions && <track kind="captions" src={q.video.captions} srcLang="en" label="English" default />}</video> : null}
      <blockquote>“{q.quote}”</blockquote>
      <figcaption><strong>{q.name}</strong><small>{q.role}</small></figcaption>
    </figure>
  ))}</div>;
}
