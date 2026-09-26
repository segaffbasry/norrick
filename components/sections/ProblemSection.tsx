import { problem } from "@/lib/data";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Left: sticky statement + a small "how it grows" flow. Right: three big
// numbered points separated by hairlines.
export function ProblemSection() {
  return (
    <section id="problem" className="section-y">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{problem.eyebrow}</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+2.8vw,3.75rem)] leading-[1.04] tracking-[-0.03em]">
              {problem.headline}
            </h2>
            <p className="mt-6 max-w-lg text-lead text-muted">{problem.body}</p>

            <div className="mt-10 rounded-panel bg-tile p-6 md:p-8">
              <p className="eyebrow">{problem.cycle.label}</p>
              <ul className="mt-5 flex flex-wrap items-center gap-3">
                {problem.cycle.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    {i > 0 && <Arrow />}
                    <span className="rounded-pill bg-background px-5 py-2.5 font-display text-lead">{step}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-body text-copy">{problem.cycle.note}</p>
            </div>
          </div>

          <ol data-stagger className="border-b border-border">
            {problem.points.map((point, i) => (
              <li key={point.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-border py-8 md:grid-cols-[5rem_1fr] md:py-10">
                <span className="font-display text-[clamp(1.75rem,1.2rem+1.4vw,2.5rem)] leading-none text-primary">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[clamp(1.5rem,1.15rem+1.1vw,2.25rem)] leading-tight tracking-[-0.02em]">{point.title}</h3>
                  <p className="mt-3 max-w-xl text-lead text-copy">{point.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
