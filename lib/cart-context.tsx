"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import type { StaticImageData } from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  /** Unique key: productId + hex color */
  key: string;
  productId: string;
  name: string;
  priceNumeric: number;
  priceLabel: string;
  image: StaticImageData;
  colorHex: string;
  colorLabel: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD";     item: CartItem }
  | { type: "REMOVE";  key: string }
  | { type: "SET_QTY"; key: string; qty: number }
  | { type: "CLEAR" };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.key === action.item.key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === action.item.key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.key !== action.key) };
    case "SET_QTY":
      return {
        items: state.items
          .map((i) =>
            i.key === action.key ? { ...i, quantity: action.qty } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal   = state.items.reduce((s, i) => s + i.priceNumeric * i.quantity, 0);

  const openCart  = useCallback(() => setIsOpen(true),  []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      dispatch({ type: "ADD", item: { ...item, quantity: 1 } });
      setIsOpen(true); // auto-open panel
    },
    []
  );

  const removeFromCart = useCallback((key: string) => {
    dispatch({ type: "REMOVE", key });
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    dispatch({ type: "SET_QTY", key, qty });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
