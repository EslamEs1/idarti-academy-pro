# Contract — `pages/student/monthly-report.html`

**User story**: US2 (Full Monthly Report, P1) — see spec.md.
**Persona**: عبد الرحمن مؤمن — الصف السادس — أبريل 2026 report.
**Active sidebar entry**: التقارير (children-of).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Report-card header | `#mr-header` | logo + wordmark + month + student-info strip |
| Overall evaluation | `#mr-overall` | pill + score bar + 1-2 sentence quote |
| Mini-summaries | `#mr-mini-summaries` | 4-card row |
| Teacher notes | `#mr-teacher-notes` | 3 quote blocks |
| Reflection panels | `#mr-reflections` | 3 stacked panels |
| Parent summary | `#mr-parent-summary` | 4-6 sentence paragraph |
| Action cluster | `#mr-actions` | 3 buttons |
| Prototype notice | `#mr-prototype-notice` | 1-line stub clarifier |

## Required content

### Header (`#mr-header`) — FR-017
- Cream/parchment background (e.g., `bg-amber-50` + thin `ring-1 ring-amber-200`).
- Top-center: academy logo + `أكاديمية إدارتي` wordmark + small accent dot.
- Title: `التقرير الشهري` (h1 in display weight, primary-900).
- Month label below title: `أبريل 2026` (primary-700 chip).
- Student info strip: avatar `ع.م` + name `عبد الرحمن مؤمن` + level chip `الصف السادس — مسار القرآن الكريم` + report ID `RPT-2026-04-Q03-007`.

### Overall evaluation (`#mr-overall`) — FR-018
- Status pill `ممتاز` (success-100 + star icon, success-700 text).
- Horizontal score bar: `89 / 100` (89% fill, success-500).
- Quote block: 1-2 sentences attributed to "إدارة الأكاديمية":
  > "شهر مميّز لعبد الرحمن — حافظ على حضور ممتاز، أنجز معظم واجباته، وحصل على 88% في اختباره الشهري. واصلوا الدعم في البيت."

### Mini-summaries (`#mr-mini-summaries`) — FR-019
4 cards, 1 col mobile / 2 col tablet / 4 col desktop.

| ID | Label | Value | Caption | Hue | CTA target |
|----|-------|-------|---------|-----|------------|
| `mr-card-attendance` | ملخص الحضور | `92%` | حضر 11 من 12 حصة هذا الشهر — حضور ممتاز | success | `attendance.html` |
| `mr-card-homework` | ملخص الواجبات | `88%` | أنجز 7 من 8 واجبات في موعدها — تسليمات منتظمة | accent | `assignments.html` (Spec 004) |
| `mr-card-exams` | ملخص الاختبارات | `88 / 100` | اختبار شهر أبريل — Quran L3 — أداء قوي في الحفظ | info | `exam-details.html` |
| `mr-card-notes` | ملاحظات المعلمين | `3 ملاحظات` | تواصل بنّاء من الأساتذة | primary | `#mr-teacher-notes` |

### Teacher notes (`#mr-teacher-notes`) — FR-020
3 quote blocks. Each: avatar + teacher name + course chip + date + 2-4 sentence Arabic message. Content from research.md §R9.

### Reflection panels (`#mr-reflections`) — FR-021
3 panels (1 col mobile / 3 col tablet+). Content from research.md §R8.

| Panel | Tint | Bullet count | Sample bullets |
|-------|------|--------------|-----------------|
| نقاط القوّة | success-50 + success-700 text | ≥ 4 | research.md §R8 strengths |
| نقاط للتحسين | warning-50 + warning-700 text | ≥ 3 | research.md §R8 improvements |
| خطة الشهر القادم — مايو 2026 | info-50 + info-700 text | ≥ 4 | research.md §R8 next-month plan |

### Parent summary (`#mr-parent-summary`) — FR-022
4-6 sentence parent-readable Arabic paragraph. Sample text from spec.md AS-2.6:
> "عبد الرحمن قضى شهراً ممتازاً في الأكاديمية. حافظ على حضور كامل تقريباً، وأنجز معظم واجباته بجودة عالية، وحصل على 88% في الاختبار الشهري لشهر أبريل. أساتذته راضون عن مستواه وأشاروا إلى نقاط محدّدة للتطوير في شهر مايو. يمكنكم متابعة هذه النقاط معه في البيت لتعزيز تقدّمه."

### Action cluster (`#mr-actions`) — FR-023
3 `<button type="button">` visual stubs in this order:
1. Primary `تنزيل PDF` — primary-900 background, white text, download icon.
2. Secondary `طباعة` — bordered, primary-700 text, printer icon.
3. Tertiary `مشاركة مع ولي الأمر` — bordered, primary-700 text, share icon.

### Prototype notice (`#mr-prototype-notice`) — FR-023
Inline notice: `هذا نموذج تجريبي — لا يتم تنزيل ملف فعلي عند النقر.` (slate-100 background + info-icon).

## Print rule (FR-035 / research.md §R14)
`@media print` (extension to Spec 005's existing rule in `assets/css/input.css`) hides `#mr-actions`, `#mr-prototype-notice`, `#app-sidebar`, `#app-header`, `[data-sidebar-backdrop]`. Only the 6 content sections render in print.

## Grep checks (Polish phase)
- `grep -c '#mr-' pages/student/monthly-report.html` ≥ 7 (one per anchor)
- `grep -c 'أبريل 2026' pages/student/monthly-report.html` ≥ 1
- `grep -c 'RPT-2026-04-Q03-007' pages/student/monthly-report.html` ≥ 1
- `grep -c 'تنزيل PDF' pages/student/monthly-report.html` ≥ 1 (the action button)
- `grep -c 'الأستاذ أحمد بن عبد الله' pages/student/monthly-report.html` ≥ 1
- `grep -c 'الأستاذة منى سعد' pages/student/monthly-report.html` ≥ 1
- `grep -c 'الأستاذ خالد العبدلي' pages/student/monthly-report.html` ≥ 1
- `grep -c '92%' pages/student/monthly-report.html` ≥ 1 (canonical attendance)
- `grep -c '88%' pages/student/monthly-report.html` ≥ 1 (canonical homework)
- `grep -c '89 / 100' pages/student/monthly-report.html` ≥ 1 (overall numeric)
