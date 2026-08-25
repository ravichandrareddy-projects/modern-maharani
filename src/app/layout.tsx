import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { CartProvider } from "@/lib/cartContext";

export const metadata: Metadata = {
  title: "Modern Maharani | Premium Women's Fashion Showroom & Online Store KPHB",
  description: "Shop contemporary Women's Fashion, Kurtis, Dresses & Occasion Wear at Modern Maharani in KPHB Phase 1, Kukatpally, Hyderabad. Direct online ordering available.",
  keywords: ["Women's fashion store in KPHB", "Kurtis in KPHB", "Dresses in Kukatpally", "Women's clothing Hyderabad", "Modern Maharani KPHB"],
  openGraph: {
    title: "Modern Maharani — Premium Digital Showroom",
    description: "Contemporary Women's Fashion Showroom in KPHB, Kukatpally, Hyderabad.",
    url: "https://modernmaharani.com",
    siteName: "Modern Maharani",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <LocalBusinessSchema />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#7A1C30] selection:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
