import fs from "fs";
const F = "src/data/videos.json";
const l = JSON.parse(fs.readFileSync(F, "utf8"));
const imgs = fs.readdirSync("public/images").filter((f) => /^A\d+\.jpg$/.test(f)).sort();
let n = 0;
l.forEach((v, i) => {
  if (!v.thumb) { v.thumb = "/images/" + imgs[i % imgs.length]; n++; }
});
fs.writeFileSync(F, JSON.stringify(l, null, 2) + "\n");
console.log("Placeholders assigned: " + n);
