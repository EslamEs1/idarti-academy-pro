# Implementation Plan: Courses and Live Sessions Frontend

**Branch**: `003-courses-sessions` | **Date**: 2026-05-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-courses-sessions/spec.md`

## Summary

Build six new student-facing pages that flesh out the catalog, enrollment, and live-session experience: `browse-courses.html`, `my-courses.html`, `course-details.html`, `live-sessions.html`, `live-session-details.html`, and `session-checkout-preview.html`. All six pages reuse the existing app shell (15-entry student sidebar + header with bell-as-anchor) verbatim from Spec 002, the existing Tailwind design tokens, the existing 19 status badges from Spec 001 + the Spec 002 session-type chips, and the existing four sanctioned JS handlers (drawer / dropdown / modal / **tabs**). The Tabs handler — already shipped in Spec 001 — is reused on `live-sessions.html` for the 3-tab structure (قادمة / مكتملة / فائتة). **Zero new JavaScript ships under this feature.** The dual-pricing narrative (Arabic vs Foreign student) and the dual-payment-model narrative (full-course subscription vs per-session bundle) are both fully expressed in static markup, anchored to the Abdulrahman / Quran-Level-3 persona locked since Spec 001 §E2 and reused throughout Spec 002.

The five clarifications resolved during `/speckit-clarify` lock down all major narrative choices: (Q1) viewer's matching price-rate is visually emphasized; (Q2) missed-tab is populated with ≥ 2 rows; (Q3) `course-details.html` showcases the Quran Level 3 course matching the persona's enrolled state; (Q4) `live-session-details.html` and `session-checkout-preview.html` both anchor to a supplementary "حزمة المراجعة الشهرية" 4-session bundle with the same teacher; (Q5) the bundle's checkout state shows partial family-balance coverage (200 ر.س applied, 145 ر.س due) so payment-method radios remain active.

## Technical Context

**Language/Version**: HTML5; CSS via TailwindCSS 3.4.x (already configured in repo); ES2020 vanilla JavaScript (zero new code added under this feature — the existing `data-tabs` handler from Spec 001 carries the 3-tab Live Sessions UI).
**Primary Dependencies**: Existing `tailwindcss` devDependency + `@tailwindcss/forms` + Tajawal Google Fonts CDN — all carried over from Spec 001/002. No new dependencies.
**Storage**: N/A — static prototype. All "data" (courses, sessions, teachers, prices, prep checklists, payment-method options) is hard-coded Arabic sample content embedded directly in each HTML page.
**Testing**: Manual visual review against the 14 success criteria in `spec.md` plus per-page acceptance scenarios in user stories US1–US6. Browser-based responsive validation at 375 / 768 / 1024 / 1280 px on each of the six pages. No automated test framework in scope.
**Target Platform**: Modern evergreen browsers (latest Chrome, Edge, Firefox, Safari) on desktop, tablet, and mobile. Pages MUST open via `file://` URLs without a dev server.
**Project Type**: Continuation of the single static frontend project at the repository root. No new top-level directories.
**Performance Goals**: Each page reaches first meaningful paint within ~1 s on a typical mid-range laptop opening from disk; the six new pages add ≤ 8 KB to the compiled `output.css` after `npm run build:css`, keeping the project well under the 80 KB CSS budget locked in Spec 001 (currently ~41 KB at the end of Spec 002 → headroom of ~39 KB).
**Constraints**: No new JavaScript handlers (only the four sanctioned in Spec 001 carry over); no `href="#"` placeholder links (FR-075 / SC-007); no Eastern Arabic-Indic digits (FR-071 / SC-008); no JS-rendered content (FR-076 / SC-009); shell elements remain byte-identical to Spec 002 (FR-001..FR-005); no new badge variants beyond the Spec 001 19-badge catalog + Spec 002 type chips (FR-072); CSS budget ≤ 80 KB (Spec 001 carry-over).
**Scale/Scope**: 6 pages (all new, no redesigns); 0 new sidebar entries (the three navigation roots — Browse Courses, My Courses, Live Sessions — already exist in Spec 002's 15-entry student sidebar; the three drill-down pages — Course Details, Live Session Details, Session Checkout Preview — show no active sidebar entry); 0 header changes (bell stays as `<a href="notifications.html">`); 14 entity types modeled in static HTML across the six pages; ~70 unique sample-data records (≥ 8 courses × dual pricing, ≥ 3 active enrollments + ≥ 1 completed, full Quran Level 3 curriculum + teacher profile + 4 session bundle, multiple per-tab live-sessions content, 8-row prep checklist + linked homework + recording state, full bundle checkout with 4 sessions × VAT × balance × payment methods).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Each principle from the project constitution v1.0.1 is evaluated against this plan. **All gates pass; no violations recorded.**

| Principle | Gate Question | Status | Notes |
|-----------|--------------|--------|-------|
| I. Static-First, Framework-Free Delivery | Does the plan use only HTML, TailwindCSS, and (zero new) vanilla JS, with no banned frameworks, no backend, and no APIs? | ✅ PASS | Zero JS additions; existing `data-tabs` handler powers the 3-tab Live Sessions UI. Pages remain openable via `file://`. |
| II. Pages Are Complete and Self-Contained | Does every delivered page contain its own concrete content, with the Header and Sidebar embedded verbatim from the Spec 002 components? | ✅ PASS | Each of the six pages hard-embeds the 15-entry student-sidebar partial + header (bell-as-anchor) + footer. No JS injection. |
| III. Arabic-First, RTL-Primary | Do all six pages set `lang="ar" dir="rtl"` and use realistic Saudi-Arabic copy? | ✅ PASS | Every entity (courses, sessions, teachers, prep checklists, payment methods, bundle items) is authored in Arabic with Latin digits per FR-071. |
| IV. Trust, Motivation, Premium Educational Tone | Does the plan reuse the navy/gold/green palette, the 19-badge vocabulary, and the educational visual hierarchy? | ✅ PASS | Reuses Spec 001 design tokens; uses ≥ 18 distinct badge instances (SC-011); foregrounds the parent-confidence section on `course-details.html` mirroring the dashboard pattern. |
| V. Minimal, Justified JavaScript | Is JS limited to the four handlers from Spec 001 — drawer, dropdown, modal, tabs — with no new categories? | ✅ PASS | The `data-tabs` handler is one of the four sanctioned categories — its reuse on `live-sessions.html` is explicitly within Principle V. No new JS handlers added. |
| VI. Reflect Real Business Rules in the UI | Do the six pages reflect real academy business rules (Arabic vs Foreign pricing, full-course vs per-session payment, family prepaid balance, VAT on invoices, certificate availability)? | ✅ PASS | This is the *primary purpose* of the feature: every page surfaces the dual-pricing rule (FR-016 emphasized + comparison line); the checkout-preview page operationalizes the family balance + 15% VAT pattern; my-courses cards visibly distinguish payment models (FR-023). |

**Constitution Check result**: PASS. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/003-courses-sessions/
├── plan.md              # This file
├── research.md          # Phase 0 output: clarification-resolved decisions + content sourcing
├── data-model.md        # Phase 1 output: 14 entity definitions + sample-data anchors
├── quickstart.md        # Phase 1 output: how to build and review the six pages
├── contracts/           # Phase 1 output:
│   ├── browse-courses.md            # hero + search + filters + 8-card grid contract
│   ├── my-courses.md                # active vs completed sections + per-card contract
│   ├── course-details.md            # all sections of the Quran Level 3 page contract
│   ├── live-sessions.md             # 3-tab structure + filter bar + row contract + list/calendar toggle
│   ├── live-session-details.md      # hero + actions + prep checklist + payment block contract
│   └── session-checkout-preview.md  # bundle summary + price calc + balance + payment methods contract
├── checklists/
│   └── requirements.md  # spec quality checklist (already exists, all 16 items pass)
└── tasks.md             # Phase 2 output (created by /speckit-tasks — not by /speckit-plan)
```

### Source Code (repository root)

This feature touches only existing trees — no new top-level directories. Files **created** (C), **edited** (E), or **rebuilt** (R) by this feature:

```text
.
├── pages/
│   └── student/
│       ├── browse-courses.html           # C — hero + search + 7+ filters + 8 course cards (dual pricing)
│       ├── my-courses.html               # C — 3+ active enrollments + 1+ completed + payment-model captions
│       ├── course-details.html           # C — Quran Level 3 (overview + curriculum + teacher + pricing matrix + enrolled state)
│       ├── live-sessions.html            # C — 3 tabs (قادمة/مكتملة/فائتة) + filter bar + list/calendar toggle + per-row + paid-session
│       ├── live-session-details.html     # C — bundle session #1 (hero + prep + homework + payment block + completed annotation)
│       └── session-checkout-preview.html # C — bundle summary + price calc + balance + payment methods + prototype notice
├── assets/
│   └── css/
│       └── output.css                    # R — re-built via `npm run build:css` to pick up any new utility classes
└── (no other files touched)
```

**Files explicitly NOT touched** by this feature:
- `assets/js/main.js` (zero new JS per FR-076 — the existing `data-tabs` handler from Spec 001 powers the live-sessions tabs)
- `tailwind.config.js` (no new color/spacing tokens needed — the design surface is fully expressed in Spec 001's tokens)
- `assets/css/input.css` (no new layer rules needed; Spec 001's `.is-active` / `.is-open` / `.is-active-tab` carry forward)
- `components/student-sidebar.html` (no new entries — all three navigation roots already shipped in Spec 002's 15-entry sidebar)
- `components/header.html` (already updated by Spec 002; bell remains `<a href="notifications.html">`)
- The other three role sidebars (`parent-sidebar.html`, `teacher-sidebar.html`, `admin-sidebar.html`) — student-only feature
- All other role pages (parent, teacher, admin)
- All Spec 002 pages (`dashboard.html`, `learning-journey.html`, `weekly-plan.html`, `notifications.html`) — only inbound links from Spec 002 (e.g., dashboard's "متابعة التعلم" CTA → my-courses) need to remain valid; no edits required because those CTAs already point to the right URLs

**Structure Decision**: Continue Spec 002's flat static-site layout. The 15-entry student sidebar and the bell-as-anchor header are hard-embedded into each of the six new pages with the active-entry indicator set per FR-002 (`browse-courses` highlights "استعراض الدورات"; `my-courses` highlights "دوراتي"; `live-sessions` highlights "الحصص المباشرة"; the three drill-down pages — course-details, live-session-details, session-checkout-preview — show NO active sidebar entry because they are drill-downs from the navigation-root pages). No runtime include mechanism is introduced — the prototype remains pure static HTML.

The 3-tab Live Sessions UI uses the existing `data-tabs="…"` + `data-tab-target` JS handler that ships in `assets/js/main.js` from Spec 001. The handler is one of the four sanctioned interactions in Principle V; reusing it for `live-sessions.html` is explicitly permitted and does not introduce any new JS.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. Table omitted.
