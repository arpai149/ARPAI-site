import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { resolveSite } from '../lib/site-config';

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const site = resolveSite(h.get('host'));
  const base = site.key === 'arpai' ? 'https://arpai.co' : site.key === 'nissanreviews' ? 'https://nissanreviews.com' : site.key === 'nissantrades' ? 'https://nissantrades.com' : 'https://nissandeals.org';
  return {
    metadataBase: new URL(base),
    title: `${site.brand} | ${site.title}`,
    description: site.description,
    alternates: { canonical: '/' },
    openGraph: {
      title: `${site.brand} | ${site.title}`,
      description: site.description,
      url: base,
      siteName: site.brand,
      type: 'website'
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
