<!-- SPECKIT START -->
Active feature: `003-courses-sessions` — Courses and Live Sessions Frontend.

Read these for full context on the **active** feature (project conventions, technology choices, page structure, contracts):

- Constitution: `.specify/memory/constitution.md`
- Spec: `specs/003-courses-sessions/spec.md`
- Plan (technologies, structure, decisions): `specs/003-courses-sessions/plan.md`
- Phase 0 research / clarification-resolved decisions: `specs/003-courses-sessions/research.md`
- Phase 1 data model / sample-data anchors: `specs/003-courses-sessions/data-model.md`
- Phase 1 contracts: `specs/003-courses-sessions/contracts/` (browse-courses, my-courses, course-details, live-sessions, live-session-details, session-checkout-preview)
- Quickstart (build/run): `specs/003-courses-sessions/quickstart.md`

The **prior** features `001-frontend-foundation` and `002-student-dashboard-journey` are the foundation this feature builds on. Spec 001 locked the design tokens, 19-badge catalog, app shell, and role sidebars. Spec 002 added the dashboard, learning journey, weekly plan, and notifications pages — and finalized the 15-entry student sidebar plus the header bell-as-anchor. Spec 003 adds six new student pages (browse-courses, my-courses, course-details, live-sessions, live-session-details, session-checkout-preview) without modifying any Spec 001/002 file. Five clarifications lock the dual-pricing display (Arabic-emphasized), missed-tab population, course-details subject (Quran L3), and the per-session-paid bundle narrative (4-session "حزمة المراجعة الشهرية" at 345 ر.س, 200 ر.س family-balance applied, 145 ر.س due).

Stack at a glance: static HTML5 + TailwindCSS 3.4 (CLI build, `assets/css/input.css` → `assets/css/output.css`, committed) + minimal vanilla JS (`assets/js/main.js`, ≤80 lines, only sidebar drawer / dropdown / modal / tabs — **zero new JS in Spec 003**; the existing `data-tabs` ARIA-tablist handler powers the 3-tab Live Sessions UI). Lucide icons inline as SVG. Tajawal font via Google Fonts CDN. All pages `dir="rtl"`, Arabic-first, Latin digits inside Arabic copy. No frameworks, no APIs, no JS-rendered content.
<!-- SPECKIT END -->
