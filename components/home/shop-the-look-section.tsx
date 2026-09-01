"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import RoomStageImg from '@/Assets/catalogue/img122.jpg';
import CacheImg from '@/Assets/Furniture/Center table/Cache.png';
import ViennaImg from '@/Assets/Furniture/Bed/Vienna (King).png';
import OglioImg from '@/Assets/Furniture/divan/Oglio.png';
import OpalineImg from '@/Assets/Furniture/Lounge Chair/Opaline.png';

interface HotspotItem {
  id: number;
  top: string;
  left: string;
  name: string;
  category: string;
  material: string;
  price: string;
  description: string;
  image: typeof CacheImg;
  href: string;
}

const hotspots: HotspotItem[] = [
  {
    id: 1,
    top: '60%',
    left: '15%',
    name: 'Classic Bedside Table',
    category: 'Nightstand & Tables',
    material: 'Solid Oak Wood',
    price: '৳15,000',
    description: 'Clean architectural lines and organic wood grains that blend naturally with contemporary bedroom suites.',
    image: CacheImg,
    href: '/products/cache',
  },
  {
    id: 2,
    top: '40%',
    left: '45%',
    name: 'Vienna Platform Bed',
    category: 'Bedroom Suite',
    material: 'Premium Upholstery & Teak',
    price: '৳75,000',
    description: 'Low-profile architectural platform bed tailored in plush tactile fabric for a deeply restful haven.',
    image: ViennaImg,
    href: '/products/vienna',
  },
  {
    id: 3,
    top: '75%',
    left: '55%',
    name: 'Upholstered Leg-Rester',
    category: 'Benches & Ottomans',
    material: 'Linen Blend Cushion',
    price: '৳22,500',
    description: 'An elegant end-of-bed accent offering generous relaxation support and sophisticated bespoke detailing.',
    image: OglioImg,
    href: '/products/oglio',
  },
  {
    id: 4,
    top: '55%',
    left: '85%',
    name: 'Bedroom Lounge Sofa',
    category: 'Living & Lounge',
    material: 'Bouclé Fabric',
    price: '৳38,000',
    description: 'Curved contouring and cloud-like bouclé upholstery creating an intimate, serene seating nook.',
    image: OpalineImg,
    href: '/products/opaline',
  },
];

export function ShopTheLookSection() {
  const [activeHotspotId, setActiveHotspotId] = useState<number | null>(null);

  const activeItem = hotspots.find((spot) => spot.id === activeHotspotId);

  return (
    <section className="w-full bg-[#E0AFA0] py-4 md:py-6">
      <div className="w-full px-0 flex flex-col gap-4">
        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center text-center text-[#463F3A]">
          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-4 py-2">
            <span
              className="w-4 h-3 sm:w-5 sm:h-4 md:w-7 md:h-5 bg-current shrink-0"
              style={{
                maskImage: "url('/left.png')",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: "url('/left.png')",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
              aria-hidden="true"
            />
            <h2 className="relative z-10 text-[32px] md:text-[44px] lg:text-[52px] leading-[0.9] font-euro uppercase tracking-wider text-center">
              Shop the Look
            </h2>
            <span
              className="w-4 h-3 sm:w-5 sm:h-4 md:w-7 md:h-5 bg-current shrink-0"
              style={{
                maskImage: "url('/right.png')",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: "url('/right.png')",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Interactive Main Stage & Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
          {/* Left Column: 16:9 Interactive Image aligned to left margin */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full aspect-video overflow-hidden bg-[#2c2825]">
              <Image
                src={RoomStageImg}
                alt="Curated Room Stage"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 67vw"
              />

              {/* Hotspot Pins */}
              {hotspots.map((spot) => {
                const isActive = activeHotspotId === spot.id;

                return (
                  <div
                    key={spot.id}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: spot.top, left: spot.left }}
                    onMouseEnter={() => setActiveHotspotId(spot.id)}
                    onClick={() => setActiveHotspotId(spot.id)}
                  >
                    <button
                      type="button"
                      aria-label={`View ${spot.name}`}
                      className={`relative flex items-center justify-center transition-transform duration-300 focus:outline-none ${
                        isActive ? 'scale-125' : 'hover:scale-110'
                      }`}
                    >
                      {/* Outer pulse */}
                      <span
                        className={`absolute inline-flex h-9 w-9 rounded-full transition-opacity duration-300 ${
                          isActive
                            ? 'bg-white opacity-80 animate-ping'
                            : 'bg-[#463F3A] opacity-40 group-hover:opacity-75'
                        }`}
                      />
                      {/* Middle ring */}
                      <span
                        className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                          isActive
                            ? 'bg-[#463F3A] border-white text-white shadow-lg'
                            : 'bg-white/90 border-[#463F3A] text-[#463F3A] shadow-md hover:bg-white'
                        }`}
                      >
                        <span className="text-[11px] font-bold font-mono">
                          {spot.id}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Details of Highlighted Item */}
          <div className="lg:col-span-4 flex flex-col h-full min-h-[420px] lg:min-h-0">
            <div className="w-full h-full bg-white p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeItem ? (
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col h-full justify-between gap-3"
                  >
                    {/* Top Meta */}
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-[#F4F3EE] pb-2 mb-2">
                        <span className="text-xs uppercase tracking-widest font-semibold text-[#8A817C]">
                          {activeItem.category}
                        </span>
                        <span className="text-xs font-mono font-medium px-2 py-0.5 bg-[#F4F3EE] text-[#463F3A] rounded">
                          Pin 0{activeItem.id}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-[#463F3A] leading-tight truncate">
                          {activeItem.name}
                        </h3>
                        <span className="text-lg sm:text-xl font-bold font-serif text-[#463F3A] shrink-0">
                          {activeItem.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#8A817C] mt-0.5 font-medium">
                        Finish: {activeItem.material}
                      </p>
                    </div>

                    {/* Product Photo Showcase - Expanded to fill border */}
                    <div className="relative flex-1 w-full min-h-[150px] sm:min-h-[180px] bg-[#F4F3EE] overflow-hidden my-1">
                      <Image
                        src={activeItem.image}
                        alt={activeItem.name}
                        fill
                        className="object-cover transition-none"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>

                    {/* Description & Action */}
                    <div className="space-y-3">
                      <p className="text-xs text-[#8A817C] leading-relaxed line-clamp-2">
                        {activeItem.description}
                      </p>

                      <Link
                        href={activeItem.href}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#463F3A] text-white py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#2d2825] transition-colors group"
                      >
                        <span>Explore Piece</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center justify-center text-center h-full w-full py-8 px-4 gap-5"
                  >
                    <div className="space-y-4 max-w-sm flex flex-col items-center">
                      <h4 className="font-euro uppercase tracking-wider text-[32px] sm:text-[42px] lg:text-[48px] text-[#463F3A] leading-[0.9] flex flex-col items-center gap-1">
                        <span>Interactive</span>
                        <span>Lookbook</span>
                      </h4>
                      <p className="text-sm sm:text-base text-[#8A817C] leading-relaxed font-light max-w-xs">
                        Hover over any numbered pin on the room image to view
                        specifications, materials, and pricing.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
