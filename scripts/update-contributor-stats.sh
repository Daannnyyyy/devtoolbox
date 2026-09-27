#!/usr/bin/env bash
# List merged PRs from non-owner authors in the last ~12 months for this repo.
# Helpful for refreshing docs/contributors-tracker.md — not a perfect eligibility oracle.
#
# Limitations (GitHub API / gh):
# - Lists up to --limit merged PRs (default 200); older history may be truncated.
# - "Unique external" means author.login != OWNER; bots, co-authors, and renames
#   need manual review.
# - Does not prove Claude-for-OSS eligibility; re-check the official page.
# - Requires gh auth and network access. Search/list APIs have rate limits.
set -euo pipefail

OWNER="${OWNER:-Daannnyyyy}"
REPO="${REPO:-Daannnyyyy/devtoolbox}"
LIMIT="${LIMIT:-200}"

# Portable "12 months ago" UTC date (GNU date or BSD date)
if SINCE="$(date -u -d '12 months ago' +%Y-%m-%d 2>/dev/null)"; then
  :
elif SINCE="$(date -u -v-12m +%Y-%m-%d 2>/dev/null)"; then
  :
else
  echo "Could not compute SINCE date" >&2
  exit 1
fi

echo "Repo: ${REPO}"
echo "Owner (excluded): ${OWNER}"
echo "Merged on/after (UTC): ${SINCE}"
echo "---"

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

gh pr list --repo "${REPO}" --state merged --limit "${LIMIT}" \
  --json number,url,title,mergedAt,author >"$TMP"

python3 - "$TMP" "$OWNER" "$SINCE" <<'PY'
import json, sys
path, owner, since = sys.argv[1], sys.argv[2], sys.argv[3]
data = json.load(open(path))
rows = []
for pr in data:
    merged = (pr.get("mergedAt") or "")[:10]
    if not merged or merged < since:
        continue
    login = (pr.get("author") or {}).get("login") or ""
    if login == owner:
        continue
    rows.append((login, pr.get("url") or "", pr.get("title") or "", merged))

if not rows:
    print("No merged PRs from non-owners in the window (or none returned).")
    print("Unique external authors: 0")
    sys.exit(0)

for login, url, title, merged in rows:
    print(f"{login}\t{url}\t{title}\t{merged}")

authors = sorted({r[0] for r in rows})
print("---")
print(f"Merged external PRs listed: {len(rows)}")
print(f"Unique external authors: {len(authors)}")
print("")
print("Update docs/contributors-tracker.md by hand after verifying each row.")
PY
