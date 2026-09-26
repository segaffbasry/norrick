import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Norrick",
  description: "The terms that apply to your use of Norrick.",
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
