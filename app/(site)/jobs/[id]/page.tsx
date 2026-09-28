import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob, jobIds } from "@/lib/jobs";
import { ApplyForm } from "@/components/sections/ApplyForm";
import { Button } from "@/components/ui/Button";
import { Chat } from "@/components/ui/Icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function generateStaticParams() {
  return jobIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[id]">): Promise<Metadata> {
  const { id } = await params;
  const job = getJob(id);
  return job ? { title: `${job.role} at ${job.company} | Norrick`, description: job.blurb } : {};
}

// Two tiles + one wide tile, mirrored left/right. Flat grey placeholders, equal
// gaps, nothing overflows the panel. Shown on large screens only.
function Collage({ side }: { side: "left" | "right" }) {
  const wide = <ImagePlaceholder className="col-span-2 aspect-[16/10] rounded-card" />;
  const small = <ImagePlaceholder className="aspect-square rounded-card" />;
  return (
    <div aria-hidden className="hidden grid-cols-2 gap-3 lg:grid">
      {side === "left" ? (
        <>
          {wide}
          {small}
          {small}
        </>
      ) : (
        <>
          {small}
          {small}
          {wide}
        </>
      )}
    </div>
  );
}

const h2 = "font-display text-[1.75rem] font-medium leading-tight tracking-[-0.01em]";

// Job post detail (Contra "apply" layout): banner, title + company, long-form
// copy on the left, sticky apply card on the right, closing CTA collage.
export default async function JobPage({ params }: PageProps<"/jobs/[id]">) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();

  return (
    <main id="main-content">
      {/* Banner */}
      <div className="shell pt-4">
        <div className="relative flex min-h-[8.5rem] items-center gap-4 overflow-hidden rounded-panel bg-primary p-5 text-primary-foreground md:min-h-[10rem] md:gap-6 md:px-8">
          {/* Banner artwork placeholder: flat grey panel on the right. */}
          <ImagePlaceholder className="absolute inset-y-0 right-0 hidden w-1/3 md:block" />
          <ImagePlaceholder className="relative size-16 shrink-0 rounded-card md:size-[4.5rem]" />
          <div className="relative">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-medium leading-tight tracking-[-0.01em]">
              {job.bannerTitle}
            </h2>
            <p className="mt-1 text-lead opacity-90">{job.bannerSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="shell py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_26rem] lg:gap-20">
          <article>
            <h1 className="text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">{job.role}</h1>

            <div className="mt-8 flex items-center gap-3 border-y border-border py-5">
              <ImagePlaceholder className="size-10 shrink-0 rounded-pill" glyph={false} />
              <span className="text-lead">{job.company}</span>
            </div>

            <h2 className={`${h2} mt-10`}>About {job.company}</h2>
            <div className="mt-5 space-y-5 text-lead text-copy">
              {job.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className={`${h2} mt-12`}>How it works</h2>
            <div className="mt-5 space-y-5 text-lead text-copy">
              {job.how.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className={`${h2} mt-12`}>What we&rsquo;re looking for</h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-lead text-copy marker:text-muted">
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-panel border border-border bg-background p-8">
              <h2 className={h2}>Apply to join</h2>
              <p className="mt-3 text-body text-muted">
                The application takes less than 5 minutes and includes a 30 second intro video to help us get to know you.
              </p>
              <ApplyForm />

              <div className="mt-8 border-t border-border pt-8">
                <h3 className="text-body font-normal text-muted">Tags</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <li key={t} className="rounded-pill bg-surface px-4 py-2 text-body text-copy">
                      {t}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-body font-normal text-muted">Additional info</h3>
                <ul className="mt-3 space-y-3">
                  {job.info.map((i) => (
                    <li key={i} className="flex items-center gap-3 text-body text-copy">
                      <Chat className="size-5 text-muted" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Closing CTA: text in the middle, tidy image-placeholder clusters either side */}
      <section className="bg-surface py-12 md:py-16">
        <div className="shell">
          <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-panel bg-background p-6 sm:p-10 lg:grid-cols-[1fr_minmax(0,34rem)_1fr] lg:gap-8">
            <Collage side="left" />

            <div className="py-6 text-center">
              <h2 className="text-[clamp(2rem,1.2rem+2.6vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
                Join the creative hub
                {" "}
                and production teams
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/login" className="!border-foreground !bg-foreground !text-background hover:!border-primary hover:!bg-primary hover:!text-primary-foreground">
                  Hire creatives
                </Button>
                <Button href="/signup" variant="outline" className="!border-border">
                  Get hired
                </Button>
              </div>
            </div>

            <Collage side="right" />
          </div>
        </div>
      </section>
    </main>
  );
}
