# Ayoto — Frontend Skeleton Build Prompt

<frontend_aesthetics>
This is not a generic e-commerce template. Ayoto is a Dhaka-based furniture company
inspired by Japanese minimalism, timeless craftsmanship, and natural materials. The site
must feel cinematic, emotionally-driven, and deeply intentional — like discovering a
philosophy through slow scroll storytelling, not browsing a catalog.

Reference points: MUJI's restraint, Herman Miller's craftsmanship narrative, Vipp's
editorial product-grid layout (vipp.com — study their hover-reveal cards), Apple's
product-page polish.

Mood: silence, warm natural light, slow living, calm confidence, generous negative space.
Warmth comes entirely from photography (wood grain, natural light, artisan hands) — never
from the UI chrome itself. Every animation should feel slow, intentional, and earned —
never flashy. One well-orchestrated moment creates more delight than scattered effects.

Avoid generic AI-generated aesthetics:
- No clichéd purple gradients, no cream/beige UI backgrounds
- No predictable card-grid layouts — use asymmetric, editorial rhythm
- No cookie-cutter hover effects — interactions should feel earned
- No decorative numbering (01/02/03) unless the content is actually sequential
- No "AI slop" font choices (Inter, Roboto, Open Sans) — typography must be distinctive
- **No simplistic jump-fade animations (abrupt trigger-reveals, cheap transition tricks, or pop-in hover fades that feel "vibe-coded"). Transitions must feel unified, fluid, and continuous.**
</frontend_aesthetics>

---

## Scope & Implementation Discipline

**Frontend skeleton only.** No backend, no API routes, no database, no authentication.
All data is hardcoded/placeholder. Only the **Homepage** is fully built.
The **About page** is included as a secondary page.
All other pages (shop, categories, design services, locations, etc.) are **not built** — 
nav links to them should use `href="#"` (do nothing) for now.

**CRITICAL: Follow the Ponytail Skill Principles**
To avoid redundant code, over-engineering, and unnecessary boilerplate, you **must strictly apply the rules outlined in** `Assets/ponytail-skill..md`.
- Question every element: does it need to exist at all? (YAGNI).
- Don't write 50 lines where a clean native CSS line or a simple React state statement works.
- Reuse components and CSS variables instead of duplicating.
- Shortest working diff wins.

---

## Technology Stack

