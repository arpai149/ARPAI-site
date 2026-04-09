'use client';

import { useState } from 'react';
import { LeadFormPayload, submitLeadFlow } from '../lib/api';

type ResultState = {
  confirmation: string;
  smsPreview: string;
  emailPreview: string;
  assignedRep: string;
} | null;

const initialForm: LeadFormPayload = {
  name: '',
  email: '',
  phone: '',
  vehicle_of_interest: '',
  message: ''
};

export default function LeadForm() {
  const [form, setForm] = useState<LeadFormPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState>(null);

  const updateField = (key: keyof LeadFormPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!form.name || !form.email || !form.phone || !form.vehicle_of_interest) {
      setError('Please complete all required fields.');
      return;
    }

    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_ARPAI_BACKEND_URL;
      const apiKey = process.env.NEXT_PUBLIC_ARPAI_API_KEY;

      if (!backendUrl) {
        throw new Error('Backend URL is not configured.');
      }

      const data = await submitLeadFlow(form, { backendUrl, apiKey });

      setResult({
        confirmation: `Thanks ${form.name}, availability is being checked now.`,
        smsPreview: data.respond.sms_message,
        emailPreview: data.respond.email_message,
        assignedRep: data.route.assigned_rep
      });

      setForm(initialForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-wrap" id="lead-form">
      <h2 style={{ marginTop: 0 }}>Get Instant Availability</h2>
      <p style={{ marginBottom: '1rem' }}>One quick form. No hidden fees. No pressure.</p>

      <form onSubmit={handleSubmit} className="grid">
        <div className="grid two">
          <div>
            <label htmlFor="name">Name *</label>
            <input id="name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
          </div>
          <div>
            <label htmlFor="email">Email *</label>
            <input id="email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} required />
          </div>
        </div>

        <div className="grid two">
          <div>
            <label htmlFor="phone">Phone *</label>
            <input id="phone" type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required />
          </div>
          <div>
            <label htmlFor="vehicle">Vehicle of Interest *</label>
            <input id="vehicle" value={form.vehicle_of_interest} onChange={(e) => updateField('vehicle_of_interest', e.target.value)} placeholder="Nissan Rogue SV" required />
          </div>
        </div>

        <div>
          <label htmlFor="message">Optional Message</label>
          <textarea id="message" value={form.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Trade-in, payment target, timing, etc." />
        </div>

        <button type="submit" disabled={loading}>{loading ? 'Checking Availability...' : 'Check Availability'}</button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <>
          <div className="success">{result.confirmation} Assigned rep: {result.assignedRep}.</div>
          <div className="preview">
            <strong>Instant SMS preview:</strong>
            <div>{result.smsPreview}</div>
          </div>
          <div className="preview">
            <strong>Email preview:</strong>
            <div>{result.emailPreview}</div>
          </div>
        </>
      )}
    </section>
  );
}
