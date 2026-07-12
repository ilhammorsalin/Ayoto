import { ScrollNarrative } from "@/components/scroll-narrative";
import { LegacySection } from "@/components/legacy-section";
import { NavigationHub } from "@/components/navigation-hub";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ayoto — Philosophy & Craftsmanship",
  description: "Discover the philosophy behind Ayoto. Built in Chittagong, designed for quiet living.",
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col bg-background">
      {/* 
        Scroll Narrative handles its own viewport heights and sticky container.
        It contains the statements, stats overlay, and atmospheric background.
      */}
      <ScrollNarrative />
      
      {/* Legacy & Recognition */}
      <LegacySection />
      
      {/* Final CTA / Navigation Hub */}
      <NavigationHub />
    </div>
  );
}
