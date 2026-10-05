import fs from "fs";
const CHAT = process.argv[2] || "whatsapp-chat.txt";
const JSON_FILE = "src/data/videos.json";
const UA = { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36" };
const text = fs.existsSync(CHAT) ? fs.readFileSync(CHAT, "utf8") : "";
const shorts = [...new Set((text.match(/https?:\/\/(?:vt|vm)\.tiktok\.com\/[A-Za-z0-9]+\/?/g) || []).map((u) => u.replace(/\/?$/, "/")))];
const longs = [...new Set(text.match(/https?:\/\/(?:www\.)?tiktok\.com\/@[\w.\-]+\/(?:video|photo)\/\d+/g) || [])];
console.log("Found " + shorts.length + " short links, " + longs.length + " full links.");
let list = [];
try { list = JSON.parse(fs.readFileSync(JSON_FILE, "utf8")); } catch {}
list = list.filter((v) => !v.url.includes("0000000000000000000"));
const idOf = (u) => (u.match(/\/(?:video|photo)\/(\d+)/) || [])[1];
const have = new Set(list.map((v) => idOf(v.url)).filter(Boolean));
async function resolve(url) {
  if (/\/(video|photo)\//.test(url)) return url.split("?")[0];
  try {
    const r = await fetch(url, { redirect: "follow", headers: UA });
    const final = r.url.split("?")[0];
    return /\/(video|photo)\//.test(final) ? final : null;
  } catch { return null; }
}
async function titleOf(url) {
  try {
    const r = await fetch("https://www.tiktok.com/oembed?url=" + encodeURIComponent(url), { headers: UA });
    if (!r.ok) return "";
    const t = ((await r.json()).title || "").replace(/\s+/g, " ").trim();
    return t.length > 80 ? t.slice(0, 77) + "..." : t;
  } catch { return ""; }
}
const all = [...longs, ...shorts];
let added = 0, dup = 0;
const failed = [];
for (let i = 0; i < all.length; i += 5) {
  await Promise.all(all.slice(i, i + 5).map(async (u) => {
    const full = await resolve(u);
    if (!full) { failed.push(u); return; }
    const id = idOf(full);
    if (have.has(id)) { dup++; return; }
    have.add(id);
    const title = await titleOf(full);
    list.push(title ? { url: full, title } : { url: full });
    added++;
  }));
  process.stdout.write("\rProcessed " + Math.min(i + 5, all.length) + "/" + all.length);
}
fs.writeFileSync(JSON_FILE, JSON.stringify(list, null, 2) + "\n");
console.log("\nAdded " + added + ", duplicates skipped " + dup + ", failed " + failed.length + ". Total: " + list.length);
if (failed.length) fs.writeFileSync("failed-links.txt", failed.join("\n") + "\n");
