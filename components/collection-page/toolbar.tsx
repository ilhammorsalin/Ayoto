"use client";

import { cn } from "@/lib/utils";

/**
 * Toolbar with density toggle only.
 * FILTER and sort dropdown are intentionally omitted — no filterable/sortable data yet.
 */
export function Toolbar({
  columns,
  onChangeColumns,
}: {
  columns: 3 | 4;
  onChangeColumns: (c: 3 | 4) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      {/* Left side: reserved for future FILTER button and sort dropdown */}
      {/* TODO: Add FILTER button and sort dropdown when product data supports filtering/sorting */}
      <div />

      {/* Right side: density toggle */}
      <div className="flex items-center gap-1">
        <button
          aria-label="3 columns"
          onClick={() => onChangeColumns(3)}
          className={cn(
            "w-8 h-8 flex items-center justify-center text-xs font-medium transition-colors",
            columns === 3
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          3
        </button>
        <button
          aria-label="4 columns"
          onClick={() => onChangeColumns(4)}
          className={cn(
            "w-8 h-8 flex items-center justify-center text-xs font-medium transition-colors",
            columns === 4
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          4
        </button>
      </div>
    </div>
  );
}
