export type Subcategory = {
  slug: string;
  name: string;
};

export type Category = {
  slug: string;
  name: string;
  subcategories: Subcategory[];
};

/**
 * Single source of truth for all categories and their subcategories.
 * Used by both the Navigation dropdown and the collection page filter tabs.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "new",
    name: "New",
    subcategories: [],
  },
  {
    slug: "living-room",
    name: "Living Room",
    subcategories: [
      { slug: "sofa", name: "Sofa" },
      { slug: "divan", name: "Divan" },
      { slug: "center-side-table", name: "Center & Side Table" },
      { slug: "lounge-chair", name: "Lounge Chair" },
      { slug: "tv-cabinet", name: "TV Cabinet" },
    ],
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    subcategories: [
      { slug: "bed", name: "Bed" },
      { slug: "dressing-unit", name: "Dressing Unit" },
      { slug: "nightstand", name: "Nightstand" },
      { slug: "storage", name: "Storage" },
    ],
  },
  {
    slug: "kitchen-dining",
    name: "Kitchen + Dining",
    subcategories: [
      { slug: "chair", name: "Chair" },
      { slug: "dining-table", name: "Dining Table" },
      { slug: "storage", name: "Storage" },
      { slug: "tea-trolley", name: "Tea Trolley" },
    ],
  },
  {
    slug: "modular-kitchen",
    name: "Modular Kitchen",
    subcategories: [],
  },
  {
    slug: "entryway-hallway",
    name: "Entryway + Hallway",
    subcategories: [
      { slug: "console", name: "Console" },
      { slug: "shoe-cabinet", name: "Shoe Cabinet" },
    ],
  },
  {
    slug: "home-office",
    name: "Home Office",
    subcategories: [
      { slug: "study-desk", name: "Study Desk" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((s) => s.slug === subcategorySlug);
}
