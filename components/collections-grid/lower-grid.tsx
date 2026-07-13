import Image from "next/image";
import oglio from "@/Assets/Furniture/divan/Oglio.png";
import loom1 from "@/Assets/Furniture/sofas/Loom (1).png";
import opaline from "@/Assets/Furniture/Lounge Chair/Opaline.png";
import kivo from "@/Assets/Furniture/Center table/Kivo.png";
import serenoKing from "@/Assets/Furniture/Bed/Sereno (King).png";
import cache from "@/Assets/Furniture/Center table/Cache.png";

const ITEMS = [
  {
    id: "lower-1",
    type: "video",
    desktopClass: "lg:col-span-3 lg:row-span-4",
  },
  {
    id: "lower-2",
    type: "photo",
    desktopClass: "lg:col-span-3 lg:row-span-3 lg:row-start-8",
    src: opaline,
    alt: "Opaline lounge chair",
  },
  {
    id: "lower-3",
    type: "photo",
    desktopClass: "lg:col-span-2 lg:row-span-4 lg:col-start-4",
    src: loom1,
    alt: "Loom sofa",
  },
  {
    id: "lower-4",
    type: "photo",
    desktopClass: "lg:col-span-2 lg:row-span-5 lg:col-start-6",
    src: oglio,
    alt: "Oglio divan",
  },
  {
    id: "lower-5",
    type: "text",
    desktopClass: "lg:col-span-2 lg:row-span-3 lg:row-start-5",
    heading: "Built to Last",
    subtext: "Timeless forms crafted from natural materials.",
  },
  {
    id: "lower-6",
    type: "photo",
    desktopClass: "lg:col-span-3 lg:row-span-3 lg:col-start-3 lg:row-start-5",
    src: cache,
    alt: "Cache center table",
  },
  {
    id: "lower-7",
    type: "photo",
    desktopClass: "lg:col-span-2 lg:row-span-3 lg:col-start-4 lg:row-start-8",
    src: kivo,
    alt: "Kivo center table",
  },
  {
    id: "lower-8",
    type: "photo",
    desktopClass: "lg:col-span-2 lg:row-span-5 lg:col-start-6 lg:row-start-6",
    src: serenoKing,
    alt: "Sereno King bed",
  },
];

export function LowerGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:grid-rows-10 gap-1">
      {ITEMS.map((item) => (
        <div key={item.id} className={`relative overflow-hidden bg-muted ${item.desktopClass}`}>
          {item.type === "photo" && "src" in item && item.src ? (
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
            />
          ) : item.type === "text" ? (
            <div className="flex flex-col justify-center items-center p-8 text-center h-full">
              <h3 className="font-serif text-2xl mb-2">{item.heading}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{item.subtext}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-muted-foreground text-lg font-sans tracking-widest">VIDEO</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
