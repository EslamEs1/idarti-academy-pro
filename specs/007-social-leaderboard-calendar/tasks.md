---

description: "Task list for Social Hub, Leaderboard, and Calendar Frontend (Feature 007)"
---

# Tasks: Social Hub, Leaderboard, and Calendar Frontend

**Input**: Design documents from `/specs/007-social-leaderboard-calendar/`
**Prerequisites**: plan.md (loaded), spec.md (loaded), research.md (loaded), data-model.md (loaded), contracts/* (loaded), quickstart.md (loaded)

**Tests**: NOT requested. The user's brief is a static-frontend prototype; visual review against the 24 success criteria + quickstart's SC validation table is the QA layer. No automated tests are generated.

**Organization**: Tasks are grouped by user story (US1 → US7) so each page can be implemented and reviewed independently. Setup + Foundational are shared prerequisites; Polish is the final cross-cutting validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story tag (`[US1]`-`[US7]`) for traceability — user-story phase tasks ONLY
- File paths are repo-relative.

## Path Conventions

- Static frontend at repo root.
- New HTML lives under `pages/student/`, `pages/admin/`, `pages/teacher/`.
- Zero changes to `assets/js/` (`main.js` stays at 68 lines).
- Zero changes to `assets/css/input.css` — but `assets/css/output.css` IS rebuilt in Polish (T063) to pick up 4 Tailwind core utilities the new HTML references that the current Spec 006 baseline does not contain (`opacity-30`, `whitespace-nowrap`, `aspect-video`, `line-clamp-1`).
- No `src/`, `tests/`, or framework directories — this is a pure static prototype per Constitution Principle I.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Sanity-check the existing baseline before adding pages.

- [X] T001 Read `.specify/memory/constitution.md` v1.0.1 + `specs/007-social-leaderboard-calendar/plan.md` + `research.md` end-to-end. Confirm: (a) `wc -l assets/js/main.js` = 68 (Spec 005/006 baseline — must remain unchanged through this entire feature), (b) `wc -c assets/css/output.css` = 63,191 bytes (Spec 006 baseline — will GROW to ~64-65 KB after T063 rebuilds it to pick up 4 new Tailwind core utilities; both pre- and post-rebuild sizes MUST stay below the 80 KB ceiling from Spec 001), (c) all seven target file paths from §Project Structure do NOT yet exist (`ls pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` should error on every file), (d) the 4 utilities Spec 007 needs that are NOT yet in output.css are confirmed missing: `grep -c '\.opacity-30' assets/css/output.css` = 0, `grep -c '\.whitespace-nowrap' assets/css/output.css` = 0, `grep -c '\.aspect-video' assets/css/output.css` = 0, `grep -c '\.line-clamp-1' assets/css/output.css` = 0 — these will be picked up by T063's rebuild after the new HTML files exist. No edits — read-only verification.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Two foundational checks that every user-story phase consumes.

**⚠️ CRITICAL**: No user-story phase can begin until both T002 and T003 are complete.

- [X] T002 Verify the existing main.js tabs handler markup convention (used by `leaderboard.html` in US3). Open `assets/js/main.js` lines 47-66 and confirm the existing tabs handler reads `aria-controls="<panel-id>"` on `[role="tab"]` buttons, `[role="tabpanel"]` on panels (with `id` matching aria-controls), and uses `[data-tabpanels]` as the panel-wrapper attribute. Document confirmation in a one-line note (no file edit needed) — this is pure reconnaissance for US3's leaderboard tablist markup author. Verify the same convention is used on `pages/student/exams.html` (Spec 006) by grep: `grep -c 'role="tablist"\|role="tab"\|role="tabpanel"\|aria-controls=\|data-tabpanels' pages/student/exams.html` ≥ 5.
- [X] T003 [P] Read `.specify/memory/constitution.md` §Information Architecture, identify the active sidebar entries the new pages will mark active: Student sidebar = "Social Hub" (for `social-hub.html` + `post-details.html`) / "Leaderboard" (for `leaderboard.html`) / "Calendar" (for `calendar.html`); Admin sidebar = "Social Hub" (for both new admin pages); Teacher sidebar = "Calendar" (for new teacher calendar). Confirm by grep that every prior-spec page's sidebar contains these exact label strings: `grep -c '"Social Hub"\|مجتمع إدارتي\|الترتيب\|التقويم' pages/student/dashboard.html` ≥ 3 (or equivalent Arabic labels). Document the exact sidebar partial source file (the most-recent prior-spec student/admin/teacher page whose sidebar is verbatim correct) in a one-line research note. No edits.

**Checkpoint**: Foundation ready — all 7 user-story phases can now begin in parallel (each touches a single distinct file).

---

## Phase 3: User Story 1 — Social Hub Feed (Priority: P1) 🎯 MVP

**Goal**: Build `pages/student/social-hub.html` — the safe educational feed that closes the student dashboard L114 + every constitutional sidebar entry to "Social Hub".

**Independent Test**: Open `pages/student/social-hub.html` from the file explorer. Without any other context, the viewer answers in 30 seconds: "Whose academy is this? Who authored each post? When? What type of post is each one (out of 7)? Is there a compose-your-own box? Are reactions limited to a positive-only set? Are comments visibly moderated? Where do I open a post in full?" — entirely from the page.

### Implementation for User Story 1

- [X] T004 [US1] Create `pages/student/social-hub.html` by copying the student-side shell (head with Tajawal CDN + tailwind output.css + 14-entry student sidebar + header chrome + main placeholder) verbatim from a recent student-side page (e.g., `pages/student/dashboard.html` or `pages/student/reports.html` from Spec 006). Set `<title>مجتمع إدارتي — منصة إدارتي</title>`, `lang="ar"`, `dir="rtl"`, header greeting "عبد الرحمن مؤمن". Set `aria-current="page"` + the `is-active` class on the sidebar's "Social Hub" entry (FR-001 / contracts/social-hub-student.md §Active sidebar).
- [X] T005 [US1] Add `<section id="sh-header">` with h1 "مجتمع إدارتي" + subtitle "مساحة تعليمية آمنة — منشورات الأكاديمية، تهانينا، وتحديات أسبوعية" (FR-020 / contracts/social-hub-student.md §Header).
- [X] T006 [US1] Add `<div id="sh-mod-banner">` rendering the moderation-explainer banner directly below the header. Style: info-50 background + info-700 text + shield SVG icon (24×24). Copy: `🛡️ التعليقات تخضع للمراجعة — هذا فضاء تعليمي، ليس شبكة اجتماعية مفتوحة` (FR-021 / contracts/social-hub-student.md §Moderation banner).
- [X] T007 [US1] Add `<ul id="sh-filters">` with exactly 8 chip `<button type="button">` elements: "الكل" (selected, accent ring) / "إعلان عام" / "تهنئة" / "إنجاز طالب" / "تحدي الأسبوع" / "نصيحة تعليمية" / "تذكير اختبار" / "منشور دورة". Each non-active chip pairs a small color dot (matching the type's color from data-model §E1) with the label. The strip uses `overflow-x-auto whitespace-nowrap` for mobile horizontal scroll. Visual-only — no JS handlers (FR-022 / contracts/social-hub-student.md §Type filter).
- [X] T008 [US1] Add `<section id="sh-feed">` containing exactly 7 post cards `#sh-post-001` → `#sh-post-007` in reverse-chronological order. Each card per the contracts/social-hub-student.md §Feed table — author strip (avatar + name chip + date) + type pill (1 of 7 distinct color+icon) + 2-3 sentence Arabic body + 16:9 illustrative SVG image placeholder with descriptive `alt` text + optional related-course chip + 5-reaction quintet (👍 إعجاب / ⭐ تميّز / ❤️ محبّة / 🤲 دعاء / 👏 تشجيع — counts per R11) + comments-count chip + primary "عرض المنشور" CTA → `post-details.html`. **CRITICAL — Q3 anonymization**: post #2 (تهنئة) congratulates "**عبد الرحمن م.**" by anonymized form (NOT "عبد الرحمن مؤمن") with score "95%" + date "15 مارس 2026" — byte-identical to Spec 005's `monthly-exams-passed.html` row (FR-023 / FR-024 / FR-025 / FR-062). Post #3 (إنجاز طالب) celebrates "**سارة م.**" by anonymized form (NOT "سارة مؤمن") (FR-015 extension).
- [X] T009 [US1] Verify the page against `contracts/social-hub-student.md §Grep checks` — all 17 grep checks pass. Critical audits: `grep -c 'sh-post-' ≥ 7`; `grep -c 'post-details\.html' ≥ 7`; `grep -c 'عبد الرحمن مؤمن' = 0` (in post bodies — chrome-only allowed); `grep -c 'عبد الرحمن م\.' ≥ 1`; `grep -c 'سارة م\.' ≥ 1`; `grep -c 'سارة مؤمن' = 0`; `grep -c '95%' ≥ 1`; `grep -c '15 مارس 2026' ≥ 1`; `grep -P '👎\|😂\|😡\|😠' = 0` matches; `grep -cE 'اكتب منشوراً\|ما الذي يدور في ذهنك' = 0` (FR-011 — no composer); `grep -c 'onclick=\|data-reaction-modal' = 0` (R7 — non-interactive reactions); `wc -l assets/js/main.js` = 68.

**Checkpoint**: User Story 1 (MVP) is fully functional and testable. Every prior-spec student-side `social-hub.html` link now resolves. The brief's "safe community" headline page is shipped.

---

## Phase 4: User Story 2 — Post Details Deep-Read (Priority: P1)

**Goal**: Build `pages/student/post-details.html` — the only page where the safety mandate becomes operationally visible (per-comment status badges + 24h SLA + "إرسال للمراجعة" verb).

**Independent Test**: Open `pages/student/post-details.html`. A viewer answers: "What is this post about? Who authored it? When? Is it tied to a specific course? Are there comments — how many — and which are approved vs awaiting review? Does the comment form make moderation visible (does it tell me my comment will be reviewed before it appears, with a 24-hour SLA)?" — entirely from the page.

### Implementation for User Story 2

- [X] T010 [US2] Create `pages/student/post-details.html` by copying the student-side shell. Set `<title>تفاصيل المنشور — منصة إدارتي</title>`, mark "Social Hub" as `is-active` (children-of since post-details is a sub-page of the social hub feed) (FR-001).
- [X] T011 [US2] Add `<nav id="pd-breadcrumb">` with: `<a href="social-hub.html">مجتمع إدارتي</a>` / `<span aria-current="page">تفاصيل المنشور</span>` (contracts/post-details.md §Breadcrumb).
- [X] T012 [US2] Add `<section id="pd-header">` with type pill "تحدي الأسبوع" (accent-100 + flag icon) + h1 "تحدي الأسبوع: راجع سورة الفجر مع تطبيق أحكام التجويد" (FR-026 / contracts/post-details.md §Header).
- [X] T013 [US2] Add `<div id="pd-author">` with author strip (avatar أ.أ primary-700 fill + chip "الأستاذ أحمد بن عبد الله" + date "5 مايو 2026") + `<a id="pd-course" href="course-details.html">مرتبط بدورة: القرآن الكريم — المستوى الثالث</a>` (info-tinted chip) (FR-027). Add `<figure id="pd-image">` with 16:9 Quran-page-motif inline SVG + `<figcaption>` for screen-reader alt text. Add `<article id="pd-body">` with the 4 paragraphs from research.md §R12 verbatim + `text-base leading-7` styling.
- [X] T014 [US2] Add `<div id="pd-reactions">` with 5 fixed `<button type="button">` reaction buttons in IDENTICAL order to social-hub.html (FR-012): `👍 14 إعجاب` / `⭐ 9 تميّز` / `❤️ 7 محبّة` / `🤲 4 دعاء` / `👏 11 تشجيع`. Buttons are non-interactive — no `onclick`, no JS handler (FR-012 ext / R7). Add comments-count chip "8 تعليقات" after the reactions (FR-028).
- [X] T015 [US2] Add `<section id="pd-comments">` with exactly 4 comment items per contracts/post-details.md §Comments thread + research.md §R13. Each comment: avatar (small circle with role-letter ط/و) + anonymized author display ("طالب من المستوى الثالث" / "ولي أمر" / "طالبة من المستوى الثاني" — FR-015) + date + body (1-3 sentences) + status badge. Comments 1-3 use status "تم الاعتماد" (success-100 + check icon, full opacity). Comment 4 uses status "في انتظار المراجعة" (warning-100 + clock icon) with `title="سيتم نشر هذا التعليق بعد المراجعة — عادةً خلال 24 ساعة."` AND visual styling `opacity-60 italic` per FR-029. SC-017 + R6 enforced.
- [X] T016 [US2] Add `<form id="pd-form" onsubmit="return false;">` per contracts/post-details.md §Comment form: `<label for="pd-comment-textarea">أضف تعليقاً</label>` + `<textarea id="pd-comment-textarea" rows="4" placeholder="اكتب تعليقاً ملائماً ومحترماً..." aria-describedby="pd-form-helper">` + `<p id="pd-form-helper">🛡️ يرجى الالتزام بآداب الحوار التعليمي. التعليقات تخضع للمراجعة قبل النشر — نراجع التعليقات عادةً خلال 24 ساعة.</p>` (info-tinted with shield icon) + `<button type="button">إرسال للمراجعة</button>` (NOT "نشر" per FR-014) + `<p class="prototype-notice">هذا نموذج تجريبي — لا يتم إرسال تعليقات فعلية.</p>` (FR-014 / FR-030).
- [X] T017 [US2] Add `<section id="pd-related">` with ≥ 3 related-post mini-cards (3-column desktop / horizontally scrollable strip on mobile). Each mini-card: type pill + 1-line title (line-clamp-2) + author + date + link to `social-hub.html` (or `post-details.html` for an alternative deep-dive — both acceptable per FR-031). Sample picks: posts #2 (تهنئة), #5 (نصيحة), #7 (منشور دورة).
- [X] T018 [US2] Verify the page against `contracts/post-details.md §Grep checks` — all 14 grep checks pass. Critical audits: `grep -c '<label for="pd-comment-textarea"' ≥ 1` (FR-008); `grep -c 'إرسال للمراجعة' ≥ 1` (FR-014); `grep -c 'خلال 24 ساعة' ≥ 2` (helper + ≥ 1 badge tooltip — R6); `grep -c 'تم الاعتماد' ≥ 1` AND `grep -c 'في انتظار المراجعة' ≥ 1` (SC-017); `grep -c 'عبد الرحمن مؤمن' ≤ 1` (chrome-only, NOT in post body or comments — SC-024); `grep -P '👎\|😂\|😡\|😠' = 0`; `grep -c 'onclick=\|data-reaction-modal' = 0` (R7); `wc -l assets/js/main.js` = 68.

**Checkpoint**: User Story 2 fully functional. The brief's "Comments appear moderated visually" requirement has its dedicated surface.

---

## Phase 5: User Story 3 — Leaderboard (Priority: P1)

**Goal**: Build `pages/student/leaderboard.html` — the motivational ranking surface with the brief's required "Most Improved" tab + the personal-rank hero card + the `<details>` accordion explainer.

**Independent Test**: Open `pages/student/leaderboard.html`. A viewer answers: "Which month is being ranked? What is the persona's own rank, points, and movement-direction? What rank dimensions are available (overall / attendance / homework / most-improved / Quran progress / participation)? Who are the top-10 students? Per row: rank, student name, points, badge, and direction-of-movement? Does the page motivate without shaming?" — entirely from the page.

### Implementation for User Story 3

- [X] T019 [US3] Create `pages/student/leaderboard.html` by copying the student-side shell. Set `<title>لوحة الترتيب الشهري — منصة إدارتي</title>`, mark "Leaderboard" as `is-active` (FR-001 / contracts/leaderboard.md §Active sidebar).
- [X] T020 [US3] Add `<section id="lb-header">` with h1 "لوحة الترتيب الشهري" + subtitle "احتفل بتقدّمك — وقدّم التشجيع لزملائك" + tonal-stance caption (slate-tinted, below subtitle): "الترتيب يعكس الجهد، والتطوّر يعكس النموّ. كلاهما يستحق الاحتفاء." (FR-032 / contracts/leaderboard.md §Header).
- [X] T021 [US3] Add `<ul id="lb-months">` with 6-month chip strip in chronological order: ديسمبر 2025 / يناير 2026 / فبراير / مارس / **أبريل** / مايو 2026. أبريل 2026 is selected (`bg-accent-100 ring-2 ring-accent-500`, `aria-current="page"`). Each non-selected chip is `<a href="?month=YYYY-MM">` placeholder. The strip uses `overflow-x-auto` for mobile (FR-033 / contracts/leaderboard.md §Month selector).
- [X] T022 [US3] Add `<section id="lb-personal">` rendering the "بطاقة ترتيبك" hero card with cream/parchment background (matching Spec 006 monthly-report header aesthetic). Content per contracts/leaderboard.md §Personal-rank hero card: avatar ع.م (large 64×64 primary-700) + name "عبد الرحمن مؤمن" (FULL NAME — own chrome only) + level chip "الصف السادس — مسار القرآن الكريم" + dimension label "ترتيبك في الترتيب العام: 6" + points "215 نقطة" + movement chip "صعدت 3 مراكز" (success-100 + up-arrow — positive framing per FR-017) + motivational caption "استمرّ — أنت قريب من المراكز الأولى." (FR-034).
- [X] T023 [US3] Add `<div id="lb-tabs" role="tablist">` with exactly 6 tab pills using the existing main.js `[role="tablist"]` handler from T002 verification. Markup per data-model §E4 + contracts/leaderboard.md §Tab strip: each `<button role="tab" aria-controls="lb-panel-{slug}" aria-selected="true|false">`. 6 tabs in order: الترتيب العام (selected by default) / الحضور / الواجبات / الأكثر تطوراً / تقدّم القرآن / المشاركة. Slugs: overall / attendance / homework / improved / quran / participation. At < 768 px the strip becomes horizontally scrollable (FR-035).
- [X] T024 [US3] Add `<details id="lb-explainer" open>` immediately below the tab strip. Style: rounded-lg border border-info-100 bg-info-50 p-4. Inside: `<summary class="cursor-pointer font-medium text-info-700">` with info-icon SVG + text "كيف نحسب النقاط؟" + `<ul>` of exactly 6 `<li>` items per data-model §E4c content: الترتيب العام / الحضور / الواجبات / الأكثر تطوراً / تقدّم القرآن / المشاركة — each with the exact one-line formula from R5. `<details>` rendered with `open` attribute by default (no-JS-fallback). Native HTML5 — no JS handler needed (FR-038a / R5 / SC-022).
- [X] T025 [US3] Add `<div data-tabpanels>` containing 6 `<div role="tabpanel" id="lb-panel-{slug}">` panels. Default-selected panel `lb-panel-overall` is visible; the other 5 have `class="hidden"`. Each panel contains a `<table>` with `<thead>` for 5 columns (المركز / الطالب / النقاط / الشارة / التقدّم — for the المشاركة panel; for الأكثر تطوراً the table has 6 columns including movement chip per FR-037). Use the row data from contracts/leaderboard.md §Tab panels for all 6 tabs:
   - **lb-panel-overall** (default): 10 rows, persona at #6 (highlighted accent-50 + ring per FR-036).
   - **lb-panel-attendance**: 10 rows reshuffled by attendance %, persona at #4.
   - **lb-panel-homework**: 10 rows reshuffled by homework %, persona at #5.
   - **lb-panel-improved**: 10 rows ordered by movement, persona at #2, "ليلى ر." at #1 with "+12 مركزاً منذ مارس" badge (FR-016 fairness lever). Caption above: "هؤلاء الطلاب قطعوا أكبر مسافة من نقطة بدايتهم هذا الشهر — تطوّرهم يستحق الاحتفاء.". Each row carries an additional movement chip column per FR-037.
   - **lb-panel-quran**: 6 rows (Quran-enrolled only per Q4 / R4), persona at #4. Sibling سارة م. MUST NOT appear. Caption above: "هذا الترتيب يشمل الطلاب المسجّلين في دورات القرآن — نقيس التقدّم في المسار، ليس الالتحاق به."
   - **lb-panel-participation**: 10 rows reshuffled by participation, persona at #7.
   All non-persona/non-sibling rows use pseudonymous one-name-plus-initial format (خالد ع. / نورا ف. / etc.) per FR-039. Persona row visually highlighted on every panel.
- [X] T026 [US3] Add `<section id="lb-closing">` (accent-50 / cream background) with h2-style copy "لم تظهر في القائمة هذا الشهر؟" + body "كل طالب يمشي على وتيرته. تابع جهدك، وستظهر نتيجتك في الأشهر القادمة." + primary CTA `<a href="monthly-report.html">اقرأ تقريرك الشهري</a>` (FR-038 / Story 3 AC#7 / contracts/leaderboard.md §Closing motivational panel).
- [X] T027 [US3] Verify the page against `contracts/leaderboard.md §Grep checks` — all 17 grep checks pass. Critical audits: `grep -c 'role="tab"' ≥ 6`; `grep -c 'role="tabpanel"' ≥ 6`; `grep -c '<details' ≥ 1` AND `grep -c '<summary' ≥ 1`; `grep -c 'كيف نحسب النقاط؟' ≥ 1`; `grep -c 'الترتيب العام:\|الحضور:\|الواجبات:\|الأكثر تطوراً:\|تقدّم القرآن:\|المشاركة:' ≥ 6` (SC-022); `grep -c '+12 مركزاً منذ مارس' ≥ 1` (FR-016 fairness lever); `grep -c 'هذا الترتيب يشمل الطلاب المسجّلين في دورات القرآن' ≥ 1` (Q4 scope caption); `grep -c 'monthly-report\.html' ≥ 1` (closing CTA); persona row `عبد الرحمن م.` ≥ 6 (one per tab); sibling `سارة م.` ≥ 5 (5 of 6 tabs — NOT in Quran tab); `wc -l assets/js/main.js` = 68 (zero new JS — uses existing tablist handler + native `<details>`).

**Checkpoint**: User Story 3 fully functional. The brief's "Most Improved" fairness lever + transparency affordance are visible.

---

## Phase 6: User Story 4 — Student Calendar (Priority: P1)

**Goal**: Build `pages/student/calendar.html` — the unified events surface that closes the dashboard's body CTA L474 + the constitutional Calendar sidebar entry.

**Independent Test**: Open `pages/student/calendar.html`. A viewer answers: "Which month is shown? What events occur on which day? Per event: title, date, time, type (1 of 5), status (1 of 4), and where do I open the relevant detail page? Are 'today' and 'missed' visually distinct?" — entirely from the page.

### Implementation for User Story 4

- [X] T028 [US4] Create `pages/student/calendar.html` by copying the student-side shell. Set `<title>تقويم إدارتي — منصة إدارتي</title>`, mark "Calendar" as `is-active` (FR-001 / contracts/calendar-student.md §Active sidebar).
- [X] T029 [US4] Add `<section id="cal-header">` with h1 "تقويم إدارتي" + subtitle "جلساتك، تسليماتك، اختباراتك، وتقاريرك في مكان واحد" + context caption "مايو 2026" with month-navigation arrows (`<a href="?month=2026-04">← السابق</a>` + `<a href="?month=2026-06">التالي →</a>`, visual-only) (FR-040).
- [X] T030 [US4] Add `<ul id="cal-filters">` with 6-chip filter strip: "الكل" (selected) / "حصة مباشرة" (info color dot) / "تسليم واجب" (warning) / "اختبار" (primary) / "إصدار تقرير" (success) / "إعلان أكاديمي" (slate). Each chip is `<button type="button">` with paired color dot + label. The chip colors MUST match the corresponding mini-chip colors in the grid (per data-model §E5a + R15). Visual-only (FR-042).
- [X] T031 [US4] Add `<section id="cal-grid">` rendering the CSS-only May 2026 month grid. Use `grid grid-cols-7 gap-1`. Day-header row: 7 columns labeled `السبت` / `الأحد` / `الاثنين` / `الثلاثاء` / `الأربعاء` / `الخميس` / `الجمعة` (Saturday-first, RTL-correct). May 2026 starts on Friday — first row has 6 leading empty cells (Sat-Thu) + Friday May 1. Render 5-6 rows total. Each day cell shows the day number (Latin digit) + ≤ 3 mini-event chips (color-coded per type, icon-paired). Days with > 3 events render `+ N أحداث` overflow chip. **Today (9 مايو 2026)** highlighted: `ring-2 ring-accent-500 + bg-accent-50` + `<span class="...">اليوم</span>` mini-label inside the cell. At < 768 px the grid collapses to a vertical day-by-day list (`md:grid-cols-7 grid-cols-1` + appropriate stacking) per Story 4 AC#8 (FR-041).
- [X] T032 [US4] Add `<section id="cal-list">` containing `<h2>قائمة الأحداث القادمة</h2>` + `<ul>` of ≥ 8 event rows in chronological order from contracts/calendar-student.md §Event list (rows 1-11 from R16). Each row shows: date (Latin digits) + time + type pill (1 of 5) + title (1-line line-clamp-1) + status pill (1 of 4) + "عرض" CTA → type-correct destination (FR-044): حصة مباشرة → `live-session-details.html`; تسليم واجب → `assignment-details.html`; اختبار → `exam-details.html`; إصدار تقرير → `monthly-report.html`; إعلان أكاديمي → `post-details.html`. Status distribution: 4 مكتمل + 2 اليوم + 4 قادم + 1 فائت (FR-018 — at most 1 row of فائت with neutral framing "فائت — موعد سابق") (FR-043).
- [X] T033 [US4] Add `<section id="cal-export">` with the personal-calendar export cluster — exactly 3 visual `<button type="button">` buttons + 1 inline notice. Buttons: `تقويم آبل` (Apple-brand-tinted), `تقويم جوجل` (Google-brand-tinted), `Outlook` (Microsoft-brand-tinted). Each button has its brand icon (inline SVG). Inline notice below: "هذا نموذج تجريبي — لا يتم تصدير ملف فعلي عند النقر." This cluster MUST appear ONLY on this page (FR-019, SC-016 — verified later in Polish) (FR-045).
- [X] T034 [US4] Verify the page against `contracts/calendar-student.md §Grep checks` — all 16 grep checks pass. Critical audits: `grep -c 'grid-cols-7' ≥ 1`; 7 day-header labels each ≥ 1; `grep -c 'live-session-details\.html' ≥ 4`; `grep -c 'assignment-details\.html' ≥ 2`; `grep -c 'exam-details\.html' ≥ 2`; `grep -c 'monthly-report\.html' ≥ 1`; `grep -c 'post-details\.html' ≥ 1` (FR-044 — 5 destinations); `grep -c 'فائت' ≤ 2` AND `grep -c 'موعد سابق' ≥ 1` (FR-018); `grep -c 'تقويم آبل\|تقويم جوجل\|Outlook' ≥ 3` (FR-019 — export cluster); `grep -nE ' href="#"' = 0` (FR-007); `wc -l assets/js/main.js` = 68.

**Checkpoint**: User Story 4 fully functional. All 4 P1 student stories complete — the brief's headline student experience is shipped.

---

## Phase 7: User Story 5 — Admin Social Hub Management (Priority: P2)

**Goal**: Build `pages/admin/social-hub.html` (NOT `social-hub-management.html` per Q1 / R1) — the admin moderation workspace that closes the admin dashboard L183 inbound link.

**Independent Test**: Open `pages/admin/social-hub.html`. A viewer answers: "How many posts exist? How many are published / draft / scheduled? How many comments are pending review? Per post: type, title, author, audience, publish status, last-updated date, and which actions are available? Where do I create a new post?" — entirely from the page.

### Implementation for User Story 5

- [X] T035 [US5] Create `pages/admin/social-hub.html` by copying the admin-side shell verbatim from `pages/admin/dashboard.html` (or `certificates.html` / `create-certificate.html` from Spec 005). Set `<title>إدارة المجتمع التعليمي — منصة إدارتي</title>`, `lang="ar"`, `dir="rtl"`, header greeting "إدارة الأكاديمية". Set `aria-current="page"` + `is-active` on the admin sidebar's "Social Hub" entry (FR-001 / FR-010 / contracts/social-hub-admin.md §Active sidebar).
- [X] T036 [US5] Add `<section id="ash-header">` with h1 "إدارة المجتمع التعليمي" + subtitle "راجع، انشر، وأدِر منشورات الأكاديمية" + primary right-aligned CTA `<a href="create-post.html" class="btn-primary">إنشاء منشور جديد</a>` (FR-046).
- [X] T037 [US5] Add `<section id="ash-summary">` with exactly 4 moderation-summary cards in a 1/2/4-col responsive grid per data-model §E6 + contracts/social-hub-admin.md §Summary cards: "تعليقات في انتظار المراجعة" (7, warning-100 + clock + CTA "مراجعة التعليقات" → `#planned`) / "منشورات منشورة" (5, success-100 + check) / "منشورات مجدولة" (2, info-100 + calendar) / "مسوّدات" (1, slate-100 + edit) (FR-047).
- [X] T038 [US5] Add `<div id="ash-filters">` (NOT a `<form>` — admin filters are visual-only and a `<form>` wrapper would imply submit semantics that don't exist per FR-003) with ≥ 3 `<select>` dropdowns + 1 `<input type="search">`, each with a paired `<label for>` per FR-008 (contracts/social-hub-admin.md §Filter row). Selects: النوع (8 options: الكل + 7 type taxonomy values) / الحالة (6 options: الكل + 5 statuses) / التاريخ (4 options: الكل / هذا الأسبوع / هذا الشهر / الشهر الماضي). Search input: `id="ash-search"` placeholder "ابحث في المنشورات...". All visual-only (FR-048).
- [X] T039 [US5] Add `<p id="ash-notice">` with prototype-notice copy "الإجراءات في هذه الصفحة عرضية — لا يتم تنفيذ تغييرات فعلية على المنشورات." (info-tinted, rendered above the table) (FR-052).
- [X] T040 [US5] Add `<table id="ash-table">` with `<thead>` for 7 columns (العنوان / النوع / المؤلف / الجمهور / الحالة / آخر تحديث / الإجراءات) and `<tbody>` with exactly 10 rows per contracts/social-hub-admin.md §Posts table + research.md §R18. Status distribution MUST include all 5 visible statuses (منشور / مسودة / مجدول / غير منشور / محذوف) per FR-051. Per-row action cluster = 5 `<button type="button">` icons (👁 عرض / ✏ تعديل / ↗ نشر / ⛔ إلغاء نشر / 🗑 حذف) each with `aria-label` and `title` attributes (FR-050). Inactive (state-disabled) actions render with `disabled` + `opacity-30`. **Row 10 (محذوف)**: title styled with `opacity-60 + line-through`, only 👁 action visible/active per FR-050. **Row 2 (تهنئة)**: title uses anonymized "عبد الرحمن م." per Q3 / FR-015 extension. **Row 3 (إنجاز)**: title uses anonymized "سارة م.". At < 768 px the table collapses to stacked per-row cards preserving every column as a labeled key-value pair (FR-049 / FR-051).
- [X] T041 [US5] Verify the page against `contracts/social-hub-admin.md §Grep checks` — all 12 grep checks pass. Critical audits: `grep -c 'create-post\.html' ≥ 1` (FR-046); `grep -c '<label for="ash-' ≥ 4` (FR-008); 5 distinct status labels each ≥ 1 (FR-051, SC-018); `grep -c 'aria-label="عرض"\|aria-label="تعديل"\|aria-label="نشر"\|aria-label="إلغاء نشر"\|aria-label="حذف"' ≥ 5` distinct labels; `grep -c 'opacity-60\|line-through' ≥ 1` (محذوف row); `grep -c 'عبد الرحمن م\.' ≥ 1` (row 2 anonymized — Q3); `grep -c 'سارة م\.' ≥ 1` (row 3 anonymized — Q3); `grep -cE 'تنزيل\|طباعة\|واتساب\|تقويم آبل\|تقويم جوجل\|Outlook' = 0` (FR-019); `wc -l assets/js/main.js` = 68.

**Checkpoint**: User Story 5 fully functional. The admin dashboard sidebar entry now resolves; the moderation workflow is visible.

---

## Phase 8: User Story 7 — Teacher Calendar (Priority: P2)

**Goal**: Build `pages/teacher/calendar.html` per Q2 / R2 — the teacher's unified events surface that closes the teacher dashboard's L103 sidebar + L212 body CTA inbound links.

**Independent Test**: Open `pages/teacher/calendar.html`. A viewer answers: "Which teacher? Which month? What classes is the teacher scheduled to teach? Which homework deadlines do they need to grade by? Which exams are they invigilating? When do they need to submit student reports? Per event: title, date, time, type, status, and where do I open the relevant detail page?" — entirely from the page.

### Implementation for User Story 7 (intentionally before US6 since US7 is P2 and US6 is P3)

- [X] T042 [US7] Create `pages/teacher/calendar.html` by copying the teacher-side shell verbatim from `pages/teacher/dashboard.html` (or `student-reports.html` from Spec 006). Set `<title>تقويمي التدريسي — منصة إدارتي</title>`, header greeting "الأستاذ أحمد بن عبد الله". Set `aria-current="page"` + `is-active` on the teacher sidebar's "Calendar" entry (FR-001 / contracts/calendar-teacher.md §Active sidebar).
- [X] T043 [US7] Add `<section id="tcal-header">` with h1 "تقويمي التدريسي" + subtitle "صفوفك، تصحيحك، اختباراتك، وتقاريرك في مكان واحد" + context caption "مايو 2026" with month-navigation arrows (visual-only) (FR-065).
- [X] T044 [US7] Add `<div id="tcal-summary">` IMMEDIATELY below the subtitle, rendering the workload-summary strip per FR-068. Style: slate-tinted background, semi-bold text, 1-line content: `5 حصص — 18 واجباً للتصحيح — اختبار قادم — تقرير شهري قبل 31 مايو` (Latin digits). **This strip MUST appear ONLY on this page** — verified later via SC-020.
- [X] T045 [US7] Add `<ul id="tcal-filters">` with the same 6-chip filter strip as student calendar (FR-066) — same labels, same colors, only the underlying data differs. Chip 3 (تسليم واجب) carries an additional `title="مواعيد تصحيح الواجبات"` tooltip for teacher-framing per Story 7 AC#4. Visual-only.
- [X] T046 [US7] Add `<section id="tcal-grid">` with the SAME CSS Grid month structure as `pages/student/calendar.html` (`grid-cols-7`, Saturday-first day headers, today-cell highlighted on 9 مايو 2026, mini-event-chips per day, mobile vertical-list collapse) per FR-066. The visual structure is byte-equivalent to the student grid; only the underlying mini-chip events differ.
- [X] T047 [US7] Add `<section id="tcal-list">` with `<h2>قائمة أحداثي القادمة</h2>` + `<ul>` of exactly 10 event rows per contracts/calendar-teacher.md §Event list + research.md §R17. Status distribution: 3 مكتمل + 2 اليوم + 4 قادم + 1 فائت (per FR-071 + FR-018). **CRITICAL — Q2 / FR-069 role-correct destinations**: تسليم واجب → `homework-review.html` (NOT `assignment-details.html` — rows 4, 6, 7); إصدار تقرير → `student-reports.html` (rows 1, 10); إعلان أكاديمي → `#planned` (row 2 — teacher-announcements page out of scope per FR-069); حصة مباشرة → `live-session-details.html`; اختبار → `exam-details.html`. Row 4 (فائت) reads "فائت — متأخر" with neutral copy per FR-018, links to `homework-review.html` so the teacher can recover.
- [X] T048 [US7] Verify the page against `contracts/calendar-teacher.md §Grep checks` — all 17 grep checks pass. CRITICAL audits: `grep -c 'تقويمي التدريسي' ≥ 1`; `grep -c 'الأستاذ أحمد بن عبد الله' ≥ 1`; `grep -c 'خلاصة هذا الأسبوع' ≥ 1` (FR-068, SC-020); `grep -c 'homework-review\.html' ≥ 3` (FR-069 — rows 4, 6, 7); `grep -c 'assignment-details\.html' = 0` (FR-069, SC-021 — role-correct destination); `grep -c 'student-reports\.html' ≥ 2` (rows 1, 10); `grep -c '#planned' ≥ 1` (row 2); `grep -cE 'تقويم آبل\|تقويم جوجل\|Outlook' = 0` (FR-070, SC-016 — export cluster student-only); `wc -l assets/js/main.js` = 68.

**Checkpoint**: User Story 7 fully functional. Teacher dashboard's 2 inbound links now resolve. Both P2 stories complete.

---

## Phase 9: User Story 6 — Admin Create Post (Priority: P3)

**Goal**: Build `pages/admin/create-post.html` — the admin authoring form, drill-in target from US5's primary CTA.

**Independent Test**: Open `pages/admin/create-post.html`. A viewer answers: "What fields can the admin author? Type, title, body, audience? Can they upload an image? Can they publish now or schedule for later? What are the save options?" — entirely from the page.

### Implementation for User Story 6

- [X] T049 [US6] Create `pages/admin/create-post.html` by copying the admin-side shell. Set `<title>إنشاء منشور جديد — منصة إدارتي</title>`, mark "Social Hub" as `is-active` (children-of since create-post is a sub-page of social hub moderation) (FR-001 / FR-010 / contracts/create-post.md §Active sidebar).
- [X] T050 [US6] Add `<nav id="cp-breadcrumb">` with: `<a href="dashboard.html">الإدارة</a>` / `<a href="social-hub.html">إدارة المجتمع</a>` / `<span aria-current="page">إنشاء منشور جديد</span>` + `<section id="cp-header">` with h1 "إنشاء منشور جديد" + subtitle "سيتم نشر المنشور بعد المراجعة. يمكنك جدولته لتاريخ لاحق." (FR-053).
- [X] T051 [US6] Add `<label for="cp-type">نوع المنشور</label>` + `<select id="cp-type" aria-describedby="cp-type-helper">` with exactly 7 `<option>` values matching the 7-type taxonomy: إعلان عام (selected) / تهنئة / إنجاز طالب / تحدي الأسبوع / نصيحة تعليمية / تذكير اختبار / منشور دورة. Add `<p id="cp-type-helper">ينشر للجميع — مناسب للإجازات والقرارات الإدارية.</p>` (FR-054).
- [X] T052 [US6] Add `<label for="cp-title">العنوان</label>` + `<input type="text" id="cp-title" placeholder="اكتب عنواناً واضحاً للمنشور..." value="إجازة عيد الأضحى المبارك — الأكاديمية مغلقة من 6 إلى 10 يونيو 2026">` + `<label for="cp-content">محتوى المنشور</label>` + `<textarea id="cp-content" rows="6">` with the multi-paragraph Arabic sample pre-fill from data-model §E7 verbatim (FR-055).
- [X] T053 [US6] Add `<fieldset><legend>الجمهور المستهدف</legend>` with exactly 4 radio options per FR-056 + contracts/create-post.md §Audience radios. Each radio has a paired `<label for>` (FR-008) + a helper `<p>` clarifying audience reach. The "دورة محددة" option (`#cp-audience-course`) is paired with a conditional `<select id="cp-audience-course-select" disabled>` listing exactly 3 prior-spec courses (القرآن الكريم — المستوى الثالث / اللغة العربية — المستوى الرابع / الدراسات الإسلامية — المستوى الثاني). The select renders unconditionally for visibility per data-model §E7.
- [X] T054 [US6] Add `<label for="cp-upload-button">ارفع صورة</label>` + `<div id="cp-upload">` with dashed-border drop-zone (`border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50`), upload-icon SVG (cloud-upload), primary copy "اسحب صورة هنا أو اختر من جهازك", `<button type="button" id="cp-upload-button">تصفح الجهاز</button>`, helper "الصور المسموحة: PNG / JPG حتى 2 ميغابايت — هذا حقل عرضي." NO real `<input type="file">` — visual-only (FR-057).
- [X] T055 [US6] Add `<fieldset><legend>موعد النشر</legend>` with exactly 2 radios per FR-058: `cp-schedule-now` (selected) + `cp-schedule-later`. Each with paired `<label for>`. Render the 2 visual inputs UNCONDITIONALLY per FR-058: `<label for="cp-schedule-date">تاريخ النشر</label>` + `<input type="date" id="cp-schedule-date" value="2026-05-12">` + `<label for="cp-schedule-time">وقت النشر</label>` + `<input type="time" id="cp-schedule-time" value="08:00">`.
- [X] T056 [US6] Add `<div id="cp-actions">` with exactly 3 action buttons per FR-059: primary `<button type="button" class="btn-primary">نشر المنشور</button>` + secondary `<button type="button" class="btn-secondary">حفظ كمسودة</button>` + tertiary `<a href="social-hub.html" class="btn-tertiary">إلغاء</a>`. Append `<p id="cp-prototype-notice" class="prototype-notice">هذا نموذج تجريبي — لا يتم حفظ أو نشر منشورات فعلية عند الإرسال.</p>`.
- [X] T057 [US6] Verify the page against `contracts/create-post.md §Grep checks` — all 12 grep checks pass. Critical audits: 100% `<label for>` pairing audit (`comm -23 <(grep -oP 'id="cp-[a-z-]+' | sort -u) <(grep -oP 'for="cp-[a-z-]+' | sort -u)` returns empty — FR-008 / FR-060 / SC-012); 7 type options each ≥ 1; 4 audience options each ≥ 1; `grep -c 'social-hub\.html' ≥ 2` (breadcrumb + cancel link — FR-059); `grep -c '<input type="file"' = 0` (visual-only upload — FR-057); `grep -c '<form action=' = 0` (no real POST — FR-003); `grep -cE 'apple-calendar\|google-calendar\|outlook\|تنزيل\|طباعة\|واتساب' = 0` (FR-019); `grep -nE ' href="#"' = 0` (FR-007); `wc -l assets/js/main.js` = 68.

**Checkpoint**: All 7 user stories complete. The admin authoring drill-in target is shipped.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-cutting validation per quickstart.md §2 (24 SCs) + §3 (12 DoD gates) + §4 (cross-spec invariants).

- [X] T058 [P] Run the 24-row Success Criteria validation table from `quickstart.md §2`. Every row MUST end with ✓ PASS. **Critical SCs to verify**: SC-005 (zero student composer on social-hub); SC-006 (zero negative-emotion reactions); SC-011 (5-reaction quintet identical order on both pages); SC-015 (zero `href="#"` placeholders); SC-016 (export cluster ONLY on student calendar); SC-017 (≥ 1 of each comment status); SC-018 (all 5 admin statuses present); SC-020 (workload-summary strip ONLY on teacher calendar); SC-021 (teacher تسليم واجب → homework-review.html, not assignment-details.html); SC-022 (6 dimension formulas in `<details>`); SC-023 (zero JS handlers on reactions); SC-024 (full names "عبد الرحمن مؤمن" / "سارة مؤمن" not in post bodies). **Cross-cutting FRs implicitly validated by this audit (no per-task explicit reference)**: FR-004 (badge vocabulary — color paired with text + icon — verified in every page's badges); FR-006 (Latin digits everywhere — `grep -nP '[٠-٩۰-۹]' [7 files]` MUST return 0); FR-013 (every comment carries a 2-state status badge — covered by SC-017); FR-061 (persona's leaderboard rank pinning byte-identical — covered via T009 + T027 grep audits); FR-063 (April report-release calendar event links to monthly-report.html — covered via T034 grep audit); FR-064 (5-reaction quintet uniqueness in this spec — trivially satisfied since no prior spec defined reactions); FR-067 (5-event-type taxonomy reused on teacher calendar — covered via T048 grep audit + T046+T047 implementation).
- [X] T059 [P] Run the 12-gate Definition-of-Done verification from `quickstart.md §3`. Every gate MUST pass. **Critical gates**: 1 (all 7 files exist); 2 (responsive at 4 breakpoints — manual review at 375 / 768 / 1024 / 1280 px — **explicitly satisfies FR-009**); 7 (zero framework grep — react/vue/angular/svelte/next/nuxt/alpine/jquery returns 0); 8 (zero backend grep — fetch/XMLHttpRequest/axios/wa.me/navigator.share returns 0); 10 (zero new JS — `wc -l assets/js/main.js` = 68); 12 (RTL on every page — `grep -L 'lang="ar" dir="rtl"' [7 files]` returns 0). Gate 6 (Spec 001 design tokens + ≥ 35 status-badge usages) is the visual reviewer's check that **FR-004** (badge color + icon + text triple) holds across every Spec 007 page.
- [X] T060 [P] Run the cross-spec invariants checklist from `quickstart.md §4`. Verify: persona "عبد الرحمن مؤمن" appears in chrome but NOT in post bodies; sibling "سارة مؤمن" similarly anonymized in posts; March 95% exam reference byte-identical to Spec 005 anchor; calendar event #1 (1 مايو release) links to `monthly-report.html` (Spec 006 anchor); leaderboard closing CTA links to `monthly-report.html`; admin author voice "إدارة الأكاديمية" newly named in this spec; `git status` after this feature lists ONLY the 7 new HTML files + `specs/007-social-leaderboard-calendar/` directory + (this) `tasks.md` + the previously-updated `CLAUDE.md` and `.specify/feature.json` — NOT any prior-spec page edits.
- [X] T061 [P] Verify the CLAUDE.md SPECKIT marker block (already updated during /speckit-plan) accurately summarizes Spec 007: 7 pages, 7 clarifications resolved, persona ranks #6 overall + #2 most-improved, anonymization rule, role-correct destinations, affordance-locality discipline, transparency affordance, teacher-only workload strip. No edits needed unless the block has drifted from the as-shipped artifacts.
- [X] T062 Final manual review pass: open all 7 pages in a browser, click every navigation link, verify zero unintended 404s, verify the 4 inbound prior-spec link targets resolve (admin dashboard L183 → admin/social-hub.html; teacher dashboard L103 + L212 → teacher/calendar.html; student dashboard L114/L122/L130/L474 → student/social-hub.html / leaderboard.html / calendar.html). Click the export cluster on student calendar (verifies visual-only nature). Click reaction buttons on a post (verifies non-interactive — no modal opens). Click 🗑 on a posts-table row (verifies row stays visible, no removal). Sign-off when all manual checks pass.
- [X] T063 Run `npm run build:css` from repo root to regenerate `assets/css/output.css` after all 7 HTML files exist. This is REQUIRED — the new HTML references 4 Tailwind core utilities (`opacity-30`, `whitespace-nowrap`, `aspect-video`, `line-clamp-1`) that are absent from the Spec 006 baseline output.css. After the rebuild, verify: (a) `grep -c '\.opacity-30' assets/css/output.css` ≥ 1; (b) `grep -c '\.whitespace-nowrap' assets/css/output.css` ≥ 1; (c) `grep -c '\.aspect-video' assets/css/output.css` ≥ 1; (d) `grep -c '\.line-clamp-1' assets/css/output.css` ≥ 1; (e) `wc -c assets/css/output.css` < 80 KB (Spec 001 ceiling). No `input.css` edits required — the JIT scan picks up the new utilities automatically because Tailwind's `content` paths in `tailwind.config.js` already include `pages/**/*.html`. After rebuild, re-open the 7 pages in a browser and confirm: disabled action buttons render at 30% opacity (admin posts table محذوف row + state-disabled icons); social-hub filter chips don't wrap on narrow viewports; post image placeholders render at 16:9; event-list titles truncate to one line.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1, T001)**: No dependencies — can start immediately.
- **Foundational (Phase 2, T002 + T003)**: Depends on Setup (T001) completion. BLOCKS all user-story phases.
- **User Stories (Phases 3-9, T004-T057)**: All depend on Foundational completion.
  - Within each story, tasks are mostly sequential (one file per story; the file is built up section-by-section).
  - Across stories, all 7 stories can proceed in parallel (each touches a single distinct file in a distinct subdirectory).
- **Polish (Phase 10, T058-T063)**: Depends on ALL 7 user-story phases being complete. T063 (CSS rebuild) MUST run AFTER all 7 HTML files exist so Tailwind's JIT picks up the 4 new utilities; T058-T061 audits SHOULD ideally run after T063 so the styling-related visual checks (T059 DoD gate 6 + T062 manual browser review) see the correctly-styled pages.

### User Story Dependencies

- **US1 (P1, MVP)**: Independent — can start first. Closes the student social-hub inbound links.
- **US2 (P1)**: Depends on US1's existence (the social-hub feed CTAs link here), but they can be implemented in parallel — the link target just needs to exist by the end of US2.
- **US3 (P1)**: Independent. Reuses the existing main.js tablist handler verified in T002. Native `<details>`/`<summary>` for the explainer.
- **US4 (P1)**: Independent. Closes the calendar inbound links.
- **US5 (P2)**: Independent. Closes the admin dashboard L183 inbound link.
- **US7 (P2)**: Independent. Closes the teacher dashboard L103 + L212 inbound links.
- **US6 (P3)**: Depends on US5's existence (the admin moderation page is the only inbound link to create-post.html), but they can be implemented in parallel.

### Within Each User Story

- Shell first (sidebar / header / placeholder main).
- Then sections in source order (header → filters/banner → main content → action clusters / footers).
- Final task per story: grep-check audit (verifies all per-page grep checks from the contract pass).

### Parallel Opportunities

- **Setup + Foundational**: T002 and T003 can run in parallel (both pure reconnaissance, no edits).
- **User stories**: All 7 stories can be worked in parallel by different team members — each touches a single distinct file.
- **Within US3 (leaderboard)**: T020-T026 are mostly sequential (build up one file). T024 (accordion) and T025 (tab panels) could be authored in parallel since they're distinct DOM sections, BUT they live in the same file so reviewer can prefer sequential.
- **Polish (T058-T063)**: T058-T061 are pure read-only audits and can run in parallel. T062 (manual browser review) is sequential. T063 (CSS rebuild) MUST run before T062 so the manual review sees correctly-styled pages.

---

## Parallel Example: All 7 user stories simultaneously

```bash
# After Setup (T001) + Foundational (T002+T003) complete, dispatch:
Developer A: US1 (T004-T009) → pages/student/social-hub.html
Developer B: US2 (T010-T018) → pages/student/post-details.html
Developer C: US3 (T019-T027) → pages/student/leaderboard.html
Developer D: US4 (T028-T034) → pages/student/calendar.html
Developer E: US5 (T035-T041) → pages/admin/social-hub.html
Developer F: US7 (T042-T048) → pages/teacher/calendar.html
Developer G: US6 (T049-T057) → pages/admin/create-post.html

