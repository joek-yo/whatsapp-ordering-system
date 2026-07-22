"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { getBusinessData } from "@/lib/getBusinessData";
import Button from "@/components/ui/Button";

const ContactSection: React.FC = () => {
  const business = getBusinessData();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `*New Website Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
    const cleanPhone = business.phone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;

    setSubmitted(true);

    setTimeout(() => {
      window.location.href = whatsappUrl;
      setFormData({ name: "", email: "", message: "" });
    }, 1000);

    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactOptions = [
    {
      icon: <FaPhoneAlt size={20} />,
      title: "Call Us",
      info: business.phone,
      link: `tel:${business.phone}`,
      bg: "bg-green text-background hover:bg-green-strong",
    },
    {
      icon: <FaEnvelope size={20} />,
      title: "Email Us",
      info: business.email,
      link: `mailto:${business.email}`,
      bg: "bg-surface2 text-foreground border border-border hover:border-green hover:text-green",
    },
    {
      icon: <FaWhatsapp size={20} />,
      title: "WhatsApp Chat",
      info: business.phone,
      link: `https://wa.me/${business.phone.replace(/[^0-9]/g, '')}`,
      bg: "bg-whatsapp text-white hover:opacity-90",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-background">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-black uppercase tracking-tighter text-center mb-12 text-foreground"
      >
        Get in Touch
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
      >
        {contactOptions.map((card, idx) => (
          <motion.a
            key={idx}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } },
            }}
            className={`flex flex-col items-center p-8 rounded-3xl shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer ${card.bg}`}
          >
            <div className="mb-4 p-3 bg-background/10 rounded-full">{card.icon}</div>
            <h3 className="text-lg font-black uppercase tracking-wide mb-2">{card.title}</h3>
            <p className="text-center font-medium opacity-90 text-sm">{card.info}</p>
          </motion.a>
        ))}
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-surface shadow-2xl rounded-[2rem] p-8 md:p-12 border border-border flex flex-col gap-6"
      >
        {submitted && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-soft text-green p-4 rounded-xl font-bold text-center border border-green/30"
          >
            Redirecting to WhatsApp... Thank you!
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-xl bg-surface2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-green transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-surface2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-green transition"
          />
        </div>
        <textarea
          name="message"
          rows={5}
          placeholder="How can we help you?"
          required
          value={formData.message}
          onChange={handleChange}
          className="p-4 rounded-xl bg-surface2 border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-green resize-none transition"
        ></textarea>
        <Button
          type="submit"
          disabled={submitted}
          variant="primary"
          fullWidth
          leftIcon={<FaWhatsapp className="text-lg" />}
        >
          {submitted ? "Sending..." : "Send via WhatsApp"}
        </Button>
      </motion.form>
    </section>
  );
};

export default ContactSection;
