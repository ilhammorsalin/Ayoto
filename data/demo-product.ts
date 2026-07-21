import type { StaticImageData } from "next/image";
import adaptis from "@/Assets/Furniture/sofas/Adaptis.png";
import naturalBouke from "@/Assets/Furniture/Variants/Natural Bouke.png";
import warmSand from "@/Assets/Furniture/Variants/Warm Sand.png";
import slateGray from "@/Assets/Furniture/Variants/Slate Gray.png";
import charcoal from "@/Assets/Furniture/Variants/Charcoal.png";

/**
 * Extended product type for the single demo product.
 * Adds long-form description, dimensions, and policy content
 * on top of the base Product fields.
 */
export type DemoProduct = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: string;
  priceNumeric: number; // for cart math
  subtext: string;      // short one-liner (Page 1)
  longDescription: string; // editorial paragraph (Page 2)
  images: StaticImageData[];
  colorImages: StaticImageData[]; // one variant image per color, aligned with colorOptions
  colorOptions: {
    label: string;
    hex: string;
  }[];
  dimensions: {
    label: string;
    value: string;
  }[];
  policy: {
    shipping: string;
    returns: string;
  };
};

export const DEMO_PRODUCT: DemoProduct = {
  id: "adaptis",
  name: "Adaptis",
  category: "living-room",
  subcategory: "sofa",
  price: "৳ 85,000",
  priceNumeric: 85000,
  subtext: "Modular sofa crafted for quiet, intentional living",
  longDescription:
    "The Adaptis is a study in restraint. Its clean lines and low-slung profile draw from Japanese wabi-sabi — the beauty of imperfection and transience — while the deep seat cushions invite a slower pace. Upholstered in tightly woven boucle with solid oak legs, each piece carries the warmth of natural material and the steadiness of considered craft. The Adaptis doesn't ask for attention. It simply earns it, day after quiet day.",
  images: [adaptis],
  colorImages: [naturalBouke, warmSand, slateGray, charcoal],
  colorOptions: [
    { label: "Natural Bouke", hex: "#D4C4A8" },
    { label: "Warm Sand",    hex: "#C8A97E" },
    { label: "Slate Gray",   hex: "#6B7280" },
    { label: "Charcoal",     hex: "#2F2F2F" },
  ],
  dimensions: [
    { label: "Width",          value: "240 cm" },
    { label: "Depth",          value: "95 cm"  },
    { label: "Height",         value: "75 cm"  },
    { label: "Seat Height",    value: "42 cm"  },
    { label: "Seat Depth",     value: "62 cm"  },
  ],
  policy: {
    shipping: `Our preferred partners for shipments are GLS and NGT/LGT. GLS for package deliveries and NGT/LGT for furniture and larger items.\n\nWe process your order as quickly as possible. Orders on stocked items are handled and fulfilled at our warehouse in Dhaka with expected shipping of 2–5 business days depending on location. Larger products, made-to-order and pre-orders will ship according to the estimated ship date stated on the product page.\n\nWe offer free shipping on orders over ৳ 10,000.`,
    returns: `We hope you love your purchase, but if not, you're welcome to return it within 30 days of receiving your order. Please note that return shipping costs are not covered by Ayoto.\n\nShould you wish to return a product, please follow the steps stated in our Return Policy.\n\nKindly note: our made-to-order items are specially crafted for you. Therefore all made-to-order items are non-refundable and placed orders are considered final.`,
  },
};
