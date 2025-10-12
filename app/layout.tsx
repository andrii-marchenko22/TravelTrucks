import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';

export const interRegular = Inter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-inter-regular',
});

export const interMedium = Inter({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-inter-medium',
});

export const interSemiBold = Inter({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-inter-semibold',
});

export const metadata: Metadata = {
  title: 'TravelTrucks — Find Your Ideal Truck',
  description:
    'TravelTrucks is your go-to platform for discovering trucks. Explore detailed descriptions, specs, and find the perfect truck for your needs.',
  icons: {
    icon: '/trailer.webp',
  },
  openGraph: {
    title: 'TravelTrucks — Find Your Ideal Truck',
    description:
      'Search and explore trucks with full specifications, images, and descriptions on TravelTrucks. Your one-stop resource for truck information.',
    // url: '#',   після деплою додати лінк
    images: [
      {
        url: '/trailer.webp',
        width: 1200,
        height: 630,
        alt: 'TravelTrucks — Discover Trucks',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interRegular.variable}`}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
