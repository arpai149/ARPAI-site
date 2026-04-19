import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'ARPAI OS',
  description: 'Unified command, agent orchestration, memory, automation, and deployment system.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="layout">{children}</main>
      </body>
    </html>
  );
}
