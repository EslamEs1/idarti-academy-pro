# Implementation Plan: Achievements, Badges, Exams Passed, Levels Completed, and Certificates Frontend

**Branch**: `005-achievements-certificates` | **Date**: 2026-05-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-achievements-certificates/spec.md`

## Summary

Build eight new pages — six on the student side, two on the admin side — that finally fulfill every prior-spec promise about certificates, badges, monthly exams, completed levels, and the achievements hub. Spec 002's dashboard line 749 milestone ("نيل أول شهادة معتمدة"), Spec 002's learning-journey line 455 milestone ("نيل وسام بطل الواجبات"), Spec 003's my-courses completed-card "عرض الشهادة" CTA, the constitution's enumerated 19-badge catalog, and the admin sidebar's already-wired "الشهادات" entry all converge on this feature.

The eight pages are:

- `pages/student/achievements.html` — motivational hub with 4 summary counters (4 certs / 5 exams / 2 levels / 7 badges), featured certificate, recent achievement timeline, recent badges, and CTAs into each detail page.
- `pages/student/certificates.html` — grid of 4 certificate cards with **NO download button anywhere** (the design discipline locked by the user's brief).
- `pages/student/certificate-preview.html` — the parchment-styled preview that's the **ONLY** page with download/print/share buttons.
- `pages/student/monthly-exams-passed.html` — chronological list of 5 passed monthly exams.
- `pages/student/completed-levels.html` — 2 completed-level cards + a 50% path-progress bar + an in-progress L3 preview.
- `pages/student/badges.html` — 7 badge tiles covering the full catalog from the user's brief, with state-aware visibility-status chips.
- `pages/admin/certificates.html` — admin certificate-management table with **state-aware per-row actions** (Q1 clarification): pending rows show "إصدار" + active إلغاء; active rows show "إعادة إصدار" + active إلغاء; revoked rows show "إعادة تفعيل" + disabled إلغاء.
- `pages/admin/create-certificate.html` — 8-field form with Preview + Save + Cancel buttons (all visual stubs).

All eight pages reuse the existing app shell verbatim — student sidebar from Spec 002 (with "الإنجازات" as the active entry on the six new student pages) and admin sidebar from `pages/admin/dashboard.html` (with "الشهادات" as the active entry on both new admin pages) — plus the bell-as-anchor / search / profile header, Spec 001 design tokens, Tajawal Google Fonts CDN, and the Spec 001/002/003/004 19-badge catalog. **Zero new JavaScript** ships under this feature.

The single Q1 clarification resolved during `/speckit-clarify` locks the central admin design decision: the certificate management table's per-row actions are **state-aware**. The third action slot's label flips automatically per-row ("إصدار" on pending rows / "إعادة إصدار" on active rows / "إعادة تفعيل" on revoked rows), and the إلغاء action visually disables on revoked rows. The إصدار/إعادة إصدار/إعادة تفعيل tinting (success / info / accent) reinforces the state-driven UX.

The cross-page narrative is the spec's distinguishing pattern. Every count, every date, every grade reconciles with what the dashboard / learning-journey / my-courses / weekly-plan / Spec 004 already claim about Abdulrahman: 4 certificates earned (Quran L1 + L2 + Monthly Excellence March + Attendance Term 2), 5 monthly exams passed (Dec 2025 → Apr 2026, average 86.6%), 2 completed curriculum levels, and 7 badges earned. The featured certificate on the achievements hub is the Quran Level 1 completion certificate dated 5 يناير 2026 — exactly the date the dashboard already pins as "نيل أول شهادة معتمدة" milestone.

The download-only-inside-preview rule (FR-100, SC-002, SC-017) is the spec's most distinctive design discipline. It is enforced by greppable invariants: the only page with any download/print/share clickable element is `certificate-preview.html`. The certificates list page even carries a callout banner explaining the rule textually so reviewers understand the intent. Every other page in this feature contains zero download/print clickable elements.

## Technical Context

**Language/Version**: HTML5; CSS via TailwindCSS 3.4.x (already configured in repo); ES2020 vanilla JavaScript (zero new code added under this feature — `assets/js/main.js` remains at its Spec 001 baseline of ≤ 80 lines).
**Primary Dependencies**: Existing `tailwindcss` devDependency + `@tailwindcss/forms` + Tajawal Google Fonts CDN — all carried over from Specs 001-004. No new dependencies.
**Storage**: N/A — static prototype. All "data" (certificates, badges, exam scores, level dates, admin row inventory, form pre-fills) is hard-coded Arabic sample content embedded directly in each HTML page.
**Testing**: Manual visual review against the 17 success criteria in `spec.md` plus per-page acceptance scenarios in user stories US1–US8. Browser-based responsive validation at 375 / 768 / 1024 / 1280 px on each of the eight pages. No automated test framework in scope.
**Target Platform**: Modern evergreen browsers (latest Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile. Pages MUST open via `file://` URLs without a dev server. The `certificate-preview.html` page is also print-optimized via a `@media print` rule (FR-035).
**Project Type**: Continuation of the single static frontend project at the repository root. No new top-level directories; the `pages/admin/` directory already exists (currently holds only `dashboard.html`) and grows by two files under this feature.
**Performance Goals**: Each page reaches first meaningful paint within ~1 s on a typical mid-range laptop opening from disk; the eight new pages add ≤ 8 KB to the compiled `output.css` after `npm run build:css`, keeping the project well under the 80 KB CSS budget locked in Spec 001 (current size at the end of Spec 004 ≈ 53 KB → headroom ≈ 27 KB).
**Constraints**: No new JavaScript handlers (only the four sanctioned in Spec 001 carry over); no `href="#"` placeholder links (FR-097 / SC-009); no Eastern Arabic-Indic digits (FR-094 / SC-010); no JS-rendered content (FR-098 / SC-011); shell elements remain byte-identical to Spec 002 / Spec 003 / Spec 004 (FR-001..FR-006); no new badge variants beyond the existing catalog (FR-095); CSS budget ≤ 80 KB. The `certificate-preview.html` Download/Print/Share buttons are `<button type="button">` visual stubs with no real action (FR-032 / FR-033). The admin form on `create-certificate.html` has no `<form action>` — Save/Preview are `<button type="button">` stubs.
**Scale/Scope**: 8 pages (6 student + 2 admin); 0 new sidebar entries on either role (the student sidebar's "الإنجازات" entry already exists from Spec 002; the admin sidebar's "الشهادات" entry already exists in `pages/admin/dashboard.html`); 0 header changes (bell stays as `<a href="notifications.html">`); 8 entity types modeled in static HTML across the eight pages; ~120 unique sample-data records (4 student certs × 7 attributes; 7 badges × 6 attributes; 5 monthly exams × 7 attributes; 2 completed levels × 8 attributes; 6 timeline items × 4 attributes; ≥ 8 admin certs × 8 attributes; 8 form pre-fill values; the parchment certificate preview with all decorative elements). Persona continuity is enforced: same Abdulrahman / Quran path Level 3 / 5 يناير 2026 first-certificate anchor / 15 يناير 2026 Homework Hero anchor / الأستاذ أحمد بن عبد الله as the Quran teacher.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Each principle from the project constitution v1.0.1 is evaluated against this plan. **All gates pass; no violations recorded.**

