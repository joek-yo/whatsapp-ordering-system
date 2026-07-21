"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaBirthdayCake, FaCoffee, FaBreadSlice, FaShoppingBag } from "react-icons/fa";
import { getCategories } from "@/lib/getBusinessData";

const ICON_MAP: Record<string, React.ElementType> = {
  cake: FaBirthdayCake,
  cup: FaCoffee,
  bread: FaBreadSlice,
  bag: FaShoppingBag,
};

const getIcon = (iconName: string | undefined) => {
  if (!iconName) return FaShoppingBag;
  return ICON_MAP[iconName] || FaShoppingBag;
};

const CategoryDiscovery: React.FC = () => {
  const categories = getCategories() as any[];
  const mobileVisible = categories.slice(0, 4);

  return (
    <section className="bg-transparent lg:h-full">
      {/* DESKTOP: sticky sidebar */}
      <div className="hidden lg:block sticky top-28 self-start bg-surface border border-border rounded-2xl overflow-hidden shadow-lg">
        <div className="bg-surface2 px-5 py-4 border-b border-border">
          <h2 className="text-[11px] font-black text-foreground uppercase tracking-[0.2em]">Shop Categories</h2>
        </div>
        <div className="flex flex-col">
          {categories.map((cat) => {
            const IconComponent = getIcon(cat.icon);
            return (
              <Link key={cat.id} href={"/menu?category=" + cat.id} className="group flex items-center justify-between px-5 py-3 hover:bg-green-soft transition-colors border-b border-border last:border-0 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-surface2 border border-border rounded-md group-hover:border-green transition-colors">
                    <IconComponent size={16} className="text-subtext group-hover:text-green transition-colors" />
                  </div>
                  <span className="text-[13px] font-bold text-foreground group-hover:text-green uppercase tracking-tight transition-colors">{cat.name}</span>
                  {cat.hot && (
                    <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-danger text-background rounded-full">HOT</span>
                  )}
                </div>
                <FaChevronRight className="text-muted group-hover:text-green transition-colors" size={10} />
              </Link>
            );
          })}
          <Link href="/menu" className="px-5 py-3 text-center text-[10px] font-black text-green uppercase tracking-widest hover:bg-green hover:text-background transition-all cursor-pointer">
            View All +
          </Link>
        </div>
      </div>

      {/* MOBILE: department grid */}
      <div className="lg:hidden py-4">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-black text-subtext uppercase tracking-widest">Departments</h2>
          <Link href="/menu" className="text-[10px] font-black text-green uppercase tracking-widest cursor-pointer">More +</Link>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {mobileVisible.map((cat) => {
            const displayImage = cat.image || (cat.items && cat.items[0]?.image);
            return (
              <Link key={cat.id} href={"/menu?category=" + cat.id} className="flex flex-col items-center gap-2 relative cursor-pointer">
                <div className="w-full aspect-square bg-surface border border-border rounded-2xl flex items-center justify-center active:scale-95 transition-transform overflow-hidden relative hover:border-green/50">
                  {displayImage ? (
                    <Image src={displayImage} alt={cat.name} fill className="object-cover p-1 rounded-2xl" />
                  ) : (
                    <FaShoppingBag size={18} className="text-muted" />
                  )}
                </div>
                <span className="text-[8px] font-black text-subtext uppercase text-center truncate w-full px-1">{cat.name.split(" ")[0]}</span>
                {cat.hot && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full border-2 border-background z-10" />
                )}
              </Link>
            );
          })}
          <Link href="/menu" className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-full aspect-square bg-green rounded-2xl flex flex-col items-center justify-center gap-1 shadow-glow active:scale-95 transition-transform">
              <div className="grid grid-cols-3 gap-0.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-1 h-1 bg-background rounded-full" />
                ))}
              </div>
            </div>
            <span className="text-[8px] font-black text-foreground uppercase">All</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryDiscovery;
