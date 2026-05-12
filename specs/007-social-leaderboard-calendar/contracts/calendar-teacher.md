# Contract — `pages/teacher/calendar.html`

**User story**: US7 (Teacher Calendar, P2) — see spec.md.
**Persona**: الأستاذ أحمد بن عبد الله (primary teacher).
**Active sidebar entry**: Calendar (`aria-current="page"` + `is-active`).
**Filename**: `pages/teacher/calendar.html` per Q2 / R2 — closes the two teacher-dashboard inbound links (sidebar L103 + body CTA L212).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#tcal-header` | h1 + subtitle + month nav arrows |
| Workload-summary strip | `#tcal-summary` | "خلاصة هذا الأسبوع" — TEACHER-ONLY |
| Type filter | `#tcal-filters` | 6-chip filter strip (same labels as student calendar) |
| Month grid | `#tcal-grid` | CSS Grid 7-column RTL — same structure as student |
| Event list | `#tcal-list` | ≥ 8 chronological event rows — TEACHER data |

## Required content

### Header (`#tcal-header`) — FR-065

- h1: `تقويمي التدريسي`
- Subtitle: `صفوفك، تصحيحك، اختباراتك، وتقاريرك في مكان واحد`
- Context caption: `مايو 2026` with month-navigation arrows (`← السابق` / `التالي →`, visual-only).
- Header chrome with teacher greeting "الأستاذ أحمد بن عبد الله".

### Workload-summary strip (`#tcal-summary`) — FR-068

Position: just below the subtitle. Slate-tinted background, 1-line, semi-bold text:

```
5 حصص — 18 واجباً للتصحيح — اختبار قادم — تقرير شهري قبل 31 مايو
```

**This strip MUST appear ONLY on this page** (FR-068, SC-020). A grep on `pages/student/calendar.html` for "خلاصة هذا الأسبوع" MUST return 0.

### Type filter (`#tcal-filters`) — FR-066

Same 6-chip filter strip as `pages/student/calendar.html` per FR-066. Identical labels + colors — only the underlying data differs.

| # | Chip label | Color | State |
|---|-----------|-------|-------|
| 1 | الكل | slate | SELECTED |
| 2 | حصة مباشرة | info | inactive |
| 3 | تسليم واجب | warning | inactive (tooltip caption: "مواعيد تصحيح الواجبات" — teacher-framing) |
| 4 | اختبار | primary | inactive |
| 5 | إصدار تقرير | success | inactive |
| 6 | إعلان أكاديمي | slate | inactive |

### Month grid (`#tcal-grid`) — FR-066

CSS Grid `grid-cols-7` for May 2026, RTL Saturday-first — IDENTICAL structure to student calendar (FR-066). Day cells contain mini-event chips for the 10 events from research.md §R17. Today's cell (9 مايو 2026) highlighted with `ring-2 ring-accent-500 + bg-accent-50` + `<span>اليوم</span>` mini-label.

Day-header row: `السبت` / `الأحد` / `الاثنين` / `الثلاثاء` / `الأربعاء` / `الخميس` / `الجمعة`.

At < 768 px: same vertical-list collapse as student calendar.

### Event list (`#tcal-list`) — FR-067 + FR-069 + FR-071

`<ul>` of ≥ 8 event rows in chronological order. Sample 10 rows from research.md §R17:

| # | Date | Time | Type | Title | Status | CTA destination |
|---|------|------|------|-------|--------|-----------------|
| 1 | 30 أبريل 2026 | 23:59 | إصدار تقرير | تسليم تقارير شهر أبريل — 6 طلاب | مكتمل | `student-reports.html` |
| 2 | 3 مايو 2026 | 17:00 | إعلان أكاديمي | اجتماع المعلمين الشهري — قاعة الإدارة | مكتمل | `#planned` |
| 3 | 5 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث (مجموعة عبد الرحمن) | مكتمل | `live-session-details.html` |
| 4 | 7 مايو 2026 | 23:59 | تسليم واجب | تصحيح واجب المراجعة 17 — القرآن — 6 طلاب | فائت — متأخر | `homework-review.html` |
| 5 | 9 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث (الجزء الثاني) | اليوم | `live-session-details.html` |
| 6 | 9 مايو 2026 | 22:00 | تسليم واجب | تصحيح واجب المراجعة 18 — القرآن — 5 طلاب | اليوم | `homework-review.html` |
| 7 | 12 مايو 2026 | 23:59 | تسليم واجب | تصحيح واجب المراجعة 19 — القرآن — 6 طلاب | قادم | `homework-review.html` |
| 8 | 22 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث | قادم | `live-session-details.html` |
| 9 | 28 مايو 2026 | 19:00 | اختبار | اختبار شهر مايو — المستوى الثالث (إشراف وتصحيح) — 6 طلاب | قادم | `exam-details.html` |
| 10 | 31 مايو 2026 | 23:59 | إصدار تقرير | موعد تسليم تقارير شهر مايو — 6 طلاب | قادم | `student-reports.html` |

