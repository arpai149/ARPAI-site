# Next Domain Action

The only remaining external cutover step for the first factory batch is domain attachment/DNS:

1. Attach `nissanreviews.com` + `www` to Vercel project `arpai-co-production`.
2. Apply the exact DNS records Vercel requests at GoDaddy without altering unrelated MX/TXT email records.
3. Verify SSL and HTTP 200.
4. Repeat for `nissantrades.com` and `nissandeals.org`.
5. Attach `arpai.ai`, `arpai.net`, `arpai.info`, `arpai.xyz`; the committed middleware will then redirect them permanently to `arpai.co`.

Do not repoint `oneilnissan.ai`.
