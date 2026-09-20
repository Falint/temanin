import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'TEMANIN | Platform Mental Health & Konseling Sebaya Remaja Kota Depok',
  description: 'Platform mental health, edukasi, dan konseling sebaya untuk remaja Kota Depok. Curhat anonim, temukan PIK-R terdekat, belajar, dan bermain.',
  keywords: 'mental health, remaja, PIK-R, konseling sebaya, edukasi, Kota Depok, GenRe, curhat, TEMANIN',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
