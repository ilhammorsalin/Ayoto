import type { Metadata } from "next";
import { DEMO_PRODUCT } from "@/data/demo-product";
import { ProductHero } from "@/components/product-page/product-hero";
import { ProductDetail } from "@/components/product-page/product-detail";
import { CartPanel } from "@/components/cart/cart-panel";

const KNOWN_PRODUCT_IDS = [
  "adaptis", "alba", "halo", "questa", "oglio",
  "opaline", "cache", "kivo", "sereno",
];

export async function generateStaticParams() {
  return KNOWN_PRODUCT_IDS.map((id) => ({ id }));
}

export const dynamicParams = false;

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
