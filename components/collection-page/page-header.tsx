import { Category } from "@/data/categories";

/**
 * Page header for collection pages.
 * Category name is real data from categories.ts.
 * Description is MOCK placeholder copy — real per-category copy comes later.
 */
export function CollectionPageHeader({ category }: { category: Category }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-8">
      <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
        {category.name}
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed">
        {/* MOCK — placeholder description. Replace with real per-category copy later. */}
        Discover our curated collection of {category.name.toLowerCase()} furniture,
        designed with quiet intention and crafted for everyday living.
      </p>
    </div>
  );
}
