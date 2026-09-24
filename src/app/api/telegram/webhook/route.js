import { timingSafeEqual } from 'node:crypto';
import { db, requireConfig, sendText, tokenHash } from '@/lib/telegram/server';

export const runtime = 'nodejs';

function validSecret(actual) {
  const expected = Buffer.from(process.env.TELEGRAM_WEBHOOK_SECRET || '');
  const received = Buffer.from(actual || '');
  return expected.length > 0 && expected.length === received.length && timingSafeEqual(expected, received);
}

async function relayToPikr(sessionId, text) {
  const conversation = await db('conversations', {
    select: 'id,pik_r_id', filters: { session_id: `eq.${sessionId}` }, single: true,
  });
  const route = await db('telegram_pikr_routes', {
    select: 'pikr_chat_id', filters: { pikr_id: `eq.${conversation.pik_r_id}` }, single: true,
  });
  if (!route) throw new Error('PIK-R route missing');
  const session = await db('sessions', {
    select: 'session_code,display_name', filters: { id: `eq.${sessionId}` }, single: true,
  });
  const sent = await sendText(route.pikr_chat_id, `[${session.session_code}] ${session.display_name}\n\n${text}\n\nBalas pesan ini dengan fitur Reply Telegram.`);
  await db('telegram_relay_messages', {
    method: 'POST', body: { pikr_chat_id: route.pikr_chat_id, bot_message_id: sent.message_id, session_id: sessionId },
  });
}

async function handleStart(chatId, token) {
  if (!/^[A-Za-z0-9_-]{32}$/.test(token || '')) {
    await sendText(chatId, 'Buka sesi curhat dari website TEMANIN, lalu tekan tombol menuju bot.');
    return;
  }
  const existing = await db('telegram_sessions', {
    select: 'session_id', filters: { user_chat_id: `eq.${chatId}`, closed_at: 'is.null' }, single: true,
  });
  if (existing) {
    await sendText(chatId, 'Kamu masih punya sesi aktif. Ketik /end untuk menutupnya sebelum memulai sesi baru.');
    return;
  }
  const binding = await db('telegram_sessions', {
    select: 'session_id', filters: {
      link_token_hash: `eq.${tokenHash(token)}`, user_chat_id: 'is.null', closed_at: 'is.null',
      link_expires_at: `gt.${new Date().toISOString()}`,
    }, single: true,
  });
  if (!binding) {
    await sendText(chatId, 'Tautan sesi tidak berlaku atau sudah kedaluwarsa. Buat sesi baru dari website TEMANIN.');
    return;
  }
  const linked = await db('telegram_sessions', {
    method: 'PATCH', filters: { session_id: `eq.${binding.session_id}`, user_chat_id: 'is.null', closed_at: 'is.null' },
    body: { user_chat_id: chatId, linked_at: new Date().toISOString() }, single: true,
  });
  if (!linked) return;
  await db('sessions', { method: 'PATCH', filters: { id: `eq.${binding.session_id}` }, body: { status: 'active' } });
  await db('conversations', { method: 'PATCH', filters: { session_id: `eq.${binding.session_id}` }, body: { status: 'connected', started_at: new Date().toISOString() } });
  await relayToPikr(binding.session_id, 'Sesi curhat baru dimulai.');
  await sendText(chatId, 'Sesi curhat dimulai. Tulis pesanmu di sini. Untuk mengakhiri sesi, ketik /end. TEMANIN bukan layanan darurat.');
}

async function handlePrivate(message) {
  const chatId = message.chat.id;
  const text = message.text?.trim();
  if (!text) return;
  if (text.startsWith('/start')) {
    await handleStart(chatId, text.split(/\s+/, 2)[1]);
    return;
  }
  const binding = await db('telegram_sessions', {
    select: 'session_id', filters: { user_chat_id: `eq.${chatId}`, closed_at: 'is.null' }, single: true,
  });
  if (!binding) {
    await sendText(chatId, 'Belum ada sesi aktif. Mulai dari halaman curhat TEMANIN.');
    return;
  }
  if (text === '/end') {
    const now = new Date().toISOString();
    await db('telegram_sessions', { method: 'PATCH', filters: { session_id: `eq.${binding.session_id}` }, body: { closed_at: now } });
    await db('sessions', { method: 'PATCH', filters: { id: `eq.${binding.session_id}` }, body: { status: 'closed', closed_at: now } });
    await db('conversations', { method: 'PATCH', filters: { session_id: `eq.${binding.session_id}` }, body: { status: 'closed', closed_at: now } });
    await relayToPikr(binding.session_id, 'Sesi sudah ditutup oleh pengguna.');
    await sendText(chatId, 'Sesi ditutup. Terima kasih sudah bercerita.');
    return;
  }
  const session = await db('sessions', { select: 'status', filters: { id: `eq.${binding.session_id}` }, single: true });
  if (session?.status !== 'active') return;
  await relayToPikr(binding.session_id, text.slice(0, 3500));
}

async function handlePikrReply(message) {
  if (!message.reply_to_message?.message_id || !message.text?.trim() || !message.from?.id || message.from.is_bot) return;
  const route = await db('telegram_pikr_routes', {
    select: 'pikr_id', filters: { pikr_chat_id: `eq.${message.chat.id}` }, single: true,
  });
  if (!route) return;
  const staff = await db('telegram_pikr_staff', {
    select: 'telegram_user_id', filters: { pikr_id: `eq.${route.pikr_id}`, telegram_user_id: `eq.${message.from.id}` }, single: true,
  });
  if (!staff) return;
  const relay = await db('telegram_relay_messages', {
    select: 'session_id', filters: { pikr_chat_id: `eq.${message.chat.id}`, bot_message_id: `eq.${message.reply_to_message.message_id}` }, single: true,
  });
  if (!relay) return;
  const conversation = await db('conversations', {
    select: 'pik_r_id,status', filters: { session_id: `eq.${relay.session_id}` }, single: true,
  });
  if (conversation?.pik_r_id !== route.pikr_id || conversation.status !== 'connected') return;
  const binding = await db('telegram_sessions', {
    select: 'user_chat_id', filters: { session_id: `eq.${relay.session_id}`, closed_at: 'is.null' }, single: true,
  });
  if (!binding?.user_chat_id) return;
  await sendText(binding.user_chat_id, message.text.trim().slice(0, 4000));
}

export async function POST(request) {
  if (!validSecret(request.headers.get('x-telegram-bot-api-secret-token'))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    requireConfig();
    const raw = await request.text();
    if (raw.length > 100_000) return Response.json({ error: 'Request too large' }, { status: 413 });
    const update = JSON.parse(raw);
    if (!Number.isSafeInteger(update.update_id)) return Response.json({ error: 'Invalid update' }, { status: 400 });
    try {
      await db('telegram_processed_updates', { method: 'POST', body: { update_id: update.update_id } });
    } catch (error) {
      if (error.message.includes('409')) return Response.json({ ok: true, duplicate: true });
      throw error;
    }
    try {
      const message = update.message;
      if (message?.chat?.type === 'private' && message.from?.id === message.chat.id) await handlePrivate(message);
      else if (message?.chat?.type === 'group' || message?.chat?.type === 'supergroup') await handlePikrReply(message);
      return Response.json({ ok: true });
    } catch (error) {
      await db('telegram_processed_updates', { method: 'DELETE', filters: { update_id: `eq.${update.update_id}` } }).catch(() => {});
      throw error;
    }
  } catch (error) {
    console.error('Telegram webhook failed:', error.message);
    return Response.json({ error: 'Processing failed' }, { status: 500 });
  }
}
