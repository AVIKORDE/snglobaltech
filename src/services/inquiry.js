import { siteConfig } from '../data/siteConfig';

/**
 * Sends a contact-form inquiry.
 * Swap providers in src/data/siteConfig.js -> form.provider:
 *
 *  'api'       -> POST JSON to the Vercel serverless function (api/inquiry.js). Default.
 *  'formspree' -> POST JSON to siteConfig.form.endpoint (https://formspree.io/f/xxxx)
 *  'none'      -> demo mode: resolves after a short delay (no network call)
 *
 * In local `npm run dev` the /api route does not exist (Vite only). Either run
 * `npx vercel dev` to get the function locally, or the form will show the error state.
 */
export class InquiryError extends Error {
  constructor(message, fieldErrors) {
    super(message);
    this.fieldErrors = fieldErrors || null;
  }
}

export async function submitInquiry(payload) {
  const { provider, endpoint } = siteConfig.form;

  if (provider === 'none' || !endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[inquiry] demo mode, payload:', payload);
    }
    return { ok: true };
  }

  let res;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new InquiryError('Network error. Please check your connection and try again.');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }

  if (!res.ok) {
    throw new InquiryError(
      data?.error || `Request failed with status ${res.status}`,
      data?.errors || null,
    );
  }
  // Plain `npm run dev` has no /api route: Vite answers with index.html (200). Treat that as not configured.
  if (!data || data.ok !== true) {
    throw new InquiryError(
      'Inquiry service is not available in this environment. Run `npx vercel dev` or deploy to Vercel.',
    );
  }
  return data;
}
