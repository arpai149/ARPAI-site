# ARPAI corporate and campaign presentation

Canonical corporate site: https://arpai.co. Repository: `arpai149/ARPAI-site`. Canonical Vercel project: `prj_pZFaZiDzRyyVoAdUea2rEzJDS6az`.

ARPAI ONE is the shared platform; DealerAI is the authenticated dealership workspace in `arpai149/oneilnissan-ai`; oneilnissan.ai is its public shopping experience. The runtime control plane remains `arpai149/arpai-dealer-os-control-plane`. The dealership-owned Motive website, CRM/DMS and approved vendors remain authoritative in their respective domains.

This repository serves corporate content and staged campaign templates. It does not collect customer data, grant staff access, send customer messages or perform CRM/DMS writes. The unused browser-side legacy lead flow and public API-key example were removed to prevent accidental reuse. The historical `arpai-core` folder is reference material, not the canonical backend or a release target.

Run with Node 22+: `npm ci`, `npm run build`, `npm start`. No credentials are needed for the corporate frontend. `package-lock.json` fixes the reviewed dependency versions.

Product status is stated on the public page. `?site=nissantrades` and other campaign overrides are available only in Vercel preview or development, are noindex, and visibly identify an inactive preview. Prototype-property names cannot resolve a campaign. No DNS changes are made by this code.

[Canonical system map](https://github.com/arpai149/arpai-dealer-os-control-plane/blob/main/docs/canonical-system-map.md) owns runtime architecture and integration status. [Domain registry](web-factory/domains.json) owns this repository’s campaign classification. [Current convergence status](CONVERGENCE_STATUS.md) distinguishes intended redirects from verified routing.

Deployments from this source are limited to the verified corporate project by the same project-ID guard used by the retailer. Duplicate projects retain their prior deployments; domain cutovers require separate owner verification.
