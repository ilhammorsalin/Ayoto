export function Hero() {
  return (
    <section className="relative w-full h-dvh overflow-hidden bg-foreground">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/ayoto-hd.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute bottom-12 left-6 md:left-12 max-w-lg z-10 pointer-events-none">
        <h1 className="font-serif text-xl md:text-2xl text-white drop-shadow-md tracking-wide">
          Designed for quiet living.
        </h1>
      </div>
    </section>
  );
}
