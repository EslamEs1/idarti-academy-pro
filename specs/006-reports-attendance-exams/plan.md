# Implementation Plan: Reports, Attendance, and Exams Frontend

**Branch**: `006-reports-attendance-exams` | **Date**: 2026-05-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-reports-attendance-exams/spec.md`

## Summary

Build eight new pages — five on the student side, two on the parent side, one on the teacher side — that finally fulfill every prior-spec promise about the academy's reporting layer. The student dashboard, weekly-plan, and learning-journey sidebars already link to `reports.html` and `exams.html`; the parent dashboard already links to `my-children.html`, `child-reports.html`, and `attendance.html`; the teacher dashboard already links to `student-reports.html` and `attendance.html`. None of those destinations exist today — every link 404s. Spec 006 ships them.

The eight pages are:

- `pages/student/reports.html` — multi-month performance hub with a 6-month chip selector, 5 summary cards (active classes / attendance / homework / quiz avg / overall progress), and a per-course detail table with 3 active courses.
- `pages/student/monthly-report.html` — single-month report card with a parchment-style header, "ممتاز 89/100" overall evaluation, four mini-summaries, ≥ 3 teacher-note quotes, three reflection panels (strengths / improvements / next-month plan), parent-summary paragraph, and Download/Print/Share visual stubs.
- `pages/student/attendance.html` — 6-card summary, an inline static SVG 5-month trend chart, the four named status badges (حاضر / غائب / متأخر / معذور), and an attendance table with ≥ 8 rows covering all four statuses.
- `pages/student/exams.html` — comprehensive exam hub with 3 tabs ("اختبارات قادمة" / "اختبارات مكتملة" / "اختبارات شهرية") wired to the existing main.js tabs handler. The third tab renders the same 5 monthly rows as Spec 005's `monthly-exams-passed.html` (Q2 inclusive-hub resolution).
- `pages/student/exam-details.html` — single-exam deep-dive with parchment-tinted result panel ("95/100 — ممتاز"), category breakdown (حفظ / تجويد / فهم), strengths/weaknesses, teacher recommendations, and a related-certificate panel CTA → `certificate-preview.html`.
- `pages/parent/my-children.html` — 2 child cards (عبد الرحمن "ممتاز" + سارة "يحتاج إلى دعم") matching the parent dashboard's existing pin, each with 7 fields + a "View report" CTA.
- `pages/parent/child-reports.html` — parent-focused report with sibling-switcher, tri-state progress track (يحتاج إلى دعم — مستقر — متحسّن, with the متحسّن step active), 4 plain-language summaries, ≥ 2 teacher quotes, suggested-parent-action panel, and Download / WhatsApp visual stubs.
- `pages/teacher/student-reports.html` — teacher's authoring surface: read-only student-context strip, 3 evaluation panels (each with `<label for>`-paired input + status select + comment), general-notes textarea, recommendation panel, and 3 action buttons (Save / Save Draft / Cancel) — all visual stubs.

All eight pages reuse the existing app shells verbatim. Five student pages embed the 15-entry student sidebar — `reports.html` + `monthly-report.html` activate "التقارير"; `exams.html` + `exam-details.html` activate "الاختبارات"; `attendance.html` activates NO sidebar entry (the constitution v1.0.1 student sidebar has no "الحضور" entry — see research.md §R4 — so the breadcrumb "الرئيسية / التقارير / سجل الحضور" anchors back-navigation instead). Two parent pages embed the 11-entry parent sidebar (with "أبنائي" / "تقارير الأبناء" active). The teacher page embeds the 12-entry teacher sidebar (with "تقارير الطلاب" active). All header chrome (search / bell / profile dropdown) is identical to the prior-spec baseline. **Zero new JavaScript** ships under this feature.

The two clarifications resolved during `/speckit-specify` lock the central design decisions:

- **Q1 — Filename canon**: Match prior-spec links → `pages/parent/my-children.html`, `pages/parent/child-reports.html`, `pages/teacher/student-reports.html`. **Zero edits to prior-spec dashboards or sidebars are required**: every inbound `href` from Specs 001–005 lands on a real existing file the moment Spec 006 ships. The brief's singular alternates (`children.html`, `child-report.html`, `student-report.html`) are dropped in favor of the existing convention. Constitution v1.0.1 sidebar enumerations (My Children / Child Reports / Student Reports) line up unchanged.
- **Q2 — `exams.html` scope**: Inclusive hub. The "اختبارات شهرية" tab renders the same 5 monthly rows as Spec 005's `monthly-exams-passed.html` (December 2025 90% / January 78% / February 82% / March 95% Quran-L2-final / April 88%). Both surfaces co-exist on purpose: `exams.html` is the operational catalog (upcoming + completed + monthly side-by-side, filterable as one set), while `monthly-exams-passed.html` remains the achievement lens (passed-only, accessed from `achievements.html`). Both link to the same `exam-details.html`. Cross-spec reconciliation (FR-005 + FR-062) ensures dates / scores / status pills are byte-identical between the two pages.

The cross-page data reconciliation is the spec's distinguishing pattern. Every percentage, every score, every teacher quote on the persona's April 2026 report reconciles 1:1 across four lenses: the student's `monthly-report.html` (student lens), the parent's `child-reports.html` (parent lens), the teacher's `student-reports.html` (teacher-authoring lens), and the per-course row on `reports.html`. A reviewer reading all four pages MUST see exactly the same numbers and the same Arabic teacher feedback about the same student in the same month.

The "download / share / save / print / WhatsApp action" rule is the second distinctive design discipline (mirroring Spec 005's "download-only-on-preview" rule). These actions appear ONLY on the three report-canonical pages: `monthly-report.html`, `child-reports.html`, and `student-reports.html`. They MUST NOT appear on `reports.html`, `attendance.html`, `exams.html`, `exam-details.html`, or `my-children.html`. A grep-validatable invariant (SC-016) enforces the rule.

The persona family extends Spec 005 by introducing the sibling سارة مؤمن (already pinned on the parent dashboard line 232 — "الصف الثالث / يحتاج إلى دعم") and the Arabic-language teacher الأستاذة منى سعد (newly named here to fill the per-course report's second course row). The Quran teacher الأستاذ أحمد بن عبد الله and Islamic-Studies teacher الأستاذ خالد العبدلي continue from Spec 005 / Spec 003. The persona's grade level "الصف السادس" is locked by the parent dashboard's existing children pin.

## Technical Context

**Language/Version**: HTML5; CSS via TailwindCSS 3.4.x (already configured in repo); ES2020 vanilla JavaScript (zero new code added under this feature — `assets/js/main.js` remains at its Spec 001 baseline of ≤ 80 lines). No new dependencies introduced anywhere in the stack.
**Primary Dependencies**: Existing `tailwindcss` devDependency + `@tailwindcss/forms` + Tajawal Google Fonts CDN — all carried over from Specs 001–005. No new libraries, no charting library (the attendance trend visual is hand-authored inline SVG).
**Storage**: N/A — static prototype. All "data" (per-course rows, monthly evaluation values, teacher quotes, attendance sessions, exam rows + categories, sibling stats, child-report tri-state, evaluation form pre-fills) is hard-coded Arabic sample content embedded directly in each HTML page.
**Testing**: Manual visual review against the 18 success criteria in `spec.md` plus per-page acceptance scenarios in user stories US1–US8. Browser-based responsive validation at 375 / 768 / 1024 / 1280 px on each of the eight pages. Cross-spec reconciliation grep checks (SC-009 + SC-015 + SC-016 + SC-017) run as part of the Polish phase. No automated test framework in scope.
**Target Platform**: Modern evergreen browsers (latest Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile. Pages MUST open via `file://` URLs without a dev server. The `monthly-report.html` and `child-reports.html` pages are also print-optimized via an extension to the `@media print` rule that Spec 005 added to `assets/css/input.css`.
**Project Type**: Continuation of the single static frontend project at the repository root. No new top-level directories. The `pages/parent/` directory currently holds only `dashboard.html` and grows by two files (`my-children.html`, `child-reports.html`) under this feature; the `pages/teacher/` directory currently holds three files and grows by one (`student-reports.html`); the `pages/student/` directory grows by five (`reports`, `monthly-report`, `attendance`, `exams`, `exam-details`).
**Performance Goals**: Each page reaches first meaningful paint within ~1 s on a typical mid-range laptop opening from disk; the eight new pages add ≤ 8 KB to the compiled `output.css` after `npm run build:css`, keeping the project well under the 80 KB CSS budget locked in Spec 001 (current size at the end of Spec 005 = 60,976 bytes → headroom ≈ 19 KB before the 80 KB ceiling).
**Constraints**: No new JavaScript handlers (only the four sanctioned in Spec 001 carry over — sidebar drawer / dropdown / modal / tabs); the existing main.js tabs handler is reused for `exams.html` (FR-032). No `href="#"` placeholder links (FR-007 / SC-012); no Eastern Arabic-Indic digits (FR-006 / SC-013); no JS-rendered content (FR-002 / SC-011); no new badge variants beyond the existing catalog; CSS budget ≤ 80 KB. The Download/Print/Share/Save/WhatsApp buttons on the three report-canonical pages are `<button type="button">` visual stubs with no real action (FR-003 / FR-010); the cancel link on `student-reports.html` is a real `<a href="homework-review.html">`. The teacher form on `student-reports.html` has no `<form action>` — Save/Save-Draft are `<button type="button">` stubs. The attendance trend visual is inline SVG ≤ 80 LOC, no JS (FR-026).
**Scale/Scope**: 8 pages (5 student + 2 parent + 1 teacher); 0 new sidebar entries on any role (every sidebar entry referenced by this feature already exists in the constitution + prior-spec dashboards); 0 header changes; 7 entity types modeled in static HTML across the eight pages; ~150 unique sample-data records (5 summary cards × 4 metrics × 6 months ≈ 30 cell values; 3 active courses × 7 columns; 3+ teacher-note quote blocks × 4 attributes; ≥ 8 attendance rows × 6 columns; 5 monthly-exam rows × 7 attributes; 4 weekly/term-exam rows × 7 attributes; ≥ 2 upcoming exam cards × 6 attributes; 3+ exam-category rows × 4 attributes; 4 mini-summary cards × 4 attributes (parent lens); 3 evaluation panels × 4 fields each; 4-bullet next-month plan; ≥ 4 strengths bullets; ≥ 3 improvements bullets; tri-state track of 3 steps; 5-bar attendance-trend chart; sibling-switcher 2 chips; 6-month chip strip). Persona continuity: عبد الرحمن مؤمن (الصف السادس) + sibling سارة مؤمن (الصف الثالث) + parent + الأستاذ أحمد بن عبد الله (Quran) + الأستاذة منى سعد (Arabic, new) + الأستاذ خالد العبدلي (Islamic Studies). April 2026 = just-completed reporting month; May 2026 = in-progress month.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Each principle from the project constitution v1.0.1 is evaluated against this plan. **All gates pass; no violations recorded.**

