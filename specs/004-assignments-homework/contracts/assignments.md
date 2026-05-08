# Contract — Student Assignments Index Page

`pages/student/assignments.html` is the canonical homework surface for the student. Per FR-010..FR-017, every other student-facing surface (dashboard, weekly plan, learning journey, my-courses, course-details, live-session-details, browse-courses, notifications, live-sessions) eventually links here.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <!-- Block 1: Header -->
    <section id="ai-header">
      <h1>واجباتي</h1>
      <p>تابع كل واجباتك في مكان واحد — مطلوب، مسلَّم، تحت المراجعة.</p>
    </section>

    <!-- Block 2: Summary cards (5) -->
    <section id="ai-summary" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- 5 cards per E9 student-side -->
    </section>

    <!-- Block 3: Search + status chip filters + secondary filters -->
    <section id="ai-filters" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 space-y-4">
      <div class="relative"> … search input … </div>
      <div role="tablist" aria-label="تصفية حسب الحالة" class="flex flex-wrap gap-2"> … 9 chips … </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3"> … 4 dropdowns … </div>
    </section>

    <!-- Block 4: Assignment list -->
    <section id="ai-list">
      <h2 class="text-base font-semibold mb-3">قائمة الواجبات (9)</h2>
      <!-- Desktop: <table>; Mobile (<md): stacked cards -->
    </section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: 15 entries from Spec 002 hard-embedded; **active entry = "الواجبات"** (`is-active` + `aria-current="page"`).
- Header: same as Spec 002 (bell-as-anchor); `<title>` = `واجباتي — منصة إدارتي`; h1 = `واجباتي`; subtitle = `تابع كل واجباتك في مكان واحد — مطلوب، مسلَّم، تحت المراجعة.`

## Summary cards block (`#ai-summary`)

Five cards in a responsive grid (1 col mobile / 2 col tablet / 5 col desktop). Each card:

```html
<div class="bg-{tint}-50 border border-{tint}-200 rounded-2xl p-4 md:p-5 flex items-start gap-3">
  <div class="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-{tint}-100 text-{tint}-700">
    <svg>…lucide icon (E9 mapping)…</svg>
  </div>
  <div class="min-w-0">
    <p class="text-2xl font-bold text-{tint}-700 leading-none">{count}</p>
    <p class="text-sm text-text-base font-medium mt-1">{labelAr}</p>
  </div>
</div>
```

Per E9 student-side: واجبات مطلوبة (3) accent / تم التسليم (4) info / بانتظار المراجعة (1) info / تحتاج تعديل (1) warning / متأخرة (1) danger.

## Filters block (`#ai-filters`)

### Search input

```html
<div class="relative">
  <span class="absolute inset-y-0 inline-end-3 flex items-center pointer-events-none text-text-muted">
    <svg>…search icon…</svg>
  </span>
  <input type="text" name="ai-search" placeholder="ابحث عن واجب أو دورة..." class="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" />
</div>
```

### Status filter chips (9 chips)

Per E7 student-side. Render as a flex-wrap group using `role="tablist" aria-label="تصفية حسب الحالة"` (purely for ARIA semantics — no JS handler attaches to it; chips are visual-only). The "الكل" chip carries `aria-selected="true"` + `is-active` styling. Each chip:

```html
<button type="button" role="tab" aria-selected="false"
        class="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors
               border-{tint}-200 bg-white text-{tint}-700 hover:bg-{tint}-50">
  <svg class="h-3.5 w-3.5" aria-hidden="true">…icon…</svg>
  {labelAr}
</button>
```

The 9 chips: الكل / جديد / مطلوب التسليم / تم التسليم / قيد المراجعة / مقبول / يحتاج تعديل / متأخر / مرفوض.

### Secondary filter dropdowns (4 selects)

Per E10 student-side. Rendered as `<select>` elements with hardcoded `<option>` lists. Each select has a visible label above it.

## Assignment list (`#ai-list`)

### Desktop table (md and up)

```html
<table class="w-full text-sm border-collapse">
  <thead class="bg-slate-50 text-text-muted">
    <tr>
      <th class="text-start font-semibold px-3 py-3">الواجب</th>
      <th class="text-start font-semibold px-3 py-3">الدورة</th>
      <th class="text-start font-semibold px-3 py-3">المعلم</th>
      <th class="text-start font-semibold px-3 py-3">تاريخ التسليم</th>
      <th class="text-start font-semibold px-3 py-3">الحالة</th>
      <th class="text-start font-semibold px-3 py-3">الدرجة</th>
      <th class="text-start font-semibold px-3 py-3">إجراء</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100">
    <!-- 9 rows per E1 sample inventory (research.md §R8) -->
  </tbody>
</table>
```

