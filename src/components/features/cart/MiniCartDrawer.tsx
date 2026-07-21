"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaTimes, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const MiniCartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isDrawerOpen, toggleDrawer } = useCart();
  const router = useRouter();
  const [hovering, setHovering] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDrawerOpen && !isMobile) {
      const timer = setTimeout(() => {
        if (!hovering) toggleDrawer(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen, hovering, isMobile, toggleDrawer]);

  const handleViewCart = () => {
    setViewClicked(true);
    toggleDrawer(false);
    router.push("/cart");
  };

  return (
    <>
      {isMobile && cart.length > 0 && (
        <button
          onClick={() => toggleDrawer(true)}
          className="fixed bottom-6 right-6 z-50 bg-green text-background font-black text-xs uppercase tracking-widest px-5 py-3.5 rounded-full shadow-glow hover:bg-green-strong transition-all flex items-center gap-2 cursor-pointer"
        >
          <FaShoppingCart size={14} />
          <span>Cart ({cart.length})</span>
        </button>
      )}

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => toggleDrawer(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[320px] md:w-[360px] lg:w-[420px] xl:w-[460px] bg-surface border-l border-border shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <div className="flex justify-between items-center p-6 border-b border-border">
                <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
                  Your Cart ({cart.length})
                </h2>
                <button
                  onClick={() => toggleDrawer(false)}
                  className="text-subtext hover:text-foreground p-2 rounded-lg hover:bg-surface2 transition cursor-pointer"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {cart.length === 0 ? (
                  <p className="text-subtext text-center text-sm py-12">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-border pb-5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full bg-surface2 flex items-center justify-center text-muted text-[10px] uppercase tracking-wide">
                            IMG
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
                        <p className="text-xs text-subtext mt-0.5">KES {item.price.toLocaleString()}</p>

                        <div className="flex items-center mt-2 gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-surface2 border border-border rounded-md hover:border-green hover:text-green transition cursor-pointer"
                          >
                            <FaMinus size={9} />
                          </button>
                          <span className="text-sm font-bold w-5 text-center text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-surface2 border border-border rounded-md hover:border-green hover:text-green transition cursor-pointer"
                          >
                            <FaPlus size={9} />
                          </button>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-black text-sm text-foreground">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-danger hover:underline mt-1.5 flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <FaTrash size={9} /> Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-border bg-surface2 space-y-4">
                <div className="flex justify-between font-black text-base text-foreground">
                  <span className="uppercase tracking-wide text-xs text-subtext self-center">Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleViewCart}
                  disabled={cart.length === 0}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    viewClicked ? "bg-green-strong text-background" : "bg-green text-background hover:bg-green-strong shadow-glow"
                  }`}
                >
                  View Full Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniCartDrawer;
