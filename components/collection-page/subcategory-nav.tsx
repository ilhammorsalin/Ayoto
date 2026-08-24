"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/data/categories";

export function SubcategoryNav({ category }: { category: Category }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") ?? undefined;

  if (category.subcategories.length === 0) return null;

  function handleClick(subSlug: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (subSlug) {
      params.set("type", subSlug);
    } else {
      params.delete("type");
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  return (
    <nav className="flex items-center gap-6 text-xs font-sans font-medium tracking-wider uppercase">
      <button
        onClick={() => handleClick(undefined)}
        className={cn(
          "pb-1 transition-colors relative",
          currentType === undefined
            ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </button>
      {category.subcategories.map((sub) => (
        <button
          key={sub.slug}
          onClick={() => handleClick(sub.slug)}
          className={cn(
            "pb-1 transition-colors relative",
            currentType === sub.slug
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {sub.name}
        </button>
      ))}
    </nav>
  );
}
