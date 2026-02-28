"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="flex justify-between items-center bg-white p-6 rounded-lg shadow"
              whileHover={{ scale: 1.01 }}
            >
              {/* Product Image */}
              <div className="w-24 h-24 relative flex-shrink-0 rounded-md overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    IMG
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">
                  KES {item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>

              {/* Total Price */}
              <div className="ml-4 text-right font-bold">
                KES {(item.price * item.quantity).toLocaleString()}
              </div>
            </motion.div>
          ))}

          <div className="text-right mt-8">
            <h2 className="text-2xl font-bold">
              Subtotal: KES {subtotal.toLocaleString()}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;