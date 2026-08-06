"use client";

import Button from "@/components/ui/Button";

import React, { useState, useEffect, useRef, useLayoutEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaChevronDown, FaTimes, FaSearch, FaGem, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

import ProductCard from "@/components/home/ProductCard";
import { useCart } from "@/context/CartContext";
import { getCategories, getBundles, getUIConfig, getBundlesCopy } from "@/lib/getBusinessData";

const MenuContent: React.FC = () => {
  const categories = getCategories();
  const bundles = getBundles();
  const ui = getUIConfig();

  const menuCategories = [
    ...categories,
    { id: "bundles-category", name: "Bundles", items: bundles },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search") || "";

  const { addToCart } = useCart();

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    urlCategory || menuCategories[0]?.id || "bundles-category"
  );
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSearching = urlSearch.trim().length > 0;

  useEffect(() => {
    if (!urlCategory) return;
    const found = menuCategories.find((cat) => cat.id === urlCategory);
    if (found) setSelectedCategoryId(found.id);
  }, [urlCategory]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCategory =
    menuCategories.find((cat) => cat.id === selectedCategoryId) ?? menuCategories[0];

  // Intro/outro brand-storytelling copy for the active category.
  // Bundles is a synthetic category (built from getBundles()) and doesn't
  // carry intro/outro fields itself, so it's pulled from getBundlesCopy().
  const categoryCopy = useMemo(() => {
    if (!activeCategory) return { intro: "", outro: "" };
    if (activeCategory.id === "bundles-category") {
      return getBundlesCopy();
    }
    return {
      intro: (activeCategory as any).intro || "",
      outro: (activeCategory as any).outro || "",
    };
  }, [activeCategory]);

  const placeholderImage = "/images/placeholder.jpg";

  const allProducts = useMemo(
    () => menuCategories.flatMap((c: any) => c.items ?? []),
    [menuCategories]
  );

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = urlSearch.trim().toLowerCase();
    return allProducts.filter((p: any) => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      return name.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [isSearching, urlSearch, allProducts]);

  const categoryItems = activeCategory?.items ?? [];
  const displayProducts = isSearching ? searchResults : categoryItems;

  const sortedProducts = [...displayProducts].sort((a: any, b: any) => {
    if (a?.bestSelling && !b?.bestSelling) return -1;
    if (!a?.bestSelling && b?.bestSelling) return 1;
    if (a?.jabysFavorite && !b?.jabysFavorite) return -1;
    if (!a?.jabysFavorite && b?.jabysFavorite) return 1;
    return 0;
  });

  const selectCategory = (id: string) => {
    setMobileDropdownOpen(false);
    router.push(`/menu?category=${encodeURIComponent(id)}`);
  };

  const clearSearch = () => {
    router.push("/menu");
  };

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const activeEl = tabRefs.current[selectedCategoryId];
    if (activeEl) {
      setIndicatorStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  }, [selectedCategoryId, menuCategories.length]);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        <div className="mb-10 text-center">
          <span className="text-[10px] font-black text-gold uppercase tracking-[0.5em] mb-4 block">
            {ui.menuPage.tagline}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-4">
            {ui.menuPage.title}
          </h1>
          <p className="text-subtext text-sm sm:text-lg font-bold max-w-md mx-auto">
            {ui.menuPage.subtitle}
          </p>
        </div>

        {isSearching ? (
          <div className="max-w-4xl mx-auto mb-10 flex items-center justify-between bg-surface border border-border rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <FaSearch size={12} className="text-gold" />
              <span className="text-sm font-bold text-foreground">
                {sortedProducts.length} result{sortedProducts.length !== 1 ? "s" : ""} for
                <span className="text-gold"> &quot;{urlSearch}&quot;</span>
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-subtext hover:text-foreground transition-colors cursor-pointer"
            >
              <FaTimes size={10} /> Clear
            </button>
          </div>
        ) : (
          <>
            <div className="hidden md:block sticky top-4 z-30 py-5 mb-12">
              <div className="flex justify-center">
                <div className="relative flex bg-surface/80 backdrop-blur-md border border-border rounded-2xl p-1.5 shadow-xl gap-1">
                  <div
                    className="absolute top-1.5 bottom-1.5 bg-green rounded-xl transition-all duration-300 ease-out"
                    style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                  />
                  {menuCategories.map((cat: any) => {
                    const isActive = selectedCategoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        ref={(el) => { tabRefs.current[cat.id] = el; }}
                        onClick={() => selectCategory(cat.id)}
                        className={`relative z-10 whitespace-nowrap px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors duration-300 cursor-pointer
                                   focus:outline-none focus:ring-2 focus:ring-green
                                   ${isActive ? "text-background" : "text-subtext hover:text-foreground"}`}
                      >
                        {cat.name}
                        <span className={`ml-2 text-[9px] font-bold ${isActive ? "text-background/70" : "text-muted"}`}>
                          {cat.items?.length ?? 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="md:hidden mb-8 relative" ref={dropdownRef}>
              <button
                onClick={() => setMobileDropdownOpen((v) => !v)}
                className="w-full flex items-center justify-between bg-surface border border-green/40 rounded-2xl pl-4 pr-4 py-3.5 text-[12px] font-black uppercase tracking-wider text-foreground cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {activeCategory?.name} ({activeCategory?.items?.length ?? 0})
                </span>
                <FaChevronDown
                  size={10}
                  className={`text-green transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-green/40 rounded-2xl shadow-2xl overflow-hidden z-40">
                  {menuCategories.map((cat: any) => {
                    const isActive = selectedCategoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => selectCategory(cat.id)}
                        className={`w-full text-left px-4 py-3 text-[12px] font-black uppercase tracking-wider transition-colors cursor-pointer border-b border-border last:border-0
                                   ${isActive ? "bg-green text-background" : "text-foreground hover:bg-green-soft"}`}
                      >
                        {cat.name} ({cat.items?.length ?? 0})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {!isSearching && categoryCopy.intro && (
          <div className="max-w-3xl mx-auto mb-12 text-center border border-gold/30 bg-surface2/60 rounded-2xl px-6 py-8 sm:px-10 sm:py-10">
            {categoryCopy.intro.split("\n").map((line: string, i: number) =>
              line.trim() === "" ? null : i === 0 ? (
                <h2 key={i} className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground mb-1">
                  {line}
                </h2>
              ) : i === 1 ? (
                <p key={i} className="text-[11px] font-black uppercase tracking-[0.25em] text-gold mb-4">
                  {line}
                </p>
              ) : (
                <p key={i} className="text-subtext text-sm sm:text-base leading-relaxed">
                  {line}
                </p>
              )
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {sortedProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image || placeholderImage}
              description={product.description}
              available={product.available}
              jabysFavorite={product.jabysFavorite}
              bestSelling={product.bestSelling}
              isBundle={activeCategory?.id === "bundles-category"}
              onAddToCart={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image || placeholderImage,
                })
              }
            />
          ))}
        </div>

        {!isSearching && categoryCopy.outro && (
          <div className="max-w-3xl mx-auto mt-12 text-center border border-gold/30 bg-surface2/60 rounded-2xl px-6 py-8 sm:px-10 sm:py-10">
            {categoryCopy.outro.split("\n").map((line: string, i: number) =>
              line.trim() === "" ? null : i === 0 ? (
                <h3 key={i} className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground mb-3">
                  {line}
                </h3>
              ) : (
                <p key={i} className="text-subtext text-sm sm:text-base leading-relaxed">
                  {line}
                </p>
              )
            )}
          </div>
        )}

        {/* ---------------- Custom Order — Closing Section ---------------- */}
        <section className="relative overflow-hidden mt-16 sm:mt-24 mb-8">
          <div className="relative rounded-3xl border border-border bg-surface2 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-green/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 py-14 sm:px-12 sm:py-16 lg:px-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 bg-green-soft text-green px-4 py-1.5 rounded-full mb-6">
                  <FaGem size={12} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Didn&apos;t Find What You Were Looking For?</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-foreground mb-4">
                  Let Us Craft It <span className="text-green">Just For You</span>
                </h2>

                <p className="text-subtext mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Cakes, catering, bulk orders, or something entirely your own — tell us what you have in mind and we&apos;ll bring it to life, bespoke, straight over WhatsApp.
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
                        We&apos;d love to! Sending you a custom quote shortly ✅
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

const MenuPage: React.FC = () => (
  <Suspense fallback={<div className="min-h-screen bg-background" />}>
    <MenuContent />
  </Suspense>
);

export default MenuPage;
