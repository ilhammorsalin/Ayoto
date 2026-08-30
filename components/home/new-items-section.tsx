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
    <section className="w-full bg-white py-6">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="text-[#E0AFA0] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Just Arrived
          </span>
          <div className="relative inline-flex items-center justify-center mb-8 px-4 py-4">
            <h2 className="relative z-10 text-[35px] md:text-[50px] lg:text-[60px] leading-[0.9] font-serif text-[#463F3A] text-center">
              New <span className="italic font-bold">Items</span>
            </h2>
            {/* Frame 5 commented out
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <Image src="/Frame 5.png" alt="" fill className="object-contain grayscale opacity-20 scale-[1.8] md:scale-[2.2]" />
            </div>
            */}
          </div>
          <Link
            href="/collections"
            className="text-[#E0AFA0] hover:text-[#463F3A] transition-colors font-medium"
          >
            Shop New Arrivals &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4F3EE] mb-6">
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
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold tracking-wider uppercase text-[#463F3A]">
                  New
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#8A817C] text-xs font-semibold tracking-wider uppercase">
                  {product.category}
                </span>
                <div className="flex justify-between items-center mt-1">
                  <h3 className="font-serif text-2xl text-[#463F3A]">
                    {product.name}
                  </h3>
                  <span className="text-[#463F3A] font-medium">{product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
