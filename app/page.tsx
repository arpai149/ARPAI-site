import { headers } from 'next/headers';
import { resolveSite, type SiteConfig } from '../lib/site-config';

const arpaiProducts = [
  ['Operate', 'DealerOS', 'Run leads, customers, tasks, recovery, communications, handoffs and management workflows from one operating layer.'],
  ['Decide', 'Decision Studio', 'Help customers understand products, pricing, trade, finance and next steps through a transparent decision journey.'],
  ['Create', 'Creative Studio', 'Turn live business truth into campaign-ready content, media and customer communications.'],
  ['Retain', 'ARPAI Passport', 'Carry the customer relationship into ownership, service, retention and the next purchase.']
];

const nissanModels = ['Rogue', 'Pathfinder', 'Murano', 'Kicks', 'Frontier', 'Armada', 'Sentra', 'LEAF'];

function Shell({ site, children }: { site: SiteConfig; children: React.ReactNode }) {
  return (
    <main className={`site site-${site.key} accent-${site.accent}`}>
      <nav className="topnav">
        <div className="container nav-inner">
          <a className="wordmark" href="#top">{site.brand}</a>
          <div className="nav-links">
            <a href="#system">Explore</a>
            <a href="#proof">Proof</a>
            <a className="nav-cta" href="#next">{site.primaryCta}</a>
          </div>
        </div>
      </nav>
      {children}
      <footer>
        <div className="container footer-grid">
          <div><strong>{site.brand}</strong><p>{site.eyebrow}</p></div>
          <p>Built on the ARPAI governed web system.</p>
        </div>
      </footer>
    </main>
  );
}

function Hero({ site }: { site: SiteConfig }) {
  return (
    <section id="top" className="factory-hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">{site.eyebrow}</p>
          <h1>{site.title}</h1>
          <p className="hero-copy">{site.description}</p>
          <div className="actions">
            <a className="btn primary" href="#next">{site.primaryCta}</a>
            {site.secondaryCta && <a className="btn secondary" href="#system">{site.secondaryCta}</a>}
          </div>
        </div>
        <aside className="hero-proof">
          <span>ARPAI Site Factory</span>
          <strong>One design system. One governance layer. Multiple controlled properties.</strong>
          <p>Each domain keeps a clear audience and job while sharing the same production discipline underneath.</p>
        </aside>
      </div>
    </section>
  );
}

