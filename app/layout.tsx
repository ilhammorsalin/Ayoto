import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";
import { CartPanel } from "@/components/cart/cart-panel";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const overcame = localFont({
  src: "../Assets/OvercameDemoRegular.ttf",
  variable: "--font-overcame",
  display: "swap",
});

const montserratExtraLight = localFont({
  src: "../Assets/montserrat.extralight.ttf",
  variable: "--font-montserrat-el",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayoto — Designed for Quiet Living",
  description: "Dhaka-based furniture inspired by Japanese minimalism, timeless craftsmanship, and natural materials.",
  openGraph: {
    title: "Ayoto — Designed for Quiet Living",
    description: "Furniture inspired by Japanese minimalism.",
    url: "https://ayoto.com",
    siteName: "Ayoto",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${overcame.variable} ${montserratExtraLight.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <CartProvider>
          <Navigation />
          <CartPanel />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
        {process.env.NODE_ENV === 'development' && process.env.PINY_VISUAL_SELECT === 'true' && (
          <Script
            src="/_piny/piny.phone.js"
            strategy="beforeInteractive"
          />
        )}
      </body>
    </html>
  );
}
