const cards = [
  { label: 'Customer', value: 'Customer #1', note: 'First live deployment.' },
  { label: 'Inventory', value: '17 rows', note: 'Governed public inventory view.' },
  { label: 'Leads', value: 'Active', note: 'Lead intake path exists.' },
  { label: 'Workflows', value: 'Connected', note: 'Automation lane under verification.' }
];

const milestones = [
  '[x] Company Site Exists',
  '[x] Product Repo Identified',
  '[x] Customer #1 Runtime Exists',
  '[x] Supabase Runtime Connected',
  '[x] n8n Runtime Connected',
  '[ ] Customer #1 Freeze',
  '[ ] ARPAI Dashboard',
  '[ ] Runtime Connected visibly in OS',
  '[ ] First External Demo',
  '[ ] First Paying Customer Beyond Customer #1'
];

export default function Page() {
  return (
    <main>
      <section className="hero company-hero">
        <div className="container hero-layout">
          <div>
            <div className="eyebrow">ARPAI OS</div>
            <h1>Operator command center.</h1>
            <p className="hero-copy">A single dashboard for customers, leads, inventory, workflows, agents, and runtime health.</p>
          </div>
          <div className="command-card">
            <span>Status</span>
            <strong>Dashboard v1</strong>
            <p>Nova owns customer freeze. Alex owns dashboard visibility. John approves demo readiness.</p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <span className="eyebrow">Customer #1</span>
          <h2>Command cards.</h2>
          <p>First visible ARPAI OS surface.</p>
        </div>
        <div className="card-grid">
          {cards.map((card) => (
            <article className="card" key={card.label}>
              <span className="eyebrow compact">{card.label}</span>
              <h3>{card.value}</h3>
              <p>{card.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <span className="eyebrow">Milestones</span>
          <h2>Execution board.</h2>
        </div>
        <div className="card-grid">
          {milestones.map((milestone) => (
            <article className="card" key={milestone}>
              <h3>{milestone}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
