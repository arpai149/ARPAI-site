export const config = {
  supabaseUrl: process.env.SUPABASE_URL ?? '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  openAiApiKey: process.env.OPENAI_API_KEY ?? '',
  openAiModel: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
  githubRepo: process.env.GITHUB_REPO ?? '',
  githubToken: process.env.GITHUB_TOKEN ?? '',
  vercelDeployHookUrl: process.env.VERCEL_DEPLOY_HOOK_URL ?? '',
  n8nWebhookSecret: process.env.N8N_WEBHOOK_SECRET ?? ''
};

export const hasSupabase = Boolean(config.supabaseUrl && config.supabaseServiceKey);
