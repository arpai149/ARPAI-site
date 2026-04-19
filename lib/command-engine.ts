import { runAgentStep } from './agents';
import { generatePlan } from './openai-plan';
import { addLog, createTask, updateTaskStatus } from './task-repository';

const maxRetries = 2;

export async function runCommand(command: string) {
  const task = await createTask(command);
  await updateTaskStatus(task.id, 'running');

  const plan = await generatePlan(command);
  const outputs: string[] = [];

  try {
    for (const step of plan.steps) {
      let attempt = 0;
      let success = false;

      while (attempt <= maxRetries && !success) {
        const result = await runAgentStep(step, { command, previousOutputs: outputs });

        await addLog({
          task_id: task.id,
          agent: step.agent,
          output: result.output,
          status: result.ok ? 'completed' : 'failed'
        });

        if (result.ok) {
          outputs.push(result.output);
          success = true;
        } else {
          attempt += 1;
        }

        if (!success && attempt > maxRetries) {
          throw new Error(`Step failed after retries: ${step.agent}`);
        }
      }
    }

    await updateTaskStatus(task.id, 'completed');
    return { taskId: task.id, status: 'completed', plan, outputs };
  } catch (error) {
    await updateTaskStatus(task.id, 'failed');
    await addLog({
      task_id: task.id,
      agent: 'Logger',
      output: error instanceof Error ? error.message : 'Unknown execution error',
      status: 'failed'
    });

    return {
      taskId: task.id,
      status: 'failed',
      plan,
      outputs
    };
  }
}
