"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaWhatsapp, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getBusinessData, getCategories, getBundlesCopy } from "@/lib/getBusinessData";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const AboutSection: React.FC = () => {
  const business = getBusinessData() as any;
  const router = useRouter();

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

  const cakeCount = ((getCategories() as any[]).find((c) => /cake/i.test(c.name))?.items?.length) ?? 0;
  const stats = [
    { value: String(cakeCount), label: "Cake Designs" },
    { value: "100%", label: "Made Fresh to Order" },
    { value: "Custom", label: "Orders Welcome" },
  ];

  const copyBlocks = [
    ...(getCategories() as any[])
      .filter((c) => !/bundle/i.test(c.name))
      .map((c) => ({ name: c.name, intro: c.intro || "", outro: c.outro || "" })),
    { name: "Bundles", ...(getBundlesCopy() as any) },
  ].filter((b: any) => b.intro || b.outro);

  const lines = (t: string) =>
    (t || "").split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/90 hover:text-white transition-all cursor-pointer bg-black/20 backdrop-blur-md px-3 py-2 rounded-full"
        >
          <FaArrowLeft size={8} />
          <span>Back</span>
        </button>
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
            {business.name} is the brand of Esther Kuria, based in Nairobi.
            Every order is made fresh, and orders reach us from all over the
            country.
          </p>
          <p>
            Every item on our menu is made fresh to order, with the same care
            whether it&apos;s a birthday cake or a small box of snacks.
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
            >
              <Card padding="none" className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-green-soft flex items-center justify-center text-green">
                  {v.icon}
                </div>
                <h3 className="font-black uppercase tracking-tight text-foreground text-sm">{v.title}</h3>
                <p className="text-xs text-subtext leading-relaxed">{v.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW WE MAKE IT — category copy from menu.json */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground text-center mb-8">
          How We Make It
        </h2>
        {copyBlocks.map((b: any) => {
          const [title, ...rest] = lines(b.intro);
          const hasTag = rest.length > 0 && rest[0].length <= 60;
          const tag = hasTag ? rest[0] : "";
          const body = hasTag ? rest.slice(1) : rest;
          const [oTitle, ...oBody] = lines(b.outro);
          return (
            <Card key={b.name} padding="none" className="p-6 sm:p-8 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-green">{b.name}</p>
              {title && <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground">{title}</h3>}
              {tag && <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gold">{tag}</p>}
              {body.map((l, i) => (
                <p key={i} className="text-sm text-subtext leading-relaxed">{l}</p>
              ))}
              {oTitle && <h4 className="text-sm font-black uppercase tracking-tight text-foreground pt-3">{oTitle}</h4>}
              {oBody.map((l, i) => (
                <p key={i} className="text-sm text-subtext leading-relaxed">{l}</p>
              ))}
            </Card>
          );
        })}
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
          <Link href="/menu">
            <Button variant="primary" rightIcon={<FaArrowRight size={12} />}>
              View Menu
            </Button>
          </Link>
          <Button
            href={`https://wa.me/${business.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            leftIcon={<FaWhatsapp size={16} />}
          >
            Chat With Us
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
