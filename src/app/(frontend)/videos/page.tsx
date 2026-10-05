import type { Metadata } from "next";
import menuData from "@/data/menu.json";
import videosData from "@/data/videos.json";
import { loadVideos, type VideoInput } from "@/lib/videos";
import VideoGallery from "@/components/videos/VideoGallery";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Videos" };

export default async function VideosPage() {
  const videos = await loadVideos(videosData as VideoInput[]);
  const phone = (((menuData as any).business?.phone as string) || "").replace(/[^0-9]/g, "");
  return <VideoGallery videos={videos} phone={phone || undefined} />;
}
