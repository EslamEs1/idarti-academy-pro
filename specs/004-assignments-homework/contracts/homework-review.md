# Contract — Teacher Homework Review Page

`pages/teacher/homework-review.html` is the teacher's primary daily surface for the homework feature. It mirrors the student's `assignments.html` index in shape but renders the teacher's grading queue instead of the student's assignments. The featured first/second row is the persona's pending submission (`s-abdulrahman-saad` / `تلاوة سورة الضحى`) so the cross-page narrative reconciles with the student-side index (FR-053).

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <!-- Block 1: Header -->
    <section id="hr-header">
      <h1>مراجعة الواجبات</h1>
      <p>راجع تسليمات طلابك وقدّم ملاحظات تربوية واضحة.</p>
    </section>

    <!-- Block 2: Summary cards (4) -->
    <section id="hr-summary" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 4 cards per E9 teacher-side -->
    </section>

    <!-- Block 3: Filters -->
    <section id="hr-filters" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 space-y-4">
      <div class="relative"> … search input … </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3"> … 4 dropdowns … </div>
    </section>

    <!-- Block 4: Submissions queue -->
    <section id="hr-queue">
      <h2 class="text-base font-semibold mb-3">قائمة التسليمات (8)</h2>
      <!-- Desktop table; mobile cards -->
    </section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: **Teacher sidebar** hard-embedded verbatim from `pages/teacher/dashboard.html` (do NOT abbreviate or strip entries). The full enumeration in execution order is exactly 11 entries:

  1. لوحة التحكم → `dashboard.html`
  2. حصصي → `my-classes.html`
  3. الحصص المباشرة → `live-sessions.html`
  4. **مراجعة الواجبات → `homework-review.html`** (`is-active` + `aria-current="page"` on this page)
  5. تقارير الطلاب → `student-reports.html`
  6. الحضور → `attendance.html`
  7. الأرباح → `earnings.html`
  8. السلف → `advances.html`
  9. التقويم → `calendar.html`
  10. الرسائل → `messages.html`
  11. الملف الشخصي → `profile.html`

  All 11 `<a>` elements MUST appear in the rendered DOM with the same Tailwind classes as `pages/teacher/dashboard.html` lines 33–125. The 10 inactive entries point to pages that do not yet exist (404 destinations are acceptable per the constitution's "planned future page" pattern); only `homework-review.html` itself and `dashboard.html` are real destinations during this feature. Do NOT rewrite hrefs to `#` and do NOT remove entries.
- Header: same teacher-shell header as the teacher dashboard. `<title>` = `مراجعة الواجبات — لوحة المعلم — منصة إدارتي`; h1 = `مراجعة الواجبات`; teacher contextual greeting "الأستاذ أحمد العمري".

## Summary cards (`#hr-summary`)

Four cards in a responsive grid (1 / 2 / 4 cols). Each card uses the same pattern as the student-side index. Per E9 teacher-side:

| Label | Count | Tint | Icon |
|---|---|---|---|
| بانتظار المراجعة | 4 | info | inbox |
| تم القبول اليوم | 2 | success | check-circle |
| تحتاج تعديل | 1 | warning | alert-triangle |
| تسليمات متأخرة | 1 | danger | alert-octagon |

Counts derive from the R9 queue inventory.

## Filters block (`#hr-filters`)

### Search input

```html
<input type="text" name="hr-search" placeholder="ابحث باسم الطالب أو الواجب..." class="…" />
```

### 4 secondary filters (per E10 teacher-side)

Each as a labeled `<select>`:

- الدورة — كل الدورات / القرآن الكريم — المستوى الثالث / اللغة العربية — التعبير / الدراسات الإسلامية — السيرة / الرياضيات — الأساسيات
- الطالب — كل الطلاب / 8 student names from E11
- الحالة — كل الحالات / بانتظار المراجعة / مقبول / مقبول مع ملاحظات / يحتاج تعديل / مرفوض / تأجيل المراجعة / متأخر
- التاريخ — كل التواريخ / اليوم / آخر 24 ساعة / آخر 7 أيام / مخصص...

(Note the الحالة select includes the **5 teacher-side options** since this is a teacher's view, not a student's.)

## Submissions queue (`#hr-queue`)

### Desktop table (md and up)

```html
<table class="w-full text-sm border-collapse">
  <thead class="bg-slate-50 text-text-muted">
    <tr>
      <th>الطالب</th>
      <th>الواجب</th>
      <th>الدورة</th>
      <th>وقت التسليم</th>
      <th>الحالة</th>
      <th>المحاولة</th>
      <th>إجراء</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100">
    <!-- 8 rows per E4/E11 sample inventory (research.md §R9) -->
  </tbody>
</table>
```

### Per-row content (the 8 rows from R9)

**Row 1 (the persona — featured)**:

```html
<tr class="bg-info-50/30">
  <td>
    <div class="flex items-center gap-3">
      <div class="…avatar: ع.س…">ع.س</div>
      <div>
        <p class="text-sm font-semibold">عبدالرحمن السعد</p>
        <p class="text-xs text-text-muted">المستوى الثالث</p>
      </div>
    </div>
  </td>
  <td><p class="text-sm font-medium">تلاوة سورة الضحى مع تطبيق أحكام التجويد</p></td>
  <td><span class="text-xs">القرآن الكريم — المستوى الثالث</span></td>
  <td>
    <p class="text-sm">اليوم 09:14 ص</p>
    <p class="text-xs text-text-muted">قبل ساعتين</p>
  </td>
  <td><span class="…info pill…">بانتظار المراجعة</span></td>
  <td><span class="text-xs">المحاولة 1 من 3</span></td>
  <td>
    <a href="homework-submission-details.html" class="…btn-sm-primary…">مراجعة</a>
  </td>
</tr>
```

The other 7 rows follow the same pattern with R9 data. Row 3 (عمر القحطاني — تلاوة سورة الفلق) uses "المحاولة 2 من 3 (إعادة تسليم)" to demonstrate the resubmission attempts variant. Row 5 and Row 6 (status مقبول) include a small "تم التقييم اليوم" caption next to their submitted-at column.

### Mobile cards (< md)

Each row collapses to a stacked card preserving every cell. Same pattern as the student-side `assignments.html` mobile cards but with student-name as the primary identifier instead of assignment title.

## Pagination caption

Below the table, a static "1 من 1 — صفحة 1 من 1 (8 من 8 تسليمات)" caption (per Assumptions: pagination is visual-only and the queue fits on a single page).

## Cross-page links

**Inbound**:

- `pages/teacher/dashboard.html` line 63 (sidebar) and line 278 (the "فتح قائمة التصحيح" link)

**Outbound**:

- Per-row "مراجعة" → `homework-submission-details.html`
- Sidebar entries → existing teacher pages (only Dashboard exists)

## Validation hooks

- **FR-050**: h1 = "مراجعة الواجبات" + subtitle present.
- **FR-051**: Exactly 4 summary cards with counts (4 / 2 / 1 / 1).
- **FR-052**: 4 `<select>` elements + 1 search `<input>` under `#hr-filters`.
- **FR-053**: 8 row entries inside `#hr-queue` (desktop `<tr>` + mobile `<article>` mirrors). Status mix: ≥ 4 بانتظار المراجعة, ≥ 2 مقبول, ≥ 1 يحتاج تعديل, ≥ 1 متأخر.
- **FR-054**: Each row contains 7 logical cells (student / assignment / course / submitted-at / status / attempts / action).
- **FR-055**: Queue covers ≥ 3 distinct courses and ≥ 6 distinct students (R9 covers 4 courses and 8 students).
- **FR-056**: At md+ the table is visible and cards are hidden; below md the inverse.
- **SC-005**: A 30-second visual scan answers the 4 questions in spec.md SC-005.
