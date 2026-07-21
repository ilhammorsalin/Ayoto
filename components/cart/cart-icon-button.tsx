"use client";

import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

interface CartIconButtonProps {
  /** Pass isTransparent from Navigation so icon adapts to hero overlay */
  transparent?: boolean;
}

export function CartIconButton({ transparent = false }: CartIconButtonProps) {
  const { totalItems, openCart } = useCart();

  return (
    <button
      aria-label={`Cart${totalItems > 0 ? ` (${totalItems} items)` : ""}`}
      onClick={openCart}
      className={cn(
        "relative flex items-center justify-center  p-2 transition-colors",
        transparent
          ? "text-white/80 hover:text-white hover:bg-white/10"
          : "text-foreground/65 hover:text-foreground hover:bg-muted"
      )}
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
