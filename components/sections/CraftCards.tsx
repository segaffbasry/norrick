import Link from "next/link";
import { craftGroups, roleLabel } from "@/lib/data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Big category cards in a staggered checkerboard (Contra Labs "jobs" grid):
// text cards with a large title and an arrow, image placeholders between them,
// empty cells for air. Six text cards + two image cards fill a 4 x 3 grid.
// "g" = next craft group card, "i" = image placeholder, "_" = empty cell.
const layout = ["g", "_", "g", "i", "_", "g", "g", "_", "g", "i", "_", "g"] as const;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CraftCards() {
  let next = 0;

  return (
    <section id="crafts" className="section-y">
      <div className="shell">
        <h2 className="mb-8 text-title text-muted md:mb-12">Find your craft.</h2>

        <ul data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {layout.map((cell, i) => {
            if (cell === "_") return <li key={i} aria-hidden className="hidden lg:block" />;
            if (cell === "i") {
              return (
                <li key={i} aria-hidden className="hidden sm:block">
                  <ImagePlaceholder className="aspect-[5/4] rounded-panel lg:aspect-[4/5]" />
                </li>
              );
            }
            const group = craftGroups[next++];
            const first = group.roles[0];
            return (
              <li key={group.id}>
                <Link
                  href={`/talent?role=${first}`}
                  className="group flex aspect-[5/4] flex-col justify-between rounded-panel bg-tile p-6 transition-colors hover:bg-primary-soft lg:aspect-[4/5] lg:p-8"
                >
                  <span className="font-display text-[clamp(2rem,1.2rem+2vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
                    {group.title}
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="text-small text-muted">
                      {group.roles.slice(0, 2).map(roleLabel).join(", ")}
                      {group.roles.length > 2 ? ` + ${group.roles.length - 2} more` : ""}
                    </span>
                    <span className="grid size-12 shrink-0 place-items-center rounded-pill border border-foreground/25 transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                      <Arrow />
                      <span className="sr-only">Browse {group.title}</span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
