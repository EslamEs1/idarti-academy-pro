# Quickstart — Student Dashboard and Learning Journey

This feature ships four static HTML pages under `pages/student/`. There is no new backend, no new build, and no new dependency to install. If Spec 001 is already implemented, the project is already set up.

## Prerequisites

- The repo is at `001-frontend-foundation` or later.
- `assets/css/output.css` exists (committed) and `pages/student/dashboard.html` is the Spec 001 baseline.
- Node.js LTS + `npm install` has been run **once** by anyone who needs to rebuild Tailwind utilities (otherwise the committed `output.css` is sufficient to view the pages).

## Local build

If you change Tailwind utility classes in any of the four pages, rebuild `output.css`:

```bash
npm run build:css
```

This invokes `tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --minify` per `package.json`. The output should remain ≤ 80 KB; verify with:

```bash
wc -c assets/css/output.css
```

If `npm run build:css` is not needed (no new utility classes used beyond what the existing pages already exercise), you can skip the build entirely.

## Open the pages

Open the four pages directly via the OS file explorer or `xdg-open`:

```bash
xdg-open pages/student/dashboard.html        # redesigned hero + 10 blocks
xdg-open pages/student/learning-journey.html # vertical timeline
xdg-open pages/student/weekly-plan.html      # 9 plan blocks
xdg-open pages/student/notifications.html    # chronological inbox
```

A dev server is **not** required. The pages are designed to render correctly via `file://`.

## Validating the prototype against this spec

Walk through the success criteria in `spec.md`:

| SC | How to verify |
|---|---|
| SC-001 | Open `dashboard.html`. In ≤ 10 s identify student name, current level, current path, and one immediate next action. |
| SC-002 | Open all four pages from the file explorer. Each reaches first meaningful paint within 5 s. Confirm no `console-blocking` errors in DevTools. |
| SC-003 | Resize the browser to 375 / 768 / 1024 / 1280 px. Confirm no horizontal page-level scrollbar on any of the four pages. |
| SC-004 | Count distinct status badge variants used across the four pages. Must be ≥ 12 from the Spec 001 19-badge catalog. Use: `grep -oP 'bg-(success\|danger\|warning\|info\|accent\|slate\|primary)-100' pages/student/*.html \| sort -u`. |
| SC-005 | Run `grep -nE 'lorem\|Item [0-9]\|TBD\|Course [0-9]\|Student [0-9]' pages/student/dashboard.html pages/student/learning-journey.html pages/student/weekly-plan.html pages/student/notifications.html` — must return zero matches. |
| SC-006 | Run an Arabic-Indic digit grep — must return zero matches. |
| SC-007 | Run `grep -nE 'innerHTML\|createElement\|outerHTML\|insertAdjacentHTML\|document\.write' assets/js/main.js` — must return zero matches (carry-over from Spec 001). |
| SC-008 | Open `dashboard.html`, scan position-2 Parent Confidence Snapshot. A parent must be able to summarize attendance %, homework %, last note, next evaluation date in one breath. |
| SC-009 | Open `learning-journey.html`. Count timeline `<li>` entries — must be ≥ 9 in chronological order; the current milestone (Level 3 start) is visually distinct. |
| SC-010 | Open `weekly-plan.html`. Count content blocks — must be 9, each with ≥ 2 specific items. |
| SC-011 | Open `notifications.html`. Count notifications — must be ≥ 8 spanning all 6 types; read/unread distinction visible by 3 axes (border-start + dot + weight). |
| SC-012 | Side-by-side compare any of the four pages with the Spec 001 baseline — header height, sidebar entries, dark-navy color, design tokens identical (plus the two new sidebar entries). |

## File checklist

Created or edited by this feature:

- [ ] `pages/student/dashboard.html` — full content rewrite (10 blocks per `contracts/student-dashboard-blocks.md`)
- [ ] `pages/student/learning-journey.html` — created (per `contracts/learning-journey.md`)
- [ ] `pages/student/weekly-plan.html` — created (per `contracts/weekly-plan.md`)
- [ ] `pages/student/notifications.html` — created (per `contracts/notifications-inbox.md`)
- [ ] `assets/css/output.css` — rebuilt via `npm run build:css` if any new utility classes used

Not touched:

- `assets/js/main.js` (zero new JS per FR-065)
- `tailwind.config.js`
- `assets/css/input.css`
- All other-role pages and sidebars
- `pages/ui-kit.html`, `index.html`

## Common pitfalls

- **Sidebar drift between pages**: All four pages embed the same student sidebar. Edit once in your editor, paste to all four. Diff them after every change to catch drift early.
- **Header bell still a `<button>`**: Replace with `<a href="notifications.html">` per `contracts/student-shell-delta.md` §3 on every redesigned/created page.
- **Color-only status indicators**: Every badge / dot / row state MUST pair color with text or icon. If a reviewer can identify the meaning by squinting (color-blind simulation), it fails FR-035.
- **Latin digits inside Arabic text**: Use `1 2 3`, never `١ ٢ ٣`. Run the SC-006 grep before declaring done.
- **Empty blocks on weekly plan**: Every one of the 9 blocks must have ≥ 2 items. Empty-state markup is documented but not exercised on this page.
