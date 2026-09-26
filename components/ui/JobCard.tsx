import Link from "next/link";
import type { JobPost } from "@/lib/data";
import { Card } from "@/components/ui/Card";

// Job post card (The Hub style): logo tile, company, blurb, categories and open
// roles. The whole card links to the job page.
export function JobCard({ job }: { job: JobPost }) {
  return (
    <Card as="article" variant="outline" className="card-hover relative flex h-full flex-col p-6 hover:border-primary">
      <span
        aria-hidden
        className="grid size-14 place-items-center rounded-tag bg-ink font-display text-lead font-semibold text-ink-foreground"
      >
        {job.company.charAt(0)}
      </span>
      <h3 className="mt-5 text-heading">
        <Link href={`/jobs/${job.id}`} className="after:absolute after:inset-0 after:rounded-card">
          {job.company}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-4 text-body text-muted">{job.blurb}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <span className="truncate font-display text-body font-medium">{job.categories}</span>
        <span className="shrink-0 bg-primary-soft px-3 py-2 font-display text-body font-medium text-primary">
          {job.openRoles} {job.openRoles === 1 ? "role" : "roles"}
        </span>
      </div>
    </Card>
  );
}
