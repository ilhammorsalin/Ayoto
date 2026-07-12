import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const overcame = localFont({
  src: "../public/fonts/OvercameDemoRegular.ttf",
  variable: "--font-overcame",
  display: "swap",
});

const montserratExtraLight = localFont({
  src: "../public/fonts/montserrat.extralight.ttf",
  variable: "--font-montserrat-el",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayoto — Designed for Quiet Living",
  description: "Chittagong-based furniture inspired by Japanese minimalism, timeless craftsmanship, and natural materials.",
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
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
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
