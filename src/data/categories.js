/**
 * Product categories. `key` is used in URLs (/products?category=<key>)
 * and in each product's `category` field.
 */
export const categories = [
  {
    key: 'fruits',
    label: 'Fruits',
    shortLabel: 'Fruits',
    tagline: 'Fresh produce for international markets',
    description:
      'We facilitate the trade of fresh produce for international markets, with a focus on product quality, suitable handling and export requirements.',
    image: '/images/provided/categories/fruits.jpg',
    cover: '/images/provided/categories/fruits.jpg',
    accent: '#c9a24d',
  },
  {
    key: 'pesticides',
    label: 'Agricultural Inputs',
    shortLabel: 'Agri Inputs',
    tagline: 'Pesticides, fertilizers & plant nutrition',
    description:
      'We trade pesticides, crop protection products, fertilizers and plant nutrition solutions that support modern farming and crop productivity.',
    image: '/images/provided/categories/agricultural-inputs.jpeg',
    cover: '/images/provided/categories/agricultural-inputs.jpeg',
    accent: '#5a9a46',
  },
  {
    key: 'herbal-extracts',
    label: 'Herbal Extracts & Nutritional Products',
    shortLabel: 'Herbal Extracts',
    tagline: 'Plant-derived ingredients for global buyers',
    description:
      'We offer herbal extract powders and nutritional powders for buyers seeking plant-derived ingredients and value-added agricultural products.',
    image: '/images/provided/categories/herbal-extracts.jpg',
    cover: '/images/provided/categories/herbal-extracts.jpg',
    accent: '#b8602b',
  },
  {
    key: 'grains',
    label: 'Cereals & Grains',
    shortLabel: 'Cereals & Grains',
    tagline: 'Cereal grains for international markets',
    description:
      'We support the international sourcing and supply of cereal grains and agricultural commodities for importers, distributors and commercial buyers.',
    image: '/images/provided/categories/grains.jpg',
    cover: '/images/provided/categories/grains.jpg',
    accent: '#a7893f',
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.key, c]));

export const getCategory = (key) => categoryMap[key];
