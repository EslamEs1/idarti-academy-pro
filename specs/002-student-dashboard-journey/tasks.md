---
description: "Task list for feature 002-student-dashboard-journey"
---

# Tasks: Student Dashboard and Learning Journey

**Input**: Design documents from `/specs/002-student-dashboard-journey/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md` (all present)

**Tests**: Not requested in the feature specification. Validation is manual visual review against the 12 success criteria (SC-001…SC-012) plus per-page acceptance scenarios. Audit tasks in Polish are visual checks, not unit tests.

**Organization**: Tasks are grouped by user story per `spec.md` priorities. Phases run in priority order (US1 P1 → US2 P2 → US3 P3 → US4 P3) after a small foundational phase that updates the shared shell partials. Within each user story, tasks edit a single HTML file sequentially — `[P]` markers are used only in Polish phase where the audit checks read different files.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to user stories from `spec.md` (US1, US2, US3, US4); omitted on Setup / Foundational / Polish
- All paths are relative to repo root: `/media/mekky/work/backend/idarti-academy-pro/`

## Path Conventions

This feature continues Spec 001's static-site layout. There is no `src/` or `tests/` tree. All deliverables are static HTML files under `pages/student/`, plus a one-time CSS rebuild.

---

## Phase 1: Setup

**Purpose**: Confirm Spec 001 baseline is in place. No new dependencies, no new tooling. This phase is a sanity check, not creation.

- [x] T001 Verify Spec 001 baseline by listing `assets/css/output.css` (must exist and be ≤ 80 KB), `assets/js/main.js` (must contain only the four sanctioned handlers), `pages/student/dashboard.html` (must be the Spec 001 shell), `components/student-sidebar.html` and `components/header.html` (must exist as reference partials). If any are missing, halt and instruct the user to complete Spec 001 first.

---

## Phase 2: Foundational (Shared Shell Updates)

**Purpose**: Update the two shared shell partials that every page in this feature embeds. These tasks must complete before any user-story page work begins so the four pages stay in shell-sync.

**⚠️ CRITICAL**: No user story work can begin until T002 and T003 are complete.

- [x] T002 Update `components/student-sidebar.html` per `contracts/student-shell-delta.md` §1: insert "رحلتي التعليمية" entry (Lucide `compass` icon, `href="learning-journey.html"`) between "الإنجازات" and "التقارير"; insert "خطة الأسبوع" entry (Lucide `clipboard-list` icon, `href="weekly-plan.html"`) between "التقويم" and "سجل المدفوعات". Final entry count: 15. Match exact markup snippets in the contract.
- [x] T003 Update `components/header.html` per `contracts/student-shell-delta.md` §3: convert the notification-bell `<button type="button">` to `<a href="notifications.html">`, preserving the existing class string, `aria-label="الإشعارات"`, the `<svg>` bell icon, and the `<span>` count overlay (still showing "3"). All other header markup remains byte-identical.

**Checkpoint**: Shared partials are now ready to be hard-embedded into the four pages.

---

## Phase 3: User Story 1 — Student Dashboard (Priority: P1) 🎯 MVP

**Goal**: Replace the placeholder student dashboard with a complete, motivational, ten-block experience that surfaces progress, parent confidence, weekly goals, sessions, homework, teacher notes, learning path, achievements, and a journey preview — all in Arabic with realistic sample data.

**Independent Test**: Open `pages/student/dashboard.html` from the file explorer. The student must be able to identify their name, level, weekly goal, next live session, latest teacher note, current badge count, and at least one meaningful CTA — all above the fold or with at most one scroll on a 1280×800 viewport. A parent looking over their shoulder must be able to summarize "what is the academy tracking for this student this month" in one sentence by reading the position-2 Parent Confidence Snapshot. All 11 acceptance scenarios in spec.md US1 must pass.

### Implementation for User Story 1

