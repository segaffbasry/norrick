"use client";

import { useState } from "react";
import { jobs, roleLabel } from "@/lib/data";
import { CategoryChips, type Category } from "@/components/ui/CategoryChips";
import { JobCard } from "@/components/ui/JobCard";

// Filterable job board: category chips (every role a post hires for) + search.
export function JobDirectory({ initialRole = "all" }: { initialRole?: Category }) {
  const [category, setCategory] = useState<Category>(initialRole);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const items = jobs.filter(
    (j) =>
      (category === "all" || j.roles.includes(category)) &&
      (q === "" || `${j.company} ${j.blurb} ${j.categories} ${j.roles.map(roleLabel).join(" ")}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CategoryChips value={category} onChange={setCategory} allLabel="All jobs" />

        <label className="relative block shrink-0 md:w-72">
          <span className="sr-only">Search jobs</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by company or role"
            className="h-10 w-full rounded-pill border border-border bg-background pl-10 pr-4 text-small text-foreground placeholder:text-muted"
          />
        </label>
      </div>

      <p className="mt-6 text-small text-muted" aria-live="polite">
        {items.length} {items.length === 1 ? "job post" : "job posts"}
      </p>

      {items.length === 0 ? (
        <p className="mt-4 rounded-card bg-surface p-8 text-center text-body text-muted">No job posts match that yet.</p>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((j) => (
            <li key={j.id}>
              <JobCard job={j} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