| Principle | Gate Question | Status | Notes |
|-----------|--------------|--------|-------|
| I. Static-First, Framework-Free Delivery | Does the plan use only HTML, TailwindCSS, and (zero new) vanilla JS, with no banned frameworks, no backend, and no APIs? | ✅ PASS | Zero JS additions; pages remain openable via `file://`. Download / Print / Share / Save / WhatsApp buttons are `<button type="button">` with no form actions, no `<a download>`, no `wa.me/` deep links, no `navigator.share()` calls (FR-003 / FR-010 / Assumptions §WhatsApp stub). The attendance trend is hand-authored inline SVG ≤ 80 LOC (FR-026), no Chart.js / D3 / canvas. |
| II. Pages Are Complete and Self-Contained | Does every delivered page contain its own concrete content, with the Header and Sidebar embedded verbatim? | ✅ PASS | Each of the eight pages hard-embeds the appropriate role sidebar (5× student / 2× parent / 1× teacher) + header chrome + footer. Every cell of every per-course row, every attendance session, every exam-category breakdown, every form input pre-fill is hard-coded sample data. No `components/` runtime includes. |
| III. Arabic-First, RTL-Primary | Do all eight pages set `lang="ar" dir="rtl"` and use realistic Saudi-Arabic copy? | ✅ PASS | Every entity (per-course rows, teacher quotes, attendance notes, exam categories, parent summary paragraphs, suggested parent actions, behavior chips) is authored in Arabic with Latin digits per FR-006. The parent-summary on `monthly-report.html` and the parent-action on `child-reports.html` are explicitly written in plain, jargon-free Arabic for parent readability. |
| IV. Trust, Motivation, Premium Educational Tone | Does the plan reuse the navy/gold/green palette, the existing badge vocabulary, and the educational visual hierarchy? | ✅ PASS | Reuses Spec 001 design tokens; ≥ 30 distinct status badge instances across the 8 pages; the report-card-styled headers on `monthly-report.html` and `child-reports.html` echo Spec 005's parchment certificate aesthetic — establishing the "this is your child's official report" affordance the academy needs parents to trust. The tri-state progress track on the child-report page operationalizes "Improving / Stable / Needs Support" as a calm, parent-friendly visual signal. |
| V. Minimal, Justified JavaScript | Is JS limited to the four handlers from Spec 001 — drawer, dropdown, modal, tabs — with no new categories? | ✅ PASS | None of the eight pages introduces a new handler. The sidebar drawer (mobile burger) carries over verbatim. `exams.html` reuses the existing `data-tab` / `data-tabpanel` handler from Spec 002/003 with no new event listeners. The month-selector chip strip on `reports.html` and the sibling-switcher chip strip on `child-reports.html` are visual-only — clicking them MAY conceptually navigate via plain `<a href="?month=…">` placeholder links but does not require JS. The attendance trend chart is pure SVG. |
| VI. Reflect Real Business Rules in the UI | Do the eight pages reflect real academy business rules (multi-audience reporting, parent confidence, teacher authoring chain, attendance accountability)? | ✅ PASS | This is the *primary purpose* of the feature: the four-lens cross-page reconciliation operationalizes the academy's "what the teacher writes is what the parent reads" promise; the tri-state progress direction operationalizes the academy's parent-confidence rubric (Improving / Stable / Needs Support); the suggested-parent-action panel operationalizes the academy's "we don't just report, we recommend" stance; the four-named-attendance-status taxonomy (حاضر / غائب / متأخر / معذور) operationalizes the academy's nuanced absence policy (excused vs unexcused vs late vs present); the WhatsApp-share visual stub operationalizes the Saudi/Egyptian parental communication norm without violating Principle V. |

