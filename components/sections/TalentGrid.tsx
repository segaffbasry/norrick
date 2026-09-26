"use client";

import { useState } from "react";
import type { Talent } from "@/lib/data";
import { TalentCard } from "@/components/ui/TalentCard";
import { ProfileSheet } from "@/components/sections/ProfileSheet";

// Grid of talent cards; "View profile" opens the profile side sheet.
export function TalentGrid({
  items,
  className = "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
}: {
  items: Talent[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = items.find((t) => t.id === openId);

  return (
    <>
      <ul className={className}>
        {items.map((t) => (
          <li key={t.id}>
            <TalentCard talent={t} onView={() => setOpenId(t.id)} />
          </li>
        ))}
      </ul>

      {open && <ProfileSheet talent={open} onClose={() => setOpenId(null)} />}
    </>
  );
}