- [x] T004 [US1] Rewrite the page-level scaffold of `pages/student/dashboard.html`: keep `<!doctype html>` + `<html lang="ar" dir="rtl">` + Tajawal font links + `./../../assets/css/output.css` link (corrected: `../../assets/css/output.css`); body uses `bg-surface-50 text-text-base font-sans antialiased`; outer wrapper `<div class="min-h-screen flex">` containing the embedded student sidebar (with "الرئيسية" active via `is-active` + `aria-current="page"`), then `<div class="flex flex-1 flex-col min-w-0">` containing the embedded header (with bell as `<a href="notifications.html">` per T003) and `<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"><div class="max-w-screen-xl mx-auto space-y-6">…</div></main>`. Title `لوحة الطالب — منصة إدارتي`. Inside the inner `<div>`, leave 10 placeholder `<section>` skeletons keyed by id `db-hero`, `db-parent-snapshot`, `db-monthly-progress`, `db-weekly-goals`, `db-upcoming-session`, `db-homework`, `db-teacher-notes`, `db-path-progress`, `db-achievements`, `db-journey-preview` for tasks T005–T014 to fill in order.
- [x] T005 [US1] Fill `#db-hero` (Block 1 — Welcome Hero) per `contracts/student-dashboard-blocks.md`: gradient `bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-6 md:p-8 shadow-md`; greeting `أهلاً بعودتك، عبد الرحمن!` as `<h2 class="text-xl md:text-2xl font-bold">`; path+level subtitle `أنت الآن في مسار القرآن الكريم — المستوى الثالث`; motivational sentence `هدفك هذا الأسبوع: حضور حصتين وتسليم 3 واجبات.`; monthly progress bar at 68% with `role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" aria-label="التقدّم الشهري 68%"` plus visible `68%` numeric label; primary CTA `<a href="weekly-plan.html">عرض خطة الأسبوع</a>` styled `bg-accent-500 text-primary-900 font-semibold rounded-lg px-4 py-2 inline-flex items-center gap-2`; secondary CTA `<a href="my-courses.html">متابعة التعلم</a>` styled `border border-white/40 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 hover:bg-white/10`. Both CTAs include a Lucide chevron icon with `rtl:rotate-180`.
- [x] T006 [US1] Fill `#db-parent-snapshot` (Block 2 — Parent Confidence Snapshot) per `contracts/student-dashboard-blocks.md`: outer card `bg-accent-50 border-s-4 border-accent-500 rounded-2xl p-5 md:p-6 shadow-sm`; small caption row `ملخص يمكن لولي الأمر متابعته` in `text-xs uppercase tracking-wide text-accent-700 font-semibold` with a `users` Lucide icon; inner grid `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`; four data tiles per data-model E1 (attendance 92% + معدّل الحضور + `users` icon; homework 85% + الالتزام بالواجبات + `book-open-check` icon; last note quote + الأستاذ أحمد caption; next evaluation `12 مايو 2026` + تقييم شهر مايو + `calendar-clock` icon). Each tile uses `bg-white rounded-lg p-3 border border-accent-100`.
- [x] T007 [US1] Fill `#db-monthly-progress` (Block 3 — Monthly Progress Overview) per `contracts/student-dashboard-blocks.md`: section header `لمحة عن الشهر` (`<h3 class="text-base font-semibold mb-3">`); grid `grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4` of exactly 6 stat cards in this order: attendance 92%, homework 85%, quiz average 78%, level progress 60%, achievement points 1280, active live sessions 4. Each card `bg-white rounded-xl border border-slate-200 p-4 shadow-sm` with a `h-10 w-10 rounded-full bg-{token}-100 text-{token}-700` icon (success / primary / accent / info / warning / success), value in `text-2xl font-bold`, Arabic label in `text-xs text-text-muted leading-7`. Pair color with icon (FR-035).
- [x] T008 [US1] Fill `#db-weekly-goals` (Block 4 — Weekly Goals) per `contracts/student-dashboard-blocks.md`: card `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`; header row `<h3 class="text-base font-semibold">أهداف هذا الأسبوع</h3>` with a "عرض خطة الأسبوع كاملة" `<a href="weekly-plan.html">` link on the inline-end; `<ul>` of 4 goal rows from data-model E3, each row using `flex items-center justify-between gap-3 py-2.5 border-b border-slate-100 last:border-0` with leading visual checkbox + label + status badge from the Spec 001 catalog (mapped per E3: مكتمل → "مكتمل", قيد التنفيذ → "قيد المراجعة", لم يبدأ → "قيد الانتظار"). Inline-start checkbox is `disabled` so it shows state without inviting clicks; checked when status = مكتمل.
- [x] T009 [US1] Fill `#db-upcoming-session` (Block 5 — Upcoming Live Session) per `contracts/student-dashboard-blocks.md`: card `bg-primary-50 border border-primary-200 rounded-xl p-5 shadow-sm`; data per data-model E4 (title `أحكام الميم الساكنة — تطبيق عملي`, teacher `الأستاذ أحمد بن عبد الله` with `أ.أ` avatar, date `الإثنين 28 أبريل 2026 — 7:00 م`, course chip `القرآن الكريم — المستوى الثالث`, type badge `جماعي`); primary "انضمام للحصة" button styled `bg-primary-700 text-white rounded-lg px-4 py-2`; secondary "إضافة للتقويم" `border border-slate-300 rounded-lg px-4 py-2` linking to `calendar.html`. Use the `video` Lucide icon on the primary button and `calendar-plus` on the secondary. Wrap into `xl:` 2-column shared row with Block 6.
- [x] T010 [US1] Fill `#db-homework` (Block 6 — Homework Reminders) per `contracts/student-dashboard-blocks.md`: card `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`; header row `<h3>الواجبات المستحقة <span class="text-xs text-text-muted">(3)</span></h3>`; `<ul>` of the first 3 homework rows from data-model E5 (sorted by due date — 27 أبريل late first, then 30 أبريل, then 1 مايو) — each row shows title + course chip + due-date + status badge + teacher caption + "عرض الواجب" link to `assignments.html`. Footer link "عرض كل الواجبات" → `assignments.html`. Pair Block 5 + Block 6 inside a wrapping `<div class="grid grid-cols-1 xl:grid-cols-2 gap-6">` so the two cards align side-by-side at `xl:` (≥ 1280 px).
- [x] T011 [US1] Fill `#db-teacher-notes` (Block 7 — Teacher Notes) per `contracts/student-dashboard-blocks.md`: section header `ملاحظات معلميك`; grid `grid grid-cols-1 lg:grid-cols-3 gap-4` of 3 note cards from data-model E6 (positive — success accent; improvement — accent accent; quran-specific — primary accent). Each card `bg-white rounded-xl border-s-4 border-{state}-500 border-slate-200 p-4 shadow-sm` with category caption above body, body in `text-sm leading-7`, teacher avatar + name + date below.
- [x] T012 [US1] Fill `#db-path-progress` (Block 8 — Learning Path Progress) per `contracts/student-dashboard-blocks.md`: card `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`; header `<h3>مسار القرآن الكريم — التقدّم العام</h3>` + overall path progress bar at `60%` + numeric `60%` label; horizontal stepper on `lg:+` (vertical at mobile via `flex-col lg:flex-row`) of the 4 levels from data-model E2 with state pill colors (success / success / accent / slate); active Level 3 card has `border-2 border-accent-500` + `حالياً` pill + a mini progress bar showing 60% at the level; Level 4 uses `lock` Lucide icon and `text-slate-400` to convey locked state.
- [x] T013 [US1] Fill `#db-achievements` (Block 9 — Achievement Preview) per `contracts/student-dashboard-blocks.md`: card `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`; header `<h3>إنجازاتك الأخيرة</h3>` + "عرض كل الإنجازات" link to `achievements.html`; grid `grid grid-cols-1 sm:grid-cols-3 gap-3` of 3 badge cards from data-model E7 (نجم الحضور — `star`; بطل الواجبات — `award`; تميّز شهر أبريل — `trophy`). Each card `bg-accent-50 border border-accent-200 rounded-xl p-4 text-center` with 48×48 `text-accent-700` icon, name in `text-sm font-semibold`, date in `text-xs text-text-muted`.
- [x] T014 [US1] Fill `#db-journey-preview` (Block 10 — Journey Timeline Preview) per `contracts/student-dashboard-blocks.md`: card `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`; header `<h3>محطات من رحلتك</h3>` + "عرض الرحلة كاملة" link to `learning-journey.html`; compact vertical timeline (using a 2-px `border-s-2 border-slate-200` rail + dots) of milestones #5–#9 from data-model E8 in chronological order (oldest at top), with the current milestone (Level 3 start) carrying the accent ring + `حالياً` pill exactly as on the dedicated journey page. Each entry: dot + date in `text-xs text-text-muted` + title in `text-sm font-semibold` + status badge inline.

