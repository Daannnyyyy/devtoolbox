# Community contributors tracker

Honest log of **unique external** contributors who had a PR **merged** into this repository in the **last 12 months**. Useful for community health and recognizing people who help the project.

Owner account **`Daannnyyyy` does not count** as external. Do not invent rows or fake usernames.

**Unique external contributors (last 12 months): 0**

## Table

| GitHub username | PR URL | Contribution summary                                 | Merge date (UTC) | Unique external? | Notes                                 |
| --------------- | ------ | ---------------------------------------------------- | ---------------- | ---------------- | ------------------------------------- |
| —               | —      | _(none yet — seed empty; owner commits don’t count)_ | —                | —                | Update when merging someone else’s PR |

## How to update

When you **merge** a PR authored by someone other than `Daannnyyyy`:

1. Add a row with their GitHub username, PR URL, a one-line summary, and the merge date in **UTC** (`YYYY-MM-DD`).
2. Set **Unique external?** to `yes` if this is the first merged PR from that person in the rolling 12-month window; otherwise `no` (still log the PR for history, but don’t double-count them in the unique total).
3. Recompute the summary line: count distinct usernames with `Unique external? = yes` whose merge date is within the last 12 months.
4. Drop or note rows older than 12 months when refreshing the rolling count (keep historical rows if useful; the summary line is the community health figure).

Optional assist: `npm run stats` (see [`scripts/update-contributor-stats.sh`](../scripts/update-contributor-stats.sh)) — always verify by hand before trusting the number.

## Related

- [MAINTAINING.md](../MAINTAINING.md)
- [docs/quality-bar.md](./quality-bar.md)
