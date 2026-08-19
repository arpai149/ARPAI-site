const platformAreas = [
  {
    label: 'Customer Operations',
    title: 'AI-assisted customer workflows',
    text: 'Route shopper, service, finance, and follow-up requests into clear next actions with human review where it matters.'
  },
  {
    label: 'Business Systems',
    title: 'Connected operating data',
    text: 'Bring inventory, leads, appointments, tasks, and evidence into one governed layer that teams can trust.'
  },
  {
    label: 'Governance',
    title: 'Accountable automation',
    text: 'Use approval paths, audit trails, permissions, and source-backed responses so automation stays useful and supervised.'
  }
];

const operatingPrinciples = [
  'Truthful answers over inflated claims',
  'Human authority over autonomous decisions',
  'Customer clarity over pressure',
  'Measurable outcomes over demos',
  'Secure tenant data boundaries'
];

const productLines = [
  'Dealer AI websites and guided shopping',
  'Inventory and offer decision support',
  'Lead, appointment, and follow-up orchestration',
  'Manager review, approvals, and evidence trails',
  'Executive visibility into AI-assisted operations'
];

export default function Page() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <div className="signal-panel">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="container hero-layout">
          <div className="hero-copy-wrap">
            <p className="eyebrow">ARPAI ONE</p>
            <h1>AI workforce systems for businesses that need trust at scale.</h1>
            <p className="hero-copy">
              ARPAI builds governed AI operations for teams that depend on accurate data, accountable workflows, and
              human oversight. Our platform helps companies turn customer intent, operational records, and team action
              into one connected system.
            </p>
            <div className="actions" aria-label="Primary actions">
              <a className="btn primary" href="mailto:hello@arpai.co">Talk to ARPAI</a>
              <a className="btn secondary" href="https://oneilnissan.ai">View dealership experience</a>
            </div>
          </div>
          <aside className="proof-panel" aria-label="ARPAI platform focus">
            <span>Platform focus</span>
            <strong>Governed AI operations</strong>
            <p>
              Built for real businesses where data quality, approvals, customer experience, and operational follow-through
              have to work together.
            </p>
          </aside>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <p className="eyebrow">What We Build</p>
          <h2>One operating layer for AI-assisted work.</h2>
          <p>
            ARPAI ONE connects the public customer experience with the internal work required to answer accurately,
            follow up responsibly, and keep teams aligned.
          </p>
        </div>
        <div className="card-grid">
          {platformAreas.map((area) => (
            <article className="card" key={area.label}>
              <span className="eyebrow compact">{area.label}</span>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="container split">
          <div>
            <p className="eyebrow">Automotive First</p>
            <h2>Built in the dealership environment, useful beyond it.</h2>
          </div>
          <div className="copy-block">
            <p>
              Automotive retail is a demanding testbed: live inventory, financing paths, appointment timing, trade-ins,
              compliance-sensitive conversations, and fast human handoffs. ARPAI uses that environment to build systems
              that can support any business with complex customer operations.
            </p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="two-column">
          <div className="panel">
            <p className="eyebrow">Platform Capabilities</p>
            <h2>From customer intent to team action.</h2>
            <ul className="check-list">
              {productLines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel muted-panel">
            <p className="eyebrow">Operating Principles</p>
            <h2>Automation that stays accountable.</h2>
            <ul className="check-list">
              {operatingPrinciples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container section final-cta">
        <p className="eyebrow">ARPAI ONE</p>
        <h2>Deploy AI where the work actually happens.</h2>
        <p>
          We help businesses move from scattered tools and one-off AI experiments into a governed operating system for
          customer and team workflows.
        </p>
        <a className="btn primary" href="mailto:hello@arpai.co">Start a conversation</a>
      </section>
    </main>
  );
}
