"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getBusinessData, getCategories, getBundlesCopy } from "@/lib/getBusinessData";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import story from "@/data/story.json";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const AboutSection: React.FC = () => {
  const business = getBusinessData() as any;
  const router = useRouter();

  const cakeCount = ((getCategories() as any[]).find((c) => /cake/i.test(c.name))?.items?.length) ?? 0;
  const stats = [
    { value: String(cakeCount), label: "Cake Designs" },
    { value: "100%", label: "Made Fresh to Order" },
    { value: "Custom", label: "Orders Welcome" },
  ];

  const copyBlocks = [
    ...(getCategories() as any[])
      .filter((c) => /bundle/i.test(c.name) === false)
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
            {story.tagline}
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

      {/* MEET ESTHER */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          <motion.div {...reveal} className="md:col-span-2">
            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto rounded-3xl overflow-hidden border border-border shadow-glow">
              <Image
                src={story.image}
                alt="Esther, Founder and Executive Chef of House of Jaby"
                fill
                sizes="(max-width: 768px) 80vw, 360px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div {...reveal} className="md:col-span-3 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gold">{story.role}</p>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-foreground">
              {story.title}
            </h2>
            {story.intro.map((t: string, i: number) => (
              <p key={i} className="text-subtext leading-relaxed">{t}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* A MOMENT THAT MADE IT REAL */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <motion.div {...reveal}>
          <Card padding="none" className="p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
              {story.moment.title}
            </h3>
            {story.moment.body.map((t: string, i: number) => (
              <p key={i} className="text-sm sm:text-base text-subtext leading-relaxed">{t}</p>
            ))}
          </Card>
        </motion.div>
      </section>

      {/* CRAFTED MOMENTS, THE JABY WAY */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.div {...reveal} className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">
            {story.jabyWay.title}
          </h2>
          {story.jabyWay.body.map((t: string, i: number) => (
            <p key={i} className="text-subtext leading-relaxed">{t}</p>
          ))}
          <blockquote className="mt-8 border-l-4 border-gold pl-5 py-2 text-lg md:text-xl font-bold italic text-foreground">
            “{story.jabyWay.pullQuote}”
          </blockquote>
        </motion.div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground text-center mb-8">
          {story.highlightsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {story.highlights.map((h: { title: string; desc: string }, i: number) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card padding="none" className="p-6 text-center space-y-3 h-full">
                <h3 className="font-black uppercase tracking-tight text-foreground text-sm">{h.title}</h3>
                <p className="text-xs text-subtext leading-relaxed">{h.desc}</p>
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

      {/* STATS STRIP */}
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
          {story.closing.title}
        </h2>
        <div className="space-y-4 mb-8">
          {story.closing.body.map((t: string, i: number) => (
            <p key={i} className="text-subtext leading-relaxed">{t}</p>
          ))}
        </div>
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
            {story.closing.ctaText}
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
