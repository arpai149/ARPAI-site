import { NextResponse } from 'next/server';
import { listTasks } from '@/lib/task-repository';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tasks = await listTasks(40);

  if (searchParams.get('summary') === '1') {
    const summary = {
      totalTasks: tasks.length,
      running: tasks.filter((t) => t.status === 'running').length,
      failed: tasks.filter((t) => t.status === 'failed').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      agents: ['Nova', 'Jura', 'Onyx', 'Alex', 'Sentinel', 'Logger']
    };

    return NextResponse.json({ summary });
  }

  return NextResponse.json({ tasks });
}
