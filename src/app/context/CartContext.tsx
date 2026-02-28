"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  isDrawerOpen: boolean;
  toggleDrawer: (state?: boolean) => void;
  showToast: boolean;        // NEW: Mobile toast
  toastMessage: string;      // NEW: Message for toast
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => 
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });

    if (isMobile) {
      // Show toast notification
      setToastMessage(`✅ ${item.name} added to cart`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      // Desktop drawer opens temporarily
      setIsDrawerOpen(true);
      setTimeout(() => setIsDrawerOpen(false), 3000);
    }
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)));
  };

  const toggleDrawer = (state?: boolean) => {
    if (typeof state === "boolean") setIsDrawerOpen(state);
    else setIsDrawerOpen(prev => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isDrawerOpen,
        toggleDrawer,
        showToast,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};