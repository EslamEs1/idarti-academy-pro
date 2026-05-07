<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.0.1
Bump rationale: PATCH — clarifying-only adjustments to the role-sidebar
enumerations in Information Architecture. Adds "Log Out" to Parent / Family,
Teacher, and Admin / Manager (it was already on Student); adds "Profile" to
Teacher. These were oversights in v1.0.0: every role universally needs a
Logout affordance, and the Teacher role needs Profile for parity with the
other roles. No principles, governance, or quality gates change. Spelling
normalized: "Logout" → "Log Out" across all four enumerations.

Surfaced by /speckit-analyze on 2026-05-06: spec FR-010/011/012 + FR-042 +
data-model.md § E5 + tasks.md T011–T014 had already been authored to include
Logout (and Teacher Profile); v1.0.1 brings the constitution into alignment
with the spec's UX-correct choice.

Modified principles: none (no semantic changes).
Modified sections:
- Information Architecture, Navigation & Visual System → role enumerations
  for Parent / Family, Teacher, and Admin / Manager extended.

Templates requiring updates: none.
Downstream artifacts requiring updates: none — spec.md, data-model.md, and
tasks.md already match the post-patch enumerations.

Follow-up TODOs: none.

---

PRIOR ENTRIES
-------------
Version change: (template/unversioned) → 1.0.0
Bump rationale: Initial ratification of the constitution. All placeholder tokens
filled with project-specific governance for the Premium Education Platform Frontend
(static, Arabic-first prototype).

Modified principles:
- [PRINCIPLE_1_NAME] → I. Static-First, Framework-Free Delivery
- [PRINCIPLE_2_NAME] → II. Pages Are Complete and Self-Contained
- [PRINCIPLE_3_NAME] → III. Arabic-First, RTL-Primary Experience
- [PRINCIPLE_4_NAME] → IV. Trust, Motivation, and Premium Educational Tone
- [PRINCIPLE_5_NAME] → V. Minimal, Justified JavaScript
- [PRINCIPLE_6_NAME] (new) → VI. Reflect Real Business Rules in the UI

Added sections:
- Technology & Architecture Constraints (was [SECTION_2_NAME])
- Information Architecture, Navigation & Visual System (was [SECTION_3_NAME])
- Quality Gates & Definition of Done (new)
- Governance (filled)

Removed sections: none.

Templates requiring updates:
- ✅ .specify/templates/plan-template.md — Constitution Check section is generic
  ("Gates determined based on constitution file"); the gates in this constitution
  apply directly to any /speckit-plan run. No edits required.
- ✅ .specify/templates/spec-template.md — Aligned; no backend/API/test concepts
  conflict with frontend-only scope. No edits required.
- ✅ .specify/templates/tasks-template.md — Sample tasks are illustrative; the
  template explicitly tells /speckit-tasks to replace them per feature. No edits
  required, but tasks for this project should drop API/contract/database tasks
  and substitute page-level frontend tasks.
- ✅ .specify/templates/checklist-template.md — Generic; compatible.
- ⚠ README.md / docs/quickstart.md — not present in repo; no update needed.

Follow-up TODOs: none. RATIFICATION_DATE set to today (2026-05-06).
-->

# Premium Education Platform Frontend Constitution

## Core Principles

### I. Static-First, Framework-Free Delivery

The product is a static frontend prototype. Pages MUST be authored as plain HTML
with TailwindCSS for styling and small amounts of vanilla JavaScript only where
HTML/CSS cannot deliver the interaction. No frontend framework or runtime
abstraction is permitted: React, Vue, Angular, Svelte, Next.js, Nuxt, Alpine.js,
and jQuery are explicitly banned. No backend code, no real or simulated API
calls, no database simulation, and no dynamic data fetching are allowed.
TailwindCSS MAY be compiled via an npm-based toolchain, but only for CSS
generation (input.css → output.css); the resulting pages MUST remain openable
directly in a browser without a dev server.

**Rationale**: This is a high-fidelity prototype meant to communicate trust,
structure, and feature completeness to stakeholders in Saudi Arabia and Egypt.
Frameworks and APIs would obscure the design intent, slow review cycles, and
introduce build-time risks the project does not need to take.

### II. Pages Are Complete and Self-Contained

Every HTML page MUST be fully designed and contain its own realistic, hard-coded
demo content. Pages MUST be directly openable in a browser via a real file path.
Navigation links MUST point to real, existing HTML files — no `#`, no
"coming soon", and no placeholder targets unless the user explicitly requests
one. Tables, cards, and lists MUST contain meaningful sample data (Quran,
Arabic, English, Math, Islamic studies; named students/parents/teachers;
invoices, certificates, homework, attendance, sessions, payments, settlements).
Lorem ipsum, "Item 1"/"Course 1" labels, empty tables, and JS-generated page
content are forbidden. The Header and Sidebar MAY be reused as shared partial
references, but each final page MUST embed its own concrete content. If a page
exposes a "View" button, the corresponding detail page MUST exist in the same
or the immediately following spec.

