# Phase 1 Data Model — Social Hub, Leaderboard, and Calendar Frontend

This document defines the entity schemas + their concrete sample-data anchors that every contract and every page in this feature MUST consume verbatim. The schemas are descriptive — they are NOT real database tables (no backend exists). They define the shape of the static sample data each page hard-codes so reviewers can verify cross-page consistency.

The persona family + cross-spec continuity is in research.md §R10. The 7 social-hub feed posts are in §R11. The post-details deep-dive content is in §R12 + §R13. The leaderboard roster + per-tab pinning is in §R14. The calendar event-type + status mapping is in §R15. The student calendar event sample is in §R16. The teacher calendar event sample is in §R17. The admin posts table sample is in §R18. The 5-reaction quintet specifics are in §R19. **This file binds those decisions to entity field shapes that contracts/ and tasks.md reference.**

---

## E0. Shell schema (cross-cutting — applied to every page in this feature)

**Renders on**: All 7 pages.

**Fields**:
- **`<html lang="ar" dir="rtl">`**: locked per FR-001.
- **`<head>`**: `<title>` (page-specific) + `<meta charset="UTF-8">` + `<meta name="viewport" content="width=device-width, initial-scale=1">` + Tajawal Google Fonts CDN link + `<link rel="stylesheet" href="../../assets/css/output.css">` (path adjusts per directory depth).
- **`<body>`**: contains the sidebar + header + main + footer.
- **Sidebar**: hard-embedded role partial (per research.md §R8):
  - Student pages: 14-entry sidebar from `pages/student/dashboard.html` (or any later student page from Specs 002-006). Active entry per page: `social-hub.html` + `post-details.html` → "Social Hub"; `leaderboard.html` → "Leaderboard"; `calendar.html` → "Calendar".
  - Admin pages: admin sidebar from `pages/admin/dashboard.html` / `certificates.html` / `create-certificate.html`. Active entry: "Social Hub" on both new admin pages.
  - Teacher page: 12-entry teacher sidebar from `pages/teacher/dashboard.html` / `student-reports.html`. Active entry: "Calendar".
