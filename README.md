# ARPAI Website (Next.js)

High-conversion landing page + live lead capture UI that sends leads directly into `arpai-core`.

## What it does
- Captures lead fields: name, email, phone, vehicle of interest, optional message.
- Executes live backend flow on submit:
  1. `POST /api/lead/intake`
  2. `POST /api/lead/classify`
  3. `POST /api/lead/respond`
  4. `POST /api/lead/route`
- Shows confirmation + instant SMS/email preview to user.

## Env setup
Copy `.env.example` to `.env` and set:

- `NEXT_PUBLIC_ARPAI_BACKEND_URL` (e.g. `https://arpai-core.vercel.app`)
- `NEXT_PUBLIC_ARPAI_API_KEY` (if `arpai-core` API key auth is enabled)

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Push repo to GitHub.
2. In Vercel, import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables:
   - `NEXT_PUBLIC_ARPAI_BACKEND_URL`
   - `NEXT_PUBLIC_ARPAI_API_KEY` (if needed)
5. Deploy.

## Full lead flow test
1. Open deployed site.
2. Submit lead form with realistic values.
3. Verify in arpai-core logs/admin APIs:
   - lead created or deduped,
   - classification generated,
   - response generated,
   - routing assigned.
4. Confirm browser console prints each backend response block (`[ARPAI FLOW]`).