### Per-row data (the 9 rows from R8)

Each row contains the 7 columns. The CTA cluster column embeds 1-2 inline links per the row's status:

| Status | Primary CTA | Secondary CTA |
|---|---|---|
| جديد | عرض التفاصيل | تسليم |
| مطلوب التسليم | عرض التفاصيل | تسليم |
| تم التسليم / قيد المراجعة | عرض التفاصيل | (none) |
| مقبول | عرض التفاصيل | عرض الملاحظات |
| يحتاج تعديل | عرض التفاصيل | إعادة التسليم |
| متأخر | عرض التفاصيل | تسليم |
| مرفوض | عرض التفاصيل | عرض الملاحظات |

CTA destinations:

- "عرض التفاصيل" → `assignment-details.html`
- "تسليم" / "إعادة التسليم" → `submit-assignment.html`
- "عرض الملاحظات" → `submission-feedback.html`

### Mobile cards (< md)

Each row collapses to a stacked card preserving every cell. Title at top, course/teacher meta strip below, due date with relative caption, status pill + grade in a row, CTA cluster at the bottom edge.

```html
<article class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 md:hidden">
  <h3 class="text-sm font-semibold leading-tight">{titleAr}</h3>
  <div class="flex flex-wrap items-center gap-2 text-xs text-text-muted">
    <span class="inline-flex items-center gap-1"><svg>…book…</svg>{courseRef.titleAr}</span>
    <span aria-hidden="true">·</span>
    <span class="inline-flex items-center gap-1"><svg>…user…</svg>{teacherRef.nameAr}</span>
  </div>
  <div class="flex items-center justify-between text-xs">
    <div class="flex flex-col">
      <span class="text-text-muted">{relativeDueCaptionAr}</span>
      <span class="font-medium">{dueDateAr}</span>
    </div>
    <span class="…status pill…">{currentStatusLabelAr}</span>
  </div>
  <div class="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
    <span class="text-text-muted">الدرجة:</span>
    <span class="font-semibold">{currentGradeAr}</span>
  </div>
  <div class="flex items-center gap-3 pt-2"> … 1-2 CTAs … </div>
</article>
```

The desktop table and mobile card list both render the same 9 rows — only the layout differs (use `hidden md:table`/`md:hidden` toggling). Same DOM source, no JS.

## Cross-page links

**Inbound** (verified — no edits needed):

- `dashboard.html` line 71 (sidebar) and line 486, 501, 516, 531 (homework block)
- `weekly-plan.html` lines 71, 361, 373, 385
- `learning-journey.html` line 71
- `notifications.html` lines 76, 318, 439
- `live-sessions.html` line 57
- `live-session-details.html` lines 49, 308
- `course-details.html` line 54
- `session-checkout-preview.html` line 49
- `my-courses.html` line 73
- `browse-courses.html` line 77

**Outbound**:

- Per-row "عرض التفاصيل" → `assignment-details.html`
- Per-row "تسليم" / "إعادة التسليم" → `submit-assignment.html`
- Per-row "عرض الملاحظات" → `submission-feedback.html`

## Validation hooks

- **FR-010**: h1 = "واجباتي" + subtitle present.
- **FR-011**: Exactly 5 summary cards with the locked counts (3 / 4 / 1 / 1 / 1) — `grep -c '<div class=\"bg-' #ai-summary` should return 5.
- **FR-012**: Exactly 9 status filter chips inside `[role="tablist"]` under `#ai-filters` — `grep -c '<button type=\"button\" role=\"tab\"' #ai-filters` should return 9.
- **FR-013**: 4 `<select>` elements + 1 search `<input>` under `#ai-filters`.
- **FR-014**: 9 row entries inside `#ai-list` (desktop `<tr>` + mobile `<article>` — same content, mirrored markup).
- **FR-015**: Each row contains 7 logical cells (title / course / teacher / due / status / grade / CTAs).
- **FR-017**: At lg breakpoint the table is visible and the cards are hidden; below md the table is hidden and cards are visible.
- **SC-001**: A 30-second visual scan answers the four questions in spec.md SC-001.
