// Norrick logo, taken from NORRICK LOGO VARIATIONS 1.pdf (variation 1, the
// "Acumin Variable concept (edited)" lettering). Drawn as inline SVG paths that
// use currentColor, so the colour comes from the text colour of the parent:
// text-primary for the brand purple, text-foreground for black, text-white on dark.
// Static files with fixed colours live in /public/brand.
const wordPaths = [
  "M39.28 0.15L39.28 35.54L28.57 35.54L10.87 16.94L10.99 35.54L0.00 35.54L0.00 0.15L10.14 0.15L10.77 0.82L28.58 19.77L28.58 0.15L39.28 0.15Z",
  "M58.42 21.67C60.07 25.95 62.84 28.41 68.76 26.13C74.55 23.89 74.62 20.34 73.06 16.29C71.16 11.39 68.64 9.37 62.79 11.63C57.52 13.66 56.62 17.00 58.42 21.67ZM85.38 11.49C88.49 19.54 84.89 28.22 71.14 33.52C58.73 38.31 49.60 34.68 46.47 26.55C43.54 18.97 46.32 10.03 60.61 4.51C72.30 0.00 82.15 3.12 85.38 11.49Z",
  "M118.10 21.91C123.92 21.13 127.61 17.26 127.61 11.67C127.61 6.38 126.60 1.56 117.43 1.56L94.14 1.56L94.14 8.58L107.19 8.58L114.34 8.65C116.21 8.93 116.25 13.76 114.39 14.10L107.43 14.22L94.14 14.26L94.14 21.62L116.54 35.37L130.71 35.37L108.28 21.91C108.28 21.91 115.68 22.10 118.10 21.91Z",
  "M156.29 21.91C162.11 21.13 165.80 17.26 165.80 11.67C165.80 6.38 164.79 1.56 155.62 1.56L132.33 1.56L132.33 8.58L145.38 8.58L152.53 8.65C154.40 8.93 154.44 13.76 152.58 14.10L145.62 14.22L132.33 14.26L132.33 21.62L154.73 35.37L168.90 35.37L146.47 21.91C146.47 21.91 153.87 22.10 156.29 21.91Z",
  "M175.55 1.56H190.34V35.36H175.55Z",
  "M235.47 22.88C233.84 32.15 226.44 36.23 215.50 36.23C202.48 36.23 195.23 29.07 195.23 18.37C195.23 8.91 201.14 0.70 215.93 0.70C229.18 0.70 234.80 6.89 235.61 13.85L220.78 13.85C220.39 11.45 219.43 5.97 215.98 5.97C212.47 5.97 210.79 12.17 210.79 18.32C210.79 22.74 211.61 30.57 215.98 30.57C219.38 30.57 220.44 25.28 220.97 22.88L235.47 22.88Z",
  "M239.45 1.56L254.19 1.56L254.19 14.67C256.98 10.35 263.08 5.88 266.01 1.56L280.50 1.56L267.73 15.20L281.18 35.37L266.17 35.37L257.70 23.65L254.19 27.35L254.19 35.37L239.45 35.37L239.45 1.56Z",
];
const WORD = { w: 281.18, h: 38.31 };

const markPaths = [
  "M16.85 14.31C20.94 13.76 23.53 11.04 23.53 7.11C23.53 3.39 22.83 0.00 16.38 0.00L0.00 0.00L0.00 4.93L9.18 4.93L14.20 4.98C15.52 5.18 15.55 8.58 14.24 8.82L9.35 8.90L0.00 8.93L0.00 14.11L15.75 23.77L25.72 23.77L9.94 14.31C9.94 14.31 15.14 14.45 16.85 14.31Z",
  "M43.70 14.31C47.80 13.76 50.39 11.04 50.39 7.11C50.39 3.39 49.68 0.00 43.23 0.00L26.86 0.00L26.86 4.93L36.03 4.93L41.06 4.98C42.37 5.18 42.40 8.58 41.09 8.82L36.20 8.90L26.86 8.93L26.86 14.11L42.61 23.77L52.57 23.77L36.80 14.31C36.80 14.31 42.00 14.45 43.70 14.31Z",
];
const MARK = { w: 52.57, h: 23.77 };

interface LogoProps {
  className?: string;
  /** Accessible name. Omit when the logo sits next to the brand name as decoration. */
  title?: string;
}

function Svg({ box, paths, className, title }: LogoProps & { box: { w: number; h: number }; paths: string[] }) {
  return (
    <svg
      viewBox={`0 0 ${box.w} ${box.h}`}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** The NORRICK wordmark. Size it with a height class, e.g. "h-5 w-auto". */
export function Wordmark(props: LogoProps) {
  return <Svg box={WORD} paths={wordPaths} {...props} />;
}

/** The double-R mark, for small spaces (avatars, favicon, badges). */
export function LogoMark(props: LogoProps) {
  return <Svg box={MARK} paths={markPaths} {...props} />;
}
