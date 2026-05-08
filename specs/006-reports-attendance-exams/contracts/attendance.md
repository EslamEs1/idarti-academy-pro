# Contract — `pages/student/attendance.html`

**User story**: US6 (Attendance Log, P2) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Active sidebar entry**: NONE — see research.md §R4. Breadcrumb anchors back to `reports.html`.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#att-header` | h1 + subtitle + breadcrumb + term context caption |
| Summary cards | `#att-summary` | 6-card row |
| Trend visual | `#att-trend` | 5-bar inline-SVG chart |
| Filter row | `#att-filters` | ≥ 4 chips + 2 dropdowns |
| Session table | `#att-table` | ≥ 8 rows |

## Required content

### Header (`#att-header`)
- Breadcrumb: `الرئيسية / التقارير / سجل الحضور` (each segment is `<a>` linking to its parent page).
- h1: `سجل الحضور`
- Subtitle: `تتبّع حضورك في كل حصة منذ بداية الفصل`
- Context caption: `ديسمبر 2025 – مايو 2026 (الفصل الثاني)`

### Summary cards (`#att-summary`) — FR-025
6 cards (1 col mobile / 2-3 col tablet / 6 col wide). Distinct hue + icon per card.

| ID | Label | Value | Hue | Icon |
|----|-------|-------|-----|------|
| `att-card-total` | إجمالي الحصص | `60` | primary | calendar |
| `att-card-present` | حاضر | `54` | success | check |
| `att-card-absent` | غائب | `2` | danger | x |
| `att-card-late` | متأخر | `3` | warning | clock |
| `att-card-excused` | معذور | `1` | info | shield |
| `att-card-rate` | نسبة الحضور | `92%` | success | trending-up |

The four named-status badges (حاضر / غائب / متأخر / معذور) MUST use the success / danger / warning / info hues + check / x / clock / shield icons consistently — same color + icon rule applies to the table rows below.

### Trend visual (`#att-trend`) — FR-026
Inline `<svg>` per research.md §R12. Required minimums:
- 5 bars (ديسمبر / يناير / فبراير / مارس / أبريل)
- Bar heights matching 88% / 92% / 90% / 95% / 92%
- Reference line at 90% labeled `هدف الأكاديمية`
- Month labels below each bar
- Percentage labels above each bar
- `role="img"` + `aria-label="اتجاه الحضور — 5 أشهر"` for accessibility
- ≤ 80 LOC, no `<script>` tag, no JS

### Filter row (`#att-filters`) — FR-028
- ≥ 4 visual filter chips: `الكل` / `حاضر` / `غائب-متأخر` / `معذور` (each `<button type="button">` with active-state on `الكل`).
- ≥ 2 dropdowns: `الدورة` (with options for the 3 active courses + `الكل`) and `الشهر` (with options for the 6 reporting months + `الكل`).
- All controls visual-only.

### Session table (`#att-table`) — FR-027
8 rows in reverse-chronological order. Columns: التاريخ / الدورة / الحصة / المعلم / الحالة / ملاحظات.

Sample data: research.md §R13 — 8 rows covering all 4 named statuses (5 حاضر + 1 متأخر + 1 معذور + 1 غائب).

At < 768 px the table collapses to single-column cards (each card preserves all 6 cells stacked vertically + status badge prominently positioned).

The remaining 52 sessions (60 total – 8 rendered) are documented as an HTML comment block at the bottom of the section ("`<!-- 52 سجلات إضافية تظهر بعد التمرير في النسخة الكاملة -->`") to make the rolled-up summary numbers (60 / 54 / 2 / 3 / 1) visually defensible.

## Forbidden content (SC-016)
- NO Download / Print / Share / Save / WhatsApp clickable elements anywhere on this page.

## Grep checks (Polish phase)
- `grep -c 'att-card-' pages/student/attendance.html` ≥ 6
- `grep -c '<svg' pages/student/attendance.html` ≥ 1 (the trend chart)
- `grep -c '<rect' pages/student/attendance.html` ≥ 5 (5 bars)
- `grep -c 'حاضر\|غائب\|متأخر\|معذور' pages/student/attendance.html` ≥ 8 (4 cards × 1 + 4 statuses × ≥ 1 row)
- `grep -c '92%' pages/student/attendance.html` ≥ 2 (summary card + April bar label)
- `grep -nE '(تنزيل|طباعة|واتساب|مشاركة|حفظ التقرير)' pages/student/attendance.html` MUST be empty.
- `grep -c 'reports.html' pages/student/attendance.html` ≥ 1 (breadcrumb back-link)
