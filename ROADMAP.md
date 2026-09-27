# Roadmap

Living plan for DevToolbox. Items are aspirational and may move between phases.

## Near-term (v0.2)

### Tools

- [ ] **UUID generator** — v4 (and optionally v1/v7), copy, bulk generate
- [ ] **JWT decoder** — header/payload JSON view; no signature verification by default
- [ ] **Regex tester** — pattern + flags, match highlights, capture groups
- [ ] **Case converter** — camel, Pascal, snake, kebab, CONSTANT
- [ ] **Text diff** — side-by-side or inline diff of two strings

### UX / platform

- [ ] Persist last-used tool in `localStorage` / URL
- [ ] Keyboard shortcuts (focus search, copy output)
- [ ] Shareable hash links with optional encoded state (opt-in, still client-only)
- [ ] Improved empty / loading states and tool categories in the sidebar

## Medium-term (v0.3+)

- [ ] **CSV ↔ JSON** converter
- [ ] **Hash tools** — SHA-256 / SHA-1 / MD5 (Web Crypto where available)
- [ ] **Markdown preview** — safe, client-side rendering
- [ ] **Number base converter** — bin / oct / dec / hex
- [ ] **Cron expression explainer**
- [ ] **Color converter** — hex / rgb / hsl
- [ ] PWA / offline installable build
- [ ] i18n-ready strings

## Longer-term / ideas

- [ ] Plugin-style community tools (still static, no backend)
- [ ] Export/import of tool presets
- [ ] Performance budgets and Lighthouse CI
- [ ] Optional WASM helpers for heavy transforms

## Non-goals (for now)

- User accounts or cloud sync
- Server-side processing of pasted data
- Monetization / ads
- Mobile-native apps (responsive web first)

Suggestions welcome via [feature request](./.github/ISSUE_TEMPLATE/feature_request.yml) or [new tool](./.github/ISSUE_TEMPLATE/new_tool.yml) issues.
