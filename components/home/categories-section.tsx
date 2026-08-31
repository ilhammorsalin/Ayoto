import Image from 'next/image';
import Link from 'next/link';

import FrameoImg from '@/Assets/Furniture/sofas/Frameo.png';
import AlbaImg from '@/Assets/Furniture/Bed/Alba.png';
import MonolithImg from '@/Assets/Furniture/Center table/Monolith.png';
import QuestaImg from '@/Assets/Furniture/tv cabinet/Questa.png';
import TuscanyImg from '@/Assets/Furniture/Lounge Chair/Tuscany.png';

const categories = [
  { name: 'Sofas', count: '24 Pieces', image: FrameoImg, href: '/collections/sofas' },
  { name: 'Beds', count: '18 Pieces', image: AlbaImg, href: '/collections/beds' },
  { name: 'Center Tables', count: '12 Pieces', image: MonolithImg, href: '/collections/center-tables' },
  { name: 'TV Cabinets', count: '8 Pieces', image: QuestaImg, href: '/collections/tv-cabinets' },
  { name: 'Lounge Chairs', count: '16 Pieces', image: TuscanyImg, href: '/collections/lounge-chairs' },
];

export function CategoriesSection() {
  return (
    <section className="w-full bg-background py-2">
      <div className="w-full px-2 md:px-4">
        <div className="flex flex-col items-center justify-center text-center mb-2 text-[#463F3A]">
          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-4 py-4">
            <span
              className="w-8 h-6 sm:w-10 sm:h-8 md:w-14 md:h-10 bg-current shrink-0"
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
            <h2 className="relative z-10 text-[42px] md:text-[58px] lg:text-[70px] leading-[0.9] font-bodoni-bold uppercase tracking-wider text-center">
              Browse by Category
            </h2>
            <span
              className="w-8 h-6 sm:w-10 sm:h-8 md:w-14 md:h-10 bg-current shrink-0"
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={category.href} 
              className="group relative block overflow-hidden aspect-[3/4]"
            >
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(70,63,58,0.8)] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="text-xl font-serif text-[#F4F3EE] mb-1">{category.name}</h3>
                <p className="text-sm text-[#BCB8B1]">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
