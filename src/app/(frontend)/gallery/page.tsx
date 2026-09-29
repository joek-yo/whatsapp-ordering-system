import type { Metadata } from "next";
import menuData from "@/data/menu.json";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at House of Jaby cakes, bakes and events.",
};

const GalleryPage = () => {
  const photos = ((menuData as any).gallery || []) as { image: string; caption?: string }[];
  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-3">Gallery</p>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground text-center mb-10">
          A Look At Our Work
        </h1>
        {photos.length ? (
          <GalleryGrid photos={photos} />
        ) : (
          <p className="text-center text-subtext">Photos coming soon.</p>
        )}
      </div>
    </main>
  );
};

export default GalleryPage;
