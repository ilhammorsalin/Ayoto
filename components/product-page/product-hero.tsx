"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { QuantityControl } from "./quantity-control";
import type { DemoProduct } from "@/data/demo-product";
import { ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductHeroProps {
  product: DemoProduct;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({
      key: `${product.id}-${selectedColor.hex}`,
      productId: product.id,
      name: product.name,
      priceNumeric: product.priceNumeric,
      priceLabel: product.price,
      image: product.images[0],
      colorHex: selectedColor.hex,
      colorLabel: selectedColor.label,
    });

    // Flash "Added" state on button
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section className="min-h-screen pt-[64px] lg:flex">
      {/* ── LEFT: image stack ─────────────────────────────────────────── */}
      <div className="lg:w-[55%] lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] flex flex-col bg-muted/30">
        {/* Main image */}
        <div className="relative flex-1 min-h-[50vw] lg:min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail carousel */}
        {product.images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-background border-t border-border/40">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200",
                  activeImage === i
                    ? "border-primary shadow-sm shadow-primary/20"
                    : "border-transparent opacity-60 hover:opacity-90"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── RIGHT: buy panel ──────────────────────────────────────────── */}
      <div className="lg:w-[45%] lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] lg:overflow-y-auto flex flex-col">
        <div className="flex flex-col gap-7 px-8 py-10 lg:px-12">

          {/* Category breadcrumb */}
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary">
            {product.category.replace("-", " ")} · {product.subcategory}
          </p>

          {/* Product name */}
          <div>
            <h1 className="font-serif text-[2.6rem] leading-[1.1] tracking-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground font-sans">
              {product.subtext}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-[1.75rem] font-semibold tracking-tight text-foreground font-sans">
              {product.price}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">BDT</span>
          </div>

          {/* Separator */}
          <div className="h-px bg-border/60" />

          {/* Color selector */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
                Colour
              </span>
              <span className="text-[12px] text-muted-foreground">
                {selectedColor.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.colorOptions.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c)}
                  aria-label={c.label}
                  title={c.label}
                  className={cn(
                    "relative size-8 rounded-full border-2 transition-all duration-200",
                    selectedColor.hex === c.hex
                      ? "border-primary scale-110 shadow-md shadow-primary/20"
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor.hex === c.hex && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check
                        className="size-3.5 drop-shadow"
                        strokeWidth={2.5}
                        style={{
                          color:
                            parseInt(c.hex.replace("#", ""), 16) > 0x888888
                              ? "#2f2f2f"
                              : "#ffffff",
                        }}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-border/60" />

          {/* Quantity + Add to Cart */}
          <div className="flex gap-3 items-stretch">
            <QuantityControl
              value={quantity}
              onChange={setQuantity}
              size="md"
              className="shrink-0"
            />

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={cn(
                "flex-1 flex items-center justify-center gap-2.5 rounded-lg font-semibold text-[13px] uppercase tracking-widest",
                "transition-all duration-200 active:scale-[0.98]",
                added
                  ? "bg-primary/20 text-primary border border-primary/30 cursor-default"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              style={{ minHeight: "44px" }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-4" /> Added
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="size-4" /> Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Small trust line */}
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            Free shipping over ৳ 10,000 · 30-day returns
          </p>
        </div>
      </div>
    </section>
  );
}
