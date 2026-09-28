import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";
import styles from "./FooterWordmark.module.css";

/** A quiet, near-black signature that blends into the footer. */
export function FooterWordmark() {
  return (
    <Link href="/" aria-label="Norrick, home" className={styles.link}>
      <Wordmark className={styles.wordmark} />
    </Link>
  );
}
