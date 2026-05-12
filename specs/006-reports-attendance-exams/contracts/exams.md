# Contract — `pages/student/exams.html`

**User story**: US7 (Exams Hub, P2) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Active sidebar entry**: الاختبارات (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#ex-header` | h1 + subtitle + count caption |
| Filter row | `#ex-filters` | 3 dropdowns + search |
| Tab pills | `#ex-tabs` | 3 tab buttons |
| Tab panel — upcoming | `#ex-panel-upcoming` | ≥ 2 cards |
| Tab panel — completed | `#ex-panel-completed` | ≥ 4 rows |
| Tab panel — monthly | `#ex-panel-monthly` | 5 rows IDENTICAL to Spec 005 |

## Required content

### Header (`#ex-header`)
- h1: `الاختبارات`
- Subtitle: `متابعة الاختبارات القادمة، المكتملة، والشهرية في مكان واحد`
- Count caption: `اختباران قادمان — 5 اختبارات شهرية مجتازة — 12 اختباراً مكتملاً هذا الفصل`

### Filter row (`#ex-filters`) — FR-031
- ≥ 3 `<select>` dropdowns: `الدورة` (options: 3 active courses + الكل) / `الشهر` (6 months + الكل) / `الحالة` (قادم / ناجح / يحتاج إعادة + الكل).
- 1 `<input type="search">` with placeholder: `ابحث عن اختبار...`
- All controls visual-only.

### Tab pills (`#ex-tabs`) — FR-032
3 `<button>` elements with `data-tab="upcoming|completed|monthly"`, each tied to its panel via `data-tabpanel="<id>"`. Reuses the existing main.js tabs handler — NO new JS.

| Tab button | data-tab | Default state |
|-----------|----------|---------------|
| اختبارات قادمة | `upcoming` | SELECTED (`aria-selected="true"` + active class) |
| اختبارات مكتملة | `completed` | inactive |
| اختبارات شهرية | `monthly` | inactive |

At < 768 px the tab pills become horizontally scrollable.

### Upcoming panel (`#ex-panel-upcoming`) — FR-033
≥ 2 upcoming-exam cards. Sample:

| Card | Title | Course | Date | Duration | Teacher | Status pill | CTA |
|------|-------|--------|------|----------|---------|-------------|-----|
| 1 | اختبار شهر مايو — القرآن الكريم المستوى الثالث | القرآن الكريم — المستوى الثالث | 28 مايو 2026 | 45 دقيقة | الأستاذ أحمد بن عبد الله | قادم (info-100 + calendar) | "عرض التفاصيل" → `exam-details.html` |
| 2 | اختبار قواعد اللغة العربية — أسبوع 22 | اللغة العربية — المستوى الرابع | 14 مايو 2026 | 30 دقيقة | الأستاذة منى سعد | قادم (info-100 + calendar) | "عرض التفاصيل" → `exam-details.html` |

### Completed panel (`#ex-panel-completed`) — FR-034
≥ 4 weekly/term rows from research.md §R16 — table with columns: التاريخ / العنوان / الدورة / الدرجة / الحالة / إجراء.

| # | Date | Title | Course | Score | Status | CTA |
|---|------|-------|--------|-------|--------|-----|
| 1 | 25 أبريل 2026 | اختبار أسبوعي 17 — أحكام التجويد | القرآن الكريم — المستوى الثالث | 18 / 20 (90%) | ناجح (success-100 + check) | عرض التفاصيل |
| 2 | 20 أبريل 2026 | اختبار قواعد إملائية — الواو والياء المتطرفتان | اللغة العربية — المستوى الرابع | 16 / 20 (80%) | ناجح | عرض التفاصيل |
| 3 | 15 أبريل 2026 | اختبار فصلي — السيرة النبوية | الدراسات الإسلامية — المستوى الثاني | 15 / 20 (75%) | ناجح | عرض التفاصيل |
| 4 | 8 أبريل 2026 | اختبار مفردات اللغة العربية | اللغة العربية — المستوى الرابع | 12 / 20 (60%) | يحتاج إعادة (warning-100 + retry) | عرض التفاصيل |

### Monthly panel (`#ex-panel-monthly`) — FR-035 (Q2 inclusive-hub resolution)
Caption above the table: `هذه الاختبارات تظهر أيضاً في صفحة "الاختبارات الشهرية المجتازة" داخل الإنجازات` (slate-50 background, info icon, NOT a clickable link out).

5 rows IDENTICAL to Spec 005's `monthly-exams-passed.html`:

| # | Month | Score | Status pill | Course | Special |
|---|-------|-------|-------------|--------|---------|
| 1 | ديسمبر 2025 | 90 / 100 (90%) | ممتاز | القرآن الكريم — المستوى الأول (الاختبار النهائي) | certificate-attached |
| 2 | يناير 2026 | 78 / 100 (78%) | جيد جداً | القرآن الكريم — مرحلة انتقالية | — |
| 3 | فبراير 2026 | 82 / 100 (82%) | جيد جداً | القرآن الكريم — المستوى الثاني | — |
| 4 | مارس 2026 | 95 / 100 (95%) | ممتاز | القرآن الكريم — المستوى الثاني (الاختبار النهائي) | parchment-tinted, certificate-attached |
| 5 | أبريل 2026 | 88 / 100 (88%) | ممتاز | القرآن الكريم — المستوى الثالث | current-month canonical row |

Each row's CTA: "عرض التفاصيل" → `exam-details.html`.

## Forbidden content (SC-016)
- NO Download / Print / Share / Save / WhatsApp clickable elements.

## Grep checks (Polish phase)
- `grep -c 'data-tab=' pages/student/exams.html` ≥ 3
- `grep -c 'data-tabpanel=' pages/student/exams.html` ≥ 3
- `grep -c 'exam-details.html' pages/student/exams.html` ≥ 11 (2 upcoming + 4 completed + 5 monthly)
- `grep -c 'ناجح' pages/student/exams.html` ≥ 3 (rows 1-3 of completed)
- `grep -c 'يحتاج إعادة' pages/student/exams.html` ≥ 1 (row 4 of completed)
- `grep -c 'قادم' pages/student/exams.html` ≥ 2 (upcoming cards)
- `grep -c '95 / 100' pages/student/exams.html` ≥ 1 (March monthly = exam-details deep-dive sample)
- `grep -c '88 / 100' pages/student/exams.html` ≥ 1 (April monthly = canonical April figure)
- `wc -l assets/js/main.js` MUST equal 68 (Spec 005 baseline) after this page is added — verifies no new JS handler.
