"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import haloImage from "@/Assets/Furniture/Center table/Halo.png";

const STATEMENTS = [
  "We begin where it matters — with the material itself. Honest wood, natural fiber, stone that has known the earth.",
  "Each piece takes shape in Dhaka, where the line between craft and intention disappears.",
  "Our makers don't follow templates. Their hands remember what machines were never taught.",
  "We don't design for seasons. We design for the family that will inherit what you choose today.",
];

interface StatementProps {
  text: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}

function Statement({ text, index, progress, total }: StatementProps) {
  // Each statement has a specific window of progress where it is fully visible.
  // We divide the 0-1 progress into `total` segments.
  const start = index / total;
  const end = (index + 1) / total;
  const peak = start + (end - start) / 2;

  // Fade in as we approach peak, fade out as we pass it
  const opacity = useTransform(
    progress,
    [start, peak - 0.1, peak + 0.1, end],
    [0, 1, 1, 0]
  );

  // Move up from bottom, settle in center, continue moving up
  const y = useTransform(
    progress,
    [start, peak, end],
    [100, 0, -100]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12 pointer-events-none"
    >
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-center max-w-4xl text-foreground leading-relaxed">
        {text}
      </h2>
    </motion.div>
  );
}

export function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background blur and opacity transform
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.3, 0.3, 0.1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background w-full">
      {/* Sticky Container for the Narrative Viewport */}
      <div className="sticky top-0 w-full h-dvh flex items-center justify-center overflow-hidden">
        
        {/* Visual Atmosphere Background */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 z-0 select-none pointer-events-none"
        >
          <Image
            src={haloImage}
            alt="Wood texture atmosphere"
            fill
            className="object-cover blur-sm"
            priority
          />
        </motion.div>

        {/* Narrative Statements Overlay */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto">
          {STATEMENTS.map((text, idx) => (
            <Statement
              key={idx}
              text={text}
              index={idx}
              progress={scrollYProgress}
              total={STATEMENTS.length}
            />
          ))}
        </div>

        {/* Stats Overlay integrated smoothly */}
        <StatsOverlay progress={scrollYProgress} />
      </div>
    </section>
  );
}

function StatsOverlay({ progress }: { progress: MotionValue<number> }) {
  // Reveal stats when scroll progress is past 40%, hide near 90%
  const opacity = useTransform(
    progress,
    [0.3, 0.45, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none z-20 hidden md:block max-w-7xl mx-auto"
    >
      {/* Top Left Stat */}
      <div className="absolute top-32 left-12 flex flex-col gap-1">
        <span className="font-serif text-xl">40+ Collections</span>
        <span className="font-sans text-sm text-muted-foreground">1,200+ Handcrafted Pieces</span>
      </div>

      {/* Top Right Stat */}
      <div className="absolute top-32 right-12 flex flex-col gap-1 text-right">
        <span className="font-serif text-xl">8 Years of Trust</span>
        <span className="font-sans text-sm text-muted-foreground">500+ Completed Projects</span>
      </div>
    </motion.div>
  );
}
