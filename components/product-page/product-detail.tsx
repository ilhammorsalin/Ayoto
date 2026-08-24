"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DemoProduct } from "@/data/demo-product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDetailProps {
  product: DemoProduct;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── LEFT: name + description ─────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            {/* Section label */}
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-primary">
              About this piece
            </p>

            <h2 className="font-serif text-[2.2rem] leading-[1.1] tracking-tight text-foreground">
              {product.name}
            </h2>

            <p className="font-sans text-[15px] leading-[1.85] text-muted-foreground max-w-[52ch]">
              {product.longDescription}
            </p>

            {/* Material pill tags — purely decorative POC */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Boucle Fabric", "Solid Oak Legs", "Made to Order"].map((tag) => (
                <span
                  key={tag}
                  className="  border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: dimensions + policy accordion ─────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <Accordion className="w-full">
              {/* Dimensions */}
              <AccordionItem value="dimensions" className="border-b border-border/60">
                <AccordionTrigger
                  className={cn(
                    "py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground",
                    "hover:text-primary hover:no-underline"
                  )}
                >
                  Dimensions
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pb-5">
                    <table className="w-full text-sm">
                      <tbody>
                        {product.dimensions.map((d, i) => (
                          <tr
                            key={d.label}
                            className={cn(
                              "border-b border-border/30",
                              i % 2 === 0 ? "bg-muted/30" : "bg-transparent"
                            )}
                          >
                            <td className="py-2.5 pl-3 text-[12px] font-medium text-foreground/70 w-1/2">
                              {d.label}
                            </td>
                            <td className="py-2.5 pr-3 text-[13px] font-semibold text-foreground text-right">
                              {d.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Shipping */}
              <AccordionItem value="shipping" className="border-b border-border/60">
                <AccordionTrigger
                  className={cn(
                    "py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground",
                    "hover:text-primary hover:no-underline"
                  )}
                >
                  Shipping
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pb-5 space-y-3">
                    {product.policy.shipping.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-[13px] leading-relaxed text-muted-foreground font-sans"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Returns */}
              <AccordionItem value="returns" className="border-b border-border/60">
                <AccordionTrigger
                  className={cn(
                    "py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground",
                    "hover:text-primary hover:no-underline"
                  )}
                >
                  Returns
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pb-5 space-y-3">
                    {product.policy.returns.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-[13px] leading-relaxed text-muted-foreground font-sans"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
