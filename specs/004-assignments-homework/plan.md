# Implementation Plan: Assignments and Homework Frontend

**Branch**: `004-assignments-homework` | **Date**: 2026-05-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-assignments-homework/spec.md`

## Summary

Build six new pages — four on the student side and two on the teacher side — that close the homework loop the entire إدارتي platform has been pointing at: `pages/student/assignments.html`, `pages/student/assignment-details.html`, `pages/student/submit-assignment.html`, `pages/student/submission-feedback.html`, `pages/teacher/homework-review.html`, and `pages/teacher/homework-submission-details.html`. Every navigation link to `assignments.html` (already shipped from Specs 001/002/003 across the dashboard, weekly plan, learning journey, my-courses, course-details, live-session-details, browse-courses, notifications, and live-sessions pages) and the teacher dashboard's existing link to `homework-review.html` will finally resolve to a real destination after this feature ships.

All six pages reuse the existing app shell verbatim — the 15-entry student sidebar from Spec 002 (with "الواجبات" as the active entry on the four student pages) and the two-entry teacher sidebar from the teacher dashboard (with "مراجعة الواجبات" as the active entry on the two teacher pages) — plus the bell-as-anchor header, the Spec 001 design tokens, the existing Tajawal Google-Fonts CDN, and the Spec 001/002/003 19-badge catalog. **Zero new JavaScript** ships under this feature: every page's interactive surface (radio cards, checklists with pre-checked/unchecked states, lists with `+ إضافة نقطة` controls, audio play stubs, tag chips) is rendered as static markup. The only sanctioned JS interactions remain the Spec 001 four — sidebar drawer / dropdown / modal / `data-tabs` — and none of the six pages requires any of them beyond the sidebar drawer that is already wired into the shell.

The three clarifications resolved during `/speckit-clarify` lock the central narrative choices: (Q1) the four Quran-axis scores (الحفظ / التجويد / النطق / الطلاقة) are diagnostic per-skill detail and the overall final grade is a separate holistic teacher judgment — an explanatory caption on the student feedback page and the teacher grading form makes the relationship explicit so the apparent ~72.5 vs 65 gap reads as intentional; (Q2) the teacher-only status options "مقبول مع ملاحظات" and "تأجيل المراجعة" collapse to existing student-side values ("مقبول" + notes; "قيد المراجعة" respectively) — no new student-side filter chips, pills, or row variants are added; (Q3) the "جديد" filter chip means assignments posted within the last 48 hours that the student hasn't acted on yet, while "مطلوب التسليم" means assignments older than 48 hours with the deadline approaching — both are visually distinct, both demand action, and the "واجبات مطلوبة (3)" summary card sums across both.

The cross-page narrative is the spec's distinguishing pattern: the persona's pending submission ("تلاوة سورة الضحى مع تطبيق أحكام التجويد") appears with status "قيد المراجعة" on the student's `assignments.html` AND as the first/second row of the teacher's `homework-review.html` queue (status "بانتظار المراجعة") AND as the focused submission on `homework-submission-details.html` — same student, same assignment, same timestamp, same attempt number. The featured resubmission case ("تطبيق أحكام الميم الساكنة من سورة البقرة الآيات 1-10") appears with status "يحتاج تعديل" on the student's index AND as the resubmission narrative on `assignment-details.html` AND as the prior-attempt ribbon on `submission-feedback.html` — same assignment, same teacher (الأستاذ أحمد العمري), same Quran-axis scores end-to-end.

## Technical Context

**Language/Version**: HTML5; CSS via TailwindCSS 3.4.x (already configured in repo); ES2020 vanilla JavaScript (zero new code added under this feature — `assets/js/main.js` remains at its Spec 001 baseline of ≤ 80 lines).
**Primary Dependencies**: Existing `tailwindcss` devDependency + `@tailwindcss/forms` + Tajawal Google Fonts CDN — all carried over from Spec 001/002/003. No new dependencies.
**Storage**: N/A — static prototype. All "data" (assignments, submissions, attempted-files, Quran scores, grading-form pre-fills, attached-materials list, audio durations) is hard-coded Arabic sample content embedded directly in each HTML page.
**Testing**: Manual visual review against the 15 success criteria in `spec.md` plus per-page acceptance scenarios in user stories US1–US6. Browser-based responsive validation at 375 / 768 / 1024 / 1280 px on each of the six pages. No automated test framework in scope.
**Target Platform**: Modern evergreen browsers (latest Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile. Pages MUST open via `file://` URLs without a dev server.
**Project Type**: Continuation of the single static frontend project at the repository root. No new top-level directories; the `pages/teacher/` directory already exists (currently holds only `dashboard.html`) and grows by two files under this feature.
**Performance Goals**: Each page reaches first meaningful paint within ~1 s on a typical mid-range laptop opening from disk; the six new pages add ≤ 6 KB to the compiled `output.css` after `npm run build:css`, keeping the project well under the 80 KB CSS budget locked in Spec 001 (current size at the end of Spec 003 ≈ 49 KB → headroom ≈ 31 KB).
**Constraints**: No new JavaScript handlers (only the four sanctioned in Spec 001 carry over); no `href="#"` placeholder links (FR-076 / SC-007); no Eastern Arabic-Indic digits (FR-073 / SC-008); no JS-rendered content (FR-077 / SC-009); shell elements remain byte-identical to Spec 002 / Spec 003 (FR-001..FR-006); no new badge variants beyond the Spec 001 19-badge catalog + Spec 002/003 type chips (FR-074); CSS budget ≤ 80 KB (Spec 001 carry-over). All form inputs on `submit-assignment.html` and `homework-submission-details.html` are visual stubs — no `<form>` action, no upload handlers, no save handlers (FR-035 / FR-065 explicit).
**Scale/Scope**: 6 pages (4 new student pages + 2 new teacher pages); 0 new sidebar entries on either role (Spec 002's student sidebar already includes "الواجبات" → `assignments.html`; the teacher dashboard already wires "مراجعة الواجبات" → `homework-review.html`); 0 header changes (bell stays as `<a href="notifications.html">` for student pages and as a placeholder link for teacher pages — same convention as the Spec-002 teacher dashboard); 9 entity types modeled in static HTML across the six pages; ~80 unique sample-data records (student-side: 9 assignment rows + 5 summary cards + 9 status filter chips + 4 secondary filter dropdowns + 1 featured Quran-detail page with 5 attached materials × 4 attribute types + 1 submit page with 7 method blocks × 5 checklist items + 1 feedback page with 4 Quran-axis cards + 1 resubmission panel; teacher-side: 8 queue rows + 4 summary cards + 4 secondary filter dropdowns + 1 featured submission-detail page with full grading form + Quran evaluation form). Persona continuity is enforced: same Abdulrahman / family-balance 750 ر.س / Quran path Level 3 / primary teacher الأستاذ أحمد العمري anchors as in Specs 001/002/003.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Each principle from the project constitution v1.0.1 is evaluated against this plan. **All gates pass; no violations recorded.**

| Principle | Gate Question | Status | Notes |
|-----------|--------------|--------|-------|
| I. Static-First, Framework-Free Delivery | Does the plan use only HTML, TailwindCSS, and (zero new) vanilla JS, with no banned frameworks, no backend, and no APIs? | ✅ PASS | Zero JS additions; pages remain openable via `file://`. Submit and Save buttons are `<button type="button">` with no form actions (FR-035 / FR-065). |
| II. Pages Are Complete and Self-Contained | Does every delivered page contain its own concrete content, with the Header and Sidebar embedded verbatim? | ✅ PASS | Each of the six pages hard-embeds the appropriate sidebar partial (student or teacher) + header (bell-as-anchor) + footer. No JS injection. Every cell of every assignment row is hard-coded sample data. |
| III. Arabic-First, RTL-Primary | Do all six pages set `lang="ar" dir="rtl"` and use realistic Saudi-Arabic copy? | ✅ PASS | Every entity (assignments, teachers, students, sub-tasks, Quran briefs, feedback quotes, grading captions) is authored in Arabic with Latin digits per FR-073. Saudi/GCC names used throughout the teacher queue (FR-055). |
| IV. Trust, Motivation, Premium Educational Tone | Does the plan reuse the navy/gold/green palette, the existing badge vocabulary, and the educational visual hierarchy? | ✅ PASS | Reuses Spec 001 design tokens; uses ≥ 25 distinct badge instances (SC-011); foregrounds the Quran-axis evaluation rubric (FR-044 / FR-064) as the page's distinguishing signal of teaching seriousness — the primary academy promise. |
| V. Minimal, Justified JavaScript | Is JS limited to the four handlers from Spec 001 — drawer, dropdown, modal, tabs — with no new categories? | ✅ PASS | None of the six pages introduces a new handler. The sidebar drawer (mobile burger) carries over verbatim. Tabs are not used on any of the six pages — the index/queue lists are unified tables filtered by visual chips, not tabs. |
| VI. Reflect Real Business Rules in the UI | Do the six pages reflect real academy business rules (Quran evaluation rubric, attempts/resubmission limits, status taxonomy, teacher-student status mapping)? | ✅ PASS | This is the *primary purpose* of the feature: the four-axis Quran rubric (memorization / tajweed / pronunciation / fluency) operationalizes the academy's "we follow up seriously on Quran study" promise; FR-074 enforces the teacher-only → student-side status mapping; FR-070 anchors the persona end-to-end. |

**Constitution Check result**: PASS. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/004-assignments-homework/
├── plan.md              # This file
├── research.md          # Phase 0 output: clarification-resolved decisions + content sourcing
├── data-model.md        # Phase 1 output: 9 entity definitions + sample-data anchors
├── quickstart.md        # Phase 1 output: how to build and review the six pages
├── contracts/           # Phase 1 output:
│   ├── assignments.md                 # student index — 5 summary cards + 9 status chips + 4 filters + ≥9 rows
│   ├── assignment-details.md          # featured Quran resubmission case — meta-strip + Quran brief + history
│   ├── submit-assignment.md           # 7 submission-method blocks + checklist + visual Submit
│   ├── submission-feedback.md         # 4 Quran axes + strengths/improvements + resubmit panel
│   ├── homework-review.md             # teacher queue — 4 summary cards + 4 filters + ≥8 rows
│   └── homework-submission-details.md # teacher grading form — full Quran evaluation form + 5-option status selector
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
│   │   ├── assignments.html             # C — 5 summary cards + 9 filter chips + 4 dropdowns + ≥9 rows (table desktop / cards mobile)
│   │   ├── assignment-details.html      # C — featured Quran resubmission (الميم الساكنة) + 5 attached materials + Quran brief + history
│   │   ├── submit-assignment.html       # C — assignment summary + 7 submission methods + checklist + student-note + visual Submit
│   │   └── submission-feedback.html     # C — meta-strip + teacher quote + strengths/improvements + 4-axis Quran rubric + resubmit panel
│   └── teacher/
│       ├── homework-review.html         # C — 4 summary cards + 4 filter dropdowns + search + ≥8 queue rows (table desktop / cards mobile)
│       └── homework-submission-details.html # C — 2-column layout (context / grading form) + Quran evaluation form + 5-option status selector
├── assets/
│   └── css/
│       └── output.css                   # R — re-built via `npm run build:css` to pick up any new utility classes
└── (no other files touched)
```

**Files explicitly NOT touched** by this feature:

- `assets/js/main.js` (zero new JS per FR-077 — line count remains at the Spec 001 baseline)
- `tailwind.config.js` (no new color/spacing tokens needed — the design surface is fully expressed in Spec 001's tokens)
- `assets/css/input.css` (no new layer rules needed)
- The student-sidebar partial baked into pages from Spec 002 (no new entries — "الواجبات" already exists as the navigation anchor)
- The header partial baked into pages (already updated by Spec 002)
- The teacher-sidebar partial baked into `pages/teacher/dashboard.html` (no new entries — "مراجعة الواجبات" already exists)
- The other two role sidebars (`parent`, `admin`) — student + teacher only feature
- All Spec 001 / 002 / 003 pages — only inbound links from those pages (e.g., dashboard's "عرض كل الواجبات" → `assignments.html`, weekly-plan's "عرض الواجب" → `assignments.html`, teacher dashboard's "فتح قائمة التصحيح" → `homework-review.html`) need to remain valid; no edits required because those CTAs already point to the right URLs

**Structure Decision**: Continue the flat static-site layout established by Specs 001/002/003. The 15-entry student sidebar and the bell-as-anchor header are hard-embedded into each of the four new student pages with the active-entry indicator set on "الواجبات" per FR-002. The two-entry teacher sidebar (Dashboard + Homework Review) is hard-embedded into the two new teacher pages with the active-entry indicator set on "مراجعة الواجبات" per FR-002. No runtime include mechanism is introduced — the prototype remains pure static HTML.

No JavaScript handlers are added. The six pages render as fully static HTML and reuse the existing sidebar-drawer handler from Spec 001's `assets/js/main.js` for the mobile burger menu only. Tabs, dropdowns, and modals are NOT used on any of the six pages — the index/queue lists are unified tables filtered by visual chips, the assignment-details page is a single scroll, the submit page is a single scroll, the feedback page is a single scroll, the teacher submission-details page is a two-column scroll. This keeps the page complexity well below the budget of the four sanctioned interactions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. This section is intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | (n/a) | (n/a) |
