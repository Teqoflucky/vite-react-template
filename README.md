# Lucky's Web Crypt

Lucky Patel's personal internet home: a small dark web crypt with a cute horror mood, disco lights, random emoji creatures, a tiny console, and a Hono API.

## Stack

- React + TypeScript
- Vite
- Hono
- Cloudflare Workers + Wrangler

## Run locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`. The local Hono API runs at `http://localhost:8787`.

Useful endpoints:

- `GET /api/profile`
- `GET /api/notes`

## Build and deploy

```bash
npm run build
npm run preview
npm run deploy
```

`npm run deploy` builds the Vite app and deploys the Worker with Wrangler. Cloudflare can also run this command from the repository's continuous deployment settings.

## Project map

```text
src/
  App.tsx            # page composition and interactive behavior
  main.tsx           # React entrypoint
  styles.css         # complete visual system and responsive layout
  worker/index.ts    # Cloudflare Worker Hono routes and asset fallback
server/index.ts      # local Hono API used by npm run dev
DESIGN.md            # design contract for future contributors and AI agents
wrangler.json        # Cloudflare Worker and static asset configuration
```

## Design guardrails

Read [`DESIGN.md`](./DESIGN.md) before changing the homepage. The intended direction is personal, compact, dark, cute, slightly haunted, and technically playful — not corporate, generic, or recruiter-template-like.

Keep the following intact unless Lucky explicitly asks for a change:

- Lucky Patel identity and informal voice
- the dark web-crypt canvas
- disco and spooky/soft controls
- small UI cards and laptop-friendly proportions
- random decorative emoji creatures
- blog, console, and API navigation

## Deployment notes

The Cloudflare Worker backend in `src/worker/` is separate from the local development API in `server/`. Keep both files in sync when changing API response shapes. Do not commit secrets, SSH keys, API tokens, or `.env` files.
