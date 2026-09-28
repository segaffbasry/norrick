import { brand } from "@/lib/brand";

interface LogoProps { className?: string; title?: string }
function Svg({ art, className, title }: LogoProps & { art: typeof brand.wordmark }) {
  return <svg viewBox={`0 0 ${art.width} ${art.height}`} fill="currentColor" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} className={className}>{art.paths.map((d, index) => <path key={index} d={d} />)}</svg>;
}
export function Wordmark(props: LogoProps) { return <Svg art={brand.wordmark} {...props} />; }
export function LogoMark(props: LogoProps) { return <Svg art={brand.mark} {...props} />; }
