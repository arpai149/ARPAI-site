import type { AgentResult, PlanStep } from '../types';

type AgentFn = (step: PlanStep, context: { command: string; previousOutputs: string[] }) => Promise<AgentResult>;

const success = (output: string): AgentResult => ({ ok: true, output });

export const agentRegistry: Record<string, AgentFn> = {
  Nova: async (step) => success(`Nova planning complete: ${step.action}`),
  Jura: async (step) => success(`Jura refinement complete: ${step.action}`),
  Onyx: async (step, context) => success(`Onyx executed for command "${context.command}": ${step.action}`),
  Alex: async (step) => success(`Alex validation passed: ${step.action}`),
  Sentinel: async (step) => success(`Sentinel security check passed: ${step.action}`),
  Logger: async (step, context) => success(`Logger persisted ${context.previousOutputs.length} outputs: ${step.action}`)
};

export async function runAgentStep(step: PlanStep, context: { command: string; previousOutputs: string[] }) {
  const fn = agentRegistry[step.agent];
  if (!fn) {
    return { ok: false, output: `Unknown agent: ${step.agent}` };
  }

  return fn(step, context);
}
