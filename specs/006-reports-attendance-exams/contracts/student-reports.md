# Contract — `pages/teacher/student-reports.html`

**User story**: US5 (Teacher Authors a Student Report, P1) — see spec.md.
**Teacher persona**: الأستاذ أحمد بن عبد الله (Quran instructor, primary teacher).
**Subject student**: عبد الرحمن مؤمن — أبريل 2026 (the same report the student reads on `monthly-report.html` and the parent reads on `child-reports.html`).
**Active sidebar entry**: تقارير الطلاب (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#sr-header` | h1 + breadcrumb |
| Student-context strip (read-only) | `#sr-context` | avatar + name + level + parent + assignments + months |
| Evaluation panels | `#sr-evaluations` | 3 panels (attendance / homework / exams) |
| General notes | `#sr-general-notes` | textarea ≥ 4 rows |
| Recommendation panel | `#sr-recommendations` | next-month plan + parent action |
| Action cluster | `#sr-actions` | 3 buttons |
| Prototype notice | `#sr-prototype-notice` | 1-line stub clarifier |

## Required content

### Header (`#sr-header`) — FR-056
- h1: `تقرير الطالب — أبريل 2026`
- Breadcrumb: `مراجعة الواجبات / تقارير الطلاب / تقرير الطالب` (3 segments; first 2 are `<a>` linking back).

### Student-context strip (`#sr-context`) — FR-056
Read-only chrome (slate-50 background + slate-200 border, distinct from the editable form below). Contains:
- Avatar `ع.م` (primary-700 fill, 48-64 px)
- Name: `عبد الرحمن مؤمن`
- Level chip: `المستوى الثالث — مسار القرآن الكريم`
- Parent: `ولي أمر عبد الرحمن`
- Assignments accepted: `7 / 8`
- Months reported: `هذا التقرير الخامس — منذ ديسمبر 2025`

### Evaluation panels (`#sr-evaluations`) — FR-057
3 panels in a 1-col / 2-col layout (md:grid-cols-2). Each panel has a `<label for="…">` paired with each `<input>` / `<select>` / `<textarea>` `id`.

#### Panel 1 — `#sr-eval-attendance` (تقييم الحضور)
- `<label for="sr-att-num">الحضور (عدد الحصص الحاضرة من المجموع)</label>` + `<input id="sr-att-num" type="text" value="11 / 12">`
- `<label for="sr-att-status">التقدير</label>` + `<select id="sr-att-status">` with options {ممتاز (selected), جيد جداً, جيد, يحتاج تحسين}
- `<label for="sr-att-comment">ملاحظة المعلم</label>` + `<textarea id="sr-att-comment">حضور كامل تقريباً مع غياب يوم واحد بعذر.</textarea>`

#### Panel 2 — `#sr-eval-homework` (تقييم الواجبات)
- `<label for="sr-hw-num">الواجبات (المنجزة من المطلوبة)</label>` + `<input id="sr-hw-num" type="text" value="7 / 8">`
- `<label for="sr-hw-status">التقدير</label>` + `<select id="sr-hw-status">` (selected: ممتاز OR جيد جداً)
- `<label for="sr-hw-comment">ملاحظة المعلم</label>` + `<textarea id="sr-hw-comment">تسليمات منتظمة وجودة عالية في الكتابة الإنشائية.</textarea>`

#### Panel 3 — `#sr-eval-exams` (تقييم الاختبارات)
- `<label for="sr-ex-num">الدرجة (من 100)</label>` + `<input id="sr-ex-num" type="text" value="88 / 100">`
- `<label for="sr-ex-status">التقدير</label>` + `<select id="sr-ex-status">` (selected: ممتاز)
- `<label for="sr-ex-comment">ملاحظة المعلم</label>` + `<textarea id="sr-ex-comment">أداء ممتاز في حفظ سورة الفجر، يحتاج إلى مراجعة أحكام التجويد للآيات الطويلة.</textarea>`

### General notes (`#sr-general-notes`) — FR-058
- `<label for="sr-notes">ملاحظات عامة</label>`
- `<textarea id="sr-notes" rows="4">` pre-filled with research.md §R9 quote 1 (الأستاذ أحمد بن عبد الله's primary quote — BYTE-IDENTICAL to what appears on `monthly-report.html` and `child-reports.html`):
  > "أداء عبد الرحمن في الحفظ هذا الشهر ممتاز، وقد أتقن أحكام الميم الساكنة. يحتاج إلى تركيز إضافي على التجويد في الآيات الطويلة."

  (Plus optional 1 additional sentence to fill 4 sentences total: "نتطلّع لرؤية تقدّمه في المستوى الرابع.")

### Recommendation panel (`#sr-recommendations`) — FR-059
Two stacked editable lists.

**خطة الشهر القادم (مايو 2026)** — 4 bullet `<input>` rows:
- `<label for="sr-plan-1">البند 1</label>` + `<input id="sr-plan-1" value="إكمال المستوى الثالث من القرآن وبدء التحضير للمستوى الرابع">`
- `<label for="sr-plan-2">البند 2</label>` + `<input id="sr-plan-2" value="مراجعة قواعد الإملاء الأسبوعية">`
- `<label for="sr-plan-3">البند 3</label>` + `<input id="sr-plan-3" value="جلسة فردية مع الأستاذ أحمد لتجويد الآيات الطويلة">`
- `<label for="sr-plan-4">البند 4</label>` + `<input id="sr-plan-4" value="اختبار شهر مايو في 28 مايو 2026">`
- `+ إضافة بند` — `<button type="button">` visual stub (does NOT add a row at runtime)

**الإجراء المقترح لولي الأمر** — single multi-line textarea:
- `<label for="sr-parent-action">الإجراء المقترح</label>`
- `<textarea id="sr-parent-action" rows="3">` pre-filled with the parent-action paragraph (BYTE-IDENTICAL to `child-reports.html` `#cr-action-panel`):
  > "ننصح بمتابعة جلسة المراجعة الأسبوعية مع عبد الرحمن في البيت — 15 دقيقة فقط، أيام السبت أو الأحد، لمراجعة أحكام التجويد للآيات الطويلة. هذا سيدعم خطة الشهر القادم."

### Action cluster (`#sr-actions`) — FR-060
3 buttons:
1. Primary `حفظ التقرير` (`<button type="button">`) — primary-900 background, white text, save icon.
2. Secondary `حفظ كمسودة` (`<button type="button">`) — bordered slate-200, file-text icon.
3. Tertiary `إلغاء` — `<a href="homework-review.html">` (REAL navigation back to teacher's queue).

### Prototype notice (`#sr-prototype-notice`) — FR-060
Inline notice: `هذا نموذج تجريبي — لا يتم حفظ التقرير في النظام عند النقر.` (slate-100 background + info icon).

## Form discipline (FR-008 / SC-008)
Every form input has a paired visible `<label>` with `for` attribute matching the input's `id`. The grep audit (Spec 005's T044 pattern) MUST return zero unmatched IDs:
```bash
grep -oE '(input|textarea|select)[^>]*\bid="sr-[^"]+"' pages/teacher/student-reports.html | grep -oE 'id="sr-[^"]+"' | sort -u > /tmp/ids
grep -oE 'for="sr-[^"]+"' pages/teacher/student-reports.html | sort -u > /tmp/fors
comm -23 <(sed 's/id=/for=/' /tmp/ids) /tmp/fors  # MUST be empty
```

## Grep checks (Polish phase)
- `grep -c '#sr-' pages/teacher/student-reports.html` ≥ 7
- `grep -c 'id="sr-[^"]*"' pages/teacher/student-reports.html` ≥ 11 (3 evals × 3 fields = 9; general notes; 4 plan inputs; 1 parent-action textarea — minimum count 14, but allow ≥ 11 for safety)
- `grep -c 'for="sr-[^"]*"' pages/teacher/student-reports.html` MUST equal the count of `id="sr-[^"]*"` matches on inputs/textareas/selects (every input has its label).
- `grep -c '11 / 12' pages/teacher/student-reports.html` ≥ 1 (canonical attendance)
- `grep -c '7 / 8' pages/teacher/student-reports.html` ≥ 1 (canonical homework)
- `grep -c '88 / 100' pages/teacher/student-reports.html` ≥ 1 (canonical exam score)
- `grep -c 'أداء عبد الرحمن في الحفظ هذا الشهر ممتاز' pages/teacher/student-reports.html` ≥ 1 (SC-018 byte-identity check)
- `grep -c 'homework-review.html' pages/teacher/student-reports.html` ≥ 1 (cancel link)
- `grep -c 'حفظ التقرير' pages/teacher/student-reports.html` ≥ 1
