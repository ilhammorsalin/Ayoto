"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    title: "Selected Materials",
    description: "Honest wood, natural fiber, stone that has known the earth.",
    img: "/images/vienna.jpg",
  },
  {
    title: "Designed in Chittagong",
    description: "Where the line between craft and intention disappears.",
    img: "/images/parabola.png",
  },
  {
    title: "Handcrafted by Skilled Artisans",
    description: "Their hands remember what machines were never taught.",
    img: "/images/loom.png",
  },
  {
    title: "Finished with Precision",
    description: "Every joint considered, every surface softened.",
    img: "/images/verve.png",
  },
  {
    title: "Made to Last Generations",
    description: "We design for the family that will inherit what you choose today.",
    img: "/images/monolith.png",
  },
];

export function Craftsmanship() {
  return (
    <section className="w-full bg-background py-24 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col gap-24 md:gap-40">
        
        {/* Section Intro */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">The Process</h2>
          <p className="text-muted-foreground font-sans">
            It takes time to build something that lasts forever. Our approach relies on patience, 
            natural materials, and a deep respect for the craft.
          </p>
        </div>

        {/* Stages */}
        {STAGES.map((stage, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn(
                "flex flex-col md:items-center gap-6 md:gap-16",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2 relative aspect-video md:aspect-[4/5] bg-muted overflow-hidden">
                <Image
                  src={stage.img}
                  alt={stage.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text Container */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-muted-foreground font-sans text-xs tracking-[0.2em] uppercase mb-4 block">
                  Stage 0{index + 1}
                </span>
                <h3 className="font-serif text-2xl md:text-4xl mb-4">{stage.title}</h3>
                <p className="text-muted-foreground md:text-lg max-w-md">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
