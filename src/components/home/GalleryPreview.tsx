"use client";

import React from "react";
import Link from "next/link";
import { FaImages } from "react-icons/fa";
import menuData from "@/data/menu.json";
import SectionHeader from "@/components/home/SectionHeader";

const GalleryPreview: React.FC = () => {
  const photos = ((menuData as any).gallery || []).slice(0, 6) as { image: string; caption?: string }[];
  if (!photos.length) return null;

  return (
    <section>
      <SectionHeader
        title="Our Gallery"
        badge="Gallery"
        icon={FaImages}
        href="/gallery"
        viewAllText="View Gallery"
      />
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8">
        {photos.map((p, i) => (
          <Link key={`${p.image}-${i}`} href="/gallery" className="block overflow-hidden rounded-lg border border-border group">
            <img
              src={p.image}
              alt={p.caption || "House of Jaby"}
              loading="lazy"
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GalleryPreview;
