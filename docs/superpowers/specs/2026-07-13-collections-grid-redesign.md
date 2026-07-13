# Collections Grid Redesign

## Summary

Replace the existing furniture product grid in `components/collections-grid.tsx` with a full-width masonry-style layout consisting of two grid sections (Upper Grid, Lower Grid) populated with placeholder photos, videos, and text.

## Component Structure

```
components/collections-grid/
  index.tsx          — composes UpperGrid + LowerGrid
  upper-grid.tsx     — 7×7 grid with 5 items
  lower-grid.tsx     — 7×10 grid with 8 items
```

## Grid Specifications

### Upper Grid
- Container: full-width, `grid grid-cols-7 grid-rows-7 gap-1`
- Auto-rows: `h-[calc(100vh/7)]` or fixed height per row

| Item | Grid Position | Type | Notes |
|------|--------------|------|-------|
| 1 | col 1-2, row 1-7 | PHOTO | Full left column, spans all 7 rows |
| 2 | col 3-4, row 1-4 | PHOTO | Top middle-left |
| 3 | col 5-7, row 1-4 | PHOTO | Top right, spans 3 cols |
| 4 | col 3-5, row 5-7 | TEXT | Bottom middle, spans 3 cols |
| 5 | col 6-7, row 5-7 | VIDEO | Bottom right |

### Lower Grid
- Container: full-width, `grid grid-cols-7 grid-rows-10 gap-1`
- Auto-rows: same height as Upper Grid

| Item | Grid Position | Type | Notes |
|------|--------------|------|-------|
| 1 | col 1-3, row 1-4 | VIDEO | Top left |
| 2 | col 1-3, row 8-10 | PHOTO | Bottom left |
| 3 | col 4-5, row 1-4 | PHOTO | Top middle |
| 4 | col 6-7, row 1-5 | PHOTO | Top right, taller |
| 5 | col 1-2, row 5-7 | TEXT | Middle left |
| 6 | col 3-5, row 5-7 | PHOTO | Middle |
| 7 | col 4-5, row 8-10 | PHOTO | Bottom middle |
| 8 | col 6-7, row 6-10 | PHOTO | Bottom right, taller |

## Asset Mapping

All photos imported from `Assets/Furniture/`. Videos use a placeholder `<div>` with "VIDEO" text overlay. Text items display sample heading + subtext.

### Upper Grid Assets

| # | Type | Source |
|---|------|--------|
| 1 | PHOTO | `Assets/Furniture/Bed/Alba (King).png` |
| 2 | PHOTO | `Assets/Furniture/Center table/Halo (1).png` |
| 3 | PHOTO | `Assets/Furniture/tv cabinet/Questa.png` |
| 4 | TEXT | Sample heading + subtext (no image) |
| 5 | VIDEO | Placeholder with "VIDEO" text |

### Lower Grid Assets

| # | Type | Source |
|---|------|--------|
| 1 | VIDEO | Placeholder with "VIDEO" text |
| 2 | PHOTO | `Assets/Furniture/Lounge Chair/Opaline.png` |
| 3 | PHOTO | `Assets/Furniture/sofas/Loom (1).png` |
| 4 | PHOTO | `Assets/Furniture/divan/Oglio.png` |
| 5 | TEXT | Sample heading + subtext (no image) |
| 6 | PHOTO | `Assets/Furniture/Center table/Cache.png` |
| 7 | PHOTO | `Assets/Furniture/Center table/Kivo.png` |
| 8 | PHOTO | `Assets/Furniture/Bed/Sereno (King).png` |

## Data Model

```typescript
interface GridItem {
  id: string;
  type: "photo" | "video" | "text";
  colSpan: string;  // e.g. "col-span-2"
  rowSpan: string;  // e.g. "row-span-7"
  colStart?: string;
  rowStart?: string;
  src?: string;     // for photo/video
  label?: string;   // for text
}
```

Each grid (upper/lower) renders from its own array of `GridItem` objects.

## Visual Style
- Placeholder items have muted/bg-muted backgrounds
- Photos: `object-cover` with neutral placeholder background
- Videos: centered play icon overlay or autoplay muted loop
- Text: centered label in muted foreground
- All items: `overflow-hidden`, relative positioning

## Responsive Behavior

Responsive breakpoints using Tailwind `sm` / `md` / `lg`:

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Default (mobile) | < 640px | Single-column stack, items in order, full-width |
| `sm` | ≥ 640px | 2-column grid |
| `md` | ≥ 768px | 3 or 4-column simplified grid |
| `lg` | ≥ 1024px | Full 7-column grid as specified (`grid-cols-7`) |

Both Upper Grid and Lower Grid use the same responsive collapse pattern.
