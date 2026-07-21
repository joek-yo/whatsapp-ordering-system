"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { openWhatsApp } from "@/lib/whatsapp";

const ReviewPage: React.FC = () => {
  const {
    cart,
    customOrder,
    orderNotes,
    orderType,
    setOrderType,
    deliveryLocation,
    setDeliveryLocation,
    scheduleTime,
    setScheduleTime,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const stored = sessionStorage.getItem("customOrderData");
    if (stored) {
      const data = JSON.parse(stored);
      setName(data.name || "");
      setPhone(data.phone || "");
      setOrderType(data.orderType || "pickup");
      setDeliveryLocation(data.location || "");
      setScheduleTime(data.scheduleTime || "");
    }
  }, [setOrderType, setDeliveryLocation, setScheduleTime]);

  const handleSendOrder = () => {
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    if (orderType === "delivery" && !deliveryLocation) {
      alert("Please provide a delivery location.");
      return;
    }

    openWhatsApp({
      cart,
      customOrder,
      orderNotes,
      orderType,
      deliveryLocation,
      scheduleTime,
      customerName: name,
      customerPhone: phone,
    });

    clearCart();
    sessionStorage.removeItem("customOrderData");
  };

  const inputClass =
    "w-full bg-surface2 border border-border rounded-lg p-3 text-foreground placeholder:text-muted focus:ring-2 focus:ring-green focus:border-green outline-none transition";

  return (
    <div className="min-h-screen bg-background pb-32 pt-[100px] sm:pt-[80px]">
      <div className="px-4 pt-2 pb-6 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">Review Your Order</h1>
        <p className="text-sm text-subtext mt-1">
          Confirm everything before sending to the restaurant
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4 space-y-6 pb-32">
        {/* Custom Order */}
        {customOrder && (
          <div className="bg-green-soft border border-green/30 rounded-xl p-5">
            <h2 className="font-bold text-foreground mb-2">Custom Order</h2>
            <p className="text-sm text-subtext">{customOrder}</p>
            <p className="text-xs text-muted mt-1">
              Price will be confirmed by the restaurant.
            </p>
          </div>
        )}

        {/* Cart Items */}
        {cart.length > 0 && (
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
            <h2 className="font-bold text-foreground">Cart Items</h2>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm gap-3"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-border"
                  />
                )}
                <span className="flex-1 text-foreground">
                  {item.quantity} × {item.name}
                </span>
                <span className="font-bold text-foreground">
                  KES {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Order Notes */}
        {orderNotes && (
          <div className="bg-surface border border-border rounded-xl p-5">
            <h2 className="font-bold text-foreground mb-2">Order Notes</h2>
            <p className="text-sm text-subtext">{orderNotes}</p>
          </div>
        )}

        {/* Customer Details */}
        <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
          <h2 className="font-bold text-foreground">Customer Details</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Order Type */}
        <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
          <h2 className="font-bold text-foreground">Order Type</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setOrderType("pickup")}
              className={`flex-1 py-3 rounded-lg border font-bold text-sm uppercase tracking-wide transition cursor-pointer ${
                orderType === "pickup"
                  ? "bg-green text-background border-green"
                  : "bg-surface2 border-border text-subtext hover:text-foreground"
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`flex-1 py-3 rounded-lg border font-bold text-sm uppercase tracking-wide transition cursor-pointer ${
                orderType === "delivery"
                  ? "bg-green text-background border-green"
                  : "bg-surface2 border-border text-subtext hover:text-foreground"
              }`}
            >
              Delivery
            </button>
          </div>

          {orderType === "delivery" && (
            <input
              type="text"
              placeholder="Delivery location or Google Maps link"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className={inputClass}
            />
          )}

          <input
            type="text"
            placeholder="Schedule (Optional)"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Subtotal */}
        <div className="flex justify-between font-black text-lg px-2 text-foreground">
          <span className="uppercase tracking-wide text-sm text-subtext self-center">Subtotal</span>
          <span>KES {subtotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleSendOrder}
        className="fixed bottom-5 right-5 z-50 rounded-full p-4 bg-whatsapp text-white shadow-glow text-lg hover:opacity-90 transition cursor-pointer"
      >
        <FaWhatsapp size={22} />
      </button>
    </div>
  );
};

export default ReviewPage;
