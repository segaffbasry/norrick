import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPublic } from "@/components/room/ProjectPublic";
import { isProjectSlug, projectSlugs, projectTitles } from "@/lib/projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isProjectSlug(slug)) return {};
  // Example project: kept out of search until rooms are real.
  return { title: `${projectTitles[slug]} | Norrick`, description: "A project in production on Norrick.", robots: { index: false, follow: false } };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  return (
    <main id="main-content">
      <ProjectPublic slug={slug} />
    </main>
  );
}
