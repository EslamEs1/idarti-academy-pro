# Quickstart: Frontend Foundation

**Feature**: `001-frontend-foundation`

This is a static prototype. There is no server, no API, no test runner. The only build step is compiling Tailwind utility classes into `assets/css/output.css`.

---

## Prerequisites

- **Node.js 18+** (only required to compile Tailwind CSS — not required to *view* the site).
- A modern browser (Chrome, Edge, Firefox, Safari).

You do **not** need a dev server. You do **not** need to run `npm install` if you only want to view the site — `assets/css/output.css` is committed.

---

## Open the prototype (no install required)

1. Clone the repo.
2. Open any of these files directly in a browser (double-click in the file explorer, or drag onto the browser window):
   - `index.html` — mock login / role-selection screen
   - `pages/ui-kit.html` — design system preview
   - `pages/student/dashboard.html`
   - `pages/parent/dashboard.html`
   - `pages/teacher/dashboard.html`
   - `pages/admin/dashboard.html`

Every page works from `file://`. Fonts are pulled from Google Fonts CDN; without internet they fall back to system Arabic (Segoe UI / Tahoma).

---

## Edit and recompile CSS (one-time setup)

If you change any HTML class or `tailwind.config.js`, regenerate `output.css`:

```bash
# 1. Install Tailwind (one time)
npm install

# 2. One-shot build (writes assets/css/output.css)
npm run build:css

# 3. Or watch mode while editing
npm run watch:css
```

`assets/css/output.css` is committed so reviewers without Node can still view the site.

---

## Project layout (cheat-sheet)

```text
.
├── index.html                          # mock login, links to all four roles + UI kit
├── pages/
│   ├── ui-kit.html                     # design system reference
│   ├── student/dashboard.html
│   ├── parent/dashboard.html
│   ├── teacher/dashboard.html
│   └── admin/dashboard.html
├── components/                         # reference partials (NOT loaded at runtime)
│   ├── header.html                     # canonical header — copy into each page
│   └── *-sidebar.html                  # one per role
├── assets/css/
│   ├── input.css                       # Tailwind directives + custom layer rules
│   └── output.css                      # compiled, committed
├── assets/js/main.js                   # sidebar drawer + dropdown + modal + tabs
├── tailwind.config.js                  # color/font/breakpoint extensions
├── package.json                        # devDependencies + build scripts only
└── specs/001-frontend-foundation/      # this spec, plan, and contracts
```

---

## How to add a new page

The static-site authoring workflow:

1. Create the new HTML file at the planned path (e.g., `pages/student/assignments.html`).
2. Open `components/header.html` and `components/student-sidebar.html`. Copy their contents into the new page's `<aside>` and `<header>` slots respectively. (See `contracts/app-shell.md` for the document skeleton.)
3. In the sidebar copy, change the matching nav `<li>` to carry the `is-active` class and `aria-current="page"`.
4. Update the `<title>` and the header's `pageTitleAr`/`pageSubtitleAr`.
5. Adjust the relative paths to `assets/css/output.css` and `assets/js/main.js` based on the page's depth (e.g., `../../assets/...` for a page at `pages/<role>/`).
6. Author the page content using only the components documented in `pages/ui-kit.html`.
7. Run `npm run build:css` to ensure any new utility classes you used are emitted into `output.css`.
8. Open the file in the browser and verify against the relevant contract document in `contracts/`.

---

## Validating the prototype against this spec

The deliverable is "done" when, for each of the 10 success criteria in `spec.md`, you can demonstrate the criterion by opening pages in a browser:

| SC | How to validate |
|---|---|
| SC-001 | Open all 6 pages from the file explorer; confirm each loads <5 s with no console errors. |
| SC-002 | Open each role dashboard; ask a fresh reviewer to identify the role within 10 s. |
| SC-003 | On each dashboard, click every sidebar entry; confirm URL targets match `data-model.md § E5` and there are zero `#` links. |
| SC-004 | On `pages/ui-kit.html`, count component categories against `contracts/ui-kit-inventory.md`. |
| SC-005 | Resize browser to 375, 768, 1280; confirm no horizontal page-level scrollbar appears on any of the 5 in-app pages. |
| SC-006 | At 375 px, on each dashboard, click the burger and the close button; time both interactions. |
| SC-007 | Spot-check every page for lorem ipsum, "Item 1", or empty tables. None should exist. |
| SC-008 | Verify `dir="rtl"` on `<html>`; check sidebar is on the right edge; verify breadcrumb chevrons in UI Kit point left (toward the start of the trail in RTL); verify Arabic body text uses `leading-7`. |
| SC-009 | Open all 4 dashboards in adjacent tabs and visually compare card style, badge style, header layout. |
| SC-010 | On UI kit Badges section, count rendered badges. Must be ≥ 18. |

---

## Troubleshooting

- **"Fonts look wrong / falling back to default"**: You're offline. Tajawal is loaded from Google Fonts. Either go online or self-host woff2 in `assets/fonts/` (see `research.md § R3` alternatives).
- **"Page styling is broken"**: `output.css` may be out of date. Run `npm run build:css`.
- **"Sidebar drawer doesn't open on mobile"**: Verify `assets/js/main.js` is loaded — check the relative path in the page's `<script src="...">`. Page depth matters: `index.html` uses `./assets/js/main.js`; `pages/<role>/dashboard.html` uses `../../assets/js/main.js`.
- **"Active sidebar entry isn't highlighted"**: The `is-active` class and `aria-current="page"` must be hard-coded on the matching `<li>` of each page's copy of the sidebar. There is no JS that detects URL — see `research.md § R9`.
