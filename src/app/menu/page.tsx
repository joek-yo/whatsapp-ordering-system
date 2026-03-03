"use client";

import React, { useState } from "react";
import businessData from "../../../data/menu.json";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const MenuPage: React.FC = () => {
  const { categories } = businessData;
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const { addToCart } = useCart();

  const activeCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-6">
          Menu Selection
        </h1>

        {/* Upgraded Category Bar */}
        <div className="flex justify-center overflow-x-auto no-scrollbar py-4">
          <div className="flex bg-gray-200 rounded-full shadow-sm divide-x divide-gray-300
                          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
            {categories.map((cat, index) => {
              const isActive = selectedCategory === cat.name;
              const isFirst = index === 0;
              const isLast = index === categories.length - 1;

              return (
                <motion.button
                  key={cat.name}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex-1 text-center px-4 py-2 text-sm font-medium transition-colors
                             ${isFirst ? "rounded-l-full" : ""}
                             ${isLast ? "rounded-r-full" : ""}
                             focus:outline-none focus:ring-2 focus:ring-green-500
                             ${isActive ? "bg-green-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"}`}
                >
                  {cat.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {activeCategory?.items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image || "/images/placeholder.jpg"}
              description={product.description}
              available={product.available}
              featured={product.featured}
              onAddToCart={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image || "/images/placeholder.jpg",
                })
              }
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;