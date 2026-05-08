---
description: "Task list for feature 005-achievements-certificates"
---

# Tasks: Achievements, Badges, Exams Passed, Levels Completed, and Certificates Frontend

**Input**: Design documents from `/specs/005-achievements-certificates/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md` (all present)

**Tests**: Not requested in the feature specification. Validation is manual visual review against the 17 success criteria (SC-001…SC-017) plus per-page acceptance scenarios.

**Organization**: Tasks are grouped by user story per `spec.md` priorities (US1 P1 → US2 P1 → US3 P1 → US7 P1 → US4 P2 → US5 P2 → US6 P2 → US8 P2). Within each user story, tasks edit a single HTML file sequentially. `[P]` markers are used only in the Polish phase where audit tasks read different concerns.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to user stories from `spec.md` (US1..US8); omitted on Setup / Foundational / Polish
- All paths are relative to repo root: `/media/mekky/work/backend/idarti-academy-pro/`

## Path Conventions

This feature continues the static-site layout established by Specs 001-004. There is no `src/` or `tests/` tree. All deliverables are eight new static HTML files (six under `pages/student/` + two under `pages/admin/`), one minor `assets/css/input.css` edit (a `@media print` block per FR-035 / R11), and a one-time CSS rebuild.

---

## Phase 1: Setup

**Purpose**: Confirm Specs 001-004 baselines are still in place. No new dependencies, no new tooling.

- [X] T001 Verify Specs 001-004 baselines: list `assets/css/output.css` (must exist and be ~ 53 KB at start, will rebuild later); list `assets/js/main.js` (must contain only the four sanctioned handlers — drawer / dropdown / modal / tabs — and remain ≤ 80 LOC); list `pages/admin/dashboard.html` (line 111 must contain the `<a href="certificates.html">` sidebar link — required for FR-002); list `pages/student/dashboard.html` (line 87 must contain the `<a href="achievements.html">` sidebar link + line 674 must contain `<a href="achievements.html">عرض كل الإنجازات</a>`); list `pages/student/{learning-journey,my-courses,weekly-plan,notifications}.html` (Spec 002/003 outputs intact); list `pages/student/{assignments,assignment-details,submit-assignment,submission-feedback}.html` (Spec 004 outputs intact); list `pages/teacher/{homework-review,homework-submission-details}.html` (Spec 004 outputs intact). If any baseline file is missing or shows drift, halt and instruct the user to complete prior specs first.

---

## Phase 2: Foundational (Shell Sanity Check + One-Time CSS Edit)

**Purpose**: Confirm zero shell deltas + add the one CSS rule required by FR-035 (the print-friendly fallback for the certificate-preview page).

**⚠️ CRITICAL**: T002 + T003 must complete before any user-story page work begins.

- [X] T002 Confirm zero shell deltas per `plan.md §Project Structure` and `research.md §R2`: NO new sidebar entries are needed (the student sidebar's "الإنجازات" entry already exists from Spec 001/002 across all student pages; the admin sidebar's "الشهادات" entry already exists in `pages/admin/dashboard.html` line 111); NO header changes are needed (bell remains `<a href="notifications.html">` on student pages and the equivalent admin-shell header on admin pages); NO new JS handlers are needed (none of the eight pages uses tabs / dropdowns / modals — only the existing sidebar drawer carries over); NO new design tokens are needed. Verify by running `grep -c 'href="achievements.html"' pages/student/dashboard.html` (expect ≥ 2: 1 sidebar + 1 inline link), `grep -c 'href="certificates.html"' pages/admin/dashboard.html` (expect 1), `wc -l assets/js/main.js` (≤ 80). Confirm no edits planned to `tailwind.config.js`, embedded sidebar/header partials, or `assets/js/main.js`.
- [X] T003 Add the print stylesheet rule per FR-035 / `research.md §R11` to `assets/css/input.css`: append the following `@media print` block at the end of the file (preserving existing rules):

  ```css
  @media print {
    @page { margin: 0; size: A4 landscape; }
    body { background: white !important; }
    #app-sidebar, #app-header, #cp-actions, #cp-prototype-notice, [data-sidebar-backdrop] {
      display: none !important;
    }
    #cp-certificate {
      box-shadow: none !important;
      margin: 0 auto !important;
      max-width: 100% !important;
      page-break-inside: avoid;
    }
  }
  ```

  The IDs referenced (`#cp-certificate`, `#cp-actions`, `#cp-prototype-notice`) will be created on `certificate-preview.html` in T015. Verify the rule is added correctly by running `grep -A 12 '@media print' assets/css/input.css` after the edit.

**Checkpoint**: Shell baselines confirmed unchanged + print rule added. User-story page work can begin.

---

## Phase 3: User Story 1 — Student Achievements Hub (Priority: P1) 🎯 MVP

**Goal**: Build the canonical motivation surface — h1/h2 + 4 summary cards (4 certs / 5 exams / 2 levels / 7 badges) + featured Quran L1 certificate panel + recent achievement timeline (≥ 6 milestones) + recent badges (≥ 4 tiles) + 4 footer CTA cards linking into each detail page.

**Independent Test**: Open `pages/student/achievements.html` from the file explorer. The viewer must be able to answer in 30 seconds: count of certificates / monthly exams passed / completed levels / badges, identify the featured Quran L1 cert, and see the recent achievement timeline.

### Implementation for User Story 1

