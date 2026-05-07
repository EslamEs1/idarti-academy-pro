# Implementation Plan: Frontend Foundation, Design System, and App Shell

**Branch**: `001-frontend-foundation` | **Date**: 2026-05-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-frontend-foundation/spec.md`

## Summary

Deliver six static, browser-openable HTML pages — `index.html` (mock login / role-selection), `pages/ui-kit.html`, and a dashboard shell for each of the four primary roles (Student, Parent, Teacher, Admin) — built with TailwindCSS (compiled via the official CLI from `assets/css/input.css` to `assets/css/output.css`) and a minimal vanilla JavaScript file (`assets/js/main.js`) that handles only sanctioned UI affordances: the mobile sidebar drawer, dropdowns, modals, and tabs. All pages render Arabic-first with `dir="rtl"`; no RTL/LTR toggle, no frameworks, no APIs, no JS-rendered content. A `components/` folder holds reference partials for the shared header and per-role sidebar; final pages embed copies of those partials so every page remains a self-contained static file.

## Technical Context

**Language/Version**: HTML5; CSS via TailwindCSS 3.4.x (LTS, broad browser coverage, supports `rtl:` / `ltr:` modifiers natively); ES2020 vanilla JavaScript (no transpiler).
**Primary Dependencies**: `tailwindcss` (devDependency only, used solely for CSS generation). `@tailwindcss/forms` (better default form styling). No runtime JS dependencies. Fonts loaded from Google Fonts CDN (Tajawal, optional Cairo fallback) with system fallbacks.
**Storage**: N/A — static prototype. All "data" is hard-coded Arabic sample content embedded directly in the HTML pages.
**Testing**: Manual visual review against the 10 success criteria in `spec.md` plus the per-page acceptance scenarios in user stories US1–US4. Browser-based responsive validation at ~375 / ~768 / ~1280 px. No automated test framework is in scope per the prototype nature of the deliverable.
**Target Platform**: Modern evergreen browsers (latest Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile. Pages MUST open via `file://` URLs without a dev server.
**Project Type**: Single static frontend project at repository root (no backend pairing).
**Performance Goals**: Each page loads and renders to first meaningful paint within ~1 s on a typical mid-range laptop opening from disk; compiled `output.css` ≤ 80 KB minified (Tailwind purge enabled, only utilities used in HTML are emitted); zero runtime JS frameworks; total JS payload ≤ 5 KB minified.
**Constraints**: No frontend framework, no backend, no real or mocked API, no JS-driven content rendering, no `#` placeholder links (FR-041), no Eastern Arabic-Indic digits (FR-043), no RTL/LTR toggle (FR-008), Arabic + RTL only.
**Scale/Scope**: 6 pages, 4 role sidebars (14 / 11 / 12 / 19 entries), 1 unified header, ~21 UI-kit component categories, 19 status badge styles, ~30 unique sample-data records distributed across the four dashboards.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Each principle from the project constitution v1.0.0 is evaluated against this plan. **All gates pass; no violations recorded.**

| Principle | Gate Question | Status | Notes |
|-----------|--------------|--------|-------|
| I. Static-First, Framework-Free Delivery | Does the plan use only HTML, TailwindCSS, and minimal vanilla JS, with no banned frameworks (React/Vue/Angular/Svelte/Next/Nuxt/Alpine/jQuery), no backend, and no APIs? | ✅ PASS | Tailwind CLI is the only build tool, used solely for CSS generation. Pages remain openable via `file://`. |
| II. Pages Are Complete and Self-Contained | Does every delivered page contain its own concrete content, with the Header and Sidebar embedded (not server-included or JS-injected)? | ✅ PASS | `components/` folder holds reference partials; each final page embeds a hard-copied instance. No JS content generation. |
| III. Arabic-First, RTL-Primary | Do all pages set `dir="rtl"` at document level and use realistic Saudi-Arabic copy? | ✅ PASS | All six pages ship Arabic + RTL only. Latin digits inside Arabic copy per FR-043. |
| IV. Trust, Motivation, Premium Educational Tone | Does the plan codify the constitution's color palette, badge vocabulary, and educational visual language? | ✅ PASS | `tailwind.config.js` extends theme with custom navy/gold/green/amber/red/info tokens; UI kit covers all 19 badges. |
| V. Minimal, Justified JavaScript | Is JS limited to sidebar drawer, dropdown, modal, tabs? No content rendering. | ✅ PASS | `assets/js/main.js` implements exactly those four interaction handlers. No accordion needed in this spec; RTL toggle deferred per Q2. |
| VI. Reflect Real Business Rules in the UI | Do the dashboards visually represent family balances, teacher finance, VAT, multi-role, and SAR/EGP currency? | ✅ PASS | Admin sidebar exposes Tax Settings / Family Balances / Teacher Finance / Roles & Permissions; Parent dashboard shows SAR currency; Admin shows revenue/invoices. Deeper flows ship in later specs. |

