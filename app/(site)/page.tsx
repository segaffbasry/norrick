import { Hero } from "@/components/sections/Hero";
import { PersonaFilter } from "@/components/sections/PersonaFilter";
import { ClosingHero } from "@/components/sections/ClosingHero";
import { Competitions } from "@/components/sections/Competitions";
import { CraftCards } from "@/components/sections/CraftCards";
import { MeetSection } from "@/components/sections/MeetSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <MeetSection />
      <PersonaFilter />
      <CraftCards />
      <ProblemSection />
      <WorkGrid />
      <Competitions />
      <Testimonials />
      <ProcessSteps />
      <FaqSection />
      <FinalCTA />
      <ClosingHero />
    </main>
  );
}
