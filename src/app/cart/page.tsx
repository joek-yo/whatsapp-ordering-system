"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    customOrder,
    setCustomOrder,
    orderNotes,
    setOrderNotes,
  } = useCart();

  const router = useRouter();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const canProceed = cart.length > 0 || customOrder.trim() !== "";

  const handleProceed = () => {
    if (!canProceed) return;
    router.push("/review");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Your Cart ({cart.length})
      </h1>

      {/* CART ITEMS */}
      {cart.length > 0 && (
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
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
      )}

      {/* REQUEST FULL CUSTOM ORDER */}
      <div className="border rounded-xl p-6 text-center bg-green-50 border-green-200">
        <h2 className="font-semibold text-lg mb-2">
          Need Something Not on the Menu?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          You can request cakes, catering, bulk meals, or any special order.
        </p>
        <Link href="/custom-order">
          <button className="px-6 py-3 bg-green-900 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            🎂 Request Full Custom Order
          </button>
        </Link>
      </div>

      {/* CUSTOM ORDER */}
      <div className="border rounded-xl p-6 bg-gray-50">
        <h2 className="font-semibold text-lg mb-3">
          Custom Order (Optional)
        </h2>
        <textarea
          value={customOrder}
          onChange={(e) => setCustomOrder(e.target.value)}
          placeholder="Example: 5kg vanilla birthday cake with strawberry filling and gold decorations."
          className="w-full border rounded-lg p-3 text-sm min-h-[120px]"
        />
      </div>

      {/* ORDER NOTES */}
      <div className="border rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-3">
          Order Notes (Optional)
        </h2>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="Example: No onions, extra spicy, less sugar."
          className="w-full border rounded-lg p-3 text-sm min-h-[100px]"
        />
      </div>

      {/* SUMMARY */}
      <div className="bg-gray-50 rounded-xl p-6 border space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>KES {subtotal.toLocaleString()}</span>
        </div>

        {customOrder && (
          <p className="text-sm text-gray-600">
            Custom order price will be confirmed by the restaurant.
          </p>
        )}

        <button
          onClick={handleProceed}
          disabled={!canProceed}
          className="w-full py-3 bg-green-900 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;