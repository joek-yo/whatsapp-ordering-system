"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaGem,
  FaStore,
  FaTruck,
  FaCalendarAlt,
  FaPen,
  FaStickyNote,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

const SectionCard: React.FC<{
  index: number;
  icon: React.ReactNode;
  step: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}> = ({ index, icon, step, title, children, accent }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={fadeUp}
    className={`rounded-2xl border p-6 sm:p-8 space-y-5 transition-colors ${
      accent
        ? "bg-green-soft border-green"
        : "bg-surface border-border hover:border-border-strong"
    }`}
  >
    <div className="flex items-center gap-2 text-green">
      {icon}
      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
        {step}
      </span>
    </div>
    <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground">
      {title}
    </h2>
    {children}
  </motion.div>
);

const fieldClass =
  "w-full rounded-xl border border-border bg-surface2 px-4 py-3 text-foreground placeholder:text-muted focus:ring-2 focus:ring-green focus:border-green outline-none transition";

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
    if (!name || !phone || !customOrder) {
      alert("Please fill in your name, phone, and custom order.");
      return;
    }

    if (orderType === "delivery" && !location) {
      alert("Please enter delivery location.");
      return;
    }

    setCartCustomOrder(customOrder);
    setCartOrderNotes(notes);

    sessionStorage.setItem(
      "customOrderData",
      JSON.stringify({ name, phone, orderType, location, scheduleTime })
    );

    router.push("/review");
  };

  return (
    <div className="min-h-screen bg-background py-14 px-4 sm:px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-green-soft to-transparent pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto space-y-8">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted hover:text-foreground transition-all cursor-pointer"
        >
          <FaArrowLeft size={8} />
          <span>Back</span>
        </button>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-surface2 border border-gold/30 px-4 py-1.5 rounded-full text-gold">
            <FaGem size={11} />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
              Bespoke Orders
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-foreground">
            Craft Your Custom Order
          </h1>
          <p className="text-subtext max-w-xl mx-auto">
            Cakes, catering, special meals, or bulk orders — tell us exactly
            what you have in mind and we'll bring it to life.
          </p>
        </motion.div>

        {/* CUSTOMER INFO */}
        <SectionCard index={0} icon={<FaPen size={11} />} step="Step 1" title="Customer Details">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
            />
          </div>
        </SectionCard>

        {/* ORDER TYPE */}
        <SectionCard index={1} icon={<FaTruck size={11} />} step="Step 2" title="Order Type">
          <div className="flex gap-3">
            <button
              onClick={() => setOrderType("pickup")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold uppercase text-xs tracking-widest transition-all cursor-pointer ${
                orderType === "pickup"
                  ? "bg-green text-background border-green shadow-glow"
                  : "bg-surface2 border-border text-subtext hover:border-border-strong"
              }`}
            >
              <FaStore size={13} /> Pickup
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold uppercase text-xs tracking-widest transition-all cursor-pointer ${
                orderType === "delivery"
                  ? "bg-green text-background border-green shadow-glow"
                  : "bg-surface2 border-border text-subtext hover:border-border-strong"
              }`}
            >
              <FaTruck size={13} /> Delivery
            </button>
          </div>

          {orderType === "delivery" && (
            <input
              type="text"
              placeholder="Delivery location or Google Maps link"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={fieldClass}
            />
          )}
        </SectionCard>

        {/* SCHEDULE */}
        <SectionCard index={2} icon={<FaCalendarAlt size={11} />} step="Step 3 · Optional" title="Schedule">
          <input
            type="text"
            placeholder="Example: Saturday 4PM"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className={fieldClass}
          />
        </SectionCard>

        {/* CUSTOM ORDER — signature accent card */}
        <SectionCard index={3} icon={<FaGem size={11} />} step="Step 4" title="Your Vision" accent>
          <textarea
            value={customOrder}
            onChange={(e) => setCustomOrder(e.target.value)}
            placeholder="Example: 5kg vanilla birthday cake with strawberry filling and gold decorations."
            className={`${fieldClass} min-h-[130px] bg-surface`}
          />
        </SectionCard>

        {/* NOTES */}
        <SectionCard index={4} icon={<FaStickyNote size={11} />} step="Step 5 · Optional" title="Extra Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Example: Less sugar, add candles."
            className={`${fieldClass} min-h-[110px]`}
          />
        </SectionCard>

        {/* SUBMIT */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProceed}
          className="w-full py-4 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest rounded-2xl bg-green text-background shadow-glow hover:bg-green-strong transition-colors cursor-pointer"
        >
          Review Order <FaArrowRight size={13} />
        </motion.button>

      </div>
    </div>
  );
};

export default CustomOrderPage;
