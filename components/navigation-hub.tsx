"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { House, Grid, Mail, MapPin } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const HUB_LINKS = [
  {
    title: "Home",
    description: "Return to the beginning",
    icon: House,
    href: "/",
  },
  {
    title: "Browse Collections",
    description: "Explore our furniture",
    icon: Grid,
    href: "#",
  },
  {
    title: "Contact",
    description: "Start a conversation",
    icon: Mail,
    href: "#",
  },
  {
    title: "Visit Us",
    description: "Find us in Dhaka",
    icon: MapPin,
    href: "#",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function NavigationHub() {
  return (
    <section className="bg-primary text-primary-foreground py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {HUB_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <motion.div key={link.title} variants={cardVariants}>
                <Link href={link.href} className="block h-full group">
                  <Card className="h-full bg-primary border-primary-foreground/20 text-primary-foreground  transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary-foreground/5 cursor-pointer">
                    <CardHeader className="pb-4">
                      <Icon className="size-6 text-primary-foreground/80 mb-2" />
                      <h3 className="font-sans font-semibold text-lg tracking-wide">
                        {link.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-primary-foreground/70 text-sm font-sans">
                        {link.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
