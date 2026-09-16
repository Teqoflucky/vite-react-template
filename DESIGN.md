# Lucky's Web Crypt — design contract

This document is the source of truth for the visual and personality direction of this site. Future agents should read it before changing the homepage.

## Identity

- Owner: **Lucky Patel**
- Site personality: a small, personal internet home; curious, cute, slightly haunted, and technically playful.
- The site is not a corporate portfolio, agency landing page, SaaS dashboard, or recruiter-focused resume.
- Keep the voice first-person, informal, brief, and a little weird.

## Visual language

- Default appearance is a dark plum/near-black “web crypt”.
- Core colors are dark background, muted lavender text, hot pink accents, lime highlights, purple details, and warm orange terminal accents.
- Use compact panels, thin borders, small rounded corners, and dense little UI objects.
- The composition should feel like a laptop-sized personal desktop centered on a large screen, not a full-width enterprise dashboard.
- Preserve the tiny ghost, emoji cameos, disco light strip, and small terminal card when possible.
- Typography uses DM Sans for readable UI and DM Mono for labels/metadata; Playfair Display italic is reserved for a small expressive accent.

## Required interactions

- The top controls must retain **disco** and **spooky/soft mode** toggles.
- Random emoji creatures may appear: cats, spiders, bats, beetles, bugs, butterflies, worms, scorpions, flies, roaches, frogs, ghosts, and similar small creatures.
- Creature animations must remain decorative and pointer-safe (`pointer-events: none`).
- Navigation is a compact set of links to blog, console, and API. Do not add a gallery or generic portfolio navigation unless Lucky explicitly asks.
- The API section should link to the Hono `/api/profile` endpoint.

## Content rules

- Prefer less text. Short labels and one-line descriptions are better than long marketing copy.
- Keep “Lucky Patel” visible. Do not replace it with placeholder names such as Alex Rivera.
- Keep the phrases “lucky's web crypt”, “hello from the tiny internet”, and “designer, developer, bug collector” unless the owner requests a copy change.
- Never invent corporate claims, clients, employers, or achievements.

## Layout rules

- The home view should read well at laptop widths (roughly 1280–1440px) and remain centered and intentional on large TVs/4K displays.
- Use a bounded content canvas; do not stretch cards to the full viewport width.
- On small screens, collapse to one column, keep controls tappable, and avoid horizontal scrolling.
- Avoid adding large hero whitespace, giant full-screen sections, heavy gradients, or three-column marketing grids.

## Technical boundaries

- Frontend: React + Vite.
- Edge backend: Hono in `src/worker/index.ts`, deployed with Wrangler/Cloudflare.
- Local development backend: `server/`; keep it separate from the Worker entrypoint.
- Preserve `npm run build` and `npm run deploy`.
- Do not remove or rename the Worker configuration when changing the design.
- Prefer small, local edits over replacing the personality with a template.
