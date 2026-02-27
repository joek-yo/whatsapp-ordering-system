"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getBusinessData } from "@/lib/getBusinessData";

interface CartItem {
  id: number;
  quantity: number;
}

const MenuPage: React.FC = () => {
  // Get business data safely
  const data = getBusinessData();
  const categories = data?.categories || [];

  // Set default selected category safely
  const [selectedCategory, setSelectedCategory] = useState(
    categories.length > 0 ? categories[0].name : ""
  );

  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (id: number, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { id, quantity }];
      }
    });
  };

  const activeCategory = categories.find((cat) => cat.name === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {categories.map((cat) => (
          <motion.button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === cat.name
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {activeCategory?.items?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;