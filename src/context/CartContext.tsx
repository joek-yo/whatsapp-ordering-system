"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Cart item interface
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Order type
type OrderType = "pickup" | "delivery";

// Context interface
interface CartContextType {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;

  isDrawerOpen: boolean;
  toggleDrawer: (state?: boolean) => void;

  showToast: boolean;
  toastMessage: string;

  // NEW ORDER STATES
  customOrder: string;
  setCustomOrder: (value: string) => void;

  orderNotes: string;
  setOrderNotes: (value: string) => void;

  orderType: OrderType;
  setOrderType: (type: OrderType) => void;

  deliveryLocation: string;
  setDeliveryLocation: (location: string) => void;

  scheduleTime: string;
  setScheduleTime: (time: string) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // NEW ORDER STATES
  const [customOrder, setCustomOrder] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity, image: item.image ?? p.image }
            : p
        );
      }
      return [...prev, item];
    });

    if (isMobile) {
      setToastMessage(`✅ ${item.name} added to cart`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setIsDrawerOpen(true);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  // Toggle drawer
  const toggleDrawer = (state?: boolean) => {
    if (typeof state === "boolean") setIsDrawerOpen(state);
    else setIsDrawerOpen(prev => !prev);
  };

  // Clear cart after order
  const clearCart = () => {
    setCart([]);
    setCustomOrder("");
    setOrderNotes("");
    setDeliveryLocation("");
    setScheduleTime("");
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

        customOrder,
        setCustomOrder,

        orderNotes,
        setOrderNotes,

        orderType,
        setOrderType,

        deliveryLocation,
        setDeliveryLocation,

        scheduleTime,
        setScheduleTime,

        clearCart,
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