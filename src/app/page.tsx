"use client";

import Button from "@/components/ui/Button";
import React from "react";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CategoryDiscovery from "@/components/home/CategoryDiscovery";
import FeaturedBundles from "@/components/home/FeaturedBundles";
import JabysFavorites from "@/components/home/JabysFavorites";
import BestSellers from "@/components/home/BestSellers";
import FlashSales from "@/components/home/FlashSales";
import SocialProof from "@/components/home/SocialProof";
import { getUIConfig } from "@/lib/getBusinessData";
import { FaGem, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import menuData from "@/data/menu.json";

const Pages: React.FC = () => {
  const ui = getUIConfig() as any;
  const { categories, bundles } = menuData;
  const allItems = categories.flatMap((c) => c.items);
  const jabyFavorites = allItems.filter((i) => i.jabysFavorite);
  const bestSellers = allItems.filter((i) => i.bestSelling).slice(0, 8);
  const featuredBundles = bundles;

  return (
    <main>
      {/* ---------------- Hero Section ---------------- */}
      <Hero />
      <div className="mt-[-40px] sm:mt-[-64px] relative z-10">
        <TrustBar />
      </div>

      {/* ---------------- Page Content ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="lg:hidden mb-2">
          <CategoryDiscovery />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-13 gap-6 lg:gap-10">
          <aside className="hidden lg:block lg:col-span-3">
            <CategoryDiscovery />
          </aside>
          <div className="lg:col-span-10 space-y-16 sm:space-y-24">
        {/* ---------------- Flash Sales ---------------- */}
        <FlashSales />

        {/* ---------------- Best Sellers ---------------- */}
        <BestSellers products={bestSellers} />

        {/* ---------------- Jaby's Favorites ---------------- */}
        {jabyFavorites.length > 0 && <JabysFavorites products={jabyFavorites} />}

        {/* ---------------- Featured Bundles ---------------- */}
        {featuredBundles.length > 0 && (
          <section>
            <FeaturedBundles bundles={featuredBundles} />
          </section>
        )}

        {/* ---------------- Social Proof ---------------- */}
        <SocialProof />
          </div>
        </div>
      </div>

      <div className="space-y-16 sm:space-y-24">
        {/* ---------------- Custom Order — Closing Section ---------------- */}
        <section className="relative overflow-hidden mt-16 sm:mt-24 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl border border-border bg-surface2 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-green/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 py-14 sm:px-12 sm:py-16 lg:px-14">
                {/* ---- Left: Copy + CTA ---- */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center lg:text-left"
                >
                  <div className="inline-flex items-center gap-2 bg-green-soft text-green px-4 py-1.5 rounded-full mb-6">
                    <FaGem size={12} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Didn't Find What You Were Looking For?</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-foreground mb-4">
                    Let Us Craft It <span className="text-green">Just For You</span>
                  </h2>

                  <p className="text-subtext mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Cakes, catering, bulk orders, or something entirely your own — tell us what you have in mind and we'll bring it to life, bespoke, straight over WhatsApp.
                  </p>

                  <Link href="/custom-order">
                    <Button
                      variant="primary"
                      size="lg"
                      className="group"
                      rightIcon={<FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
                    >
                      Start a Custom Order
                    </Button>
                  </Link>
                </motion.div>

                {/* ---- Right: WhatsApp chat mockup ---- */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  <div className="lg:rotate-[-2deg] bg-background border border-border-strong rounded-2xl shadow-2xl overflow-hidden max-w-sm mx-auto">
                    <div className="bg-whatsapp/90 px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
                        <FaWhatsapp className="text-background" size={16} />
                      </div>
                      <div>
                        <p className="text-background text-xs font-black uppercase tracking-wide leading-none">House of Jaby</p>
                        <p className="text-background/70 text-[10px] mt-0.5">Online</p>
                      </div>
                    </div>
                    <div className="p-4 space-y-3 bg-[#0b141a]">
                      <div className="flex justify-end">
                        <div className="bg-green-soft text-foreground text-xs rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%] leading-relaxed">
                          Hi! I need a 3-tier cake for 50 people, chocolate + strawberry, for a wedding in 2 weeks 🎂
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-surface2 border border-border text-foreground text-xs rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[75%] leading-relaxed">
                          We'd love to! Sending you a custom quote shortly ✅
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Pages;
