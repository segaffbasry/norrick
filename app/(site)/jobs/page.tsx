import type { Metadata } from "next";
import { roles } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { JobDirectory } from "@/components/sections/JobDirectory";
import { authLinks } from "@/lib/auth-links";

export const metadata: Metadata = {
  title: "Find jobs | Norrick",
  description: "Job posts from productions hiring filmmakers, actors, animators and crew.",
};

export default async function JobsPage({ searchParams }: PageProps<"/jobs">) {
  const { role } = await searchParams;
  const initialRole = roles.find((r) => r.id === role)?.id ?? "all";

  return (
    <main id="main-content">
      <section className="section-y">
        <div className="shell">
          <p className="eyebrow">Jobs</p>
          <h1 className="mt-3 text-hero">Find jobs</h1>
          <p className="mt-3 max-w-2xl text-lead text-muted">
            Find a story to be part of. Explore roles for filmmakers, actors, animators and crew.
          </p>

          <p className="mt-6 border-l-2 border-primary pl-4 text-sm text-muted">Work in progress: these are sample opportunities, not live listings. Applications are not connected yet.</p>
          <div className="mt-10">
            <JobDirectory initialRole={initialRole} />
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-card bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
            <div className="max-w-xl">
              <h2 className="text-title">Hiring for your production?</h2>
              <p className="mt-2 text-lead opacity-80">Posting a role is free. Reach filmmakers, actors, animators and crew.</p>
            </div>
            <Button href={authLinks.signIn} className="!border-background !bg-background !text-primary-light hover:!bg-primary-soft">
              Post a job
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
