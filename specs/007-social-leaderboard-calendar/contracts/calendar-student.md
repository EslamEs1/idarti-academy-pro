# Contract — `pages/student/calendar.html`

**User story**: US4 (Calendar, P1) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Active sidebar entry**: Calendar (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#cal-header` | h1 + subtitle + month-context caption + nav arrows |
| Type filter | `#cal-filters` | 6-chip filter strip |
| Month grid | `#cal-grid` | CSS Grid 7-column RTL month view |
| Event list | `#cal-list` | ≥ 8 chronological event rows |
| Personal-calendar export cluster | `#cal-export` | Apple / Google / Outlook visual buttons + notice |

## Required content

### Header (`#cal-header`) — FR-040

- h1: `تقويم إدارتي`
- Subtitle: `جلساتك، تسليماتك، اختباراتك، وتقاريرك في مكان واحد`
- Context caption: `مايو 2026` with month-navigation arrows: `← السابق` / `التالي →` (visual-only, both rendered as `<button type="button">` or as `<a href="?month=2026-04">`/`?month=2026-06"` placeholder anchors).
- Header chrome with persona greeting "عبد الرحمن مؤمن".

### Type filter (`#cal-filters`) — FR-042

6-chip filter strip. Each chip is a `<button type="button">` with the type's color dot + label.

| # | Chip label | Color (matches grid mini-chip) | State |
|---|-----------|--------------------------------|-------|
| 1 | الكل | slate (neutral) | SELECTED |
| 2 | حصة مباشرة | info-100 + info-700 | inactive |
| 3 | تسليم واجب | warning-100 + warning-700 | inactive |
| 4 | اختبار | primary-100 + primary-700 | inactive |
| 5 | إصدار تقرير | success-100 + success-700 | inactive |
| 6 | إعلان أكاديمي | slate-100 + slate-700 | inactive |

Visual-only (no JS).

### Month grid (`#cal-grid`) — FR-041

CSS Grid (`grid grid-cols-7 gap-1`) for May 2026, RTL Saturday-first. May 2026 starts on Friday — so the first row has 6 empty leading cells (Sat-Thu) + Friday May 1. Total ~5 rows.

Each day cell:
- Day number (Latin digit, e.g., "9").
- Up to 3 mini-event chips per cell (color-coded by type, icon-paired). If a day has > 3 events, the 3rd chip is replaced by `+ N أحداث`.
- Cells for past days (1-8 May) have slightly muted background.
- Cell for **today (9 مايو 2026)** has highlight: `ring-2 ring-accent-500 + bg-accent-50` + a `<span>اليوم</span>` mini-label inside the cell.

Day-header row (top): 7 columns labeled `السبت` / `الأحد` / `الاثنين` / `الثلاثاء` / `الأربعاء` / `الخميس` / `الجمعة` (Saturday-first).

**At < 768 px**: the grid collapses to a vertical day-by-day list (`md:grid-cols-7 grid-cols-1` with the 7-column layout only at md+). Each day in the mobile list shows the day number + day-of-week header + its event chips inline. No horizontal page scroll. (FR-009 / Story 4 AC#8 / FR-066-style accessibility-first behavior.)

### Event list (`#cal-list`) — FR-043 + FR-044

`<ul>` of ≥ 8 event rows in chronological order. Each row renders:
- Date (Arabic format with Latin digits, e.g., `9 مايو 2026`).
- Time (Latin digits, e.g., `18:00`).
- Type pill (1 of 5).
- Title (1-line, line-clamp-1).
- Status pill (1 of 4).
- "عرض" CTA → type-correct destination per FR-044.

Sample rows (from research.md §R16 — 11 rows total):

| # | Date | Time | Type | Title | Status | CTA destination |
|---|------|------|------|-------|--------|-----------------|
| 1 | 1 مايو 2026 | 09:00 | إصدار تقرير | إصدار تقرير شهر أبريل 2026 | مكتمل | `monthly-report.html` |
| 2 | 3 مايو 2026 | 18:00 | حصة مباشرة | حصة الدراسات الإسلامية — المستوى الثاني | مكتمل | `live-session-details.html` |
| 3 | 5 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث | مكتمل | `live-session-details.html` |
| 4 | 7 مايو 2026 | 20:00 | إعلان أكاديمي | إعلان عام: إجازة عيد الأضحى المبارك | مكتمل | `post-details.html` |
| 5 | 9 مايو 2026 | 18:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث (الجزء الثاني) | اليوم | `live-session-details.html` |
| 6 | 9 مايو 2026 | 19:30 | حصة مباشرة | حصة اللغة العربية — المستوى الرابع | اليوم | `live-session-details.html` |
| 7 | 12 مايو 2026 | 23:59 | تسليم واجب | تسليم واجب المراجعة 18 — اللغة العربية | قادم | `assignment-details.html` |
| 8 | 14 مايو 2026 | 19:00 | اختبار | اختبار قواعد اللغة العربية — أسبوع 22 | قادم | `exam-details.html` |
| 9 | 22 مايو 2026 | 18:00 | حصة مباشرة | حصة الدراسات الإسلامية — المستوى الثاني | قادم | `live-session-details.html` |
| 10 | 28 مايو 2026 | 19:00 | اختبار | اختبار شهر مايو — القرآن الكريم المستوى الثالث | قادم | `exam-details.html` |
| 11 | 30 أبريل 2026 | 23:59 | تسليم واجب | تسليم واجب المراجعة 17 — القرآن الكريم | فائت — موعد سابق | `assignment-details.html` |

Status distribution: 4 مكتمل + 2 اليوم + 4 قادم + 1 فائت (per FR-018 — at most 1 row of فائت).

### Personal-calendar export cluster (`#cal-export`) — FR-019 / FR-045

Position: bottom of the page (after the event list). 3 visual buttons + 1 inline notice:

```
[تقويم آبل]  [تقويم جوجل]  [Outlook]
هذا نموذج تجريبي — لا يتم تصدير ملف فعلي عند النقر.
```

Each button: `<button type="button">` with brand-tinted styling + the brand icon. **This cluster MUST appear ONLY on this page** (FR-019, SC-016).

## Forbidden content

- **NO Download / Print / Share / Save / WhatsApp buttons** (FR-019 — these belong to report-canonical pages from Spec 006). The Apple/Google/Outlook export cluster IS allowed because it's calendar-specific, not a report-share affordance.
- **NO `<form>` or POST handlers** for the export cluster — visual-only.
- **NO date pickers** — month navigation is via static visual arrows or `?month=` placeholder anchors.

## Grep checks (Polish phase)

- `grep -c 'aria-current="page"' pages/student/calendar.html` ≥ 1 (sidebar Calendar entry)
- `grep -c 'grid-cols-7' pages/student/calendar.html` ≥ 1 (CSS Grid month layout)
- `grep -c 'السبت\|الأحد\|الاثنين\|الثلاثاء\|الأربعاء\|الخميس\|الجمعة' pages/student/calendar.html` ≥ 7 (day headers Saturday-first)
- `grep -c 'cal-list' pages/student/calendar.html` ≥ 1
- `grep -c 'live-session-details\.html' pages/student/calendar.html` ≥ 4 (rows 2, 3, 5, 6, 9 in event list)
- `grep -c 'assignment-details\.html' pages/student/calendar.html` ≥ 2 (rows 7 + 11)
- `grep -c 'exam-details\.html' pages/student/calendar.html` ≥ 2 (rows 8 + 10)
- `grep -c 'monthly-report\.html' pages/student/calendar.html` ≥ 1 (row 1)
- `grep -c 'post-details\.html' pages/student/calendar.html` ≥ 1 (row 4)
- `grep -c 'اليوم' pages/student/calendar.html` ≥ 3 (today's cell mini-label + status badges on rows 5/6 + filter chip "اليوم" if rendered)
- `grep -c 'فائت' pages/student/calendar.html` ≥ 1 AND ≤ 2 (FR-018 — sparing usage; max 1 event row + possibly 1 status pill in the type-key)
- `grep -c 'موعد سابق\|لم يُحضر' pages/student/calendar.html` ≥ 1 (neutral framing for فائت row — FR-018)
- `grep -c 'تقويم آبل\|تقويم جوجل\|Outlook' pages/student/calendar.html` ≥ 3 (FR-019 / FR-045 — export cluster)
- `grep -c 'لا يتم تصدير ملف فعلي' pages/student/calendar.html` ≥ 1 (export prototype-notice)
- `grep -c '<svg' pages/student/calendar.html` ≥ 5 (icons inside grid mini-chips and event-list type pills)
- `grep -P '٠-٩|۰-۹' pages/student/calendar.html` returns 0 (FR-006 — no Eastern Arabic digits)
- `grep -nE ' href="#"' pages/student/calendar.html` MUST return 0 (FR-007 — `href="#planned"` is allowed if any future-spec destination is referenced; in this contract no `#planned` is needed since all 5 type destinations exist)
- `wc -l assets/js/main.js` MUST equal 68 (zero new JS).
