import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ARPAI | AI Workforce Systems',
  description: 'ARPAI builds AI workforce systems, governed agent operations, and operator dashboards for dealerships and businesses.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
