"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { QuantityControl } from "@/components/product-page/quantity-control";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Format a numeric price as ৳ XX,XXX
function formatPrice(n: number) {
  return `৳ ${n.toLocaleString("en-IN")}`;
}

export function CartPanel() {
  const { items, totalItems, subtotal, isOpen, closeCart, removeFromCart, updateQty, clearCart } =
    useCart();
  const router = useRouter();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex w-full flex-col p-0 sm:max-w-[420px] gap-0"
      >
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="size-4 text-primary" strokeWidth={1.5} />
            <SheetTitle className="text-[13px] font-semibold tracking-wide uppercase text-foreground">
              Cart
            </SheetTitle>
            <span className="text-[12px] text-muted-foreground">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Clear cart */}
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-medium text-destructive/70 hover:text-destructive transition-colors tracking-wide uppercase"
              >
                Clear
              </button>
            )}
            {/* Close */}
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="ml-1 flex size-7 items-center justify-center  text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* ── Items ─────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-4 px-8 py-24 text-center"
              >
                <ShoppingBag className="size-10 text-border" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">
                  Your cart is empty
                </p>
                <button
                  onClick={closeCart}
                  className="text-[12px] font-semibold uppercase tracking-widest text-primary underline-offset-4 hover:underline"
                >
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.key}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border/60 px-5 py-4"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden  bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      {/* Top row: name + price */}
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-medium leading-snug text-foreground">
                          {item.name}
                        </p>
                        <p className="shrink-0 text-[13px] font-semibold text-foreground">
                          {formatPrice(item.priceNumeric * item.quantity)}
                        </p>
                      </div>

                      {/* Color swatch + label */}
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-block size-2.5  border border-border/50"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="text-[11px] text-muted-foreground">
                          {item.colorLabel}
                        </span>
                      </div>

                      {/* Bottom row: qty + remove */}
                      <div className="mt-1.5 flex items-center justify-between">
                        <QuantityControl
                          size="sm"
                          value={item.quantity}
                          onChange={(q) => updateQty(item.key, q)}
                        />
                        <button
                          onClick={() => removeFromCart(item.key)}
                          aria-label="Remove item"
                          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="size-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer: total + checkout ───────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-border bg-background px-5 py-5 space-y-4">
            {/* Subtotal row */}
            <div className="flex items-center justify-between">
              <span className="text-[12px] uppercase tracking-widest text-muted-foreground font-medium">
                Subtotal
              </span>
              <span className="text-[15px] font-semibold text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Free shipping note */}
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Shipping calculated at checkout. Free on orders over ৳ 10,000.
            </p>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              className={cn(
                "w-full  bg-primary py-3.5 text-[13px] font-semibold uppercase tracking-widest text-primary-foreground",
                "transition-all duration-200 hover:bg-primary/90 active:scale-[0.99]"
              )}
            >
              Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
