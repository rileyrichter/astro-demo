# Development

Astro 7 + `@astrojs/cloudflare` 14, deployed to Webflow Cloud.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install deps (npm + `package-lock.json`) |
| `npm run dev` | Dev server at `http://localhost:4321/app/` (runs as a daemon; `npx astro dev stop`) |
| `npm run build` | Production build into `dist/client` + `dist/server` |
| `npm run preview` | Serve the built worker in workerd |
| `npm run webflow -- cloud deploy` | Deploy with the Webflow CLI (needs `webflow auth login` on a trusted host) |

## Webflow Cloud contract

- `webflow.json` declares `{"cloud": {"framework": "astro"}}`.
- At deploy time the Webflow builder renames `astro.config.mjs` to `clouduser.astro.config.mjs` and wraps it,
  **overriding** `base` (environment mount path), `output: "server"`, the adapter, `build.assetsPrefix`,
  and the image service. It also adds `@astrojs/react` if missing.
  The local `base: "/app"` matches Webflow's default mount path. If your environment uses a different mount path, change it here too.
- `build.client`, `build.server` and `build.serverEntry` are ignored by Webflow; don't relocate build output.
- Build any links or asset URLs from `import.meta.env.BASE_URL`; don't hardcode `/`.
- Bindings (KV, D1, R2) go in `wrangler.jsonc`, and Webflow merges them into its generated config.

## Environment variables

None needed yet. If any are added, list them here (name, consumer, required or optional) without values.
In a Hitch sandbox, reference secrets via an `op://` template plus Hitch Environment/Connections, and never paste resolved values.

## Verification (2026-10-01)

- `npm run build`: passes.
- `npm run dev`: `/app/` returns 200, renders the page, and SSRs the React island. The favicon returns 200.
- `npm run preview`: `/app/` and the hashed `/app/_astro/*` assets return 200.
- A real deploy to Webflow Cloud has not been tested.
