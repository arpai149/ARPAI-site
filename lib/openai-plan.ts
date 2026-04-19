import { config } from './config';
import type { CommandPlan } from './types';

const systemPrompt = `You are ARPAI OS orchestration planner. Return JSON only with shape {"steps":[{"agent":"Nova|Jura|Onyx|Alex|Sentinel|Logger","action":"..."}]}.`;

export async function generatePlan(command: string): Promise<CommandPlan> {
  if (!config.openAiApiKey) {
    return {
      steps: [
        { agent: 'Nova', action: `Create plan for: ${command}` },
        { agent: 'Jura', action: 'Refine the plan' },
        { agent: 'Onyx', action: 'Execute plan safely' },
        { agent: 'Alex', action: 'Validate outputs' },
        { agent: 'Sentinel', action: 'Run security checks' },
        { agent: 'Logger', action: 'Persist execution details' }
      ]
    };
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openAiApiKey}`
    },
    body: JSON.stringify({
      model: config.openAiModel,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Command: ${command}` }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI planning failed (${response.status})`);
  }

  const payload = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const raw = payload.choices?.[0]?.message?.content;

  if (!raw) {
    throw new Error('OpenAI planning returned empty content');
  }

  const parsed = JSON.parse(raw) as CommandPlan;

  if (!parsed.steps?.length) {
    throw new Error('OpenAI plan did not include steps');
  }

  return parsed;
}
