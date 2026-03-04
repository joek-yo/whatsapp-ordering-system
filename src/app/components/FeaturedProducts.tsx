"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

interface JabysFavoritesProps {
  products: {
    id: number;
    name: string;
    price?: number;
    image?: string;
    description: string;
    available?: boolean;
    jabysFavorite?: boolean;
    bestSelling?: boolean;
  }[];
}

const JabysFavorites: React.FC<JabysFavoritesProps> = ({ products }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Only show products marked as Jaby's Favorite
  const favorites = products.filter(p => p.jabysFavorite);

  // Duplicate for seamless scroll
  const displayProducts = [...favorites, ...favorites];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPos = 0;
    const speed = 0.5; // pixels per frame
    let animationFrame: number;

    const animate = () => {
      if (!isHovering) {
        scrollPos += speed;
        if (scrollPos >= carousel.scrollWidth / 2) scrollPos = 0;
        carousel.scrollLeft = scrollPos;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovering]);

  if (favorites.length === 0) return null;

  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
        ⭐ Jaby’s Favorites
      </h2>

      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto cursor-grab"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {displayProducts.map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price || 0}
              image={product.image || "/images/placeholder.jpg"}
              description={product.description}
              available={product.available}
              jabysFavorite={product.jabysFavorite}
              bestSelling={product.bestSelling}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JabysFavorites;