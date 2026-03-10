"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import { generateWhatsAppMessage } from "@/lib/generateWhatsAppMessage";
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

  // Prefill from sessionStorage if coming from CustomOrderPage
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

    const orderNumber = generateOrderNumber();

    const message = generateWhatsAppMessage({
      orderNumber,
      cart,
      customOrder,
      orderNotes,
      orderType,
      deliveryLocation,
      scheduleTime,
    });

    openWhatsApp(message);
    clearCart();
    sessionStorage.removeItem("customOrderData");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-center">Review Your Order</h1>

      {/* Custom Order */}
      {customOrder && (
        <div className="border rounded-xl p-6 bg-gray-50 space-y-2">
          <h2 className="font-semibold text-lg">Custom Order</h2>
          <p className="text-sm text-gray-600">{customOrder}</p>
          <p className="text-sm text-gray-500">
            Price will be confirmed by the restaurant.
          </p>
        </div>
      )}

      {/* Cart Items */}
      {cart.length > 0 && (
        <div className="border rounded-xl p-6 space-y-2">
          <h2 className="font-semibold text-lg">Cart Items</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>KES {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {/* Order Notes */}
      {orderNotes && (
        <div className="border rounded-xl p-6 space-y-2">
          <h2 className="font-semibold text-lg">Order Notes</h2>
          <p className="text-sm text-gray-600">{orderNotes}</p>
        </div>
      )}

      {/* Customer Details */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Customer Details</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        {/* Order Type */}
        <div className="mt-4 space-y-2">
          <h2 className="font-semibold text-lg">Order Type</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setOrderType("pickup")}
              className={`px-4 py-2 rounded-lg border ${
                orderType === "pickup"
                  ? "bg-green-900 text-white"
                  : "bg-white"
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`px-4 py-2 rounded-lg border ${
                orderType === "delivery"
                  ? "bg-green-900 text-white"
                  : "bg-white"
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
              className="w-full border rounded-lg p-3 mt-2"
            />
          )}

          {/* Schedule */}
          <input
            type="text"
            placeholder="Schedule (Optional)"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
      </div>

      {/* Subtotal & Send */}
      <div className="flex justify-between items-center font-semibold text-lg">
        <span>Subtotal:</span>
        <span>KES {subtotal.toLocaleString()}</span>
      </div>

      <button
        onClick={handleSendOrder}
        className="w-full py-4 bg-green-900 text-white rounded-xl font-semibold hover:bg-green-700 transition"
      >
        Send Order via WhatsApp
      </button>
    </div>
  );
};

export default ReviewPage;