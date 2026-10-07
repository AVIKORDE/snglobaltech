/**
 * Generates branded SVG placeholder images for products that have no photo yet.
 * Run: npm run placeholders
 * Output: public/images/products/placeholders/<slug>.svg
 *
 * To replace a placeholder with a real photo, drop the file into
 * public/images/products/<slug>.webp and change `image` in src/data/products.js.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images/products/placeholders');
mkdirSync(outDir, { recursive: true });

const { products } = await import('../src/data/products.js');

const palettes = {
  pesticides: { a: '#1f4d2e', b: '#3f7a4e', leaf: '#8fc27a', text: '#f8f6f0', sub: '#c9d9c6' },
  fruits: { a: '#7a4a1e', b: '#c9a24d', leaf: '#f3ead3', text: '#fff8e8', sub: '#f3ead3' },
  'herbal-extracts': { a: '#6b3a1f', b: '#b8602b', leaf: '#f1c08a', text: '#fff6ec', sub: '#f5dcc2' },
  grains: { a: '#5e4a1a', b: '#a7893f', leaf: '#e9d9a5', text: '#fff9e9', sub: '#efe3bf' },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (text, max = 22) => {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
};

let count = 0;
for (const p of products) {
  if (!p.image.includes('/placeholders/')) continue;
  const c = palettes[p.category] || palettes.pesticides;
  const lines = wrap(p.name);
  const typeLines = wrap(p.type, 34).slice(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${esc(p.name)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.a}"/>
      <stop offset="1" stop-color="${c.b}"/>
    </linearGradient>
    <radialGradient id="r" cx="0.8" cy="0.2" r="0.8">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#g)"/>
  <rect width="800" height="800" fill="url(#r)"/>
  <g opacity="0.16" fill="${c.leaf}">
    <path d="M520 700c0-200 150-350 380-370-30 230-180 370-410 390 15-85 60-155 130-215-100 45-150 110-170 195z"/>
    <path d="M-60 420c20-160 140-270 320-280-20 180-130 290-300 300 12-70 50-128 110-176-80 36-120 92-130 156z"/>
  </g>
  <circle cx="400" cy="300" r="118" fill="${c.leaf}" opacity="0.22"/>
  <g fill="none" stroke="${c.text}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
    <path d="M340 340c0-70 50-120 120-128-8 70-58 120-128 128 6-30 20-55 42-76-30 14-46 44-52 76z"/>
  </g>
  <text x="400" y="${lines.length > 1 ? 470 : 490}" text-anchor="middle" font-family="Manrope, Segoe UI, sans-serif" font-size="52" font-weight="700" fill="${c.text}" letter-spacing="-1">
    ${lines.map((l, i) => `<tspan x="400" dy="${i === 0 ? 0 : 60}">${esc(l)}</tspan>`).join('')}
  </text>
  <text x="400" y="${(lines.length > 1 ? 470 : 490) + lines.length * 60 + 10}" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="22" fill="${c.sub}" letter-spacing="2">
    ${typeLines.map((l, i) => `<tspan x="400" dy="${i === 0 ? 0 : 30}">${esc(l.toUpperCase())}</tspan>`).join('')}
  </text>
  <text x="400" y="740" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="16" fill="${c.sub}" opacity="0.7" letter-spacing="3">PRODUCT IMAGE COMING SOON</text>
</svg>
`;
  writeFileSync(resolve(outDir, `${p.slug}.svg`), svg);
  count++;
}
console.log(`Generated ${count} placeholder image(s) in ${outDir}`);
