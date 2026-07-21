"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const CartToast: React.FC = () => {
  const { showToast, toastMessage } = useCart();

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 bg-surface border border-border-strong text-foreground px-6 py-3.5 rounded-2xl shadow-2xl z-[100] flex items-center gap-3"
        >
          <FaCheckCircle className="text-green shrink-0" size={16} />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;
