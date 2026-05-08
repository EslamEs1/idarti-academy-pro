<!-- SPECKIT START -->
Active feature: `005-achievements-certificates` — Achievements, Badges, Exams Passed, Levels Completed, and Certificates Frontend.

Read these for full context on the **active** feature (project conventions, technology choices, page structure, contracts):

- Constitution: `.specify/memory/constitution.md`
- Spec: `specs/005-achievements-certificates/spec.md`
- Plan (technologies, structure, decisions): `specs/005-achievements-certificates/plan.md`
- Phase 0 research / clarification-resolved decisions: `specs/005-achievements-certificates/research.md`
- Phase 1 data model / sample-data anchors: `specs/005-achievements-certificates/data-model.md`
- Phase 1 contracts: `specs/005-achievements-certificates/contracts/` (achievements, certificates, certificate-preview, monthly-exams-passed, completed-levels, badges, admin-certificates, admin-create-certificate)
- Quickstart (build/run): `specs/005-achievements-certificates/quickstart.md`

The **prior** features `001-frontend-foundation`, `002-student-dashboard-journey`, `003-courses-sessions`, and `004-assignments-homework` are the foundation this feature builds on. Spec 001 locked the design tokens and 19-badge catalog. Spec 002 added the dashboard / learning-journey / weekly-plan / notifications and pinned the persona's "نيل أول شهادة معتمدة" milestone (5 يناير 2026) and "بطل الواجبات" badge. Spec 003 added the courses/live-sessions surfaces. Spec 004 added the assignments/homework loop. Spec 005 ships eight new pages — six student (`achievements`, `certificates`, `certificate-preview`, `monthly-exams-passed`, `completed-levels`, `badges`) and two admin (`certificates`, `create-certificate`) — that finally fulfill every prior-spec promise about the achievements layer. One clarification (Q1) locks the admin's state-aware per-row action rendering: pending rows show "إصدار" (success); active rows show "إعادة إصدار" (info); revoked rows show "إعادة تفعيل" (accent) with تعديل + إلغاء visually disabled.

Stack at a glance: static HTML5 + TailwindCSS 3.4 (CLI build, `assets/css/input.css` → `assets/css/output.css`, committed) + minimal vanilla JS (`assets/js/main.js`, ≤80 lines, only sidebar drawer / dropdown / modal / tabs — **zero new JS in Spec 005**). Single CSS edit: a `@media print` block added to `input.css` for the certificate-preview page (FR-035). Lucide icons inline as SVG. Tajawal font via Google Fonts CDN. All pages `dir="rtl"`, Arabic-first, Latin digits inside Arabic copy. The persona stays عبد الرحمن مؤمن (ع.م) with primary teacher الأستاذ أحمد بن عبد الله (أ.أ); 4 certificates earned, 7 badges, 5 monthly exams passed (avg 86.6%), 2 curriculum levels completed. **Distinguishing design discipline**: download/print/share actions appear ONLY on `certificate-preview.html`; the certificates list page carries an explanatory callout banner enforcing the rule. SC-002 + SC-017 grep-validate this constraint.
<!-- SPECKIT END -->
