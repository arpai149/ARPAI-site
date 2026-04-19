import { NextResponse } from 'next/server';
import { getTaskWithLogs } from '@/lib/task-repository';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Task id is required' }, { status: 400 });
  }

  const data = await getTaskWithLogs(id);
  return NextResponse.json(data);
}
