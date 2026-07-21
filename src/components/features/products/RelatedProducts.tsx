"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaLayerGroup } from "react-icons/fa";
import ProductCard from "@/components/home/ProductCard";
import SectionHeader from "@/components/home/SectionHeader";
import { getRelatedProducts } from "@/lib/getBusinessData";

const RelatedProducts = ({
  currentProductId,
  currentCategory,
  maxItems = 4,
}: {
  currentProductId: string | number;
  currentCategory?: string;
  maxItems?: number;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const items = getRelatedProducts(currentProductId, currentCategory, maxItems);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[i] as HTMLElement;
    if (child) {
      scrollRef.current.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setActiveDot(index);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-12 group/related">
      <SectionHeader
        title="You Might Also Like"
        badge="More to Explore"
        icon={FaLayerGroup}
        href="/menu"
      />

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/90 backdrop-blur border border-border items-center justify-center text-subtext hover:text-foreground opacity-0 group-hover/related:opacity-100 transition-opacity cursor-pointer -translate-x-4"
        >
          <FaChevronLeft size={12} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item: any) => (
            <div
              key={item.id}
              className="flex-shrink-0 snap-start w-[calc(50%-8px)] sm:w-[calc(33.33%-12px)] lg:w-[calc(25%-18px)]"
            >
              <ProductCard {...item} isBundle={!!item.isBundle} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/90 backdrop-blur border border-border items-center justify-center text-subtext hover:text-foreground opacity-0 group-hover/related:opacity-100 transition-opacity cursor-pointer translate-x-4"
        >
          <FaChevronRight size={12} />
        </button>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {items.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeDot === i ? "w-5 bg-green" : "w-1.5 bg-border-strong"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RelatedProducts;
