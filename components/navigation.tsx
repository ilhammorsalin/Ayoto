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
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  User,
  Menu,
  ChevronDown,
  X,
  ArrowRight,
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

// ─── Mega-menu link ──────────────────────────────────────────────────────────
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
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}

// ─── Column heading ──────────────────────────────────────────────────────────
function MegaHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 px-1 text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
      {children}
    </p>
  );
}

const ACCENT = "hover:bg-[#319093] hover:text-white";

// ─── Shop: 3-column mega-menu ─────────────────────────────────────────────────
function ShopContent() {
  const linkCn = cn(
    "group block px-2.5 py-[7px] text-[13px] text-foreground/75 transition-colors leading-snug -mx-1",
    ACCENT,
  );

  const half = Math.ceil(FURNITURE_ITEMS.length / 2);
  const furnitureA = FURNITURE_ITEMS.slice(0, half);
  const furnitureB = FURNITURE_ITEMS.slice(half);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 p-10">
      {/* Col 1 — Featured */}
      <div>
        <MegaHeading>Featured</MegaHeading>
        <div className="space-y-[2px]">
          {THEME_ITEMS.map((item) => (
            <MegaLink
              key={item.label}
              href={item.href}
              className={cn(
                "group flex flex-col gap-0.5 px-2.5 py-3 -mx-1 transition-colors",
                ACCENT,
              )}
            >
              <span className="text-[13px] font-medium text-foreground/85 group-hover:text-white transition-colors">
                {item.tag} {item.label}
              </span>
            </MegaLink>
          ))}
        </div>
      </div>

      {/* Col 2 — By Furniture */}
      <div>
        <MegaHeading>By Furniture</MegaHeading>
        <ul className="space-y-[2px] list-none px-0 m-0">
          {furnitureA.map((item) => (
            <li key={item.label}>
              <MegaLink href={item.href} className={linkCn}>
                {item.label}
              </MegaLink>
            </li>
          ))}
          {furnitureB.map((item) => (
            <li key={item.label}>
              <MegaLink href={item.href} className={linkCn}>
                {item.label}
              </MegaLink>
            </li>
          ))}
        </ul>
        <MegaLink
          href="/collections"
          className="mt-2 flex items-center gap-1 py-1 text-[11px] text-muted-foreground hover:text-primary transition-colors px-1"
        >
          View all <ArrowRight className="size-3" />
        </MegaLink>
      </div>

      {/* Col 3 — By Room */}
      <div>
        <MegaHeading>By Room</MegaHeading>
        <ul className="space-y-[2px] list-none px-0 m-0">
          {ROOM_ITEMS.map((item) => (
            <li key={item.label}>
              <MegaLink href={item.href} className={linkCn}>
                {item.label}
              </MegaLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Card-grid mega-menu (Services / Discover / Company) ──────────────────────
function SimpleContent({ links }: { links: NavLink[] }) {
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <MegaLink
            key={link.label}
            href={link.href}
            className={cn(
              "group flex flex-col gap-1.5 p-5 transition-colors",
              ACCENT,
            )}
          >
            <span className="text-[14px] font-semibold text-foreground/85 group-hover:text-white transition-colors">
              {link.label}
            </span>
            {link.description && (
              <span className="text-[12px] leading-relaxed text-muted-foreground group-hover:text-white/60 transition-colors">
                {link.description}
              </span>
            )}
          </MegaLink>
        ))}
      </div>
    </div>
  );
}

// ─── Main Navigation ──────────────────────────────────────────────────────────
export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuValue, setMenuValue] = useState<"" | "shop" | "services" | "discover" | "company">("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const isHomepage = pathname === "/";

  // ── Scroll handler ──
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const openMenu = (val: typeof menuValue) => {
    clearTimeout(closeTimer.current);
    setMenuValue(val);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenuValue(""), 100);
  };

  const cancelClose = () => {
    clearTimeout(closeTimer.current);
  };

  // ── Trigger button style ──
  const triggerCn = (active: boolean) =>
    cn(
      "flex h-9 cursor-default select-none items-center gap-1.5 px-3 text-sm font-semibold tracking-[0.09em] uppercase transition-colors outline-none",
      isTransparent
        ? active
          ? "bg-white/15 text-white"
          : "text-white/80 hover:text-white hover:bg-white/10"
        : active
          ? "bg-muted text-foreground"
          : "text-foreground/65 hover:text-foreground hover:bg-muted",
    );

  // ── Utility icon button style ──
  const iconCn = cn(
    "flex items-center justify-center  p-2 transition-colors",
    isTransparent
      ? "text-white/80 hover:text-white hover:bg-white/10"
      : "text-foreground/65 hover:text-foreground hover:bg-muted",
  );

  const NAV_ITEMS = [
    { key: "shop" as const, label: "Shop" },
    { key: "services" as const, label: "Services" },
    { key: "discover" as const, label: "Discover" },
    { key: "company" as const, label: "Company" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex w-full flex-col",
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
          <nav className="flex items-center gap-0.5">
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                className={triggerCn(menuValue === key)}
                onMouseEnter={() => openMenu(key)}
              >
                {label}
                <ChevronDown
                  className={cn(
                    "size-3 opacity-70 transition-transform duration-200",
                    menuValue === key && "rotate-180",
                  )}
                />
              </button>
            ))}
          </nav>

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

      {/* ── Backdrop overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {menuValue && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-35 bg-black/20"
            onClick={() => setMenuValue("")}
          />
        )}
      </AnimatePresence>

      {/* ── Mega menu overlay ────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {menuValue && (
          <motion.div
            key={menuValue}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[64px] left-0 z-50 w-screen h-[75vh] overflow-y-auto border-t border-border bg-background shadow-2xl"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto w-full max-w-[1600px]">
              {menuValue === "shop" && <ShopContent />}
              {menuValue === "services" && <SimpleContent links={SERVICES_LINKS} />}
              {menuValue === "discover" && <SimpleContent links={DISCOVER_LINKS} />}
              {menuValue === "company" && <SimpleContent links={COMPANY_LINKS} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
