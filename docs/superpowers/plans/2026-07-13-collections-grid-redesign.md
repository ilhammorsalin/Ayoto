# Collections Grid Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old `collections-grid.tsx` single-file component with a two-grid masonry layout (Upper Grid + Lower Grid) using placeholder photos from `Assets/Furniture/`.

**Architecture:** Split into a `collections-grid/` directory with `index.tsx` (composer), `upper-grid.tsx`, and `lower-grid.tsx`. Old file gets deleted; the import `@/components/collections-grid` continues to resolve via `index.tsx`.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript

## Global Constraints

- Import images from `Assets/Furniture/` using `@/` alias (`@/Assets/Furniture/...`)
- Use `next/image` with `fill` + `object-cover` for all photos
- Responsive: default (mobile) single-column, `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-7` with exact positioning
- Video items render a `<div>` placeholder with centered "VIDEO" text
- Text items render heading + subtext centered
- gap-1 for all grid items
- `"use client"` directive not needed (no hooks, no interactivity)
- Use `cn()` from `@/lib/utils` for conditional classes

---

### Task 1: Create directory structure and data model

**Files:**
- Delete: `components/collections-grid.tsx`
- Create: `components/collections-grid/index.tsx`
- Create: `components/collections-grid/upper-grid.tsx`
- Create: `components/collections-grid/lower-grid.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `src/collections-grid.ts` — shared types used by UpperGrid and LowerGrid

- [ ] **Step 1: Remove old file**

```bash
Remove-Item -LiteralPath "components/collections-grid.tsx"
```

- [ ] **Step 2: Create directory**

```bash
New-Item -ItemType Directory -Force -Path "components/collections-grid"
```

- [ ] **Step 3: Create placeholder files**

Create empty placeholder files for `index.tsx`, `upper-grid.tsx`, `lower-grid.tsx` with just the exports:

```tsx
// components/collections-grid/upper-grid.tsx
export function UpperGrid() {
  return null;
}
```

```tsx
// components/collections-grid/lower-grid.tsx
export function LowerGrid() {
  return null;
}
```

```tsx
// components/collections-grid/index.tsx
import { UpperGrid } from "./upper-grid";
import { LowerGrid } from "./lower-grid";

export function CollectionsGrid() {
  return (
    <section>
      <UpperGrid />
      <LowerGrid />
    </section>
  );
}
```

- [ ] **Step 4: Verify the app still loads**

```bash
npm run dev
```

Expected: No build errors (grid renders empty sections).

- [ ] **Step 5: Commit**

```bash
git add components/collections-grid.tsx
git add components/collections-grid/
git commit -m "feat: scaffold collections-grid directory structure"
```

---

### Task 2: Create UpperGrid component

**Files:**
- Create: `components/collections-grid/upper-grid.tsx`

**Interfaces:**
- Consumes: nothing (exports `UpperGrid` as React component)
- Produces: `UpperGrid` component — renders 5 grid items in a 7×7 grid

- [ ] **Step 1: Write UpperGrid with all 5 items**

```tsx
import Image from "next/image";
import albaKing from "@/Assets/Furniture/Bed/Alba (King).png";
import halo1 from "@/Assets/Furniture/Center table/Halo (1).png";
import questa from "@/Assets/Furniture/tv cabinet/Questa.png";

const ITEMS = [
  {
    id: "upper-1",
    type: "photo" as const,
    desktopClass: "lg:col-span-2 lg:row-span-7",
    src: albaKing,
    alt: "Alba King bed",
  },
  {
    id: "upper-2",
    type: "photo" as const,
    desktopClass: "lg:col-span-2 lg:row-span-4 lg:col-start-3",
    src: halo1,
    alt: "Halo center table",
  },
  {
    id: "upper-3",
    type: "photo" as const,
    desktopClass: "lg:col-span-3 lg:row-span-4 lg:col-start-5",
    src: questa,
    alt: "Questa TV cabinet",
  },
  {
    id: "upper-4",
    type: "text" as const,
    desktopClass: "lg:col-span-3 lg:row-span-3 lg:col-start-3 lg:row-start-5",
    heading: "Designed for Living",
    subtext: "Each piece tells a story of craft, material, and intention.",
  },
  {
    id: "upper-5",
    type: "video" as const,
    desktopClass: "lg:col-span-2 lg:row-span-3 lg:col-start-6 lg:row-start-5",
  },
];

