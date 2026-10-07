/**
 * Offline test for api/inquiry.js: mocks req/res and fetch, no network, no keys needed.
 * Run: node scripts/test-inquiry-api.mjs
 */
import handler from '../api/inquiry.js';

const calls = [];
globalThis.fetch = async (url, opts) => {
  calls.push({ url, body: JSON.parse(opts.body) });
  if (url.includes('supabase')) return { ok: true, status: 201, json: async () => [{ id: 42 }], text: async () => '' };
  if (url.includes('resend')) return { ok: true, status: 200, json: async () => ({ id: 'em_1' }), text: async () => '' };
  return { ok: false, status: 404, text: async () => 'nope', json: async () => ({}) };
};

function mockRes() {
  const r = { statusCode: 0, headers: {}, body: null };
  r.status = (c) => ((r.statusCode = c), r);
  r.setHeader = (k, v) => ((r.headers[k] = v), r);
  r.end = (b) => ((r.body = JSON.parse(b)), r);
  return r;
}
const run = (method, body, headers = {}) => {
  const res = mockRes();
  return handler({ method, body, headers }, res).then(() => res);
};
const valid = { fullName: 'Asha Patel', email: 'asha@example.com', phone: '+91 98765 43210', company: 'Fresh Imports', product: 'mango', productName: 'Mango', message: 'Need 2 containers monthly to Dubai.' };

let failed = 0;
const check = (name, cond, extra = '') => { console.log(`${cond ? 'PASS' : 'FAIL'} ${name} ${extra}`); if (!cond) failed++; };

// no env configured
delete process.env.SUPABASE_URL; delete process.env.RESEND_API_KEY;
check('GET -> 405', (await run('GET')).statusCode === 405);
check('honeypot -> 200 silently', (await run('POST', { ...valid, website: 'spam.biz' })).statusCode === 200 && calls.length === 0);
let r = await run('POST', { fullName: '', email: 'bad', message: 'short' });
check('invalid -> 422 with field errors', r.statusCode === 422 && r.body.errors.fullName && r.body.errors.email && r.body.errors.message);
check('string JSON body parsed', (await run('POST', JSON.stringify({ fullName: '', email: '', message: '' }))).statusCode === 422);
r = await run('POST', valid);
check('valid but unconfigured -> 500 clear message', r.statusCode === 500 && /not configured/.test(r.body.error));

// supabase + resend configured
process.env.SUPABASE_URL = 'https://abc.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'svc';
process.env.RESEND_API_KEY = 're_x';
process.env.INQUIRY_TO_EMAIL = 'owner@example.com, second@example.com';
calls.length = 0;
r = await run('POST', valid, { 'user-agent': 'TestUA', 'x-forwarded-for': '1.2.3.4, 10.0.0.1' });
check('valid -> 200 ok with id', r.statusCode === 200 && r.body.ok && r.body.id === 42 && r.body.emailed === true, JSON.stringify(r.body));
check('supabase insert row shape', calls[0]?.url.endsWith('/rest/v1/inquiries') && calls[0].body.full_name === 'Asha Patel' && calls[0].body.product_slug === 'mango' && calls[0].body.ip === '1.2.3.4');
check('resend email to both recipients, reply-to visitor', calls[1]?.url.includes('resend') && calls[1].body.to.length === 2 && calls[1].body.reply_to === 'asha@example.com' && /Mango/.test(calls[1].body.subject));
check('html escaped', !calls[1].body.html.includes('<script'), '');

// resend fails but supabase saved -> still 200
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => (url.includes('resend') ? { ok: false, status: 500, text: async () => 'boom' } : realFetch(url, opts));
r = await run('POST', { ...valid, message: '<script>alert(1)</script> hello there' });
check('email failure after save -> 200, emailed:false', r.statusCode === 200 && r.body.ok && r.body.emailed === false);

// supabase fails -> 500
globalThis.fetch = async () => ({ ok: false, status: 500, text: async () => 'db down' });
r = await run('POST', valid);
check('db failure -> 500 friendly error', r.statusCode === 500 && !r.body.ok);

// only resend configured (no db) -> still 200
delete process.env.SUPABASE_URL;
globalThis.fetch = realFetch;
r = await run('POST', valid);
check('email-only config -> 200, id null', r.statusCode === 200 && r.body.ok && r.body.id === null && r.body.emailed === true);

console.log(failed ? `\n${failed} test(s) failed` : '\nall inquiry API tests passed');
process.exit(failed ? 1 : 0);
