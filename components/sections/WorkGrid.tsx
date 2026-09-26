import { projects, type Project } from "@/lib/data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

function Stat({ children, icon }: { children: number; icon: "heart" | "eye" }) {
  return (
    <span className="inline-flex items-center gap-1 text-small text-muted">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {icon === "heart" ? (
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        ) : (
          <>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </>
        )}
      </svg>
      {children}
    </span>
  );
}

// Project card: same shell as the profile cards (hairline border, 16px radius,
// soft glow on hover), media on top and padded creator meta underneath.
function Tile({ project }: { project: Project }) {
  return (
    <article className="h-full overflow-hidden rounded-card border border-border bg-background card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {/* Placeholder image. Swap for next/image using project.image. */}
        <ImagePlaceholder className="absolute inset-0" />
        <span className="absolute left-3 top-3 rounded-pill bg-background px-3 py-1 font-display text-eyebrow font-medium uppercase tracking-[0.05em] text-foreground">
          {project.format}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-6 shrink-0 rounded-pill bg-placeholder" />
          <span className="truncate font-display text-small font-medium">{project.creator}</span>
          <span className="ml-auto flex items-center gap-3">
            <Stat icon="heart">{project.likes}</Stat>
            <Stat icon="eye">{project.views}</Stat>
          </span>
        </div>
        <h3 className="mt-2 text-body font-medium">{project.title}</h3>
      </div>
    </article>
  );
}

export function WorkGrid() {
  return (
    <section id="work" className="section-y">
      <div className="shell">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-heading">Made on Norrick</h2>
            <p className="text-small text-muted">Standout projects from the community</p>
          </div>
        </div>

        {/* Same gutter as the profile card grids. */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <Tile project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
