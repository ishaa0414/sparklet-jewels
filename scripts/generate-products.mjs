// Reads product folders from "src/sparklet products", copies their images into
// public/sparklet-products (folder + file names made URL-safe), and writes
// src/lib/data/products.ts from the parsed folder names.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src', 'sparklet products');
const PUBLIC_DIR = path.join(ROOT, 'public', 'sparklet-products');
const OUTPUT_FILE = path.join(ROOT, 'src', 'lib', 'data', 'products.ts');

const IMAGE_EXT_RE = /\.(jpe?g)$/i;

const CATEGORY_KEYWORDS = [
  ['earrings', ['earring', 'ear', 'stud', 'hoop', 'drop ear']],
  ['necklaces', ['necklace', 'chain', 'pendant', 'choker']],
  ['rings', ['ring']],
  ['bracelets', ['bracelet', 'bangle', 'cuff']],
  ['charms', ['charm', 'keychain', 'keyc', 'book mark', 'bookmark', 'phone charm']],
  ['sets', ['set', 'couple', 'pair']],
];

const TAG_KEYWORDS = [
  ['new', ['new', '2.0', 'latest']],
  ['bestseller', ['couple', 'everlasting', 'golden', 'frozen']],
  ['limited', ['limited', 'special']],
];

const DESCRIPTIONS = {
  earrings: 'your ears called — they want these ✦',
  necklaces: 'layer it, love it, live in it ♡',
  rings: 'wear it on every finger, no rules ✦',
  bracelets: "stack 'em up, show 'em off ♡",
  charms: 'tiny treasure, big personality ✦',
  sets: 'because matching is always a good idea ♡',
};

const MATERIALS = {
  earrings: 'Oxidised metal / alloy, hypoallergenic hooks',
  necklaces: 'Metal alloy chain, zinc-free pendant',
  rings: 'Metal alloy, adjustable band',
  bracelets: 'Beaded / metal alloy',
  charms: 'Metal alloy, handcrafted',
  sets: 'Metal alloy, mixed materials',
};

const DIMENSIONS = {
  earrings: 'Approx. 2–4cm',
  necklaces: 'Approx. 40–45cm chain',
  rings: 'Adjustable fit',
  bracelets: 'Approx. 17–19cm',
  charms: 'Approx. 3–6cm',
  sets: 'Varies by piece',
};

const CARE = 'Keep away from water and perfume. Store in a cool dry place.';

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanName(name) {
  return name.replace(/\s+/g, ' ').trim();
}

function parseFolderName(folderName) {
  const working = folderName.trim();

  let m = working.match(/^(.+?)\s+[Rr]s\s*\.?\s*(\d+(?:\.\d+)?)\s*(?:each\.?)?\s*$/);
  if (m) return { name: cleanName(m[1]), price: parseFloat(m[2]) };

  m = working.match(/^(.+?)\s+(\d+(?:\.\d+)?)$/);
  if (m) return { name: cleanName(m[1]), price: parseFloat(m[2]) };

  return null;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Leading-boundary-only match: catches "rings"/"necklaces" (plurals) via their
// singular keyword, but avoids a short keyword like "ear" or "chain" matching
// mid-word inside unrelated names ("heart", "keychain").
function keywordMatches(lower, keyword) {
  return new RegExp(`\\b${escapeRegex(keyword)}`).test(lower);
}

function detectCategory(name) {
  const lower = name.toLowerCase();
  for (const [category, keywords] of CATEGORY_KEYWORDS) {
    if (keywords.some((k) => keywordMatches(lower, k))) return category;
  }
  return 'charms';
}

function detectTag(name) {
  const lower = name.toLowerCase();
  for (const [tag, keywords] of TAG_KEYWORDS) {
    if (keywords.some((k) => keywordMatches(lower, k))) return tag;
  }
  return undefined;
}

function uniqueSlug(base, used) {
  let slug = base || 'product';
  let n = 2;
  while (used.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  used.add(slug);
  return slug;
}

function main() {
  const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true }).filter((e) => e.isDirectory());

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const usedProductSlugs = new Set();
  const usedFolderSlugs = new Set();
  const warnings = [];
  const products = [];

  for (const entry of entries) {
    const folderName = entry.name;
    const srcFolderPath = path.join(SRC_DIR, folderName);

    const parsed = parseFolderName(folderName);
    let name;
    let price;
    if (parsed) {
      name = parsed.name;
      price = parsed.price;
    } else {
      name = cleanName(folderName);
      price = 0;
      warnings.push(folderName);
    }

    const category = detectCategory(name);
    const tag = detectTag(name);

    const productSlug = uniqueSlug(slugify(name), usedProductSlugs);
    const folderSlug = uniqueSlug(slugify(folderName), usedFolderSlugs);

    const destFolderPath = path.join(PUBLIC_DIR, folderSlug);
    fs.mkdirSync(destFolderPath, { recursive: true });

    const imageFiles = fs
      .readdirSync(srcFolderPath, { withFileTypes: true })
      .filter((f) => f.isFile() && IMAGE_EXT_RE.test(f.name))
      .map((f) => f.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const images = [];
    imageFiles.forEach((imageName, i) => {
      const ext = path.extname(imageName).toLowerCase();
      const destName = `${i + 1}${ext}`;
      fs.copyFileSync(path.join(srcFolderPath, imageName), path.join(destFolderPath, destName));
      images.push(`/sparklet-products/${folderSlug}/${destName}`);
    });

    products.push({
      slug: productSlug,
      name,
      price,
      category,
      tag,
      description: DESCRIPTIONS[category],
      material: MATERIALS[category],
      dimensions: DIMENSIONS[category],
      care: CARE,
      inStock: true,
      images,
    });
  }

  products.sort((a, b) => a.name.localeCompare(b.name));
  products.forEach((p, i) => {
    p.id = String(i + 1);
  });

  products.forEach((product) => {
    product.relatedProducts = products
      .filter((p) => p.category === product.category && p.slug !== product.slug)
      .slice(0, 4)
      .map((p) => p.slug);
  });

  const productLines = products
    .map((p) => {
      const images = p.images.map((img) => `        '${img}',`).join('\n');
      const related = p.relatedProducts.map((s) => `'${s}'`).join(', ');
      return `  {
    id: '${p.id}',
    slug: '${p.slug}',
    name: ${JSON.stringify(p.name)},
    price: ${p.price},
    category: '${p.category}',
    tag: ${p.tag ? `'${p.tag}'` : 'undefined'},
    description: ${JSON.stringify(p.description)},
    material: ${JSON.stringify(p.material)},
    dimensions: ${JSON.stringify(p.dimensions)},
    care: ${JSON.stringify(p.care)},
    inStock: ${p.inStock},
    images: [
${images}
    ],
    relatedProducts: [${related}],
  },`;
    })
    .join('\n');

  const fileContent = `import { Product } from '@/types';

export const products: Product[] = [
${productLines}
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getRelatedProducts = (product: Product, count = 4) =>
  products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, count);
`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  console.log(`✦ Generated ${products.length} products`);
  console.log(
    `✦ Categories: ${Object.entries(categoryCounts)
      .map(([cat, count]) => `${cat}(${count})`)
      .join(', ')}`
  );
  if (warnings.length) {
    console.log(`⚠ Could not parse: ${warnings.join(', ')}`);
  }
}

main();
