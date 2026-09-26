import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Motion } from "@/components/ui/Motion";

// Headings: tight, neutral grotesk (stand-in for Contra's licensed GT Standard).
// Swap this one import to change the heading voice; --font-display picks it up.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Body: clean and neutral.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Norrick",
  description:
    "Norrick connects filmmakers, actors, animators, and crew. Find your people, make the work.",
  applicationName: "Norrick",
  openGraph: {
    title: "Norrick",
    description:
      "Norrick connects filmmakers, actors, animators, and crew. Find your people, make the work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Norrick",
    description:
      "Norrick connects filmmakers, actors, animators, and crew. Find your people, make the work.",
  },
};

export const viewport: Viewport = {
  // Keep in sync with --color-background in globals.css.
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the script below adds a class to <html> before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${inter.variable} h-full`}
    >
      <head>
        {/* Arms the soft appear animations (see components/ui/Motion.tsx) before first paint,
            unless the visitor prefers reduced motion. Disarms itself if Motion never starts. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){d.classList.add('gsap-ready');setTimeout(function(){if(!d.hasAttribute('data-motion-init'))d.classList.remove('gsap-ready')},2500)}}catch(e){}})();",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <RouteProgress />
        <SmoothScroll />
        <Motion />
        {children}
      </body>
    </html>
  );
}