- **Next.js 15** — App Router, TypeScript, `"use client"` directives where needed
- **Tailwind CSS v4** — CSS-first configuration via `@theme` blocks (NOT `tailwind.config.ts`)
  - Use `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
  - Define all design tokens in `@theme { }` blocks in the global CSS file
  - Use OKLCH color format for all theme variables
- **shadcn/ui** — Initialize with `npx shadcn@latest init`, install needed components
  - Customize theme CSS variables to match Ayoto's palette — never use shadcn defaults
  - Use semantic color tokens everywhere: `bg-primary`, `text-muted-foreground` — NEVER raw values like `bg-teal-600`
  - Use `cn()` for conditional classes, `gap-*` not `space-y-*`, `size-*` not `w-* h-*`
  - Use full Card composition: `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`
  - `Sheet` for mobile nav (must include `SheetTitle` with `className="sr-only"` for a11y)
  - Use built-in variants before custom styles
  - `className` is for layout positioning only — never override component colors with it
  - No manual `dark:` overrides — use semantic tokens that handle theming via CSS variables
  - No manual `z-index` on overlay components (Dialog, Sheet, Popover handle their own)
  - Icons in Button use `data-icon` attribute, no sizing classes on icons inside components
- **Framer Motion** — for scroll-triggered reveals, crossfades, hover transitions, and staggered animations
  - Use `whileInView`, scroll-linked `useScroll`/`useTransform` for the About page narrative
  - Respect `prefers-reduced-motion` — wrap motion in `useReducedMotion()` checks
- **next/font** — load Google Fonts (Crimson Pro, Satoshi) + local fonts (Overcame Demo, Montserrat ExtraLight for the logo)
- **next/image** — for every image, automatic optimization, lazy-loading below the fold
- Deployed on **Vercel** — deployable with `vercel deploy`, no further setup

---

## Typography

Two distinctive typefaces, deliberately paired for a Japanese-minimalism furniture brand:

- **Crimson Pro** (Google Fonts) — serif, for display headings only
  - Used at large sizes: `text-4xl`/`text-5xl`/`text-6xl` desktop, scaling down responsively
  - Weights: 400 (regular), 600 (semibold), 700 (bold)
  - Generous `leading-relaxed` and slightly open `tracking-wide` — the premium feel comes from spacing and restraint
  - This is the "memorable" typeface — editorial, warm, pairs with the wood/craft photography

- **Satoshi** (Google Fonts or CDN) — geometric sans-serif, for body copy, nav, buttons, UI
  - Used for all body text (`text-base`/`text-lg`), navigation links, button labels, captions, metadata
  - Weights: 400, 500, 700
  - Clean, precise, Japanese-influenced geometry — the functional counterpart to Crimson Pro's warmth

- **Logo-specific fonts** (loaded as local fonts via `next/font/local` from `public/fonts/`):
  - **Overcame Demo** (`OvercameDemoRegular.ttf`) — for "AYOTO" in the company logo
  - **Montserrat ExtraLight** (`montserrat.extralight.ttf`) — for "FURNITURE" below "AYOTO"
  - These fonts are ONLY used for the logo lockup, nowhere else in the site

**Type pairing principle:** Crimson Pro (serif, characterful) for headlines that draw you in, 
Satoshi (geometric sans) for everything functional. High contrast = distinctive. The logo 
uses its own dedicated fonts to stand apart from both.

---

## Company Logo

The Ayoto logo is a stacked wordmark:
- **"AYOTO"** — set in Overcame Demo, uppercase, tracked (`tracking-[0.3em]`), larger size
- **"FURNITURE"** — set in Montserrat ExtraLight, uppercase, tracked (`tracking-[0.5em]`), smaller size, positioned directly below "AYOTO"

The logo appears in the navigation (top-left) and the footer. In the loading screen, only "AYOTO" appears (in Overcame Demo) with the color animation described in Section 1.

Copy the font files from `Assets/` into `public/fonts/` and load them via `next/font/local`:
```tsx
import localFont from "next/font/local";

const overcame = localFont({
  src: "../public/fonts/OvercameDemoRegular.ttf",
  variable: "--font-overcame",
  display: "swap",
});

const montserratExtraLight = localFont({
  src: "../public/fonts/montserrat.extralight.ttf",
  variable: "--font-montserrat-el",
  display: "swap",
});
```

---

## Design System — CSS-First Tokens (Tailwind v4)

Define in the global CSS file (`app/globals.css`):

```css
@import "tailwindcss";

@theme {
  /* === Ayoto Color Tokens (OKLCH) === */

  /* Background: white */
  --color-background: oklch(100% 0 0);
  /* Text: near-black #0A0A0A */
  --color-foreground: oklch(7% 0 0);

  /* Primary accent: teal #0D9488 (dark teal) */
  --color-primary: oklch(62% 0.12 175);
  --color-primary-foreground: oklch(100% 0 0);

  /* Accent / hover: teal-500 #14B8A6 (light teal) */
  --color-accent: oklch(70% 0.14 175);
  --color-accent-foreground: oklch(100% 0 0);

  /* Muted / secondary surfaces */
  --color-muted: oklch(96% 0.005 0);
  --color-muted-foreground: oklch(45% 0.01 0);

  --color-secondary: oklch(96% 0.005 0);
  --color-secondary-foreground: oklch(7% 0 0);

  /* Card surfaces */
  --color-card: oklch(100% 0 0);
  --color-card-foreground: oklch(7% 0 0);

  /* Borders, inputs, focus ring */
  --color-border: oklch(90% 0.005 0);
  --color-ring: oklch(62% 0.12 175);

  /* Destructive — for errors */
  --color-destructive: oklch(53% 0.22 27);
  --color-destructive-foreground: oklch(98% 0 0);

  /* Radius — minimal, precise */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Animation tokens */
  --animate-fade-in: fade-in 0.6s ease-out;
  --animate-fade-up: fade-up 0.8s ease-out;

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(1rem); }
    to { opacity: 1; transform: translateY(0); }
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

