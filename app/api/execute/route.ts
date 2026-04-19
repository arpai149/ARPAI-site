import { NextResponse } from 'next/server';
import { runCommand } from '@/lib/command-engine';

export async function POST(request: Request) {
  const body = (await request.json()) as { command?: string };
  if (!body.command) {
    return NextResponse.json({ message: 'Missing command' }, { status: 400 });
  }

  const result = await runCommand(body.command);
  return NextResponse.json(result);
}
