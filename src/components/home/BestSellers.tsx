"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaFire, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/home/ProductCard";
import SectionHeader from "@/components/home/SectionHeader";
import { getUIConfig } from "@/lib/getBusinessData";

interface BestSellersProps {
  products: any[];
}

const BestSellers: React.FC<BestSellersProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ui = getUIConfig() as any;

  if (!products || products.length === 0) return null;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / products.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(index, products.length - 1)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [products.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({ left: direction === "left" ? -clientWidth : clientWidth, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / products.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  return (
    <section>
      <SectionHeader
        title={ui.bestSellersTitle || "Best Sellers"}
        badge={ui.bestSellersBadge || "Top Rated"}
        icon={FaFire}
        href="/menu?filter=bestselling"
        viewAllText={ui.viewAllText}
      />

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex opacity-0 group-hover:opacity-100 absolute left-2 top-[40%] -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-foreground text-background shadow-2xl transition-all duration-300 hover:bg-green cursor-pointer border border-border-strong"
        >
          <FaChevronLeft size={16} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex opacity-0 group-hover:opacity-100 absolute right-2 top-[40%] -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-foreground text-background shadow-2xl transition-all duration-300 hover:bg-green cursor-pointer border border-border-strong"
        >
          <FaChevronRight size={16} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
          {products.map((product) => (
            <div key={product.id} className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {products.length > 1 && (
          <div className="flex sm:hidden justify-center gap-1.5 mt-3">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={"h-1.5 rounded-full transition-all duration-300 " + (i === activeIndex ? "w-5 bg-green" : "w-1.5 bg-border")}
                aria-label={"Go to item " + (i + 1)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
