import { ProjectCount } from "@/components/ui/ProjectCount";
import { roleLabel, type Talent } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Profile card (Contra "People" card): avatar, name and location, stats, category pills, headline, and a View profile button.
// The picture is a flat grey placeholder.
export function TalentCard({ talent, onView }: { talent: Talent; onView: () => void }) {

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-background card-hover">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <ImagePlaceholder glyph={false} className="size-14 shrink-0 rounded-pill" />
          <div className="min-w-0">
            <h3 className="truncate text-lead font-medium leading-tight">{talent.name}</h3>
            <p className="mt-1.5 truncate text-small text-muted">{talent.location}</p>
          </div>
        </div>

        <ProjectCount count={talent.projectCount} />

        <ul aria-label="Categories" className="mt-5 flex flex-wrap gap-2">
          {talent.roles.map((r) => (
            <li key={r} className="rounded-pill border border-border px-3 py-1 text-small text-copy">
              {roleLabel(r)}
            </li>
          ))}
        </ul>

        <p className="mb-5 mt-5 text-body text-copy">{talent.headline}</p>

        <Button onClick={onView} className="mt-auto !h-11 w-full !border-ink !bg-ink hover:!border-foreground hover:!bg-foreground">
          View profile
        </Button>
      </div>
    </article>
  );
}
