import type { Metadata } from "next";
import { AuthShell } from "@/components/sections/AuthShell";
import { AuthForm } from "@/components/sections/AuthForm";

export const metadata: Metadata = {
  title: "Sign up | Norrick",
  description: "Create your Norrick account.",
};

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
