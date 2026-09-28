import { Faq } from "@/components/ui/Faq";
import { homeFaq } from "@/lib/data";

// Two columns: oversized heading left, accordion right (The Hub FAQ layout).
export function FaqSection({
  items = homeFaq,
  className = "section-y",
  maxWidth = "max-w-6xl",
}: {
  items?: { q: string; a: string }[];
  className?: string;
  /** Optional width cap (e.g. "max-w-6xl") to match a page's own container. */
  maxWidth?: string;
}) {
  return (
    <section id="faq" className={className}>
      <div className="shell">
        <div className={`mx-auto grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16 ${maxWidth}`}>
          <h2 className="text-hero">
            Good to know
          </h2>
          <Faq items={items} />
        </div>
      </div>
    </section>
  );
}
