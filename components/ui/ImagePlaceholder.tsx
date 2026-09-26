// Stand-in for a photo: flat grey block with an image icon. No tint, gradient
// or glow. The outer box sets no display/position, so callers control layout
// (absolute, hidden, block...). Swap for <Image /> when assets exist.
export function ImagePlaceholder({
  className = "",
  glyph = true,
}: {
  className?: string;
  glyph?: boolean;
}) {
  return (
    <div aria-hidden className={`overflow-hidden bg-placeholder ${className}`}>
      {glyph && (
        <span className="grid size-full place-items-center">
          <svg
            viewBox="0 0 24 24"
            className="size-[28%] max-h-10 max-w-10 min-h-4 min-w-4 text-placeholder-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2.5" />
            <circle cx="9" cy="10" r="1.6" />
            <path d="M4 18l5.5-5 4 3.5 3-2.5 3.5 3" />
          </svg>
        </span>
      )}
    </div>
  );
}
