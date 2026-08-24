"use client";

import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
  /** "sm" for cart panel items, "md" (default) for product page */
  size?: "sm" | "md";
}

export function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
}: QuantityControlProps) {
  const isMd = size === "md";

  return (
    <div
      className={cn(
        "inline-flex items-center  border border-border bg-background",
        isMd ? "h-11" : "h-8",
        className
      )}
    >
      <button
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          "flex items-center justify-center text-foreground/60 transition-colors",
          "hover:text-primary disabled:cursor-not-allowed disabled:opacity-30",
          isMd ? "w-11 h-11" : "w-8 h-8"
        )}
      >
        <Minus className={isMd ? "size-3.5" : "size-3"} />
      </button>

      <span
        className={cn(
          "select-none tabular-nums text-foreground font-medium",
          isMd ? "w-10 text-sm text-center" : "w-7 text-xs text-center"
        )}
      >
        {value}
      </span>

      <button
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          "flex items-center justify-center text-foreground/60 transition-colors",
          "hover:text-primary disabled:cursor-not-allowed disabled:opacity-30",
          isMd ? "w-11 h-11" : "w-8 h-8"
        )}
      >
        <Plus className={isMd ? "size-3.5" : "size-3"} />
      </button>
    </div>
  );
}
