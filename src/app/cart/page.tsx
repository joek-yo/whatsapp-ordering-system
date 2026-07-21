"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import menuData from "@/data/menu.json";

const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateItemNote,
    customOrder,
    setCustomOrder,
    orderNotes,
    setOrderNotes,
    addToCart,
  } = useCart();

  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openNoteId, setOpenNoteId] = useState<number | null>(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceed = () => router.push("/review");

  // --- DYNAMIC BEST SELLERS / SUGGESTIONS (exclude items already in cart) ---
  const suggestions = [
    ...menuData.categories.flatMap((category) =>
      category.items
        .filter(
          (item) =>
            item.bestSelling &&
            item.available &&
            !cart.some((c) => c.id === item.id)
        )
        .map((item) => ({ ...item }))
    ),
    ...menuData.bundles
      .filter(
        (bundle) =>
          bundle.bestSelling &&
          bundle.available &&
          !cart.some((c) => c.id === bundle.id)
      )
      .map((bundle) => ({ ...bundle }))
  ];

  // Add suggestion silently without triggering MiniCartDrawer
  const handleAddSuggestion = (item: any) => {
    addToCart({ ...item, quantity: 1 }, { silent: true });
    setToastMessage(`${item.name} added to cart!`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const toggleNoteEditor = (id: number) => {
    setOpenNoteId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background pb-16 pt-[80px] relative">
      {/* HEADER */}
      <div className="px-4 pt-4 pb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tighter">Your Cart</h1>
        <p className="text-sm text-subtext mt-1">
          {cart.length} item{cart.length !== 1 && "s"} in your order
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-8">
        {/* CART ITEMS */}
        {cart.length > 0 && (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-border rounded-xl p-4 transition hover:shadow-glow"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface2">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted text-xs">
                        IMG
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-foreground">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-subtext mt-1">
                      KES {item.price.toLocaleString()}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 rounded-lg border border-border-strong flex items-center justify-center text-lg font-semibold text-foreground transition hover:bg-green hover:text-background hover:border-green active:scale-95 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="font-medium min-w-[24px] text-center text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 rounded-lg border border-border-strong flex items-center justify-center text-lg font-semibold text-foreground transition hover:bg-green hover:text-background hover:border-green active:scale-95 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => toggleNoteEditor(item.id)}
                        className="text-xs font-bold text-green hover:text-green-strong transition cursor-pointer"
                      >
                        {item.note && item.note.trim() ? "✏️ Edit note" : "+ Add note"}
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-danger hover:opacity-80 transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-sm sm:text-base text-foreground">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {item.note && item.note.trim() && openNoteId !== item.id && (
                  <div className="mt-3 pt-3 border-t border-border text-xs text-subtext">
                    <span className="font-bold text-foreground">Note:</span> {item.note}
                  </div>
                )}

                {openNoteId === item.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <textarea
                      value={item.note || ""}
                      onChange={(e) => updateItemNote(item.id, e.target.value)}
                      placeholder='e.g. "Happy Birthday Amy" or "Extra chocolate drizzle"'
                      className="w-full bg-surface2 border border-border-strong rounded-lg p-3 text-sm text-foreground placeholder:text-muted min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green"
                    />
                    <button
                      onClick={() => setOpenNoteId(null)}
                      className="mt-2 text-xs font-bold text-green hover:text-green-strong transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* SUBTOTAL */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>

              <button
                onClick={handleProceed}
                className="w-full py-3 rounded-xl bg-green text-background font-black uppercase tracking-widest transition hover:bg-green-strong active:scale-95 cursor-pointer"
              >
                Review Cart Order
              </button>
            </div>
          </div>
        )}

        {/* SUGGESTIONS */}
        {suggestions.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-sm sm:text-base text-foreground">You may also like</h2>
            <div className="space-y-3">
              {suggestions.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-subtext">
                        KES {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddSuggestion(item)}
                    className="px-3 py-1.5 text-sm bg-green text-background rounded-lg font-bold transition hover:bg-green-strong active:scale-95 cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOM ORDER CTA */}
        <div className="bg-green-soft border border-green/30 rounded-xl p-5 text-center">
          <h2 className="font-bold text-sm sm:text-base mb-2 text-foreground">
            Need Something Not on the Menu?
          </h2>
          <p className="text-xs sm:text-sm text-subtext mb-4">
            Request cakes, catering, bulk meals, or any special order.
          </p>
          <Link href="/custom-order">
            <button className="px-6 py-3 bg-green text-background rounded-lg text-sm font-black uppercase tracking-widest transition hover:bg-green-strong active:scale-95 cursor-pointer">
              🎂 Request Custom Order
            </button>
          </Link>
        </div>

        {/* CUSTOM ORDER DETAILS */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="font-bold text-sm sm:text-base mb-2 text-foreground">Custom Order Details</h2>
          <textarea
            value={customOrder}
            onChange={(e) => setCustomOrder(e.target.value)}
            placeholder="Example: 5kg vanilla birthday cake with strawberry filling."
            className="w-full bg-surface2 border border-border-strong rounded-lg p-3 text-sm text-foreground placeholder:text-muted min-h-[110px] focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* ORDER NOTES */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="font-bold text-sm sm:text-base mb-2 text-foreground">Order Notes</h2>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Example: No onions, extra spicy."
            className="w-full bg-surface2 border border-border-strong rounded-lg p-3 text-sm text-foreground placeholder:text-muted min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green"
          />
        </div>

        {/* REVIEW CUSTOM ORDER BUTTON */}
        {customOrder.trim() && (
          <div className="bg-surface border border-border rounded-xl p-5">
            <button
              onClick={handleProceed}
              className="w-full py-3 rounded-xl bg-green text-background font-black uppercase tracking-widest transition hover:bg-green-strong active:scale-95 cursor-pointer"
            >
              Review Custom Order
            </button>
          </div>
        )}
      </div>

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green text-background px-6 py-3 rounded-xl shadow-lg font-bold animate-slide-up z-50">
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
