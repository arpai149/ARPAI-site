'use client';

import { FormEvent, useMemo, useState } from 'react';

interface CommandResponse {
  taskId: string;
  status: string;
  outputs: string[];
}

export default function CommandCenter() {
  const [command, setCommand] = useState('hello world');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CommandResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasSpeech = useMemo(() => typeof window !== 'undefined' && 'webkitSpeechRecognition' in window, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });
      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.message ?? 'Failed to run command');
      }

      setResponse(payload);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function startVoice() {
    if (!hasSpeech) {
      setError('Voice recognition is not available in this browser.');
      return;
    }

    const SpeechRecognitionCtor = (window as Window & typeof globalThis & { webkitSpeechRecognition: new () => {
      lang: string;
      onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
      start: () => void;
    } }).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'en-US';
    recognition.onresult = (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => {
      const transcript = event.results[0][0].transcript;
      setCommand(transcript);
    };
    recognition.start();
  }

  return (
    <section className="panel">
      <h1>Command Engine</h1>
      <p>Enter a command to trigger Nova → Jura → Onyx → Alex → Sentinel → Logger.</p>

      <form onSubmit={submit} className="command-form">
        <input value={command} onChange={(e) => setCommand(e.target.value)} placeholder="Deploy latest app" required />
        <button type="submit" disabled={loading}>{loading ? 'Running...' : 'Run Command'}</button>
        <button type="button" onClick={startVoice}>🎙 Voice Command</button>
      </form>

      {error ? <p className="error">{error}</p> : null}

      {response ? (
        <div className="result">
          <p><strong>Task:</strong> {response.taskId}</p>
          <p><strong>Status:</strong> {response.status}</p>
          <ul>
            {response.outputs.map((out) => <li key={out}>{out}</li>)}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
