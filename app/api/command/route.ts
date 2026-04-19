import { NextResponse } from 'next/server';
import { runCommand } from '@/lib/command-engine';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { command?: string };
    if (!body.command?.trim()) {
      return NextResponse.json({ message: 'command is required' }, { status: 400 });
    }

    const result = await runCommand(body.command.trim());
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Unexpected command error' },
      { status: 500 }
    );
  }
}
