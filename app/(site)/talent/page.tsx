import type { Metadata } from "next";
import { roles } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { TalentDirectory } from "@/components/sections/TalentDirectory";
import { authLinks } from "@/lib/auth-links";

export const metadata: Metadata = {
  title: "Browse talent | Norrick",
  description: "Browse verified filmmakers, actors, animators and crew.",
};

export default async function TalentPage({ searchParams }: PageProps<"/talent">) {
  const { role } = await searchParams;
  const initialRole = roles.find((r) => r.id === role)?.id ?? "all";

  return (
    <main id="main-content">
      <section className="section-y">
        <div className="shell">
          <p className="eyebrow">Talent</p>
          <h1 className="mt-3 text-hero">Browse talent</h1>
          <p className="mt-3 max-w-2xl text-lead text-muted">
            Find the people who share your curiosity, care about their craft, and want to make something together.
          </p>

          <p className="mt-6 border-l-2 border-primary pl-4 text-sm text-muted">Work in progress: these are sample profiles for exploring the directory. Member profiles are not connected yet.</p>
          <div className="mt-10">
            <TalentDirectory initialRole={initialRole} />
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-card bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
            <div className="max-w-xl">
              <h2 className="text-title">Cannot find who you need?</h2>
              <p className="mt-2 text-lead opacity-80">
                Post a job and let the right people come to you.
              </p>
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