# All 7 stories complete → Polish (T058-T063: bulk SC audit + DoD review + cross-spec invariants + manual browser pass + CSS rebuild).
```

If solo, the recommended sequential order is the priority order: US1 → US2 → US3 → US4 → US5 → US7 → US6 → Polish.

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 (T001) + Phase 2 (T002+T003).
2. Complete Phase 3 (US1, T004-T009) — `pages/student/social-hub.html`.
3. **STOP and VALIDATE**: Open the file in a browser. Verify the brief's headline "safe community" promise is visible (moderation banner, no composer, positive-only reactions, anonymized celebration of عبد الرحمن م.). Click "عرض المنشور" — the link 404s until US2 is shipped (acceptable for MVP demo as long as the demo focus is the feed view).
4. Demo if ready.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. Add US1 → MVP demo (the safety-mandate visible).
3. Add US2 → the post-details deep-read closes the "View post" CTA.
4. Add US3 → leaderboard demo (the fairness mandate visible).
5. Add US4 → calendar demo (closes 4 dashboard inbound links).
6. Add US5 → admin moderation visible (closes admin dashboard inbound link).
7. Add US7 → teacher calendar visible (closes 2 teacher dashboard inbound links).
8. Add US6 → admin authoring drill-in.
9. Polish.

### Parallel Team Strategy

With multiple developers, after T001-T003 complete, all 7 stories can run in parallel because each touches a single distinct file in a distinct subdirectory. No file conflicts. Estimated wall-clock time with 3-4 developers: 1-2 days of work + 1 day of polish.

---

## Notes

- [P] tasks = different files, no dependencies on other unfinished tasks.
- [Story] label maps task to specific user story for traceability.
- Each user story completes a single distinct HTML file end-to-end.
- Verify the per-page grep checks (last task of each story phase) before moving to the next story.
- Commit after each user story is complete (or after each task for fine-grained history).
- Stop at any checkpoint to validate story independently.
- Avoid: editing prior-spec files (FR-005 / Q1+Q2), introducing new JS handlers (FR-002), adding new CSS utilities (zero rebuild required), using full real student names in post bodies (FR-015 ext / SC-024), using `assignment-details.html` as the destination on teacher calendar's تسليم واجب rows (FR-069 / SC-021), placing the export cluster anywhere other than student calendar (FR-019 / SC-016), placing the workload-summary strip anywhere other than teacher calendar (FR-068 / SC-020).