export function UpperGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:grid-rows-7 gap-1">
      {ITEMS.map((item) => (
        <div key={item.id} className={`relative overflow-hidden bg-muted ${item.desktopClass}`}>
          {item.type === "photo" && "src" in item && item.src ? (
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
            />
          ) : item.type === "text" ? (
            <div className="flex flex-col justify-center items-center p-8 text-center h-full">
              <h3 className="font-serif text-2xl mb-2">{item.heading}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{item.subtext}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-muted-foreground text-lg font-sans tracking-widest">VIDEO</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npm run build 2>&1 | Select-String -Pattern "error" -NotMatch
```

Expected: No errors related to the UpperGrid component.

- [ ] **Step 3: Commit**

```bash
git add components/collections-grid/upper-grid.tsx
git commit -m "feat: add UpperGrid with 5-item 7x7 masonry layout"
```

---

### Task 3: Create LowerGrid component

**Files:**
- Create: `components/collections-grid/lower-grid.tsx`

**Interfaces:**
- Consumes: nothing (exports `LowerGrid` as React component)
- Produces: `LowerGrid` component — renders 8 items in a 7×10 grid

- [ ] **Step 1: Write LowerGrid with all 8 items**

```tsx
import Image from "next/image";
import oglio from "@/Assets/Furniture/divan/Oglio.png";
import loom1 from "@/Assets/Furniture/sofas/Loom (1).png";
import opaline from "@/Assets/Furniture/Lounge Chair/Opaline.png";
import kivo from "@/Assets/Furniture/Center table/Kivo.png";
import serenoKing from "@/Assets/Furniture/Bed/Sereno (King).png";
import cache from "@/Assets/Furniture/Center table/Cache.png";

const ITEMS = [
  {
    id: "lower-1",
    type: "video" as const,
    desktopClass: "lg:col-span-3 lg:row-span-4",
  },
  {
    id: "lower-2",
    type: "photo" as const,
    desktopClass: "lg:col-span-3 lg:row-span-3 lg:row-start-8",
    src: opaline,
    alt: "Opaline lounge chair",
  },
  {
    id: "lower-3",
    type: "photo" as const,
    desktopClass: "lg:col-span-2 lg:row-span-4 lg:col-start-4",
    src: loom1,
    alt: "Loom sofa",
  },
  {
    id: "lower-4",
    type: "photo" as const,
    desktopClass: "lg:col-span-2 lg:row-span-5 lg:col-start-6",
    src: oglio,
    alt: "Oglio divan",
  },
  {
    id: "lower-5",
    type: "text" as const,
    desktopClass: "lg:col-span-2 lg:row-span-3 lg:row-start-5",
    heading: "Built to Last",
    subtext: "Timeless forms crafted from natural materials.",
  },
  {
    id: "lower-6",
    type: "photo" as const,
    desktopClass: "lg:col-span-3 lg:row-span-3 lg:col-start-3 lg:row-start-5",
    src: cache,
    alt: "Cache center table",
  },
  {
    id: "lower-7",
    type: "photo" as const,
    desktopClass: "lg:col-span-2 lg:row-span-3 lg:col-start-4 lg:row-start-8",
    src: kivo,
    alt: "Kivo center table",
  },
  {
    id: "lower-8",
    type: "photo" as const,
    desktopClass: "lg:col-span-2 lg:row-span-5 lg:col-start-6 lg:row-start-6",
    src: serenoKing,
    alt: "Sereno King bed",
  },
];

export function LowerGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:grid-rows-10 gap-1">
      {ITEMS.map((item) => (
        <div key={item.id} className={`relative overflow-hidden bg-muted ${item.desktopClass}`}>
          {item.type === "photo" && "src" in item && item.src ? (
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
            />
          ) : item.type === "text" ? (
            <div className="flex flex-col justify-center items-center p-8 text-center h-full">
              <h3 className="font-serif text-2xl mb-2">{item.heading}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{item.subtext}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-muted-foreground text-lg font-sans tracking-widest">VIDEO</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npm run build 2>&1 | Select-String -Pattern "error" -NotMatch
```

Expected: No errors related to the LowerGrid component.

- [ ] **Step 3: Commit**

```bash
git add components/collections-grid/lower-grid.tsx
git commit -m "feat: add LowerGrid with 8-item 7x10 masonry layout"
```

---

### Task 4: Wire up index.tsx and verify rendering

**Files:**
- Modify: `components/collections-grid/index.tsx`

**Interfaces:**
- Consumes: `UpperGrid`, `LowerGrid` from sibling files
- Produces: `CollectionsGrid` — full-width section combining both grids

- [ ] **Step 1: Write index.tsx**

```tsx
import { UpperGrid } from "./upper-grid";
import { LowerGrid } from "./lower-grid";

export function CollectionsGrid() {
  return (
    <section>
      <UpperGrid />
      <LowerGrid />
    </section>
  );
}
```

- [ ] **Step 2: Verify the app renders in browser**

```bash
npm run dev
```

Navigate to `http://localhost:3000`. Scroll down to the CollectionsGrid section. Expected:
- Upper Grid shows 5 items: 3 photos, 1 text block, 1 video placeholder
- Lower Grid shows 8 items: 6 photos, 1 text block, 1 video placeholder
- Desktop (≥1024px): 7-column layout with correct positioning
- Mobile (<640px): single column, items stacked in order

- [ ] **Step 3: Commit**

```bash
git add components/collections-grid/index.tsx
git commit -m "feat: wire up CollectionsGrid with UpperGrid and LowerGrid"
```

---

### Task 5: Verify build passes

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors or warnings related to the collections grid.

- [ ] **Step 2: Mark complete in task tracker**

Update `docs/plans/task.md` line for "Create Collections editorial masonry grid" to indicate it has been replaced.
