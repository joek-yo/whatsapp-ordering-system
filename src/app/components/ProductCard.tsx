"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  available?: boolean;   // Stock control
  featured?: boolean;    // Best seller
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  image,
  description,
  available = true,
  featured = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col relative"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      {/* Featured badge */}
      {featured && (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Best Seller
        </span>
      )}

      {/* Product Image */}
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>

        <div className="mt-4 flex flex-col space-y-2">
          {/* Formatted Price */}
          <span className="text-gray-900 font-bold">{`KES ${price.toLocaleString()}`}</span>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              disabled={!available}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              disabled={!available}
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart({ id, name, price, quantity })}
            disabled={!available}
            className={`mt-2 px-4 py-2 font-semibold rounded-lg shadow-md transition-colors ${
              available
                ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {available ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;