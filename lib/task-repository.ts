import { supabaseInsert, supabasePatch, supabaseSelect } from './supabase-rest';
import type { LogRecord, TaskRecord, TaskStatus } from './types';

export async function createTask(command: string) {
  const now = new Date().toISOString();
  const fallback: TaskRecord = {
    id: crypto.randomUUID(),
    command,
    status: 'pending',
    created_at: now,
    updated_at: now
  };

  return (await supabaseInsert<TaskRecord>('tasks', {
    id: fallback.id,
    command,
    status: 'pending',
    created_at: now,
    updated_at: now
  })) ?? fallback;
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  await supabasePatch('tasks', `id=eq.${taskId}`, {
    status,
    updated_at: new Date().toISOString()
  });
}

export async function addLog(log: LogRecord) {
  const timestamp = new Date().toISOString();
  await supabaseInsert<LogRecord>('logs', {
    ...log,
    timestamp
  });
}

export async function listTasks(limit = 30) {
  return supabaseSelect<TaskRecord>('tasks', `select=*&order=created_at.desc&limit=${limit}`);
}

export async function getTaskWithLogs(taskId: string) {
  const [task] = await supabaseSelect<TaskRecord>('tasks', `select=*&id=eq.${taskId}&limit=1`);
  const logs = await supabaseSelect<LogRecord>('logs', `select=*&task_id=eq.${taskId}&order=timestamp.asc`);
  return { task, logs };
}
