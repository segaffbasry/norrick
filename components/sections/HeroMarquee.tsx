import Image from "next/image";
import { LogoMark } from "@/components/ui/Logo";

// The hero's right side: four columns of cards that drift up and down forever
// (alternating direction, each at its own speed). Every column holds one set of
// cards twice, and the track slides by exactly half its height, so the loop is
// seamless. Pure CSS: no JS, paused on hover, still for reduced motion.
// It is decorative, so it is hidden from screen readers.
type Photo = { kind: "photo"; src: string; ratio: string };
type Stat = { kind: "stat"; value: string; label: string; tone: string };
type Brand = { kind: "brand"; ratio: string };
type Item = Photo | Stat | Brand;

const photo = (src: string, ratio: string): Photo => ({ kind: "photo", src, ratio });
const stat = (value: string, label: string, tone: string): Stat => ({ kind: "stat", value, label, tone });
const brand = (ratio = "aspect-square"): Brand => ({ kind: "brand", ratio });

const portrait = "aspect-[3/4]";
const square = "aspect-square";
const wide = "aspect-[4/3]";

const columns: { items: Item[]; seconds: number; reverse: boolean }[] = [
  {
    seconds: 70,
    reverse: false,
    items: [
      photo("/competitions/breakthrough/ofure-aidelomo.jpg", portrait),
      stat("21", "Roles, from director to sound", "bg-tile text-foreground"),
      photo("/about/about-studio.jpg", wide),
      photo("/competitions/breakthrough/eric-hanson.jpg", square),
      photo("/competitions/breakthrough-actor-showcase.jpg", wide),
      brand(),
    ],
  },
  {
    seconds: 85,
    reverse: true,
    items: [
      photo("/about/about1.jpg", portrait),
      photo("/about/about-event.jpg", wide),
      brand(portrait),
      photo("/competitions/breakthrough/mi-cha-el-west.jpg", portrait),
      stat("Global", "Worldwide community", "bg-primary-soft text-primary"),
      photo("/competitions/7-stages-animation.jpg", square),
    ],
  },
  {
    seconds: 78,
    reverse: false,
    items: [
      photo("/about/about2.jpg", wide),
      photo("/competitions/breakthrough/eric-hanson.jpg", portrait),
      stat("3", "Competitions to enter", "bg-tile text-foreground"),
      photo("/competitions/48-hours-vertical-film.jpg", wide),
      photo("/competitions/breakthrough/ofure-aidelomo.jpg", square),
      photo("/about/about-group.jpg", wide),
    ],
  },
  {
    seconds: 92,
    reverse: true,
    items: [
      photo("/about/about-group.jpg", portrait),
      photo("/competitions/breakthrough/mi-cha-el-west.jpg", square),
      photo("/about/about-studio.jpg", portrait),
      brand(),
      photo("/competitions/7-stages-animation.jpg", wide),
      stat("$1,800", "In competition prizes", "bg-primary text-primary-foreground"),
    ],
  },
];

function Card({ item }: { item: Item }) {
  const base =
    "relative mb-4 block w-full shrink-0 overflow-hidden rounded-card shadow-[0_12px_28px_-14px_rgb(20_23_31/0.28),0_2px_6px_-2px_rgb(20_23_31/0.08)]";
  if (item.kind === "photo") {
    return (
      <div className={`${base} ${item.ratio} bg-placeholder`}>
        <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 12vw, 25vw" className="object-cover" />
      </div>
    );
  }
  if (item.kind === "brand") {
    return (
      <div className={`${base} ${item.ratio} grid place-items-center bg-primary text-white`}>
        <LogoMark className="w-1/2" />
      </div>
    );
  }
  return (
    <div className={`${base} flex aspect-[4/3] flex-col justify-end p-4 ${item.tone}`}>
      <span className="font-display text-[clamp(1.5rem,1rem+1.4vw,2.5rem)] font-medium leading-none tracking-[-0.03em]">{item.value}</span>
      <span className="mt-1.5 text-small opacity-80">{item.label}</span>
    </div>
  );
}

export function HeroMarquee() {
  // The frame has its own height (fixed on small screens; on large ones it is as
  // tall as the whole hero section, so the cards bleed past the section padding
  // to the top and bottom edges). The cards sit in an absolutely positioned layer so their
  // long tracks never stretch the hero.
  return (
    <div
      data-hero-media
      aria-hidden
      className="hero-marquee-mask group relative -mx-4 h-[30rem] overflow-hidden px-4 lg:h-[calc(100svh-5rem)] lg:min-h-[34rem]"
    >
      <div className="absolute inset-x-4 inset-y-0 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`hero-col min-w-0 ${i > 1 ? "hidden sm:block" : ""}`}
            style={{
              animationDelay: `${200 + i * 140}ms`,
              "--from": col.reverse ? "-80px" : "80px",
            } as React.CSSProperties}
          >
            <div
              className="hero-marquee-track group-hover:[animation-play-state:paused] motion-reduce:!animate-none"
              style={{ animationDuration: `${col.seconds}s`, animationDirection: col.reverse ? "reverse" : "normal" }}
            >
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {col.items.map((item, n) => (
                    <Card key={n} item={item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
