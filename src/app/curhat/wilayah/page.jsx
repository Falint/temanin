import { Suspense } from 'react';
import Link from 'next/link';
import styles from '@/components/curhat/curhat.module.css';
import WilayahContent from '@/components/curhat/WilayahContent';
import PageLoading from '@/components/shared/PageLoading';
import { getTelegramPartners } from '@/lib/telegram/partners';

export const dynamic = 'force-dynamic';

export default async function WilayahPage() {
  let partners;
  try { partners = await getTelegramPartners(); }
  catch {
    return <section className={styles.unavailable}><span className="badge badge-primary">JARINGAN PIK-R</span><h1>Daftar PIK-R belum bisa dimuat.</h1><p>Sambungan layanan sedang tidak tersedia. Pilihan profilmu tetap tersimpan pada sesi browser ini. Coba muat ulang sebentar lagi.</p><div><a href="" className="btn btn-primary">Muat ulang</a><Link href="/curhat" className="btn btn-outline">Kembali ke Curhat</Link></div></section>;
  }
  return (
    <Suspense fallback={<PageLoading message="Memuat wilayah PIK-R..." />}>
      <WilayahContent partners={partners} />
    </Suspense>
  );
}