**Key rules:**
- No beige/oak/walnut tones in UI chrome — those warm tones live ONLY in product photography
- The teal accent is used sparingly: buttons, CTAs, hover states, the Navigation Hub background
- White/black/teal is the entire UI palette. Warmth = photography, not interface

---

## Color System Quick Reference

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#FFFFFF` | Page background |
| Text | `#0A0A0A` | Body text, headings |
| Primary (dark teal) | `#0D9488` | Buttons, CTAs, active states |
| Accent (light teal) | `#14B8A6` | Hover states, loading screen initial text |
| Footer background | `#0A0A0A` | Near-black footer |
| Navigation Hub background | `#0D9488` | Teal section background (Section 11) |

---

## Metadata

```tsx
// app/layout.tsx metadata
export const metadata = {
  title: "Ayoto — Designed for Quiet Living",
  description: "Dhaka-based furniture inspired by Japanese minimalism, timeless craftsmanship, and natural materials.",
  openGraph: {
    title: "Ayoto — Designed for Quiet Living",
    description: "Furniture inspired by Japanese minimalism.",
    url: "https://ayoto.com",
    siteName: "Ayoto",
    type: "website",
  },
};
```

Set favicon. Domain is **ayoto.com**.

---

## Responsive Requirements (Global)

- Mobile-first Tailwind breakpoints: `sm:`, `md:`, `lg:`
- Test at minimum: 375px (mobile), 768px (tablet), 1440px (desktop)
- Every section needs a NAMED mobile behavior — never implied
- Touch targets: minimum 44×44px for interactive elements on mobile
- Respect `prefers-reduced-motion` for all Framer Motion animations

---

## Page Structure

Two pages: **Homepage** (`/`) and **About** (`/about`).
Global: fixed Navigation (Section 2) + Footer (Section 6) on every page.
All other nav links go to `href="#"` — those pages are not built yet.

---

## Section-by-Section Specification

### 1. Loading Screen (Homepage Only)

This loading screen ONLY appears when visiting the homepage (`/`). It does NOT appear on `/about` or any other route.

- Full-viewport white background (`bg-background`)
- Center of screen: "AYOTO" in Overcame Demo font, uppercase, tracked
- Text color animation: starts **light teal** (`#14B8A6` / accent) → transitions to **dark teal** (`#0D9488` / primary) as the progress bar fills
- Below the text: a thin horizontal progress bar (2px height)
  - Bar color: starts **gray** (`#D1D5DB`) → fills to **black** (`#0A0A0A` / foreground) as it completes
  - Bar fills left-to-right over 1.5–2s
- The text color transition and bar fill happen simultaneously, synchronized
- Once the bar reaches 100%: the entire loading screen opacity-dissolves away (Framer Motion `AnimatePresence`, ~0.5s fade-out), revealing the hero section that's already loaded underneath
- No jump cut, no page navigation — smooth dissolve
- **Mobile**: same behavior, slightly smaller type size

### 2. Navigation (Global — Fixed)

Two-row fixed navigation, matching the existing ayoto.com structure:

**Row 1 — Primary navigation** (top bar):
- Logo left: "AYOTO" (Overcame Demo) over "FURNITURE" (Montserrat ExtraLight), stacked vertically
- Links right, separated by `|` dividers: **Home** (`/`), **Design Services** (`#`), **Locations** (`#`), **Catalog** (`#`), **Contact** (`#`)
- Right-side utility icons: Search, Cart, Wishlist (heart), User/Account — all link to `#`

