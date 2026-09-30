import type { ReactNode } from "react";
import Link from "next/link";
import { heroFilm } from "@/lib/home";
import { Film } from "@/components/home/Film";
import { Wordmark } from "@/components/ui/Logo";

// Shared layout for /login and /signup (no site header/footer): logo top-left,
// one centred card, form on the left and a film panel with the partners on the right.
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-svh bg-surface">
      <div className="shell pt-6">
        <Link href="/" aria-label="Norrick, home" className="inline-flex text-foreground">
          <Wordmark className="h-[22px] w-auto" />
        </Link>
      </div>

      <div className="shell py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-panel bg-background md:grid-cols-2 md:divide-x md:divide-border">
          {children}

          <aside aria-label="Norrick" className="relative isolate hidden min-h-[36rem] flex-col justify-between overflow-hidden bg-ink p-12 text-white md:flex">
            <Film clip={heroFilm} eager className="absolute inset-0 -z-10 size-full object-cover opacity-70" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-black/30" />
            <span aria-hidden />
            <div>
              <p className="font-display text-[clamp(2.4rem,3.6vw,3.6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] [font-stretch:125%]">
                Your chapter <span className="font-accent font-normal uppercase not-italic tracking-[0.01em] text-primary-light [font-stretch:100%]">starts here.</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
