import { jobs, roleLabel, type JobPost } from "@/lib/data";

// Job detail content for /jobs/[id]. Sample listings; built from the JobPost
// list so cards and pages always agree.
const roleTitles: Record<string, string> = {
  j1: "Lead Actor",
  j2: "Character Animator",
  j3: "Director of Photography",
  j4: "Documentary Producer",
  j5: "Editor & Colourist",
  j6: "Writer-Director",
  j7: "Animation Pipeline Team",
};

export interface JobDetail extends JobPost {
  role: string;
  bannerTitle: string;
  bannerSubtitle: string;
  about: string[];
  how: string[];
  requirements: string[];
  tags: string[];
  info: string[];
}

export const jobIds = jobs.map((j) => j.id);

export function getJob(id: string): JobDetail | null {
  const job = jobs.find((j) => j.id === id);
  if (!job) return null;
  const role = roleTitles[job.id] ?? "Creative role";

  return {
    ...job,
    role,
    bannerTitle: `Apply to ${job.company}`,
    bannerSubtitle: `Join the team as ${role}`,
    about: [
      job.blurb,
      "This is a sample listing, shown to preview how projects look on Norrick while real posts are connected.",
    ],
    how: [
      "The project lead shares the schedule, how the crew comes together and the time it takes, right in the post.",
      "You apply with your profile and reel. The team reviews applications and messages the people they’d like to meet.",
    ],
    requirements: [
      "A reel or credits that show your best work",
      "Comfortable working in a fast-moving, collaborative crew",
      "Available for the production dates",
      "Clear, friendly communication with the whole team",
    ],
    tags: [role, ...job.roles.map(roleLabel), ...job.categories.split(",").map((t) => t.trim())],
    info: ["Fluent in English", `${job.openRoles} open ${job.openRoles === 1 ? "role" : "roles"}`],
  };
}