**Row 2 — Category navigation** (below Row 1):
- Centered, horizontal list of furniture categories with dropdown submenus:
  - **New** (`#`)
  - **Living Room** → dropdown: Sofa, Divan, Center & Side Table, Lounge Chair, TV Cabinet
  - **Bedroom** → dropdown: Bed, Dressing Unit, Nightstand, Storage
  - **Kitchen + Dining** → dropdown: Chair, Dining Table, Storage, Tea Trolley
  - **Modular Kitchen** (`#`, no dropdown)
  - **Entryway + Hallway** → dropdown: Console, Shoe Cabinet
  - **Home Office** → dropdown: Study Desk
- Category labels in Satoshi, uppercase, letter-spaced (`tracking-wider`)
- All category and sub-category links go to `href="#"` — shop pages are not built yet
- Dropdowns: clean white background, subtle border, Satoshi text

**Scroll behavior:**
- Over hero: transparent background, white text/logo (Row 2 may be hidden on hero)
- After scroll past hero: white background with subtle `border-b border-border`
- Hide on scroll down, reveal on scroll up (threshold: ~50px to prevent flicker)
- Hover state on links: subtle teal underline (`border-b-2 border-primary`) with opacity transition

**Mobile:**
- Both rows collapse into a shadcn `Sheet` hamburger menu (side="right")
- Include `SheetTitle` with `className="sr-only"` for accessibility
- Full-height, white background
- Row 1 links listed first, then a `Separator`, then category links with expandable submenus (accordion-style)
- Logo always visible in the top-left, hamburger icon top-right
- Utility icons (search, cart, wishlist, user) visible in the Sheet header area

### 3. Hero

- Full-viewport height (`h-dvh`)
- **Desktop**: cinematic slideshow — 3 placeholder images, ~5s each, slow crossfade (Framer Motion `AnimatePresence` with `mode="wait"`, 1.2s transition)
- Single line of text, bottom-left, over the images: "Designed for quiet living." — Crimson Pro, `text-xl md:text-2xl`, white with slight text shadow for contrast
- No CTA button — the hero is atmospheric, not transactional
- **Mobile**: single static hero image (protect load time), same text treatment
- Images: use `next/image` with `priority` for the first image, placeholder blur

### 4. Collections — Editorial Masonry Grid

- Tailwind CSS Grid with asymmetric spans — NOT a uniform grid
  - Example layout: first item spans 2 columns, second is 1 column tall, third is 1 column but taller (row-span-2), etc.
  - Reference Vipp.com's rhythm — varied sizes create editorial tension
- **Desktop hover**: crossfade from lifestyle shot to clean product shot; overlay fades in with name, collection, material, price, and a teal CTA button
  - Use Framer Motion for the crossfade (opacity transition, 0.4s)
  - Info overlay: semi-transparent dark gradient from bottom, text in white
