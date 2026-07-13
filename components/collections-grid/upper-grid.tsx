import Image from "next/image";
import albaKing from "@/Assets/Furniture/Bed/Alba (King).png";
import halo1 from "@/Assets/Furniture/Center table/Halo (1).png";
import questa from "@/Assets/Furniture/tv cabinet/Questa.png";

const ITEMS = [
  {
    id: "upper-1",
    type: "photo",
    desktopClass: "lg:col-span-2 lg:row-span-7",
    src: albaKing,
    alt: "Alba King bed",
  },
  {
    id: "upper-2",
    type: "photo",
    desktopClass: "lg:col-span-2 lg:row-span-4 lg:col-start-3",
    src: halo1,
    alt: "Halo center table",
  },
  {
    id: "upper-3",
    type: "photo",
    desktopClass: "lg:col-span-3 lg:row-span-4 lg:col-start-5",
    src: questa,
    alt: "Questa TV cabinet",
  },
  {
    id: "upper-4",
    type: "text",
    desktopClass: "lg:col-span-3 lg:row-span-3 lg:col-start-3 lg:row-start-5",
    heading: "Designed for Living",
    subtext: "Each piece tells a story of craft, material, and intention.",
  },
  {
    id: "upper-5",
    type: "video",
    desktopClass: "lg:col-span-2 lg:row-span-3 lg:col-start-6 lg:row-start-5",
  },
];

export function UpperGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:grid-rows-7 gap-1">
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