function Arpai() {
  return (
    <>
      <section id="system" className="container section">
        <div className="section-head"><p className="eyebrow">ARPAI ONE</p><h2>Four surfaces. One operating system.</h2><p>Different interfaces into the same governed business context.</p></div>
        <div className="factory-grid four">{arpaiProducts.map(([k,t,d]) => <article className="factory-card" key={t}><span>{k}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>
      <section className="dark-band"><div className="container band-grid"><div><p className="eyebrow">How it works</p><h2>The advantage is not another chatbot.</h2></div><div><p>ARPAI sits between systems of record, people doing the work and AI assisting them. It resolves context, identifies the next action, executes permitted work and routes material decisions to accountable humans.</p><p><strong>Design principle:</strong> no new system unless it creates material value.</p></div></div></section>
      <section id="proof" className="container section"><div className="section-head"><p className="eyebrow">Tenant model</p><h2>Built once. Operated by tenant.</h2></div><div className="factory-grid three"><article className="factory-card"><span>Parent</span><h3>ARPAI ONE</h3><p>Shared intelligence, governance and reusable product capabilities.</p></article><article className="factory-card"><span>Tenant 001</span><h3>O’Neil Nissan</h3><p>Real-world automotive proving ground running separately at oneilnissan.ai.</p></article><article className="factory-card"><span>Governance</span><h3>Human authority stays visible.</h3><p>Evidence, ownership, tenant boundaries and approval gates are part of the product.</p></article></div></section>
    </>
  );
}

function NissanReviews() {
  return (
    <>
      <section id="system" className="container section"><div className="section-head"><p className="eyebrow">Model research</p><h2>Start with the Nissan you’re considering.</h2><p>Reviews, trims, owner experience, comparisons and practical buying guidance.</p></div><div className="factory-grid four">{nissanModels.map((m) => <article className="factory-card model-card" key={m}><span>Model hub</span><h3>{m}</h3><p>Expert review · trims · owner reviews · comparisons · FAQs</p></article>)}</div></section>
      <section className="dark-band"><div className="container band-grid"><div><p className="eyebrow">Community</p><h2>What ownership actually feels like.</h2></div><div><p>Structured owner reviews preserve model year, trim, mileage, ownership period and whether the owner would buy again.</p><p>No fabricated ratings. No fake community activity.</p></div></div></section>
      <section id="proof" className="container section"><div className="factory-grid three"><article className="factory-card"><span>Review</span><h3>Expert + owner views</h3><p>Manufacturer facts, editorial judgment and owner experience remain clearly separated.</p></article><article className="factory-card"><span>Compare</span><h3>Decision-first comparisons</h3><p>Who wins where, by buyer type and real use case.</p></article><article className="factory-card"><span>Community</span><h3>Long-term intelligence</h3><p>10,000-mile check-ins, family tests, real MPG/range and “Would You Buy It Again?”</p></article></div></section>
    </>
  );
}

function NissanTrades() {
  return (
    <><section id="system" className="container section"><div className="section-head"><p className="eyebrow">Trade path</p><h2>Value → verify → choose.</h2><p>A high-intent property built to reduce friction without hiding how the decision works.</p></div><div className="factory-grid three"><article className="factory-card"><span>01</span><h3>Value</h3><p>Capture VIN, mileage, condition and market context.</p></article><article className="factory-card"><span>02</span><h3>Verify</h3><p>Resolve payoff, condition and evidence before presenting next steps.</p></article><article className="factory-card"><span>03</span><h3>Act</h3><p>Trade, sell or keep — with a clean handoff when human review is needed.</p></article></div></section><section id="proof" className="dark-band"><div className="container band-grid"><div><p className="eyebrow">Production rule</p><h2>Valuation writes belong in the runtime.</h2></div><div><p>The public property handles education and intent. Sensitive customer data, valuation state and dealer workflows converge into the authenticated ARPAI/Vercel stack.</p></div></div></section></>
  );
}

function NissanDeals() {
  return (
    <><section id="system" className="container section"><div className="section-head"><p className="eyebrow">Offer intelligence</p><h2>Finance. Lease. Cash. Context.</h2><p>Offers should be understandable before they are persuasive.</p></div><div className="factory-grid three"><article className="factory-card"><span>APR</span><h3>Finance offers</h3><p>Rate, term, model eligibility and tradeoffs shown together.</p></article><article className="factory-card"><span>Lease</span><h3>Lease offers</h3><p>Payment, due at signing, mileage and assumptions visible.</p></article><article className="factory-card"><span>Cash</span><h3>Rebate offers</h3><p>Eligibility and combinability disclosed instead of buried.</p></article></div></section><section id="proof" className="dark-band"><div className="container band-grid"><div><p className="eyebrow">Trust layer</p><h2>No mystery math.</h2></div><div><p>Campaign pages can move quickly in the Site Factory, while live incentive data and materially binding calculations graduate into governed runtime services.</p></div></div></section></>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ site?: string }> }) {
  const h = await headers();
  const params = await searchParams;
  const site = resolveSite(h.get('host'), params.site);
  return <Shell site={site}><Hero site={site}/>{site.key === 'arpai' ? <Arpai/> : site.key === 'nissanreviews' ? <NissanReviews/> : site.key === 'nissantrades' ? <NissanTrades/> : <NissanDeals/>}<section id="next" className="container section final-cta"><p className="eyebrow">Next action</p><h2>{site.primaryCta}</h2><p>Start with one clear intent, preserve the evidence, and route deeper workflow complexity into the canonical ARPAI runtime only when needed.</p><a className="btn primary" href="mailto:hello@arpai.co">{site.primaryCta}</a></section></Shell>;
}
