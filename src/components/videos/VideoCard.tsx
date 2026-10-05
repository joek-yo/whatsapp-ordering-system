"use client";

import { useState } from "react";
import { FaPlay, FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import type { Video } from "@/lib/videos";

const ICONS = { tiktok: FaTiktok, youtube: FaYoutube, instagram: FaInstagram, facebook: FaFacebook };
const LABELS = { tiktok: "TikTok", youtube: "YouTube", instagram: "Instagram", facebook: "Facebook" };

export default function VideoCard({ video, phone, n }: { video: Video; phone?: string; n?: number }) {
  const [playing, setPlaying] = useState(false);
  const Icon = ICONS[video.platform];
  const ratio = video.vertical ? "aspect-[9/16]" : "aspect-video";

  const waText = encodeURIComponent(
    video.product
      ? `Hi! I saw your video and I'd like to order: ${video.product}`
      : "Hi! I saw your video and I'd like to place an order."
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white text-neutral-900 shadow-sm">
      <div className={`relative w-full ${ratio} bg-neutral-900`}>
        {playing ? (
          <iframe
            src={video.embedUrl}
            title={video.title || "Video"}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video${video.title ? `: ${video.title}` : ""}`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {video.thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={video.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-end bg-gradient-to-br from-neutral-800 to-neutral-600 p-4 pb-6"><span className="line-clamp-4 text-left text-sm font-medium text-white/90">{video.title}</span></div>
            )}
            <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition group-hover:scale-110">
              <FaPlay className="ml-1" size={22} />
            </span>
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
              <Icon size={12} /> {LABELS[video.platform]}
            </span>
          </button>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs font-semibold text-neutral-500">#{n} {video.url.includes("/photo/") ? "· Photo slideshow · tap 🔊 for music" : "· Video"}</p>
        {video.title && <h3 className="font-semibold leading-snug">{video.title}</h3>}
        <div className="flex flex-wrap gap-2">
          {phone && (
            <a
              href={`https://wa.me/${phone}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <FaWhatsapp /> Order on WhatsApp
            </a>
          )}
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            <Icon size={14} /> {video.url.includes("/photo/") ? "Watch on TikTok (with music)" : `Open on ${LABELS[video.platform]}`}
          </a>
        </div>
      </div>
    </div>
  );
}
