/**
 * Central site configuration.
 * Update company details here — every page reads from this file.
 *
 * Contact details below are taken from the company brochures (PDF back pages).
 * Values wrapped in [brackets] are placeholders that still need to be provided.
 */
export const siteConfig = {
  name: 'SN Global Tech',
  shortName: 'SN Global Tech',
  tagline: "Nature's Purity, Delivered Worldwide",
  description:
    'SN Global Tech supplies pure, organic and export-ready fresh fruits, herbal extract powders, cereals and agricultural inputs sourced from sustainably managed farms across India.',
  logo: '/images/site/logo.webp',

  contact: {
    phonePrimary: '+91 80074 49345',
    phonePrimaryLabel: 'SN Globaltech',
    // Optional second line. Leave empty ('') to hide it everywhere.
    phoneSecondary: '',
    phoneSecondaryLabel: '',
    email: 'eximsnenterprises@gmail.com',
    legalName: 'S. N. Globaltech',
    // Multi-line postal address. Each item renders on its own line.
    addressLines: [
      'At Post Bahaduri, H/N 411, Shivnirmal Nivas',
      'Bahaduri-Tisgaon Road, Tal Chandwad',
      'Dist Nashik, Maharashtra 422205',
      'India',
    ],
    // Single-line version used in the footer.
    address: 'At Post Bahaduri, H/N 411, Shivnirmal Nivas, Bahaduri-Tisgaon Road, Tal Chandwad, Dist Nashik',
    city: 'Maharashtra 422205, India',
    hours: 'Mon – Sat, 10:00 – 18:00 IST',
  },

  social: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
  ],

  /**
   * Contact form delivery. Set `provider` to:
   *  - 'api'       : Vercel serverless function /api/inquiry.js (saves to Supabase + emails via Resend)
   *  - 'formspree' : set endpoint to your Formspree form URL
   *  - 'none'      : demo mode (logs to console, shows success)
   * Note: /api/inquiry exists on Vercel or with `npx vercel dev`, NOT with plain `npm run dev`.
   */
  form: {
    provider: 'api',
    endpoint: '/api/inquiry',
  },
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Products',
    to: '/products',
    children: [
      { label: 'Fruits', to: '/products?category=fruits' },
      { label: 'Pesticides & Agri Inputs', to: '/products?category=pesticides' },
      { label: 'Herbal Extracts', to: '/products?category=herbal-extracts' },
      { label: 'Cereals & Grains', to: '/products?category=grains' },
    ],
  },
  { label: 'Contact Us', to: '/contact' },
];
