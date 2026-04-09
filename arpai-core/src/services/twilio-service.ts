import { twilioClient } from '../config/clients';
import { env } from '../config/env';
import { AppError } from '../utils/errors';
import { withRetry } from '../utils/retry';

export const sendSms = async (
  to: string,
  body: string,
  _idempotencyKey?: string
): Promise<{ sid: string | null; queued: boolean }> => {
  if (!twilioClient || !env.TWILIO_FROM_NUMBER) {
    return { sid: null, queued: false };
  }

  const message = await withRetry(
    async () => twilioClient.messages.create({
      to,
      from: env.TWILIO_FROM_NUMBER,
      body
    }),
    2,
    500
  ).catch((error) => {
    throw new AppError(`Twilio send failed: ${(error as Error).message}`, 502, 'TWILIO_ERROR');
  });

  return { sid: message.sid, queued: true };
};
