"use client";

import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import menuData from "@/data/menu.json";

const BestSellers: React.FC = () => {
  const categories = menuData.categories;

  // Flatten all items and filter bestSelling
  const bestSellers = categories
    .flatMap(cat => cat.items)
    .filter(item => item.bestSelling)
    .slice(0, 3); // Top 3

  if (!bestSellers.length) return null;

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">🔥 Best Sellers</h2>
        <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm">
          Top 3 Most Loved Products
        </p>
      </div>

      {/* Pass the entire array to FeaturedProducts */}
      <FeaturedProducts products={bestSellers} />
    </section>
  );
};

export default BestSellers;