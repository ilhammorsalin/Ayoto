"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasMultipleImages = product.images.length > 1;

  function nextImage(e: React.MouseEvent) {
    e.stopPropagation();
    setCurrentImageIndex((i) => (i + 1) % product.images.length);
  }

  function prevImage(e: React.MouseEvent) {
    e.stopPropagation();
    setCurrentImageIndex(
      (i) => (i - 1 + product.images.length) % product.images.length
    );
  }

  function toggleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    setIsFavorited((v) => !v);
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image frame */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.images[currentImageIndex]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Heart button — always visible, sits above the link overlay */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 z-20 p-1.5 transition-colors"
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "size-5 transition-colors",
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-white/80 hover:text-white"
            )}
            strokeWidth={1.5}
          />
        </button>

        {/* Image cycle arrows — visible on hover, only if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-white/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-white/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}

        {/* Stretched link — covers entire card, sits below interactive elements */}
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${product.name}`}
        />
      </div>

      {/* Info block */}
      <div className="mt-3 px-1">
        {/* Title row */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-medium font-sans">{product.name}</h3>
          <span className="text-sm font-medium font-sans whitespace-nowrap">
            {product.price}
          </span>
        </div>

        {/* Subtext */}
        <p className="mt-0.5 text-xs text-muted-foreground font-sans">
          {product.subtext}
        </p>

        {/* Color count / swatches */}
        <div className="mt-1.5 h-4">
          {isHovered ? (
            <div className="flex items-center gap-1.5">
              {product.colorOptions.map((color, i) => (
                <span
                  key={i}
                  className="inline-block size-3 rounded-sm border border-border/50"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground/60 font-sans">
              {product.colorOptions.length} colors
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
