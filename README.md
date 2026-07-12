# Ayoto Furniture

A frontend skeleton for Ayoto Furniture, built with Next.js 15, Tailwind CSS v4, and framer-motion, following a minimalist, editorial design philosophy inspired by Japanese aesthetic principles.

## What Has Been Built (Frontend Skeleton)

### Foundation & Global Setup
- **Next.js 15 (App Router)** setup with TypeScript and Tailwind CSS v4.
- **Custom Design System (`globals.css`)** utilizing OKLCH color tokens, bypassing standard Tailwind configuration for an exclusively CSS-driven theme.
- **Typography Integration**: 
  - Google Fonts: `Crimson Pro` (serif headers) & `Satoshi` (geometric sans body).
  - Local Fonts: `Overcame Demo` & `Montserrat ExtraLight` (exclusively for the brand logo lockup).
- **Global Components**:
  - `Navigation`: A sticky, two-row header mirroring the existing site structure. Includes transparent-to-solid scroll transitions, desktop hover dropdowns, and a mobile `Sheet` hamburger menu.
  - `Footer`: Global dark-mode footer with social links and brand statement.
  - `Logo`: Reusable logo lockup component adapting to light/dark themes.

### Homepage (`/`)
- `LoadingScreen`: A homepage-exclusive entry animation featuring a synchronized progress bar and teal color transition, dissolving seamlessly into the pre-rendered hero section.
- `Hero`: Full-viewport landing with a cinematic desktop image crossfade slideshow, falling back to a static, performance-optimized layout for mobile.
- `CollectionsGrid`: An asymmetric editorial masonry grid. Features hover-reveal product details on desktop and persistent clean data strips on mobile.
- `Craftsmanship`: A sequential scroll-revealing story utilizing `whileInView` framer motion to fade up content in an alternating image/text layout.

### About Page (`/about`)
- `ScrollNarrative`: A slow-scroll storytelling experience powered by Framer Motion's `useScroll` and `useTransform`. Statements continuously fade and rise tied to scroll progress.
- `StatsOverlay`: Numerical data gracefully fading in midway through the scroll narrative.
- `LegacySection`: A clean three-column typography-driven layout detailing press, makers, and inspiration.
- `NavigationHub`: The final teal call-to-action block utilizing custom shadcn `Card` components with staggered entry animations.

## What Is Left (Future Polish & Backend)

- **Actual Assets & Copy:** Replacing placeholder Unsplash images and placeholder text with official Ayoto product photography and finalized copy.
- **Backend & Data Integration:** Hooking up the hardcoded arrays (products, collections) to a headless CMS or database (e.g., Odoo backend integration).
- **Missing Pages:** 
  - Dynamic Product Listing Pages (PLP) for Categories (Living Room, Bedroom, etc.).
  - Product Detail Pages (PDP).
  - Design Services, Locations, Contact.
- **Links & Routing:** All secondary navigation currently uses placeholder `href="#"` dead links, awaiting the creation of actual routes.
- **Cart & Authentication:** Implementing real logic behind the Wishlist, Cart, and User Account icons in the top navigation row.

## Run Locally

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
