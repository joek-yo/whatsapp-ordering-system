"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { FaBolt, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/home/ProductCard";
import { getFlashSaleProducts, getUIConfig } from "@/lib/getBusinessData";

const FlashSales: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rawProducts = useMemo(() => getFlashSaleProducts(), []);
  const { flashSale, viewAllText } = getUIConfig() as any;

  const [displayProducts, setDisplayProducts] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    setDisplayProducts(rawProducts);

    if (!flashSale?.endTime) return;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(flashSale.endTime).getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0"),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0"),
        seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [flashSale?.endTime, rawProducts]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / displayProducts.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(index, displayProducts.length - 1)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [displayProducts.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({ left: direction === "left" ? -clientWidth : clientWidth, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / displayProducts.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  if (!flashSale?.active || displayProducts.length === 0) return null;

  const timerBlockClass =
    "bg-foreground text-background w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-black text-[10px] sm:text-xs shadow-md border border-border-strong";

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 border-b-2 border-border-strong pb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-green mb-0.5">
            <FaBolt className="animate-pulse text-[10px] sm:text-xs" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em]">
              {flashSale.badge || "Limited Time"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tighter uppercase">
            {flashSale.title || "Flash Sale"}
          </h2>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 w-full md:w-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className={timerBlockClass}>{timeLeft.hours}</div>
            <span className="font-black text-foreground text-[10px]">:</span>
            <div className={timerBlockClass}>{timeLeft.minutes}</div>
            <span className="font-black text-foreground text-[10px]">:</span>
            <div className={timerBlockClass}>{timeLeft.seconds}</div>
          </div>
          <Link
            href="/menu"
            className="text-[10px] font-black uppercase tracking-widest text-foreground flex items-center gap-1.5 hover:text-green transition-colors cursor-pointer"
          >
            {viewAllText || "View All"} <FaArrowRight size={10} />
          </Link>
        </div>
      </div>

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
          {displayProducts.map((product) => (
            <div key={product.id} className="shrink-0 w-[calc(50%-8px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {displayProducts.length > 1 && (
          <div className="flex sm:hidden justify-center gap-1.5 mt-3">
            {displayProducts.map((_, i) => (
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

export default FlashSales;
