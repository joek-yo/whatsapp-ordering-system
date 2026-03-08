"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { generateWhatsAppCheckout } from "@/lib/whatsapp";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const url = generateWhatsAppCheckout(cart);

    if (!url) return;

    window.open(url, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10">
        Your Cart ({cart.length})
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">

          {/* Items */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-start gap-4 border-b pb-6">

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      IMG
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    KES {item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-6 border">
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Subtotal</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full py-3 bg-green-900 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;