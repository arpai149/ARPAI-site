const cards = [
  {
    label: 'Parent Platform',
    value: 'ARPAI ONE',
    note: 'ARPAI-owned control plane, governance, agents, capabilities, and shared platform services.'
  },
  {
    label: 'Tenant 001',
    value: "O'Neil Nissan",
    note: 'Reference implementation. Tenant identity is canonical and tenant-owned runtime data is being explicitly scoped.'
  },
  {
    label: 'Agent Runtime',
    value: 'Shadow Mode',
    note: 'Nova, Onyx, Draco, and Sentinel are connected to OpenAI; tenant-scoped canonical proof remains the production gate.'
  },
  {
    label: 'Governance',
    value: 'Biblical Stewardship',
    note: 'Truth above optimization, people above extraction, stewardship above waste, service above domination, integrity above revenue.'
  }
];

const principles = [
  'God remains above the system.',
  'Truth above optimization.',
  'People above extraction.',
  'Stewardship above waste.',
  'Justice above partiality.',
  'Service above domination.',
  'Integrity above revenue.'
];

const gates = [
  '[x] arpai.co identified as the parent surface',
  '[x] Tenant 001 formalized in canonical state',
  '[x] Biblical Stewardship Covenant made platform-level doctrine',
  '[x] Nova established as an ARPAI Core agent',
  '[x] Legacy lead, appointment, and inventory records given a tenant boundary',
  '[ ] Tenant-scoped Nova canonical proof passes',
  '[ ] Control-plane convergence merged to production',
  '[ ] oneilnissan.ai attached and verified as Tenant 001 surface',
  '[ ] First complete capability production-proven end to end',
  '[ ] External tenant onboarding proven'
];

export default function Page() {
  return (
    <main>
      <section className="hero company-hero">
        <div className="container hero-layout">
          <div>
            <div className="eyebrow">ARPAI ONE</div>
            <h1>The parent operating system for AI-powered businesses.</h1>
            <p className="hero-copy">
              One governed platform for agents, tenant identity, canonical state, workflows, approvals, evidence,
              observability, and business outcomes. Tenant experiences run on ARPAI ONE; they do not duplicate it.
            </p>
          </div>
          <div className="command-card">
            <span>Convergence Status</span>
            <strong>Tenant architecture active</strong>
            <p>
              ARPAI owns the platform. O&apos;Neil Nissan is Tenant 001. Production capability is declared only after
              tenant-scoped evidence and runtime verification agree.
            </p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <span className="eyebrow">Platform Model</span>
          <h2>ARPAI Core first. Tenant configuration second.</h2>
          <p>Reusable intelligence belongs to ARPAI Core; tenant data, identity, credentials, and business configuration remain isolated.</p>
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
          <span className="eyebrow">Stewardship</span>
          <h2>Built under accountable human authority.</h2>
          <p>
            Technology serves people. ARPAI does not knowingly fabricate evidence, conceal material information,
            exploit vulnerability, or place autonomous systems beyond accountable human authority.
          </p>
        </div>
        <div className="card-grid">
          {principles.map((principle) => (
            <article className="card" key={principle}>
              <h3>{principle}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <span className="eyebrow">Production Gates</span>
          <h2>Proof before proclamation.</h2>
          <p>No capability is complete because a page exists. It must survive canonical-state, runtime, tenant-isolation, approval, observability, and business-outcome verification.</p>
        </div>
        <div className="card-grid">
          {gates.map((gate) => (
            <article className="card" key={gate}>
              <h3>{gate}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
