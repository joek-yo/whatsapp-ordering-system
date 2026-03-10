"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const CustomOrderPage: React.FC = () => {
  const router = useRouter();
  const { setCustomOrder: setCartCustomOrder, setOrderNotes: setCartOrderNotes } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [location, setLocation] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [customOrder, setCustomOrder] = useState("");
  const [notes, setNotes] = useState("");

  const handleProceed = () => {
    // Basic validation
    if (!name || !phone || !customOrder) {
      alert("Please fill in your name, phone, and custom order.");
      return;
    }

    if (orderType === "delivery" && !location) {
      alert("Please enter delivery location.");
      return;
    }

    // Store custom order & notes in CartContext so Review page can access
    setCartCustomOrder(customOrder);
    setCartOrderNotes(notes);

    // Save extra customer info in localStorage/sessionStorage to pass to Review
    sessionStorage.setItem("customOrderData", JSON.stringify({
      name,
      phone,
      orderType,
      location,
      scheduleTime,
    }));

    // Redirect to Review page
    router.push("/review");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-center">Request a Custom Order</h1>

      {/* Customer Info */}
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
      </div>

      {/* Order Type */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Order Type</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setOrderType("pickup")}
            className={`px-4 py-2 rounded-lg border ${
              orderType === "pickup" ? "bg-green-900 text-white" : "bg-white"
            }`}
          >
            Pickup
          </button>
          <button
            onClick={() => setOrderType("delivery")}
            className={`px-4 py-2 rounded-lg border ${
              orderType === "delivery" ? "bg-green-900 text-white" : "bg-white"
            }`}
          >
            Delivery
          </button>
        </div>

        {orderType === "delivery" && (
          <input
            type="text"
            placeholder="Delivery location or Google Maps link"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        )}
      </div>

      {/* Schedule */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Schedule (Optional)</h2>
        <input
          type="text"
          placeholder="Example: Saturday 4PM"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Custom Order */}
      <div className="border rounded-xl p-6 space-y-4 bg-gray-50">
        <h2 className="font-semibold text-lg">Custom Order Details</h2>
        <textarea
          value={customOrder}
          onChange={(e) => setCustomOrder(e.target.value)}
          placeholder="Example: 5kg vanilla birthday cake with strawberry filling and gold decorations."
          className="w-full border rounded-lg p-3 min-h-[120px]"
        />
      </div>

      {/* Notes */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Extra Notes (Optional)</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example: Less sugar, add candles."
          className="w-full border rounded-lg p-3 min-h-[100px]"
        />
      </div>

      {/* Proceed to Review */}
      <button
        onClick={handleProceed}
        className="w-full py-4 bg-green-900 text-white rounded-xl font-semibold hover:bg-green-700 transition"
      >
        Review Order
      </button>
    </div>
  );
};

export default CustomOrderPage;