"use client";

import React, { useState } from "react";
import businessData from "../../../data/menu.json";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

interface CartItem {
  id: number;
  quantity: number;
}

const MenuPage: React.FC = () => {
  const { categories } = businessData;
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
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
                ? "bg-green-500 text-white"
                : "bg-green-200 text-gray-800 hover:bg-green-300"
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
        {activeCategory?.items.map((product) => (
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