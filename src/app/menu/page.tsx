"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaBirthdayCake } from "react-icons/fa";
import businessData from "@/data/menu.json";
import ProductCard from "@/components/home/ProductCard";
import { useCart } from "@/context/CartContext";

const MenuPage: React.FC = () => {
  const { categories, bundles } = businessData;
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  const menuCategories = [
    ...categories,
    { id: "bundles-category", name: "Bundles", items: bundles },
  ];

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    if (categoryParam) {
      const match = menuCategories.find(
        (cat) =>
          cat.id?.toLowerCase() === categoryParam.toLowerCase() ||
          cat.name.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) setSelectedCategory(match.name);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const activeCategory = menuCategories.find(
    (cat) => cat.name === selectedCategory
  );

  const placeholderImage = "/images/placeholder.jpg";

  const allProducts = menuCategories.flatMap((cat) => cat.items);

  const searchResults = searchQuery
    ? allProducts.filter((p: any) => {
        const q = searchQuery.toLowerCase();
        const name = (p.name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      })
    : null;

  const sortedProducts = (searchResults ?? activeCategory?.items)
    ?.slice()
    .sort((a: any, b: any) => {
      if (a.bestSelling && !b.bestSelling) return -1;
      if (!a.bestSelling && b.bestSelling) return 1;
      if (a.jabysFavorite && !b.jabysFavorite) return -1;
      if (!a.jabysFavorite && b.jabysFavorite) return 1;
      return 0;
    });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* PAGE TITLE */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-black uppercase tracking-tighter text-foreground mb-6">
            Freshly Crafted for You
          </h1>

          {/* CATEGORY TABS */}
          <div className="flex justify-center overflow-x-auto no-scrollbar py-4">
            <div className="flex bg-surface2 border border-border rounded-full shadow-sm divide-x divide-border w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
              {menuCategories.map((cat, index) => {
                const isActive = selectedCategory === cat.name;
                const isFirst = index === 0;
                const isLast = index === menuCategories.length - 1;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSearchQuery("");
                    }}
                    className={`flex-1 text-center px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer
                               ${isFirst ? "rounded-l-full" : ""}
                               ${isLast ? "rounded-r-full" : ""}
                               focus:outline-none focus:ring-2 focus:ring-green
                               ${isActive ? "bg-green text-background" : "text-subtext hover:bg-surface hover:text-foreground"}`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CUSTOM ORDER CTA */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="border border-green/30 rounded-2xl p-8 text-center bg-green-soft">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3">Can't Find What You Want?</h2>
            <p className="text-subtext mb-6">
              Request cakes, catering, bulk meals, or any special order and we&apos;ll prepare it for you.
            </p>
            <Link href="/custom-order">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-green text-background rounded-xl font-black text-xs uppercase tracking-widest shadow-glow hover:bg-green-strong transition cursor-pointer">
                <FaBirthdayCake size={14} /> Request Custom Order
              </button>
            </Link>
          </div>
        </div>

        {searchQuery && (
          <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between bg-green-soft border border-green/30 rounded-xl px-5 py-3">
            <p className="text-sm font-semibold text-foreground">
              Showing results for <span className="font-bold">&quot;{searchQuery}&quot;</span> ({sortedProducts?.length ?? 0} found)
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold uppercase tracking-wide text-green hover:text-green-strong cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {sortedProducts?.map((product: any) => (
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
              isBundle={selectedCategory === "Bundles"}
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
      </div>
    </div>
  );
};

export default MenuPage;