**Constitution Check result**: PASS. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/006-reports-attendance-exams/
├── plan.md              # This file
├── research.md          # Phase 0 output: clarification-resolved decisions + content sourcing + chart approach
├── data-model.md        # Phase 1 output: 7 entity definitions + sample-data anchors
├── quickstart.md        # Phase 1 output: how to build and review the eight pages
├── contracts/           # Phase 1 output:
│   ├── reports.md                      # student multi-month hub — month chips + 5 summary cards + per-course table
│   ├── monthly-report.md               # single-month report-card + 7 sections + 3-button cluster
│   ├── attendance.md                   # 6 summary cards + inline-SVG trend chart + ≥8-row table
│   ├── exams.md                        # 3 tabs (upcoming / completed / monthly) + ≥2 upcoming + ≥4 completed + 5 monthly rows
│   ├── exam-details.md                 # parchment-tinted result panel + 3-row category grid + strengths/weaknesses + recommendation + related-cert
│   ├── my-children.md                  # 2 child cards + sibling-aware status pills + secondary chips
│   ├── child-reports.md                # tri-state track + 4 plain-language summaries + suggested-parent-action + WhatsApp stub
│   └── student-reports.md              # read-only student strip + 3 evaluation panels + general-notes + recommendation panel + 3-button cluster
├── checklists/
│   └── requirements.md  # spec quality checklist (already exists, all 16 items pass)
└── tasks.md             # Phase 2 output (created by /speckit-tasks — not by /speckit-plan)
```

### Source Code (repository root)

This feature touches only existing trees — no new top-level directories. Files **created** (C), **edited** (E), or **rebuilt** (R) by this feature:

```text
.
├── pages/
│   ├── student/
│   │   ├── reports.html                  # C — month chips + 5 summary cards + per-course table + footer CTA
│   │   ├── monthly-report.html           # C — report-card header + overall-evaluation panel + 4 mini-summaries + 3 teacher quotes + 3 reflection panels + parent-summary + 3-button cluster
│   │   ├── attendance.html               # C — 6 summary cards + inline-SVG 5-month trend + ≥8-row session table + 4 named status badges
│   │   ├── exams.html                    # C — 3 filter dropdowns + 3 tabs wired via existing main.js + ≥2 upcoming + ≥4 completed + 5 monthly rows
│   │   └── exam-details.html             # C — parchment-tinted result panel + 3-row category grid + strengths/weaknesses + recommendation + related-cert CTA → certificate-preview.html
│   ├── parent/
│   │   ├── my-children.html              # C — 2 child cards (Abdulrahman ممتاز + Sara يحتاج إلى دعم) + secondary chips
│   │   └── child-reports.html            # C — sibling-switcher + tri-state progress track + 4 plain-language summaries + ≥2 teacher quotes + suggested-parent-action + 3-button cluster (Download / WhatsApp / Back)
│   └── teacher/
│       └── student-reports.html          # C — read-only student-context strip + 3 evaluation panels + general-notes + recommendation panel + 3-button cluster
├── assets/
│   └── css/
│       ├── input.css                     # E — extend Spec 005's `@media print` block: add hide-rules for the new report pages' sidebar / header / action cluster / prototype-notice. (Optional polish per Assumptions §Print CSS reuse — if the existing print rule already hides shell elements via class selectors that match, no edit is strictly required.)
│       └── output.css                    # R — re-built via `npm run build:css` to pick up any new utility classes
└── (no other files touched)
```

**Files explicitly NOT touched** by this feature:

- `assets/js/main.js` (zero new JS per FR-002 — line count remains at the Spec 001/005 baseline of 68 lines)
- `tailwind.config.js` (no new color/spacing tokens needed — the design surface is fully expressed in Spec 001's tokens; the WhatsApp-green chat icon uses existing `success-600` + `success-50` tokens with a small custom inline SVG)
- The student-sidebar partial baked into pages from Spec 002 (no new entries — "التقارير" and "الاختبارات" already exist as navigation anchors; "الإنجازات" is owned by Spec 005 pages, not this feature; the student sidebar has no dedicated "الحضور" entry per constitution v1.0.1, so `attendance.html` activates none — see research.md §R4)
- The header partial baked into pages (already updated by Spec 002)
- The parent-sidebar partial baked into `pages/parent/dashboard.html` (no new entries — "أبنائي" / "تقارير الأبناء" / "الحضور" already exist)
- The teacher-sidebar partial baked into `pages/teacher/dashboard.html` (no new entries — "تقارير الطلاب" already exists)
- The admin sidebar (admin pages are out of scope for this feature)
- All Spec 001 / 002 / 003 / 004 / 005 pages — only inbound links from those pages need to remain valid; no edits required because Q1's resolution (match prior-spec links) means every existing inbound `href` already points at the right new file
- `pages/parent/attendance.html` and `pages/teacher/attendance.html` — out of scope per the brief (one attendance page only); the prior-spec links to those filenames remain inherited 404s and are documented in spec §Out of scope

**Structure Decision**: Continue the flat static-site layout established by Specs 001–005. The 15-entry student sidebar is hard-embedded into each of the five new student pages with the active-entry indicator set per page: `reports.html` + `monthly-report.html` → التقارير; `exams.html` + `exam-details.html` → الاختبارات; `attendance.html` → no active entry (breadcrumb anchors back-navigation per research.md §R4). The 11-entry parent sidebar is hard-embedded into the two parent pages (active = أبنائي on `my-children.html`; active = تقارير الأبناء on `child-reports.html`). The 12-entry teacher sidebar is hard-embedded into the one teacher page (active = تقارير الطلاب). No runtime include mechanism is introduced — the prototype remains pure static HTML.

**One small (and optional) CSS edit** is contemplated: an extension to the `@media print` block already present in `assets/css/input.css` (added by Spec 005 for the certificate-preview page) so it ALSO hides shell elements on `monthly-report.html` and `child-reports.html` during print. If the existing rule's selectors are class-based and already cover the shell elements on the new pages, no edit is strictly required — the new pages can adopt the same class names. Phase 0 research confirms which path applies. After any CSS edit, `npm run build:css` regenerates `assets/css/output.css`. No JavaScript handlers are added.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. This section is intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | (n/a) | (n/a) |
