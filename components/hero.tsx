"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import heroImg from "@/Assets/catalogue/img268.jpg";
import woodImg from "@/Assets/hero-assets/wood.jpg";
import quietImg from "@/Assets/hero-assets/quiet.jpg";
import craftImg from "@/Assets/hero-assets/craft.jpg";

const slides = [
  {
    image: heroImg,
    alt: "Ayoto — Timeless Craft",
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
    image: woodImg,
    alt: "Ayoto — Natural Harmony",
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
    image: quietImg,
    alt: "Ayoto — Quiet Spaces",
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
    image: craftImg,
    alt: "Ayoto — Modern Heritage",
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const active = slides[currentSlide];

  return (
    <section className="w-full aspect-[4/5] md:aspect-[18/6] h-auto flex flex-col md:flex-row overflow-hidden p-0">
      {/* LEFT COLUMN: Simultaneous Instant Cut Image */}
      <div className="flex-1 relative w-full h-full overflow-hidden min-h-0 bg-[#2c2825]">
        <Image
          key={currentSlide}
          src={active.image}
          alt={active.alt}
          fill
          priority
          className="object-cover transition-none"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>

      {/* RIGHT COLUMN: Simultaneous Instant Cut Solid Color Card */}
      <div
        onClick={handleNextSlide}
        className={`w-full aspect-square md:w-auto md:h-full md:aspect-square flex-shrink-0 p-4 sm:p-5 md:p-5 lg:p-6 cursor-pointer select-none transition-none ${active.bg} ${active.text}`}
      >
        <div className="w-full h-full border-[1.5px] border-current flex flex-col items-center justify-center p-4 sm:p-6 md:p-6 lg:p-8">
          <div className="w-full flex flex-col items-center text-center max-w-xs md:max-w-sm">
            <span className="block mb-2 md:mb-3 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold opacity-85">
              {active.eyebrow}
            </span>
            <h1 className="font-euro uppercase tracking-wider text-[26px] sm:text-[32px] md:text-[36px] lg:text-[44px] leading-[0.9] mb-2 md:mb-3">
              {active.headline}
            </h1>
            <p className="text-xs md:text-sm opacity-90 mb-4 md:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {active.subtext}
            </p>
            <Link
              href={active.ctaLink}
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-[#F4F3EE] ${active.ctaTextCol} text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-bold transition-opacity hover:opacity-90 duration-300 shadow-md`}
            >
              {active.ctaText} &rarr;
            </Link>

            {/* Slide indicators */}
            <div className="flex gap-2 mt-5 md:mt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`h-1 transition-all duration-200 cursor-pointer ${
                    idx === currentSlide
                      ? "w-6 bg-current opacity-100"
                      : "w-2 bg-current opacity-35 hover:opacity-75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
