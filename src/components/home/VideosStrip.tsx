"use client";
import Link from "next/link";
import { FaPlay, FaImages } from "react-icons/fa";
import videosData from "@/data/videos.json";

export default function VideosStrip() {
  const items = (videosData as any[]).slice(0, 6);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Watch Us Bake</h2>
        <Link href="/videos" className="text-sm font-semibold underline">See all {(videosData as any[]).length} videos</Link>
      </div>
      <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
        {items.map((v, i) => (
          <Link key={v.url} href="/videos" aria-label={"Watch video " + (i + 1)} className="relative aspect-[4/5] overflow-hidden bg-neutral-800">
            {v.thumb && <img src={v.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-xs font-semibold text-white"><FaPlay size={10} /> {i + 1}</span>
            {v.url.includes("/photo/") && <span className="absolute right-1.5 top-1.5 text-white drop-shadow"><FaImages size={13} /></span>}
          </Link>
        ))}
      </div>
    </section>
  );
}
