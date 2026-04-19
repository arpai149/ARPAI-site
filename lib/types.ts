export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface TaskRecord {
  id: string;
  command: string;
  status: TaskStatus;
  created_at: string;
  updated_at?: string;
}

export interface LogRecord {
  id?: string;
  task_id: string;
  agent: string;
  output: string;
  status: TaskStatus;
  timestamp?: string;
}

export interface PlanStep {
  agent: keyof typeof import('./agents').agentRegistry;
  action: string;
}

export interface CommandPlan {
  steps: PlanStep[];
}

export interface AgentResult {
  ok: boolean;
  output: string;
}
