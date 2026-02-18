# Momentum Link Boards (Fast-Follower MVP)

Production-lean Chrome extension MVP inspired by **Momentum** user pain points.

## Why this target (evidence-based)

Target app: **Momentum** (Chrome Web Store)
- Store page claims **"Join over 3 million inspired users"** (large installed base = monetization surface).
- Business model already validated via **in-app purchases / Plus features**.

Observed review pain points from Chrome Web Store reviews page (captured 2026-02-19 KST):
1. **Paywall fatigue**: "why does almost everything have to be for VIP members"
2. **Missing practical productivity value**: reviewer switched to alternative focused on link organization/boards and offline access.
3. **Reliability concern**: long-time user reported extension shown as unsupported.

Fast-follower angle:
- Build a **single deep utility** users explicitly ask for: board-based quick links with offline-first behavior.
- Keep friction low: no account, no AI upsell, no external backend.

## MVP scope (one deep feature)

### Deep feature: Offline Link Boards + Quick Launcher
- New Tab dashboard with multiple boards (e.g., Today / Later)
- Add/edit/delete links per board
- Drag-and-drop links across boards
- Keyboard launcher (`Cmd/Ctrl+K`) with instant filtering + Enter-to-open first result
- Data persists in `chrome.storage.local` (offline-first, accountless)

## Permissions (minimal)

- `storage` only
- `chrome_url_overrides.newtab` to replace new tab page
- No host permissions
- No background service worker

## Tech

- TypeScript
- Manifest V3
- Zero runtime dependencies

## Project structure

- `src/newtab.ts` - app logic
- `newtab.html`, `styles.css`, `manifest.json` - extension files
- `scripts/copy-static.mjs` - build helper

## Build

```bash
npm install
npm run build
```

Build output: `dist/`

## Package ZIP

```bash
npm run package
```

Creates: `momentum-link-boards-mvp.zip`

## Load in Chrome (developer mode)

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist/` folder
5. Open a new tab to test

## Test checklist

- [ ] New tab opens Link Boards UI
- [ ] Add board works
- [ ] Add/edit/delete link works
- [ ] Drag card from one board to another works
- [ ] `Cmd/Ctrl+K` focuses quick launcher
- [ ] Typing filters links and Enter opens first result
- [ ] Reload browser and verify state persists

## Go-to-market brief (lean)

### Positioning
"Practical new tab for power users who want **instant link execution**, not motivational dashboards."

### ICP
- Students, operators, PMs, engineers with repeated daily workflows
- Existing Momentum/new-tab users who care about speed and utility

### Monetization hypothesis
- Free core (this MVP)
- Pro (future): import/export, cross-device encrypted sync, shared team boards, keyboard macros
- Price test: $2.99/mo or $24/yr

### Distribution
1. Chrome Web Store listing optimized for "new tab productivity", "link organizer", "speed dial board"
2. Reddit/productivity communities + X short demo clips
3. Side-by-side migration landing page for Momentum discontent keywords ("VIP", "too many premium features", "need practical new tab")

## What remains before Chrome Web Store submission

- Create icons/screenshots and promotional assets
- Add privacy policy URL + support URL
- Add E2E smoke test (Playwright) and CI build check
- Store listing copy + keyword A/B test
- Optional: basic telemetry (privacy-preserving, opt-in)
