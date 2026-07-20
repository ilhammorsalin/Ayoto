import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductById, getProductsByCategory } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { ImageGallery } from "@/components/product-page/image-gallery";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};
  return {
    title: `${product.name} — Ayoto`,
    description: product.subtext,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href={category ? `/collections/${category.slug}?type=${product.subcategory}` : "/collections"}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 font-sans tracking-wider uppercase"
        >
          <ChevronLeft className="size-3" />
          Back to {category?.name ?? "Collections"}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <ImageGallery images={product.images} name={product.name} />
          <div className="flex flex-col gap-6 pt-2">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{product.name}</h1>
              <p className="mt-2 text-2xl font-sans font-medium">{product.price}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">{product.subtext}</p>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-sans font-medium">Colors</span>
              <div className="flex items-center gap-2 mt-2">
                {product.colorOptions.map((color, i) => (
                  <span
                    key={i}
                    className="inline-block size-6 rounded-full border border-border/50"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
