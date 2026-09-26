import { finalCta } from "@/lib/data";
import { Button } from "@/components/ui/Button";

// Full-width rounded banner, like Contra's "Find the right creative" block.
export function FinalCTA() {
  return (
    <section id="final-cta" className="section-y">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 rounded-card bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <h2 className="text-hero">{finalCta.headline}</h2>
            <p className="mt-3 text-lead opacity-80">{finalCta.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Inverted for contrast on the primary field. */}
            <Button
              href="/signup"
              className="!border-background !bg-background !text-primary hover:!bg-primary-soft"
            >
              {finalCta.primary}
            </Button>
            <Button
              href="#process"
              variant="outline"
              className="!border-primary-foreground !bg-transparent !text-primary-foreground hover:!bg-primary-foreground/10"
            >
              {finalCta.secondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
