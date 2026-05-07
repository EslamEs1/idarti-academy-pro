<!-- SPECKIT START -->
Active feature: `002-student-dashboard-journey` — Student Dashboard and Learning Journey.

Read these for full context on the **active** feature (project conventions, technology choices, page structure, contracts):

- Constitution: `.specify/memory/constitution.md`
- Spec: `specs/002-student-dashboard-journey/spec.md`
- Plan (technologies, structure, decisions): `specs/002-student-dashboard-journey/plan.md`
- Phase 0 research / clarification-resolved decisions: `specs/002-student-dashboard-journey/research.md`
- Phase 1 data model / sample-data anchors: `specs/002-student-dashboard-journey/data-model.md`
- Phase 1 contracts: `specs/002-student-dashboard-journey/contracts/` (student-shell-delta, student-dashboard-blocks, learning-journey, weekly-plan, notifications-inbox)
- Quickstart (build/run): `specs/002-student-dashboard-journey/quickstart.md`

The **prior** feature `001-frontend-foundation` (Frontend Foundation, Design System, App Shell) is the foundation this feature builds on. Its locked decisions in `specs/001-frontend-foundation/` (constitution alignment, design tokens, 19-badge catalog, app-shell layout, role sidebars) are inherited verbatim. Spec 002 only redesigns student-dashboard content + adds three pages + adds two student-sidebar entries + converts the header bell to an anchor.

Stack at a glance: static HTML5 + TailwindCSS 3.4 (CLI build, `assets/css/input.css` → `assets/css/output.css`, committed) + minimal vanilla JS (`assets/js/main.js`, ≤80 lines, only sidebar drawer / dropdown / modal / tabs — **zero new JS in Spec 002**). Lucide icons inline as SVG. Tajawal font via Google Fonts CDN. All pages `dir="rtl"`, Arabic-first, Latin digits inside Arabic copy. No frameworks, no APIs, no JS-rendered content.
<!-- SPECKIT END -->
