# SN Global Tech — Corporate Website

Static React website for SN Global Tech: fresh fruits, pesticides & agricultural inputs, herbal extract powders, and cereals & grains.

Built with **React 18 + Vite + React Router 6 + Framer Motion + Lucide React**. No backend required.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

Requires Node 18+.

---

## Project structure

```
public/
  images/
    hero/                 full-bleed photos (from brochures)
    site/                 logo + decorative cut-outs
    products/             product photos  <slug>.webp
    products/placeholders/ generated SVGs for products without photos
  _redirects              Netlify SPA fallback
  404.html                GitHub Pages SPA fallback
src/
  animations/variants.js  shared Framer Motion variants
  components/             Header, Footer, Button, ProductCard, ProductImage,
                          SectionTitle, PageHero, ContactForm, CategoryTabs,
                          Badge, Reveal, Container
  data/
    siteConfig.js         company name, tagline, contact details, nav, form provider
    categories.js         product categories (keys used in URLs)
    products.js           ALL products from both PDFs (single source of truth)
  hooks/                  useSeo, useScrolled, useMediaQuery, useTheme (light/dark)
  layouts/MainLayout.jsx  header + footer + page transitions + scroll restore
  pages/                  Home, About, Products, ProductDetails, Contact, NotFound
  services/inquiry.js     contact form submission adapter
  styles/variables.css    design tokens (colors, type, spacing, radius, shadows)
  styles/global.css       reset + utilities
  styles/dark.css         dark-theme overrides (scoped to html[data-theme="dark"])
scripts/
  generate-placeholders.mjs  regenerates placeholder SVGs for products without photos
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About Us |
| `/products` | Catalogue (all) |
| `/products?category=fruits` | Fruits only |
| `/products?category=pesticides` | Pesticides & Agri Inputs only |
| `/products?category=herbal-extracts` | Herbal Extract Powders only |
| `/products?category=grains` | Cereals & Grains only |
| `/products/:slug` | Product details (e.g. `/products/mango`) |
| `/contact` | Contact |
| `/contact?product=<slug>` | Contact with product pre-selected |
| anything else | 404 |

---

## Editing content

### Company / contact details
Edit `src/data/siteConfig.js`. Placeholders still to fill:
- `contact.address` → currently `[Company Address]`
- `social[].href` → currently `#`

### Products
Edit `src/data/products.js`. Every product has:

```js
{
  id, slug, name, category, type, featured,
  image, shortDescription, description,
  composition,     // optional
  features: [],    // "Key Benefits" / "Quality Attributes"
  targets: [],     // optional – target pests / use
  applications: [],// optional
  packaging: [],   // optional – supply options
}
```

`category` must be one of the keys in `src/data/categories.js`. `slug` becomes the URL.

### Product images
- Photos extracted from the catalogue live in `public/images/products/<slug>.webp`.
- The 15 agri-input products had no photos in the brochure. They use generated SVG placeholders in `public/images/products/placeholders/`.
- **To replace a placeholder:** drop `public/images/products/<slug>.webp` (square works best, transparent background preferred) and change the product's `image` to `img('<slug>')` in `products.js`.
- Re-generate placeholders after adding products: `npm run placeholders`.

---

## Contact form: where inquiries go

The form posts to a **Vercel serverless function** in `api/inquiry.js` (default `siteConfig.form.provider = 'api'`). It lives in the same repo and deploys with the frontend, no separate backend hosting.

The function does two things, each optional depending on which env vars are set:

| Step | Service | Env vars | You see inquiries in |
|------|---------|----------|----------------------|
| Save | Supabase (Postgres) | `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | Supabase dashboard → Table Editor → `inquiries` |
| Notify | Resend (email) | `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` | Your inbox (reply-to = visitor) |

Spam protection: hidden honeypot field (bots fill it, request is silently dropped) plus server-side validation and length limits.

### One-time setup (about 20 minutes)

**1. Supabase (free)**
1. Create project at supabase.com.
2. SQL Editor → paste `supabase/schema.sql` → Run.
3. Project Settings → API: copy **Project URL** and the **service_role** key (not anon).

**2. Resend (free)**
1. Sign up at resend.com → API Keys → create key.
2. Without a verified domain, Resend only delivers to the email you signed up with. Verify your domain later to send from `inquiries@yourdomain.com` (`INQUIRY_FROM_EMAIL`).

**3. Vercel**
1. Project → Settings → Environment Variables → add the 4 keys from `.env.example`.
2. Redeploy. The form now works at `https://yoursite.vercel.app/contact`.

### Local development
Plain `npm run dev` runs only Vite: the form shows "service not available". To test the function locally:

```bash
npm i -g vercel
cp .env.example .env     # fill in keys
vercel dev               # http://localhost:3000, serves both the site and /api/inquiry
```

Offline unit test of the function (no keys needed): `npm run test:api`.

### Alternatives
- **Formspree**: `provider: 'formspree'`, `endpoint: 'https://formspree.io/f/XXXX'`. No backend, email + dashboard.
- **Demo**: `provider: 'none'` shows success without sending.

Payload the client sends: `{ fullName, email, phone, company, product, productName, message, website (honeypot), source }`.

---

## Deployment

**Vercel** – import the repo; `vercel.json` already contains the SPA rewrite.

**Netlify** – build command `npm run build`, publish dir `dist`. `public/_redirects` handles SPA routing.

**GitHub Pages** – project sites live under `/<repo>/`:
1. In `vite.config.js` set `base: '/<repo-name>/'`.
2. Build and publish `dist/` (e.g. with `gh-pages` or an Actions workflow).
3. `public/404.html` redirects deep links back to the app.

**Any static host** – upload `dist/` and configure the server to serve `index.html` for unknown paths.

---

## Design system

Tokens are CSS variables in `src/styles/variables.css`:

- **Colors**: deep forest green primary (`#1f4d2e`), natural green secondary (`#5a9a46`), muted gold accent (`#c9a24d`), warm off-white background (`#f8f6f0`), charcoal text (`#1e2420`).
- **Type**: Manrope (headings) + Inter (body), fluid `clamp()` sizes.
- **Spacing / radius / shadows / motion** easing all tokenised.

Animations respect `prefers-reduced-motion` (Framer `MotionConfig reducedMotion="user"` + CSS media query).

### Dark mode

- Toggle lives in the header (sun / moon button, all screen sizes). The choice is saved in `localStorage` under `sn-theme`.
- Without a saved choice the site follows the OS preference (`prefers-color-scheme`) and keeps following it if it changes.
- `index.html` applies the theme before first paint (no flash); `src/hooks/useTheme.jsx` keeps it in sync afterwards.
- All dark colours live in `src/styles/dark.css`, scoped to `html[data-theme="dark"]`. Light mode uses the original tokens untouched.
- To force light as the default regardless of OS, make `systemTheme()` in `useTheme.jsx` return `'light'` and change the matching `matchMedia` line in the `index.html` script.
