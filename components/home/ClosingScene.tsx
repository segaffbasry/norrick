import Link from "next/link";
import s from "@/app/(site)/home.module.css";

export function ClosingScene() {
  return (
    <section data-header="dark" className={s.invitation} aria-labelledby="closing-title">
      <p>Have an idea? Invite people to collaborate on it, first project or fiftieth.</p>
      <h2 id="closing-title" className={s.sectionTitle}>Have an idea? Find your people.</h2>
      <Link href="https://umdb.org/collaborate" className={s.pill}>Collaborate</Link>
    </section>
  );
}
