"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import {
  FURNITURE_ITEMS,
  ROOM_ITEMS,
  THEME_ITEMS,
  SERVICES_LINKS,
  DISCOVER_LINKS,
  COMPANY_LINKS,
  type NavLink,
} from "@/data/nav-groups";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  User,
  Menu,
  ChevronDown,
  X,
  ArrowRight,
  Pencil,
} from "lucide-react";
import { CartIconButton } from "@/components/cart/cart-icon-button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// ─── Mega-menu link: wraps NavigationMenu.Link with Next.js Link ─────────────
function MegaLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenu.Link
      render={<NextLink href={href} />}
      className={className}
    >
      {children}
    </NavigationMenu.Link>
  );
}

// ─── Shared mega-menu section heading ────────────────────────────────────────
function MegaHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[9.5px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
      {children}
    </p>
  );
}

// ─── Shop: 3-column mega-menu ─────────────────────────────────────────────────
function ShopContent() {
  const linkCn =
    "block py-[5px]  text-[13px] text-foreground/75 hover:text-primary hover:bg-primary/5 transition-colors duration-150 leading-snug";

  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-0 p-7 w-[680px]">
      {/* Col 1 — By Furniture */}
      <div>
        <MegaHeading>By Furniture</MegaHeading>
        <ul className="space-y-0 list-none px-2.5 m-0">
          {FURNITURE_ITEMS.map((item) => (
            <li key={item.label}>
              <MegaLink href={item.href} className={linkCn}>
                {item.label}
              </MegaLink>
            </li>
          ))}
        </ul>
        <MegaLink
          href="/collections"
          className="mt-2 flex items-center gap-1 py-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
        >
          View all <ArrowRight className="size-3" />
        </MegaLink>
      </div>

      {/* Col 2 — By Room */}
      <div>
        <MegaHeading>By Room</MegaHeading>
        <ul className="space-y-0 list-none px-2.5 m-0">
          {ROOM_ITEMS.map((item) => (
            <li key={item.label}>
              <MegaLink href={item.href} className={linkCn}>
                {item.label}
              </MegaLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 3 — By Theme + Modular Kitchen CTA */}
      <div className="flex flex-col">
        <MegaHeading>By Theme</MegaHeading>
        <ul className="space-y-0 list-none px-2.5 m-0 mb-6">
          {THEME_ITEMS.map((item) => (
            <li key={item.label}>
              <MegaLink
                href={item.href}
                className="flex items-center gap-2 py-[5px]  text-[13px] text-foreground/75 hover:text-primary hover:bg-primary/5 transition-colors duration-150"
              >
                <span className="text-[11px] opacity-80">{item.tag}</span>
                {item.label}
              </MegaLink>
            </li>
          ))}
        </ul>

        {/* Modular Kitchen CTA card */}
        <div className="mt-auto pt-4 border-t border-border/40">
          <MegaLink
            href="#"
            className="group flex items-start gap-3  border border-primary/20 bg-primary/5 p-3.5 hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            <Pencil className="mt-0.5 size-[15px] shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-primary">
                Modular Kitchen
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                Book a design appointment
              </p>
            </div>
            <ArrowRight className="ml-auto mt-1 size-3 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
          </MegaLink>
        </div>
      </div>
    </div>
  );
}

// ─── Simple single-column mega-menu (Services / Discover / Company) ───────────
function SimpleContent({ links }: { links: NavLink[] }) {
  return (
    <div className="p-3 w-[280px]">
      <ul className="space-y-0.5 list-none px-3 m-0">
        {links.map((link) => (
          <li key={link.label}>
            <MegaLink
              href={link.href}
              className={cn(
                "flex flex-col gap-0.5 py-2.5 transition-colors",
                link.cta
                  ? "border border-primary/20 bg-primary/5 hover:bg-primary/10"
                  : "hover:bg-muted/70",
              )}
            >
              <span
                className={cn(
                  "text-[13px] font-medium leading-snug",
                  link.cta ? "text-primary" : "text-foreground/85",
                )}
              >
                {link.label}
              </span>
              {link.description && (
                <span className="text-[11px] leading-relaxed text-muted-foreground">
                  {link.description}
                </span>
              )}
            </MegaLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Shared content transition classes ───────────────────────────────────────
const contentTransitionCn =
  "transition-opacity duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0";

// ─── Main Navigation ──────────────────────────────────────────────────────────
export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isHomepage = pathname === "/";

  // ── Scroll handler ──
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsVisible(false);
        setSearchOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Escape key closes search ──
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen]);

  const isTransparent = isHomepage && !isScrolled;

  // ── Trigger button style ──
  const triggerCn = cn(
    "flex h-9 cursor-default select-none items-center gap-1.5  px-3 text-sm font-semibold tracking-[0.09em] uppercase transition-colors",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isTransparent
      ? "text-white/80 hover:text-white hover:bg-white/10 data-[popup-open]:bg-white/15 data-[popup-open]:text-white"
      : "text-foreground/65 hover:text-foreground hover:bg-muted data-[popup-open]:bg-muted data-[popup-open]:text-foreground",
  );

  // ── Utility icon button style ──
  const iconCn = cn(
    "flex items-center justify-center  p-2 transition-colors",
    isTransparent
      ? "text-white/80 hover:text-white hover:bg-white/10"
      : "text-foreground/65 hover:text-foreground hover:bg-muted",
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex w-full flex-col transition-all duration-500",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isTransparent
          ? "border-transparent bg-transparent text-white"
          : "border-b border-border bg-background/95 shadow-sm backdrop-blur-md text-foreground",
      )}
    >
      <div className="mx-auto flex h-[64px] w-full max-w-7xl items-center justify-between gap-6 px-6">
        {/* ── Logo ───────────────────────────────────────────────────────── */}
        <NextLink href="/" className="shrink-0">
          <Logo light={isTransparent} />
        </NextLink>

        {/* ── Desktop navigation ─────────────────────────────────────────── */}
        <div className="hidden flex-1 items-center mt-3 justify-between lg:flex">
          {/* NavigationMenu with 4 groups */}
          <NavigationMenu.Root
            aria-label="Main navigation"
            className="flex items-center"
            delay={80}
            closeDelay={100}
          >
            <NavigationMenu.List className="m-0 flex list-none items-center gap-0.5 p-0">
              {/* SHOP ─────────────────────────────────────────────────────── */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerCn}>
                  Shop
                  <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
                    <ChevronDown className="size-3 opacity-70" />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={contentTransitionCn}>
                  <ShopContent />
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* SERVICES ───────────────────────────────────────────────── */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerCn}>
                  Services
                  <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
                    <ChevronDown className="size-3 opacity-70" />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={contentTransitionCn}>
                  <SimpleContent links={SERVICES_LINKS} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* DISCOVER ───────────────────────────────────────────────── */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerCn}>
                  Discover
                  <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
                    <ChevronDown className="size-3 opacity-70" />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={contentTransitionCn}>
                  <SimpleContent links={DISCOVER_LINKS} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* COMPANY ────────────────────────────────────────────────── */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className={triggerCn}>
                  Company
                  <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
                    <ChevronDown className="size-3 opacity-70" />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={contentTransitionCn}>
                  <SimpleContent links={COMPANY_LINKS} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            {/* Floating popup portal */}
            <NavigationMenu.Portal>
              <NavigationMenu.Positioner
                sideOffset={10}
                collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
                className={cn(
                  "z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]",
                  "transition-[top,left,right,bottom] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-[instant]:transition-none",
                  // hover bridge — prevents popup closing when cursor moves from trigger to popup
                  "before:absolute before:content-[''] data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-[10px]",
                )}
              >
                <NavigationMenu.Popup
                  className={cn(
                    "relative h-[var(--popup-height)] w-[var(--popup-width)] overflow-hidden outline-none",
                    "border border-border/50 bg-background shadow-2xl shadow-black/8",
                    "origin-[var(--transform-origin)]",
                    "transition-[opacity,transform,width,height] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0 data-[starting-style]:-translate-y-1",
                    "data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-1",
                    "data-[ending-style]:duration-[140ms] data-[ending-style]:ease-[ease]",
                  )}
                >
                  <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Root>

          {/* ── Utility area: inline search + icon buttons ─────────────── */}
          <div className="flex items-center gap-1">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                /* ── Search bar (expanded) ── */
                <motion.div
                  key="search-open"
                  initial={{ width: 36, opacity: 0 }}
                  animate={{ width: 224, opacity: 1 }}
                  exit={{ width: 36, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "flex h-9 items-center gap-2 overflow-hidden  px-3",
                    isTransparent
                      ? "bg-white/15 text-white ring-1 ring-white/20"
                      : "bg-muted text-foreground ring-1 ring-border",
                  )}
                >
                  <Search className="size-[15px] shrink-0 opacity-50" />
                  <input
                    ref={searchInputRef}
                    autoFocus
                    placeholder="Search furniture…"
                    className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:opacity-40"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                    className="shrink-0 opacity-40 transition-opacity hover:opacity-80"
                  >
                    <X className="size-3.5" />
                  </button>
                </motion.div>
              ) : (
                /* ── Utility icon buttons ── */
                <motion.div
                  key="icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1"
                >
                  <button
                    aria-label="Search"
                    onClick={() => setSearchOpen(true)}
                    className={iconCn}
                  >
                    <Search className="size-[18px]" />
                  </button>
                  <button
                    aria-label="Wishlist"
                    className={iconCn}
                  >
                    <Heart className="size-[18px]" />
                  </button>
                  <CartIconButton transparent={isTransparent} />
                  <button aria-label="Account" className={iconCn}>
                    <User className="size-[18px]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile header (icons + hamburger) ──────────────────────────── */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
            className={iconCn}
          >
            <Search className="size-5" />
          </button>
          <CartIconButton transparent={isTransparent} />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(iconCn, "p-1.5")}
            >
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-full flex-col gap-4 overflow-y-auto bg-background p-6 sm:max-w-md"
            >
              <SheetTitle className="sr-only">Ayoto Navigation Menu</SheetTitle>

              {/* Logo in drawer */}
              <div className="mt-4 flex items-center justify-between">
                <Logo />
              </div>

              <Separator className="my-1 bg-border/40" />

              {/* Groups as accordion */}
              <Accordion className="w-full">
                {/* Shop */}
                <AccordionItem
                  value="shop"
                  className="border-b border-border/40"
                >
                  <AccordionTrigger className="py-3 text-xs font-semibold uppercase tracking-wider hover:text-primary hover:no-underline">
                    Shop
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-0.5 pb-3 px-2">
                      <p className="mb-1 mt-2 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                        By Furniture
                      </p>
                      {FURNITURE_ITEMS.map((item) => (
                        <NextLink
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                        >
                          {item.label}
                        </NextLink>
                      ))}
                      <p className="mb-1 mt-3 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                        By Room
                      </p>
                      {ROOM_ITEMS.map((item) => (
                        <NextLink
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                        >
                          {item.label}
                        </NextLink>
                      ))}
                      <p className="mb-1 mt-3 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                        By Theme
                      </p>
                      {THEME_ITEMS.map((item) => (
                        <NextLink
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2  py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                        >
                          <span className="text-[11px]">{item.tag}</span>
                          {item.label}
                        </NextLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Services */}
                <AccordionItem
                  value="services"
                  className="border-b border-border/40"
                >
                  <AccordionTrigger className="py-3 text-xs font-semibold uppercase tracking-wider hover:text-primary hover:no-underline">
                    Services
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-0.5 pb-3 px-2">
                      {SERVICES_LINKS.map((item) => (
                        <NextLink
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "px-2 py-1.5 text-[13px] transition-colors hover:text-primary",
                            item.cta
                              ? "font-medium text-primary"
                              : "text-muted-foreground",
                          )}
                        >
                          {item.label}
                        </NextLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Discover */}
                <AccordionItem
                  value="discover"
                  className="border-b border-border/40"
                >
                  <AccordionTrigger className="py-3 text-xs font-semibold uppercase tracking-wider hover:text-primary hover:no-underline">
                    Discover
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-0.5 pb-3 px-2">
                      {DISCOVER_LINKS.map((item) => (
                        <NextLink
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                        >
                          {item.label}
                        </NextLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Company */}
                <AccordionItem
                  value="company"
                  className="border-b border-border/40"
                >
                  <AccordionTrigger className="py-3 text-xs font-semibold uppercase tracking-wider hover:text-primary hover:no-underline">
                    Company
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-0.5 pb-3 px-2">
                      {COMPANY_LINKS.map((item) => (
                        <NextLink
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-primary"
                        >
                          {item.label}
                        </NextLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* User actions */}
              <div className="mt-auto flex justify-around border-t border-border/40 p-4">
                <button className="flex items-center gap-2 text-sm transition-colors hover:text-primary">
                  <User className="size-4" /> Account
                </button>
                <button className="flex items-center gap-2 text-sm transition-colors hover:text-primary">
                  <Heart className="size-4" /> Wishlist
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ── Mobile inline search bar (below header row) ─────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="mobile-search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div
              className={cn(
                "mx-4 mb-3 flex items-center gap-2  px-4 py-2",
                isTransparent
                  ? "bg-white/15 text-white ring-1 ring-white/20"
                  : "bg-muted text-foreground",
              )}
            >
              <Search className="size-4 shrink-0 opacity-50" />
              <input
                autoFocus
                placeholder="Search furniture…"
                className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:opacity-40"
              />
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="opacity-40 hover:opacity-80"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
