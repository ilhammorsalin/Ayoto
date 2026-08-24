"use client";

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import albaHD from "@/Assets/Furniture/Gemini HD/albaHD.png";
import alba2HD from "@/Assets/Furniture/Gemini HD/alba2HD.png";
import halo1 from "@/Assets/Furniture/Center table/Halo (1).png";
import haloHover from "@/Assets/Furniture/Center table/Halo.png";
import questa from "@/Assets/Furniture/tv cabinet/Questa.png";
import questaHover from "@/Assets/Furniture/tv cabinet/Questa (1).png";
import videoSquare from "@/Assets/videoSquare.mp4";

const ITEMS = [
  {
    id: "upper-1",
    type: "photo",
    desktopClass: "sm:col-span-2 sm:row-span-7 sm:col-start-1 sm:row-start-1",
    productId: "alba",
    src: albaHD,
    hoverSrc: alba2HD,
    alt: "Alba King bed",
    hoverTitle: "Alba King Bed",
    hoverSubtext: "A modern masterpiece of comfort.",
  },
  {
    id: "upper-2",
    type: "photo",
    desktopClass: "sm:col-span-2 sm:row-span-4 sm:col-start-3 sm:row-start-1",
    productId: "halo",
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
    productId: "questa",
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
    src: videoSquare,
    hoverTitle: "Loom Sofa",
    hoverSubtext: "Modern modular seating for any space.",
  },
];

export function UpperGrid() {
  const [tappedId, setTappedId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function toggleVideo() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  return (
    <div className="mt-1 gap-1 grid grid-cols-1 auto-rows-[50vh] sm:grid-cols-7 sm:grid-rows-[repeat(7,minmax(0,1fr))] h-full">
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className={`group relative overflow-hidden ${item.type !== "text" ? "bg-muted" : ""} ${item.desktopClass}`}
          onTouchStart={(e) => {
            if (item.type === "photo" || item.type === "video") {
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
                  <h3 className={`font-serif text-2xl text-white transition-transform duration-500 ${tappedId === item.id ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"}`}>
                    {(item as any).hoverTitle}
                  </h3>
                  <p className={`text-white/90 text-sm mt-1 transition-transform duration-500 delay-75 ${tappedId === item.id ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"}`}>
                    {(item as any).hoverSubtext}
                  </p>
                </div>
              )}
            </Link>
          ) : item.type === "text" ? (
            <div className="flex flex-col justify-center items-center p-8 h-full text-center">
              <h3 className="mb-2 font-serif text-2xl">{item.heading}</h3>
              <p className="max-w-xs text-muted-foreground text-sm">
                {item.subtext}
              </p>
            </div>
          ) : "src" in item && item.src ? (
            <div
              className="relative w-full h-full"
              onTouchStart={(e) => { e.preventDefault(); toggleVideo(); }}
            >
              <video
                ref={videoRef}
                src={item.src as string}
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-cover"
              />
              {("hoverTitle" in item || "hoverSubtext" in item) && (
                <div className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-end p-6 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${tappedId === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  <h3 className="font-serif text-2xl text-white">{(item as any).hoverTitle}</h3>
                  <p className="text-white/90 text-sm mt-1">{(item as any).hoverSubtext}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="font-sans text-muted-foreground text-lg tracking-widest">
                VIDEO
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
