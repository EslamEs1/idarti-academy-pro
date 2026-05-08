<!-- SPECKIT START -->
Active feature: `004-assignments-homework` — Assignments and Homework Frontend.

Read these for full context on the **active** feature (project conventions, technology choices, page structure, contracts):

- Constitution: `.specify/memory/constitution.md`
- Spec: `specs/004-assignments-homework/spec.md`
- Plan (technologies, structure, decisions): `specs/004-assignments-homework/plan.md`
- Phase 0 research / clarification-resolved decisions: `specs/004-assignments-homework/research.md`
- Phase 1 data model / sample-data anchors: `specs/004-assignments-homework/data-model.md`
- Phase 1 contracts: `specs/004-assignments-homework/contracts/` (assignments, assignment-details, submit-assignment, submission-feedback, homework-review, homework-submission-details)
- Quickstart (build/run): `specs/004-assignments-homework/quickstart.md`

The **prior** features `001-frontend-foundation`, `002-student-dashboard-journey`, and `003-courses-sessions` are the foundation this feature builds on. Spec 001 locked the design tokens, 19-badge catalog, app shell, and role sidebars. Spec 002 added the student dashboard / learning journey / weekly plan / notifications and finalized the 15-entry student sidebar plus the header bell-as-anchor. Spec 003 added the six course-and-session student pages (browse-courses, my-courses, course-details, live-sessions, live-session-details, session-checkout-preview). Spec 004 adds six assignment-flow pages — four student (`assignments`, `assignment-details`, `submit-assignment`, `submission-feedback`) and two teacher (`homework-review`, `homework-submission-details`) — without modifying any prior-spec file. Three clarifications lock the central narratives: (Q1) Quran-axis scores are diagnostic and the final grade is a separate holistic teacher judgment with explanatory captions on the rubric pages; (Q2) the teacher-only status options "مقبول مع ملاحظات" and "تأجيل المراجعة" collapse to existing student-side values ("مقبول" + notes; "قيد المراجعة"); (Q3) "جديد" = posted within last 48 hours, "مطلوب التسليم" = older than 48 hours and deadline-approaching — both are visually distinct pills that contribute to the "واجبات مطلوبة (3)" summary card.

Stack at a glance: static HTML5 + TailwindCSS 3.4 (CLI build, `assets/css/input.css` → `assets/css/output.css`, committed) + minimal vanilla JS (`assets/js/main.js`, ≤80 lines, only sidebar drawer / dropdown / modal / tabs — **zero new JS in Spec 004**; no page in this feature uses tabs, dropdowns, or modals — only the existing sidebar drawer carries over). Lucide icons inline as SVG. Tajawal font via Google Fonts CDN. All pages `dir="rtl"`, Arabic-first, Latin digits inside Arabic copy. No frameworks, no APIs, no JS-rendered content. The persona stays Abdulrahman (`عبدالرحمن السعد` / `ع.س` initials) with primary teacher الأستاذ أحمد العمري and a new secondary teacher الأستاذة سلمى البلوي for the Arabic-language assignment row. The cross-page anchor is the persona's "تلاوة سورة الضحى" submission appearing identically on the student's assignments index, the teacher's homework-review queue, and the teacher's submission-details grading form — same student, same teacher, same timestamp, same attempt count.
<!-- SPECKIT END -->
