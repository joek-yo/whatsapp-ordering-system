import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import SearchBar from "@/components/home/SearchBar";
import Footer from "@/components/layout/Footer";
import MiniCartDrawer from "@/components/features/cart/MiniCartDrawer";
import CartToast from "@/components/features/cart/CartToast";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { getBusinessData } from "@/lib/getBusinessData";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const business = getBusinessData();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${business.name} | ${business.slogan}`,
    template: `%s | ${business.name}`,
  },
  description: business.tagline || business.slogan,
  openGraph: {
    title: business.name,
    description: business.slogan,
    images: business.banner ? [business.banner] : [],
    locale: "en_KE",
    type: "website",
  },
  icons: business.logo ? [{ url: business.logo }] : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col grain">
        <ThemeProvider>
          <CartProvider>
            <div className="sticky top-0 left-0 w-full z-50">
              <AnnouncementBar />
              <Header />
            </div>
            <SearchBar />
            <MiniCartDrawer />
            <CartToast />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
