import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '@/styles/styles.css';
import Navbar from '@/app/utils/components/navbar/Navbar';
import Footer from '@/app/utils/components/footer/Footer';

const roboto = localFont({
  src: './fonts/Roboto-Regular-webfont.woff',
  variable: '--font-roboto',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Russian Time Attack Championship',
  description:
    'RHHCC.RU -- Russian Time Attack Championship - любительские автомобильные соревнования на лучшее время круга',
  keywords:
    'автоспорт, кольцевые гонки, автогонки, любительские автогонки, любительские гонки, автоклуб, спортивное вождение, авточемпионат, любительский чемпионат',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
