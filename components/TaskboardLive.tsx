'use client';

import { useEffect, useState } from 'react';

type Task = {
  id: string;
  command: string;
  status: string;
  created_at: string;
};

export default function TaskboardLive() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let active = true;

    async function load() {
      const response = await fetch('/api/task-list');
      const payload = await response.json();
      if (active) {
        setTasks(payload.tasks ?? []);
      }
    }

    load();
    const timer = setInterval(load, 3000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="panel">
      <h1>Taskboard</h1>
      <p>Live status updates from persisted task records.</p>
      <div className="task-list">
        {tasks.map((task) => (
          <article key={task.id} className="task-row">
            <div>
              <strong>{task.command}</strong>
              <div className="muted">{new Date(task.created_at).toLocaleString()}</div>
            </div>
            <span className={`status status-${task.status}`}>{task.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
