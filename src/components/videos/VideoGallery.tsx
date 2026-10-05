"use client";
import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { FaPlay, FaImages } from "react-icons/fa";
import VideoFeed from "./VideoFeed";
import type { Video } from "@/lib/videos";

export default function VideoGallery({ videos, phone }: { videos: Video[]; phone?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(24);
  const left = videos.length - shown;
  const pushed = useRef(false);
  preconnect("https://www.tiktok.com");
  useEffect(() => {
    const pop = () => { pushed.current = false; setOpen(null); };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  const openAt = (i: number) => { window.history.pushState({ video: true }, ""); pushed.current = true; setOpen(i); };
  const closeFeed = () => { if (pushed.current) { pushed.current = false; window.history.back(); } setOpen(null); };
  return (
    <main className="mx-auto max-w-7xl px-1 py-8 sm:px-4">
      <div className="mb-5 px-3 sm:px-0">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Watch Us Bake</h1>
        <p className="mt-1 text-sm text-neutral-500">{videos.length} videos. Tap one to watch, then order on WhatsApp.</p>
      </div>
      <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {videos.slice(0, shown).map((v, i) => (
          <button
            key={v.key}
            type="button"
            onClick={() => openAt(i)}
            aria-label={"Play video " + (i + 1)}
            className="relative aspect-[4/5] overflow-hidden bg-neutral-800"
          >
            {v.thumb && <img src={v.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-xs font-semibold text-white"><FaPlay size={10} /> {i + 1}</span>
            {v.url.includes("/photo/") && <span className="absolute right-1.5 top-1.5 text-white drop-shadow"><FaImages size={13} /></span>}
          </button>
        ))}
      </div>
      {left > 0 && (
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setShown(shown + 24)} className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
            Load more ({left} left)
          </button>
        </div>
      )}
      {open !== null && <VideoFeed videos={videos} phone={phone} start={open} onClose={closeFeed} />}
    </main>
  );
}
