import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <div className={cn("select-none", className)}>
      <span
        className={cn(
          "font-overcame text-[2rem] tracking-[0.25em] leading-none transition-colors duration-300",
          light ? "text-white" : "text-foreground",
        )}
      >
        AYOTO
      </span>
    </div>
  );
}
