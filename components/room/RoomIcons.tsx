import type { AssetKind } from "@/lib/room";

const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
type P = { className?: string };

export const FolderIcon = ({ className = "size-5" }: P) => <svg {...base} className={className}><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /></svg>;
export const FolderPlus = ({ className = "size-5" }: P) => <svg {...base} className={className}><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zM12 11v6M9 14h6" /></svg>;
export const UploadIcon = ({ className = "size-5" }: P) => <svg {...base} className={className}><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V15" /></svg>;
export const Plus = ({ className = "size-4" }: P) => <svg {...base} className={className}><path d="M12 5v14M5 12h14" /></svg>;
export const Close = ({ className = "size-5" }: P) => <svg {...base} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const More = ({ className = "size-5" }: P) => <svg {...base} className={className}><circle cx="5.5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="18.5" cy="12" r="1" fill="currentColor" /></svg>;
export const ChevronLeft = ({ className = "size-5" }: P) => <svg {...base} className={className}><path d="m14.5 6-6 6 6 6" /></svg>;
export const ChevronRight = ({ className = "size-5" }: P) => <svg {...base} className={className}><path d="m9.5 6 6 6-6 6" /></svg>;
export const Grip = ({ className = "size-4" }: P) => <svg {...base} className={className}><circle cx="9" cy="6" r=".9" fill="currentColor" /><circle cx="15" cy="6" r=".9" fill="currentColor" /><circle cx="9" cy="12" r=".9" fill="currentColor" /><circle cx="15" cy="12" r=".9" fill="currentColor" /><circle cx="9" cy="18" r=".9" fill="currentColor" /><circle cx="15" cy="18" r=".9" fill="currentColor" /></svg>;
export const LinkIcon = ({ className = "size-5" }: P) => <svg {...base} className={className}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>;
export const Star = ({ className = "size-4", filled = false }: P & { filled?: boolean }) => <svg {...base} fill={filled ? "currentColor" : "none"} className={className}><path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" /></svg>;
export const Eye = ({ className = "size-4" }: P) => <svg {...base} className={className}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>;
export const Trash = ({ className = "size-4" }: P) => <svg {...base} className={className}><path d="M4.5 7h15M10 7V5h4v2M6.5 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4L17.5 7" /></svg>;

export function KindIcon({ kind, className = "size-5" }: { kind: AssetKind | "link"; className?: string }) {
  switch (kind) {
    case "image":
      return <svg {...base} className={className}><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m4 17 5-4.5 4 3.5 2.5-2 4.5 3.5" /></svg>;
    case "video":
      return <svg {...base} className={className}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10.5 5-3v9l-5-3z" /></svg>;
    case "audio":
      return <svg {...base} className={className}><path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" /></svg>;
    case "document":
      return <svg {...base} className={className}><path d="M6.5 3.5h7l4 4v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1zM13.5 3.5v4h4M9 12.5h6M9 16h6" /></svg>;
    case "link":
      return <LinkIcon className={className} />;
    default:
      return <svg {...base} className={className}><path d="M6.5 3.5h7l4 4v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1zM13.5 3.5v4h4" /></svg>;
  }
}
