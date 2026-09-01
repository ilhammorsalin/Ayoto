import Image from 'next/image';
import Link from 'next/link';
import ParabolaImg from '@/Assets/Furniture/Center table/Parabola.png';
import ParabolaAlt from '@/Assets/Furniture/Center table/Parabola (1).png';
import LoomImg from '@/Assets/Furniture/sofas/Loom.png';
import LoomAlt from '@/Assets/Furniture/sofas/Loom (1).png';
import VizioImg from '@/Assets/Furniture/tv cabinet/Vizio.png';
import VizioAlt from '@/Assets/Furniture/tv cabinet/Vizio (1).png';
import SerenoImg from '@/Assets/Furniture/Bed/Sereno.png';
import SerenoAlt from '@/Assets/Furniture/Bed/Sereno (King).png';

const products = [
  {
    id: 1,
    name: 'Parabola',
    category: 'Center Table',
    price: '$1,200',
    image: ParabolaImg,
    imageAlt: ParabolaAlt,
  },
  {
    id: 2,
    name: 'Loom',
    category: 'Sofa',
    price: '$3,400',
    image: LoomImg,
    imageAlt: LoomAlt,
  },
  {
    id: 3,
    name: 'Vizio',
    category: 'TV Cabinet',
    price: '$2,100',
    image: VizioImg,
    imageAlt: VizioAlt,
  },
  {
    id: 4,
    name: 'Sereno',
    category: 'Bed',
    price: '$2,800',
    image: SerenoImg,
    imageAlt: SerenoAlt,
  },
];

export function NewItemsSection() {
  return (
    <section className="w-full bg-white py-2">
      <div className="w-full px-0">
        <div className="flex flex-col items-center justify-center text-center mb-2 text-[#463F3A]">
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
              New Items
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

        <div className="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F3EE] mb-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-none group-hover:scale-105 group-hover:opacity-0"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                <Image
                  src={product.imageAlt}
                  alt={`${product.name} alternate`}
                  fill
                  className="object-cover transition-none opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#463F3A]">
                  New
                </div>
              </div>
              <div className="mt-1.5 px-2 sm:px-3 flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-base sm:text-xl md:text-2xl text-[#463F3A] leading-none text-left truncate">
                  {product.name}
                </h3>
                <span className="text-[#8A817C]/50 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase select-none leading-none shrink-0 text-right">
                  {product.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
