import { headers } from 'next/headers';
import { resolveSite, type SiteConfig } from '../lib/site-config';

const arpaiProducts = [
  ['Controlled release', 'DealerAI', 'The staff workspace for reviewed operator actions and agent activity. Individual access awaits approved administrator setup and recovery verification.'],
  ['Public shopping', 'oneilnissan.ai', 'Browse observed dealership inventory and explore buying assumptions. A listing or estimate is not confirmed availability, a final quote or finance approval.'],
  ['Shared foundation', 'ARPAI ONE', 'Tenant identity, audited operator decisions and internal AI job controls in the existing platform. CRM delivery remains staged pending vendor approval.'],
  ['Planned expansion', 'Trade, research and ownership', 'Shared campaigns and department workflows are planned. Creative production, appraisal automation and ownership services are not generally available.']
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
            <a href="#proof">Status</a>
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
          <span>Shared operating model</span>
          <strong>One platform. Clear responsibility. Evidence before expansion.</strong>
          <p>ARPAI ONE is the parent platform, DealerAI is the staff workspace, and oneilnissan.ai is the customer shopping experience.</p>
        </aside>
      </div>
    </section>
  );
}

function Arpai() {
  return (
    <>
      <section id="system" className="container section">
        <div className="section-head"><p className="eyebrow">ARPAI ONE</p><h2>One program, released in stages.</h2><p>Current scope is stated below. Planned capabilities are not presented as completed services.</p></div>
        <div className="factory-grid four">{arpaiProducts.map(([k,t,d]) => <article className="factory-card" key={t}><span>{k}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>
      <section className="dark-band"><div className="container band-grid"><div><p className="eyebrow">How it works</p><h2>Keep the dealership in control.</h2></div><div><p>CRM, DMS and approved dealer systems remain authoritative. ARPAI coordinates context and reviewed work around them. Customer messages, price changes, financing commitments and publishing require the appropriate human authority.</p><p><strong>Design principle:</strong> no new system unless it creates material value.</p></div></div></section>
      <section id="proof" className="container section"><div className="section-head"><p className="eyebrow">Release status · September 30, 2026</p><h2>What is available now.</h2><p>Implementation evidence and operational acceptance are different milestones.</p></div><div className="factory-grid three"><article className="factory-card"><span>Public</span><h3>O’Neil Nissan shopping</h3><p>Observed inventory, vehicle pages and decision guidance are live at <a href="https://oneilnissan.ai">oneilnissan.ai</a>. The dealership’s primary website remains <a href="https://oneilnissan.com">oneilnissan.com</a>.</p></article><article className="factory-card"><span>Controlled activation</span><h3>Staff and AI operations</h3><p>Individual login, MFA, audit and agent controls are implemented. Staff activation, the complete hosted shopper handoff and verified CRM delivery remain acceptance steps.</p></article><article className="factory-card"><span>Human authority</span><h3>Trust requires evidence</h3><p>Internal AI work produces proposals for review. No general authority to send messages, change prices or publish follows from an agent name or an account login. No revenue or performance guarantee is claimed.</p></article></div></section>
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
  return <Shell site={site}><Hero site={site}/>{site.key !== 'arpai' && <section className="container preview-notice" role="status"><strong>Campaign preview — not an active service.</strong><p>These are proposed content structures. Reviews, valuations, offers and community participation are not available here. No customer data is collected by this preview.</p></section>}{site.key === 'arpai' ? <Arpai/> : site.key === 'nissanreviews' ? <NissanReviews/> : site.key === 'nissantrades' ? <NissanTrades/> : <NissanDeals/>}<section id="next" className="container section final-cta"><p className="eyebrow">Next action</p><h2>{site.primaryCta}</h2><p>Discuss a focused dealership workflow and the evidence needed to operate it. This link opens your email app; it does not book an appointment or confirm service availability.</p><a className="btn primary" href="mailto:hello@arpai.co">Email ARPAI</a></section></Shell>;
}

