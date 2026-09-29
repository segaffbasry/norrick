import { Archivo, Bebas_Neue, Big_Shoulders, Bricolage_Grotesque, Inter, Instrument_Sans, Schibsted_Grotesk, Syne } from "next/font/google";

// Display: Archivo with its width axis, so headlines can run wide and heavy like
// the Norrick wordmark (Acumin Wide). Accent: Bebas Neue.
export const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
export const bebasNeue = Bebas_Neue({ variable: "--font-bebas-neue", subsets: ["latin"], weight: "400", style: "normal", display: "swap" });
// Body: clean and neutral.
export const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

// Typeface options under review (see lib/type-options.ts). Declaring them only
// adds @font-face rules; browsers download a file when a page actually uses it.
export const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"], display: "swap" });
export const syne = Syne({ variable: "--font-syne", subsets: ["latin"], display: "swap" });
export const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"], axes: ["wdth"], display: "swap" });
export const bigShoulders = Big_Shoulders({ variable: "--font-big-shoulders", subsets: ["latin"], display: "swap" });
export const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"], display: "swap" });

export const fontVariables = [archivo, bebasNeue, inter, bricolage, syne, instrumentSans, bigShoulders, schibsted]
  .map((font) => font.variable)
  .join(" ");
