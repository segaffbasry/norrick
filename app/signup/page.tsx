import type { Metadata } from "next";
import { AuthShell } from "@/components/sections/AuthShell";
import { AuthForm } from "@/components/sections/AuthForm";

export const metadata: Metadata = {
  title: "Sign up | Norrick",
  // Design preview, no auth behind it yet: kept out of search and unlinked
  // (the site links to the live sign-in, see lib/auth-links.ts).
  robots: { index: false, follow: false },
  description: "Create your Norrick account.",
};

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
