"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate email sending service or API
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Get in Touch
      </motion.h2>

      {/* Contact Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
      >
        {[
          {
            icon: <FaPhoneAlt size={22} />,
            title: "Call Us",
            info: "+254 7590 90305",
            link: "tel:0759090305",
            bg: "bg-green-700 hover:bg-green-800",
          },
          {
            icon: <FaEnvelope size={22} />,
            title: "Email Us",
            info: "esthermbaire231@gmail.com",
            link: "mailto:esthermbaire231@gmail.com",
            bg: "bg-gray-800 hover:bg-gray-900",
          },
          {
            icon: <FaWhatsapp size={22} />,
            title: "WhatsApp Chat",
            info: "+254 7590 90305",
            link: "https://wa.me/254759090305",
            bg: "bg-green-500 hover:bg-green-600",
          },
        ].map((card, idx) => (
          <motion.a
            key={idx}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2 } },
            }}
            className={`flex flex-col items-center p-8 rounded-2xl shadow-2xl text-white transition ${card.bg}`}
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-center">{card.info}</p>
          </motion.a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 flex flex-col gap-6"
      >
        {submitted && (
          <div className="text-green-700 font-semibold text-center">
            Thank you! We'll get back to you soon.
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          name="message"
          rows={6}
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
          className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        ></textarea>
        <button
          type="submit"
          className="bg-green-900 hover:bg-green-800 text-white font-semibold py-4 rounded-xl transition"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default ContactSection;