- **Header**: search input + bell-as-anchor + profile dropdown + persona greeting:
  - Student-side greeting: "عبد الرحمن مؤمن" (full name in OWN chrome — per Q3 / R3 the anonymization rule applies only to posts visible to OTHER students, not to the persona's own header).
  - Admin-side greeting: "إدارة الأكاديمية".
  - Teacher-side greeting: "الأستاذ أحمد بن عبد الله".
- **Main**: page-specific content (defined per E1 → E7).
- **Footer**: Spec 002 baseline footer.

**Active-entry indicator**: `aria-current="page"` + the project's `is-active` class on the appropriate `<a>` (matches Spec 002-006 convention).

**Cross-page invariants**:
- The sidebar markup MUST be byte-identical across all 4 student pages (only the active entry differs). Same for the 2 admin pages. The teacher page's sidebar MUST be byte-identical to the sidebar baked into Spec 006's `student-reports.html`.
- **Header greeting consistency** (verified during T059 DoD gate 4 manual review): the header chrome's greeting MUST match the existing prior-spec convention for that role. Open `pages/student/dashboard.html` from Spec 002 and inspect the header — whatever greeting format it uses (full name "عبد الرحمن مؤمن" / first-name only / chip / etc.) MUST be reused verbatim by the 4 new student pages. Same for admin (compare against `pages/admin/dashboard.html`'s header) and teacher (compare against `pages/teacher/dashboard.html`'s header). The grep audits in T009 / T018 (which allow `grep -c 'عبد الرحمن مؤمن' ≤ 1` per page — chrome occurrence) ASSUME the prior-spec student greeting uses the full name; if the prior-spec greeting differs, adjust the new pages to match the prior convention rather than the data-model wording.

---

## E1. Post (≥ 7 instances on social-hub feed; 1 instance deep-dive on post-details; ≥ 8 instances on admin posts table)

**Renders on**: `pages/student/social-hub.html` (feed lens — 7 cards, one per type) + `pages/student/post-details.html` (deep-dive lens — 1 selected post) + `pages/admin/social-hub.html` (moderation lens — table rows, ≥ 8).

**Fields**:
- **id**: anchor identifier (e.g., `post-001` through `post-010`).
- **type**: one of {إعلان عام, تهنئة, إنجاز طالب, تحدي الأسبوع, نصيحة تعليمية, تذكير اختبار, منشور دورة}. Each type has a distinct color + icon pair (per research.md §R11):
  - إعلان عام = primary-100 + megaphone icon
  - تهنئة = accent-100 + party icon
  - إنجاز طالب = success-100 + trophy icon
  - تحدي الأسبوع = warning-100 + flag icon
  - نصيحة تعليمية = info-100 + lightbulb icon
  - تذكير اختبار = primary-50 + calendar-clock icon
  - منشور دورة = success-50 + book icon
- **title**: 1-line Arabic string (≤ 80 chars). Required on post-details + admin table; rendered as h1 on post-details. On the social-hub feed, the title appears within the card body alongside content.
- **author**: object with `name` + `avatar_initials` + `role`. Author values:
  - "إدارة الأكاديمية" (admin author voice — used for 4 of 7 feed posts).
  - "الأستاذ أحمد بن عبد الله" (avatar أ.أ — Quran teacher).
  - "الأستاذة منى سعد" (avatar م.س — Arabic teacher).
  - "الأستاذ خالد العبدلي" (avatar خ.ع — Islamic Studies teacher).
  - **Authors are NEVER anonymized** per R3 — only celebrated subjects are.
- **date**: ISO format internally; rendered as Arabic date with Latin digits (e.g., "5 مايو 2026" or relative "منذ ساعتين").
- **body**: 2-3 sentence string on social-hub cards; 4-6 paragraph string on post-details (per FR-027). Sample bodies for all 7 posts in research.md §R11; full deep-dive body for post #4 in research.md §R12.
- **image_placeholder**: 16:9 aspect-ratio illustrative SVG (NOT a photograph) with descriptive `alt` text. Per type per R11 (academy crest / gold star / book+check / Quran page / open book / calendar-clock / course banner).
- **related_course_chip** (optional): present on posts of type {تهنئة, إنجاز طالب, تحدي الأسبوع, تذكير اختبار, منشور دورة}; absent on {إعلان عام, نصيحة تعليمية} which render the "غير مرتبط بدورة محددة" caption instead. Chip text format: "مرتبط بدورة: {course name + level}". Links to `course-details.html` (Spec 003 anchor).
- **reactions**: object with 5 fixed positive-only emoji + count pairs per R19. Order is locked: `[👍 إعجاب, ⭐ تميّز, ❤️ محبّة, 🤲 دعاء, 👏 تشجيع]`. Counts per post in R11. Reactions are non-interactive per R7.
- **comments_count**: integer, rendered as a chip ("N تعليقاً" or "N تعليقات" — Arabic plural rules).
- **anonymized_subject** (only for type {تهنئة, إنجاز طالب}): the celebrated student's first-name + last-initial format (e.g., "عبد الرحمن م." / "سارة م."). Per R3 / FR-015 extension. This field is REQUIRED for the 2 achievement-type posts and MUST be rendered in the post body / title — full names like "عبد الرحمن مؤمن" MUST NOT appear (validated by SC-024).
- **status** (admin-table-only): one of {منشور, مسودة, مجدول, غير منشور, محذوف}. Each has a distinct color + icon (per research.md §R18 + FR-049 + FR-050).
- **audience** (admin-table-only): one of {جميع الطلاب, دورة محددة, أولياء الأمور, المعلمين}. The "دورة محددة" variant additionally carries the specific course chip.
- **last_updated** (admin-table-only): ISO date, rendered as "DD MMMM YYYY" Arabic format with Latin digits.

**Sample-data anchor**: 7 feed posts in research.md §R11 (rows 1-7); deep-dive post #4 in §R12; admin table 10 posts in §R18. Total unique posts across all 3 surfaces: ~10 (some posts on the admin table are the same as the feed posts; some are admin-only like the parents-survey draft).

**Cross-page invariants**:
- Posts that appear in BOTH the feed AND the admin table (rows 1-4 + 6 + 7 + 8 of R18 ≈ rows 1-7 of R11) MUST have byte-identical title + author + type across both surfaces. Same anchor identifier (e.g., `post-001`).
- The "تهنئة" post #2 references the persona's March 95% monthly exam — score "95%" + date "15 مارس 2026" MUST be byte-identical to Spec 005's `monthly-exams-passed.html` row.
- The full string "عبد الرحمن مؤمن" MUST NOT appear in any post body or post header on `social-hub.html` or `post-details.html` (SC-024). Only "عبد الرحمن م." appears.
- Reaction order is identical across `social-hub.html` and `post-details.html` (FR-012, SC-011).

---

## E2. Comment (≥ 4 instances on post-details)

**Renders on**: `pages/student/post-details.html`.

**Fields**:
- **anonymized_author**: role-titled display string (per FR-015). Allowed values include "طالب من المستوى الثالث" / "طالبة من المستوى الثاني" / "طالب من المستوى الرابع" / "ولي أمر" / "ولية أمر" / "طالب جديد" / etc. Real student names MUST NOT appear.
- **avatar**: small circular avatar with the role-letter (e.g., "ط" for طالب, "و" for ولي) and a hue tied to the role (slate / accent / info).
- **date**: Arabic-format date with Latin digits (e.g., "5 مايو 2026" or "6 مايو 2026").
- **body**: 1-3 sentence Arabic string. Per R13.
- **status**: one of {تم الاعتماد, في انتظار المراجعة}. Distinct color + icon per FR-013:
  - تم الاعتماد = success-100 + check icon
  - في انتظار المراجعة = warning-100 + clock icon, with `title` attribute "سيتم نشر هذا التعليق بعد المراجعة — عادةً خلال 24 ساعة." per R6
- **visual_styling** (driven by status):
  - تم الاعتماد → full opacity, normal styling.
  - في انتظار المراجعة → muted: `opacity-60` + `italic` body text OR a subtle "قيد المراجعة" overlay caption above the body. Per FR-029.

**Sample-data anchor**: 4 comments in research.md §R13. Status distribution: 3 تم الاعتماد + 1 في انتظار المراجعة. Author roles: 3 students + 1 parent. Levels referenced: "المستوى الثالث" (×2) + "المستوى الثاني" + "ولي أمر".

**Cross-page invariants**:
- At least one comment per status MUST be present (FR-013, SC-017).
- No full real student name (e.g., "عبد الرحمن مؤمن" / "سارة مؤمن") appears in any comment body or author display (FR-015).
- The 24-hour SLA tooltip on every "في انتظار المراجعة" badge is byte-identical to the helper text fragment "خلال 24 ساعة" per R6.

---

## E3. Comment Form (1 instance on post-details)

**Renders on**: `pages/student/post-details.html`.

**Fields**:
- **id_textarea**: e.g., `pd-comment-textarea` — paired with `<label for="pd-comment-textarea">أضف تعليقاً</label>`.
- **placeholder**: "اكتب تعليقاً ملائماً ومحترماً..."
- **rows**: ≥ 4 visible rows.
- **helper_text**: "يرجى الالتزام بآداب الحوار التعليمي. التعليقات تخضع للمراجعة قبل النشر — نراجع التعليقات عادةً خلال 24 ساعة." (per FR-014 — extended with R6's 24h SLA). Rendered with shield icon, info-tinted background.
- **submit_button**: `<button type="button">إرسال للمراجعة</button>` — NOT "نشر" per FR-014.
- **prototype_notice**: "هذا نموذج تجريبي — لا يتم إرسال تعليقات فعلية." (per FR-014).

**Cross-page invariant**: Submit-button label MUST be exactly "إرسال للمراجعة" (FR-014, SC-005-style audit). The helper text MUST contain the substring "خلال 24 ساعة" verbatim (R6, byte-identical to the badge tooltip).

---

## E4. Leaderboard Rank Entry (10 instances per dimension × 6 dimensions = up to 60 row instances; persona row + sibling row pinned per R10)

**Renders on**: `pages/student/leaderboard.html`'s 6 tab panels (one 10-row table per tab).

**Fields** (per row):
- **rank**: integer 1-10. Visual treatment varies by rank: gold chip for #1, silver for #2, bronze for #3, slate for ranks 4-10.
- **student**: object with `display_name` + `avatar_initials` + `is_persona` (boolean).
  - Persona row: `display_name = "عبد الرحمن م."` (anonymized — per R3). `is_persona = true` triggers visual highlight (subtle accent-50 background + accent-500 ring) per FR-036.
  - Sibling row: `display_name = "سارة م."`. `is_persona = false`.
  - Other 8 rows: pseudonymous one-name-plus-initial format from R14 roster (e.g., "خالد ع." / "نورا ف." / "ليلى ر.").
- **points**: integer, right-aligned, Latin digits.
- **badge**: single-word badge label per row. Examples: "نجم الحفظ" / "مواظب الشهر" / "متفوّق التجويد" / "متطوّر بسرعة" / "مشارك فعّال" / "محسن مستمر" / "قارئ متقن" / "مجتهد الشهر".
- **progress**: percentage (0-100) rendered as horizontal progress bar + numeric label.
- **movement** (Most-Improved tab only): chip showing month-over-month rank change (e.g., "+12 مركزاً منذ مارس", "+4 مراكز", "+1 مركز"). Required per FR-037.

**Per-dimension top-10 ordering** (per R14):
- **الترتيب العام**: persona at rank #6.
- **الحضور**: persona at rank #4.
- **الواجبات**: persona at rank #5.
- **الأكثر تطوراً**: persona at rank #2; "ليلى ر." at rank #1 with "+12 مركزاً منذ مارس" badge (FR-037 fairness lever).
- **تقدّم القرآن**: enrollment-scoped per R4 — only 6 Quran-enrolled students from R14's roster appear (ranks fill 6 of 10 — table shows 6 rows with a caption "10 طلاب مسجّلين في القرآن" if reading the spec literally would need 10 rows; alternatively, the table caps at 6 visible rows since only 6 Quran-enrolled students exist in our sample roster — see contracts/leaderboard.md for the resolved row count). Persona at rank #4.
- **المشاركة**: persona at rank #7.

**Cross-page invariants**:
- Persona row visually highlighted on every tab where it appears (FR-036).
- Sibling سارة م. appears on الترتيب العام / الحضور / الواجبات / الأكثر تطوراً / المشاركة; sibling does NOT appear on تقدّم القرآن (R4).
- All 10 student names except the persona/sibling rows use pseudonymous format (FR-039).

---

## E4b. Personal-Rank Hero Card (1 instance — pulled out above the tabs)

**Renders on**: `pages/student/leaderboard.html` — positioned ABOVE the tab strip per FR-034.

**Fields**:
- **avatar**: ع.م (primary-700 fill).
- **name**: عبد الرحمن مؤمن (FULL NAME — this is the persona's OWN card, not visible to others; the FR-015 extension applies to OTHER students seeing the persona, not the persona seeing themselves).
- **level_chip**: "الصف السادس — مسار القرآن الكريم".
- **dimension_label**: "ترتيبك في {currently-selected dimension}". Default: "ترتيبك في الترتيب العام: 6".
- **points_this_month**: numeric ("215 نقطة").
- **movement_chip**: positive-or-neutral chip per FR-017 — "صعدت 3 مراكز" (success-100 + up-arrow) OR "ثبّت ترتيبك" (slate-100) OR "نزلت مركزاً واحداً" (warning-100 + down-arrow — never danger-100/red).
- **motivational_caption**: 1-line copy ("استمرّ — أنت قريب من المراكز الأولى." or similar non-comparative phrasing).
- **visual_treatment**: cream/parchment background (matching Spec 006's `monthly-report.html` header aesthetic — explicit per FR-034).

**Cross-page invariant**: Movement-down arrow MUST use amber/warning tint, never red/danger (FR-017).

---

## E4c. Leaderboard Explainer Accordion (1 instance — under the tabs)

**Renders on**: `pages/student/leaderboard.html` — positioned BELOW the tab pills per FR-038a.

**Fields**:
- **summary_text**: "ⓘ كيف نحسب النقاط؟" (rendered as `<summary>` element with info icon).
- **content**: 6 dimension formula lines per R5:
  1. الترتيب العام: مجموع نقاط كل الفئات.
  2. الحضور: 5 نقاط لكل حصة حضرت.
  3. الواجبات: 10 نقاط لكل واجب مقبول.
  4. الأكثر تطوراً: عدد المراكز التي صعدتها مقارنة بالشهر الماضي.
  5. تقدّم القرآن: نسبة إكمال محتوى المستوى.
  6. المشاركة: تفاعل في الحصص + التعليقات المعتمدة.
- **HTML element**: `<details open>` wrapping `<summary>` + `<ul>` of 6 `<li>` items. Per R5.

**Cross-page invariant**: All 6 dimension labels appear verbatim (verifiable by grep — SC-022).

---

## E4d. Closing Motivational Panel (1 instance — at the page footer)

**Renders on**: `pages/student/leaderboard.html` — below the table per FR-038.

**Fields**:
- **headline_copy**: "لم تظهر في القائمة هذا الشهر؟ كل طالب يمشي على وتيرته. تابع جهدك، وستظهر نتيجتك في الأشهر القادمة." (per Story 3 AC#7).
- **CTA**: "اقرأ تقريرك الشهري" → `monthly-report.html` (Spec 006 anchor).
- **visual_treatment**: soft accent-50 / cream background; calm copy; no comparative framing.

**Cross-page invariant**: Always rendered regardless of the persona's rank (the panel is designed for the lower-ranked viewer; rendering it always normalizes the affordance).

---

## E5a. Calendar Event — Student lens (≥ 8 instances on student calendar)

**Renders on**: `pages/student/calendar.html`'s month-grid (mini-chips inside day cells) + event-list panel (≥ 8 rows below the grid).

**Fields**:
- **id**: anchor identifier.
- **date**: ISO date for sorting + Arabic display string with Latin digits (e.g., "5 مايو 2026").
- **time**: 24-hour format with Latin digits (e.g., "18:00", "23:59").
- **type**: one of {حصة مباشرة, تسليم واجب, اختبار, إصدار تقرير, إعلان أكاديمي} per R15. Each has a distinct color + icon pair (FR-004 / FR-042).
- **title**: 1-line Arabic string (≤ 80 chars). Sample anchors per R16.
- **status**: one of {قادم, مكتمل, فائت, اليوم} per R15. Today = 9 مايو 2026; events on that date have status `اليوم`. Past events default to `مكتمل` unless explicitly marked `فائت` (max 1 row per FR-018).
- **CTA_destination**: one of 5 prior-spec / Spec 007 destinations per FR-044:
  - حصة مباشرة → `live-session-details.html` (Spec 003)
  - تسليم واجب → `assignment-details.html` (Spec 004)
  - اختبار → `exam-details.html` (Spec 006)
  - إصدار تقرير → `monthly-report.html` (Spec 006)
  - إعلان أكاديمي → `post-details.html` (this spec)

**Sample-data anchor**: 11 events in research.md §R16 covering 4 statuses + 5 types (4 مكتمل + 2 اليوم + 4 قادم + 1 فائت).

**Today-cell highlighting**: The day-cell for 9 مايو 2026 in the month-grid has `ring-2 ring-accent-500 + bg-accent-50` styling and contains a "اليوم" mini-label.

**Cross-page invariants**:
- Every "عرض" CTA href MUST point at an existing prior-spec or Spec 007 file (no `href="#"`, per FR-007 + SC-015).
- "فائت" rows ≤ 1 (FR-018 — keep tone non-shaming).
- Today's events ≥ 1 row of status `اليوم`.

---

## E5b. Calendar Event — Teacher lens (≥ 8 instances on teacher calendar)

**Renders on**: `pages/teacher/calendar.html`'s month-grid + event-list panel.

**Schema**: Identical to E5a, BUT:
- **type interpretations differ**: see R15's "Teacher data" column. تسليم واجب = grading deadlines (NOT homework due dates). إصدار تقرير = report submission deadlines (NOT release dates the student reads).
- **CTA_destinations differ** per FR-069:
  - حصة مباشرة → `live-session-details.html` (Spec 003) — same destination as student
  - تسليم واجب → `homework-review.html` (Spec 004 teacher workspace) — DIFFERENT from student
  - اختبار → `exam-details.html` (Spec 006) — same destination as student
  - إصدار تقرير → `student-reports.html` (Spec 006 teacher form) — DIFFERENT lens from student's `monthly-report.html`
  - إعلان أكاديمي → `#planned` (teacher-targeted announcements out of scope) — DIFFERENT from student's `post-details.html`

**Sample-data anchor**: 10 events in research.md §R17 covering 4 statuses + 5 types (3 مكتمل + 2 اليوم + 4 قادم + 1 فائت).

**Workload-summary strip** (FR-068, teacher-only):
- Position: just below the page subtitle.
- Content: "5 حصص — 18 واجباً للتصحيح — اختبار قادم — تقرير شهري قبل 31 مايو" (Latin digits, 1 line).
- Visual: slate-tinted background, semi-bold text.
- MUST appear ONLY on `pages/teacher/calendar.html` (FR-068) — verifiable by grep (SC-020).

**Cross-page invariants**:
- "أضف للتقويم الشخصي" cluster MUST NOT appear on this page (FR-070, SC-016).
- The teacher's تسليم واجب CTAs link to `homework-review.html`, NOT `assignment-details.html` (FR-069, SC-021 — this is the canonical role-correct-destination check).
- The 5-type taxonomy + 4-status vocabulary are identical to the student calendar (FR-066/067) — verifiable by grep on the type/status label strings.

---

## E5c. Personal-Calendar Export Cluster (1 instance — ONLY on student calendar)

**Renders on**: `pages/student/calendar.html` ONLY (per FR-019).

**Fields**:
- **3 visual buttons**: Apple Calendar / Google Calendar / Outlook — each as `<button type="button">` with brand-tinted styling.
- **Inline notice**: "هذا نموذج تجريبي — لا يتم تصدير ملف فعلي عند النقر." (per FR-019).

**Cross-page invariant**: Cluster MUST NOT appear on `pages/teacher/calendar.html` or any other Spec 007 page (FR-019 + FR-070, SC-016). Verifiable by grep for the brand strings ("apple-calendar" / "google-calendar" / "outlook" / their Arabic equivalents) — must return matches ONLY in `pages/student/calendar.html`.

---

## E6. Admin Posts Table Row (≥ 8 instances on admin social-hub)

**Renders on**: `pages/admin/social-hub.html`'s posts table.

**Fields** (per row):
- **title** (from E1).
- **type** (from E1, with type-pill styling).
- **author** (from E1, as chip).
- **audience**: one of {جميع الطلاب, دورة محددة, أولياء الأمور, المعلمين}. Rendered as chip. Per R18.
- **status** (from E1, with status-pill styling — one of 5 visible: منشور / مسودة / مجدول / غير منشور / محذوف).
- **last_updated** (from E1).
- **actions**: 5-icon-button cluster per FR-050:
  - 👁 عرض (always active)
  - ✏ تعديل (active on all statuses except محذوف)
  - ↗ نشر (active on مسودة + غير منشور — promoting to published)
  - ⛔ إلغاء نشر (active on منشور + مجدول — un-publishing)
  - 🗑 حذف (active on all statuses except محذوف)
- **soft-delete styling**: rows with status=محذوف render with `opacity-60 + line-through` on the title; only the 👁 action remains visually active (the other 4 are hidden or grayed out per FR-050).

**Sample-data anchor**: 10 rows in research.md §R18. Status distribution: 5 منشور + 2 مجدول + 1 مسودة + 1 غير منشور + 1 محذوف. Author distribution: 8 admin + 2 teachers. Audience distribution: 6 جميع الطلاب + 2 دورة محددة + 1 أولياء الأمور + 1 المعلمين.

**4 moderation-summary cards** (FR-047, derived counts from the table):
- "تعليقات في انتظار المراجعة" (warning-100 + clock icon): 7
- "منشورات منشورة" (success-100 + check): 5
- "منشورات مجدولة" (info-100 + calendar): 2
- "مسوّدات" (slate-100 + edit): 1

**Cross-page invariants**:
- All 5 visible statuses MUST appear in the table (FR-051, SC-018).
- The محذوف row's title appears with line-through styling and only 👁 remains active (FR-050).
- Each row's primary action button has an `aria-label` for screen readers (per FR-050 per "اria-label" mandate).

---

## E7. Create-Post Form (1 instance — full form on create-post)

**Renders on**: `pages/admin/create-post.html`.

**Sections**:
- **Type select** (`#cp-type`, paired with `<label for="cp-type">نوع المنشور</label>`):
  - 7 `<option>` values matching the 7-type taxonomy from E1 (إعلان عام / تهنئة / إنجاز طالب / تحدي الأسبوع / نصيحة تعليمية / تذكير اختبار / منشور دورة).
  - "إعلان عام" pre-selected.
  - 1-line helper text below select: "ينشر للجميع — مناسب للإجازات والقرارات الإدارية." (helper varies per active type — but the rendered initial state uses the إعلان عام helper).

- **Title input** (`#cp-title`, paired with label "العنوان"):
  - Placeholder: "اكتب عنواناً واضحاً للمنشور..."
  - Sample pre-fill: "إجازة عيد الأضحى المبارك — الأكاديمية مغلقة من 6 إلى 10 يونيو 2026"

- **Content textarea** (`#cp-content`, paired with label "محتوى المنشور"):
  - Rows: ≥ 6 visible.
  - Sample pre-fill (multi-paragraph Arabic):
    > "أعزّاءنا الطلاب وأولياء الأمور،\n\nنُعلمكم بأنّ الأكاديمية ستكون مغلقة خلال إجازة عيد الأضحى المبارك من 6 إلى 10 يونيو 2026.\n\nستستأنف الحصص يوم 11 يونيو حسب الجدول الأسبوعي المعتاد. لكم منّا أطيب التحيات وكل عام وأنتم بخير.\n\nإدارة الأكاديمية"

- **Audience radio group** (4 radios, each with explicit `<label for>` paired):
  - `#cp-audience-all` (label "جميع الطلاب", selected by default, helper "ينشر للطلاب فقط في تغذية المجتمع.")
  - `#cp-audience-course` (label "دورة محددة", helper "ينشر للطلاب المسجّلين في الدورة المختارة فقط.") + conditional course `<select>` (`#cp-audience-course-select`) with 3 `<option>` values: "القرآن الكريم — المستوى الثالث" / "اللغة العربية — المستوى الرابع" / "الدراسات الإسلامية — المستوى الثاني".
  - `#cp-audience-parents` (label "أولياء الأمور", helper "ينشر في تغذية أولياء الأمور.")
  - `#cp-audience-teachers` (label "المعلمين", helper "ينشر للمعلمين فقط — مخصّص للإعلانات الإدارية.")

- **Image upload visual** (`#cp-upload`, paired with label "ارفع صورة"):
  - Dashed-border drop-zone.
  - Upload icon (cloud-upload SVG).
  - Primary copy: "اسحب صورة هنا أو اختر من جهازك"
  - Visual button: `<button type="button">تصفح الجهاز</button>`
  - Helper: "الصور المسموحة: PNG / JPG حتى 2 ميغابايت — هذا حقل عرضي."
  - No real file input (intentionally — visual-only).

- **Scheduling radio group** (2 radios, each with explicit `<label for>`):
  - `#cp-schedule-now` (label "نشر فوراً", selected by default).
  - `#cp-schedule-later` (label "جدولة لتاريخ لاحق").
  - 2 visual inputs rendered unconditionally (per FR-058): `#cp-schedule-date` (`<input type="date">` pre-filled "2026-05-12") + `#cp-schedule-time` (`<input type="time">` pre-filled "08:00").

- **Action cluster** (3 buttons + prototype notice):
  - Primary: `<button type="button">نشر المنشور</button>` (accent).
  - Secondary: `<button type="button">حفظ كمسودة</button>`.
  - Tertiary: `<a href="social-hub.html">إلغاء</a>` (per FR-059).
  - Notice: "هذا نموذج تجريبي — لا يتم حفظ أو نشر منشورات فعلية عند الإرسال."

**Cross-page invariants**:
- 100% `<label for>` pairing for every input/select/textarea (FR-008 + FR-060). Verifiable by `comm -23 <(sorted ids) <(sorted fors)` returning empty.
- Cancel link points to `social-hub.html` in the SAME admin/ directory (no `pages/admin/` prefix needed because the file is in admin/) per FR-059.
- The 7 type options match E1's 7-type taxonomy verbatim.
- The 4 audience options match E5b's 4-state audience vocabulary.

---

## Cross-spec invariants (auditable on `/speckit-implement` Polish)

These invariants reference data shapes defined above and are validated by SC-001 → SC-024:

| Invariant | Check | Validator |
|-----------|-------|-----------|
| Persona name `عبد الرحمن مؤمن` appears ONLY in self-chrome positions (sidebar / header / personal card on leaderboard) — NEVER in posts visible to other students | `grep -c 'عبد الرحمن مؤمن' pages/student/{social-hub,post-details}.html` MUST be 0 (in post bodies — header/chrome occurrences are distinct) | SC-024 |
| Persona anonymized form `عبد الرحمن م.` appears in posts on social-hub + post-details + admin table | `grep -c 'عبد الرحمن م\.' pages/student/{social-hub,post-details}.html pages/admin/social-hub.html` ≥ 1 each | SC-024 |
| Sibling anonymized form `سارة م.` appears in posts (NOT full name in posts) | `grep -c 'سارة م\.' pages/student/social-hub.html` ≥ 1; `grep -c 'سارة مؤمن' pages/student/social-hub.html` MUST be 0 | SC-024 (extension) |
| Quran teacher `الأستاذ أحمد بن عبد الله` appears in author positions on multiple pages | `grep -c 'الأستاذ أحمد بن عبد الله' pages/student/{social-hub,post-details}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` ≥ 1 each (for the 5 of 7 pages where teacher posts/events appear) | continuity |
| 5-reaction quintet identical order on social-hub + post-details | `grep -c '👍.*إعجاب\|⭐.*تميّز\|❤️.*محبّة\|🤲.*دعاء\|👏.*تشجيع' pages/student/{social-hub,post-details}.html` ≥ 5 each | SC-011 |
| No thumbs-down / laughing / anger reactions anywhere | `grep -P '👎\|😂\|😡\|😠' pages/student/{social-hub,post-details}.html` returns 0 matches | SC-006 |
| No student composer on social-hub | `grep -E 'اكتب منشوراً\|ما الذي يدور في ذهنك\|<textarea\|<input type="text"' pages/student/social-hub.html` returns 0 matches in textarea/input contexts | SC-005 |
| All 4 calendar statuses appear on student calendar | `grep -c 'قادم\|مكتمل\|فائت\|اليوم' pages/student/calendar.html` ≥ 4 distinct labels | SC-003 |
| All 4 calendar statuses appear on teacher calendar | `grep -c 'قادم\|مكتمل\|فائت\|اليوم' pages/teacher/calendar.html` ≥ 4 distinct labels | SC-003 (extension) |
| All 5 admin posts table statuses appear | `grep -c 'منشور\|مسودة\|مجدول\|غير منشور\|محذوف' pages/admin/social-hub.html` ≥ 5 distinct labels | SC-018 |
| 6 leaderboard tabs present | `grep -c 'data-tab=\|aria-controls=' pages/student/leaderboard.html` ≥ 6 | SC-002-style |
| 6 dimension formulas present in `<details>` explainer | `grep -c 'الترتيب العام:\|الحضور:\|الواجبات:\|الأكثر تطوراً:\|تقدّم القرآن:\|المشاركة:' pages/student/leaderboard.html` ≥ 6 | SC-022 |
| Comments demonstrate both statuses | `grep -c 'تم الاعتماد' pages/student/post-details.html` ≥ 1; `grep -c 'في انتظار المراجعة' pages/student/post-details.html` ≥ 1 | SC-017 |
| 24-hour SLA appears in helper text + tooltip | `grep -c 'خلال 24 ساعة' pages/student/post-details.html` ≥ 2 | (form helper + ≥ 1 badge tooltip) |
| Apple/Google/Outlook export cluster ONLY on student calendar | `grep -lE 'apple\|google\|outlook\|تقويم آبل\|تقويم جوجل' pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` returns ONLY `pages/student/calendar.html` | SC-016 |
| Teacher calendar's تسليم واجب CTA → `homework-review.html`, NOT `assignment-details.html` | `grep -c 'homework-review\.html' pages/teacher/calendar.html` ≥ 2; `grep -c 'assignment-details\.html' pages/teacher/calendar.html` MUST be 0 | SC-021 |
| Teacher calendar workload-summary strip ONLY on teacher calendar | `grep -c 'خلاصة هذا الأسبوع' pages/teacher/calendar.html` ≥ 1; same grep on `pages/student/calendar.html` MUST be 0 | SC-020 |
| 100% `<label for>` pairing on create-post form | per-page audit: `comm -23 <(grep -oP 'id="cp-[a-z-]+' | sort -u) <(grep -oP 'for="cp-[a-z-]+' | sort -u)` returns empty | SC-012 |
| 100% `<label for>` pairing on admin social-hub form fields (filter dropdowns + search) | same pattern | SC-012 |
| Reaction buttons have NO JS handler | `grep -c 'onclick=\|data-reaction-modal\|data-reactor-list' pages/student/{social-hub,post-details}.html` returns 0 | SC-023 |
| Persona's March 95% exam reference uses byte-identical anchor | `grep -c '95%' pages/student/social-hub.html` ≥ 1 AND `grep -c '15 مارس 2026' pages/student/social-hub.html` ≥ 1 (in the تهنئة post body) | FR-062 |
| April report-release event on calendar links to `monthly-report.html` | `grep -c 'monthly-report\.html' pages/student/calendar.html` ≥ 1 | FR-063 |
| Zero new JS | `wc -l assets/js/main.js` = 68 (Spec 006 baseline); no new event handlers added | SC-005-style |
| Zero `href="#"` placeholders | `grep -nE ' href="#"' pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` MUST return 0 (note: `href="#planned"` is allowed per FR-007) | FR-007 / SC-015 |
| Zero Eastern Arabic-Indic digits | `grep -nP '[٠-٩۰-۹]' [7 files]` MUST return 0 | FR-006 |