- [X] T004 [US1] Create `pages/student/achievements.html` page-level scaffold per `contracts/achievements.md`: `<!doctype html>` + `<html lang="ar" dir="rtl">` + Tajawal font links + `../../assets/css/output.css`; body `bg-surface-50 text-text-base font-sans antialiased`; outer wrapper `<div class="min-h-screen flex">` containing the embedded 15-entry student sidebar (copy verbatim from Spec 004's `assignments.html`, change only the active entry from "الواجبات" to **"الإنجازات"** with `is-active` + `aria-current="page"`), the header (bell-as-anchor, profile dropdown for عبد الرحمن مؤمن / ع.م), and `<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"><div class="max-w-screen-xl mx-auto space-y-6">…</div></main>`. `<title>` = `إنجازاتك التعليمية — منصة إدارتي`. Inside the inner `<div>`, leave 6 placeholder `<section>` skeletons keyed by id `ach-header`, `ach-summary`, `ach-featured`, `ach-timeline`, `ach-recent-badges`, `ach-cta-grid`. Include the `data-sidebar-backdrop` and `<script src="../../assets/js/main.js">` at the body bottom.
- [X] T005 [US1] Fill `#ach-header` (Page header, FR-010) per `contracts/achievements.md`: `<h2 class="text-xl md:text-2xl font-bold leading-tight">إنجازاتك التعليمية</h2>` + subtitle `<p class="text-sm text-text-muted mt-2 leading-7">كل ما حقّقته في رحلتك التعليمية موثَّق هنا — اعرض تقدّمك بفخر لوالديك ومعلميك.</p>`. Then fill `#ach-summary` (4 summary cards, FR-011) per `data-model.md §E6 student-side`: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` with exactly 4 cards: (1) الشهادات المعتمدة — count 4 — accent tint with `award` Lucide icon; (2) اختبارات شهرية مجتازة — 5 — success tint with `circle-check` icon; (3) مستويات أكملتها — 2 — primary tint with `layers` icon; (4) أوسمة حصلت عليها — 7 — rose tint with `medal` icon. Each card: `bg-{tint}-50 border border-{tint}-200 rounded-2xl p-4 md:p-5 flex items-start gap-3` with leading rounded-icon block + `text-2xl font-bold text-{tint}-700` count + sm-text label. Color paired with icon — never alone (FR-096).
- [X] T006 [US1] Fill `#ach-featured` (Featured certificate panel, FR-012) per `contracts/achievements.md` and `data-model.md §E1.1`: parchment-styled mini-card `bg-amber-50 border-2 border-accent-500 rounded-2xl p-5 md:p-6 shadow-md` with: header label "الشهادة المميَّزة" in accent uppercase tracking + `award` icon; h3 `شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد`; meta block listing الطالب = عبد الرحمن مؤمن, المعلم = الأستاذ أحمد بن عبد الله, تاريخ الإصدار = 5 يناير 2026, certificate ID = `IDR-2026-Q01-0042` (text-xs font-mono); primary CTA `<a href="certificate-preview.html">عرض الشهادة</a>` styled `bg-primary-700 hover:bg-primary-800 text-white px-5 py-2.5 text-sm font-bold` with chevron icon `rtl:rotate-180`.
- [X] T007 [US1] Fill `#ach-timeline` (Recent achievement timeline, FR-013) per `contracts/achievements.md` and `data-model.md §E5`: card `bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200`; h3 `خط الإنجازات الأخيرة`; vertical timeline `<ol class="relative ps-8 border-s-2 border-slate-200 space-y-5">` with exactly 6 timeline entries in reverse-chronological order from R9 inventory: (1) 25 أبريل 2026 — وسام المثابرة — حضور بدون انقطاع لمدة 30 يوماً متتالياً — emerald pin + `target` icon; (2) 20 أبريل 2026 — وسام أوّل الفصل — أعلى درجة في القرآن الكريم المستوى الثالث — primary pin + `trophy` icon; (3) 15 أبريل 2026 — شهادة التميّز الشهري مارس 2026 — 95% في الاختبار الشهري — rose pin + `medal` icon; (4) 10 أبريل 2026 — وسام الحضور المتميّز — حضور 92% خلال الفصل الثاني — success pin + `star` icon; (5) 5 مارس 2026 — وسام الأكثر تطوراً — تحسّن 25% في درجات اختبارات شهر مارس — info pin + `trending-up` icon; (6) 1 مارس 2026 — شهادة إتمام المستوى الثاني — أحكام النون الساكنة بتقدير ممتاز — accent pin + `award` icon. Each `<li>` shows: timeline-circle pin (absolute -inline-start with ring-4 ring-white), date + type pill (شهادة / وسام / مستوى / اختبار) inline, h3 title, 1-sentence description.
- [X] T008 [US1] Fill `#ach-recent-badges` (Recent badges, FR-014) per `contracts/achievements.md`: header row with h3 `أحدث الأوسمة` + inline-end "عرض كل الأوسمة" link → `badges.html`; `grid grid-cols-2 sm:grid-cols-4 gap-3` with 4 mini badge tiles representing recent badges by date — Consistency Badge (25 أبريل) / Top of Class (20 أبريل) / Monthly Excellence (15 أبريل) / Attendance Star (10 أبريل). Each tile: `bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center text-center` with circular medallion (h-12 w-12 with badge-specific tint per E2 mapping), badge name (text-xs font-semibold), earned date (text-[0.625rem] text-text-muted).
- [X] T009 [US1] Fill `#ach-cta-grid` (Footer CTA grid, FR-015) per `contracts/achievements.md`: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` with 4 large CTA cards: (1) الشهادات / 4 شهادات / `award` icon → `certificates.html`; (2) الاختبارات الشهرية المجتازة / 5 اختبارات / `circle-check` → `monthly-exams-passed.html`; (3) المستويات المكتملة / 2 من 4 / `layers` → `completed-levels.html`; (4) أوسمتي / 7 أوسمة / `medal` → `badges.html`. Each card: `bg-white rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all p-5 group flex items-start gap-4` with leading icon block (h-12 w-12 tinted per CTA), body (text-base font-bold for label + text-xs text-text-muted for count caption), trailing chevron `rtl:rotate-180`.

**Checkpoint**: User Story 1 (MVP) complete. Achievements hub renders all 6 sections; SC-001 validated.

---

## Phase 4: User Story 2 — Student Certificates List (Priority: P1)

**Goal**: Build the canonical certificates list with the **no-download-button rule** visibly enforced via a callout banner. 4 certificate cards in a responsive grid; only "View" CTA per card; cumulative count and filter chips.

**Independent Test**: Open `pages/student/certificates.html`. Find 4 certificate cards, identify each by name/course/teacher/issue date/reason/status, verify NO download/PDF/تنزيل button exists in any clickable element on the page.

### Implementation for User Story 2

- [X] T010 [US2] Create `pages/student/certificates.html` page-level scaffold per `contracts/certificates.md`: same shell pattern as T004 with **active sidebar entry = "الإنجازات"**; `<title>` = `شهاداتي المعتمدة — منصة إدارتي`; `<main>` content uses `max-w-screen-xl mx-auto space-y-6` with 3 placeholder `<section>` skeletons keyed by id `cert-header`, `cert-filters`, `cert-grid` for tasks T011–T013.
- [X] T011 [US2] Fill `#cert-header` (header + count + design-rule callout banner, FR-020 + FR-021) per `contracts/certificates.md`: top row with h2 `شهاداتي المعتمدة` + count caption `4 شهادات منذ بداية رحلتك — كل واحدة تستحق الفخر.` + inline-end back-link `← العودة للإنجازات` → `achievements.html`. Then **callout banner** `aside class="mt-4 bg-info-50 border border-info-200 rounded-2xl p-4 flex items-start gap-3"` with `info` icon at text-info-700 + body text `تنزيل الشهادة متاح من داخل صفحة المعاينة فقط — حافظ على رحلتك موثَّقة.` (this is the ONLY mention of "تنزيل" allowed on this page — see SC-002). Then fill `#cert-filters` (FR-022) per `data-model.md §E7`: `<section class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200"><div role="tablist" class="flex flex-wrap gap-2">` containing 4 chips: الكل (4) — selected `is-active bg-primary-700 text-white`; إتمام مستوى (2); تميّز شهري (1); حضور والتزام (1). All visual-only.
- [X] T012 [US2] Fill `#cert-grid` cards 1 + 2 (the 2 إتمام مستوى certs, FR-023 + FR-024) per `contracts/certificates.md` and `data-model.md §E1` student-side: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`. Build each card per the contract pattern: `<article class="bg-white rounded-2xl border border-amber-200 shadow-sm p-5 md:p-6 hover:shadow-md transition-shadow">` with decorative gradient top strip (h-1 from-accent-500 to-accent-300), type pill + status pill row, h3 title, student-name caption, course/teacher/date meta, italic reason caption with border-s-2 border-amber-200, and ONE primary CTA `<a href="certificate-preview.html">عرض الشهادة</a>` (full-width, w-full justify-center). Card 1 = Quran L1 (5 يناير 2026, IDR-2026-Q01-0042). Card 2 = Quran L2 (5 مارس 2026, IDR-2026-Q02-0044). **No download button anywhere on these cards.**
- [X] T013 [US2] Fill `#cert-grid` cards 3 + 4 (the التميّز + الحضور certs, FR-023 + FR-024) per `contracts/certificates.md` and `data-model.md §E1`: Card 3 = شهادة التميّز الشهري — مارس 2026 (15 أبريل 2026, type pill rose-tinted with `medal` icon + reason "أعلى درجة في اختبار شهر مارس (95%)" + signed by الأستاذ أحمد بن عبد الله). Card 4 = شهادة الالتزام بالحضور — الفصل الثاني 2025-2026 (10 أبريل 2026, type pill success-tinted with `star` icon + reason "حضور 92% خلال الفصل الثاني" + signed by **إدارة الأكاديمية** — show ID badge `أ.إ` in success-700 instead of teacher avatar). Both cards same pattern as T012; ONE primary CTA each → `certificate-preview.html`. Below `#cert-grid`, append the empty-state documentation comment per Edge Cases.

**Checkpoint**: User Story 2 complete. SC-002 validated: `grep -nE '(تنزيل|Download|PDF)' pages/student/certificates.html` returns matches ONLY inside the FR-021 callout banner text — never inside `<button>` or clickable elements.

---

## Phase 5: User Story 3 — Certificate Preview Page (Priority: P1)

**Goal**: Build the parchment-styled certificate preview — the **only** page in this feature with download/print/share buttons. Showcase E1.1 (Quran L1, 5 يناير 2026) with all 9 certificate elements (logo / ornament / title / prefix / name / suffix / date / signature+seal / ID-QR).

**Independent Test**: Open `pages/student/certificate-preview.html`. Find a parchment-styled certificate occupying the bulk of the viewport with all 9 required attributes visible, AND exactly 4 action buttons below (Download / Print / Share / Back), AND a prototype notice.

### Implementation for User Story 3

- [X] T014 [US3] Create `pages/student/certificate-preview.html` page-level scaffold per `contracts/certificate-preview.md`: same shell pattern as T004 with **active sidebar entry = "الإنجازات"**; `<title>` = `معاينة الشهادة: شهادة إتمام المستوى الأول — منصة إدارتي`; `<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-100">` (note the slate-100 background to make the parchment pop) with `<div class="max-w-4xl mx-auto space-y-6">`. Place 4 placeholder `<section>` / `<article>` / `<nav>` / `<p>` skeletons keyed by id `cp-breadcrumb`, `cp-certificate`, `cp-actions`, `cp-prototype-notice` for tasks T015–T018.
- [X] T015 [US3] Fill `#cp-breadcrumb` and `#cp-certificate` (the parchment certificate, FR-030 + FR-031) per `contracts/certificate-preview.md`: breadcrumb with 3 segments (`<a href="achievements.html">إنجازاتي</a>` / `<a href="certificates.html">شهاداتي المعتمدة</a>` / `<span aria-current="page">شهادة إتمام المستوى الأول</span>`). Then build the parchment certificate `<article id="cp-certificate" class="bg-amber-50 border-4 border-accent-500 rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl ring-2 ring-accent-300 ring-offset-4 ring-offset-amber-50/40 text-center text-primary-900 relative overflow-hidden">` containing in order: (a) 4 decorative corner ornaments (absolute-positioned divs with border-t-4 border-s/e-4 in accent-600), (b) academy logo header with "إدارتي" wordmark + accent dot + uppercase tracking caption "أكاديمية إدارتي للتعليم", (c) decorative ornament strip (`flex items-center justify-center gap-3` with `h-px w-16 bg-accent-500` lines flanking a central SVG flourish/star icon), (d) certificate-title h1 = "شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد" (text-2xl md:text-3xl font-bold), (e) prefix paragraph "تشهد أكاديمية إدارتي بأنّ الطالب", (f) student-name display `<p class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-900 leading-snug py-3 mb-3" lang="ar">عبد الرحمن مؤمن</p>` (largest font on page), (g) suffix `<p class="text-sm md:text-base text-primary-800 leading-8 max-w-2xl mx-auto mb-8">قد أتمّ بنجاح المستوى الأول من مسار القرآن الكريم — أساسيات التلاوة والتجويد — وذلك بتقدير <strong class="text-accent-700">ممتاز</strong>، بعد التزامه بالحضور وأداء جميع الواجبات والاختبارات المطلوبة.</p>`, (h) issue date `<p class="text-sm font-medium text-primary-800 mb-10">صدر بتاريخ: <strong>5 يناير 2026</strong></p>`, (i) two-column footer `<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-end max-w-3xl mx-auto pt-8 border-t-2 border-accent-300">` with signature on the right (h-px w-32 line + name "الأستاذ أحمد بن عبد الله" + caption "معلم القرآن الكريم") and academy seal on the left (`relative h-28 w-28 rounded-full border-2 border-accent-600 bg-amber-100 flex items-center justify-center text-accent-700` with `award` icon + "رسمي" badge), (j) footer with certificate ID `IDR-2026-Q01-0042` in font-mono + decorative QR-code placeholder (4×4 grid of `bg-primary-900` and `bg-amber-50` cells per the contract) + caption "امسح للتحقّق من صحّة الشهادة".
- [X] T016 [US3] Fill `#cp-actions` (4-button action cluster, FR-032) per `contracts/certificate-preview.md`: `<section id="cp-actions" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">` with `<div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">` containing exactly 4 elements in this order: (1) **Primary "تنزيل PDF"** `<button type="button" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white px-5 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">` with `download` icon + text "تنزيل PDF" — **visual stub, NO real download**; (2) Secondary "طباعة" `<button type="button">` with `printer` icon (visual stub); (3) Tertiary "مشاركة مع ولي الأمر" `<button type="button">` with `share` icon (visual stub); (4) "العودة للشهادات" `<a href="certificates.html" class="inline-flex items-center justify-center gap-2 text-sm text-text-muted hover:text-primary-700 hover:underline px-3 py-3">` with chevron `rtl:rotate-180`.
- [X] T017 [US3] Fill `#cp-prototype-notice` (prototype notice, FR-033) per `contracts/certificate-preview.md`: `<p id="cp-prototype-notice" class="text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">` with `info` icon + text `هذا نموذج تجريبي — لا يتم تنزيل ملف فعلي عند النقر.` Verify the print stylesheet (added in T003) hides `#cp-actions`, `#cp-prototype-notice`, `#app-sidebar`, `#app-header`, and `[data-sidebar-backdrop]` when the page is printed (the rule already exists in `input.css` from T003; T017 just confirms the IDs match).

**Checkpoint**: User Story 3 complete. The parchment + 4 buttons + prototype notice are visible. SC-003 + SC-017 validated.

---

## Phase 6: User Story 7 — Admin Certificates List (Priority: P1)

**Goal**: Build the academy-wide certificate-management list with **state-aware per-row actions** (Q1 / R4) — pending rows show "إصدار" success-tinted, active rows show "إعادة إصدار" info-tinted, revoked rows show "إعادة تفعيل" accent-tinted with disabled تعديل + إلغاء. 4 summary cards + 4 filter dropdowns + ≥ 8 rows covering 5 students + 5 cert types + 3 states.

**Independent Test**: Open `pages/admin/certificates.html`. Find 4 summary cards + ≥ 8 rows + state-aware actions visibly different across the three sample states + ≥ 1 visually muted "ملغاة" row + primary "إصدار شهادة جديدة" CTA.

### Implementation for User Story 7

- [X] T018 [US7] Create `pages/admin/certificates.html` page-level scaffold per `contracts/admin-certificates.md`: same shell pattern as T004 BUT using the **18-entry admin sidebar** hard-embedded verbatim from `pages/admin/dashboard.html` lines 33–192 — all 18 entries: الرئيسية → `dashboard.html`, الطلاب → `students.html`, العائلات → `families.html`, المعلمون → `teachers.html`, الدورات → `courses.html`, الحصص المباشرة → `live-sessions.html`, الواجبات → `assignments.html`, الاختبارات → `exams.html`, **الشهادات → `certificates.html`** (carries `is-active` + `aria-current="page"`), التقارير → `reports.html`, المدفوعات → `payments.html`, الفواتير → `invoices.html`, إعدادات الضريبة → `tax-settings.html`, أرصدة العائلات → `family-balances.html`, مالية المعلمين → `teacher-finance.html`, الأدوار والصلاحيات → `roles-permissions.html`, المجتمع التعليمي → `social-hub.html`, إعدادات المنصة → `platform-settings.html`. **All 18 `<a>` elements MUST be present** — copy the entire `<aside>` block from `pages/admin/dashboard.html` and only change `aria-current="page"` and `is-active` to land on entry #9. Use the admin-shell header. `<title>` = `إدارة الشهادات — لوحة المدير — منصة إدارتي`. `<main>` content uses `max-w-screen-xl mx-auto space-y-6` with 4 placeholder `<section>` skeletons keyed by id `ac-header`, `ac-summary`, `ac-filters`, `ac-list` for tasks T019–T021.
- [X] T019 [US7] Fill `#ac-header` and `#ac-summary` (FR-070 + FR-071 + FR-072) per `contracts/admin-certificates.md`: header with h2 `إدارة الشهادات` + subtitle `18 شهادة معتمدة هذا الفصل — راجع، حرّر، أو أصدر شهادات جديدة.` + inline-end primary CTA `<a href="create-certificate.html" class="inline-flex items-center gap-2 rounded-xl bg-accent-500 hover:bg-accent-400 text-primary-900 px-5 py-2.5 text-sm font-bold">` with `plus-circle` icon + text `إصدار شهادة جديدة`. Then `#ac-summary` `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` with 4 cards per `data-model.md §E6 admin-side`: شهادات معتمدة (18, success + circle-check), شهادات بانتظار الاعتماد (3, info + clock), شهادات أصدرت اليوم (2, accent + send), شهادات مُلغاة (1, danger + x-circle).
- [X] T020 [US7] Fill `#ac-filters` (FR-073) per `contracts/admin-certificates.md` and `data-model.md §E7 admin-side`: outer card `bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 space-y-4`. Search row with `<input type="text" name="ac-search" placeholder="ابحث باسم الطالب أو الشهادة..." class="…">` + leading search icon. Filter row `grid grid-cols-2 lg:grid-cols-4 gap-3` with 4 labeled `<select>` controls: الطالب (9 options including All + 8 student names), الدورة (5+ courses), المعلم (5 options including All + 4 teachers), الحالة (4 options: All / بانتظار الاعتماد / معتمدة / ملغاة). All visual-only.
- [X] T021 [US7] Fill `#ac-list` (state-aware admin rows, FR-074 + FR-075 + FR-076) per `contracts/admin-certificates.md` and `data-model.md §E1` admin-side: section header `قائمة الشهادات (8)`. Render `<table class="hidden md:table w-full text-sm border-collapse">` with thead carrying 7 columns (الطالب / الشهادة-الدورة / المعلم / النوع / تاريخ الإصدار / الحالة / إجراءات) and tbody containing exactly 8 `<tr>` rows from R8 inventory with **state-aware action cells per FR-075**: **Row 1** — عبد الرحمن مؤمن / Quran L3 (anticipated) / أ.أحمد العمري / إتمام مستوى / اليوم 8 مايو 2026 / **بانتظار الاعتماد** (info pill) / actions: عرض-link + تعديل-link + **"إصدار" `<button type="button">` success-tinted with check-circle icon** + إلغاء-button danger; **Rows 2-3** — persona's L1 + L2 active certs (cross-page anchor with student-side certificates.html cards 1+2) / **معتمدة** / actions: عرض + تعديل + **"إعادة إصدار" `<button>` info-tinted with send icon** + إلغاء-button; **Row 4** — محمد السعيدي / Quran L1 / أ.أحمد العمري / إتمام مستوى / 12 ديسمبر 2025 / معتمدة / same active actions; **Row 5** — ليلى المنصور / اللغة العربية النحو / الأستاذة سلمى الحارثي / تميّز شهري (rose-tinted pill) / 18 أبريل 2026 / معتمدة / active actions; **Row 6** — فيصل العتيبي / القرآن إجازة الجزء الثلاثين / الشيخ عبد الله الراشد / إجازة قرآنية (warning-tinted pill) / 1 أبريل 2026 / معتمدة / active actions; **Row 7** — أحمد الغامدي / الدراسات الإسلامية السيرة / الشيخ عبد الله الراشد / جائزة خاصة (accent-tinted pill) / 22 مارس 2026 / معتمدة / active actions; **Row 8** — سارة الحربي / الفصل الأول 2024-2025 / إدارة الأكاديمية / حضور والتزام / 10 فبراير 2026 / **ملغاة** (danger pill) — entire row `class="opacity-60"` with title `class="line-through text-text-muted"` + actions: عرض-link + **disabled تعديل** (`<span aria-disabled="true" class="cursor-not-allowed text-slate-300">`) + **"إعادة تفعيل" `<button>` accent-tinted with rotate-ccw icon** + **disabled إلغاء**. Then mobile-cards mirror `<div class="md:hidden space-y-3">` with 8 stacked cards same content + state-aware action cluster.

**Checkpoint**: User Story 7 complete. State-aware actions visibly distinct: row 1 shows "إصدار" success; rows 2-7 show "إعادة إصدار" info; row 8 shows "إعادة تفعيل" accent + disabled تعديل + إلغاء. SC-007 validated.

---

## Phase 7: User Story 4 — Monthly Exams Passed (Priority: P2)

**Goal**: Build the chronological list of 5 passed monthly exams with cumulative average. Table on desktop, cards on mobile.

**Independent Test**: Open `pages/student/monthly-exams-passed.html`. Identify 5 passed exams + highest 95% (March) + cumulative average 86.6% + Monthly Excellence anchor.

### Implementation for User Story 4

- [X] T022 [US4] Create `pages/student/monthly-exams-passed.html` page-level scaffold per `contracts/monthly-exams-passed.md`: same shell pattern as T004 with **active sidebar entry = "الإنجازات"**; `<title>` = `الاختبارات الشهرية المجتازة — منصة إدارتي`; `<main>` content uses `max-w-screen-xl mx-auto space-y-6` with 2 placeholder `<section>` skeletons keyed by id `mep-header`, `mep-list` for tasks T023–T024.
- [X] T023 [US4] Fill `#mep-header` (FR-040) per `contracts/monthly-exams-passed.md`: top row with h2 `الاختبارات الشهرية المجتازة` + subtitle `5 اختبارات منذ ديسمبر 2025 — متوسط درجاتك: <strong class="text-success-700">86.6 من 100</strong>.` + inline-end back-link `← العودة للإنجازات` → `achievements.html`.
- [X] T024 [US4] Fill `#mep-list` (5 exam rows, FR-041 + FR-042 + FR-043) per `contracts/monthly-exams-passed.md` and `data-model.md §E3`: render desktop table `<table class="hidden md:table w-full text-sm border-collapse">` with thead carrying 7 columns (الشهر / الدورة / الدرجة / النسبة / الحالة / ملاحظة المعلم / إجراء) and tbody containing 5 rows in reverse-chronological order: **Row 1** — أبريل 2026 / Quran L3 / 88/100 / 88% (success-500 bar) / ممتاز / "أداء قوي في تطبيق أحكام الميم الساكنة، نتطلع لمستوى أعلى الشهر القادم." / "عرض التقرير" → `#planned`; **Row 2** — مارس 2026 (الاختبار النهائي للمستوى الثاني) / Quran L2 / 95/100 / 95% (success bar) / ممتاز / "الأعلى في الفصل — أداء استثنائي يستحق التميّز الشهري." / "عرض التقرير"; **Row 3** — فبراير 2026 / Quran L2 / 82/100 / 82% (info bar) / جيد جداً / "تطور ملحوظ في تطبيق أحكام النون الساكنة." / "عرض التقرير"; **Row 4** — يناير 2026 (transition L1→L2) / Quran / 78/100 / 78% (info bar) / جيد جداً / "بداية متينة للمستوى الثاني، استمر في المراجعة." / "عرض التقرير"; **Row 5** — ديسمبر 2025 (الاختبار النهائي للمستوى الأول) / Quran L1 / 90/100 / 90% (success bar) / ممتاز / "إتمام ممتاز للمستوى الأول، مرحباً في المستوى الثاني." / "عرض التقرير". Each row has all 7 cells per FR-042. Then mobile-cards mirror with same content. Append the empty-state HTML comment per Edge Cases.

**Checkpoint**: User Story 4 complete. SC-004 validated.

---

## Phase 8: User Story 5 — Completed Levels (Priority: P2)

**Goal**: Build the 2 completed-level cards + 50% path-progress bar + L3 in-progress preview at 60%.

**Independent Test**: Open `pages/student/completed-levels.html`. Find 2 cards + 50% path bar + L3 preview.

### Implementation for User Story 5

- [X] T025 [US5] Create `pages/student/completed-levels.html` page-level scaffold per `contracts/completed-levels.md`: same shell pattern as T004 with **active sidebar entry = "الإنجازات"**; `<title>` = `المستويات التي أكملتها — منصة إدارتي`; `<main>` content uses `max-w-screen-xl mx-auto space-y-6` with 3 placeholder `<section>` skeletons keyed by id `cl-header`, `cl-completed`, `cl-next-preview` for tasks T026–T028.
- [X] T026 [US5] Fill `#cl-header` (FR-050) per `contracts/completed-levels.md`: card `bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200`; top row with h2 `المستويات التي أكملتها` + subtitle `2 من 4 مستويات في مسار القرآن الكريم — أنت في منتصف الطريق!` + inline-end back-link → `achievements.html`. Then path-progress segmented bar: header row `flex items-center justify-between text-xs` with label `تقدّم مسار القرآن الكريم` + count `2 / 4 (50%)` text-accent-700 font-bold; bar `h-3 bg-slate-200 rounded-full overflow-hidden flex` containing 3 segments — `bg-success-500 w-1/4 aria-label="L1 مكتمل"` + `bg-success-500 w-1/4 border-s border-success-700 aria-label="L2 مكتمل"` + `bg-accent-500 w-[15%] aria-label="L3 حالياً"` (representing 60% × 25% slot = 15%); below bar a 4-cell label row showing L1 / L2 / **المستوى الثالث (حالياً)** in accent-700 / L4.
- [X] T027 [US5] Fill `#cl-completed` (2 completed-level cards, FR-051 + FR-052) per `contracts/completed-levels.md` and `data-model.md §E4`: `grid grid-cols-1 lg:grid-cols-2 gap-5`. Card 1 — **المستوى الأول — أساسيات التلاوة والتجويد**: outer `bg-white rounded-2xl border border-success-200 border-s-4 border-s-success-500 shadow-sm p-5 md:p-6`; type pill "مكتمل" success-100; h3 + course caption "القرآن الكريم"; final-evaluation pill "ممتاز" accent-100; `dl grid grid-cols-2 gap-3` with 4 fields: تاريخ البداية = 1 سبتمبر 2025; تاريخ الإكمال = 20 ديسمبر 2025 (text-success-700); المستوى التالي = "المستوى الثاني (مكتمل ✓)"; الشهادة = "متاحة ✓" (text-success-700 with check icon); 2 CTAs at footer: "عرض التقرير" → `#planned` (primary) + "عرض الشهادة" → `certificates.html` (secondary outline). Card 2 — **المستوى الثاني — مدّ الحروف وأحكام النون الساكنة**: same pattern but: تاريخ البداية = 5 يناير 2026; تاريخ الإكمال = 1 مارس 2026; المستوى التالي = "المستوى الثالث (حالياً — 60%)" with mini progress bar (h-1.5 bg-accent-200 with bg-accent-500 60% fill); الشهادة = متاحة ✓.
- [X] T028 [US5] Fill `#cl-next-preview` (in-progress L3 card, FR-053) per `contracts/completed-levels.md`: card `bg-accent-50 border-2 border-accent-500 rounded-2xl p-5 md:p-6 shadow-sm`; uppercase label "المستوى التالي — قيد التقدّم" with `compass` icon; h3 `المستوى الثالث — أحكام الميم الساكنة وحفظ الجزء الثلاثين`; current-milestone caption `المحطّة الحالية: <strong>أحكام الميم الساكنة — تطبيق عملي</strong>`; progress block with 60% bar (`h-3 bg-white border border-accent-200 rounded-full` with `bg-accent-500 w-[60%]` fill); primary CTA `<a href="my-courses.html">متابعة من حيث توقّفت</a>` styled `bg-primary-700 hover:bg-primary-800 text-white px-5 py-2.5 text-sm font-bold` with chevron icon `rtl:rotate-180`.

**Checkpoint**: User Story 5 complete. SC-005 validated.

---

## Phase 9: User Story 6 — Badges Wall (Priority: P2)

**Goal**: Build the 7-tile badge wall with state-aware visibility chips (5 مرئي + 2 خاص). Each tile has icon medallion + name + description + earned date + reason + visibility chip.

**Independent Test**: Open `pages/student/badges.html`. Find all 7 badge tiles with the locked names + dates + reasons. Verify ≥ 5 "مرئي" + ≥ 1 "خاص" via grep.

### Implementation for User Story 6

- [X] T029 [US6] Create `pages/student/badges.html` page-level scaffold per `contracts/badges.md`: same shell pattern as T004 with **active sidebar entry = "الإنجازات"**; `<title>` = `أوسمتي — منصة إدارتي`; `<main>` content uses `max-w-screen-xl mx-auto space-y-6` with 3 placeholder `<section>` skeletons keyed by id `bdg-header`, `bdg-grid`, `bdg-aspiration` for tasks T030–T032.
- [X] T030 [US6] Fill `#bdg-header` (FR-060) per `contracts/badges.md`: gradient card `bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-6 md:p-8 shadow-md` with h2 `أوسمتي` + subtitle `7 من 7 أوسمة — كل وسام يعكس جانباً من تميّزك. اعرض ما تفتخر به على ملفك الشخصي.` + inline-end medallion icon block (h-12 w-12 bg-white/15 with `medal` icon at text-accent-300) + back-link `← العودة للإنجازات` (text-white/70).
- [X] T031 [US6] Fill `#bdg-grid` first 4 badges (FR-061 + FR-062 + FR-063 + FR-064 + FR-065) per `contracts/badges.md` and `data-model.md §E2`: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`. Build each tile per the contract pattern: `<article class="bg-white rounded-2xl border-2 border-slate-200 p-5 md:p-6 shadow-sm hover:shadow-md hover:border-{hue}-300 transition-all flex flex-col">` with: large medallion at top (`relative inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-{hue}-100 to-{hue}-300 text-{hue}-700 ring-4 ring-{hue}-100/60` containing the badge's Lucide icon + a sparkle decoration `★` in `bg-{hue}-500 text-white h-6 w-6 absolute -top-1 -end-1`), badge name h3, 1-line description, earned-date row with `calendar-check` icon, italic reason quote, and visibility chip at bottom (success-50 + `eye` icon for مرئي / slate-100 + `lock` icon for خاص). Build badges 1-4: (1) **وسام الحضور المتميّز** / success-500 / star icon / 10 أبريل 2026 / "حضور 92% خلال الفصل الثاني" / مرئي; (2) **بطل الواجبات** / accent-500 / award icon / 15 يناير 2026 / "تسليم جميع الواجبات في موعدها 3 أشهر متتالية — مستحق منذ بداية شهر يناير 2026." / مرئي; (3) **أوّل الفصل** / primary-700 / trophy icon / 20 أبريل 2026 / "أعلى درجة بين زملائك في القرآن الكريم — المستوى الثالث." / مرئي; (4) **الأكثر تطوراً** / info-500 / trending-up icon / 5 مارس 2026 / "تحسّن 25% في درجات اختبارات شهر مارس مقارنة بفبراير." / مرئي.
- [X] T032 [US6] Append remaining 3 badges + `#bdg-aspiration` (FR-066) per `contracts/badges.md`: badges 5-7 in `#bdg-grid` continuation: (5) **متقن القرآن** / warning-500 / book-open icon / 1 مارس 2026 / "إتقان أحكام النون الساكنة بتقدير ممتاز." / **خاص** (slate chip + lock icon); (6) **وسام التميّز الشهري** / rose-500 / medal icon / 15 أبريل 2026 / "أعلى أداء شهري في الفصل — مارس 2026." / مرئي; (7) **وسام المثابرة** / emerald-500 / target icon / 25 أبريل 2026 / "حضور بدون انقطاع لمدة 30 يوماً متتالياً." / **خاص**. Then `#bdg-aspiration` `bg-accent-50 border-s-4 border-accent-500 rounded-2xl p-5 md:p-6 text-center md:text-start` with `flex items-center justify-center md:justify-start gap-3 flex-wrap` containing `sparkles/star` icon at h-10 w-10 text-accent-600 + body block: bold heading `استمر في الالتزام لتنال أوسمة جديدة` + caption `هل تعرف صديقاً يستحق وساماً؟ شجّعه ليكسب نفس الأوسمة.`. Append the empty-state HTML comment per Edge Cases.

**Checkpoint**: User Story 6 complete. SC-006 validated: 7 tiles + 5 مرئي + 2 خاص.

---

## Phase 10: User Story 8 — Admin Create Certificate Form (Priority: P2)

**Goal**: Build the 8-field certificate authoring form pre-filled with the persona's "next imaginable certificate" (Quran L3 completion). Preview + Save buttons (visual stubs) + Cancel link.

**Independent Test**: Open `pages/admin/create-certificate.html`. Find 8 labeled inputs + 3 action buttons + prototype notice. Verify every `id="cc-*"` has a matching `for="cc-*"`.

### Implementation for User Story 8

- [X] T033 [US8] Create `pages/admin/create-certificate.html` page-level scaffold per `contracts/admin-create-certificate.md`: same shell pattern as T018 (admin sidebar with **active = "الشهادات"**); `<title>` = `إصدار شهادة جديدة — لوحة المدير — منصة إدارتي`; `<main>` content uses `max-w-screen-lg mx-auto space-y-6` with 3 placeholder `<section>` skeletons keyed by id `cc-header`, `cc-form`, `cc-actions` for tasks T034–T036.
- [X] T034 [US8] Fill `#cc-header` (FR-080) per `contracts/admin-create-certificate.md`: breadcrumb (`<a href="certificates.html">إدارة الشهادات</a>` / `<span aria-current="page">إصدار شهادة جديدة</span>`); h2 `إصدار شهادة جديدة`; caption `املأ الحقول التالية لإنشاء شهادة معتمدة جديدة. الشهادة تظهر للطالب وولي الأمر بعد الاعتماد.`.
- [X] T035 [US8] Fill `#cc-form` (8 form fields with for/id pairing, FR-081 + FR-082 + FR-083) per `contracts/admin-create-certificate.md` and `data-model.md §E8`: outer `<section class="bg-white rounded-2xl p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200"><div class="grid grid-cols-1 md:grid-cols-2 gap-5">`. **NO `<form action>` — visual only**. Render exactly 8 fields with `<label for="cc-X">` + matching `id="cc-X"` per the contract: (1) `cc-student` select with 8 student names (selected: عبد الرحمن مؤمن); (2) `cc-type` select with 5 types (selected: إتمام مستوى); (3) `cc-course` select with 7+ courses (selected: القرآن الكريم — المستوى الثالث); (4) `cc-level` select with 5 options (selected: المستوى الثالث); (5) `cc-teacher` select with 5 teachers (selected: الأستاذ أحمد بن عبد الله); (6) `cc-date` `<input type="date">` value="2026-05-08"; (7) `cc-reason` textarea pre-filled "إتمام جميع متطلبات المستوى الثالث بنجاح وبتقدير ممتاز" (full-width, md:col-span-2); (8) `cc-notes` textarea empty with placeholder "أيّ ملاحظات داخلية للأرشيف — لا تظهر على الشهادة." (full-width, md:col-span-2). Each required field (1, 2, 3, 5, 6, 7) has a small red asterisk indicator next to the label.
- [X] T036 [US8] Fill `#cc-actions` (FR-084 + FR-085) per `contracts/admin-create-certificate.md`: outer card `bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200`. Action row `flex flex-wrap items-center gap-3 mb-3` with 3 elements: (1) primary `<button type="button" class="…bg-primary-700…">معاينة الشهادة</button>` with `eye` icon — visual stub conceptually opens `../student/certificate-preview.html`; (2) secondary `<button type="button" class="…border border-success-500 text-success-700…">حفظ الشهادة</button>` with `save` icon — visual stub; (3) tertiary `<a href="certificates.html" class="text-xs text-text-muted hover:underline">إلغاء</a>`. Then prototype notice `<p class="text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">` with `info` icon + text `هذا نموذج تجريبي — لا يتم حفظ الشهادة فعلياً.`.

**Checkpoint**: User Story 8 complete. SC-008 validated: 8 labeled inputs + 3 actions + notice.

---

## Phase 11: Polish (Cross-Cutting Validation)

**Purpose**: Final sweeps across all eight pages to confirm every Success Criterion (SC-001…SC-017) passes before sign-off. These tasks read different files / concerns and are largely parallelizable.

- [X] T037 Run `npm run build:css` from repo root and verify `assets/css/output.css` size remains ≤ 80 KB via `wc -c assets/css/output.css`. The Spec 004 baseline was ~ 53 KB; this feature should add ≤ 8 KB (target ≤ 61 KB). The `@media print` block added in T003 should appear in `output.css` after the rebuild.
- [X] T038 [P] Verify `lang="ar" dir="rtl"` is set on `<html>` for each of the 8 new pages: `grep -L 'lang="ar" dir="rtl"' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` — must list zero files.
- [X] T039 [P] Verify zero `href="#"` placeholder links across all 8 pages (FR-097 / SC-009): `grep -nE ' href="#"' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` — must return zero matches. Same-page anchor `href="#planned"` IS allowed (placeholder for future-spec destinations).
- [X] T040 [P] Verify zero Eastern Arabic-Indic digits (FR-094 / SC-010): `grep -nP '[٠-٩۰-۹]' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` — zero matches.
- [X] T041 [P] Verify zero placeholder filler (FR-099 / SC-012): `grep -nEi 'lorem|Item [0-9]|TBD|FIXME|Course [0-9]|Student [0-9]' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` — zero matches.
- [X] T042 [P] Verify no JS-rendered content + main.js ≤ 80 LOC (FR-098 / SC-011): `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js` — zero matches; `wc -l assets/js/main.js` shows ≤ 80 lines.
- [X] T043 [P] **Verify the download-only-inside-preview rule** (FR-100 / SC-002 / SC-017): run `grep -nE '(تنزيل|Download|PDF|طباعة|Print)' pages/student/{achievements,certificates,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html`. Matches MUST appear ONLY inside the FR-021 callout banner text on `certificates.html` (the explanation of the rule itself uses "تنزيل" textually). NEVER inside a `<button>`, `<a>`, or any clickable element on these 7 pages. Then verify `pages/student/certificate-preview.html` HAS the "تنزيل PDF" button (`grep -c '"button"[^>]*>.*تنزيل PDF' pages/student/certificate-preview.html` ≥ 1).
- [X] T044 [P] Verify FR-079 form-input label pairing on `admin/create-certificate.html`: extract every `id="cc-…"` from input/textarea/select tags and assert each has a matching `for="cc-…"`. Run: `for f in pages/admin/create-certificate.html; do grep -oE '(input|textarea|select)[^>]*\bid="[^"]+"' "$f" | grep -oE 'id="cc-[^"]+"' | sort -u > /tmp/ids.txt; grep -oE 'for="cc-[^"]+"' "$f" | sort -u > /tmp/fors.txt; comm -23 <(sed 's/id=/for=/' /tmp/ids.txt) /tmp/fors.txt; done` — zero output expected.
- [X] T045 [P] Verify visibility-status mix on `pages/student/badges.html` (FR-065): `grep -c 'مرئي على ملفك الشخصي' pages/student/badges.html` ≥ 5 + `grep -c 'خاص بك فقط' pages/student/badges.html` ≥ 1.
- [X] T046 [P] Verify state-aware admin actions on `pages/admin/certificates.html` (FR-075 / Q1) using **whitespace-tolerant grep patterns** (the proposed button markup is `<button …><svg …>…</svg> إصدار</button>` — there's a space between `</svg>` and the text plus a newline before `</button>`, so the simpler `>{label}<` pattern misfires; the patterns below tolerate that): `grep -c 'إصدار</button' pages/admin/certificates.html` ≥ 1 (pending row 1's button text); `grep -c 'إعادة إصدار</button' pages/admin/certificates.html` ≥ 6 (active rows 2-7's button text — note: this also matches the longer `إعادة إصدار` substring inside aria-label attributes, so a count of ≥ 12 is acceptable); `grep -c 'إعادة تفعيل</button' pages/admin/certificates.html` ≥ 1 (revoked row 8's button text). Cross-check totals via `grep -c '"button"' pages/admin/certificates.html` ≥ 8 (one third-slot button per row + ≥ 7 إلغاء buttons on non-revoked rows). Visual inspection: row 8 has `class="opacity-60"` + `line-through` on title + 2 disabled actions (تعديل + إلغاء visually muted with text-slate-300 + cursor-not-allowed). If newline-stripping breaks the grep pattern in a particular implementer's HTML formatting, fall back to `grep -oE 'إصدار|إعادة إصدار|إعادة تفعيل' pages/admin/certificates.html | sort | uniq -c` and verify "إصدار" ≥ 2 (1 button + 1 aria-label), "إعادة إصدار" ≥ 12, "إعادة تفعيل" ≥ 2.
- [X] T047 [P] Verify cross-page anchors (FR-091 / FR-092 / FR-093): persona's first-cert "5 يناير 2026" appears identically on `achievements.html` (featured panel), `certificates.html` (Card 1), `certificate-preview.html` (issue date), `admin/certificates.html` (row 2). Run `grep -c '5 يناير 2026' pages/student/{achievements,certificates,certificate-preview}.html pages/admin/certificates.html` — ≥ 1 match per file. Verify بطل الواجبات badge anchor (FR-092): `grep -c 'بطل الواجبات' pages/student/badges.html pages/student/achievements.html` — ≥ 1 match per file with the same "15 يناير 2026" date and "3 أشهر متتالية" reason.
- [X] T048 [P] Verify `@media print` rule was added correctly: `grep -c '@media print' assets/css/input.css` ≥ 1 + `grep -c '#cp-certificate' assets/css/input.css` ≥ 1 + (after T037 rebuild) `grep -c '@media print' assets/css/output.css` ≥ 1. The certificate-preview page IDs (`#cp-certificate`, `#cp-actions`, `#cp-prototype-notice`) referenced in the print rule must match the IDs created in T015–T017.
- [X] T049 [P] Count distinct status badge usages across the 8 pages (SC-013): `grep -cE 'rounded-full bg-(success|warning|danger|info|accent|primary|slate|rose|emerald)-(50|100)' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html | awk -F: '{sum+=$2} END {print sum}'` — expect ≥ 30 (we ship ≈ 65). No invented variants.
- [X] T050 [P] Cross-page audit for FR-096 (color is never the sole indicator): walk all 8 pages and verify every status pill, every certificate-type pill, every badge medallion, every progress bar, every visibility-status chip pairs color with text + icon. Specifically verify: certificate-type pills (إتمام مستوى accent / تميّز شهري rose / حضور والتزام success / إجازة قرآنية warning / جائزة خاصة primary) all have icons; admin row state-aware buttons (إصدار success-tinted with check / إعادة إصدار info-tinted with send / إعادة تفعيل accent-tinted with rotate-ccw) all pair color with both text and icon.
- [X] T051 [P] Responsive audit at 375 / 768 / 1024 / 1280 px (SC-014): verify (a) no horizontal page-level scrollbar at any breakpoint on any page, (b) sidebar drawer behaves identically to Spec 002/003/004 baseline, (c) certificates grid collapses 1/2/3 at 375/768/1024, (d) badges grid collapses 1/2/3/4 at 375/768/1024/1280, (e) certificate preview scales proportionally (use `max-w-4xl mx-auto` at all breakpoints + the parchment scales with the container), (f) admin certificates table → mobile cards toggle works (`hidden md:table` / `md:hidden`), (g) the create-certificate form 2-col grid → 1-col below md.
- [X] T052 [P] Cross-page navigation chain audit — student side (SC-015): from `pages/student/dashboard.html` click "عرض كل الإنجازات" → land on `achievements.html`; click featured-cert "عرض الشهادة" → land on `certificate-preview.html`; click "العودة للشهادات" → land on `certificates.html`; click any cert card "عرض الشهادة" → land on `certificate-preview.html`. All links resolve.
- [X] T053 [P] Cross-page navigation chain audit — admin side (SC-015): from `pages/admin/dashboard.html` click "الشهادات" sidebar → land on `admin/certificates.html`; click "إصدار شهادة جديدة" → land on `admin/create-certificate.html`; click "إلغاء" → land on `admin/certificates.html`. Per-row "عرض" → `../student/certificate-preview.html`. All links resolve.
- [X] T054 [P] Spec 001-004 inbound wiring audit: verify zero shell drift on prior-spec pages — no edits to `pages/student/{dashboard,learning-journey,weekly-plan,notifications,browse-courses,my-courses,course-details,live-sessions,live-session-details,session-checkout-preview,assignments,assignment-details,submit-assignment,submission-feedback}.html`, no edits to `pages/teacher/*.html`, no edits to `pages/admin/dashboard.html`, no edits to `pages/parent/dashboard.html`, no edits to `assets/js/main.js`, no edits to `tailwind.config.js`. Run `git status` from repo root and confirm ONLY the 8 new HTML files + `assets/css/input.css` (the print rule) + `assets/css/output.css` (rebuild) + `specs/005-achievements-certificates/` are listed as added/modified.
- [X] T055 Walk through the 17-row validation table in `quickstart.md §3` end-to-end and record outcomes. The feature is Done only when all 17 success criteria pass. Confirm the constitution v1.0.1 Definition of Done gates 1–12 also pass per `quickstart.md §4`.

**Final checkpoint**: Feature 005 is Done when T055 is complete with all 17 SCs and all 12 Definition-of-Done gates green.

---

## Dependencies

- **Phase 1 (Setup)**: T001 alone — read-only baseline check.
- **Phase 2 (Foundational)**: T002 (sanity check) → T003 (CSS edit). Both must complete before any user-story phase.
- **Phase 3 (US1)**: T004 → T005 → T006 → T007 → T008 → T009. Sequential, same file (`achievements.html`).
- **Phase 4 (US2)**: T010 → T011 → T012 → T013. Sequential, same file (`certificates.html`).
- **Phase 5 (US3)**: T014 → T015 → T016 → T017. Sequential, same file (`certificate-preview.html`).
- **Phase 6 (US7)**: T018 → T019 → T020 → T021. Sequential, same file (`admin/certificates.html`).
- **Phase 7 (US4)**: T022 → T023 → T024. Sequential, same file (`monthly-exams-passed.html`).
- **Phase 8 (US5)**: T025 → T026 → T027 → T028. Sequential, same file (`completed-levels.html`).
- **Phase 9 (US6)**: T029 → T030 → T031 → T032. Sequential, same file (`badges.html`).
- **Phase 10 (US8)**: T033 → T034 → T035 → T036. Sequential, same file (`admin/create-certificate.html`).
- **Phase 11 (Polish)**: T037 must run first (CSS build); T038–T054 are all `[P]`; T055 runs last as the sign-off gate.

User stories US1–US8 are independent of each other once Foundational completes — they touch different files. After Phase 2 completes, all 8 stories could in principle run in parallel by separate implementers. Recommended order: US1 first (MVP), then US2 + US3 + US7 (the other P1 stories) in parallel, then US4/US5/US6/US8 (P2) in parallel, then Polish.

## Suggested MVP scope

**MVP**: Complete Phase 1 (T001) + Phase 2 (T002 + T003) + Phase 3 (T004–T009) only. Result: a fully-built `pages/student/achievements.html` showing the 4 summary counters + featured Quran L1 cert + recent achievement timeline + 4 footer CTAs. The MVP unblocks every existing inbound link from Specs 001-004 — the dashboard's "عرض كل الإنجازات", weekly-plan/learning-journey/my-courses/notifications sidebar entries — all currently 404 and become live destinations. 9 tasks total to MVP.

## Per-story task counts

| Phase | Story | Task count |
|---|---|---|
| 1 | Setup | 1 |
| 2 | Foundational | 2 |
| 3 | US1 — Achievements Hub | 6 |
| 4 | US2 — Certificates List | 4 |
| 5 | US3 — Certificate Preview | 4 |
| 6 | US7 — Admin Certificates | 4 |
| 7 | US4 — Monthly Exams Passed | 3 |
| 8 | US5 — Completed Levels | 4 |
| 9 | US6 — Badges Wall | 4 |
| 10 | US8 — Admin Create Certificate | 4 |
| 11 | Polish | 19 |
| **Total** |  | **55** |

## Parallel execution opportunities

- **Within stories**: None — every story edits one file sequentially.
- **Across stories (after Foundational)**: All 8 user-story phases can run in parallel because each edits a distinct HTML file. The student-side pages (US1–US6) and admin-side pages (US7/US8) are especially independent — different role sidebars, different file directories — so a two-implementer split is natural.
- **Within Polish**: T038–T054 are all `[P]` (17 audit tasks across different concerns). Can be batched by a single agent or distributed across reviewers.

## Independent test criteria

Each user story has its own self-contained validation:

- **US1**: 4 summary cards + featured Quran L1 + 6-item timeline + 4 recent badges + 4 footer CTAs.
- **US2**: 4 cert cards + callout banner + NO download button anywhere (SC-002 grep).
- **US3**: parchment certificate (9 elements) + 4 action buttons + prototype notice + `@media print` rule applied.
- **US4**: 5 exam rows + 86.6% cumulative average + Monthly Excellence anchor (March 95%).
- **US5**: 2 cards + 50% path bar + L3 in-progress preview.
- **US6**: 7 badge tiles + 5 مرئي + 2 خاص visibility chips.
- **US7**: 8 admin rows + state-aware actions (إصدار/إعادة إصدار/إعادة تفعيل) + revoked row visually muted.
- **US8**: 8 labeled form inputs (for/id pairing) + Preview/Save/Cancel + prototype notice.
