# Quality bar

Maintainer and contributor expectations for DevToolbox. Linked from [CONTRIBUTING.md](../CONTRIBUTING.md) and [MAINTAINING.md](../MAINTAINING.md).

## Standards

| Rule                              | Expectation                                                                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Tests                             | Add or update Vitest tests for new/changed logic. Pure helpers in `logic.ts` (or similar) should be covered.                     |
| CI must pass                      | `npm run lint`, `npx prettier --check .`, `npm run typecheck`, `npm test`, `npm run build` — same as `.github/workflows/ci.yml`. |
| Scoped changes                    | One tool or one concern per PR. No unrelated refactors bundled with a fix.                                                       |
| Correctness review                | Green CI is necessary but not sufficient; maintainers review logic and edge cases.                                               |
| Useful merges only                | Merge work that helps users or the project. Do not merge to inflate contribution counts.                                         |
| No fabricated / low-quality noise | Reject typo-farm, whitespace-only, and sock-puppet PRs politely.                                                                 |
| AI disclosure                     | Optional but encouraged in the PR template when AI tools helped. Not grounds for rejection by itself.                            |

## What “good” looks like

- Focused PR description and filled template checkboxes
- Linked issue when the work came from one
- Tests that fail without the fix / pass with it
- Docs updated for user-facing behavior
- No new dependencies without discussion

## What we decline

- Drive-by typo or README churn with no substantive value
- Broken or untested feature dumps
- Changes that send user tool input to a server or add tracking
- Spam, fake contributors, or gaming of OSS program metrics

## Automation

CI blocks broken PRs via the required `build` status check. There is no auto-merge bot — humans merge useful work only.
