import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { CollectionPageHeader } from "@/components/collection-page/page-header";
import { CollectionContent } from "@/components/collection-page/collection-content";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return {
    title: `${category.name} — Ayoto`,
    description: `Discover our curated collection of ${category.name.toLowerCase()} furniture, designed with quiet intention and crafted for everyday living.`,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { category: categorySlug } = await params;
  const { type: subcategorySlug } = await searchParams;

  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(
    categorySlug,
    subcategorySlug || undefined
  );

  return (
    <div className="min-h-screen">
      <CollectionPageHeader category={category} />
      <CollectionContent category={category} products={products} />
    </div>
  );
}
