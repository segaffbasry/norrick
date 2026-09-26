import type { Metadata } from "next";
import { AuthShell } from "@/components/sections/AuthShell";
import { AuthForm } from "@/components/sections/AuthForm";

export const metadata: Metadata = {
  title: "Log in | Norrick",
  description: "Log in to Norrick.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <AuthForm mode="login" />
    </AuthShell>
  );
}
