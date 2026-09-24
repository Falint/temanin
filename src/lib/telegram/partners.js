import 'server-only';
import { db } from './server';

export async function getTelegramPartners() {
  const [partners, routes] = await Promise.all([
    db('pik_r_partners', {
      select: 'id,slug,name,district,city,description,chat_enabled,offline_counseling_enabled',
      filters: { is_active: 'eq.true', chat_enabled: 'eq.true' },
      order: 'name.asc',
    }),
    db('telegram_pikr_routes', { select: 'pikr_id' }),
  ]);
  const configured = new Set(routes.map((route) => route.pikr_id));
  return partners.filter((partner) => configured.has(partner.id)).map((partner) => ({
    id: partner.slug,
    name: partner.name,
    city: partner.city,
    district: partner.district,
    description: partner.description,
    telegramEnabled: true,
  }));
}