| Principle | Gate Question | Status | Notes |
|-----------|--------------|--------|-------|
| I. Static-First, Framework-Free Delivery | Does the plan use only HTML, TailwindCSS, and (zero new) vanilla JS, with no banned frameworks, no backend, and no APIs? | ✅ PASS | Zero JS additions; pages remain openable via `file://`. Download / Print / Share / Save / Preview buttons are all `<button type="button">` with no form actions, no `<a download>` (FR-032 / FR-033 / FR-085). |
| II. Pages Are Complete and Self-Contained | Does every delivered page contain its own concrete content, with the Header and Sidebar embedded verbatim? | ✅ PASS | Each of the eight pages hard-embeds the appropriate sidebar partial (student or admin) + header + footer. Every cell of every certificate row, every badge tile, every form input is hard-coded sample data. |
| III. Arabic-First, RTL-Primary | Do all eight pages set `lang="ar" dir="rtl"` and use realistic Saudi-Arabic copy? | ✅ PASS | Every entity (certificates, badges, exam scores, completed-level cards, admin rows, form labels, decorative captions) is authored in Arabic with Latin digits per FR-094. The certificate preview uses Tajawal display weight for the persona's name in calligraphic style. |
| IV. Trust, Motivation, Premium Educational Tone | Does the plan reuse the navy/gold/green palette, the existing badge vocabulary, and the educational visual hierarchy? | ✅ PASS | Reuses Spec 001 design tokens; uses ≥ 30 distinct badge instances (SC-013); the parchment certificate preview is visually the most ornate surface in the entire app — gold borders, navy text, calligraphic name, decorative seal — embodying the academy's "trust" and "motivation" promises. The achievements hub is explicitly motivational ("اعرض تقدّمك بفخر لوالديك ومعلميك"). |
| V. Minimal, Justified JavaScript | Is JS limited to the four handlers from Spec 001 — drawer, dropdown, modal, tabs — with no new categories? | ✅ PASS | None of the eight pages introduces a new handler. The sidebar drawer (mobile burger) carries over verbatim. Tabs are not used on any of the eight pages — the certificates list uses visual-only filter chips (same pattern as Spec 003/004); the admin certificates list is a unified table with visual-only filter dropdowns. The certificate-preview page has zero JS interaction; the share/download/print actions are visual stubs. |
| VI. Reflect Real Business Rules in the UI | Do the eight pages reflect real academy business rules (certificate authenticity, admin oversight, badge gamification, parental visibility)? | ✅ PASS | This is the *primary purpose* of the feature: the parchment certificate preview operationalizes the academy's "trust" promise to parents; the state-aware admin actions (Q1 clarification → FR-075) operationalize the academy's certificate lifecycle (pending → active → revoked); the badge visibility-status mechanic operationalizes the student's privacy control over peer-visible achievements; the download-only-inside-preview rule operationalizes the academy's "view before owning" discipline. |

