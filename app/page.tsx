"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Hero } from "@/components/hero";
import { CollectionsGrid } from "@/components/collections-grid";
import { Craftsmanship } from "@/components/craftsmanship";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* 
        Preload the hero content underneath the loading screen so there's no jump cut. 
        Visibility is controlled by the LoadingScreen overlaying everything else (via z-index).
      */}
      <div className="w-full flex flex-col">
        <Hero />
        <CollectionsGrid />
        <Craftsmanship />
      </div>
    </>
  );
}
