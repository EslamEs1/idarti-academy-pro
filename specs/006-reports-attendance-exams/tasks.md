---

description: "Task list for Reports, Attendance, and Exams Frontend (Feature 006)"
---

# Tasks: Reports, Attendance, and Exams Frontend

**Input**: Design documents from `/specs/006-reports-attendance-exams/`
**Prerequisites**: plan.md (loaded), spec.md (loaded), research.md (loaded), data-model.md (loaded), contracts/* (loaded), quickstart.md (loaded)

**Tests**: NOT requested. The user's brief is a static-frontend prototype; visual review against the 18 success criteria + quickstart's SC validation table is the QA layer. No automated tests are generated.

**Organization**: Tasks are grouped by user story (US1 → US8) so each page can be implemented and reviewed independently. Setup + Foundational are shared prerequisites; Polish is the final cross-cutting validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story tag (`[US1]`-`[US8]`) for traceability — user-story phase tasks ONLY
- File paths are absolute under repo root.

## Path Conventions

- Static frontend at repo root.
- New HTML lives under `pages/student/`, `pages/parent/`, `pages/teacher/`.
- CSS lives under `assets/css/` (`input.css` source → `output.css` rebuilt artifact).
- No `src/`, `tests/`, or framework directories — this is a pure static prototype per Constitution Principle I.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Sanity-check the existing baseline before adding pages.

- [X] T001 Read `.specify/memory/constitution.md` v1.0.1 + `specs/006-reports-attendance-exams/plan.md` + `research.md` end-to-end. Confirm: (a) `wc -l assets/js/main.js` = 68 (Spec 005 baseline), (b) `wc -c assets/css/output.css` ≤ 70 KB (room for ≤ 8 KB headroom under the 80 KB ceiling), (c) all eight target file paths from §Project Structure do NOT yet exist (`ls pages/student/{reports,monthly-report,attendance,exams,exam-details}.html pages/parent/{my-children,child-reports}.html pages/teacher/student-reports.html` should error on every file). No edits — read-only verification.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Two foundational tasks that every user-story phase consumes.

**⚠️ CRITICAL**: No user-story phase can begin until both T002 and T003 are complete.

- [X] T002 Verify the existing main.js tabs handler markup convention (used by `exams.html` in US7). Open `assets/js/main.js` and confirm the existing tabs handler reads `data-tab="<id>"` on buttons and `data-tabpanel="<id>"` on panels (matching the pattern used on Spec 003's course-details and Spec 004's submission-feedback). Document the exact attribute names + active-class name in a one-line comment in the spec's research.md §R5 if not already there. No code edits — pure reconnaissance for US7's markup author.
- [X] T003 [P] **Optional CSS extension** — open `assets/css/input.css` and locate Spec 005's existing `@media print` block. If the existing block's hide-selectors are based on stable IDs (`#cp-actions`, `#cp-prototype-notice`, `#app-sidebar`, `#app-header`, `[data-sidebar-backdrop]`), extend the block by appending the 4 new IDs from research.md §R14: `#mr-actions`, `#mr-prototype-notice`, `#cr-actions`, `#cr-prototype-notice`. If the existing block uses a class-based selector that already covers shell elements, document that path in a comment and skip the edit. Do NOT introduce a new `@media print` block — extend the existing one. After the edit (or no-op decision), this task is done; the actual CSS rebuild is deferred to T063 in Polish so all utility classes added by US1-US8 are picked up in one pass.

**Checkpoint**: Foundation ready — all 8 user-story phases can now begin in parallel (each touches a single distinct file).

---

## Phase 3: User Story 1 — Student Reports Hub (Priority: P1) 🎯 MVP

**Goal**: Build the multi-month performance hub at `pages/student/reports.html` — the entry point every prior-spec page (dashboard / weekly-plan / learning-journey) already targets.

**Independent Test**: Open `pages/student/reports.html` from the file explorer. Without any other context, the viewer answers in 30 seconds: "Which month am I viewing? How many active classes does this student have? What's their attendance rate? Their homework completion rate? Their quiz average? Their overall progress score? Per course, who teaches it, how is the student doing on attendance/homework/quizzes, and where do I open the full monthly report?" — entirely from the page.

### Implementation for User Story 1

- [X] T004 [US1] Create `pages/student/reports.html` by copying the student-side shell (head with Tajawal CDN + tailwind output.css + 15-entry student sidebar + header chrome + main content placeholder) verbatim from any existing student-side page (e.g., `pages/student/achievements.html` from Spec 005). Set `<title>تقاريري الشهرية — منصة إدارتي</title>`, `lang="ar"`, `dir="rtl"`, and set `aria-current="page"` + the `is-active` class on the sidebar's "التقارير" entry (FR-001 / FR-011 / contracts/reports.md §Active sidebar).
- [X] T005 [US1] Add `<section id="rp-header">` with h1 "تقاريري الشهرية" + subtitle "تابع تقدّمك عبر الأشهر — اختر الشهر الذي تريد مراجعته" (FR-011 / contracts/reports.md §Header).
- [X] T006 [US1] Add `<div id="rp-month-selector">` rendering the 6-chip horizontal strip in chronological order: ديسمبر 2025 / يناير 2026 / فبراير / مارس / أبريل / مايو 2026. مايو 2026 is selected (`bg-accent-100 ring-2 ring-accent-500 font-semibold`, `aria-current="page"`). Each non-selected chip is `<a href="?month=YYYY-MM">`. The strip uses `overflow-x-auto` for mobile horizontal scroll (FR-012 / contracts/reports.md §Month selector).
- [X] T007 [US1] Add `<section id="rp-summary">` with exactly 5 summary cards in a 1/2-3/5-col responsive grid. Card IDs + values + hues + icons per contracts/reports.md §Summary cards: rp-card-classes (الفصول النشطة, 3, primary, book-open) / rp-card-attendance (الحضور, 92%, success, check-circle) / rp-card-homework (إنجاز الواجبات, 88%, accent, clipboard-check) / rp-card-quizavg (متوسط الاختبارات, 86.6%, info, award) / rp-card-overall (التقدّم الإجمالي, 89%, warning, trending-up). Each card pairs color with an icon (FR-004 / FR-013).
- [X] T008 [US1] Add `<table id="rp-detail-table">` with `<thead>` for 7 columns (الدورة / المعلم / الحضور (%) / الواجبات (%) / متوسط الاختبارات (%) / الحالة / إجراء) and `<tbody>` with 3 rows per contracts/reports.md §Per-course detail table. Each row: course chip, teacher chip + avatar, percentage cells, status pill (color paired with text + icon), and a "عرض التفاصيل" CTA → `monthly-report.html`. At < 768 px the table collapses to single-column cards via duplicated DOM (`<table class="hidden md:table">` + `<div class="md:hidden">` cards) (FR-014 / FR-015).
- [X] T009 [US1] Add `<section id="rp-footer">` with a primary `<a href="monthly-report.html">عرض التقرير الشهري الكامل</a>` styled as a primary button + 1-line caption "آخر تقرير: 30 أبريل 2026" (FR-016 / contracts/reports.md §Footer CTA).
- [X] T010 [US1] Verify the page against `contracts/reports.md §Grep checks` — all 5 grep checks pass (rp-card- ≥ 5; tr ≥ 4; monthly-report.html ≥ 4; no Download/Print/Share/WhatsApp clickable elements; مايو 2026 ≥ 1).

**Checkpoint**: User Story 1 (MVP) is fully functional and testable. Every prior-spec student-side `reports.html` link now resolves.

---

## Phase 4: User Story 2 — Full Monthly Report (Priority: P1)

**Goal**: Build `pages/student/monthly-report.html` — the canonical April 2026 report card that the parent + student read together.

**Independent Test**: Open `pages/student/monthly-report.html`. A viewer answers: "Whose report is this? Which month? What is the academy's overall evaluation? How was attendance / homework / exams summarized? What did teachers say in their notes? What are the strengths / improvements / next-month plan? What's the parent-friendly summary? Where is the Download PDF button?" — entirely from the page.

### Implementation for User Story 2

- [X] T011 [US2] Create `pages/student/monthly-report.html` by copying the student-side shell. Set `<title>التقرير الشهري — أبريل 2026 — منصة إدارتي</title>`, mark "التقارير" as `is-active` (children-of since this is a sub-page of reports.html) (FR-001).
- [X] T012 [US2] Add `<section id="mr-header">` rendering the parchment-style report-card header per contracts/monthly-report.md §Header: cream/parchment background + ring + academy logo + "أكاديمية إدارتي" wordmark + h1 "التقرير الشهري" (display weight) + month label "أبريل 2026" + student-info strip (avatar ع.م + name عبد الرحمن مؤمن + level chip "الصف السادس — مسار القرآن الكريم" + report ID "RPT-2026-04-Q03-007") (FR-017).
- [X] T013 [US2] Add `<section id="mr-overall">` with status pill "ممتاز" (success-100 + star icon, success-700 text), horizontal score bar showing "89 / 100" (success-500 fill at 89% width), and a 1-2 sentence quote attributed to "إدارة الأكاديمية" per contracts/monthly-report.md §Overall evaluation (FR-018).
- [X] T014 [US2] Add `<section id="mr-mini-summaries">` with 4 mini-summary cards (1/2/4-col grid). Card IDs + content per contracts/monthly-report.md §Mini-summaries: mr-card-attendance (92% / "حضر 11 من 12 حصة" / success / `attendance.html`), mr-card-homework (88% / "أنجز 7 من 8 واجبات" / accent / `assignments.html`), mr-card-exams (88/100 / "اختبار شهر أبريل — Quran L3" / info / `exam-details.html`), mr-card-notes (3 ملاحظات / "تواصل بنّاء من الأساتذة" / primary / `#mr-teacher-notes`) (FR-019).
- [X] T015 [US2] Add `<section id="mr-teacher-notes">` with 3 teacher-note quote blocks per research.md §R9 + contracts/monthly-report.md §Teacher notes. Each block: avatar (color-coded per teacher: primary-700 / accent-600 / success-700) + teacher name + course chip + date + 2-4 sentence Arabic message. The Quran teacher's quote (الأستاذ أحمد بن عبد الله) is the SC-018 anchor — must be byte-identical to what appears later on `child-reports.html` and `student-reports.html` (FR-020 / SC-018).
- [X] T016 [US2] Add `<section id="mr-reflections">` with exactly 3 reflection panels (1 col mobile / 3 col tablet+) using research.md §R8 content: نقاط القوّة (success-50 / ≥ 4 bullets) + نقاط للتحسين (warning-50 / ≥ 3 bullets) + خطة الشهر القادم — مايو 2026 (info-50 / ≥ 4 bullets). Each panel pairs hue with a panel-header icon (star / alert-circle / target) (FR-021).
- [X] T017 [US2] Add `<section id="mr-parent-summary">` with the 4-6 sentence parent-readable Arabic paragraph from contracts/monthly-report.md §Parent summary. Use `text-base leading-7` for parent-friendly readability (FR-022).
- [X] T018 [US2] Add `<section id="mr-actions">` with exactly 3 visual-stub buttons in this order: primary `تنزيل PDF` (`<button type="button">`, primary-900 background, download icon), secondary `طباعة` (printer icon), tertiary `مشاركة مع ولي الأمر` (share icon). Append `<p id="mr-prototype-notice">` with the prototype-notice line + info icon (slate-100 background) (FR-003 / FR-023).
- [X] T019 [US2] Verify the page against `contracts/monthly-report.md §Grep checks` (SC-002) — all 10 grep checks pass (#mr- ≥ 7; أبريل 2026 ≥ 1; report ID ≥ 1; تنزيل PDF ≥ 1; 3 teacher names each ≥ 1; canonical 92% / 88% / 89/100 each ≥ 1).

**Checkpoint**: User Story 2 fully functional. Spec 006's distinguishing data discipline (cross-page reconciliation) has its source-of-truth artifact rendered.

---

## Phase 5: User Story 3 — Parent Children Overview (Priority: P1)

**Goal**: Build `pages/parent/my-children.html` — the parent's family at-a-glance.

**Independent Test**: Open `pages/parent/my-children.html`. A viewer answers: "How many children does this family have at the academy? What is each child's name, level, attendance %, homework %, last-report date, and payment status? Which child needs the most attention this week? Where do I open each child's full report?" — entirely from the page.

### Implementation for User Story 3

- [X] T020 [US3] Create `pages/parent/my-children.html` by copying the parent-side shell (head + 11-entry parent sidebar + header chrome) verbatim from `pages/parent/dashboard.html`. Set `<title>أبنائي — لوحة ولي الأمر — منصة إدارتي</title>`, mark "أبنائي" as `is-active` + `aria-current="page"` (FR-001 / FR-043 / contracts/my-children.md §Active sidebar).
- [X] T021 [US3] Add `<section id="ch-header">` with h1 "أبنائي" + subtitle "متابعة شاملة لتقدّم كل طفل — اضغط على أيّ طفل لقراءة تقريره الكامل" + parent persona greeting "ولي أمر الطالب عبد الرحمن" in header chrome + a small "أضف طفلاً جديداً" `<button type="button">` near the title (primary-100 background + plus icon, visual stub) (FR-043 / FR-046).
- [X] T022 [US3] Add `<div id="ch-grid">` with exactly 2 child cards (1-col-mobile / 2-col-tablet+) per contracts/my-children.md §Children grid. Card 1 (`#ch-card-abdulrahman`): avatar ع.م (primary-700) + name + level "الصف السادس — مسار القرآن الكريم" + 4-cell stats grid (الحضور 92% / الواجبات 88% / آخر تقرير 30 أبريل 2026 / السداد مدفوع) + "ممتاز" pill (success-100 + star) + primary CTA `<a href="child-reports.html">عرض التقرير الكامل</a>` + 3 secondary chips. Card 2 (`#ch-card-sara`): avatar س.م (warning-tinted — matches parent dashboard line 232) + سارة مؤمن + level "الصف الثالث — مسار اللغة العربية" + stats (78% / 65% / 30 أبريل 2026 / مدفوع) + "يحتاج إلى دعم" pill (warning-100 + alert) + primary CTA `<a href="child-reports.html?child=sara">` + same 3 secondary chips (FR-044 / FR-045 / FR-063).
- [X] T023 [US3] Verify the page against `contracts/my-children.md §Grep checks` — all 7 grep checks pass (`#ch-card-` ≥ 2; both persona names ≥ 1; both status pills ≥ 1; child-reports.html ≥ 2; no Download/Print/Share clickable elements). Manual cross-check: avatar/name/level/status pill on Card 2 are byte-identical to the parent dashboard's existing pin (lines 220 / 232 / 234 / 237 of `pages/parent/dashboard.html`) (FR-063 / SC-006).

**Checkpoint**: User Story 3 fully functional. The parent dashboard's `my-children.html` link (line 244 + sidebar line 47) now resolves.

---

## Phase 6: User Story 4 — Parent Reads the Child Report (Priority: P1)

**Goal**: Build `pages/parent/child-reports.html` — the parent-confidence centerpiece of the spec.

**Independent Test**: Open `pages/parent/child-reports.html`. A viewer answers: "Whose report is this? What's the academy's progress direction (improving / stable / needs support)? How is attendance / homework / exams summarized in plain language? What did the teachers say? How is the child's behavior and engagement? What single action does the academy suggest the parent take? Where do I download the report or share it via WhatsApp?" — entirely from the page.

### Implementation for User Story 4

- [X] T024 [US4] Create `pages/parent/child-reports.html` by copying the parent-side shell. Set `<title>تقرير عبد الرحمن — أبريل 2026 — لوحة ولي الأمر</title>`, mark "تقارير الأبناء" as `is-active` + `aria-current="page"` (FR-001).
- [X] T025 [US4] Add `<section id="cr-header">` with the parent-lens report-card header per contracts/child-reports.md §Header: h1 "تقرير عبد الرحمن — أبريل 2026" + child avatar ع.م + level chip + parent name "ولي أمر الطالب عبد الرحمن" + month label + sibling-switcher chip strip (chip 1: "عبد الرحمن" SELECTED with `bg-primary-100 ring-2 ring-primary-500`; chip 2: "سارة" → `<a href="?child=sara">` placeholder) (FR-048).
- [X] T026 [US4] Add `<section id="cr-tristate">` with the 3-step horizontal progress track per research.md §R11 + contracts/child-reports.md §Tri-state. Step 1 يحتاج إلى دعم (slate-100 muted + opacity-50) — connector slate-200 — Step 2 مستقر (slate-100 muted) — connector success-300 (active) — Step 3 متحسّن (success-700 + check icon + ring-4 ring-success-100) ACTIVE. Below the track: 1-2 sentence parent-readable rationale "عبد الرحمن أظهر تحسناً ملحوظاً..." (FR-049).
- [X] T027 [US4] Add `<section id="cr-summaries">` with exactly 4 plain-language mini-summary cards (1/2/4-col): cr-card-attendance (الحضور / "حضر 11 من 12 حصة هذا الشهر — حضور ممتاز" + 92% bar) / cr-card-homework (الواجبات / "أنجز 7 من 8 واجبات في موعدها" + 88% bar) / cr-card-exams (الاختبارات / "حصل على 88% في اختبار شهر أبريل — تقدير ممتاز" + status pill) / cr-card-engagement (الالتزام والمشاركة / "أساتذته أشاروا إلى التزامه..." + state chip). Color paired with text + icon throughout (FR-050).
- [X] T028 [US4] Add `<section id="cr-teacher-notes">` with 2 quote blocks (research.md §R9 quotes 1 + 2 — Quran + Arabic). Each block: avatar + name + course chip + date + 2-4 sentence parent-readable Arabic. The Quran teacher's quote (quote 1) MUST be byte-identical to `monthly-report.html`'s `#mr-teacher-notes` quote 1 (SC-018) (FR-051).
- [X] T029 [US4] Add `<section id="cr-action-panel">` with one primary action panel (info-50 background, info-700 text — 2-3 sentence "ننصح بمتابعة جلسة المراجعة...") + one secondary tip panel (slate-50 background, lightbulb icon — "💡 شجّعوه على...") (FR-052).
- [X] T030 [US4] Add `<section id="cr-actions">` with exactly 3 buttons: primary `تنزيل التقرير` (`<button type="button">`, primary-900 + download icon), secondary `مشاركة عبر واتساب` (`<button type="button">`, success-50 background + success-600 border + success-700 text + small inline SVG icon — use the **Lucide `message-circle`** icon path for the WhatsApp-style chat bubble — NO `wa.me/` href, NO `navigator.share()`), tertiary `العودة للأبناء` (`<a href="my-children.html">`). Append `<p id="cr-prototype-notice">` with the visual-stub clarifier. Below `#cr-actions`, append the HTML comment block documenting the سارة sibling-variant per contracts/child-reports.md §Sibling variant (FR-003 / FR-053 / FR-054).
- [X] T031 [US4] Verify the page against `contracts/child-reports.md §Grep checks` — all 11 grep checks pass (`#cr-` ≥ 7; tri-state labels each ≥ 1; مشاركة عبر واتساب ≥ 1; تنزيل التقرير ≥ 1; my-children.html ≥ 1; canonical 92% / 88% each ≥ 1; both teacher names ≥ 1).

**Checkpoint**: User Story 4 fully functional. The parent dashboard's `child-reports.html` link (lines 55 sidebar + 204 / 292 body) now resolves. The brief's primary deliverable (parent-confidence surface) is rendered.

---

## Phase 7: User Story 5 — Teacher Authors a Student Report (Priority: P1)

**Goal**: Build `pages/teacher/student-reports.html` — the upstream form whose output the student + parent read.

**Independent Test**: Open `pages/teacher/student-reports.html`. A viewer answers: "Which student's report is the teacher authoring? What read-only context strip does the teacher see? What evaluation sections can the teacher edit (attendance / homework / exams)? Where do they write notes, the next-month recommendation, and a parent action? Where is the Save button? Is it clearly a visual prototype?" — entirely from the page.

### Implementation for User Story 5

- [X] T032 [US5] Create `pages/teacher/student-reports.html` by copying the teacher-side shell from `pages/teacher/dashboard.html` (head + 12-entry teacher sidebar + header chrome). Set `<title>تقرير الطالب — أبريل 2026 — لوحة المعلم</title>`, mark "تقارير الطلاب" as `is-active` + `aria-current="page"`. The teacher persona authoring this report MUST be الأستاذ أحمد بن عبد الله (Quran instructor — the same teacher pinned in Specs 003/004/005) (FR-001 / FR-064).
- [X] T033 [US5] Add `<section id="sr-header">` with h1 "تقرير الطالب — أبريل 2026" + breadcrumb (`مراجعة الواجبات` link → `homework-review.html` / `تقارير الطلاب` link → `student-reports.html` / `تقرير الطالب` current) (FR-056).
- [X] T034 [US5] Add `<section id="sr-context">` (read-only chrome — slate-50 background + slate-200 border, visually distinct from the editable form below). Contents per contracts/student-reports.md §Student-context strip: avatar ع.م + name "عبد الرحمن مؤمن" + level chip "المستوى الثالث — مسار القرآن الكريم" + parent "ولي أمر عبد الرحمن" + assignments accepted "7 / 8" + months reported "هذا التقرير الخامس — منذ ديسمبر 2025" (FR-056).
- [X] T035 [US5] Add `<section id="sr-evaluations">` with exactly 3 evaluation panels (md:grid-cols-2). Each panel has 3 form rows, each with `<label for="...">` paired to its input. Panel `#sr-eval-attendance`: input id sr-att-num (value "11 / 12") + select id sr-att-status (selected ممتاز) + textarea id sr-att-comment ("حضور كامل تقريباً..."). Panel `#sr-eval-homework`: id sr-hw-num ("7 / 8") + sr-hw-status + sr-hw-comment. Panel `#sr-eval-exams`: id sr-ex-num ("88 / 100") + sr-ex-status + sr-ex-comment. All visible labels in Arabic, every `for` matches an `id` (FR-008 / FR-057).
- [X] T036 [US5] Add `<div>` with `<label for="sr-notes">ملاحظات عامة</label>` + `<textarea id="sr-notes" rows="4">` pre-filled with the §R9 Quran-teacher quote ("أداء عبد الرحمن في الحفظ هذا الشهر ممتاز، وقد أتقن أحكام الميم الساكنة. يحتاج إلى تركيز إضافي على التجويد في الآيات الطويلة. نتطلّع لرؤية تقدّمه في المستوى الرابع.") — byte-identical to `monthly-report.html`'s teacher-quote 1 + `child-reports.html`'s teacher-quote 1 per SC-018 (FR-058).
- [X] T037 [US5] Add `<section id="sr-recommendations">` with two stacked editable lists. List 1 ("خطة الشهر القادم — مايو 2026") with 4 `<input>` rows (id sr-plan-1 → sr-plan-4, each pre-filled with the §R8 next-month-plan bullets) + a "+ إضافة بند" `<button type="button">` visual stub. List 2 ("الإجراء المقترح لولي الأمر") with single `<textarea id="sr-parent-action" rows="3">` pre-filled with the parent-action paragraph BYTE-IDENTICAL to `child-reports.html`'s `#cr-action-panel` primary action (FR-059).
- [X] T038 [US5] Add `<section id="sr-actions">` with exactly 3 buttons: primary `حفظ التقرير` (`<button type="button">`, primary-900 + save icon), secondary `حفظ كمسودة` (file-text icon), tertiary `إلغاء` (`<a href="homework-review.html">` — REAL navigation). Append `<p id="sr-prototype-notice">` with the visual-stub clarifier (FR-003 / FR-060).
- [X] T039 [US5] Verify the page against `contracts/student-reports.md §Grep checks` — all 9 grep checks pass; AND run the FR-008 form-discipline audit per contracts/student-reports.md §Form discipline: extract all `id="sr-..."` from input/textarea/select tags, extract all `for="sr-..."`, run `comm -23` between sorted-id-with-`for=`-prefix and sorted-fors — output MUST be empty (every input has its label).

**Checkpoint**: User Story 5 fully functional. Spec 006's three-lens reconciliation is now complete: monthly-report (student) ↔ child-reports (parent) ↔ student-reports (teacher) all carry the same canonical April figures + the same Arabic teacher feedback.

---

## Phase 8: User Story 6 — Attendance Log (Priority: P2)

**Goal**: Build `pages/student/attendance.html` — comprehensive session-by-session attendance.

**Independent Test**: Open `pages/student/attendance.html`. A viewer answers: "What's the overall attendance rate? How many sessions present / absent / late / excused? What's the month-over-month trend? Per session: when, which course, which session number, which teacher, what status, and what notes?" — entirely from the page.

### Implementation for User Story 6

- [X] T040 [US6] Create `pages/student/attendance.html` by copying the student-side shell. Set `<title>سجل الحضور — منصة إدارتي</title>`. Per research.md §R4, NO sidebar entry is set as `aria-current="page"` (the student sidebar has no dedicated "الحضور" entry — the breadcrumb anchors back-navigation).
- [X] T041 [US6] Add `<section id="att-header">` with breadcrumb (`الرئيسية` → `dashboard.html` / `التقارير` → `reports.html` / `سجل الحضور` current) + h1 "سجل الحضور" + subtitle "تتبّع حضورك في كل حصة منذ بداية الفصل" + context caption "ديسمبر 2025 – مايو 2026 (الفصل الثاني)" (FR-024).
- [X] T042 [US6] Add `<section id="att-summary">` with exactly 6 summary cards (1/2-3/6-col). Card IDs + values + hues + icons per contracts/attendance.md §Summary cards: att-card-total (إجمالي الحصص, 60, primary, calendar) / att-card-present (حاضر, 54, success, check) / att-card-absent (غائب, 2, danger, x) / att-card-late (متأخر, 3, warning, clock) / att-card-excused (معذور, 1, info, shield) / att-card-rate (نسبة الحضور, 92%, success, trending-up). Color paired with icon (FR-025).
- [X] T043 [US6] Add `<section id="att-trend">` with the inline static SVG 5-bar chart per research.md §R12 + contracts/attendance.md §Trend visual. ≤ 80 LOC, no `<script>`. 5 `<rect>` bars (Dec 88% / Jan 92% / Feb 90% / Mar 95% / Apr 92%), reference line at 90% labeled "هدف الأكاديمية", month labels below + percentage labels above each bar, `role="img"` + `aria-label="اتجاه الحضور — 5 أشهر"`. The March bar uses success-500 fill (peak month); the other 4 use warning-400 (FR-026).
- [X] T044 [US6] Add `<section id="att-filters">` with ≥ 4 visual filter chips (الكل selected / حاضر / غائب-متأخر / معذور — each `<button type="button">`) + 2 `<select>` dropdowns (الدورة with 3 active courses + الكل / الشهر with 6 reporting months + الكل). All visual-only (FR-028).
- [X] T045 [US6] Add `<table id="att-table">` with `<thead>` for 6 columns (التاريخ / الدورة / الحصة / المعلم / الحالة / ملاحظات) and `<tbody>` with 8 rows in reverse-chronological order per research.md §R13. Status badges pair color + icon (success-check / danger-x / warning-clock / info-shield) on every row. Sample data covers all 4 named statuses (5 حاضر + 1 متأخر + 1 معذور + 1 غائب). At < 768 px the table collapses to single-column cards (`<table class="hidden md:table">` + `<div class="md:hidden">`). At the bottom of the section, append an HTML comment block: `<!-- 52 سجلات إضافية تظهر بعد التمرير في النسخة الكاملة -->` (FR-027 / FR-029).
- [X] T046 [US6] Verify the page against `contracts/attendance.md §Grep checks` — all 7 grep checks pass (att-card- ≥ 6; svg ≥ 1; rect ≥ 5; 4 statuses ≥ 8; canonical 92% ≥ 2; reports.html ≥ 1; no Download/Print/Share/WhatsApp clickable elements).

**Checkpoint**: User Story 6 fully functional. The student `monthly-report.html` mini-summary CTA now resolves to a real page.

---

## Phase 9: User Story 7 — Exams Hub (Priority: P2)

**Goal**: Build `pages/student/exams.html` — the comprehensive exam catalog (Q2 inclusive-hub resolution).

**Independent Test**: Open `pages/student/exams.html`. A viewer answers: "How many upcoming exams? When and on what course? How many completed exams have they had this term, with what scores? What's the most recent monthly result? Per exam: title, course, date, score (or '—' if upcoming), status, and where do I open the full exam details?" — entirely from the page.

### Implementation for User Story 7

- [X] T047 [US7] Create `pages/student/exams.html` by copying the student-side shell. Set `<title>الاختبارات — منصة إدارتي</title>`, mark "الاختبارات" as `is-active` + `aria-current="page"` (FR-001).
- [X] T048 [US7] Add `<section id="ex-header">` with h1 "الاختبارات" + subtitle "متابعة الاختبارات القادمة، المكتملة، والشهرية في مكان واحد" + count caption "اختباران قادمان — 5 اختبارات شهرية مجتازة — 12 اختباراً مكتملاً هذا الفصل" (FR-030).
- [X] T049 [US7] Add `<section id="ex-filters">` with ≥ 3 `<select>` dropdowns (الدورة / الشهر / الحالة, each with options matching contracts/exams.md §Filter row) + 1 `<input type="search" placeholder="ابحث عن اختبار...">`. All visual-only (FR-031).
- [X] T050 [US7] Add `<div id="ex-tabs" role="tablist">` with exactly 3 `<button>` tab pills using the existing main.js `data-tab` / `data-tabpanel` convention (per T002 reconnaissance): "اختبارات قادمة" `data-tab="upcoming"` SELECTED (`aria-selected="true"`), "اختبارات مكتملة" `data-tab="completed"`, "اختبارات شهرية" `data-tab="monthly"`. At < 768 px the strip is `overflow-x-auto`. NO new JS — the existing handler picks these up by attribute (FR-032 / FR-036).
- [X] T051 [US7] Add `<section id="ex-panel-upcoming" data-tabpanel="upcoming">` with ≥ 2 upcoming-exam cards per contracts/exams.md §Upcoming panel. Card 1: "اختبار شهر مايو — القرآن الكريم المستوى الثالث" / 28 مايو 2026 / 45 دقيقة / الأستاذ أحمد بن عبد الله / "قادم" pill (info-100 + calendar) / CTA → `exam-details.html`. Card 2: "اختبار قواعد اللغة العربية — أسبوع 22" / 14 مايو 2026 / 30 دقيقة / الأستاذة منى سعد / "قادم" / CTA → `exam-details.html` (FR-033).
- [X] T052 [US7] Add `<section id="ex-panel-completed" data-tabpanel="completed" hidden>` with a table of ≥ 4 completed-exam rows per research.md §R16 + contracts/exams.md §Completed panel. Columns: التاريخ / العنوان / الدورة / الدرجة / الحالة / إجراء. Rows include 3 ناجح + 1 يحتاج إعادة (row 4: "اختبار مفردات اللغة العربية" 12/20). Each row CTA → `exam-details.html` (FR-034).
- [X] T053 [US7] Add `<section id="ex-panel-monthly" data-tabpanel="monthly" hidden>` with a small caption (`هذه الاختبارات تظهر أيضاً في صفحة "الاختبارات الشهرية المجتازة" داخل الإنجازات` — slate-50 + info icon, NOT a clickable link) + a table of 5 monthly rows per contracts/exams.md §Monthly panel. Rows BYTE-IDENTICAL to Spec 005's `pages/student/monthly-exams-passed.html`: ديسمبر 90% / يناير 78% / فبراير 82% / مارس 95% (parchment-tinted, certificate-attached) / أبريل 88%. Each row CTA → `exam-details.html` (FR-035).
- [X] T054 [US7] Verify the page against `contracts/exams.md §Grep checks` (SC-004) — all 9 grep checks pass (data-tab ≥ 3; data-tabpanel ≥ 3; exam-details.html ≥ 11; ناجح ≥ 3; يحتاج إعادة ≥ 1; قادم ≥ 2; 95/100 ≥ 1; 88/100 ≥ 1; main.js LOC = 68). Manual cross-check: the 5 monthly rows match Spec 005's `monthly-exams-passed.html` byte-for-byte for date / score / status / course.

**Checkpoint**: User Story 7 fully functional. Every prior-spec student-side `exams.html` link (dashboard / weekly-plan / learning-journey) resolves.

---

## Phase 10: User Story 8 — Exam Details (Priority: P3)

**Goal**: Build `pages/student/exam-details.html` — the deepest single-exam drill-down (March 2026 Quran-L2-final, 95%).

**Independent Test**: Open `pages/student/exam-details.html`. A viewer answers: "Which exam? Course? Teacher? Date? Duration? Final score and percentage? Pass/fail status? Per question category, how did the student score? Strengths / weaknesses? Teacher recommendation? Was a certificate awarded — and if so, where do I view it?" — entirely from the page.

### Implementation for User Story 8

- [X] T050 [US8] Create `pages/student/exam-details.html` by copying the student-side shell. Set `<title>تفاصيل الاختبار — اختبار شهر مارس — منصة إدارتي</title>`, mark "الاختبارات" as `is-active` (children-of since this is a sub-page of exams.html) (FR-001).
- [X] T050 [US8] Add `<section id="ed-header">` with h1 "اختبار شهر مارس — القرآن الكريم المستوى الثاني (الاختبار النهائي)" + meta strip (course chip primary-100 / teacher chip avatar أ.أ + الأستاذ أحمد بن عبد الله / date "15 مارس 2026" + calendar icon / duration "45 دقيقة" + clock icon / type pill "اختبار شهري" primary-100 + calendar-clock icon) (FR-037).
- [X] T050 [US8] Add `<section id="ed-result">` with parchment-tinted styling (`bg-amber-50 ring-1 ring-amber-200` echoing Spec 005) + numeric score "95 / 100" (display weight, primary-900) + percentage "95%" + horizontal progress bar (success-500 fill at 95% width) + status pill "ممتاز — اجتاز الاختبار" (success-100 + star icon, success-700 text) (FR-038).
- [X] T050 [US8] Add `<section id="ed-categories">` with a labeled grid of 3 category rows per research.md §R17 + contracts/exam-details.md §Category breakdown. Row 1: حفظ السور 38/40 (95%) "إتقان كامل لسورة الفجر، خطأ بسيط في آيتي 3 و 7". Row 2: تجويد 28/30 (93%) "تطبيق صحيح لأحكام الميم الساكنة". Row 3: فهم وتفسير 29/30 (97%) "فهم عميق للمعاني العامة للسور المختارة". Each row has a horizontal progress bar matching its percentage. Visual layout mirrors Spec 004 `submission-feedback.html`'s four-axis Quran evaluation grid (FR-039).
- [X] T050 [US8] Add `<section id="ed-strengths-weaknesses">` with 2 side-by-side panels (1 col mobile / 2 col tablet+). نقاط القوّة (success-50 / ≥ 3 bullets, check-circle icon): إتقان حفظ سورة الفجر / تطبيق أحكام الميم الساكنة / فهم تفسير الآيات. نقاط للتحسين (warning-50 / ≥ 2 bullets, alert-circle icon): التجويد في الآيات الطويلة / تنويع الإيقاع في القراءة الجهرية (FR-040).
- [X] T060 [US8] Add `<section id="ed-recommendation">` with a quote block (info-50 background, primary-700 author chip) containing the 4-sentence Arabic recommendation from contracts/exam-details.md §Teacher recommendation, attributed to "الأستاذ أحمد بن عبد الله — 15 مارس 2026" (FR-041).
- [X] T061 [US8] Add `<section id="ed-related-cert">` (parchment-tinted to match `#ed-result`): cert name "شهادة إتمام المستوى الثاني — أساسيات أحكام النون الساكنة" + issue date "1 مارس 2026" + teacher name "الأستاذ أحمد بن عبد الله" + primary CTA `<a href="certificate-preview.html">عرض الشهادة</a>`. Below this section, append HTML comment blocks documenting the 3 alternative variants per contracts/exam-details.md (no-cert / not-yet-graded / failed-exam) (FR-042).
- [X] T062 [US8] Verify the page against `contracts/exam-details.md §Grep checks` (SC-005) — all 6 grep checks pass (#ed- ≥ 6; certificate-preview.html ≥ 1; 95/100 ≥ 1; 95% ≥ 2; اختبار شهر مارس ≥ 1; teacher name ≥ 2).

**Checkpoint**: User Story 8 fully functional. `monthly-exams-passed.html` (Spec 005) and `exams.html` (Spec 006) both have a real destination for their "View details" CTAs. The cross-spec link to Spec 005's `certificate-preview.html` is operational.

---

## Phase 11: Polish (Cross-Cutting Validation)

**Purpose**: Final sweeps across all eight pages to confirm every Success Criterion (SC-001 → SC-018) passes and every Definition-of-Done gate (1-12) is green before sign-off. These tasks read different files / concerns and are largely parallelizable.

- [X] T060 Run `npm run build:css` from repo root (picks up the optional T003 `@media print` extension if applied AND any new utility classes used by the eight new pages). Verify `wc -c assets/css/output.css` ≤ 70,000 bytes (well under the 80 KB ceiling; budget allows ≤ 8 KB increment over Spec 005's 60,976 bytes). If T003 was applied, also verify `grep -c '@media print' assets/css/output.css` ≥ 1 + `grep -c '#mr-actions' assets/css/output.css` ≥ 1 + `grep -c '#cr-actions' assets/css/output.css` ≥ 1.
- [X] T060 [P] Verify `lang="ar" dir="rtl"` is set on `<html>` for each of the 8 new pages: `grep -L 'lang="ar" dir="rtl"' pages/student/{reports,monthly-report,attendance,exams,exam-details}.html pages/parent/{my-children,child-reports}.html pages/teacher/student-reports.html` — must list zero files.
- [X] T060 [P] Verify zero `href="#"` placeholder links across all 8 pages (FR-007 / SC-012): `grep -nE ' href="#"' [8 files]` — must return zero matches. `href="#planned"`, `href="?month=…"`, `href="?child=sara"`, `href="#mr-teacher-notes"` (in-page anchor) are all allowed.
- [X] T060 [P] Verify zero Eastern Arabic-Indic digits (FR-006 / SC-013): `grep -nP '[٠-٩۰-۹]' [8 files]` — zero matches.
- [X] T060 [P] Verify zero placeholder filler (SC-010): `grep -nEi 'lorem|Item [0-9]|TBD|FIXME|Course [0-9]|Student [0-9]' [8 files]` — zero matches.
- [X] T060 [P] Verify no JS-rendered content + main.js stays at 68 LOC (FR-002 / SC-011): `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js [8 files]` — zero matches; `wc -l assets/js/main.js` shows exactly 68 lines (Spec 005 baseline unchanged).
- [X] T060 [P] **Verify the action-discipline rule** (FR-010 / SC-016): run `grep -nE '(تنزيل|Download|طباعة|Print|واتساب|WhatsApp|مشاركة|حفظ التقرير)' pages/student/{reports,attendance,exams,exam-details}.html pages/parent/my-children.html`. Matches MUST appear ZERO times in clickable elements (`<button>`, `<a>`) on these 5 pages. The string `مشاركة` may appear in static text/captions (e.g., a column caption); verify visually that it is never inside a clickable element. Then verify the 3 canonical pages HAVE the buttons: `grep -c '<button[^>]*type="button"' pages/student/monthly-report.html` ≥ 3, same for `pages/parent/child-reports.html` ≥ 3, same for `pages/teacher/student-reports.html` ≥ 2.
- [X] T070 [P] Verify FR-008 form-input label pairing on `pages/teacher/student-reports.html` (SC-008): extract every `id="sr-…"` from input/textarea/select tags and assert each has a matching `for="sr-…"`. Run: `grep -oE '(input|textarea|select)[^>]*\bid="[^"]+"' pages/teacher/student-reports.html | grep -oE 'id="sr-[^"]+"' | sort -u > /tmp/ids.txt; grep -oE 'for="sr-[^"]+"' pages/teacher/student-reports.html | sort -u > /tmp/fors.txt; comm -23 <(sed 's/id=/for=/' /tmp/ids.txt) /tmp/fors.txt` — zero output expected.
- [X] T070 [P] **Cross-page reconciliation** for canonical April 2026 figures (FR-005 / FR-062 / SC-009): `for f in pages/student/reports.html pages/student/monthly-report.html pages/parent/child-reports.html pages/teacher/student-reports.html; do echo "=== $f ==="; grep -c '88%' "$f"; done` — every count ≥ 1. Same loop with `92%` across `reports / monthly-report / child-reports / attendance` — every count ≥ 1. Same loop with `88 / 100` across `monthly-report / child-reports / student-reports` — every count ≥ 1. Same loop with `ممتاز` across `reports / monthly-report / child-reports / student-reports` — every count ≥ 1.
- [X] T070 [P] **Quote byte-identity** (SC-018): the Quran-teacher's primary quote MUST appear byte-identically in 3 files. Run `grep -c '"أداء عبد الرحمن في الحفظ هذا الشهر ممتاز' pages/student/monthly-report.html pages/parent/child-reports.html pages/teacher/student-reports.html` — all 3 counts ≥ 1.
- [X] T070 [P] Verify the 3-step tri-state on `pages/parent/child-reports.html` (FR-049 / SC-007): `grep -c 'يحتاج إلى دعم' pages/parent/child-reports.html` ≥ 1 + `grep -c 'مستقر' pages/parent/child-reports.html` ≥ 1 + `grep -c 'متحسّن' pages/parent/child-reports.html` ≥ 1. Visual inspection: only the متحسّن step has `bg-success-700` + check icon + ring-4; the other two steps are muted (slate-100 + opacity-50).
- [X] T070 [P] Verify the 4 named attendance statuses on `pages/student/attendance.html` (FR-025 / FR-027 / SC-003): `grep -c 'حاضر\|غائب\|متأخر\|معذور' pages/student/attendance.html` ≥ 8 (4 cards × 1 each + 4 statuses × ≥ 1 row each). Each status pairs its hue (success/danger/warning/info) with its icon (check/x/clock/shield).
- [X] T070 [P] **Cross-spec exam-row reconciliation** (Q2 inclusive-hub resolution / FR-035 / SC-009): the 5 monthly rows on `pages/student/exams.html` (`#ex-panel-monthly`) MUST be byte-identical for date + score + status + course chip to Spec 005's `pages/student/monthly-exams-passed.html`. Run a side-by-side diff of the 5 row blocks: `for month in 'ديسمبر 2025' 'يناير 2026' 'فبراير 2026' 'مارس 2026' 'أبريل 2026'; do echo "$month:"; grep -c "$month" pages/student/exams.html pages/student/monthly-exams-passed.html; done` — every line ≥ 1 in BOTH files.
- [X] T070 [P] Verify the @media print rule (research.md §R14 / T003): `grep -c '@media print' assets/css/input.css` ≥ 1; `grep -c '#mr-actions' assets/css/input.css` ≥ 1 (only if T003 path B was taken — class-based selectors that auto-cover are also acceptable). After T063 rebuild: `grep -c '@media print' assets/css/output.css` ≥ 1.
- [X] T070 [P] **Color-with-text-and-icon discipline** (FR-004 / Constitution IV): walk all 8 pages and verify every status pill, every category-breakdown row, every progress bar, every named-status badge, every tri-state step pairs hue with text label + icon. Specifically verify: monthly-report's overall "ممتاز" pill (success + star + "ممتاز" text); the 4 attendance statuses (success-check / danger-x / warning-clock / info-shield); the 5 monthly-exam status pills (ممتاز success-star / جيد جداً info-check); the upcoming-exam "قادم" (info-calendar); the completed "ناجح" (success-check) and "يحتاج إعادة" (warning-retry); the WhatsApp button (success-50 + chat-bubble icon + "مشاركة عبر واتساب" text).
- [X] T070 [P] Responsive audit at 375 / 768 / 1024 / 1280 px (FR-009 / FR-015 / FR-029 / FR-036 / FR-047 / FR-055 / FR-061 / SC-014): verify on every page (a) no horizontal page-level scrollbar at any breakpoint, (b) tables collapse to single-column cards at < 768 px (`reports`'s detail table; `attendance`'s session table; `exams`'s completed + monthly tables), (c) mini-summary cards collapse from 4-col to 2-col to 1-col, (d) tab pills on `exams.html` stay reachable via horizontal scroll on mobile, (e) tri-state track on `child-reports.html` stays readable at 375 px (steps may stack vertically), (f) attendance trend SVG scales without distortion, (g) parchment-styled headers on monthly-report + exam-details + result-panel maintain proportions.
- [X] T070 [P] **Cross-page navigation chain audit** (SC-015): every CTA / link from this spec's eight pages must resolve. Run `grep -hoE 'href="[^"]+"' pages/student/{reports,monthly-report,attendance,exams,exam-details}.html pages/parent/{my-children,child-reports}.html pages/teacher/student-reports.html | sort -u | while read href; do path=$(echo "$href" | sed 's/href="//;s/"$//'); case "$path" in '#'*|'?'*|'http'*|'../'*|'mailto:'*) ;; *) test -f "pages/student/$path" -o -f "pages/parent/$path" -o -f "pages/teacher/$path" || echo "BROKEN: $path"; ;; esac; done` — output should be empty (zero broken outbound links). Inbound chain (per research.md §R18): student dashboard / weekly-plan / learning-journey → reports + exams (resolve via Spec 006 files); parent dashboard → my-children + child-reports (resolve); teacher dashboard → student-reports (resolves). The 4 inherited 404s (parent-attendance + teacher-attendance) are documented in spec.md §Out of scope and are NOT this spec's responsibility.
- [X] T080 [P] **Spec 001-005 zero-shell-drift audit** (FR-065): verify zero edits to any prior-spec page. `git status` from repo root MUST list ONLY: the 8 new HTML files, `specs/006-reports-attendance-exams/`, optionally `assets/css/input.css` (if T003 path B was taken), and `assets/css/output.css` (rebuilt by T063). Specifically: NO edits to `pages/student/{dashboard,learning-journey,weekly-plan,notifications,browse-courses,my-courses,course-details,live-sessions,live-session-details,session-checkout-preview,assignments,assignment-details,submit-assignment,submission-feedback,achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html`, NO edits to `pages/parent/dashboard.html`, NO edits to `pages/teacher/{dashboard,homework-review,homework-submission-details}.html`, NO edits to `pages/admin/*.html`, NO edits to `assets/js/main.js`, NO edits to `tailwind.config.js`. CLAUDE.md edit (the SPECKIT block update) is acceptable since that file IS spec metadata.
- [X] T080 Walk through the 18-row Success Criteria validation table in `quickstart.md §2` end-to-end and the 12-gate Definition-of-Done verification in `quickstart.md §3` end-to-end (SC-017 — meta gate). Record outcomes inline. The feature is Done only when all 18 SCs and all 12 DoD gates pass.

**Final checkpoint**: Feature 006 is Done when T081 is complete with all 18 SCs and all 12 Definition-of-Done gates green.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: T001 alone — read-only baseline check.
- **Phase 2 (Foundational)**: T002 (tabs handler reconnaissance) → T003 (optional CSS extension). Both must complete before any user-story phase. T003 is `[P]` because it touches `input.css` while T002 is read-only.
- **Phase 3 (US1)**: T004 → T005 → T006 → T007 → T008 → T009 → T010. Sequential, same file (`reports.html`).
- **Phase 4 (US2)**: T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018 → T019. Sequential, same file (`monthly-report.html`).
- **Phase 5 (US3)**: T020 → T021 → T022 → T023. Sequential, same file (`my-children.html`).
- **Phase 6 (US4)**: T024 → T025 → T026 → T027 → T028 → T029 → T030 → T031. Sequential, same file (`child-reports.html`).
- **Phase 7 (US5)**: T032 → T033 → T034 → T035 → T036 → T037 → T038 → T039. Sequential, same file (`student-reports.html`).
- **Phase 8 (US6)**: T040 → T041 → T042 → T043 → T044 → T045 → T046. Sequential, same file (`attendance.html`).
- **Phase 9 (US7)**: T047 → T048 → T049 → T050 → T051 → T052 → T053 → T054. Sequential, same file (`exams.html`).
- **Phase 10 (US8)**: T055 → T056 → T057 → T058 → T059 → T060 → T061 → T062. Sequential, same file (`exam-details.html`).
- **Phase 11 (Polish)**: T063 must run first (CSS build); T064–T080 are all `[P]`; T081 runs last as the sign-off gate.

User stories US1–US8 are independent of each other once Foundational completes — they touch different files. After Phase 2 completes, all 8 stories could in principle run in parallel by separate implementers. Recommended order: US1 first (MVP), then US2 + US3 + US4 + US5 (the other P1 stories) in parallel, then US6 + US7 (P2) in parallel, then US8 (P3), then Polish.

### Within Each User Story

- Page creation (shell copy) MUST run first (each phase's first task).
- Section additions can be authored in any order within a phase as long as the page file isn't being edited concurrently (single implementer per file).
- Verification task is the last task in each phase.

### Parallel Opportunities

- **Within stories**: None — every story edits one file sequentially.
- **Across stories (after Foundational)**: All 8 user-story phases can run in parallel because each edits a distinct HTML file. The student-side pages (US1, US2, US6, US7, US8) and parent-side pages (US3, US4) and teacher-side page (US5) are especially independent — different role sidebars, different file directories — so a three-implementer split is natural.
- **Within Polish**: T064–T080 are all `[P]` (17 audit tasks across different concerns). Can be batched by a single agent or distributed across reviewers.

---

## Parallel Example: Day-1 fan-out after Foundational

```bash
# After T001-T003 complete, three implementers can pick up:
Implementer A → Phase 3 (US1: reports.html, T004-T010)
Implementer A → Phase 4 (US2: monthly-report.html, T011-T019) [after US1]
Implementer B → Phase 5 (US3: my-children.html, T020-T023)
Implementer B → Phase 6 (US4: child-reports.html, T024-T031)
Implementer C → Phase 7 (US5: student-reports.html, T032-T039)

# Then a second wave:
Implementer A → Phase 8 (US6: attendance.html, T040-T046)
Implementer B → Phase 9 (US7: exams.html, T047-T054)
Implementer C → Phase 10 (US8: exam-details.html, T055-T062)

# Polish wave (single implementer or batched):
T063 (CSS build) → T064-T080 (parallel audits) → T081 (sign-off)
```

---

## Suggested MVP scope

**MVP**: Complete Phase 1 (T001) + Phase 2 (T002 + T003) + Phase 3 (T004–T010) only. Result: a fully-built `pages/student/reports.html` showing the 6-month chip strip + 5 summary cards + 3-row per-course detail table + footer CTA. The MVP unblocks every existing inbound link from Specs 001-005 — the dashboard's "التقارير" sidebar entry, the weekly-plan and learning-journey footer "التقارير" links — all currently 404 and become live destinations. **10 tasks total to MVP.**

A meaningful next-increment is Phase 4 (US2: monthly-report.html, 9 tasks) — once this is done, the reports.html row CTAs + the dashboard's monthly-report-card preview CTA all resolve, and the canonical April 2026 report is readable.

## Per-story task counts

| Phase | Story | Task count |
|---|---|---|
| 1 | Setup | 1 |
| 2 | Foundational | 2 |
| 3 | US1 — Student Reports Hub | 7 |
| 4 | US2 — Monthly Report | 9 |
| 5 | US3 — Parent Children Overview | 4 |
| 6 | US4 — Parent Child Report | 8 |
| 7 | US5 — Teacher Student Report | 8 |
| 8 | US6 — Attendance Log | 7 |
| 9 | US7 — Exams Hub | 8 |
| 10 | US8 — Exam Details | 8 |
| 11 | Polish | 19 |
| **Total** |  | **81** |

## Independent test criteria

Each user story has its own self-contained validation:

- **US1**: 6-chip month strip + 5 summary cards + 3-row detail table + Details CTAs all resolve to `monthly-report.html`.
- **US2**: 7-section monthly report (header → overall → 4 mini-summaries → 3 teacher quotes → 3 reflection panels → parent summary → 3-button cluster) + canonical 89/100 evaluation.
- **US3**: 2 child cards (عبد الرحمن ممتاز + سارة يحتاج إلى دعم) reconcile with parent dashboard pin; both CTAs link to `child-reports.html`.
- **US4**: tri-state track (متحسّن active) + 4 plain-language summaries + suggested-parent-action panel + 3-button cluster including WhatsApp visual stub.
- **US5**: read-only context strip + 3 evaluation panels (every input has a paired label) + general-notes pre-filled with §R9 quote 1 + recommendation panel + 3-button cluster.
- **US6**: 6 summary cards + inline-SVG trend chart (5 bars) + ≥ 8 attendance rows covering all 4 named statuses + 4-named-status badge consistency.
- **US7**: 3 tab pills wired via existing main.js + ≥ 2 upcoming + ≥ 4 completed (with ≥ 1 ناجح + ≥ 1 يحتاج إعادة) + 5 monthly rows byte-identical to Spec 005's `monthly-exams-passed.html`.
- **US8**: parchment-tinted result panel (95/100) + 3 category rows + strengths/weaknesses + teacher recommendation + related-certificate panel CTA → `certificate-preview.html`.
