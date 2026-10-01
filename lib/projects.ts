// Projects that have a public page and a production room on this site. Until
// the room API ships there is one worked example, kept in the visitor's browser.
export const projectSlugs = ["last-bus-home"] as const;
export const projectTitles: Record<(typeof projectSlugs)[number], string> = { "last-bus-home": "Last Bus Home" };

export function isProjectSlug(slug: string): slug is (typeof projectSlugs)[number] {
  return (projectSlugs as readonly string[]).includes(slug);
}