**Checkpoint**: User Story 1 (MVP) is complete and independently testable. The dashboard now contains all 10 blocks in the post-Q3 order; SC-001, SC-008 are validated by inspection.

---

## Phase 4: User Story 2 — Learning Journey Page (Priority: P2)

**Goal**: Build a single-purpose page that tells the student's full progress story — a vertical chronological timeline of ≥ 9 milestones from enrollment to the current active level — so a parent or the student can see the entire arc in one view.

**Independent Test**: Open `pages/student/learning-journey.html` from the file explorer. Without any other context, a viewer must be able to answer: "Has this student been with the academy long? Have they completed any levels? Have they earned any certificates? What is happening right now?" — entirely by reading the timeline. The current milestone (Level 3 start) must be visually distinct from completed and upcoming entries (color + icon + word, not color alone). All 4 acceptance scenarios in spec.md US2 must pass.

### Implementation for User Story 2

- [x] T015 [US2] Create `pages/student/learning-journey.html` page-level scaffold per `contracts/learning-journey.md`: `<!doctype html>` + `<html lang="ar" dir="rtl">` + Tajawal font links + `../../assets/css/output.css`; body wrapper identical to dashboard except sidebar active entry is "رحلتي التعليمية" (`is-active` + `aria-current="page"`); header bell is the `<a href="notifications.html">` form; `<title>` is `رحلتي التعليمية — منصة إدارتي`; header h1 `رحلتي التعليمية`, subtitle `سجل تقدّمك منذ بداية المسار`; `<main>` contains an intro card per the contract (4 mini stats: تاريخ الانضمام `5 سبتمبر 2025`, مدة العضوية `8 أشهر`, محطات مكتملة `9`, شهادة معتمدة `1`) and an empty `<ol class="relative ms-4 md:ms-6 border-s-2 border-slate-200">` placeholder for tasks T016–T017 to populate.
- [x] T016 [US2] Populate the first 5 milestone `<li>` entries (positions 1–5 from data-model E8) inside the `<ol>` of `pages/student/learning-journey.html`: الانضمام للأكاديمية (5 سبتمبر 2025 — مكتمل), بداية أول دورة (12 سبتمبر 2025 — مكتمل), حضور أول حصة مباشرة (15 سبتمبر 2025 — مكتمل), تسليم أول واجب (22 سبتمبر 2025 — مكتمل), اجتياز اختبار شهري (30 أكتوبر 2025 — ناجح). Each `<li>` uses the rail-dot + card structure from `contracts/learning-journey.md` "Timeline entry contract" with `{state}=success` for the completed milestones and the appropriate Lucide icons (compass / book-open / video / check-circle / clipboard-check). Each card includes title + date + related-course caption + 1-2 sentence Arabic description + a status badge from the catalog.
- [x] T017 [US2] Append the last 4 milestone `<li>` entries (positions 6–9 from data-model E8) inside the same `<ol>`: إنهاء المستوى الأول (20 ديسمبر 2025 — ممتاز), نيل أول شهادة (5 يناير 2026 — ممتاز), نيل وسام 'بطل الواجبات' (10 فبراير 2026 — ممتاز), بدء المستوى الثالث (1 أبريل 2026 — حالياً). The last (current) entry MUST visually distinguish itself per `contracts/learning-journey.md` and FR-032: rail dot upgraded to `h-5 w-5 ring-8 ring-accent-100`, card border `border-2 border-accent-500`, "حالياً" pill (`bg-accent-100 text-accent-700`) above the title, accent-colored icon chip, no status badge (the "حالياً" pill takes its place). Add a "العودة للرئيسية" link (linking to `dashboard.html`) below the `<ol>`.

