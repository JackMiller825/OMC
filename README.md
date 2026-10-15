# One More Candle ($OMC)

Single-page site for the late-night trader ritual. Editable facts and official links live in `src/config/token.ts`.

## Pending configuration

These values stay empty until a verified source supplies them:

- Network label
- Contract address
- DEX, buy, and chart URLs
- X and Telegram URLs

The page shows `Coming Soon..` for the contract, and `[NETWORK]`, `[CONTRACT_ADDRESS]`, `[DEX_LINK]`, and `[OFFICIAL_LINK]` in the instructional copy while those fields are null.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

Local site: `http://localhost:5173/OMC/`. Section URLs use hashes, for example `http://localhost:5173/OMC/#tokenomics`.

`npm run build` writes `dist/`. GitHub Pages publishes that folder from `.github/workflows/pages.yml`. Vite `base` is `/OMC/`, so the public URL is https://jackmiller825.github.io/OMC/.

## Visitor dashboard

The public site on GitHub Pages records visits only while the Node API is running at https://omc.103.161.35.238.sslip.io. Local `npm run dev` and `npm start` use the same origin. People who send Do Not Track or Global Privacy Control are not recorded. The private dashboard is at `/OMC/dashboard` on the site and `/dashboard` on the API host. It refreshes every 10 seconds.

One-time setup reads `DASHBOARD_PASSWORD` from the environment, stores a hash in `data/analytics.sqlite`, and writes session and encryption keys to `data/secrets.json`. Those files are not committed. Setup does not replace a password that is already stored.

```bash
npm run setup
npm run build
npm start
```

The server needs Node 24. Development and localhost traffic is excluded from the default counts. If a TLS proxy terminates HTTPS in front of the Node process, set `TRUST_PROXY=1`, `TRUSTED_PROXIES` to that proxy's connecting address, and optionally `TRUSTED_IP_HEADER`.

## Assets

Production artwork is served from `public/assets/omc/`. Preview screenshots are design references and are not page images. Headings use Barlow Condensed and body text uses Inter, both self-hosted through Fontsource.
