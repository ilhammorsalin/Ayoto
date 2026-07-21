/**
 * Navigation group data for the Option 4 single-bar mega-menu.
 * Single source of truth for all nav link groups.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** Small decorative tag (emoji/symbol) shown beside the label */
  tag?: string;
  /** Renders with a highlighted CTA style */
  cta?: boolean;
}

// ─── Shop: By Furniture ───────────────────────────────────────────────────────
export const FURNITURE_ITEMS: NavLink[] = [
  { label: "Sofa", href: "/collections/living-room?type=sofa" },
  { label: "Divan", href: "/collections/living-room?type=divan" },
  { label: "Lounge Chair", href: "/collections/living-room?type=lounge-chair" },
  { label: "Center & Side Table", href: "/collections/living-room?type=center-side-table" },
  { label: "TV Cabinet", href: "/collections/living-room?type=tv-cabinet" },
  { label: "Bed", href: "/collections/bedroom?type=bed" },
  { label: "Dressing Unit", href: "/collections/bedroom?type=dressing-unit" },
  { label: "Nightstand", href: "/collections/bedroom?type=nightstand" },
  { label: "Dining Table", href: "/collections/kitchen-dining?type=dining-table" },
  { label: "Study Desk", href: "/collections/home-office?type=study-desk" },
];

// ─── Shop: By Room ────────────────────────────────────────────────────────────
export const ROOM_ITEMS: NavLink[] = [
  { label: "Living Room", href: "/collections/living-room" },
  { label: "Bedroom", href: "/collections/bedroom" },
  { label: "Kitchen + Dining", href: "/collections/kitchen-dining" },
  { label: "Home Office", href: "/collections/home-office" },
  { label: "Entryway + Hallway", href: "/collections/entryway-hallway" },
];

// ─── Shop: By Theme ───────────────────────────────────────────────────────────
export const THEME_ITEMS: NavLink[] = [
  { label: "Best Seller", href: "/collections?theme=best-seller", tag: "🔥" },
  { label: "New Arrival", href: "/collections/new", tag: "✦" },
  { label: "Classics", href: "/collections?theme=classics", tag: "◈" },
];

// ─── Services ────────────────────────────────────────────────────────────────
export const SERVICES_LINKS: NavLink[] = [
  {
    label: "Design Services",
    href: "#",
    description: "Book an appointment or chat online with a designer",
    cta: true,
  },
  {
    label: "Modular Kitchen",
    href: "#",
    description: "Design a custom kitchen with our specialists",
  },
  {
    label: "Catalog",
    href: "#",
    description: "Browse our full product catalog",
  },
];

// ─── Discover ────────────────────────────────────────────────────────────────
export const DISCOVER_LINKS: NavLink[] = [
  {
    label: "Inspiration",
    href: "#",
    description: "Room ideas, style guides, and mood boards",
  },
  {
    label: "Showcase Events",
    href: "#",
    description: "Upcoming trade shows and exhibitions",
  },
  {
    label: "Partnership",
    href: "#",
    description: "Work with Ayoto as a business partner",
  },
];

// ─── Company ────────────────────────────────────────────────────────────────
export const COMPANY_LINKS: NavLink[] = [
  {
    label: "About Us",
    href: "#",
    description: "Our story, values, and craftsmanship",
  },
  {
    label: "Locations",
    href: "#",
    description: "Find us in Dhaka",
  },
  {
    label: "Contact",
    href: "#",
    description: "Get in touch with our team",
  },
];
