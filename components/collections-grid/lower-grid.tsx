"use client";

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import oglio from "@/Assets/Furniture/divan/Oglio.png";
import oglioHover from "@/Assets/Furniture/divan/Oglio (1).png";
import opalineHD from "@/Assets/Furniture/Gemini HD/opalineHD.png";
import opaline2HD from "@/Assets/Furniture/Gemini HD/opaline2HD.png";
import kivo from "@/Assets/Furniture/Center table/Kivo.png";
import kivoHover from "@/Assets/Furniture/Center table/Kivo (1).png";
import serenoKing from "@/Assets/Furniture/Bed/Sereno (King).png";
import serenoHover from "@/Assets/Furniture/Bed/Sereno.png";
import cache from "@/Assets/Furniture/Center table/Cache.png";
import cacheHover from "@/Assets/Furniture/Center table/Cache (1).png";
import grid169 from "@/Assets/grid-16-9.mp4";


const ITEMS = [
  {
    id: "lower-1",
    type: "video",
    desktopClass: "sm:col-span-5 sm:row-span-4 sm:col-start-1 sm:row-start-1",
    src: grid169,
    hoverTitle: "Loom Sofa",
    hoverSubtext: "Modern modular seating for any space.",
  },
  {
    id: "lower-2",
    type: "photo",
    desktopClass: "sm:col-span-3 sm:row-span-3 sm:col-start-1 sm:row-start-8",
    productId: "opaline",
    src: opalineHD,
    hoverSrc: opaline2HD,
    alt: "Opaline lounge chair",
    hoverTitle: "Opaline Lounge Chair",
    hoverSubtext: "Premium fabric and timeless silhouette.",
  },

  {
    id: "lower-4",
    type: "photo",
    desktopClass: "sm:col-span-2 sm:row-span-5 sm:col-start-6 sm:row-start-1",
    productId: "oglio",
    src: oglio,
    hoverSrc: oglioHover,
    alt: "Oglio divan",
    hoverTitle: "Oglio Divan",
    hoverSubtext: "A perfect blend of style and relaxation.",
  },
  {
    id: "lower-5",
    type: "text",
    desktopClass: "sm:col-span-2 sm:row-span-3 sm:col-start-1 sm:row-start-5",
    heading: "Built to Last",
    subtext: "Timeless forms crafted from natural materials.",
  },
  {
    id: "lower-6",
    type: "photo",
    desktopClass: "sm:col-span-3 sm:row-span-3 sm:col-start-3 sm:row-start-5",
    productId: "cache",
    src: cache,
    hoverSrc: cacheHover,
    alt: "Cache center table",
    hoverTitle: "Cache Center Table",
    hoverSubtext: "Warm tones and practical design.",
  },
  {
    id: "lower-7",
    type: "photo",
    desktopClass: "sm:col-span-2 sm:row-span-3 sm:col-start-4 sm:row-start-8",
    productId: "kivo",
    src: kivo,
    hoverSrc: kivoHover,
    alt: "Kivo center table",
    hoverTitle: "Kivo Center Table",
    hoverSubtext: "A statement piece for the modern home.",
  },
  {
    id: "lower-8",
    type: "photo",
    desktopClass: "sm:col-span-2 sm:row-span-5 sm:col-start-6 sm:row-start-6",
    productId: "sereno",
    src: serenoKing,
    hoverSrc: serenoHover,
    alt: "Sereno King bed",
    hoverTitle: "Sereno King Bed",
    hoverSubtext: "Ultimate luxury and support.",
  },
];

export function LowerGrid() {
  const [tappedId, setTappedId] = useState<string | null>(null);

  return (
    <div className="h-full grid grid-cols-1 auto-rows-[50vh] sm:grid-cols-7 sm:grid-rows-[repeat(10,minmax(0,1fr))] gap-1">
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className={`group relative overflow-hidden ${item.type !== "text" ? "bg-muted" : ""} ${item.desktopClass}`}
          onTouchStart={(e) => {
            if (item.type === "photo") {
              e.preventDefault();
              setTappedId(tappedId === item.id ? null : item.id);
            }
          }}
        >
          {item.type === "photo" && "src" in item && item.src && "productId" in item && item.productId ? (
            <Link href={`/products/${item.productId}`} className="relative block w-full h-full">
              <Image
                src={item.src}
                alt={item.alt ?? ""}
                fill
                className={`object-cover transition-opacity duration-500 ${tappedId === item.id ? "opacity-0" : "group-hover:opacity-0"}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 43vw"
              />
              {"hoverSrc" in item && item.hoverSrc && (
                <Image
                  src={item.hoverSrc as any}
                  alt={(item as any).hoverTitle ?? item.alt ?? ""}
                  fill
                  className={`object-cover transition-opacity duration-500 ${tappedId === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 43vw"
                />
              )}
              {("hoverTitle" in item || "hoverSubtext" in item) && (
                <div className={`pointer-events-none absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${tappedId === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  <h3 className={`font-serif text-2xl text-white transition-transform duration-500 ${tappedId === item.id ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"}`}>{(item as any).hoverTitle}</h3>
                  <p className={`text-white/90 text-sm mt-1 transition-transform duration-500 delay-75 ${tappedId === item.id ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"}`}>{(item as any).hoverSubtext}</p>
                </div>
              )}
            </Link>
          ) : item.type === "text" ? (
            <div className="flex flex-col justify-center items-center p-8 text-center h-full">
              <h3 className="font-serif text-2xl mb-2">{item.heading}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{item.subtext}</p>
            </div>
          ) : "src" in item && item.src ? (
              <div className="relative w-full h-full">
                <video
                  src={item.src as string}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                {("hoverTitle" in item || "hoverSubtext" in item) && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end p-6 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100">
                    <h3 className="font-serif text-2xl text-white">{(item as any).hoverTitle}</h3>
                    <p className="text-white/90 text-sm mt-1">{(item as any).hoverSubtext}</p>
                  </div>
                )}
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
