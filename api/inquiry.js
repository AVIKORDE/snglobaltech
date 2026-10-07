/**
 * Vercel Serverless Function: POST /api/inquiry
 *
 * 1. Validates the contact-form payload.
 * 2. Saves it to Supabase (table: inquiries)      -> needs SUPABASE_URL + SUPABASE_SERVICE_KEY
 * 3. Emails a notification via Resend              -> needs RESEND_API_KEY + INQUIRY_TO_EMAIL
 *
 * Either step is skipped if its env vars are missing, so you can start with just one.
 * No npm dependencies: uses the REST APIs of both services through fetch.
 */

const MAX = { fullName: 120, email: 160, phone: 40, company: 160, product: 120, productName: 160, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function clean(value, max) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max);
}

function validate(body) {
  const data = {};
  for (const key of Object.keys(MAX)) data[key] = clean(body[key], MAX[key]);

  const errors = {};
  if (!data.fullName) errors.fullName = 'Full name is required.';
  if (!data.email) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(data.email)) errors.email = 'Email is invalid.';
  if (!data.message || data.message.length < 10) errors.message = 'Message must be at least 10 characters.';
  return { data, errors };
}

async function saveToSupabase(row) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return { skipped: true };

  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const [saved] = await res.json();
  return { id: saved?.id };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

async function sendEmail(row, meta) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!apiKey || !to) return { skipped: true };

  const from = process.env.INQUIRY_FROM_EMAIL || 'SN Global Tech Website <onboarding@resend.dev>';
  const subject = `New inquiry${row.product_name ? `: ${row.product_name}` : ''} from ${row.full_name}`;
  const rows = [
    ['Name', row.full_name],
    ['Email', row.email],
    ['Phone', row.phone || '-'],
    ['Company', row.company || '-'],
    ['Product', row.product_name || row.product_slug || '-'],
    ['Message', row.message],
    ['Received', new Date().toISOString()],
    ['Record ID', meta.id || '(not stored)'],
  ];
  const html = `
    <h2 style="font-family:sans-serif">New website inquiry</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top"><b>${k}</b></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
        )
        .join('')}
    </table>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s) => s.trim()),
      reply_to: row.email,
      subject,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return { sent: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return json(res, 400, { ok: false, error: 'Invalid JSON' });
    }
  }
  body = body || {};

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (body.website) return json(res, 200, { ok: true });

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) return json(res, 422, { ok: false, errors });

  if (!process.env.SUPABASE_URL && !process.env.RESEND_API_KEY) {
    return json(res, 500, { ok: false, error: 'Inquiry service is not configured. Set SUPABASE_* or RESEND_* env vars.' });
  }

  const row = {
    full_name: data.fullName,
    email: data.email,
    phone: data.phone || null,
    company: data.company || null,
    product_slug: data.product || null,
    product_name: data.productName || null,
    message: data.message,
    source: clean(body.source, 40) || 'website',
    user_agent: clean(req.headers['user-agent'], 300) || null,
    ip: clean(req.headers['x-forwarded-for'], 100).split(',')[0] || null,
  };

  try {
    const saved = await saveToSupabase(row);
    let emailed;
    try {
      emailed = await sendEmail(row, saved);
    } catch (err) {
      // Stored but email failed: still a success for the visitor; log for the owner.
      console.error('[inquiry] email failed:', err.message);
      emailed = { sent: false };
    }
    return json(res, 200, { ok: true, id: saved.id ?? null, emailed: emailed.sent ?? false });
  } catch (err) {
    console.error('[inquiry] failed:', err.message);
    return json(res, 500, { ok: false, error: 'Could not save your inquiry. Please try again or email us directly.' });
  }
}
