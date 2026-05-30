const products = [
  {
    name: 'Workforce AI',
    note: 'AI workers for sales, service, marketing, admin, and operations.'
  },
  {
    name: 'Dealer AI',
    note: 'Lead, inventory, BDC, service-to-sales, and operator intelligence for dealerships.'
  },
  {
    name: 'ARPAI OS',
    note: 'The governed operating layer for AI agents, workflows, telemetry, and tasks.'
  },
  {
    name: 'AI Agents',
    note: 'Deployable BDC, inventory, marketing, sales, service, and operations agents.'
  }
];

const departments = [
  'Nova / Operations',
  'Onyx / Engineering',
  'Violet / Design',
  'Atlas / Sales',
  'Pulse / Marketing',
  'Alex / Analytics',
  'Draco / Data',
  'Sentinel / Security',
  'Jura / Legal',
  'Memora / Knowledge'
];

const proof = [
  'Supabase runtime',
  'n8n orchestration',
  'GitHub + Vercel deployment',
  'Lead lifecycle engine',
  'Inventory runtime',
  'Audit logging',
  'Operator dashboard foundation'
];

export default function Page() {
  return (
    <main>
      <section className="hero company-hero">
        <div className="container hero-layout">
          <div>
            <div className="eyebrow">ARPAI · AI Workforce Systems</div>
            <h1>Build AI departments, not just AI tools.</h1>
            <p className="hero-copy">
              ARPAI builds governed AI workforce systems that help businesses capture leads, run follow-up, understand inventory, monitor operations, and deploy AI agents with control.
            </p>
            <div className="actions">
              <a className="btn primary" href="#demo">Book a Demo</a>
              <a className="btn secondary" href="#products">View Products</a>
            </div>
          </div>
          <div className="command-card">
            <span>Runtime Status</span>
            <strong>ARPAI OS v1</strong>
            <p>Queue governance, audit telemetry, lead runtime, and inventory intelligence are converging into one operator surface.</p>
          </div>
        </div>
      </section>

      <section className="container section" id="products">
        <div className="section-head">
          <span className="eyebrow">Products</span>
          <h2>Sell AI workforces. Deploy AI operations.</h2>
          <p>ARPAI starts with dealerships and expands into every business that needs faster execution, cleaner follow-up, and operational visibility.</p>
        </div>
        <div className="card-grid">
          {products.map((product) => (
            <article className="card" key={product.name}>
              <h3>{product.name}</h3>
              <p>{product.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section split">
        <div className="panel dark-panel">
          <span className="eyebrow">Customer #1</span>
          <h2>O'Neil Nissan is the proving ground.</h2>
          <p>
            The dealership deployment becomes ARPAI's first case study: lead runtime, inventory runtime, follow-up workflows, operator dashboards, and campaign intelligence.
          </p>
        </div>
        <div className="panel">
          <span className="eyebrow">Proof Already Built</span>
          <ul className="check-list">
            {proof.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <span className="eyebrow">Operating Model</span>
          <h2>Fortune-100 structure, AI-native speed.</h2>
          <p>ARPAI runs through specialized AI departments that turn strategy into execution across product, engineering, design, sales, marketing, analytics, security, legal, and knowledge.</p>
        </div>
        <div className="department-grid">
          {departments.map((department) => <div className="department" key={department}>{department}</div>)}
        </div>
      </section>

      <section className="container section pricing" id="demo">
        <div>
          <span className="eyebrow">Commercial Motion</span>
          <h2>Packages built to sell.</h2>
          <p>Starter for visibility, Growth for active agents, Enterprise for full ARPAI OS deployment.</p>
        </div>
        <div className="pricing-grid">
          <div className="price-card"><strong>Starter</strong><span>Operator visibility + lead capture</span></div>
          <div className="price-card featured"><strong>Growth</strong><span>AI agents + lifecycle workflows</span></div>
          <div className="price-card"><strong>Enterprise</strong><span>Full ARPAI OS + custom deployment</span></div>
        </div>
        <a className="btn primary wide" href="mailto:cashin@arpai.co?subject=ARPAI Demo Request">Book Founder Demo</a>
      </section>
    </main>
  );
}
