import LeadForm from '../components/LeadForm';

const inventory = [
  { model: 'Nissan Sentra SV', badge: 'Fuel Saver', note: 'Great commuter value' },
  { model: 'Nissan Rogue SL', badge: 'Family Favorite', note: 'Top-requested SUV' },
  { model: 'Nissan Altima SR', badge: 'Sport Trim', note: 'Strong incentives available' },
  { model: 'Nissan Frontier PRO-4X', badge: 'Truck Pick', note: 'Off-road ready inventory' }
];

export default function Page() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Find the right Nissan in minutes — real availability, real pricing guidance.</h1>
        <p>Tell us what you want and ARPAI instantly routes your request to the right team for a fast, transparent answer.</p>

        <div className="trust" aria-label="Trust signals">
          <div className="trust-card"><strong>4.8★ reviews</strong><br />Trusted by local buyers.</div>
          <div className="trust-card"><strong>Transparent process</strong><br />No hidden fees surprises.</div>
          <div className="trust-card"><strong>Fast response</strong><br />AI + rep routing in seconds.</div>
        </div>

        <div className="inventory-grid" aria-label="Featured inventory">
          {inventory.map((item) => (
            <div key={item.model} className="inventory-card">
              <div style={{ fontSize: '.78rem', color: '#1d4ed8', fontWeight: 700 }}>{item.badge}</div>
              <div style={{ fontWeight: 600, marginTop: '.3rem' }}>{item.model}</div>
              <div style={{ fontSize: '.85rem', color: '#475569', marginTop: '.2rem' }}>{item.note}</div>
            </div>
          ))}
        </div>
      </section>

      <LeadForm />
    </main>
  );
}
