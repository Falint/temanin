import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = localFont({
  src: './fonts/Inter-Variable.ttf',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter',
});

const raleway = localFont({
  src: './fonts/Raleway-ExtraBold.ttf',
  weight: '800',
  display: 'swap',
  variable: '--font-raleway',
});

export const metadata = {
  title: 'TEMANIN | Platform Mental Health & Konseling Sebaya Remaja Kota Depok',
  description: 'Platform mental health, edukasi, dan konseling sebaya untuk remaja Kota Depok. Curhat anonim, temukan PIK-R terdekat, belajar, dan bermain.',
  icons: { icon: '/logo-temanin.png', apple: '/logo-temanin.png' },
  keywords: 'mental health, remaja, PIK-R, konseling sebaya, edukasi, Kota Depok, GenRe, curhat, TEMANIN',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${raleway.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
