import fs from "fs";
const F = "src/data/videos.json";
const UA = { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36" };
fs.mkdirSync("public/thumbs", { recursive: true });
const list = JSON.parse(fs.readFileSync(F, "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const idOf = (u) => (u.match(/\/(?:video|photo)\/(\d+)/) || [])[1];
const local = (id) => "public/thumbs/" + id + ".jpg";
async function download(url, id) {
  try {
    const r = await fetch(url, { headers: UA });
    if (!r.ok) return false;
    fs.writeFileSync(local(id), Buffer.from(await r.arrayBuffer()));
    return true;
  } catch { return false; }
}
async function oembed(u) {
  try {
    const r = await fetch("https://www.tiktok.com/oembed?url=" + encodeURIComponent(u), { headers: UA });
    const j = await r.json();
    return j.thumbnail_url || null;
  } catch { return null; }
}
let ok = 0, miss = 0, n = 0;
for (const v of list) {
  n++;
  const id = idOf(v.url);
  if (!id) continue;
  if (fs.existsSync(local(id))) { v.thumb = "/thumbs/" + id + ".jpg"; continue; }
  if (v.thumb && v.thumb.startsWith("/images/")) v.thumb = null;
  let done = false;
  for (let t = 0; t < 3 && !done; t++) {
    const old = t === 0 && v.thumb && v.thumb.startsWith("http") ? v.thumb : null;
    const u = old || (await oembed(v.url));
    if (u && (await download(u, id))) { v.thumb = "/thumbs/" + id + ".jpg"; done = true; ok++; }
    else await sleep(10000);
  }
  if (!done) miss++;
  fs.writeFileSync(F, JSON.stringify(list, null, 2) + "\n");
  console.log(n + "/" + list.length + (done ? " saved" : " missed"));
  await sleep(4000);
}
console.log("Saved " + ok + ", still missing " + miss);
