import Image from 'next/image';
import Link from 'next/link';
import CubicaImg from '@/Assets/Furniture/Center table/Cubica.png';
import CubicaAlt from '@/Assets/Furniture/Center table/Cubica (1).png';
import EmbraceImg from '@/Assets/Furniture/Lounge Chair/Embrace.png';
import EmbraceAlt from '@/Assets/Furniture/Lounge Chair/Embrace (1).png';
import MonacoImg from '@/Assets/Furniture/sofas/Monaco.png';
import MonacoAlt from '@/Assets/Furniture/sofas/Monaco (Single Seater).png';
import ViennaImg from '@/Assets/Furniture/Bed/Vienna.jpg';
import ViennaAlt from '@/Assets/Furniture/Bed/Vienna (King).png';
import CircaDuoImg from '@/Assets/Furniture/Center table/Circa Duo.png';
import CircaDuoAlt from '@/Assets/Furniture/Center table/Circa Duo (1).png';

const trendingProducts = [
  {
    id: 1,
    name: 'Cubica',
    category: 'Center Table',
    image: CubicaImg,
    imageAlt: CubicaAlt,
  },
  {
    id: 2,
    name: 'Embrace',
    category: 'Lounge Chair',
    image: EmbraceImg,
    imageAlt: EmbraceAlt,
  },
  {
    id: 3,
    name: 'Monaco',
    category: 'Sofa',
    image: MonacoImg,
    imageAlt: MonacoAlt,
  },
  {
    id: 4,
    name: 'Vienna',
    category: 'Bed',
    image: ViennaImg,
    imageAlt: ViennaAlt,
  },
  {
    id: 5,
    name: 'Circa Duo',
    category: 'Center Table',
    image: CircaDuoImg,
    imageAlt: CircaDuoAlt,
  },
];

export function TrendingSection() {
  return (
    <section className="w-full bg-[#463F3A] py-2">
      <div className="w-full px-2 md:px-4">
        <div className="flex flex-col items-center justify-center text-center mb-2 text-[#F4F3EE]">
          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-4 py-4">
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
              Trending Pieces
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

        {/* Horizontal scrollable flex container for trending products */}
        <div className="flex overflow-x-auto gap-2 pb-8 snap-x snap-mandatory hide-scrollbar">
          {trendingProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="group flex-none w-[280px] md:w-[350px] snap-start"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#F4F3EE] mb-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-none group-hover:scale-105 group-hover:opacity-0"
                />
                <Image
                  src={product.imageAlt}
                  alt={`${product.name} alternate`}
                  fill
                  className="object-cover transition-none opacity-0 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#8A817C] text-xs font-semibold tracking-wider uppercase">
                  {product.category}
                </span>
                <h3 className="font-serif text-2xl text-[#F4F3EE]">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
