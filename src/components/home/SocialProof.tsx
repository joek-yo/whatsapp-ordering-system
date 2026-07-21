"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaComments } from "react-icons/fa";
import { getFeaturedTestimonials } from "@/lib/getBusinessData";
import SectionHeader from "@/components/home/SectionHeader";

const SocialProof: React.FC = () => {
  const testimonials = getFeaturedTestimonials(6);

  if (!testimonials.length) return null;

  return (
    <section>
      <SectionHeader
        title="What Customers Say"
        badge="Social Proof"
        icon={FaComments}
        href="/about"
        viewAllText="Our Story"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {testimonials.map((t: any, i: number) => (
          <motion.div
            key={`${t.category}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-surface border border-border rounded-2xl p-5 space-y-3 hover:border-green/40 transition-colors"
          >
            <FaQuoteLeft className="text-green/40" size={18} />
            <p className="text-sm text-subtext font-medium leading-relaxed">{t.text}</p>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <span className="text-xs font-black text-foreground uppercase tracking-wide block">{t.name}</span>
                <span className="text-[9px] text-muted uppercase tracking-widest">{t.category}</span>
              </div>
              <span className="flex items-center gap-0.5 text-green">
                {[...Array(5)].map((_, si) => (
                  <FaStar key={si} size={10} className={si < t.rating ? "" : "opacity-25"} />
                ))}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
