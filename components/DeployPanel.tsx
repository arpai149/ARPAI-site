'use client';

import { useState } from 'react';

export default function DeployPanel() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function deploy() {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/deploy', { method: 'POST' });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message ?? 'Deploy failed');
      setMessage('Deployment hooks executed successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Deploy failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <h1>Deploy Control</h1>
      <p>Manual trigger for GitHub repository dispatch and Vercel deploy hook.</p>
      <button onClick={deploy} disabled={loading}>{loading ? 'Deploying...' : 'Deploy latest app'}</button>
      {message ? <p>{message}</p> : null}
    </section>
  );
}