Status distribution: 3 مكتمل + 2 اليوم + 4 قادم + 1 فائت (per FR-071 + FR-018).

**Critical role-correct destination mapping** (per FR-069):
- تسليم واجب → `homework-review.html` (Spec 004 teacher workspace) — NEVER `assignment-details.html`. SC-021 grep-validates.
- إصدار تقرير → `student-reports.html` (Spec 006 teacher form) — different lens from student's `monthly-report.html`.
- إعلان أكاديمي → `#planned` (teacher-targeted announcements page is out of scope — FR-069 explicit).
- حصة مباشرة → `live-session-details.html` (same as student).
- اختبار → `exam-details.html` (same as student).

## Forbidden content

- **NO `assignment-details.html` link** anywhere on this page (FR-069 — teacher's homework deadlines link to grading workspace, not student submission view). SC-021 grep-validates.
- **NO "أضف للتقويم الشخصي" cluster** (FR-070, SC-016) — Apple/Google/Outlook export is exclusive to `pages/student/calendar.html`.
- **NO Download / Print / Share / WhatsApp buttons** (FR-019).
- **NO student-side composer** (FR-011 — N/A here, but reaffirmed).

## Grep checks (Polish phase)

- `grep -c 'aria-current="page"' pages/teacher/calendar.html` ≥ 1 (sidebar Calendar entry)
- `grep -c 'تقويمي التدريسي' pages/teacher/calendar.html` ≥ 1 (h1 — FR-065)
- `grep -c 'الأستاذ أحمد بن عبد الله' pages/teacher/calendar.html` ≥ 1 (header greeting + at least one event reference)
- `grep -c 'خلاصة هذا الأسبوع' pages/teacher/calendar.html` ≥ 1 (workload-summary strip — FR-068, SC-020)
- `grep -c 'خلاصة هذا الأسبوع' pages/student/calendar.html` MUST be 0 (workload strip is teacher-only — FR-068, SC-020)
- `grep -c 'grid-cols-7' pages/teacher/calendar.html` ≥ 1 (FR-066 — same grid structure as student)
- `grep -c 'السبت\|الأحد\|الاثنين\|الثلاثاء\|الأربعاء\|الخميس\|الجمعة' pages/teacher/calendar.html` ≥ 7 (Saturday-first)
- `grep -c 'homework-review\.html' pages/teacher/calendar.html` ≥ 3 (rows 4 + 6 + 7 — FR-069, SC-021)
- `grep -c 'assignment-details\.html' pages/teacher/calendar.html` MUST be 0 (FR-069 — role-correct destination — SC-021)
- `grep -c 'student-reports\.html' pages/teacher/calendar.html` ≥ 2 (rows 1 + 10 — FR-069)
- `grep -c 'live-session-details\.html' pages/teacher/calendar.html` ≥ 3 (rows 3 + 5 + 8)
- `grep -c 'exam-details\.html' pages/teacher/calendar.html` ≥ 1 (row 9)
- `grep -c '#planned' pages/teacher/calendar.html` ≥ 1 (row 2 — teacher-announcement page out of scope per FR-069)
- `grep -c 'اليوم' pages/teacher/calendar.html` ≥ 3 (today-cell label + 2 row status badges)
- `grep -c 'فائت' pages/teacher/calendar.html` ≥ 1 AND ≤ 2 (FR-018)
- `grep -c 'متأخر — يحتاج إجراء' pages/teacher/calendar.html` ≥ 1 (neutral framing for فائت row — FR-018)
- `grep -cE 'apple-calendar\|google-calendar\|outlook\|تقويم آبل\|تقويم جوجل' pages/teacher/calendar.html` MUST be 0 (FR-070, SC-016)
- `grep -cE 'تنزيل\|طباعة\|واتساب' pages/teacher/calendar.html` MUST be 0 (FR-019)
- `grep -nE ' href="#"' pages/teacher/calendar.html` MUST return 0 (FR-007 — only `href="#planned"` allowed)
- `wc -l assets/js/main.js` MUST equal 68 (zero new JS).
