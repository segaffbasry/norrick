import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { brand } from "../lib/brand.ts";
// Use Next's image runtime rather than adding a second image dependency.
const require = createRequire(import.meta.resolve("next/package.json"));
const sharp = require("sharp");
const root = new URL("../", import.meta.url);
const paths = (art) => art.paths.map((d) => `<path d="${d}"/>`).join("");
const svg = (art, fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.width} ${art.height}" fill="${fill}">${paths(art)}</svg>`;
for (const [name, art] of Object.entries({wordmark:brand.wordmark, mark:brand.mark})) {
  for (const [color, fill] of Object.entries({purple:brand.purple, white:"#ffffff", black:"#000000"})) {
    await writeFile(new URL(`public/brand/norrick-${name}-${color}.svg`, root), svg(art, fill));
  }
}
// The N, fitted inside a 34px box and centred on a purple rounded square.
const scale = 34 / Math.max(brand.mark.width, brand.mark.height);
const [w, h] = [brand.mark.width * scale, brand.mark.height * scale];
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${brand.purple}"/><g fill="white" transform="translate(${(64 - w) / 2} ${(64 - h) / 2}) scale(${scale})">${paths(brand.mark)}</g></svg>`;
await writeFile(new URL("app/icon.svg", root), icon);
await sharp(Buffer.from(icon)).resize(180,180).png().toFile(new URL("app/apple-icon.png", root).pathname);
const png = await sharp(Buffer.from(icon)).resize(32,32).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1,2); ico.writeUInt16LE(1,4); ico[6]=32; ico[7]=32;
ico.writeUInt16LE(1,10); ico.writeUInt16LE(32,12); ico.writeUInt32LE(png.length,14); ico.writeUInt32LE(22,18);
await writeFile(new URL("app/favicon.ico",root), Buffer.concat([ico,png]));
console.log("Generated brand assets from lib/brand.ts");
