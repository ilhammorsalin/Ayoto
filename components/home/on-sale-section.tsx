import Image from 'next/image';
import MonacoImg from '@/Assets/Furniture/sofas/Monaco (Single Seater).png';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 items-stretch">
          {/* Left Column: Monaco Sofa with SOFA ON SALE label */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-white shadow-sm">
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

          {/* Right Column: Clean White Background for transparent product images */}
          <div className="w-full h-full min-h-[360px] lg:min-h-0 bg-white p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden shadow-sm">
            {/* Slot for transparent background product images */}
          </div>
        </div>
      </div>
    </section>
  );
}
