import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';
import { env } from './env';

export const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

export const twilioClient = env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN
  ? twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)
  : null;
