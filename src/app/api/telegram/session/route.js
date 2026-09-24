import { db, makeLinkToken, requireConfig, tokenHash } from '@/lib/telegram/server';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    requireConfig();
    if (Number(request.headers.get('content-length') || 0) > 4096) return Response.json({ error: 'Request terlalu besar.' }, { status: 413 });
    const { pikrId, mode, displayName } = await request.json();
    if (typeof pikrId !== 'string' || !/^[a-z0-9-]{1,80}$/.test(pikrId) ||
        !['anonim', 'terhubung'].includes(mode) || typeof displayName !== 'string' ||
        !displayName.trim() || displayName.trim().length > 60) {
      return Response.json({ error: 'Data sesi tidak valid.' }, { status: 400 });
    }

    const partner = await db('pik_r_partners', {
      select: 'id,name', filters: { slug: `eq.${pikrId}`, is_active: 'eq.true', chat_enabled: 'eq.true' }, single: true,
    });
    if (!partner) return Response.json({ error: 'PIK-R tidak tersedia.' }, { status: 404 });
    const route = await db('telegram_pikr_routes', {
      select: 'pikr_id', filters: { pikr_id: `eq.${partner.id}` }, single: true,
    });
    if (!route) return Response.json({ error: 'Telegram PIK-R belum disiapkan.' }, { status: 409 });

    const session = await db('sessions', {
      method: 'POST', body: { identity_mode: mode, display_name: displayName.trim(), status: 'waiting' }, single: true,
    });
    const token = makeLinkToken();
    try {
      await db('conversations', { method: 'POST', body: { session_id: session.id, pik_r_id: partner.id, status: 'waiting' } });
      await db('telegram_sessions', {
        method: 'POST', body: { session_id: session.id, link_token_hash: tokenHash(token), link_expires_at: new Date(Date.now() + 15 * 60_000).toISOString() },
      });
    } catch (error) {
      await db('sessions', { method: 'DELETE', filters: { id: `eq.${session.id}` } }).catch(() => {});
      throw error;
    }
    const username = process.env.TELEGRAM_BOT_USERNAME.replace(/^@/, '');
    return Response.json({ url: `https://t.me/${username}?start=${token}`, sessionCode: session.session_code, partnerName: partner.name });
  } catch (error) {
    console.error('Create Telegram session failed:', error.message);
    return Response.json({ error: 'Gagal membuat sesi. Periksa konfigurasi server.' }, { status: 500 });
  }
}
