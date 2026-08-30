"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import RoomStageImg from '@/Assets/catalogue/img122.jpg';
import CacheImg from '@/Assets/Furniture/Center table/Cache.png';
import OpalineImg from '@/Assets/Furniture/Lounge Chair/Opaline.png';
import KivoImg from '@/Assets/Furniture/Center table/Kivo.png';
import OglioImg from '@/Assets/Furniture/divan/Oglio.png';
import HaloImg from '@/Assets/Furniture/Center table/Halo.png';

const hotspots = [
  { id: 1, top: '60%', left: '15%', name: 'Classic Bedside Table', material: 'Oak Wood', price: '৳15,000' },
  { id: 2, top: '40%', left: '45%', name: 'Vienna Platform Bed', material: 'Premium Upholstery', price: '৳75,000' },
  { id: 3, top: '75%', left: '55%', name: 'Upholstered Leg-Rester', material: 'Linen Blend', price: '৳22,500' },
  { id: 4, top: '55%', left: '85%', name: 'Bedroom Lounge Sofa', material: 'Bouclé', price: '৳38,000' },
];

const catalogue = [
  { name: 'Cache', price: '৳28,000', image: CacheImg },
  { name: 'Opaline', price: '৳38,500', image: OpalineImg },
  { name: 'Kivo', price: '৳42,000', image: KivoImg },
  { name: 'Oglio', price: '৳55,000', image: OglioImg },
  { name: 'Halo', price: '৳35,000', image: HaloImg },
];

export function ShopTheLookSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#E0AFA0] py-0">
      <div className="w-full px-6 md:px-12 flex flex-col gap-0">
        <div className="flex flex-col items-center justify-center text-center">

          <div className="relative inline-flex items-center justify-center mb-8 px-4 py-4">
            <h2 className="relative z-10 text-[35px] md:text-[50px] lg:text-[60px] leading-[0.9] font-serif text-[#463F3A] text-center">
              Shop the <span className="italic font-bold text-[#F4F3EE]">Look</span>
            </h2>
            {/* Frame 6 commented out
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <Image src="/Frame 6.png" alt="" fill className="object-contain grayscale opacity-20 scale-[1.8] md:scale-[2.2]" />
            </div>
            */}
          </div>
        </div>

        {/* Room Stage */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={RoomStageImg}
            alt="Room Stage"
            fill
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />

          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute z-10"
              style={{ top: spot.top, left: spot.left }}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <button className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#463F3A] group">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#463F3A] opacity-50"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </button>

              {activeHotspot === spot.id && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white p-4 shadow-lg w-48 text-left animate-in fade-in slide-in-from-bottom-2">
                  <h4 className="font-serif text-[#463F3A] font-medium text-sm">{spot.name}</h4>
                  <p className="text-xs text-[#8A817C] my-1">{spot.material}</p>
                  <p className="text-sm font-semibold text-[#E0AFA0] mb-2">{spot.price}</p>
                  <Link href="#" className="text-xs text-[#463F3A] underline font-medium hover:text-[#E0AFA0]">
                    View Piece &rarr;
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Catalogue Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {catalogue.map((item, idx) => (
            <Link href="#" key={idx} className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative aspect-square mb-4 bg-[#F4F3EE] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <h4 className="font-serif text-[#463F3A] text-lg">{item.name}</h4>
              <p className="text-[#8A817C] text-sm font-medium">{item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
