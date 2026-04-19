import { NextResponse } from 'next/server';
import { triggerGithubDispatch, triggerVercelDeploy } from '@/lib/deploy';

export async function POST() {
  try {
    const github = await triggerGithubDispatch('arpai_deploy', { source: 'manual' });
    const vercel = await triggerVercelDeploy();

    return NextResponse.json({ ok: true, github, vercel });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Deploy error' },
      { status: 500 }
    );
  }
}