**Checkpoint**: User Story 2 complete. The journey page shows ≥ 9 chronological milestones in a vertical timeline with the current milestone visually distinct (SC-009).

---

## Phase 5: User Story 3 — Weekly Plan Page (Priority: P3)

**Goal**: Build a single-purpose page that shows everything the student should do this week — week range, goals, sessions, homework deadlines, reviews, exam prep, teacher reminders, progress checklist, and a motivational note — across exactly 9 content blocks, every block populated.

**Independent Test**: Open `pages/student/weekly-plan.html` from the file explorer. A reader must be able to identify the date range covered, see at least one item in each of the 8 sub-sections after the week header, and tell which goals/checklist items are already done versus pending — without any other page context. All 7 acceptance scenarios in spec.md US3 must pass.

### Implementation for User Story 3

- [x] T018 [US3] Create `pages/student/weekly-plan.html` page-level scaffold per `contracts/weekly-plan.md`: same page wrapper as dashboard but sidebar active entry is "خطة الأسبوع" (`is-active` + `aria-current="page"`); `<title>` is `خطة الأسبوع — منصة إدارتي`; header h1 `خطة الأسبوع`, subtitle `27 أبريل – 3 مايو 2026`; `<main>` contains Block 1 (`#wk-range` — gradient hero card with week range, mission subtitle, and 3 inline mini-pills: `5 حصص مجدولة`, `4 واجبات مستحقة`, `1 اختبار شهري قادم`) and an empty `<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">` placeholder for tasks T019–T022 to populate with 8 more blocks following the contract's grid-span layout.
- [x] T019 [US3] Inside the `lg:grid-cols-3` container of `pages/student/weekly-plan.html`, build Block 2 (`#wk-goals`, `lg:col-span-1`) with 4 goal rows from data-model E3 (same as dashboard Block 4 — same status mapping); then Block 3 (`#wk-sessions`, `lg:col-span-2`) with ≥ 2 session rows from data-model E9.2 (الإثنين 28 أبريل 7:00 م — جماعي with الأستاذ أحمد; الأربعاء 30 أبريل 5:00 م — خاص with الأستاذ أحمد). Each session row reuses the E4 visual contract in compact form. Section CTAs per the contract.
- [x] T020 [US3] Build Block 4 (`#wk-homework`, `lg:col-span-2`) with the ≥ 3 homework rows from data-model E5/E9.3 (sorted by due date) — each row shows title + course chip + due-date pill + status badge + teacher caption + "عرض الواجب" link. Then Block 5 (`#wk-reviews`, `lg:col-span-1`) with the ≥ 2 review tasks from data-model E9.4 — each item uses the `book-marked` Lucide icon + label + suggested-duration caption.
- [x] T021 [US3] Build Block 6 (`#wk-exam-prep`, `lg:col-span-1`) with the ≥ 2 exam-prep items from data-model E9.5 plus a leading countdown banner `bg-warning-50 border-s-4 border-warning-400 rounded-lg p-3` reading "اختبار المستوى الثالث في 5 مايو 2026 — تبقّى 6 أيام" with a `clock` Lucide icon. Then Block 7 (`#wk-teacher-reminders`, `lg:col-span-2`) with ≥ 2 reminder cards from data-model E9.6 — each card `bg-accent-50 border border-accent-200 rounded-lg p-3` with teacher avatar + reminder body + date.
- [x] T022 [US3] Build Block 8 (`#wk-checklist`, `lg:col-span-2`) with the ≥ 5 checklist items from data-model E9.7 — each row uses `<input type="checkbox" disabled>` whose `checked` attribute reflects the data-model state; checked rows get a strike-through label + `text-text-muted`, unchecked rows stay `text-text-base`. Then Block 9 (`#wk-motivation`, `lg:col-span-1`) with the motivational quote from data-model E9.8 — card `bg-success-50 border-s-4 border-success-500 rounded-xl p-5` with a `quote` Lucide icon ornament in the top-start corner at `text-success-300`, the Arabic quote in `text-sm leading-7 italic`, and a teacher attribution row (الأستاذ أحمد بن عبد الله — 27 أبريل 2026).

