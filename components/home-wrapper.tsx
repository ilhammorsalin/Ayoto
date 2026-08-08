"use client";

import { useState } from "react";
import { LoadingScreen } from "./loading-screen";

export function HomeWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {children}
    </>
  );
}
