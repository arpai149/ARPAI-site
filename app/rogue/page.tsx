'use client';

import { FormEvent, useMemo } from 'react';

type RogueModel = {
  model: string;
  price: number;
  badge: string;
};

const rogueInventory: RogueModel[] = [
  { model: 'Rogue SV', price: 33250, badge: 'Popular Value' },
  { model: 'Rogue Dark Armor', price: 35564, badge: 'Limited Appearance' },
  { model: 'Rogue Platinum', price: 45010, badge: 'Top Luxury Trim' }
];

const trustItems = [
  'Family Owned & Operated',
  'Transparent Pricing',
  'No Hidden Fees'
];

export default function RoguePage() {
  const currency = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }),
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      preferredAppointmentTime: formData.get('preferredAppointmentTime')
    };

    // Placeholder for API integration
    console.log('Rogue lead submission:', payload);
    event.currentTarget.reset();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-6 py-10 text-white shadow-xl sm:px-10 lg:py-12">
          <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            2026 Rogue Spring Event
          </p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            0% APR + $3,500 Savings on New 2026 Nissan Rogue
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            Browse available inventory and secure your vehicle today.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#inventory"
              className="rounded-lg bg-red-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-400"
            >
              Check Availability
            </a>
            <a
              href="#lead-form"
              className="rounded-lg border border-white/70 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Schedule Test Drive
            </a>
          </div>
        </div>

        <section id="inventory" className="mt-10" aria-labelledby="inventory-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="inventory-heading" className="text-2xl font-bold sm:text-3xl">
              Available 2026 Rogue Inventory
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">Inventory updates in real-time at the dealership.</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rogueInventory.map((vehicle) => (
              <article key={vehicle.model} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {vehicle.badge}
                </p>
                <p className="mt-3 text-sm font-medium text-slate-500">{vehicle.model}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{currency.format(vehicle.price)}</p>
                <button
                  type="button"
                  className="mt-5 w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div id="lead-form" className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold sm:text-3xl">Reserve Your Rogue</h2>
            <p className="mt-2 text-sm text-slate-600">
              Complete the form below and a product specialist will confirm your appointment.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Name
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-red-500 transition focus:ring-2"
                  placeholder="Jane Smith"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Phone
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-red-500 transition focus:ring-2"
                  placeholder="(555) 555-1234"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-red-500 transition focus:ring-2"
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium text-slate-700">
                Preferred Appointment Time
                <input
                  name="preferredAppointmentTime"
                  type="datetime-local"
                  required
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-red-500 transition focus:ring-2"
                />
              </label>

              <button
                type="submit"
                className="mt-2 rounded-lg bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Reserve My Rogue
              </button>
            </form>
          </div>

          <aside className="rounded-xl bg-slate-900 p-6 text-white shadow-sm">
            <h3 className="text-lg font-semibold">Why Buy from O&apos;Neil Nissan?</h3>
            <ul className="mt-4 grid gap-3 text-sm text-slate-200">
              {trustItems.map((item) => (
                <li key={item} className="rounded-md border border-white/20 bg-white/5 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </section>

      <button
        type="button"
        className="fixed bottom-5 right-4 z-10 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700"
        aria-label="Open Rogue assistant chat"
      >
        Need help finding the right Rogue?
      </button>
    </main>
  );
}
