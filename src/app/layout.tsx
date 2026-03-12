import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GuidelineRedirect from '@/components/GuidelineRedirect';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InternHub',
  description: 'The automated internship aggregator for CS students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[var(--background)] antialiased transition-colors duration-300`}>
        <GuidelineRedirect />
        {children}
      </body>
    </html>
  );
}
