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
          <div className="flex flex-col items-center gap-6 select-none">
            <span
              className="font-overcame text-5xl tracking-[0.2em] transition-colors duration-100 ease-out"
              style={{
                color: `color-mix(in oklch, var(--color-primary) ${progress}%, var(--color-accent))`,
              }}
            >
              AYOTO
            </span>

            {/* Progress Bar Container */}
            <div className="w-36 h-[2px] bg-border/40 relative overflow-hidden rounded-full">
              <div
                className="h-full absolute left-0 top-0 transition-all duration-100 ease-out rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: `color-mix(in oklch, var(--color-foreground) ${progress}%, var(--color-border))`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
