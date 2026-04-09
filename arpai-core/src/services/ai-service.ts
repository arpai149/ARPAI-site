import { openai } from '../config/clients';
import { ClassificationResult } from '../types/domain';
import { AppError } from '../utils/errors';
import { withRetry } from '../utils/retry';

const createJsonCompletion = async (messages: { role: 'system' | 'user'; content: string }[], temperature: number) =>
  withRetry(
    async () => openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature,
      response_format: { type: 'json_object' },
      messages
    }),
    2,
    400
  );

export const classifyLeadIntent = async (message: string): Promise<ClassificationResult> => {
  const prompt = `Classify this dealership lead message into JSON only with keys: intent, urgency, buyer_stage, confidence.\nIntent must be one of: price, availability, trade, credit, appointment.\nUrgency must be one of: high, medium, low.\nBuyer stage must be one of: early, mid, late.\nConfidence must be a float between 0 and 1.\nMessage: ${message}`;

  const completion = await createJsonCompletion([
    { role: 'system', content: 'You are an automotive CRM lead classifier.' },
    { role: 'user', content: prompt }
  ], 0.1);

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new AppError('No classification returned from OpenAI', 502, 'OPENAI_EMPTY_RESPONSE');

  const parsed = JSON.parse(content) as ClassificationResult;
  return {
    intent: parsed.intent,
    urgency: parsed.urgency,
    buyer_stage: parsed.buyer_stage,
    confidence: Number(parsed.confidence)
  };
};

export const generateLeadResponse = async (
  leadMessage: string,
  vehicle: string,
  customerName: string,
  safeToSharePricing: boolean
): Promise<{ sms_message: string; email_message: string }> => {
  const completion = await createJsonCompletion([
    {
      role: 'system',
      content: [
        'You generate dealership responses.',
        'Never provide pricing if safe_to_share_pricing is false.',
        'Push toward booking an appointment.',
        'SMS must be under 2 sentences.'
      ].join(' ')
    },
    {
      role: 'user',
      content: JSON.stringify({
        lead_message: leadMessage,
        vehicle,
        customer_name: customerName,
        safe_to_share_pricing: safeToSharePricing,
        required_output: {
          sms_message: 'string',
          email_message: 'string'
        }
      })
    }
  ], 0.4);

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new AppError('No response content returned from OpenAI', 502, 'OPENAI_EMPTY_RESPONSE');

  return JSON.parse(content) as { sms_message: string; email_message: string };
};

export const generateFollowupMessage = async (stage: string): Promise<string> => {
  const completion = await withRetry(
    async () => openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.5,
      messages: [
        { role: 'system', content: 'Write concise dealership follow-up SMS messages.' },
        { role: 'user', content: `Write one SMS for followup stage ${stage} and end with a CTA to schedule appointment.` }
      ]
    }),
    2,
    400
  );

  return completion.choices[0]?.message?.content?.trim() ?? 'Checking in—would tomorrow or Saturday work for a quick appointment?';
};