**Checkpoint**: User Story 3 complete. The weekly plan page shows all 9 required blocks each with ≥ 2 items (SC-010).

---

## Phase 6: User Story 4 — Notifications Inbox Page (Priority: P3)

**Goal**: Build a single-purpose page showing ≥ 8 notifications spanning all 6 types (homework, live-session, teacher-feedback, payment-family, achievement, exam) as a single chronological list (newest first), with read/unread distinction visible by 3 axes (border-start + dot + weight). Zero new JavaScript.

**Independent Test**: Open `pages/student/notifications.html` from the file explorer. A viewer must be able to count read vs unread notifications, identify which type each notification belongs to, see the time/date of each, and identify at least one notification with a CTA. The unread count visible on the page (3) must match the badge on the header bell on every other student page. All 4 acceptance scenarios in spec.md US4 must pass.

### Implementation for User Story 4

- [x] T023 [US4] Create `pages/student/notifications.html` page-level scaffold per `contracts/notifications-inbox.md`: same page wrapper as dashboard but the sidebar shows NO active entry (no `is-active` class on any `<a>` — the bell is the canonical entry per FR-002); `<title>` is `الإشعارات — منصة إدارتي`; header h1 `الإشعارات`, subtitle `3 إشعارات غير مقروءة`; `<main>` content uses a narrower wrapper `max-w-screen-md mx-auto space-y-5` and contains an intro section (h2 + description + unread chip `inline-flex items-center gap-1.5 rounded-full bg-accent-100 text-accent-700 px-3 py-1 text-xs font-semibold` reading `3 إشعارات غير مقروءة`), an empty `<ul class="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">` placeholder for tasks T024–T025, and a footer paragraph "تظهر آخر 30 يوماً من الإشعارات. <a href='dashboard.html'>العودة إلى الرئيسية</a>." at the bottom.
- [x] T024 [US4] Populate the first 4 notification rows (the 3 unread + the first read) per data-model E10 inside the `<ul>` of `pages/student/notifications.html`. In order: (1) live-session "تذكير: حصة الميم الساكنة بعد ساعتين" (unread), (2) homework "موعد تسليم واجب القرآن: غداً" (unread), (3) teacher-feedback "ملاحظة جديدة من الأستاذ أحمد" (unread), (4) achievement "حصلت على وسام 'نجم الحضور'" (read). Each `<li>` follows the row contract in `contracts/notifications-inbox.md`: leading 9×9 type-icon chip (`bg-{type}-50 text-{type}-700`), title row with leading dot (only when unread) + title + small inline type-label chip, body in `text-xs leading-7`, footer row with timestamp + CTA link with `chevron-left` icon (`rtl:rotate-180`). Read/unread visual distinction must use ALL THREE axes: border-s-4 color, dot presence, and title font-weight.
- [x] T025 [US4] Append the remaining 4 notification rows (positions 5–8) per data-model E10 inside the same `<ul>`. In order: (5) exam "تذكير: الاختبار الشهري بعد 6 أيام" (read), (6) payment-family "وصلت دفعة شهرية إلى رصيد العائلة" (read, mentions `750 ر.س`), (7) homework "تمّ قبول واجب اللغة العربية" (read), (8) live-session "تمّ تسجيل حضورك في حصة الأحكام" (read, NO CTA — the footer row shows only the timestamp). Verify after this task that the total unread count in the markup is exactly 3, matching the header bell badge across the rest of the student section (FR-052).

