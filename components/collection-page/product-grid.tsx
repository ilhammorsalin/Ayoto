"use client";

import { Product } from "@/data/products";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  columns,
}: {
  products: Product[];
  columns: 3 | 4;
}) {
  if (products.length === 0) {
    return (
      <div className="w-full px-4 md:px-6 py-20 text-center">
        <p className="text-muted-foreground text-sm font-sans">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`w-full px-1 md:px-1 grid grid-cols-1 md:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-x-1 gap-y-8`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
