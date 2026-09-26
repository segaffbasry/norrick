import { howRows } from "@/lib/data";

// Cascade of rows (Contra Labs "How it works / What you get"): large title on
// the left, one short paragraph on the right, hairline between rows.
export function ProcessSteps() {
  return (
    <section id="process" className="section-y">
      <div className="shell">
        <div data-stagger className="mx-auto max-w-6xl">
          {howRows.map((row) => (
            <div
              key={row.title}
              className="grid gap-4 border-t border-border py-10 first:border-t-0 md:grid-cols-[1fr_1.7fr] md:gap-12 md:py-14"
            >
              <h2 className="text-[clamp(2rem,1.3rem+2.4vw,3.5rem)] leading-[1.05] tracking-[-0.025em]">{row.title}</h2>
              <p className="max-w-2xl text-[clamp(1.125rem,1rem+0.55vw,1.5rem)] leading-snug text-muted md:pt-2">{row.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
