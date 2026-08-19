import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/commander-login.html',
          '/dashboard.html',
          '/dealerai.html',
          '/gate.html',
          '/vault.html',
          '/arpai-core/',
          '/github/',
        ],
      },
    ],
    sitemap: 'https://arpai.co/sitemap.xml',
    host: 'https://arpai.co',
  };
}
