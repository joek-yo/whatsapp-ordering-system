export type Platform = "tiktok" | "youtube" | "instagram" | "facebook";

export interface VideoInput {
  url: string;
  title?: string;
  product?: string; // used for the WhatsApp message
  thumb?: string;
  group?: string;   // same clip on several platforms -> same group
}

export interface Video {
  key: string;
  platform: Platform;
  id: string;
  url: string;
  title: string;
  product?: string;
  vertical: boolean;
  embedUrl: string;
  thumb?: string;
}

const PRIORITY: Platform[] = ["tiktok", "youtube", "instagram", "facebook"];
const TIKTOK_SHORT = ["vm.tiktok.com", "vt.tiktok.com"];

async function expand(url: string): Promise<string> {
  try {
    const u = new URL(url);
    const isShort =
      TIKTOK_SHORT.includes(u.host) ||
      (u.host.endsWith("tiktok.com") && u.pathname.startsWith("/t/"));
    if (!isShort) return url;
    const res = await fetch(url, { redirect: "follow", next: { revalidate: 86400 } });
    return res.url || url;
  } catch {
    return url;
  }
}

function parse(url: string): { platform: Platform; id: string; vertical: boolean; clean: string } | null {
  let u: URL;
  try { u = new URL(url); } catch { return null; }
  const host = u.host.replace(/^www\.|^m\./, "");
  let m: RegExpMatchArray | null;

  if (host.endsWith("tiktok.com") && (m = u.pathname.match(/\/(?:video|photo)\/(\d+)/)))
    return { platform: "tiktok", id: m[1], vertical: true, clean: `${u.origin}${u.pathname}` };

  if (host === "youtu.be") {
    const id = u.pathname.slice(1);
    return id ? { platform: "youtube", id, vertical: false, clean: `https://youtu.be/${id}` } : null;
  }
  if (host.endsWith("youtube.com")) {
    if ((m = u.pathname.match(/\/shorts\/([\w-]+)/)))
      return { platform: "youtube", id: m[1], vertical: true, clean: `https://www.youtube.com/shorts/${m[1]}` };
    const id = u.searchParams.get("v") || (u.pathname.match(/\/embed\/([\w-]+)/) || [])[1];
    return id ? { platform: "youtube", id, vertical: false, clean: `https://www.youtube.com/watch?v=${id}` } : null;
  }

  if (host.endsWith("instagram.com") && (m = u.pathname.match(/\/(?:reel|reels|p|tv)\/([\w-]+)/)))
    return { platform: "instagram", id: m[1], vertical: true, clean: `https://www.instagram.com/reel/${m[1]}/` };

  if (host.endsWith("facebook.com") || host === "fb.watch") {
    const clean = `${u.origin}${u.pathname}${u.searchParams.get("v") ? `?v=${u.searchParams.get("v")}` : ""}`;
    return { platform: "facebook", id: clean, vertical: false, clean };
  }
  return null;
}

function embedFor(p: Platform, id: string, clean: string): string {
  switch (p) {
    case "tiktok": return `https://www.tiktok.com/player/v1/${id}?autoplay=1&controls=1&music_info=1&description=1`;
    case "youtube": return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    case "instagram": return `https://www.instagram.com/reel/${id}/embed`;
    case "facebook": return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(clean)}&show_text=false&autoplay=true`;
  }
}

async function thumbFor(p: Platform, id: string, clean: string): Promise<string | undefined> {
  if (p === "youtube") return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  if (p === "tiktok" && process.env.LIVE_TIKTOK_THUMBS) {
    try {
      const r = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(clean)}`, {
        next: { revalidate: 43200 },
      });
      if (r.ok) return (await r.json()).thumbnail_url as string | undefined;
    } catch {}
  }
  return undefined;
}

export async function loadVideos(inputs: VideoInput[]): Promise<Video[]> {
  const seen = new Set<string>();
  const items: Video[] = [];
  const groupOf = new Map<string, string | undefined>();

  for (const input of inputs) {
    if (!input?.url) continue;
    const full = await expand(input.url.trim());
    const parsed = parse(full);
    if (!parsed) { console.warn("[videos] unsupported link skipped:", input.url); continue; }

    const key = `${parsed.platform}:${parsed.id}`;
    if (seen.has(key)) { console.warn("[videos] duplicate skipped:", input.url); continue; }
    seen.add(key);

    items.push({
      key,
      platform: parsed.platform,
      id: parsed.id,
      url: parsed.clean,
      title: input.title || "",
      product: input.product,
      vertical: parsed.vertical,
      embedUrl: embedFor(parsed.platform, parsed.id, parsed.clean),
      thumb: input.thumb || (await thumbFor(parsed.platform, parsed.id, parsed.clean)),
    });
    groupOf.set(key, input.group);
  }

  // Same clip on several platforms: keep only the best one per group
  const best = new Map<string, Video>();
  for (const v of items) {
    const g = groupOf.get(v.key);
    if (!g) continue;
    const cur = best.get(g);
    if (!cur || PRIORITY.indexOf(v.platform) < PRIORITY.indexOf(cur.platform)) best.set(g, v);
  }
  return items.filter((v) => {
    const g = groupOf.get(v.key);
    return !g || best.get(g) === v;
  });
}