**Constitution Check result**: PASS. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-frontend-foundation/
├── plan.md              # This file
├── research.md          # Phase 0 output: deferred-clarify decisions resolved
├── data-model.md        # Phase 1 output: visual entities & sample-data shape
├── quickstart.md        # Phase 1 output: how to build CSS and open pages
├── contracts/           # Phase 1 output: UI/structural contracts
│   ├── app-shell.md             # header + sidebar + main wrapper layout contract
│   ├── sidebar-navigation.md    # exact nav entries per role with target paths
│   ├── design-tokens.md         # color/typography/spacing/badge tokens
│   ├── ui-kit-inventory.md      # required components on pages/ui-kit.html
│   └── dashboard-shells.md      # required cards per role dashboard
├── checklists/
│   └── requirements.md  # spec quality checklist (already exists)
└── tasks.md             # Phase 2 output (created by /speckit-tasks)
```

### Source Code (repository root)

This is a static frontend project at the repo root. No `src/` or `tests/` trees — every deliverable is a static page or a build artifact.

```text
.
├── index.html                          # mock login / role-selection screen
├── pages/
│   ├── ui-kit.html                     # design system preview
│   ├── student/
│   │   └── dashboard.html              # student shell dashboard
│   ├── parent/
│   │   └── dashboard.html              # parent shell dashboard
│   ├── teacher/
│   │   └── dashboard.html              # teacher shell dashboard
│   └── admin/
│       └── dashboard.html              # admin shell dashboard
├── components/                         # REFERENCE partials only (not loaded at runtime)
│   ├── header.html                     # canonical header markup, copied into each page
│   ├── student-sidebar.html            # canonical student sidebar markup
│   ├── parent-sidebar.html
│   ├── teacher-sidebar.html
│   └── admin-sidebar.html
├── assets/
│   ├── css/
│   │   ├── input.css                   # Tailwind directives + custom layer rules
│   │   └── output.css                  # compiled, committed; referenced by every page
│   └── js/
│       └── main.js                     # sidebar drawer + dropdown + modal + tabs
├── tailwind.config.js                  # theme extensions (colors, fonts, breakpoints)
├── postcss.config.js                   # autoprefixer for older mobile browsers
├── package.json                        # devDependencies + build scripts only
├── package-lock.json
└── .gitignore                          # ignore node_modules; track output.css
```

**Structure Decision**: A single, flat static-site layout rooted at the repo. Pages live under `pages/<role>/` mirroring the URL structure already wired into the role sidebars (`pages/student/...`, `pages/parent/...`, `pages/teacher/...`, `pages/admin/...`), so future specs can drop new pages into the exact paths the sidebars already point at — zero rework. The `components/` folder is a *reference* repository for the canonical header and per-role sidebar markup; it is NOT loaded at runtime. Each final page embeds a hard-copied instance of its header and sidebar so the pages remain fully self-contained per Constitution Principle II. This is the only "abstraction" introduced by the plan, and it is explicitly an authoring convenience rather than a runtime mechanism.

**Compiled CSS is committed**: `assets/css/output.css` is checked in (despite being build output) so that every page is openable from disk without anyone running `npm install`. `node_modules/` is gitignored. Re-compile is a single `npm run build:css` invocation when Tailwind utilities change.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. Table omitted.
