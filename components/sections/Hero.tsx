import { hero } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { HeroMarquee } from "@/components/sections/HeroMarquee";

// Hero: one headline with an underlined phrase, one line of copy, two buttons,
// three figures, and on the right four columns of photo and stat cards that
// drift up and down in a loop (see HeroMarquee).
// On large screens the section is exactly one screen tall (100svh minus the
// 5rem header); type and spacing scale with viewport height so it always fits.
const gap = "mt-[clamp(1.25rem,3.5vh,2.25rem)]";

export function Hero() {
  const [before, after] = hero.title.split(hero.highlight);

  return (
    <section
      id="hero"
      className="flex items-center py-10 lg:h-[calc(100svh-5rem)] lg:min-h-[34rem] lg:py-[clamp(1.5rem,5vh,4rem)]"
    >
      {/* Wider side padding than the page gutter (about 5.4vw, like GoFractional). */}
      <div className="mx-auto w-full max-w-[112rem] px-[clamp(1.25rem,5.4vw,5.5rem)]">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-[clamp(2rem,5vw,5rem)]">
          <div data-hero-text className="flex flex-col justify-center">
            <h1 className="text-[clamp(2.75rem,min(9.5vh,6vw),6rem)] leading-[0.98] tracking-[-0.04em]">
              {before}
              <span className="underline decoration-primary decoration-[5px] underline-offset-[10px]">{hero.highlight}</span>
              {after}
            </h1>
            <p className={`${gap} max-w-md text-[clamp(1.0625rem,min(2.6vh,1.6vw),1.5rem)] leading-snug text-copy`}>{hero.body}</p>

            <div className={`${gap} flex flex-wrap gap-3`}>
              <Button href="/signup">Join for free</Button>
              <Button href="/talent" variant="outline">
                Browse talent <span aria-hidden>&rarr;</span>
              </Button>
            </div>

            <dl className={`${gap} flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-[clamp(1rem,3vh,1.75rem)]`}>
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-[clamp(1.5rem,3.6vh,2rem)] font-medium leading-none tracking-[-0.03em]">{s.value}</dd>
                  <dt className="mt-1.5 text-small text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <HeroMarquee />
        </div>
      </div>
    </section>
  );
}
