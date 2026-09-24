import { Suspense } from 'react';
import WilayahContent from '@/components/curhat/WilayahContent';
import PageLoading from '@/components/shared/PageLoading';
import { getTelegramPartners } from '@/lib/telegram/partners';

export const dynamic = 'force-dynamic';

export default async function WilayahPage() {
  const partners = await getTelegramPartners();
  return (
    <Suspense fallback={<PageLoading message="Memuat wilayah PIK-R..." />}>
      <WilayahContent partners={partners} />
    </Suspense>
  );
}
