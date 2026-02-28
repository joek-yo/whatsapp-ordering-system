"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MiniCartDrawer from "./components/MiniCartDrawer";
import CartToast from "./components/CartToast";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        
        {/* Global Providers */}
        <CartProvider>
          
          {/* Fixed Navbar */}
          <Header />

          {/* Premium Slide-In Drawer */}
          <MiniCartDrawer />

          {/* Mobile Toast */}
          <CartToast />

          {/* Page Content */}
          <main className="pt-16 flex-grow">{children}</main>

          {/* Footer */}
          <Footer />

        </CartProvider>

      </body>
    </html>
  );
}