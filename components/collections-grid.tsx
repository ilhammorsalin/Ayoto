import Image from "next/image";
import { Button } from "@/components/ui/button";

const COLLECTIONS = [
  {
    id: "kaze",
    name: "Kaze Lounge Chair",
    material: "Oak & Linen",
    price: "৳48,000",
    lifestyleImg: "/images/tuscany.png",
    productImg: "/images/opaline.png",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
  {
    id: "sora",
    name: "Sora Dining Table",
    material: "Solid Walnut",
    price: "৳112,000",
    lifestyleImg: "/images/davenport.png",
    productImg: "/images/kivo.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
  },
  {
    id: "nagi",
    name: "Nagi Shelving System",
    material: "Ash & Steel",
    price: "৳76,000",
    lifestyleImg: "/images/vizio.png",
    productImg: "/images/questa.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
  },
  {
    id: "ren",
    name: "Ren Daybed",
    material: "White Oak & Wool",
    price: "৳95,000",
    lifestyleImg: "/images/sereno.png",
    productImg: "/images/firenze.png",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
  },
];

export function CollectionsGrid() {
  return (
    <section className="m-2">
      <div className="flex md:flex-row flex-col justify-between md:items-end">
        {/* <h2 className="font-serif text-3xl md:text-5xl">Selected Pieces</h2>
        <p className="max-w-sm text-muted-foreground text-sm">
          A curated selection of our most enduring designs. Built for longevity,
          finished by hand.
        </p> */}
      </div>

      <div className="md:gap-8 grid grid-cols-1 md:grid-cols-3 auto-rows-[800px]">
        {COLLECTIONS.map((item) => (
          <div
            key={item.id}
            className={`group relative overflow-hidden flex flex-col ${item.colSpan} ${item.rowSpan}`}
          >
            {/* Image Container */}
            <div className="relative flex-grow bg-muted w-full h-full overflow-hidden">
              {/* Lifestyle Image (Default) */}
              <Image
                src={item.lifestyleImg}
                alt={`${item.name} in room`}
                fill
                className="md:group-hover:opacity-0 object-cover transition-opacity duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Product Image (Revealed on Desktop Hover) */}
              <Image
                src={item.productImg}
                alt={`${item.name} isolated`}
                fill
                className="absolute inset-0 opacity-0 md:group-hover:opacity-100 object-cover transition-opacity duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Desktop Hover Overlay Info */}
              <div className="hidden absolute inset-0 md:flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 p-8 transition-opacity duration-500">
                <h3 className="mb-1 font-serif text-white text-2xl">{item.name}</h3>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1 font-sans text-white/80 text-sm">
                    <span>{item.material}</span>
                    <span>{item.price}</span>
                  </div>
                  <Button className="bg-primary hover:bg-accent px-6 rounded-none text-primary-foreground">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Persistent Info Strip */}
            <div className="md:hidden flex flex-col gap-1 pt-4 pb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif text-lg">{item.name}</h3>
                <span className="text-sm">{item.price}</span>
              </div>
              <span className="font-sans text-muted-foreground text-xs">
                {item.material}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