**Rationale**: A premium-feeling prototype must demonstrate, on every page,
that the platform has thought through real teaching, follow-up, and finance
flows. Generic shells erode the trust the design exists to build.

### III. Arabic-First, RTL-Primary Experience

Arabic is the primary language and RTL is the primary layout direction. Every
page MUST render correctly under RTL: spacing, alignment, sidebar position,
icon mirroring where semantically required, and typography MUST all read
naturally to a Saudi user. Sample content MUST use realistic, Saudi-friendly
Arabic wording (names, course titles, statuses, copy). LTR/English structural
support is acceptable as a secondary direction; an RTL/LTR toggle MAY be
provided via small JavaScript. No page may ship with broken RTL layout, mixed
directionality bugs, or English-only labels in primary user flows.

**Rationale**: The primary market is Saudi Arabia. Arabic correctness and
visual polish under RTL are not optional — they are the baseline experience.

### IV. Trust, Motivation, and Premium Educational Tone

The UI MUST feel like a Student Success Platform, not a generic admin
dashboard. The visual language MUST be calm, modern, family-friendly, and
trustworthy: soft cards, generous spacing, elegant shadows, rounded corners,
clear typography, and an educational visual hierarchy that foregrounds student
progress, parent confidence, teacher follow-up, and measurable learning
outcomes. The color system MUST use deep navy/dark blue for trust, warm
orange/gold for motivation, soft green for success, light backgrounds, and
calm gray text. Childish and overly cold/corporate aesthetics are both
forbidden. Status semantics MUST be expressed with consistent badges across
pages — at minimum: Active, Inactive, Pending, Paid, Unpaid, Partially Paid,
Overdue, Submitted, Under Review, Accepted, Needs Revision, Rejected,
Completed, Upcoming, Missed, Passed, Failed, Excellent, Needs Support — and
color MUST never be the sole indicator of meaning (text or icon must
accompany).

**Rationale**: The product's commercial promise is that the academy is
serious, organized, and actively following up on learning — not just collecting
payments. The interface must consistently express that promise.

### V. Minimal, Justified JavaScript

JavaScript usage MUST be minimal and justified. The only sanctioned uses are:
(1) sidebar mobile toggle, (2) RTL/LTR toggle, (3) simple tabs, (4) simple
modals, (5) dropdowns, and (6) accordion / open-close behavior. If a feature
can be expressed with HTML and CSS alone, JavaScript MUST NOT be introduced
for it. Page content MUST NEVER be generated or hydrated by JavaScript. No
heavy scripts, no client-side routing, no state stores, no fake API
simulations.

**Rationale**: Every line of JS adds review cost, regression risk, and
distance from the "static, openable file" guarantee in Principle I. Keeping
JS scoped to UI affordances preserves that guarantee.

### VI. Reflect Real Business Rules in the UI

The frontend MUST visually represent the platform's real business rules even
though no backend executes them. This includes: distinct pricing for Arabic
vs. Foreign students; distinct teacher payouts for Arabic vs. Foreign
students; both full-course payments and per-live-session payments; family
prepaid balances; teacher advances and salary deductions; VAT/tax on invoices
with admin-managed tax settings; admin-managed roles and permissions; and
multi-currency support (SAR primary, EGP secondary). Every role's sidebar
MUST be present and complete (Student, Parent/Family, Teacher, Admin/Manager,
Finance Manager, Support/Operations) with the navigation entries listed in
the Information Architecture section. Sections MUST NOT be removed,
generalized, or replaced with generic cards to simplify implementation.

**Rationale**: The operational complexity of the real academy (tax, family
balances, teacher finance, foreign vs. local pricing) is precisely what
distinguishes this product from a course catalog. Hiding it in the prototype
would misrepresent the platform.

## Technology & Architecture Constraints

**Allowed**:
- HTML5, CSS3, TailwindCSS (compiled via npm only for CSS output if needed).
- Vanilla JavaScript, restricted to the six interaction categories in
  Principle V.
- Static assets under `assets/css/`, `assets/js/`, `assets/images/`.

**Forbidden**:
- Any frontend framework or UI library that ships a runtime: React, Vue,
  Angular, Svelte, Next.js, Nuxt, Alpine.js, jQuery, or equivalents.
- Backend code, server-side rendering, real APIs, mocked APIs, simulated
  databases, or any form of dynamic data fetching at runtime.
- Generating page content with JavaScript at load time.
- Empty placeholder pages, "coming soon" filler (unless explicitly requested),
  lorem ipsum, or generic labels (e.g., "Course 1", "Item 1").

**File organization** (suggested and authoritative for new pages):

```text
index.html
pages/
  student/
  parent/
  teacher/
  admin/
assets/
  css/
    input.css
    output.css
  js/
    main.js
  images/
components/   # OPTIONAL reference partials only — final pages embed content
```

`components/` or `partials/` files MAY exist as reference snippets, but every
delivered page MUST be a fully populated, openable static HTML file.

