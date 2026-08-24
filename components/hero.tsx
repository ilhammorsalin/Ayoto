import Link from "next/link";
import heroVideo from "@/Assets/ayoto hd.mp4";

export function Hero() {
  return (
    <section className="relative w-full h-dvh overflow-hidden bg-foreground">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute bottom-12 left-6 md:left-12 max-w-lg z-10 pointer-events-none">
        <h1 className="font-serif text-xl md:text-2xl text-white drop-shadow-md tracking-wide">
          Designed for quiet living.
        </h1>
      </div>

      <Link
        href="/collections/living-room"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 inline-block px-8 py-3 border border-white text-white text-sm tracking-wider transition-colors hover:bg-white hover:text-black"
      >
        Browse Collection
      </Link>
    </section>
  );
}
