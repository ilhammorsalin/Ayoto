"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import MonacoImg from '@/Assets/Furniture/sofas/Monaco (Single Seater).png';
import SpinnyChairVideo from '@/Assets/sale/spinny-chair-cropped.mp4';
import SpinnyTableVideo from '@/Assets/sale/spinny-table-cropped.mp4';

interface ScrubVideoProps {
  src: string;
  alt: string;
  scaleClassName?: string;
}

function InteractiveScrubVideo({ src, alt, scaleClassName = '' }: ScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startTime = useRef(0);
  const targetTimeRef = useRef(0);
  const isSeeking = useRef(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const requestSeek = () => {
    const video = videoRef.current;
    if (!video || isSeeking.current) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      isSeeking.current = true;
      if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
        try {
          (video as any).fastSeek(targetTimeRef.current);
        } catch {
          video.currentTime = targetTimeRef.current;
        }
      } else {
        video.currentTime = targetTimeRef.current;
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    startX.current = e.clientX;
    if (videoRef.current) {
      startTime.current = videoRef.current.currentTime;
      targetTimeRef.current = videoRef.current.currentTime;
    }
    setIsGrabbing(true);
    setHasInteracted(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !videoRef.current) return;
    const video = videoRef.current;
    const duration = video.duration || 1;
    const dx = e.clientX - startX.current;

    // ~260px drag represents one full 360 rotation loop
    const rotationSensitivity = 260;
    const timeDelta = (dx / rotationSensitivity) * duration;

    let nextTime = (startTime.current + timeDelta) % duration;
    if (nextTime < 0) nextTime += duration;

    targetTimeRef.current = nextTime;
    requestSeek();
  };

  const handleSeeked = () => {
    isSeeking.current = false;
    if (isDragging.current) {
      requestSeek();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    setIsGrabbing(false);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTimeRef.current;
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-full aspect-square flex items-center justify-center select-none touch-none ${
        isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div className={`relative w-full h-full flex items-center justify-center ${scaleClassName}`}>
        <video
          ref={videoRef}
          src={typeof src === 'string' ? src : (src as any)?.src || src}
          playsInline
          muted
          preload="auto"
          draggable={false}
          onSeeked={handleSeeked}
          aria-label={alt}
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>

      {/* 360 Drag Hint Badge */}
      {!hasInteracted && (
        <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 bg-[#463F3A]/80 backdrop-blur-xs text-[#F4F3EE] text-[9px] sm:text-[10px] tracking-wider uppercase font-medium rounded-full shadow-xs transition-opacity duration-300">
          <svg
            className="w-3 h-3 animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
            <path d="M21 3v6h-6" />
          </svg>
          <span className="whitespace-nowrap">360° Drag</span>
        </div>
      )}
    </div>
  );
}

export function OnSaleSection() {
  return (
    <section className="w-full bg-[#F4F3EE] py-4 md:py-6">
      <div className="w-full px-0 flex flex-col gap-4">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center text-[#463F3A]">
          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-4 py-2 md:py-4">
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
              On Sale
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

        {/* 2 Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
          {/* Left Column: Monaco Sofa with SOFA ON SALE label */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
            {/* Bottom-Left Text Overlay */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-10 max-w-[85%]">
              <h3 className="font-euro uppercase tracking-wider text-white text-[36px] sm:text-[45px] md:text-[54px] lg:text-[63px] leading-[0.88] drop-shadow-xl select-none">
                SOFA ON SALE
              </h3>
            </div>

            <Image
              src={MonacoImg}
              alt="Monaco Single Seater Sofa on Sale"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Column: Espresso Corner on sale */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 bg-[#f2f3f3] overflow-hidden">
            {/* Heading inside frame */}
            <h3 className="font-euro uppercase tracking-wider text-[#463F3A] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[0.95] text-center select-none">
              Espresso Corner on sale
            </h3>

            {/* 2 Interactive 360 Scrub Videos Side-by-Side (30% smaller) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full flex-1 items-center justify-items-center my-1 sm:my-2 min-h-0">
              <div className="relative w-[70%] sm:w-[75%] h-full max-h-[195px] sm:max-h-[250px] md:max-h-[310px] aspect-square flex items-center justify-center">
                <InteractiveScrubVideo
                  src={SpinnyChairVideo}
                  alt="Espresso Corner Chair 360 View"
                  scaleClassName="scale-110"
                />
              </div>

              <div className="relative w-[70%] sm:w-[75%] h-full max-h-[195px] sm:max-h-[250px] md:max-h-[310px] aspect-square flex items-center justify-center">
                <InteractiveScrubVideo
                  src={SpinnyTableVideo}
                  alt="Espresso Corner Table 360 View"
                />
              </div>
            </div>

            {/* Shop Items Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 bg-[#463F3A] text-[#F4F3EE] text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold transition-all duration-200 hover:opacity-90 active:scale-95 shadow-sm cursor-pointer"
            >
              Shop Items
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
