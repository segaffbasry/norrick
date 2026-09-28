/** The only public profile metric: never infer counts from credits or activity. */
export function ProjectCount({ count }: { count?: number | null }) {
  if (count == null || !Number.isInteger(count) || count < 1) return null;
  return <p className="mt-4 text-small text-muted">Part of <span className="font-medium text-foreground">{count} {count === 1 ? "project" : "projects"}</span></p>;
}