- **Mobile** (REQUIRED — hover doesn't exist on touch):
  - Show a persistent info strip below each image: product name, material, price
  - Single column layout
  - No tap-to-reveal — info is always visible on mobile
- Placeholder items (hardcoded, no API):
  - "Kaze Lounge Chair" — Oak & Linen — ৳48,000
  - "Sora Dining Table" — Solid Walnut — ৳112,000
  - "Nagi Shelving System" — Ash & Steel — ৳76,000
  - "Ren Daybed" — White Oak & Wool — ৳95,000
- Use placeholder images from Unsplash/Pexels (furniture/interior photography)

### 5. Craftsmanship Story

- Scroll-triggered sequential reveal — each stage enters as the user scrolls
- Five stages, each with:
  - One full-bleed image (next/image, lazy-loaded)
  - One short line of copy beside or over the image
- Stages:
  1. Selected Materials
  2. Designed in Dhaka
  3. Handcrafted by Skilled Artisans
  4. Finished with Precision
  5. Made to Last Generations
- Animation: Framer Motion `whileInView` — subtle `fade-up` (translateY + opacity), staggered timing
- **Desktop layout**: alternating image-left/text-right, then image-right/text-left
- **Mobile layout**: stack vertically — each stage is a full-width card:
  - Image on top (16:9 aspect ratio, fills viewport width)
  - Short text line below the image
  - Fade-up animation (`whileInView`) as each card scrolls into view
  - Images are slightly shorter than desktop (not full-bleed height) to keep scroll pace quick
  - Generous vertical spacing between stages (`gap-16` or similar)
  - No alternating layout — clean, rhythmic vertical flow

### 6. Footer (Global)

- **Near-black background** — use `bg-foreground text-background` (semantic tokens, not raw colors)
- Ayoto logo lockup: "AYOTO" (Overcame Demo) + "FURNITURE" (Montserrat ExtraLight), white
- One-line brand statement: "Furniture for quiet living." — Crimson Pro italic
- Dhaka, Bangladesh location
- Contact: info@ayoto.com (placeholder)
- Social links: Instagram, Facebook, Pinterest — use Lucide icons, white
- Copyright: "© 2025 Ayoto. All rights reserved." — Satoshi
- Layout: centered, generous whitespace
- **Mobile**: single column, centered
- This footer appears on EVERY page including About

---

## About Page (`/about`)

The About page is not a company history — it's discovering Ayoto's philosophy through
slow, cinematic scroll storytelling. Fullscreen sections, generous whitespace, no abrupt
motion.

### 7. Scroll Narrative

- Four fullscreen sections (`h-dvh` each), one statement per section
- Scroll-linked continuous animation (NOT stepped viewport triggers):
  - Use Framer Motion `useScroll` + `useTransform` to drive opacity and translateY based on scroll progress
  - Text 1 starts centered; as user scrolls, it fades upward and becomes transparent while Text 2 rises from below to replace it — smooth, uninterrupted
  - Same pattern for 2→3 and 3→4
- Typography: near-black text on white, Crimson Pro, `text-3xl md:text-4xl lg:text-5xl font-normal`
- No teal in this section except perhaps a thin accent line between statements
- **Philosophy copy** (these are real Ayoto-voice statements, not lorem ipsum):
  1. "We begin where it matters — with the material itself. Honest wood, natural fiber, stone that has known the earth."
  2. "Each piece takes shape in Dhaka, where the line between craft and intention disappears."
  3. "Our makers don't follow templates. Their hands remember what machines were never taught."
  4. "We don't design for seasons. We design for the family that will inherit what you choose today."
- **Mobile**: keep fullscreen-per-statement but shorten the scroll distance per transition so it doesn't feel sluggish

### 8. Supporting Statistics

- Two stat blocks, positioned within the scroll narrative:
  - Top-left area: "40+ Collections" / "1,200+ Handcrafted Pieces"
  - Top-right area: "500+ Completed Projects" / "8 Years of Trust"
- Fade in naturally when the narrative reaches its midpoint — trigger based on scroll progress, not a fixed section boundary
- Small type (Satoshi, `text-sm text-muted-foreground`), clearly subordinate to the main narrative text
- Never competing with the statements — these are atmosphere, not content

### 9. Visual Atmosphere

- Subtle background imagery behind or beside the narrative text:
  - Wood grain close-ups, artisans at work, workshop details, natural light, furniture silhouettes
- Low opacity (`opacity-20` to `opacity-30`) or soft blur (`blur-sm`) — typography stays the clear focus
- This is the one place where warmer, photography-driven feel is intentional
- Use placeholder images (Pexels/Unsplash — woodworking, Japanese interiors)

### 10. Legacy & Recognition (Closing Section)

- Clean three-column layout, generous whitespace
- Columns:
  - **Left** — "In the Press" (placeholder: 3–4 publication names)
  - **Center** — "The Makers" (short paragraph about the team/workshop philosophy)
  - **Right** — "Design Inspiration" (Japanese minimalism, natural materials, timeless architecture)
- Refined typography: Satoshi body, Crimson Pro column headings
- Subtle hover: slight opacity shift on individual items
- **Mobile**: stack vertically, left → center → right becomes top → middle → bottom

### 11. Navigation Hub — Final CTA

- Sits directly before the global Footer
- **Full-width section with teal background** (`bg-primary text-primary-foreground`) — the ONE section where teal is a background
- Four shadcn `Card` components in a single row, customized:
  - Use full Card composition: `CardHeader` + `CardContent`
  - White text and borders on teal background
  - Each card: small white Lucide line-icon above heading, heading in Satoshi, one-line description
  - Cards:
    1. **Home** — House icon — "Return to the beginning" → links to `/`
    2. **Browse Collections** — Grid icon — "Explore our furniture" → links to `#`
    3. **Contact** — Mail icon — "Start a conversation" → links to `#`
    4. **Visit Us** — MapPin icon — "Find us in Dhaka" → links to `#`
- Animation: Framer Motion staggered `whileInView` — cards fade upward with 0.1s stagger
- Hover: subtle `translateY(-4px)` lift + slight opacity increase — no scaling, no color shifts
- **Mobile**: single column stack (2×2 on tablet), same staggered fade-in
- Tap feedback on mobile mirrors desktop hover state

---

## Component Checklist (shadcn/ui)

Install these via CLI before building:

```bash
npx shadcn@latest add button card sheet separator accordion
```

- `Button` — CTAs in collections, navigation hub
- `Card` — Navigation hub cards, legacy section
- `Sheet` — Mobile navigation menu
- `Separator` — dividers in nav, footer (use instead of `<hr>` or `border-t` divs)
- `Accordion` — Mobile nav category submenus

---

## Code Quality Rules

1. Use `"use client"` only on components that need React hooks, event handlers, or browser APIs
2. Use `cn()` utility for all conditional class merging
3. Use `gap-*` instead of `space-y-*` / `space-x-*`
4. Use `size-*` instead of `w-* h-*` when dimensions are equal
5. Use `truncate` instead of `overflow-hidden text-ellipsis whitespace-nowrap`
6. Use semantic color tokens everywhere — no raw Tailwind colors in component code
7. All images via `next/image` with proper `alt` text, `width`/`height`, and `priority` where appropriate
8. Proper heading hierarchy: single `<h1>` per page, then `<h2>`, `<h3>` etc.
9. All interactive elements need unique, descriptive `id` attributes
10. Accessible: proper ARIA labels, keyboard navigation, focus-visible states

---

## File Structure (Expected)

```
app/
├── layout.tsx          ← Root layout: fonts, metadata, nav, footer
├── page.tsx            ← Homepage: loading screen, hero, collections, craftsmanship
├── about/
│   └── page.tsx        ← About: scroll narrative, stats, atmosphere, legacy, nav hub
├── globals.css         ← Tailwind v4 @theme tokens, base styles
components/
├── ui/                 ← shadcn components (Button, Card, Sheet, Separator, Accordion)
├── navigation.tsx      ← Two-row fixed nav with scroll behavior
├── footer.tsx          ← Global footer with logo
├── logo.tsx            ← AYOTO + FURNITURE logo lockup component
├── loading-screen.tsx  ← Animated loading (homepage only)
├── hero.tsx            ← Hero slideshow/static image
├── collections-grid.tsx ← Editorial masonry with hover reveals
├── craftsmanship.tsx   ← Scroll-triggered story (5 stages)
├── scroll-narrative.tsx ← About page scroll narrative (4 statements)
├── stats-overlay.tsx   ← Supporting statistics
├── legacy-section.tsx  ← Three-column closing section
├── navigation-hub.tsx  ← Teal CTA cards section
lib/
├── utils.ts            ← cn() utility
public/
├── fonts/
│   ├── OvercameDemoRegular.ttf   ← Logo font for "AYOTO"
│   └── montserrat.extralight.ttf ← Logo font for "FURNITURE"
├── images/             ← Placeholder images
```

---

## Final Instruction

Generate the full Next.js project — the Homepage (sections 1–6) and the About Page
(sections 7–11), fully built and responsive. Every section must have an explicit mobile
behavior. All components use shadcn/ui patterns with semantic tokens. No backend code,
no API routes — all data is hardcoded. All nav links to unbuilt pages use `href="#"`.
Deployable to Vercel with `vercel deploy`.

This is a skeleton — structural completeness over final polish. But the structure itself
should feel intentional, cinematic, and distinctly Ayoto.
```
