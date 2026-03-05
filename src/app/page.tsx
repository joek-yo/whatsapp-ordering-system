"use client";

import React from "react";

import Hero from "@/components/home/Hero";
import FeaturedBundles from "@/components/home/FeaturedBundles";
import JabysFavorites from "@/components/home/JabysFavorites";

import ProductCard from "@/components/home/ProductCard"; // ✅ fixed path

import menuData from "@/data/menu.json";

const Pages: React.FC = () => {
  const { categories, bundles } = menuData;

  // -----------------------------
  // Jaby's Favorites
  // -----------------------------
  const jabyFavorites = categories
    .flatMap((c) => c.items)
    .filter((i) => i.jabysFavorite);

  // -----------------------------
  // Best Sellers (Top 3 globally)
  // -----------------------------
  const bestSellers = categories
    .flatMap((c) => c.items)
    .filter((i) => i.bestSelling)
    .slice(0, 3);

  // -----------------------------
  // Featured Bundles (Favorites or Best Sellers)
  // -----------------------------
  const featuredBundles = bundles.filter(
    (b) => b.jabysFavorite || b.bestSelling
  );

  return (
    <main className="pt-16 space-y-24">
      {/* Hero Section */}
      <Hero />

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            🔥 Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      )}

      {/* Jaby's Favorites Carousel */}
      {jabyFavorites.length > 0 && (
        <JabysFavorites products={jabyFavorites} />
      )}

      {/* Special / Featured Bundles Section */}
      {featuredBundles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedBundles bundles={featuredBundles} />
        </section>
      )}
    </main>
  );
};

export default Pages;