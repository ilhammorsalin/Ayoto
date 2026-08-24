"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable body scroll during loading screen
    document.body.style.overflow = "hidden";

    const duration = 1600; // 1.6 seconds total
    const intervalTime = 16; // ~60fps updates
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            document.body.style.overflow = "";
            onComplete();
          }, 500); // Fade duration buffer
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Animated Logo Container */}
          <div className="flex select-none">
            {"AYOTO".split("").map((letter, i) => {
              const start = (i / 5) * 100;
              const lp = Math.min(1, Math.max(0, (progress - start) / 20));

              return (
                <span
                  key={i}
                  className="font-overcame text-5xl tracking-[0.2em]"
                  style={{
                    color: `color-mix(in oklch, var(--color-muted-foreground) ${(1 - lp) * 100}%, var(--color-primary))`,
                    opacity: 0.15 + lp * 0.85,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
