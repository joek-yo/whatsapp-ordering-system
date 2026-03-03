"use client";

import React, { useState } from "react";
import Hero from "./components/Hero";
import CategoryBar from "./components/CategoryBar";
import ProductCard from "./components/ProductCard";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturedBundles from "./components/FeaturedBundles";
import menuData from "../../data/menu.json";

const Pages: React.FC = () => {
  const { categories, bundles } = menuData;

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const activeCategory = categories.find(cat => cat.name === selectedCategory);

  // Flatten all items for global filtering
  const allItems = categories.flatMap(cat =>
    cat.items.map(item => ({ ...item, category: cat.name }))
  );

  // 🔥 Best Sellers - top 3 globally
  const bestSellers = allItems.filter(item => item.bestSelling).slice(0, 3);

  // ⭐ Jaby's Favorites
  const jabyFavorites = allItems.filter(item => item.jabysFavorite);

  // Featured products for active category (also Jaby's Favorites)
  const featuredProducts = activeCategory?.items.filter(item => item.jabysFavorite) || [];

  return (
    <main className="pt-16 space-y-24">
      {/* Hero Section */}
      <Hero />

      {/* 🔥 Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">🔥 Best Sellers</h2>
            <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm">
              Top 3 Most Loved Products
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {bestSellers.map(item => (
              <div key={item.id} className="w-full sm:w-1/2 md:w-1/3">
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price || 0}
                  image={item.image || "/images/placeholder.jpg"}
                  description={item.description}
                  available={item.available}
                  bestSelling={item.bestSelling}
                  jabysFavorite={item.jabysFavorite} // ✅ pass Jaby's Favorite to card
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ⭐ Jaby's Favorites */}
      {jabyFavorites.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <FeaturedProducts products={jabyFavorites} autoScroll />
        </section>
      )}

      {/* 🎁 Special Bundles */}
      {bundles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <FeaturedBundles bundles={bundles} />
        </section>
      )}

      {/* Menu Section with CategoryBar & Featured Products per category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
          Menu Selection
        </h2>

        {/* Category Bar */}
        <CategoryBar
          categories={categories.map(c => c.name)}
          activeCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Featured Products of active category */}
        {featuredProducts.length > 0 && (
          <FeaturedProducts products={featuredProducts} />
        )}
      </section>
    </main>
  );
};

export default Pages;