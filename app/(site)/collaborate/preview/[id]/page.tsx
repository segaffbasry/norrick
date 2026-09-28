import Link from "next/link";
import { notFound } from "next/navigation";
import { previewCalls } from "@/lib/preview-calls";

export const metadata = { title: "Preview call | Norrick", robots: { index: false, follow: false } };
export default async function PreviewCallPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const call = previewCalls.find((item) => item.id === id);
  if (!call) notFound();
  return <main id="main-content" className="shell py-20">
    <p className="eyebrow">Preview call</p>
    <h1 className="mt-4 text-title">{call.project}</h1>
    <p className="mt-6 max-w-2xl text-lead">Seeking {call.role.toLowerCase()}.</p>
    <p className="mt-6 max-w-xl text-muted">This is example content for the design pass, not an active recruitment post.</p>
    <div className="mt-8 flex gap-6"><Link href="/" className="underline underline-offset-4">Back to Norrick</Link><a href="https://umdb.org/collaborate" className="underline underline-offset-4">Browse live calls</a></div>
  </main>;
}