**Constitution Check result**: PASS. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/005-achievements-certificates/
├── plan.md              # This file
├── research.md          # Phase 0 output: clarification-resolved decisions + content sourcing
├── data-model.md        # Phase 1 output: 8 entity definitions + sample-data anchors
├── quickstart.md        # Phase 1 output: how to build and review the eight pages
├── contracts/           # Phase 1 output:
│   ├── achievements.md                # student hub — 4 summary cards + featured cert + timeline + 4 footer CTAs
│   ├── certificates.md                # 4 cert cards + callout banner enforcing the rule
│   ├── certificate-preview.md         # parchment certificate + 4-button action cluster + @media print
│   ├── monthly-exams-passed.md        # 5 exam rows + cumulative average
│   ├── completed-levels.md            # 2 completed-level cards + 50% path bar + in-progress L3 preview
│   ├── badges.md                      # 7 badge tiles with state-aware visibility chips
│   ├── admin-certificates.md          # admin queue with state-aware per-row actions (Q1 clarification)
│   └── admin-create-certificate.md    # 8-field form + Preview + Save + Cancel
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
│   │   ├── achievements.html              # C — 4 summary cards + featured cert + timeline + recent badges + 4 footer CTAs
│   │   ├── certificates.html              # C — 4 cert cards + callout banner ("download only in preview")
│   │   ├── certificate-preview.html       # C — large parchment + Download/Print/Share/Back action cluster + @media print
│   │   ├── monthly-exams-passed.html      # C — 5 exam rows + cumulative-average summary
│   │   ├── completed-levels.html          # C — 2 completed-level cards + path progress bar + L3 preview
│   │   └── badges.html                    # C — 7 badge tiles with visibility-status chips
│   └── admin/
│       ├── certificates.html              # C — admin queue with 4 summary cards + state-aware per-row actions + ≥8 rows
│       └── create-certificate.html        # C — 8-field form + Preview + Save + Cancel + prototype notice
├── assets/
│   └── css/
│       ├── input.css                      # E — add a single `@media print` block for the certificate-preview rule (FR-035)
│       └── output.css                     # R — re-built via `npm run build:css` to pick up the new print rule + page utilities
└── (no other files touched)
```

**Files explicitly NOT touched** by this feature:

- `assets/js/main.js` (zero new JS per FR-098 — line count remains at the Spec 001 baseline)
- `tailwind.config.js` (no new color/spacing tokens needed — the design surface is fully expressed in Spec 001's tokens)
- The student-sidebar partial baked into pages from Spec 002 (no new entries — "الإنجازات" already exists as the navigation anchor)
- The header partial baked into pages (already updated by Spec 002)
- The admin-sidebar partial baked into `pages/admin/dashboard.html` (no new entries — "الشهادات" already exists)
- The other two role sidebars (`parent`, `teacher`) — student + admin only feature
- All Spec 001 / 002 / 003 / 004 pages — only inbound links from those pages (e.g., dashboard's "عرض كل الإنجازات" → `achievements.html`, my-courses' completed-card "عرض الشهادة" → `achievements.html`, parent dashboard's "Certificates" sidebar → `certificates.html`, admin dashboard's "الشهادات" sidebar → `admin/certificates.html`) need to remain valid; no edits required because those CTAs already point to the right URLs

**Structure Decision**: Continue the flat static-site layout established by Specs 001/002/003/004. The 15-entry student sidebar and the bell-as-anchor header are hard-embedded into each of the six new student pages with the active-entry indicator set on "الإنجازات" per FR-002. The 18-entry admin sidebar (matching the constitution's enumeration) is hard-embedded into the two new admin pages with the active-entry indicator set on "الشهادات". No runtime include mechanism is introduced — the prototype remains pure static HTML.

**One small CSS edit** is required: a `@media print` block in `assets/css/input.css` to support the certificate-preview's print-friendly fallback (FR-035). This is the only edit to a non-page file under this feature; everything else is page creation. After the CSS edit, `npm run build:css` regenerates `assets/css/output.css`. No JavaScript handlers are added.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. This section is intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | (n/a) | (n/a) |
