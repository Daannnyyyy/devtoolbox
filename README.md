# DevToolbox

[![CI](https://github.com/Daannnyyyy/devtoolbox/actions/workflows/ci.yml/badge.svg)](https://github.com/Daannnyyyy/devtoolbox/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**Fast, private developer tools that run entirely in your browser. No accounts, no servers, no data leaving your machine.**

A lightweight, browser-only collection of everyday developer utilities — format, encode, convert, and inspect common data without leaving the tab.

> **Screenshot:** After running `npm run build` (or `npm run dev`), open the app and capture a screenshot for `docs/screenshot.png` if you want a visual in this README.

## Features

- **JSON Formatter** — pretty-print, minify, and validate JSON with clear errors
- **Base64** — encode and decode UTF-8 text safely
- **Unix Timestamp** — convert between Unix seconds/milliseconds and local/UTC ISO
- **URL Parser** — break a URL into protocol, host, path, query params, and hash
- **Private by design** — all processing happens in your browser; nothing is uploaded
- **Dark / light theme** — preference persisted in `localStorage`
- **Extensible** — add a tool by dropping one folder under `src/tools/`

## Quick start

Requires **Node.js 20+**.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm test`        | Run unit tests once                  |
| `npm run test:watch` | Watch mode for tests              |
| `npm run lint`    | ESLint                               |
| `npm run format`  | Prettier write                       |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build         |

## How to add a tool

1. Copy `src/tools/_template/` to `src/tools/your-tool-id/`.
2. Implement pure logic + `ToolDefinition` in `index.ts`.
3. Add Vitest tests beside the logic (`*.test.ts`).
4. The registry auto-discovers new folders — no manual registration.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for coding standards and the PR process.

## Privacy

DevToolbox does **not** collect analytics, require accounts, or send tool input to any server. Your data stays in the tab. Theme preference is stored only in `localStorage` on your device.

## Roadmap

Planned tools and enhancements are tracked in [ROADMAP.md](./ROADMAP.md).

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

See [SECURITY.md](./SECURITY.md) for how to report vulnerabilities.

## License

[MIT](./LICENSE) © 2026 Danny / Daannnyyyy
