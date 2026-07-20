"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { CATEGORIES } from "@/data/categories";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";
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

// Primary navigation links (not category-based)
const PRIMARY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Design Services", href: "#" },
  { label: "Locations", href: "#" },
  { label: "Catalog", href: "#" },
  { label: "Contact", href: "#" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Change background opacity based on scroll
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if header should be transparent (overlaying hero)
  const isTransparent = isHomepage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 flex flex-col w-full",
        // Hide/Show translateY
        isVisible ? "translate-y-0" : "-translate-y-full",
        // Background and border transitions
        isTransparent
          ? "bg-transparent text-white border-transparent"
          : "bg-background/95 backdrop-blur-md text-foreground border-b border-border shadow-sm"
      )}
    >
      {/* Row 1 — Primary Navigation & Logo */}
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
        {/* Logo Left */}
        <Link href="/" className="flex items-center">
          <Logo light={isTransparent} />
        </Link>

        {/* Links Right (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center text-xs tracking-wider uppercase font-sans">
            {PRIMARY_LINKS.map((link, idx) => (
              <span key={link.label} className="flex items-center">
                {idx > 0 && <span className="opacity-30 px-3 select-none">|</span>}
                <Link
                  href={link.href}
                  className={cn(
                    "hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
                    pathname === link.href && "text-primary after:scale-x-100"
                  )}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <Separator orientation="vertical" className="h-6 bg-border/20 mx-2" />

          {/* Utility Icons */}
          <div className="flex items-center gap-4 text-inherit">
            <button aria-label="Search" className="hover:text-primary transition-colors">
              <Search className="size-[1.15rem]" />
            </button>
            <button aria-label="Wishlist" className="hover:text-primary transition-colors">
              <Heart className="size-[1.15rem]" />
            </button>
            <button aria-label="Cart" className="hover:text-primary transition-colors">
              <ShoppingCart className="size-[1.15rem]" />
            </button>
            <button aria-label="Account" className="hover:text-primary transition-colors">
              <User className="size-[1.15rem]" />
            </button>
          </div>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <div className="lg:hidden flex items-center gap-4 text-inherit">
          <button aria-label="Search" className="hover:text-primary transition-colors">
            <Search className="size-5" />
          </button>
          <button aria-label="Cart" className="hover:text-primary transition-colors">
            <ShoppingCart className="size-5" />
          </button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger aria-label="Open menu" className="hover:text-primary transition-colors">
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md p-6 bg-background flex flex-col gap-6 overflow-y-auto">
              <SheetTitle className="sr-only">Ayoto Navigation Menu</SheetTitle>

              {/* Logo in Drawer */}
              <div className="flex justify-between items-center mt-4">
                <Logo />
              </div>

              {/* Row 1 Navigation Links inside Drawer */}
              <nav className="flex flex-col gap-4 text-sm font-medium tracking-wide uppercase font-sans mt-4">
                {PRIMARY_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "hover:text-primary transition-colors py-2 border-b border-border/40",
                      pathname === link.href && "text-primary font-semibold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Separator className="bg-border/40 my-2" />

              {/* Row 2 Categories inside Drawer */}
              <div className="flex flex-col gap-2 uppercase font-sans text-xs tracking-wider">
                <p className="text-[10px] text-muted-foreground tracking-[0.2em] mb-2">Categories</p>
                <Accordion className="w-full">
                  {CATEGORIES.map((cat, idx) => (
                    <AccordionItem key={cat.slug} value={`item-${idx}`} className="border-b border-border/40">
                      {cat.subcategories.length > 0 ? (
                        <>
                          <AccordionTrigger className="text-xs font-semibold py-3 hover:text-primary hover:no-underline">
                            {cat.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-3 pl-4 py-2 text-xs normal-case text-muted-foreground font-sans">
                              <Link
                                href={`/collections/${cat.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-primary transition-colors font-medium"
                              >
                                All {cat.name}
                              </Link>
                              {cat.subcategories.map((sub) => (
                                <Link
                                  key={sub.slug}
                                  href={`/collections/${cat.slug}?type=${sub.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="hover:text-primary transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </>
                      ) : (
                        <div className="py-3 text-xs font-semibold">
                          <Link
                            href={`/collections/${cat.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-primary transition-colors block w-full"
                          >
                            {cat.name}
                          </Link>
                        </div>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* User Actions inside Drawer */}
              <div className="mt-auto flex justify-around p-4 border-t border-border/40">
                <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <User className="size-4" /> Account
                </button>
                <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Heart className="size-4" /> Wishlist
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Row 2 — Categories (Desktop Only) */}
      <div
        className={cn(
          "w-full border-t border-border/10 py-3 transition-all duration-300 hidden lg:block",
          isTransparent ? "opacity-0 pointer-events-none h-0 py-0 overflow-hidden" : "opacity-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-8 text-[11px] font-sans font-semibold tracking-[0.15em] uppercase">
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="relative group py-1">
              {cat.subcategories.length > 0 ? (
                <>
                  {/* Category label is a Link to the collection page */}
                  <Link
                    href={`/collections/${cat.slug}`}
                    className="flex items-center gap-1 hover:text-primary transition-colors uppercase"
                  >
                    {cat.name}
                    <ChevronDown className="size-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-background border border-border/80 shadow-lg rounded-sm py-2 px-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col text-left normal-case font-normal text-muted-foreground font-sans z-50">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/collections/${cat.slug}?type=${sub.slug}`}
                        className="px-4 py-2 hover:bg-muted hover:text-foreground transition-colors rounded-sm text-xs"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={`/collections/${cat.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
