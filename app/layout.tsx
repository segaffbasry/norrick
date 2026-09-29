import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { fontVariables } from "./fonts";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Motion } from "@/components/ui/Motion";
import { TypeSwitcher } from "@/components/ui/TypeSwitcher";

// Typeface preview: ?type=a|b|c switches the whole site to an option under
// review and remembers it in this browser; ?type=off goes back. Runs before
// first paint so the page never flashes the other type.
const typePreview =
  "(function(){try{var q=new URLSearchParams(location.search).get('type'),k='norrick-type';if(q==='off')localStorage.removeItem(k);else if(/^[abc]$/.test(q||''))localStorage.setItem(k,q);var t=localStorage.getItem(k);if(t)document.documentElement.setAttribute('data-type',t)}catch(e){}})();";

export const metadata: Metadata = {
  title: "Norrick",
  description:
    "A creative hub for filmmakers, actors, animators and crew. Bring your idea, find your people, and make something together.",
  applicationName: "Norrick",
  openGraph: {
    title: "Your chapter starts here.",
    description:
      "A creative hub for filmmakers, actors, animators and crew. Bring your idea, find your people, and make something together.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your chapter starts here.",
    description:
      "A creative hub for filmmakers, actors, animators and crew. Bring your idea, find your people, and make something together.",
  },
};

export const viewport: Viewport = {
  // Norrick brand purple (locked palette: #6a21f2, black, white); matches --color-primary.
  themeColor: "#6a21f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the script below adds a class to <html> before hydration.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fontVariables} h-full`}
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
        <script dangerouslySetInnerHTML={{ __html: typePreview }} />
      </head>
      <body className="flex min-h-full flex-col">
        <RouteProgress />
        <SmoothScroll />
        <Motion />
        {children}
        <TypeSwitcher />
      </body>
    </html>
  );
}