**Layout requirements**:
- Desktop sidebar fixed on the side; header at the top of the content area.
- Main content area MUST be spacious; tables MUST be responsive; horizontal
  overflow MUST be avoided.
- Mobile layout MUST collapse the sidebar via the sanctioned JS toggle.
- Important actions MUST be visible and clearly labeled.

## Information Architecture, Navigation & Visual System

**Role sidebars** — each role's sidebar MUST contain exactly these entries
(order may be adjusted for UX, but no entry may be omitted):

- **Student**: Home, Browse Courses, My Courses, Live Sessions, Assignments,
  Exams, Achievements, Reports, Social Hub, Leaderboard, Calendar, Payment
  History, Profile, Log Out.
- **Parent / Family**: Dashboard, My Children, Child Reports, Attendance,
  Homework Follow-up, Certificates, Invoices, Family Balance, Messages,
  Profile, Log Out.
- **Teacher**: Dashboard, My Classes, Live Sessions, Homework Review, Student
  Reports, Attendance, Earnings, Advances, Calendar, Messages, Profile, Log
  Out.
- **Admin / Manager**: Dashboard, Students, Families, Teachers, Courses, Live
  Sessions, Assignments, Exams, Certificates, Reports, Payments, Invoices,
  Tax Settings, Family Balances, Teacher Finance, Roles & Permissions, Social
  Hub, Platform Settings, Log Out.
- **Finance Manager** and **Support / Operations**: derive from Admin with
  permission-scoped variants visible in Roles & Permissions.

**Visual system**:
- Use cards for summaries, clean tables for records, detail pages for deep
  information.
- Use the badge vocabulary defined in Principle IV consistently across all
  pages.
- Forms MUST have visible labels; icons MAY supplement but MUST NOT replace
  text labels.
- Empty states MUST explain what is missing and suggest the next action.
- Modals MUST expose explicit cancel and confirm actions.
- Font sizes MUST be readable; parent-facing and finance-facing information
  MUST be easy to scan at a glance.

**Filters and downloads**: Filter controls MUST be rendered visually; full
JavaScript filtering is OPTIONAL and only acceptable if simple. Download
buttons are visual-only unless a real static file is bundled.

## Quality Gates & Definition of Done

A frontend spec or page set is considered complete only when ALL of the
following gates pass:

1. All requested pages exist and are openable as static HTML files.
2. Each page is responsive across desktop, tablet, and mobile breakpoints.
3. Each page contains meaningful, realistic Arabic sample data.
4. Header and sidebar are consistent across pages within a role.
5. Every navigation link points to a real existing HTML file in the spec.
6. The page is visually professional and adheres to the color, spacing,
   typography, and badge rules of Principle IV.
7. No frontend framework or runtime is present.
8. No backend, API, or simulated-API logic is present.
9. TailwindCSS is used consistently; no parallel ad-hoc CSS systems.
10. JavaScript is limited to the sanctioned interactions in Principle V, and
    every JS usage is justifiable against that list.
11. Every "View" / detail entry point in a page has a corresponding detail
    page in the same or next spec.
12. RTL rendering has been visually verified for every page; no broken
    alignment, mirrored layout bugs, or directionality regressions.

A page that fails any of these gates is not Done, regardless of how visually
polished individual sections look.

## Governance

This constitution supersedes ad-hoc design and engineering preferences. All
specs (`/speckit-specify`), plans (`/speckit-plan`), tasks (`/speckit-tasks`),
implementations (`/speckit-implement`), checklists (`/speckit-checklist`), and
analyses (`/speckit-analyze`) MUST verify compliance with these principles
before being considered ready. The Constitution Check gate in
`.specify/templates/plan-template.md` MUST be evaluated against the principles
and constraints above; any divergence MUST be recorded in the plan's
Complexity Tracking table with an explicit justification and a rejected
simpler alternative.

**Amendment procedure**:
1. Propose the change as a diff against this file with a written rationale.
2. Determine the version bump using semantic versioning:
   - **MAJOR** for backward-incompatible removals or redefinitions of a
     principle (e.g., permitting a frontend framework, enabling real APIs).
   - **MINOR** for new principles or materially expanded guidance (e.g.,
     adding a new mandatory section).
   - **PATCH** for clarifications, wording fixes, and non-semantic refinements.
3. Update the Sync Impact Report at the top of this file.
4. Propagate the change to dependent templates listed in the Sync Impact
   Report and tick them as ✅ updated or ⚠ pending.
5. Update the version line and `Last Amended` date below.

**Compliance review**: Each delivered page set MUST be reviewed against the
Definition of Done in the previous section before sign-off. Violations that
are accepted (e.g., a temporary "coming soon" section explicitly requested
by the stakeholder) MUST be tracked in the corresponding spec or plan, not
silently merged.

**Version**: 1.0.1 | **Ratified**: 2026-05-06 | **Last Amended**: 2026-05-06
