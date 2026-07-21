"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { getBusinessData } from "@/lib/getBusinessData";

const AboutSection: React.FC = () => {
  const business = getBusinessData() as any;

  // ⚠️ PLACEHOLDER COPY — replace with the real House of Jaby story before launch.
  const values = [
    {
      icon: <FaHeart size={18} />,
      title: "Made With Care",
      text: "Every order is prepared fresh, by hand, the same day it's promised to you.",
    },
    {
      icon: <FaLeaf size={18} />,
      title: "Quality Ingredients",
      text: "We source ingredients we'd be proud to serve our own families — nothing cuts corners.",
    },
    {
      icon: <FaWhatsapp size={18} />,
      title: "Personal Service",
      text: "No call centers, no bots — just a real conversation on WhatsApp, from order to delivery.",
    },
  ];

  const stats = [
    { value: "500+", label: "Orders Delivered" },
    { value: "4.8★", label: "Average Rating" },
    { value: "100%", label: "Made Fresh Daily" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {business.banner && (
          <Image
            src={business.banner}
            alt={business.name}
            fill
            className="absolute inset-0 object-cover scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-subtext text-base md:text-lg"
          >
            {business.slogan}
          </motion.p>
        </div>
      </section>

      {/* STORY BODY — placeholder, owner to replace */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-subtext leading-relaxed space-y-4"
        >
          <p>
            {business.name} started with a simple idea: bring genuinely fresh,
            carefully made food and treats straight to the people who&apos;d enjoy
            them most — no middlemen, no shortcuts, just good food and a real
            conversation on WhatsApp.
          </p>
          <p>
            {/* PLACEHOLDER — replace with the actual founding story, e.g. how it started,
                who's behind it, what makes House of Jaby's approach different. */}
            What began as small batches for friends and family has grown into
            a trusted name for cakes, pastries, drinks, and custom orders across
            the community — built one order, one satisfied customer, at a time.
          </p>
          <p>
            Every item on our menu is prepared fresh, the same care whether
            it&apos;s a birthday cake for fifty guests or a single cup of coffee.
            That&apos;s the promise behind every order we send out.
          </p>
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 text-center space-y-3"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-green-soft flex items-center justify-center text-green">
                {v.icon}
              </div>
              <h3 className="font-black uppercase tracking-tight text-foreground text-sm">{v.title}</h3>
              <p className="text-xs text-subtext leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS STRIP — placeholder numbers, owner to replace with real figures */}
      <section className="bg-surface2 border-y border-border">
        <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-black text-green tracking-tighter">{s.value}</p>
              <p className="text-[10px] md:text-xs text-subtext uppercase tracking-widest mt-1 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
          Ready to Order?
        </h2>
        <p className="text-subtext mb-8">
          Browse the menu or send us a message — we&apos;re one WhatsApp chat away.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/menu"
            className="group inline-flex items-center justify-center gap-3 bg-green text-background px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-glow hover:bg-green-strong transition-all"
          >
            View Menu
            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={`https://wa.me/${business.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-whatsapp text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all"
          >
            <FaWhatsapp size={16} />
            Chat With Us
          </a>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
