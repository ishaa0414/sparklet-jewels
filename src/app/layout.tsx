import type { Metadata } from 'next';
import { Fraunces, Caveat, DM_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SplashScreen from '@/components/layout/SplashScreen';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-handwritten',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sparklet Jewels — Jewellery for the main character era',
  description:
    'Sparklet Jewels is a Gen-Z jewellery catalogue full of scrapbook charm — hoops, chains, rings, and charms for every era of you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${caveat.variable} ${dmSans.variable}`}>
      <body>
        <SplashScreen />
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
