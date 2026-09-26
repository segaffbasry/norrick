import { jobs, roleLabel, type JobPost } from "@/lib/data";

// Job detail content for /jobs/[id]. Placeholder copy; built from the JobPost
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
      `Placeholder: about ${job.company}. Describe the company, what it makes, and the kind of people it works with.`,
      job.blurb,
    ],
    how: [
      "Placeholder: describe how the role works: the schedule, how projects are staffed, and the expected time commitment.",
      "Placeholder: describe how applicants are reviewed and what happens after you apply.",
    ],
    requirements: [
      "Placeholder: relevant credits or a reel that shows your best work",
      "Placeholder: comfort working in fast-paced, collaborative environments",
      "Placeholder: availability for the production dates",
      "Placeholder: clear, friendly communication with the whole team",
    ],
    tags: [role, ...job.roles.map(roleLabel), ...job.categories.split(",").map((t) => t.trim())],
    info: ["Fluent in English", `${job.openRoles} open ${job.openRoles === 1 ? "role" : "roles"}`],
  };
}
