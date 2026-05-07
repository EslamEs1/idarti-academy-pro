# Implementation Plan: Student Dashboard and Learning Journey

**Branch**: `002-student-dashboard-journey` | **Date**: 2026-05-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-student-dashboard-journey/spec.md`

## Summary

Replace the placeholder student dashboard from Spec 001 with a complete, motivational, ten-block experience and add three new student pages — Learning Journey timeline, Weekly Plan, and Notifications inbox. All four pages reuse the existing app shell (header + sidebar) verbatim, the existing Tailwind design tokens, the existing 19 status badges, the existing four JS handlers, and Spec 001's locked sample-data anchors (Abdulrahman Mu'min, Quran path, Level 3, April 2026). The student sidebar gains exactly two new entries — "رحلتي التعليمية" and "خطة الأسبوع" — that propagate to every existing student page (currently only `pages/student/dashboard.html`). The header bell, currently a `<button>`, becomes an `<a href="notifications.html">` so the bell is the canonical entry point for the Notifications page. Zero new JavaScript ships under this feature.

## Technical Context

**Language/Version**: HTML5; CSS via TailwindCSS 3.4.x (already configured in repo); ES2020 vanilla JavaScript (no new code added under this feature).
**Primary Dependencies**: Existing `tailwindcss` devDependency + `@tailwindcss/forms` + Tajawal Google Fonts CDN — all carried over from Spec 001. No new dependencies introduced.
**Storage**: N/A — static prototype. All "data" is hard-coded Arabic sample content embedded directly in each HTML page (sessions, homework items, teacher notes, milestones, notifications, badges).
**Testing**: Manual visual review against the 12 success criteria in `spec.md` plus the per-page acceptance scenarios in user stories US1–US4. Browser-based responsive validation at 375 / 768 / 1024 / 1280 px. No automated test framework in scope.
**Target Platform**: Modern evergreen browsers (latest Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile. Pages MUST open via `file://` URLs without a dev server.
**Project Type**: Continuation of the single static frontend project at the repository root. No new top-level directories created.
**Performance Goals**: Each page reaches first meaningful paint within ~1 s on a typical mid-range laptop opening from disk; the four pages add ≤ 5 KB to the compiled `output.css` after `npm run build:css`, keeping the project under the 80 KB CSS budget locked in Spec 001 (~35 KB at the end of Spec 001 → headroom of ~45 KB).
**Constraints**: No new JavaScript handlers (only the four sanctioned in Spec 001 carry over); no `href="#"` placeholder links (FR-061); no Eastern Arabic-Indic digits (FR-060); no JS-rendered content (FR-062); shell elements remain byte-identical to Spec 001 (FR-001..FR-003); CSS budget ≤ 80 KB (Spec 001 carry-over).
**Scale/Scope**: 4 pages (1 redesign + 3 new); 2 new sidebar entries (added to the existing student sidebar); 1 header-bell tweak (`<button>` → `<a>`); 9 entity types modeled in static HTML across the four pages; ~50 unique sample-data records (8+ notifications, 9+ milestones, 4 weekly goals, 4 path levels, 6 metric cards, 3+ teacher notes, 3+ homework items, 3+ badges, 1 upcoming session, plus weekly plan items).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Each principle from the project constitution v1.0.1 is evaluated against this plan. **All gates pass; no violations recorded.**

