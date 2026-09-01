"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import heroImg from "@/Assets/catalogue/img268.jpg";

const slides = [
  {
    bg: "bg-[#463F3A]",
    text: "text-[#F4F3EE]",
    eyebrow: "Collection 2026",
    headline: "Timeless Craft",
    subtext: "Discover pieces that transcend trends and define quiet living.",
    ctaText: "Shop Collection",
    ctaLink: "/collections",
    ctaTextCol: "text-[#463F3A]",
  },
  {
    bg: "bg-[#E0AFA0]",
    text: "text-[#463F3A]",
    eyebrow: "Our Ethos",
    headline: "Natural Harmony",
    subtext: "Materials sourced with intention for your sanctuary.",
    ctaText: "Our Story",
    ctaLink: "/about",
    ctaTextCol: "text-[#E0AFA0]",
  },
  {
    bg: "bg-[#BCB8B1]",
    text: "text-[#463F3A]",
    eyebrow: "Curation",
    headline: "Quiet Spaces",
    subtext: "Furniture designed to foster reflection and calm.",
    ctaText: "View Lookbook",
    ctaLink: "/collections",
    ctaTextCol: "text-[#BCB8B1]",
  },
  {
    bg: "bg-[#8A817C]",
    text: "text-[#F4F3EE]",
    eyebrow: "The Workshop",
    headline: "Modern Heritage",
    subtext: "Generations of woodworking expertise, reimagined.",
    ctaText: "Meet the Makers",
    ctaLink: "/about",
    ctaTextCol: "text-[#8A817C]",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="w-full h-dvh min-h-[600px] flex flex-col md:flex-row overflow-hidden">
      {/* LEFT COLUMN: Fills remaining space */}
      <div className="flex-1 relative w-full h-full">
        <Image
          src={heroImg}
          alt="Ayoto — Furniture for quiet living"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 75vw"
        />
      </div>

      {/* RIGHT COLUMN: Perfect square */}
      <div
        onClick={handleNextSlide}
        className={`w-full aspect-square md:w-auto md:h-full md:aspect-square flex-shrink-0 p-4 md:p-6 cursor-pointer select-none transition-colors duration-0 ${active.bg} ${active.text}`}
      >
        <div className="w-full h-full border-[1.5px] border-current flex flex-col items-center justify-center p-8 md:p-12">
          <div className="w-full flex flex-col items-center text-center max-w-sm">
            <span className="block mb-4 text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">
              {active.eyebrow}
            </span>
            <h1 className="font-euro uppercase tracking-wider text-[34px] md:text-[50px] lg:text-[58px] leading-[0.9] mb-4">
              {active.headline}
            </h1>
            <p className="text-sm opacity-90 mb-8 leading-relaxed">
              {active.subtext}
            </p>
            <Link
              href={active.ctaLink}
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center justify-center px-6 py-3 bg-[#F4F3EE] ${active.ctaTextCol} text-[11px] uppercase tracking-[0.15em] font-bold transition-opacity hover:opacity-90 duration-300`}
            >
              {active.ctaText} &rarr;
            </Link>

            {/* Slide indicators */}
            <div className="flex gap-2 mt-12">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 ${idx === currentSlide ? "w-6 bg-current opacity-100" : "w-2 bg-current opacity-30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
