"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { ChevronLeft, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

function formatPrice(n: number) {
  return `৳ ${n.toLocaleString("en-IN")}`;
}

// ─── Input field ──────────────────────────────────────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  id,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "h-11 w-full rounded-lg border border-border bg-background px-4",
          "text-[13px] text-foreground placeholder:text-muted-foreground/50",
          "outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
        )}
      />
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4">
      {children}
    </h2>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [payMethod, setPayMethod] = useState<"card" | "cod">("card");
  const [coupon, setCoupon] = useState("");

  const shipping = subtotal >= 10000 ? 0 : 500;
  const tax      = 0;
  const total    = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background pt-[64px]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:py-16">

        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="size-3" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px]">

          {/* ══════════════════════════════
              LEFT — payment form
          ══════════════════════════════ */}
          <div className="flex flex-col gap-10">

            {/* Contact */}
            <section>
              <SectionHeading>Contact</SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="email"   label="Email address" type="email" placeholder="you@example.com" />
                <Field id="phone"   label="Phone number"  type="tel"   placeholder="+880 1XXX XXXXXX" />
              </div>
            </section>

            {/* Delivery */}
            <section>
              <SectionHeading>Delivery</SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="fname"  label="First name"    placeholder="Ilham" />
                <Field id="lname"  label="Last name"     placeholder="Morsalin" />
                <div className="sm:col-span-2">
                  <Field id="address" label="Address"    placeholder="House, Road, Area" />
                </div>
                <Field id="city"   label="City"          placeholder="Dhaka" />
                <Field id="postal" label="Postal code"   placeholder="4000" />
              </div>
            </section>

            {/* Payment */}
            <section>
              <SectionHeading>Payment</SectionHeading>

              {/* Method toggle */}
              <div className="mb-5 flex gap-2">
                {(["card", "cod"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayMethod(m)}
                    className={cn(
                      "flex-1 rounded-lg border py-2.5 text-[12px] font-semibold uppercase tracking-widest transition-all",
                      payMethod === m
                        ? "border-primary bg-primary/8 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    {m === "card" ? "Credit / Debit Card" : "Cash on Delivery"}
                  </button>
                ))}
              </div>

              {/* Card fields */}
              {payMethod === "card" && (
                <div className="grid gap-4">
                  <Field id="card-number"  label="Card number"  placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="card-expiry" label="Expiry (MM/YY)" placeholder="08 / 28" />
                    <Field id="card-cvv"    label="CVV"            placeholder="•••" />
                  </div>
                  <Field id="card-name" label="Name on card" placeholder="Ilham Morsalin" />
                </div>
              )}

              {payMethod === "cod" && (
                <p className="rounded-lg border border-border bg-muted/40 px-4 py-4 text-[13px] text-muted-foreground leading-relaxed">
                  Pay with cash when your order is delivered. Applicable within Dhaka city.
                </p>
              )}
            </section>

            {/* Pay Now CTA */}
            <button
              onClick={() => {
                alert("Order placed! (POC — no backend)");
                clearCart();
              }}
              className={cn(
                "w-full rounded-lg bg-primary py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-primary-foreground",
                "transition-all duration-200 hover:bg-primary/90 active:scale-[0.99]",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
              disabled={items.length === 0}
            >
              {items.length === 0 ? "No items in cart" : `Pay Now — ${formatPrice(total)}`}
            </button>
          </div>

          {/* ══════════════════════════════
              RIGHT — order summary
          ══════════════════════════════ */}
          <aside className="lg:sticky lg:top-[80px] lg:h-fit">
            <div className="rounded-xl border border-border bg-muted/20 p-6 flex flex-col gap-6">

              {/* Order items */}
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  Order Summary
                </p>
                {items.length === 0 ? (
                  <p className="text-[13px] text-muted-foreground">Your cart is empty.</p>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.key} className="flex items-center gap-4">
                        <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md bg-background border border-border/40">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {item.colorLabel} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-[13px] font-semibold text-foreground">
                          {formatPrice(item.priceNumeric * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-border/60" />

              {/* Coupon */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/50">
                  Discount Code
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter code"
                      className={cn(
                        "h-10 w-full rounded-lg border border-border bg-background pl-8 pr-3",
                        "text-[13px] placeholder:text-muted-foreground/50 outline-none",
                        "focus:border-primary focus:ring-2 focus:ring-primary/15"
                      )}
                    />
                  </div>
                  <button
                    className={cn(
                      "rounded-lg border border-primary px-4 text-[12px] font-semibold uppercase tracking-wider text-primary",
                      "transition-colors hover:bg-primary/8"
                    )}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/60" />

              {/* Price breakdown */}
              <div className="flex flex-col gap-2.5 text-[13px]">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-primary font-medium" : ""}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (0%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/60" />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                  Total
                </span>
                <span className="text-[1.4rem] font-bold text-foreground">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
