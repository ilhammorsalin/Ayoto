import Image from "next/image";
import albaKing from "@/Assets/Furniture/Bed/Alba (King).png";
import albaHover from "@/Assets/Furniture/Bed/Alba.png";
import halo1 from "@/Assets/Furniture/Center table/Halo (1).png";
import haloHover from "@/Assets/Furniture/Center table/Halo.png";
import questa from "@/Assets/Furniture/tv cabinet/Questa.png";
import questaHover from "@/Assets/Furniture/tv cabinet/Questa (1).png";

const ITEMS = [
  {
    id: "upper-1",
    type: "photo",
    desktopClass: "sm:col-span-2 sm:row-span-7 sm:col-start-1 sm:row-start-1",
    src: albaKing,
    hoverSrc: albaHover,
    alt: "Alba King bed",
    hoverTitle: "Alba King Bed",
    hoverSubtext: "A modern masterpiece of comfort.",
  },
  {
    id: "upper-2",
    type: "photo",
    desktopClass: "sm:col-span-2 sm:row-span-4 sm:col-start-3 sm:row-start-1",
    src: halo1,
    hoverSrc: haloHover,
    alt: "Halo center table",
    hoverTitle: "Halo Center Table",
    hoverSubtext: "Elegant curves for your living space.",
  },
  {
    id: "upper-3",
    type: "photo",
    desktopClass: "sm:col-span-3 sm:row-span-4 sm:col-start-5 sm:row-start-1",
    src: questa,
    hoverSrc: questaHover,
    alt: "Questa TV cabinet",
    hoverTitle: "Questa TV Cabinet",
    hoverSubtext: "Sleek storage meets minimalist design.",
  },
  {
    id: "upper-4",
    type: "text",
    desktopClass: "sm:col-span-3 sm:row-span-3 sm:col-start-3 sm:row-start-5",
    heading: "Designed for Living",
    subtext: "Each piece tells a story of craft, material, and intention.",
  },
  {
    id: "upper-5",
    type: "video",
    desktopClass: "sm:col-span-2 sm:row-span-3 sm:col-start-6 sm:row-start-5",
  },
];

export function UpperGrid() {
  return (
    <div className="gap-1 grid grid-cols-1 auto-rows-[50vh] sm:auto-rows-auto sm:grid-cols-7 sm:grid-rows-7 h-full">
      {ITEMS.map((item) => (
        <div key={item.id} className={`group relative overflow-hidden bg-muted ${item.desktopClass}`}>
          {item.type === "photo" && "src" in item && item.src ? (
            <>
              <Image
                src={item.src}
                alt={item.alt ?? ""}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
              />
              {"hoverSrc" in item && item.hoverSrc && (
                <Image
                  src={item.hoverSrc as any}
                  alt={(item as any).hoverTitle ?? item.alt ?? ""}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
                />
              )}
              {("hoverTitle" in item || "hoverSubtext" in item) && (
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <h3 className="font-serif text-2xl text-white transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">{(item as any).hoverTitle}</h3>
                  <p className="text-white/90 text-sm mt-1 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0 delay-75">{(item as any).hoverSubtext}</p>
                </div>
              )}
            </>
          ) : item.type === "text" ? (
            <div className="flex flex-col justify-center items-center p-8 h-full text-center">
              <h3 className="mb-2 font-serif text-2xl">{item.heading}</h3>
              <p className="max-w-xs text-muted-foreground text-sm">{item.subtext}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="font-sans text-muted-foreground text-lg tracking-widest">VIDEO</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
