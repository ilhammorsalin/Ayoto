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
    <section className="w-full bg-background py-20">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="text-[#8A817C] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Curated Environments
          </span>
          <div className="relative inline-flex items-center justify-center mb-8 px-4 py-4">
            <h2 className="relative z-10 text-[35px] md:text-[50px] lg:text-[60px] leading-[0.9] font-serif text-[#463F3A] text-center">
              Browse by <span className="italic font-bold">Category</span>
            </h2>
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <Image src="/Frame 4.png" alt="" fill className="object-contain grayscale opacity-20 scale-[1.8] md:scale-[2.2]" />
            </div>
          </div>
          <Link 
            href="/collections" 
            className="text-[#E0AFA0] hover:text-[#463F3A] transition-colors font-medium"
          >
            View All Spaces &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
