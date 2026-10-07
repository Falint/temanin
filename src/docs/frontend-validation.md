# Frontend redesign validation

Base: `feat/branch-assets` at `5ed5523`. Work branch: `feat/FrontEnd`.

The redesign uses the existing TEMANIN tokens, local Inter/Raleway fonts, logo,
CSS Modules and game scene. No runtime packages were added. Backend/API and
LifeGame engine files are unchanged.

## Checks

Run from `src/`:

- `npm run lint` — passed.
- `npm run test:life` — all 7 tests passed.
- `npm run build` — passed.
- `node tests/frontend.cjs` — passed against the production server with Chromium.

The browser script covers 17 routes at 320, 390, 768, 1024 and 1440px, checks
horizontal overflow, mobile navigation and Escape, FAQ keyboard activation,
education search, Curhat consent/profile persistence and navigation, LifeGame
choice/save/resume, and reduced motion. Desktop and mobile landing screenshots
were also inspected. Font and logo source files are unchanged.

The optional browser check requires Playwright installed separately; setup is
at the top of the script. It accepts BASE_URL and CHROMIUM_EXECUTABLE_PATH.
Run `npm run start -- --hostname 127.0.0.1` before the script.

## Remaining live integration check

This environment has no Supabase/Telegram server configuration. Curhat was
checked through profile submission and navigation to the wilayah URL, not live
partner retrieval, session creation or delivery of Telegram messages. Verify
those on an environment with the existing server variables before release.
Existing dashboard/demo labels and medical-service limitations are preserved.
