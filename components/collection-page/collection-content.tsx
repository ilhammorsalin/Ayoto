"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { SubcategoryNav } from "./subcategory-nav";
import { Toolbar } from "./toolbar";
import { ProductGrid } from "./product-grid";
import { Category } from "@/data/categories";

export function CollectionContent({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const [columns, setColumns] = useState<3 | 4>(3);

  return (
    <>
      {/* Subcategory nav + toolbar row */}
      <div className="max-w-7xl mx-12 px-1 pb-6">
        <div className="flex items-center justify-between">
          <SubcategoryNav category={category} />
          <Toolbar columns={columns} onChangeColumns={setColumns} />
        </div>
      </div>

      {/* Product grid — full-bleed */}
      <section className="pb-16">
        <ProductGrid products={products} columns={columns} />
      </section>
    </>
  );
}
