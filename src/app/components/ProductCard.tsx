"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  onAddToCart: (id: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, image, description, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Next.js Image for optimization */}
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>

        <div className="mt-4 flex flex-col space-y-2">
          <span className="text-gray-900 font-bold">KES {price}</span>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => onAddToCart(id, quantity)}
            className="mt-2 px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;