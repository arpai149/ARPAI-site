export type SiteKey = 'arpai' | 'nissanreviews' | 'nissantrades' | 'nissandeals';

export type SiteConfig = {
  key: SiteKey;
  hostnames: string[];
  brand: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  accent: 'mint' | 'red' | 'blue';
};

export const sites: Record<SiteKey, SiteConfig> = {
  arpai: {
    key: 'arpai',
    hostnames: ['arpai.co', 'www.arpai.co'],
    brand: 'ARPAI ONE',
    eyebrow: 'Governed AI operating systems',
    title: 'AI that actually runs the work.',
    description: 'ARPAI connects the systems your business already uses, coordinates AI and human teams, and turns fragmented workflows into one accountable operating system.',
    primaryCta: 'Request a working session',
    secondaryCta: 'See the operating model',
    accent: 'mint'
  },
  nissanreviews: {
    key: 'nissanreviews',
    hostnames: ['nissanreviews.com', 'www.nissanreviews.com'],
    brand: 'NissanReviews',
    eyebrow: 'Independent Nissan intelligence',
    title: 'Know the Nissan before you own it.',
    description: 'Expert reviews, owner experience, model comparisons and practical buying guidance organized around the questions drivers actually ask.',
    primaryCta: 'Explore Nissan models',
    secondaryCta: 'See owner reviews',
    accent: 'red'
  },
  nissantrades: {
    key: 'nissantrades',
    hostnames: ['nissantrades.com', 'www.nissantrades.com'],
    brand: 'NissanTrades',
    eyebrow: 'Trade-in intelligence',
    title: 'Know what your Nissan is worth before you trade it.',
    description: 'A focused valuation experience built around condition, payoff context, market evidence and clear next-step options.',
    primaryCta: 'Start valuation',
    secondaryCta: 'How valuation works',
    accent: 'blue'
  },
  nissandeals: {
    key: 'nissandeals',
    hostnames: ['nissandeals.org', 'www.nissandeals.org'],
    brand: 'NissanDeals',
    eyebrow: 'Offers with context',
    title: 'Find the Nissan deal that actually fits the way you buy.',
    description: 'Compare finance, lease and cash-offer structures without hiding the assumptions, eligibility or tradeoffs behind the headline.',
    primaryCta: 'See current offers',
    secondaryCta: 'Compare offer types',
    accent: 'red'
  }
};

export function resolveSite(hostname?: string | null, override?: string | null): SiteConfig {
  if (override && override in sites) return sites[override as SiteKey];
  const host = (hostname || '').split(':')[0].toLowerCase();
  return Object.values(sites).find((site) => site.hostnames.includes(host)) || sites.arpai;
}
