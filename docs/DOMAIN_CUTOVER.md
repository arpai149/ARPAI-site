# ARPAI Domain Cutover Runbook

## Production already live
- `arpai.co` / `www.arpai.co` — canonical ARPAI ONE corporate surface.
- `oneilnissan.ai` — remains separate Tenant 001 runtime; do not repoint during this cutover.

## Factory surfaces ready for domain attachment
- `nissanreviews.com` → site key `nissanreviews`
- `nissantrades.com` → site key `nissantrades`
- `nissandeals.org` → site key `nissandeals`

All three surfaces are build-verified in the canonical ARPAI web application. Their host-aware page content and metadata activate automatically once the real host reaches the project.

## Defensive redirects ready
The runtime already contains permanent redirect logic for:
- `arpai.ai`
- `arpai.net`
- `arpai.info`
- `arpai.xyz`
- corresponding `www` hosts

These redirect to the same path on `https://arpai.co` once the domains are attached/routed to the project.

## Safe cutover sequence for each domain
1. Add the domain and its intended `www` variant to the canonical `arpai-co-production` Vercel project.
2. Use the DNS records Vercel displays for that exact domain/project. Do not guess or replace unrelated MX/TXT email records.
3. Update only the required web-hosting records at the registrar/DNS provider.
4. Wait for Vercel domain verification and SSL provisioning.
5. Test apex and `www` over HTTPS.
6. Confirm expected host-specific page title, canonical URL, content and CTA.
7. Confirm no cross-domain redirect loop.
8. Only then mark the domain LIVE in the domain registry.

## Order
1. `nissanreviews.com`
2. `nissantrades.com`
3. `nissandeals.org`
4. `arpai.ai`, `arpai.net`, `arpai.info`, `arpai.xyz` redirects

## Production gates
- HTTP 200 for active sites or permanent redirect for defensive domains
- correct host-specific metadata/canonical
- mobile and desktop rendering
- no runtime errors
- no impact to `oneilnissan.ai`
- no DNS changes to mail records unless explicitly required and approved

## Boundary
Public presentation, content, community discovery and lightweight lead intent can use the Site Factory. Authentication, sensitive writes, CRM/DMS connectivity, live dealer state, agent execution and material transaction logic remain in the governed ARPAI/Vercel runtime.
