import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { competitions } from "@/lib/competitions";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Competitions | Norrick",
  description: "Team up, make something in a set time, and get seen.",
};

export default function CompetitionsPage() {
  return (
    <main>
      <section className="section-y">
        <div className="shell">
          <p className="eyebrow">Competitions</p>
          <h1 className="mt-3 text-hero">Make something. Get seen.</h1>
          <p className="mt-3 max-w-2xl text-lead text-muted">Team up, make something in a set time, and let the community see it.</p>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/competitions/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-background card-hover"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-placeholder">
                    <Image src={c.cover.src} alt={c.cover.alt} fill sizes="(min-width: 1024px) 30rem, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <Badge tone="soft" className="self-start">
                      {c.status}
                    </Badge>
                    <span className="mt-4 text-heading leading-tight">{c.title}</span>
                    <span className="mt-2 text-body text-muted">{c.summary}</span>
                    <span className="mt-auto pt-6 font-display text-body font-medium text-primary">
                      {c.cta} <span aria-hidden>&rarr;</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
