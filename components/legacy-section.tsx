export function LegacySection() {
  return (
    <section className="bg-background py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        
        {/* Column 1: In the Press */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-2xl border-b border-border/50 pb-4">In the Press</h3>
          <ul className="flex flex-col gap-4 font-sans text-muted-foreground">
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Architectural Digest — "Minimalism in South Asia"
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Monocle — "Dhaka's Craft Revival"
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Wallpaper* — "Quiet Design Awards 2024"
            </li>
          </ul>
        </div>

        {/* Column 2: The Makers */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-2xl border-b border-border/50 pb-4">The Makers</h3>
          <p className="font-sans text-muted-foreground leading-relaxed">
            Our workshop in Dhaka is home to second and third-generation woodworkers. 
            We pair their deep understanding of local materials with precise, modern 
            manufacturing techniques. We don't just build furniture; we preserve a legacy 
            of hand-craftsmanship that machines simply cannot replicate.
          </p>
        </div>

        {/* Column 3: Design Inspiration */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-2xl border-b border-border/50 pb-4">Design Inspiration</h3>
          <ul className="flex flex-col gap-4 font-sans text-muted-foreground">
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Japanese Wabi-Sabi
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Scandinavian Functionalism
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Local Natural Materials
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
