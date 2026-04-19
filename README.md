# ARPAI OS Unified System

ARPAI OS is now structured as a single Next.js + Supabase orchestration platform with command execution, modular agents, task memory, deployment controls, and automation workflow templates.

## Core modules
- **Command Engine**: `/api/command` and `/api/execute` run `runCommand(command)` with sequential Nova → Jura → Onyx → Alex → Sentinel → Logger execution.
- **Persistent Memory**: Supabase-backed `tasks`, `logs`, `agents`, `workflows`, and `users` tables.
- **Deployment Integration**: `/api/deploy` triggers GitHub repository dispatch + Vercel deploy hook.
- **UI**:
  - `/` command input + voice command button
  - `/taskboard` live task polling dashboard
  - `/deploy` manual deploy trigger
  - `/dashboard` system overview metrics
- **Automation**: n8n workflow JSON templates in `n8n/workflows/`.

## Environment Variables
Create `.env.local`:

```bash
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
GITHUB_REPO=org/repo
GITHUB_TOKEN=ghp_...
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

## Supabase bootstrap
Run the schema in `supabase/schema.sql` via Supabase SQL editor.

## Run
```bash
npm install
npm run dev
```

## Validation flow
1. Run command: `hello world` from `/`.
2. Verify records in `tasks` and `logs`.
3. Visit `/taskboard` and `/dashboard` for live updates.
4. Trigger deployment from `/deploy`.

## n8n setup
Import all JSON files under `n8n/workflows/`, then bind environment variable `ARPAI_BASE_URL` and credentials for Slack or chosen notifier.
