'use client';

import { useEffect, useState } from 'react';

interface DashboardData {
  totalTasks: number;
  running: number;
  failed: number;
  completed: number;
  agents: string[];
}

export default function DashboardStats() {
  const [data, setData] = useState<DashboardData>({ totalTasks: 0, running: 0, failed: 0, completed: 0, agents: [] });

  useEffect(() => {
    let mounted = true;

    async function load() {
      const res = await fetch('/api/task-list?summary=1');
      const payload = await res.json();
      if (mounted) {
        setData(payload.summary);
      }
    }

    load();
    const timer = setInterval(load, 5000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="panel">
      <h1>System Dashboard</h1>
      <div className="stat-grid">
        <div><strong>{data.totalTasks}</strong><span>Total Tasks</span></div>
        <div><strong>{data.running}</strong><span>Running</span></div>
        <div><strong>{data.completed}</strong><span>Completed</span></div>
        <div><strong>{data.failed}</strong><span>Failed</span></div>
      </div>
      <p><strong>Agent chain:</strong> {data.agents.join(' → ')}</p>
    </section>
  );
}
