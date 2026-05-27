# ARPAI Site — Repo Status

## Status

Supporting / Corporate Marketing Site / Review Required.

## Canonical Role

This repository should represent the public ARPAI brand, corporate narrative, investor-facing content, and marketing surface unless a future audit proves a different role.

## Boundaries

This repo should not own:
- ARPAI OS governance doctrine
- Dealer Command Center runtime
- O'Neil Nissan live website runtime
- n8n workflow execution
- Supabase operational data

## Current Risk

This repo may be confused with runtime infrastructure if it contains application logic that belongs in `arpai-dealer-os-control-plane` or `oneilnissan-ai`.

## Next Action

Audit README, routes, deployment target, environment variables, and any runtime logic. Confirm whether this stays marketing-only.

## Rollback Path

This file is documentation-only. If repo classification changes after audit, update this status file. No runtime behavior is changed.
