import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  turbopack: {
    rules: {
      "*.mp4": {
        type: "asset",
      },
    },
  },
};

export default nextConfig;
