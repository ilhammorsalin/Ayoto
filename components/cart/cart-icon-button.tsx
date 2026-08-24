"use client";

import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function CartIconButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      aria-label={`Cart${totalItems > 0 ? ` (${totalItems} items)` : ""}`}
      onClick={openCart}
      className="relative flex items-center justify-center  p-2 text-foreground/65 transition-colors hover:text-foreground"
    >
      <ShoppingCart className="size-[18px]" />

      {/* Badge with bounce animation */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.35, 1], opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute -top-0.5 -right-0.5 flex min-w-[16px] h-4 items-center justify-center",
              "  bg-primary px-[3px] text-[9px] font-bold leading-none text-primary-foreground"
            )}
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
