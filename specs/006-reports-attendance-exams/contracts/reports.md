# Contract — `pages/student/reports.html`

**User story**: US1 (Student Reports Hub, P1) — see spec.md.
**Persona**: عبد الرحمن مؤمن — الصف السادس — مسار القرآن الكريم.
**Active sidebar entry**: التقارير (`aria-current="page"` + `is-active` class on the sidebar link).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#rp-header` | h1 + subtitle + persona greeting |
| Month selector | `#rp-month-selector` | 6-chip strip; selected = مايو 2026 |
| Summary cards | `#rp-summary` | 5-card row |
| Per-course detail table | `#rp-detail-table` | 3 rows + Details CTAs |
| Footer CTA | `#rp-footer` | "عرض التقرير الشهري الكامل" |

## Required content

### Header (`#rp-header`)
- h1: `تقاريري الشهرية`
- Subtitle: `تابع تقدّمك عبر الأشهر — اختر الشهر الذي تريد مراجعته`
- Persona greeting in header chrome (reused from Spec 002)

### Month selector (`#rp-month-selector`) — FR-012
- Horizontal chip strip; mobile = horizontally scrollable.
- Exactly 6 chips in chronological order:
  - `ديسمبر 2025` → `<a href="?month=2025-12">`
  - `يناير 2026` → `<a href="?month=2026-01">`
  - `فبراير 2026` → `<a href="?month=2026-02">`
  - `مارس 2026` → `<a href="?month=2026-03">`
  - `أبريل 2026` → `<a href="?month=2026-04">`
  - `مايو 2026` → SELECTED (`bg-accent-100 ring-2 ring-accent-500 font-semibold`) — current month, no href (or `aria-current="page"`)

### Summary cards (`#rp-summary`) — FR-013
Five cards, distinct accent + icon per card. Layout: 1 col mobile / 2-3 col tablet / 5 col desktop.

| ID | Label | Value | Hue | Icon |
|----|-------|-------|-----|------|
| `rp-card-classes` | الفصول النشطة | `3` | primary | book-open |
| `rp-card-attendance` | الحضور | `92%` | success | check-circle |
| `rp-card-homework` | إنجاز الواجبات | `88%` | accent | clipboard-check |
| `rp-card-quizavg` | متوسط الاختبارات | `86.6%` | info | award |
| `rp-card-overall` | التقدّم الإجمالي | `89%` | warning | trending-up |

### Per-course detail table (`#rp-detail-table`) — FR-014, FR-015
Columns: الدورة / المعلم / الحضور (%) / الواجبات (%) / متوسط الاختبارات (%) / الحالة / إجراء.

| Row | Course | Teacher | Att | HW | Quiz | Status pill | CTA |
|-----|--------|---------|-----|----|------|-------------|-----|
| 1 | القرآن الكريم — المستوى الثالث | الأستاذ أحمد بن عبد الله (avatar أ.أ, primary-700) | `100%` | `100%` | `88%` | ممتاز (success-100 + star) | "عرض التفاصيل" → `monthly-report.html` |
| 2 | اللغة العربية — المستوى الرابع | الأستاذة منى سعد (avatar م.س, accent-600) | `90%` | `80%` | `80%` | جيد جداً (info-100 + check) | "عرض التفاصيل" → `monthly-report.html` |
| 3 | الدراسات الإسلامية — المستوى الثاني | الأستاذ خالد العبدلي (avatar خ.ع, success-700) | `89%` | `100%` | `75%` | جيد جداً (info-100 + check) | "عرض التفاصيل" → `monthly-report.html` |

At < 768 px the table collapses to single-column cards (each card preserves all 7 cells stacked vertically).

### Footer CTA (`#rp-footer`) — FR-016
- Primary `<a href="monthly-report.html">عرض التقرير الشهري الكامل</a>` styled as a primary button
- 1-line caption next to it: "آخر تقرير: 30 أبريل 2026"

## Forbidden content (SC-016)
- NO Download / Print / Share / Save / WhatsApp clickable elements anywhere on this page.

## Grep checks (Polish phase)
- `grep -c 'rp-card-' pages/student/reports.html` ≥ 5
- `grep -c '<tr' pages/student/reports.html` ≥ 4 (1 header + 3 data rows; mobile cards may add more)
- `grep -c 'monthly-report.html' pages/student/reports.html` ≥ 4 (3 row CTAs + 1 footer)
- `grep -nE '(تنزيل|طباعة|واتساب|مشاركة|حفظ التقرير)' pages/student/reports.html` MUST be empty.
- `grep -c 'مايو 2026' pages/student/reports.html` ≥ 1 (the selected month chip)
