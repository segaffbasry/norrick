import type { Metadata } from "next";
import { CollaborationStart, type Intent } from "@/components/sections/CollaborationStart";
import { Film } from "@/components/home/Film";
import { arc } from "@/lib/home";
import s from "./collaborate.module.css";

export const metadata: Metadata = {
  title: "Find your people | Norrick",
  description: "An idea to make, a project to join, or people to meet. Find your starting point on Norrick.",
};

export default async function CollaboratePage({ searchParams }: PageProps<"/collaborate">) {
  const { intent } = await searchParams;
  const initialIntent: Intent = intent === "join" || intent === "explore" ? intent : "make";
  return (
    <main id="main-content" data-scenes className={s.page}>
      <section data-header="dark" className={s.top} aria-labelledby="collab-title">
        <Film clip={arc[1].clip} eager className={s.film} />
        <div className={s.topInner}>
          <p className={s.label}>Collaborate</p>
          <h1 id="collab-title" className={s.wide}>
            Find your <em>kind of people.</em>
          </h1>
          <p className={s.lede}>Some chapters start with an idea. Others start with a conversation. Where does yours begin?</p>
        </div>
      </section>
      <section className={s.body} aria-label="Find your starting point">
        <CollaborationStart key={initialIntent} initialIntent={initialIntent} />
      </section>
    </main>
  );
}
