import { Fragment } from "react";
import { personas, roles, type RoleId } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export type Category = "all" | RoleId;

// One scrolling row of profile categories, grouped by craft with a hairline
// divider between groups (Filmmakers | Actors | Animation pipeline | Crew).
export function CategoryChips({
  value,
  onChange,
  allLabel = "Featured",
}: {
  value: Category;
  onChange: (next: Category) => void;
  allLabel?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Category"
      className="-mx-4 flex min-w-0 flex-1 items-center overflow-x-auto px-4 md:mx-0 md:px-0 md:[mask-image:linear-gradient(to_right,black_calc(100%-4rem),transparent)] [scrollbar-width:none]"
    >
      <Button variant="chip" active={value === "all"} aria-pressed={value === "all"} onClick={() => onChange("all")}>
        {allLabel}
      </Button>
      {personas.map((craft) => (
        <Fragment key={craft.id}>
          <span aria-hidden className="mx-2 h-5 w-px shrink-0 bg-border" />
          {roles
            .filter((r) => r.craft === craft.id)
            .map((r) => (
              <Button key={r.id} variant="chip" active={value === r.id} aria-pressed={value === r.id} onClick={() => onChange(r.id)}>
                {r.label}
              </Button>
            ))}
        </Fragment>
      ))}
    </div>
  );
}
