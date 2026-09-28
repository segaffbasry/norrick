import type { Metadata, Viewport } from "next";
import { Archivo, Bebas_Neue, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Motion } from "@/components/ui/Motion";

// Display: Archivo with its width axis, so headlines can run wide and heavy like
// the Norrick wordmark (Acumin Wide). Accent: Bebas Neue.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
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
    "A creative home for filmmakers, actors, animators and crew. Bring your idea, find your people, and make something together.",
  applicationName: "Norrick",
  openGraph: {
    title: "Welcome to Norrick. Your chapter starts here.",
    description:
      "A creative home for filmmakers, actors, animators and crew. Bring your idea, find your people, and make something together.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Norrick. Your chapter starts here.",
    description:
      "A creative home for filmmakers, actors, animators and crew. Bring your idea, find your people, and make something together.",
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
      className={`${archivo.variable} ${bebasNeue.variable} ${inter.variable} h-full`}
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
