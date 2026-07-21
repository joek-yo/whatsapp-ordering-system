"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import { FaHistory } from "react-icons/fa";
import SectionHeader from "@/components/home/SectionHeader";
import { getProductById } from "@/lib/getBusinessData";

const STORAGE_KEY = "hoj_recently_viewed";
const MAX_STORED = 8;
const MAX_SHOWN = 4;

// Call this from the product page itself to log a view
export function logProductView(id: string | number) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: (string | number)[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((existingId) => existingId.toString() !== id.toString());
    filtered.unshift(id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_STORED)));
  } catch {
    // localStorage unavailable — fail silently, feature just won't persist
  }
}

const RecentlyViewed = ({ currentProductId }: { currentProductId: string | number }) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const ids: (string | number)[] = raw ? JSON.parse(raw) : [];
      const resolved = ids
        .filter((id) => id.toString() !== currentProductId.toString())
        .map((id) => getProductById(id))
        .filter(Boolean)
        .slice(0, MAX_SHOWN);
      setItems(resolved);
    } catch {
      setItems([]);
    }
  }, [currentProductId]);

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-12">
      <SectionHeader title="Recently Viewed" badge="Your History" icon={FaHistory} href="/menu" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} {...item} isBundle={!!item.isBundle} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