| Principle | Gate Question | Status | Notes |
|-----------|--------------|--------|-------|
| I. Static-First, Framework-Free Delivery | Does the plan use only HTML, TailwindCSS, and (zero new) vanilla JS, with no banned frameworks, no backend, and no APIs? | ✅ PASS | Zero JS additions; pages remain openable via `file://`. |
| II. Pages Are Complete and Self-Contained | Does every delivered page contain its own concrete content, with the Header and Sidebar embedded verbatim from the Spec 001 components? | ✅ PASS | Each page hard-embeds the student-sidebar partial + header + footer. No JS injection, no shared runtime include. |
| III. Arabic-First, RTL-Primary | Do all four pages set `lang="ar" dir="rtl"` and use realistic Saudi-Arabic copy? | ✅ PASS | Every entity (notifications, teacher notes, milestones, weekly plan items, badges) is authored in Arabic with Latin digits per FR-060. |
| IV. Trust, Motivation, Premium Educational Tone | Does the plan reuse the navy/gold/green palette, the 19-badge vocabulary, and the educational visual hierarchy? | ✅ PASS | Reuses Spec 001 design tokens; uses ≥ 12 distinct badge variants (SC-004); highlights parent-confidence + student motivation per Principle IV intent. |
| V. Minimal, Justified JavaScript | Is JS limited to the four handlers from Spec 001 — drawer, dropdown, modal, tabs — with no new categories? | ✅ PASS | Per Q1 clarification, the notifications page is a static chronological list (no tabs needed); zero JS added. |
| VI. Reflect Real Business Rules in the UI | Do the four pages reflect real academy business rules (attendance %, homework commitment %, teacher feedback, monthly evaluation, payment context)? | ✅ PASS | Parent Confidence Snapshot exposes attendance + homework % + teacher quote + next evaluation; Notifications page includes payment/family type; teacher notes cover positive + improvement + Quran-specific dimensions. |

**Constitution Check result**: PASS. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-student-dashboard-journey/
├── plan.md              # This file
├── research.md          # Phase 0 output: clarification-resolved decisions + content sourcing
├── data-model.md        # Phase 1 output: 9 entity definitions + sample-data anchors
├── quickstart.md        # Phase 1 output: how to build and review the four pages
├── contracts/           # Phase 1 output:
│   ├── student-shell-delta.md       # what changes vs Spec 001's shell (sidebar entries, header bell)
│   ├── student-dashboard-blocks.md  # the 10 dashboard blocks with field-level contracts
│   ├── learning-journey.md          # timeline orientation + entry contract
│   ├── weekly-plan.md               # 9 plan blocks with item-level contract
│   └── notifications-inbox.md       # single chronological list contract + 6 type taxonomy
├── checklists/
│   └── requirements.md  # spec quality checklist (already exists)
└── tasks.md             # Phase 2 output (created by /speckit-tasks)
```

### Source Code (repository root)

This feature touches only existing trees — no new top-level directories. Files **created** (C), **edited** (E), or **rebuilt** (R) by this feature:

```text
.
├── pages/
│   └── student/
│       ├── dashboard.html             # E — full content rewrite (10 blocks, sidebar+header tweaks)
│       ├── learning-journey.html      # C — vertical timeline of ≥ 9 milestones
│       ├── weekly-plan.html           # C — 9 blocks (week range, goals, sessions, homework, reviews, exam prep, reminders, checklist, motivational note)
│       └── notifications.html         # C — single chronological list of ≥ 8 notifications
├── assets/
│   └── css/
│       └── output.css                 # R — re-built via `npm run build:css` to pick up any new utility classes
└── (no other files touched)
```

**Files explicitly NOT touched** by this feature:
- `assets/js/main.js` (zero new JS per FR-065)
- `tailwind.config.js` (no new color/spacing tokens needed)
- `assets/css/input.css` (no new layer rules needed; Spec 001's `.is-active` / `.is-open` carry forward)
- The other three role sidebars (`components/parent-sidebar.html`, `teacher-sidebar.html`, `admin-sidebar.html`) — sidebar entries added to **student** only per FR-066
- All other role dashboards and pages

**Structure Decision**: Continue Spec 001's flat static-site layout. The student sidebar partial in `components/student-sidebar.html` is updated once with two new entries; the canonical copy is then hard-embedded into each of the four student pages (one redesigned + three new). The header partial in `components/header.html` is updated to make the bell an `<a href="notifications.html">` instead of a `<button>` so the canonical bell-→-notifications wiring lives in one place; that updated header is hard-embedded into the same four pages. No runtime include mechanism is introduced — the prototype remains pure static HTML.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. Table omitted.
