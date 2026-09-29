"use client";

import React, { useEffect, useState } from "react";

type Photo = { image: string; caption?: string };

const GalleryGrid: React.FC<{ photos: Photo[] }> = ({ photos }) => {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((open + 1) % photos.length);
      if (e.key === "ArrowLeft") setOpen((open - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
        {photos.map((p, i) => (
          <button
            key={`${p.image}-${i}`}
            onClick={() => setOpen(i)}
            className="mb-3 sm:mb-4 block w-full overflow-hidden rounded-lg border border-border cursor-pointer break-inside-avoid group"
          >
            <img
              src={p.image}
              alt={p.caption || "House of Jaby"}
              loading="lazy"
              className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 text-white text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full cursor-pointer"
          >
            Close
          </button>
          <img
            src={photos[open].image}
            alt={photos[open].caption || "House of Jaby"}
            className="max-h-[80vh] max-w-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          {photos[open].caption && (
            <p className="text-white/90 text-sm mt-4 text-center">{photos[open].caption}</p>
          )}
          {photos.length > 1 && (
            <div className="flex gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setOpen((open - 1 + photos.length) % photos.length)}
                className="text-white text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full cursor-pointer"
              >
                Prev
              </button>
              <button
                onClick={() => setOpen((open + 1) % photos.length)}
                className="text-white text-xs font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
