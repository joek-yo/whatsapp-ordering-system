import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        {/* Wrap everything in CartProvider */}
        <CartProvider>
          {/* Fixed Navbar */}
          <Header />

          {/* Main Content (pushed below fixed header) */}
          <main className="pt-16">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}