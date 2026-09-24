import 'server-only';
import { createHash, randomBytes } from 'node:crypto';

const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/$/, '');

export function requireConfig() {
  const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_WEBHOOK_SECRET', 'TELEGRAM_BOT_USERNAME'];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Missing server environment: ${missing.join(', ')}`);
}

export function tokenHash(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function makeLinkToken() {
  return randomBytes(24).toString('base64url');
}

export async function db(table, { select = '*', filters = {}, method = 'GET', body, single = false, order, limit } = {}) {
  const params = new URLSearchParams();
  if (select) params.set('select', select);
  for (const [field, value] of Object.entries(filters)) params.set(field, value);
  if (order) params.set('order', order);
  if (limit) params.set('limit', String(limit));
  const response = await fetch(`${supabaseUrl()}/rest/v1/${table}?${params}`, {
    method,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: method === 'GET' ? '' : 'return=representation',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Database ${table} ${method}: ${response.status} ${await response.text()}`);
  const rows = await response.json();
  return single ? rows[0] ?? null : rows;
}

export async function telegram(method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok || !data.ok) throw new Error(`Telegram ${method}: ${data.error_code || response.status} ${data.description || ''}`);
  return data.result;
}

export async function sendText(chatId, text, extra = {}) {
  return telegram('sendMessage', { chat_id: chatId, text, ...extra });
}
