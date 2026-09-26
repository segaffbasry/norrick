import type { Block, LegalDoc } from "@/lib/legal";
import { draftNotice } from "@/lib/legal";

const body = "text-[1.125rem] leading-[1.75] text-copy";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "ul") {
          return (
            <ul key={i} className={`${body} mt-4 list-disc space-y-2 pl-6 marker:text-muted`}>
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        const style =
          b.style === "emphasis"
            ? "font-semibold italic text-foreground"
            : b.style === "caps"
              ? "font-semibold text-foreground"
              : "";
        return (
          <p key={i} className={`${body} mt-4 ${style}`}>
            {b.text}
          </p>
        );
      })}
    </>
  );
}

// Long-form legal document (GoFractional layout): huge title, "Last updated",
// intro paragraphs, then numbered sections. One readable column, no TOC.
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main>
      <div className="shell py-12 md:py-20">
        <div className="max-w-4xl">
          <h1 className="text-[clamp(3rem,1.2rem+6.5vw,6rem)] font-normal leading-[1] tracking-[-0.04em]">{doc.title}</h1>
          <p className="mt-8 text-body text-muted">Last updated: {doc.updated}</p>

          <p className="mt-6 rounded-card bg-primary-soft px-5 py-4 text-small text-primary">{draftNotice}</p>

          <div className="mt-6">
            <Blocks blocks={doc.intro} />
          </div>

          {doc.sections.map((section, i) => (
            <section key={section.title} className="mt-12">
              <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] font-normal leading-tight tracking-[-0.02em]">
                {i + 1}.&nbsp; {section.title}
              </h2>
              <Blocks blocks={section.blocks} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
