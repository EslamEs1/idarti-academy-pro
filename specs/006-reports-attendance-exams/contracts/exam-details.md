# Contract — `pages/student/exam-details.html`

**User story**: US8 (Exam Details, P3) — see spec.md.
**Sample exam**: March 2026 monthly Quran-L2-final (95%) — research.md §R17 — the most narratively rich case.
**Active sidebar entry**: الاختبارات (children-of).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header + meta strip | `#ed-header` | h1 + meta strip |
| Result panel | `#ed-result` | score / percentage / status pill — parchment-tinted |
| Category breakdown | `#ed-categories` | 3-row diagnostic grid |
| Strengths / weaknesses | `#ed-strengths-weaknesses` | 2 side-by-side panels |
| Teacher recommendation | `#ed-recommendation` | quote block |
| Related certificate | `#ed-related-cert` | parchment-tinted panel + CTA |

## Required content

### Header (`#ed-header`) — FR-037
- h1: `اختبار شهر مارس — القرآن الكريم المستوى الثاني (الاختبار النهائي)`
- Meta strip (chips):
  - Course: `القرآن الكريم — المستوى الثاني (مكتمل)` (primary-100)
  - Teacher: avatar `أ.أ` + `الأستاذ أحمد بن عبد الله` (with primary-700 fill)
  - Date: `15 مارس 2026` (calendar icon)
  - Duration: `45 دقيقة` (clock icon)
  - Type pill: `اختبار شهري` (primary-100 + calendar-clock icon)

### Result panel (`#ed-result`) — FR-038
Parchment-tinted (cream `bg-amber-50` + thin `ring-1 ring-amber-200` echoing Spec 005 certificate aesthetic). Contains:
- Numeric score `95 / 100` in display weight (primary-900).
- Percentage `95%` in display weight + horizontal progress bar (success-500 fill, 95% width).
- Status pill `ممتاز — اجتاز الاختبار` (success-100 + star icon, success-700 text).

### Category breakdown (`#ed-categories`) — FR-039
3 rows in a labeled grid. Each row: category name + score + percentage + horizontal bar + 1-sentence diagnostic.

| # | Category | Score | % | Diagnostic |
|---|----------|-------|---|------------|
| 1 | حفظ السور | 38 / 40 | 95% | إتقان كامل لسورة الفجر، خطأ بسيط في آيتي 3 و 7 |
| 2 | تجويد | 28 / 30 | 93% | تطبيق صحيح لأحكام الميم الساكنة |
| 3 | فهم وتفسير | 29 / 30 | 97% | فهم عميق للمعاني العامة للسور المختارة |

Visual layout mirrors Spec 004's `submission-feedback.html` four-axis Quran evaluation grid.

### Strengths / weaknesses (`#ed-strengths-weaknesses`) — FR-040
2 side-by-side panels (1 col mobile / 2 col tablet+).

**نقاط القوّة** (success-tinted, ≥ 3 bullets, check-circle icon):
1. إتقان حفظ سورة الفجر بصوت واضح وثابت
2. تطبيق صحيح لأحكام الميم الساكنة (الإخفاء، الإدغام، الإظهار)
3. فهم عميق لتفسير الآيات وربطها بالسياق

**نقاط للتحسين** (warning-tinted, ≥ 2 bullets, alert-circle icon):
1. التجويد في الآيات الطويلة — يحتاج إلى تنفّس أطول وحفاظ على الطلاقة
2. تنويع الإيقاع في القراءة الجهرية — تجنّب الرتابة الصوتية

### Teacher recommendation (`#ed-recommendation`) — FR-041
Quote block (info-50 background, primary-700 author chip).

> "أداء عبد الرحمن في هذا الاختبار النهائي كان ممتازاً، وقد أثبت إتقانه لمتطلبات المستوى الثاني بدرجة 95%. سأعتمد له شهادة إتمام المستوى الثاني، وأنصحه بالانتقال للمستوى الثالث مع التركيز على التجويد في الآيات الطويلة. سنخصّص جلسة فردية في شهر مايو لتطوير هذا الجانب. واصل تقدّمك الرائع يا عبد الرحمن!"
>
> — الأستاذ أحمد بن عبد الله — 15 مارس 2026

### Related certificate (`#ed-related-cert`) — FR-042
Parchment-tinted panel (matches the result panel's amber tint).
- Cert name: `شهادة إتمام المستوى الثاني — أساسيات أحكام النون الساكنة`
- Issue date: `1 مارس 2026`
- Teacher: `الأستاذ أحمد بن عبد الله`
- Primary CTA: `عرض الشهادة` → `certificate-preview.html`

The "no certificate" alternative variant is documented as an HTML comment block:
```html
<!-- إذا لم يصدر للاختبار شهادة منفصلة:
<div class="bg-slate-50 ...">
  <p class="text-sm text-text-muted">هذا الاختبار جزء من تقييمك الشهري ولا يصدر له شهادة منفصلة. الشهادات تُمنح عند إتمام المستوى.</p>
</div>
-->
```

The "exam not yet graded" + "failed exam" alternative variants are also documented as HTML comments.

## Forbidden content (SC-016)
- NO Download / Print / Share / Save / WhatsApp clickable elements (the certificate-preview link is allowed because it leads OUT to Spec 005's preview page where Download lives).

## Grep checks (Polish phase)
- `grep -c '#ed-' pages/student/exam-details.html` ≥ 6 (one per anchor)
- `grep -c 'certificate-preview.html' pages/student/exam-details.html` ≥ 1
- `grep -c '95 / 100' pages/student/exam-details.html` ≥ 1
- `grep -c '95%' pages/student/exam-details.html` ≥ 2 (result percentage + category 1 percentage)
- `grep -c 'اختبار شهر مارس' pages/student/exam-details.html` ≥ 1
- `grep -c 'الأستاذ أحمد بن عبد الله' pages/student/exam-details.html` ≥ 2 (meta strip + recommendation byline)
