# ARPAI Web Production Status — 2026-09-06

## Live and verified
- `arpai.co` — HTTP 200, new ARPAI ONE corporate surface live.
- `www.arpai.co` — HTTP 200, new ARPAI ONE corporate surface live.
- Latest canonical build completed successfully.
- No runtime errors found in the selected post-launch window.

## Factory surfaces build-verified
- NissanReviews
- NissanTrades
- NissanDeals

These render correctly in the canonical app through the factory override and are ready for real-domain cutover.

## Redirect behavior implemented
Permanent canonical redirect logic exists for `arpai.ai`, `arpai.net`, `arpai.info`, `arpai.xyz` and their `www` variants to `arpai.co` once those domains are routed to the project.

## Protected runtime boundary
`oneilnissan.ai` remains a separate Tenant 001 runtime and was not repointed or merged into the public site factory.

## Remaining external dependency
Attach/verify the Nissan domains and defensive ARPAI domains in Vercel and update registrar DNS using the exact records Vercel requests. The current ChatGPT connector can deploy and inspect Vercel projects but does not expose project-domain mutation or GoDaddy DNS-write actions.
