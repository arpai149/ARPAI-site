import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  OPENAI_API_KEY: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_FROM_NUMBER: z.string().optional(),
  DEFAULT_BDC_REP: z.string().default('BDC Team'),
  DEFAULT_SALES_REP: z.string().default('Floor Sales'),
  API_KEY: z.string().optional(),
  ADMIN_KEY: z.string().min(12).default('change-this-admin-key'),
  WEBHOOK_SECRET: z.string().optional()
});

export const env = envSchema.parse(process.env);
