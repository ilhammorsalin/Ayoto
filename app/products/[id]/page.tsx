import type { Metadata } from "next";
import { DEMO_PRODUCT } from "@/data/demo-product";
import { ProductHero } from "@/components/product-page/product-hero";
import { ProductDetail } from "@/components/product-page/product-detail";
import { CartPanel } from "@/components/cart/cart-panel";

// All product IDs resolve to the single demo product for this POC.
// Replace with real data fetching when the backend is ready.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${DEMO_PRODUCT.name} — Ayoto`,
    description: DEMO_PRODUCT.subtext,
  };
}

export default async function ProductPage() {
  return (
    <>
      <ProductHero product={DEMO_PRODUCT} />
      <ProductDetail product={DEMO_PRODUCT} />
      <CartPanel />
    </>
  );
}
