"use client";
import { useState } from "react";
import VideoCard from "./VideoCard";
import type { Video } from "@/lib/videos";

export default function VideoGrid({ videos, phone }: { videos: Video[]; phone?: string }) {
  const [shown, setShown] = useState(12);
  const left = videos.length - shown;
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.slice(0, shown).map((v, i) => (
          <VideoCard key={v.key} video={v} phone={phone} n={i + 1} />
        ))}
      </div>
      {left > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShown(shown + 12)}
            className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            Load more ({left} left)
          </button>
        </div>
      )}
    </>
  );
}
