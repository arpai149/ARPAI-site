import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ARPAI | Check Availability Fast',
  description: 'Real-time dealership lead capture and inventory availability requests.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
