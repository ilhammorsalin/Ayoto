import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center text-center select-none", className)}>
      <span
        className={cn(
          "font-overcame text-2xl tracking-[0.25em] leading-none transition-colors duration-300",
          light ? "text-white" : "text-foreground"
        )}
      >
        AYOTO
      </span>
      <span
        className={cn(
          "font-montserrat-el text-[0.55rem] tracking-[0.4em] leading-none mt-1 transition-colors duration-300",
          light ? "text-white/80" : "text-muted-foreground"
        )}
      >
        FURNITURE
      </span>
    </div>
  );
}
