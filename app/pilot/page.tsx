const outcomes = [
  'Speed-to-lead visibility',
  'Follow-up accountability',
  'Appointment execution',
  'Inventory intelligence',
  'GSM operating dashboard',
  'AI workforce routing'
];

const operatingBlocks = [
  {
    title: 'Lead Runtime',
    body: 'See new, aging, untouched, hot, and manager-needed opportunities before they leak.'
  },
  {
    title: 'GSM Command View',
    body: 'A daily operating layer for appointments, sales activity, rep accountability, and priority actions.'
  },
  {
    title: 'Inventory Intelligence',
    body: 'Surface aging units, media gaps, merchandising issues, and vehicles that need a push.'
  },
  {
    title: 'Governed AI Workforce',
    body: 'Deploy AI assistance with logging, oversight, human control, and operational context.'
  }
];

export default function PilotPage() {
  return (
    <main>
      <section className="hero company-hero">
        <div className="container hero-layout">
          <div>
            <div className="eyebrow">ARPAI · Dealership Pilot Program</div>
            <h1>Run the dealership with an AI-native GSM operating layer.</h1>
            <p className="hero-copy">
              ARPAI helps dealerships capture leads, monitor execution, understand inventory, and deploy governed AI workers through one operator surface.
            </p>
            <div className="actions">
              <a className="btn primary" href="mailto:cashin@arpai.co?subject=ARPAI Dealership Pilot Request">Apply For Dealership Pilot</a>
              <a className="btn secondary" href="#runtime">View Runtime</a>
            </div>
          </div>
          <div className="command-card" id="runtime">
            <span>Live Acquisition Loop</span>
            <strong>Founding Pilot</strong>
            <p>Lead visibility, customer-zero proof, inventory intelligence, and dealership operating execution are converging into one ARPAI pilot surface.</p>
          </div>
        </div>
      </section>

      <section className="container section split">
        <div className="panel dark-panel">
          <span className="eyebrow">Customer Zero</span>
          <h2>Built from live dealership pressure.</h2>
          <p>
            O'Neil Nissan is the operating proof ground for ARPAI: lead runtime, follow-up accountability, inventory visibility, and GSM command execution.
          </p>
        </div>
        <div className="panel">
          <span className="eyebrow">Pilot Scope</span>
          <ul className="check-list">
            {outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
          </ul>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <span className="eyebrow">What The Pilot Improves</span>
          <h2>Cleaner execution. Faster follow-up. Better visibility.</h2>
          <p>The pilot is designed around measurable dealership operating outcomes, not AI novelty.</p>
        </div>
        <div className="card-grid">
          {operatingBlocks.map((block) => (
            <article className="card" key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section pricing" id="apply">
        <div>
          <span className="eyebrow">Founding Pilot</span>
          <h2>Apply to run ARPAI inside a dealership environment.</h2>
          <p>Start with the GSM operating layer: leads, appointments, sales accountability, inventory visibility, and daily management focus.</p>
        </div>
        <a className="btn primary wide" href="mailto:cashin@arpai.co?subject=ARPAI Dealership Pilot Request">Apply For Dealership Pilot</a>
      </section>
    </main>
  );
}
