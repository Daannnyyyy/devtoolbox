# Maintaining DevToolbox

Guide for maintainers (currently `@Daannnyyyy`). Contributors should start with [CONTRIBUTING.md](./CONTRIBUTING.md).

## Quality bar

See [docs/quality-bar.md](./docs/quality-bar.md) for the full standard. In short:

- Require tests where appropriate (new or changed logic)
- CI must pass before merge (lint, Prettier check, typecheck, test, build)
- Keep changes scoped to one concern
- Review PRs for correctness, not just green checks
- Merge only useful work
- Never merge low-quality or fabricated changes to inflate counts
- Encourage AI disclosure when AI tools were used

## Review checklist

Before approving or merging:

1. **Intent** — Does the PR solve a real problem or add a real tool? Is there a linked issue when expected?
2. **Scope** — Is it focused? Reject or request changes if unrelated files / drive-by rewrites are mixed in.
3. **Correctness** — Logic and edge cases look right; Result/error paths are handled.
4. **Tests** — New logic has Vitest coverage; existing tests still make sense.
5. **CI** — The `build` job is green (required status check on `main`).
6. **Docs / UX** — User-facing changes update README or CONTRIBUTING as needed; a11y basics (labels, keyboard) are OK.
7. **Dependencies** — No new deps without prior discussion on an issue.
8. **Security / privacy** — No secrets; tool input still stays in the browser.
9. **AI disclosure** — If noted, still apply the same review bar; disclosure is informational.

## Merge criteria

Merge when:

- Review checklist passes
- CI is green
- The change is useful to users or maintainers
- The author addressed requested changes

Do **not** merge:

- Broken, untested, or speculative code that fails CI
- Typo-farm / whitespace-only / meaningless churn meant to pad contribution stats
- Fabricated “contributions” or sock-puppet PRs
- Auto-merge bots or spammy automation that bypass human judgment

## When to request changes

Ask for revisions when tests are missing for new logic, scope is too broad, naming/UX is unclear, docs are stale, or CI is failing. Prefer specific, actionable comments over vague pushback.

## Rejecting low-quality / typo-farm PRs

Be polite and firm. Example reply:

> Thanks for the interest! We’re keeping PRs focused on substantive fixes and features. Typo-only or drive-by churn PRs aren’t a fit here — please see [CONTRIBUTING.md](./CONTRIBUTING.md) and [docs/quality-bar.md](./docs/quality-bar.md). If you’ve spotted a real bug or want to add a tool, open an issue first and we’d be glad to review a focused PR.

Close the PR after commenting. Do not merge “just to be nice” if it doesn’t meet the bar.

## CODEOWNERS

[`.github/CODEOWNERS`](./.github/CODEOWNERS) requests review from `@Daannnyyyy` on critical paths (`.github/`, `src/core/`). Code owner reviews are informational unless branch protection is tightened later.

## CI status

Workflow: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml).

On every push and PR to `main`, CI runs: `lint` → Prettier `--check` → `typecheck` → `test` → `build`. Branch protection requires the `build` check to pass before merging PRs. Admins can push directly when needed (`enforce_admins` is off); still run the same checks locally before pushing.

We do **not** use auto-merge bots.

## Community contributor tracker

Keep an honest log of people outside the owner account who land merged PRs here:

| Doc                                                            | Purpose                                                    |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| [docs/contributors-tracker.md](./docs/contributors-tracker.md) | Unique external merged-PR contributors (rolling 12 months) |

Update the tracker when you merge someone else’s PR. Owner commits do not count as external. Prefer real, useful contributions — never invent rows or merge low-quality work to pad stats.

Helper (optional): `npm run stats` → [`scripts/update-contributor-stats.sh`](./scripts/update-contributor-stats.sh).

## Project ops links

- [CONTRIBUTING.md](./CONTRIBUTING.md) — contributor guide
- [ROADMAP.md](./ROADMAP.md) — planned work
- [SECURITY.md](./SECURITY.md) — vulnerability reports
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