**Checkpoint**: User Story 4 complete. Notifications page shows ≥ 8 notifications across all 6 types as a single chronological list with 3-axis read/unread distinction (SC-011).

---

## Phase 7: Polish (Cross-Cutting Validation)

**Purpose**: Final sweeps across all four pages to confirm every Success Criterion (SC-001 through SC-012) passes before sign-off. These tasks read different files and concerns and are largely parallelizable.

- [x] T026 Run `npm run build:css` and verify `assets/css/output.css` size is ≤ 80 KB (`wc -c assets/css/output.css`). If oversized, audit `tailwind.config.js` `content` glob coverage and prune any unused utilities introduced during this feature. The Spec 001 baseline was ~35 KB; this feature should add no more than ~5 KB.
- [x] T027 [P] Verify `lang="ar" dir="rtl"` is set on `<html>` for each of the 4 pages built/touched: `pages/student/dashboard.html`, `pages/student/learning-journey.html`, `pages/student/weekly-plan.html`, `pages/student/notifications.html` (SC carry-over from Spec 001 FR-001). Use: `grep -L 'lang="ar" dir="rtl"' pages/student/*.html` — must list zero files.
- [x] T028 [P] Verify zero `href="#"` placeholder links across all 4 pages (FR-061). Use: `grep -nE ' href="#"' pages/student/*.html` — must return zero matches. Tooltip-style "#anchor" usage on the same page is acceptable provided the target id exists; the grep is for literal `href="#"` only.
- [x] T029 [P] Verify zero Eastern Arabic-Indic digits in the 4 page files (FR-060 / SC-006). Run a regex grep against the Arabic-Indic digit Unicode range and confirm zero matches.
- [x] T030 [P] Verify zero placeholder filler across all 4 pages (FR-064 / SC-005). Use: `grep -nEi 'lorem|Item [0-9]|TBD|Course [0-9]|Student [0-9]' pages/student/*.html` — must return zero matches.
- [x] T031 [P] Verify no JS-rendered content was introduced (FR-062 / SC-007). Use: `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js` — must return zero matches. Also confirm `assets/js/main.js` line count is unchanged from Spec 001 (≤ 80 LOC, four handlers only).
- [x] T032 [P] Count distinct status badge variants used across the 4 pages (SC-004). Must be ≥ 12 from the Spec 001 19-badge catalog. Verify each badge usage matches a row in `specs/001-frontend-foundation/data-model.md §E6` — no invented variants. The "حالياً" milestone-state pill is not counted as a badge (it's a state indicator, not a record-status badge); the count of 12+ excludes it.
- [x] T033 [P] Cross-page audit for FR-035 (color is never the sole indicator): walk all 4 pages and verify (a) every `<button>` and `<a>` has visible text or an `aria-label` / `<span class="sr-only">` (FR-034 carry-over); (b) every status indicator (badges, alerts, progress bars, level pills, attendance markers, read/unread states, milestone state) pairs color with text or icon. Specifically verify the read/unread distinction uses 3 axes (border + dot + weight) per `contracts/notifications-inbox.md`.
- [x] T034 [P] Responsive audit at 375 / 768 / 1024 / 1280 px on each of the 4 pages (SC-003): verify no horizontal page-level scrollbar at any breakpoint; verify the sidebar drawer (mobile burger → drawer with backdrop, body scroll locked) behaves identically to the Spec 001 baseline; verify the dashboard's 6-card progress grid collapses gracefully (`grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`); verify the weekly plan's 3-column grid stacks at < 1024 px; verify the journey timeline rail stays vertical and readable at 375 px; verify the notifications list rows do not overflow at 375 px.
- [x] T035 Walk through the validation table in `quickstart.md` "Validating the prototype against this spec" — execute every SC-001…SC-012 check end-to-end and record outcomes. The feature is Done only when all 12 success criteria pass. Confirm the constitution v1.0.1 Definition of Done gates 1–12 also pass (sets up sign-off).

**Final checkpoint**: Feature 002 is Done when T035 is complete with all 12 SCs and all 12 Definition-of-Done gates green.

---

## Dependencies

- **Phase 1 (Setup)**: T001 alone — read-only baseline check.
- **Phase 2 (Foundational)**: T002 and T003 are independent of each other but BOTH must complete before any user-story phase begins. They are not [P] because they edit two distinct files but their content is small and they unblock the same downstream work, so executing them sequentially keeps the diff narrative clean.
- **Phase 3 (US1)**: T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014. All sequential because they edit the same file (`pages/student/dashboard.html`) — no [P] markers.
- **Phase 4 (US2)**: T015 → T016 → T017. Sequential, same file.
- **Phase 5 (US3)**: T018 → T019 → T020 → T021 → T022. Sequential, same file.
- **Phase 6 (US4)**: T023 → T024 → T025. Sequential, same file.
- **Phase 7 (Polish)**: T026 must run first (CSS build); T027 / T028 / T029 / T030 / T031 / T032 / T033 / T034 are all [P] (each reads different concerns/files); T035 runs last as the sign-off gate.

User stories US2, US3, and US4 are independent of each other once US1 ships — they don't share content with each other. They **do** depend on the foundational shell updates (T002 + T003) because each new page embeds the updated sidebar and header. After Phase 2 completes, US2 / US3 / US4 could in principle run in parallel by separate implementers since each touches a different file, but the spec recommends US1 ship first as the MVP.

## Suggested MVP scope

**MVP**: Complete Phase 1 (T001) + Phase 2 (T002–T003) + Phase 3 (T004–T014) only. Result: a redesigned `pages/student/dashboard.html` with all 10 blocks, the two new sidebar entries (linking to placeholder pages that 404 until Phases 4–6 ship), and the bell as an `<a>` (linking to a 404 until Phase 6 ships). The MVP demonstrates the visual identity, the parent-trust narrative, and the motivational tone — sufficient to validate the design direction with stakeholders before completing the supporting pages.

## Per-story task counts

| Phase | Story | Task count |
|---|---|---|
| 1 | Setup | 1 |
| 2 | Foundational | 2 |
| 3 | US1 (Dashboard) | 11 |
| 4 | US2 (Learning Journey) | 3 |
| 5 | US3 (Weekly Plan) | 5 |
| 6 | US4 (Notifications) | 3 |
| 7 | Polish | 10 |
| | **Total** | **35** |
