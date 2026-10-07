/**
 * Product categories. `key` is used in URLs (/products?category=<key>)
 * and in each product's `category` field.
 */
export const categories = [
  {
    key: 'fruits',
    label: 'Fruits',
    shortLabel: 'Fruits',
    tagline: 'Fresh, export-ready fruits',
    description:
      'Naturally ripened, handpicked fruits sourced from sustainably managed farms across India and packed to international quality standards.',
    image: '/images/site/fruit-assortment.webp',
    cover: '/images/site/grape-vine.webp',
    accent: '#c9a24d',
  },
  {
    key: 'pesticides',
    label: 'Pesticides & Agri Inputs',
    shortLabel: 'Pesticides',
    tagline: 'Crop protection, nutrition & soil health',
    description:
      'Botanical bio-pesticides, sulphur formulations, bio-stimulants, micronutrients, soil conditioners and growing media — with bulk packing and private labelling options.',
    image: '/images/hero/corn-seedlings.webp',
    cover: '/images/hero/hero-field.webp',
    accent: '#5a9a46',
  },
  {
    key: 'herbal-extracts',
    label: 'Herbal Extract Powders',
    shortLabel: 'Herbal Extracts',
    tagline: '100% natural extract powders',
    description:
      'Pure, organic herbal extract powders with no additives, preservatives or artificial colours — for nutraceuticals, functional foods and cosmetics.',
    image: '/images/site/herbal-bowls.webp',
    cover: '/images/hero/spices-flatlay.webp',
    accent: '#b8602b',
  },
  {
    key: 'grains',
    label: 'Cereals & Grains',
    shortLabel: 'Cereals & Grains',
    tagline: 'Export-grade Indian cereals',
    description:
      'Premium Indian rice, wheat, soybean and maize — cleaned, graded and packed in export-compliant bags.',
    image: '/images/site/grains-banner.webp',
    cover: '/images/site/wheat-field.webp',
    accent: '#a7893f',
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.key, c]));

export const getCategory = (key) => categoryMap[key];
