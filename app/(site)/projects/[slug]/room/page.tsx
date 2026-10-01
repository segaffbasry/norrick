import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductionRoom, type RoomTab } from "@/components/room/ProductionRoom";
import { isProjectSlug, projectSlugs, projectTitles } from "@/lib/projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]/room">): Promise<Metadata> {
  const { slug } = await params;
  if (!isProjectSlug(slug)) return {};
  return { title: `${projectTitles[slug]}, production room | Norrick`, robots: { index: false, follow: false } };
}

export default async function RoomPage({ params, searchParams }: PageProps<"/projects/[slug]/room">) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  const { tab, folder } = await searchParams;
  const initialTab: RoomTab = tab === "tasks" || tab === "showcase" ? tab : "assets";
  return (
    <main id="main-content">
      <ProductionRoom key={slug} slug={slug} initialTab={initialTab} initialFolder={typeof folder === "string" ? folder : null} />
    </main>
  );
}
