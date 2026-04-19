import { config } from './config';

export async function triggerGithubDispatch(eventType: string, payload: Record<string, unknown>) {
  if (!config.githubRepo || !config.githubToken) {
    return { skipped: true, reason: 'GitHub repo/token not configured' };
  }

  const response = await fetch(`https://api.github.com/repos/${config.githubRepo}/dispatches`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.githubToken}`,
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body: JSON.stringify({ event_type: eventType, client_payload: payload })
  });

  if (!response.ok) {
    throw new Error(`GitHub dispatch failed (${response.status})`);
  }

  return { skipped: false };
}

export async function triggerVercelDeploy() {
  if (!config.vercelDeployHookUrl) {
    return { skipped: true, reason: 'Vercel deploy hook not configured' };
  }

  const response = await fetch(config.vercelDeployHookUrl, { method: 'POST' });

  if (!response.ok) {
    throw new Error(`Vercel deploy hook failed (${response.status})`);
  }

  return { skipped: false };
}
