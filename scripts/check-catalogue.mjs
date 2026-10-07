/**
 * Sanity check for the product catalogue:
 *  - unique slugs, valid categories
 *  - every referenced image exists in /public
 * Run: node scripts/check-catalogue.mjs
 */
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { products } = await import('../src/data/products.js');
const { categories } = await import('../src/data/categories.js');

const keys = new Set(categories.map((c) => c.key));
const slugs = new Set();
let errors = 0;

for (const p of products) {
  if (slugs.has(p.slug)) { console.error(`duplicate slug: ${p.slug}`); errors++; }
  slugs.add(p.slug);
  if (!keys.has(p.category)) { console.error(`${p.slug}: unknown category ${p.category}`); errors++; }
  if (!existsSync(resolve(root, 'public', p.image.replace(/^\//, '')))) {
    console.error(`${p.slug}: missing image ${p.image}`); errors++;
  }
  if (!p.shortDescription || !p.description) { console.error(`${p.slug}: missing description`); errors++; }
}
for (const c of categories) {
  for (const f of ['image', 'cover']) {
    if (!existsSync(resolve(root, 'public', c[f].replace(/^\//, '')))) {
      console.error(`category ${c.key}: missing ${f} ${c[f]}`); errors++;
    }
  }
}

const byCat = Object.fromEntries(categories.map((c) => [c.key, products.filter((p) => p.category === c.key).length]));
console.log(`${products.length} products`, byCat);
console.log(errors ? `${errors} problem(s)` : 'catalogue OK');
process.exit(errors ? 1 : 0);
