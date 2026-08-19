import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://arpai.co'),
  title: 'ARPAI | Governed AI Workforce Systems',
  description:
    'ARPAI builds governed AI workforce systems for customer operations, connected business data, and accountable automation.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
