# Ayoto Website — Competitive Analysis & Phase 2 Design Handoff

**Date:** 2026-08-08
**Session Focus:** Competitive benchmarking of Ayoto against European/US contemporary furniture websites + initial brainstorming for Phase 2 improvements.

---

## Project Context

**Ayoto** (`D:/Ilham Stuff/Coding/Web-Apps/Ayoto`) is a premium furniture e-commerce site branded *"Designed for Quiet Living"* — Japanese minimalism meets Dhaka craftsmanship. It's a POC built with:

- **Next.js 16** (App Router, Turbopack), **TypeScript 5**, **Tailwind v4**
- **shadcn/ui**, **Base UI** (NavigationMenu), **Framer Motion**, **Embla Carousel**
- **Fonts:** Overcame (logo), Crimson Pro (serif), Satoshi (sans), Montserrat ExtraLight
- **OKLCH color system** with teal-green primary accent (`oklch(62% 0.12 175)`)
- **Pages:** `/` (home), `/about`, `/collections/[category]`, `/products/[id]`, `/checkout`
- **Data:** Static/hardcoded — `data/categories.ts`, `data/products.ts`, `data/nav-groups.ts`, `data/demo-product.ts`
- **Cart:** React Context + `useReducer`

No backend API. Checkout is a form-only POC (no real payment). Products are demo data.

---

## Competitive Analysis Summary

### Sites Benchmarked

| # | Site | Type | URL |
|---|------|------|-----|
| 1 | **Ayoto** | The subject | `localhost:3000` / `ayoto-furniture.vercel.app` |
| 2 | **Audo Copenhagen** | Danish minimal/luxury | `audocph.com` |
| 3 | **Lulu & Georgia** | US contemporary | `luluandgeorgia.com` |
| 4 | **West Elm** | US mass-premium | `westelm.com` |
| 5 | **Bemz** | Swedish sustainable | `bemz.com` |
| 6 | **Sofacompany** | Danish DTC | `sofacompany.com` |
| 7 | **Jakobsen Copenhagen** | Danish craftsmanship | `jakobsencopenhagen.com` (via Spring/Summer case study) |

### Methodology
- Read all Ayoto source files (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `components/navigation.tsx`, `components/hero.tsx`, `components/footer.tsx`, `components/loading-screen.tsx`)
- Chrome DevTools: navigated to all 4 sites, took full-page screenshots and accessibility snapshots
- Web search for European furniture UX trends (UX Benchmark Report from Cylindo, agency case studies)

### What Ayoto Does Well
- **Visual restraint** — matched Audo/Jakobsen Cph minimalism better than US competitors
- **Video hero** — full-viewport `.mp4` loop, on par with Bemz
- **Scroll-aware transparent→solid nav** with backdrop blur
- **Mega-menu UX** — Base UI with animated popups, hover bridge, technically more polished than competitors
- **Loading screen** — letter-by-letter AYOTO color-fill animation (unique, none of the competitors had one)
- **Typography pairing** — Crimson Pro + Satoshi matches European serif/sans trend
- **Japanese-wabi sabi positioning** — fills a niche none of the competitors occupy

### Key Gaps Identified (Ranked by Impact)

1. **No editorial/inspiration content** — competitors all have lookbooks, "Ideas & Advice", designer interviews, styling guides
2. **No announcement bar** — Audo has 3-message carousel (sale, shipping, free shipping)
3. **No trust signals** — no warranty, returns policy, secure payment badges, free shipping thresholds
4. **No newsletter signup** — Audo, West Elm capture emails in footer
5. **No designer collaborations** — Lulu & Georgia has 10+ named designer collabs
6. **No free design services** — both L&G and West Elm offer this as homepage CTA
7. **No B2B/Trade section** — Audo has "Professionals" hub (image bank, Revit files, upholstery program); West Elm has full TRADE/CONTRACT/WORK
8. **No quick-ship/in-stock badges** — West Elm has dedicated "Delivered in 1–4 Weeks" homepage section
9. **No seasonal collections** — West Elm has Fall Lookbook, Halloween Shop; L&G has Spring/Summer/Fall drops
10. **No loyalty program** — West Elm "Key Rewards" (2% back)
11. **No accessibility page** — all 3 competitors have dedicated accessibility statements
12. **Product pages are thin** — single POC demo product with no specs/care/materials detail section
13. **Image fill position bugs** — several `<Image fill>` warnings in dev console (missing `relative` parent)

### Console Warnings Found
```
Image with src "/_next/static/media/Questa..." has "fill" and parent element with invalid "position".
(7 instances — Questa, Halo, Alba, Oglio product images)
```
These should be fixed as part of any Phase 2 work.

---

## Brainstorming Session State

We were at **Step 1** (Explore project context) and **Step 2** (Visual companion offered/accepted) of the brainstorming skill workflow.

- Visual companion server started at `http://localhost:62667`
- Screen dir: `D:/Ilham Stuff/Coding/Web-Apps/Ayoto/.superpowers/brainstorm/727-1784840587`
- Waiting screen pushed (no active question displayed)

The first clarifying question was asked: *scope confirmation — Phase 2 incremental improvements vs. broader rebrand.* User interrupted to request this handoff.

---

## What the Next Session Should Do

1. **Load the `brainstorming` skill** — this is a design doc creation session following the superpowers workflow
2. **Reconnect the visual companion** — start server if not running, reopen browser
3. **Confirm scope** with the user — Phase 2 improvements (editorial, trust signals, newsletter, announcement bar, etc.) or broader work
4. **"Grill the user"** — push back on assumptions: Why add a journal if there's no content pipeline? Why do free design services in Dhaka when competitors are in EU/US markets? What's Ayoto's actual differentiator beyond "Japanese minimalism in Bangladesh"?
5. **Propose 2-3 approaches** with trade-offs for the improvement strategy
6. **Present design sections** incrementally, getting approval after each
7. **Write design doc** to `docs/superpowers/specs/YYYY-MM-DD-ayoto-phase2-design.md`
8. **Run spec review loop** via spec-document-reviewer subagent
9. **Hand off to `writing-plans` skill** for implementation plan

---

## Suggested Skills for Next Session

- **brainstorming** — primary skill; this is the design doc workflow
- **writing-plans** — after design doc is approved
- **code-explainer** — if any architecture needs explaining
- **systematic-debugging** — for the Image fill warnings if they're addressed in Phase 2

---

## Files Not to Duplicate

- All source code already read and analyzed — see files listed above under Project Context
- Chrome screenshots saved to temp: `C:\Users\Ilham\AppData\Local\Temp\chrome-devtools-mcp-*\screenshot.png`
- No PRDs, plans, or ADRs exist yet for Phase 2

---

## Dev Server Note

The Next.js dev server may still be running on port 3000 (PID 19424). If not, run `npm run dev` from `D:/Ilham Stuff/Coding/Web-Apps/Ayoto`.
