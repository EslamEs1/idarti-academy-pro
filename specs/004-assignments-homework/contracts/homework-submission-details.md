# Contract — Teacher Submission Details Page

`pages/teacher/homework-submission-details.html` is the teacher's only authoring surface in the homework loop — every grade the student sees originates here. The featured submission is **the persona's pending "تلاوة سورة الضحى"** (E4.2). The grading form is pre-filled with the teacher's draft (per R16 / E8.1) so the page demonstrates the populated state.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <!-- Block 1: Header + queue navigation -->
    <section id="hsd-header" class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <nav aria-label="breadcrumb">
          <a href="homework-review.html">مراجعة الواجبات</a> /
          <span aria-current="page">{titleAr}</span>
        </nav>
        <h1>مراجعة تسليم: {titleAr}</h1>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <a href="homework-review.html#prev-row" class="…inline-link…">← السابق</a>
        <a href="homework-review.html#next-row" class="…inline-link…">التالي: ليلى المنصور — حلّ تمارين النحو →</a>
      </div>
    </section>

    <!-- Block 2: Two-column layout (5/7 split at lg+) -->
    <section id="hsd-body" class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- Left context column (5/12) -->
      <div class="lg:col-span-5 space-y-5">
        <article id="hsd-student-card"> … student info … </article>
        <article id="hsd-assignment-card"> … assignment info … </article>
        <article id="hsd-files"> … submitted files … </article>
        <article id="hsd-student-note"> … student note quote … </article>
      </div>

      <!-- Right grading form column (7/12) -->
      <div class="lg:col-span-7 space-y-5">
        <article id="hsd-overall"> … overall evaluation panel … </article>
        <article id="hsd-status"> … status selector + resubmit checkbox … </article>
        <article id="hsd-quran"> … Quran evaluation form … </article>
        <article id="hsd-actions"> … save / draft / cancel + prototype notice … </article>
      </div>

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

  Same enumeration rule as `homework-review.html`: all 11 `<a>` elements present with the same Tailwind classes as the teacher dashboard. The active entry is `مراجعة الواجبات` because this is a drill-down from the homework-review queue.
- Header: same teacher-shell header. `<title>` = `مراجعة تسليم: {titleAr} — لوحة المعلم — منصة إدارتي`; teacher contextual greeting "الأستاذ أحمد العمري".

## Left column — context

### `#hsd-student-card` — student info (E11 persona)

```html
<article class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <header class="flex items-center gap-4 mb-4">
    <div class="…avatar large: ع.س…">ع.س</div>
    <div>
      <h2 class="text-base font-semibold">عبدالرحمن السعد</h2>
      <p class="text-xs text-text-muted">المستوى الثالث · القرآن الكريم</p>
    </div>
  </header>
  <dl class="grid grid-cols-2 gap-3 text-sm">
    <div>
      <dt class="text-xs text-text-muted">ولي الأمر</dt>
      <dd class="font-medium">عبدالله السعد</dd>
    </div>
    <div>
      <dt class="text-xs text-text-muted">الواجبات المنجزة</dt>
      <dd class="font-semibold text-success-700">18 واجباً</dd>
    </div>
    <div>
      <dt class="text-xs text-text-muted">نسبة الالتزام</dt>
      <dd class="font-medium">85%</dd>
    </div>
    <div>
      <dt class="text-xs text-text-muted">آخر تقييم</dt>
      <dd class="font-medium">65 / 100</dd>
    </div>
  </dl>
</article>
```

### `#hsd-assignment-card` — assignment info

```html
<article class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <h2 class="text-base font-semibold mb-3">معلومات الواجب</h2>
  <dl class="space-y-3 text-sm">
    <div>
      <dt class="text-xs text-text-muted">العنوان</dt>
      <dd class="font-medium">تلاوة سورة الضحى مع تطبيق أحكام التجويد</dd>
    </div>
    <div>
      <dt class="text-xs text-text-muted">الدورة</dt>
      <dd>القرآن الكريم — المستوى الثالث</dd>
    </div>
    <div>
      <dt class="text-xs text-text-muted">تاريخ الإنشاء</dt>
      <dd>5 مايو 2026</dd>
    </div>
    <div>
      <dt class="text-xs text-text-muted">تاريخ التسليم</dt>
      <dd>9 مايو 2026</dd>
    </div>
    <div>
      <dt class="text-xs text-text-muted">المحاولة</dt>
      <dd>1 من 3</dd>
    </div>
  </dl>
</article>
```

### `#hsd-files` — submitted files

```html
<article class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <h2 class="text-base font-semibold mb-3">الملفات المسلَّمة</h2>

  <!-- Primary audio file -->
  <div class="bg-violet-50 border border-violet-200 rounded-xl p-4 flex items-center gap-3 mb-3">
    <button type="button" aria-label="تشغيل التسجيل" class="…play button…">
      <svg class="h-5 w-5">…play…</svg>
    </button>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium truncate">تسجيل-سورة-الضحى-المحاولة-1.mp3</p>
      <p class="text-xs text-text-muted mt-0.5">MP3 — 1.1 MB — مدة 01:18</p>
    </div>
    <span class="…success pill: تم الرفع…">الملف الأساسي</span>
  </div>

  <!-- Supplementary file -->
  <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
    <div class="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700">
      <svg>…image…</svg>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium truncate">صورة-من-المصحف-سورة-الضحى.png</p>
      <p class="text-xs text-text-muted mt-0.5">PNG — 320 KB — أبعاد 1080×1920</p>
    </div>
    <a href="#planned" class="text-xs text-accent-700 hover:underline">عرض</a>
  </div>
</article>
```

### `#hsd-student-note` — student note quote

```html
<article class="bg-primary-50 border-r-4 border-primary-500 rounded-2xl p-5">
  <header class="flex items-center gap-2 mb-2">
    <svg class="h-4 w-4 text-primary-700">…quote…</svg>
    <h2 class="text-sm font-semibold">ملاحظة الطالب</h2>
  </header>
  <blockquote class="text-sm text-text-base leading-7 ps-3 border-s border-primary-200">
    راجعت الآيات قبل التسجيل، وحاولت تطبيق الإخفاء الشفوي قدر استطاعتي. أتمنى ملاحظاتكم على المخرج الصحيح للحرف.
  </blockquote>
</article>
```

## Right column — grading form

### `#hsd-overall` — overall evaluation panel

```html
<article class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <h2 class="text-base md:text-lg font-semibold mb-4">التقييم العام</h2>

  <!-- Numeric grade input + live-preview bar -->
  <div class="mb-5">
    <label for="hsd-grade" class="block text-sm font-medium mb-2">الدرجة (من 100)</label>
    <div class="flex items-center gap-3">
      <input type="number" id="hsd-grade" min="0" max="100" value="65" class="w-28 …" />
      <div class="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div class="h-full bg-warning-500" style="inline-size: 65%"></div>
      </div>
    </div>
  </div>

  <!-- Independence caption (per R4) -->
  <p class="text-xs text-text-muted leading-7 mb-5 italic bg-slate-50 rounded-lg p-3">
    المحاور القرآنية أدناه تفصيلية لمهارات الطالب في كل محور. التقييم العام أعلاه تقدير شامل يشمل جودة التسجيل، الالتزام، وسلوكيات الأدب القرآني — لا يُشترط أن يكون مساوياً لمتوسط المحاور.
  </p>

  <!-- Written feedback -->
  <div class="mb-5">
    <label for="hsd-feedback" class="block text-sm font-medium mb-2">ملاحظة المعلم</label>
    <textarea id="hsd-feedback" rows="6" class="…">أداؤك في هذه المحاولة جيد، عبدالرحمن، خاصة في الإظهار الشفوي عند ملاقاتك للحروف الخمسة في الآية الأولى. لكنّ تركيزك على الإخفاء الشفوي يحتاج تحسيناً ملحوظاً، خصوصاً في الآية الثالثة عند 'لِمَنْ آمَنَ'. كذلك في الآية السابعة، كانت الغنّة قصيرة جداً. أنصحك بالاستماع إلى تسجيل الشيخ المنشاوي قبل المحاولة الثانية والتركيز على التطبيق الأبطأ.</textarea>
  </div>

  <!-- Strengths list -->
  <div class="mb-5">
    <label class="block text-sm font-medium mb-2">نقاط القوّة</label>
    <ul id="hsd-strengths" class="space-y-2"> … 4 input rows … </ul>
    <button type="button" class="text-xs text-accent-700 hover:underline mt-2">+ إضافة نقطة</button>
  </div>

  <!-- Improvements list -->
  <div>
    <label class="block text-sm font-medium mb-2">نقاط للتحسين</label>
    <ul id="hsd-improvements" class="space-y-2"> … 3 input rows … </ul>
    <button type="button" class="text-xs text-accent-700 hover:underline mt-2">+ إضافة نقطة</button>
  </div>
</article>
```

Each strength/improvement row is `<li class="flex items-center gap-2"><input type="text" value="…" class="…" /><button type="button" aria-label="حذف"><svg>…x…</svg></button></li>`.

### `#hsd-status` — status selector + resubmit checkbox

```html
<article class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <h2 class="text-base md:text-lg font-semibold mb-4">حالة التسليم</h2>

  <!-- 5 radio cards -->
  <div class="space-y-3">
    <label class="…radio-card…"> <input type="radio" name="hsd-status" value="accepted" /> مقبول </label>
    <label class="…radio-card…"> <input type="radio" name="hsd-status" value="accepted-with-notes" /> مقبول مع ملاحظات </label>
    <label class="…radio-card …active…"> <input type="radio" name="hsd-status" value="needs-revision" checked /> يحتاج تعديل </label>
    <label class="…radio-card…"> <input type="radio" name="hsd-status" value="rejected" /> مرفوض </label>
    <label class="…radio-card…"> <input type="radio" name="hsd-status" value="deferred" /> تأجيل المراجعة </label>
  </div>

  <!-- Helper caption (per R5 / FR-063) -->
  <p class="text-xs text-text-muted leading-7 mt-4 bg-slate-50 rounded-lg p-3">
    <strong>ملاحظة:</strong> "مقبول مع ملاحظات" تظهر للطالب كـ"مقبول" مع تفاصيل في لوحة الملاحظات. "تأجيل المراجعة" تُبقي حالة التسليم لدى الطالب "قيد المراجعة" حتى تتخذ قراراً نهائياً.
  </p>

  <!-- Request resubmission checkbox -->
  <div class="mt-5 pt-5 border-t border-slate-100">
    <label class="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" id="hsd-request-resubmit" checked class="mt-1" />
      <div>
        <p class="text-sm font-medium">طلب إعادة التسليم</p>
        <p class="text-xs text-text-muted mt-0.5">سيتلقى الطالب إشعاراً ومحاولة جديدة. يُفعَّل تلقائياً عند اختيار "يحتاج تعديل".</p>
      </div>
    </label>
  </div>
</article>
```

Each radio-card:

```html
<label class="flex items-start gap-3 p-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 cursor-pointer transition-colors data-[active=true]:border-warning-500 data-[active=true]:bg-warning-50">
  <input type="radio" name="hsd-status" value="…" class="mt-1" />
  <div>
    <p class="text-sm font-medium">{labelAr}</p>
  </div>
</label>
```

The `يحتاج تعديل` card carries `data-active="true"` to indicate the default selection visually.

### `#hsd-quran` — Quran evaluation form

```html
<article class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <h2 class="text-base md:text-lg font-semibold mb-2">تقييم الأداء القرآني</h2>

  <!-- Helper caption (mirrors student-side R4 caption) -->
  <p class="text-xs text-text-muted leading-7 mb-5 italic">
    المحاور أدناه تفصيلية لمهارات الطالب — أدخل درجة لكل محور (0-100) مع تعليق قصير. هذه الدرجات لا تُحسب تلقائياً في التقييم العام أعلاه؛ التقييم العام يبقى تقديرك الشامل.
  </p>

  <!-- 4-axis grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-slate-50 rounded-xl p-4">
      <label for="hsd-axis-memorization" class="block text-sm font-semibold mb-2">الحفظ</label>
      <div class="flex items-center gap-3 mb-2">
        <input type="number" id="hsd-axis-memorization" min="0" max="100" value="85" class="w-20 …" />
        <div class="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full bg-success-500" style="inline-size: 85%"></div>
        </div>
      </div>
      <input type="text" placeholder="تعليق على الحفظ..." value="حفظ ممتاز للآيات — كلمات قليلة جداً تحتاج تثبيتاً." class="w-full text-xs …" />
    </div>
    <!-- … 3 more axes (التجويد 60 / النطق 75 / الطلاقة 70) with same pattern, different bar tints … -->
  </div>

  <!-- Below-grid inputs -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
    <div>
      <label for="hsd-mistakes" class="block text-sm font-medium mb-2">عدد الأخطاء المرصودة</label>
      <input type="number" id="hsd-mistakes" min="0" max="50" value="5" class="…" />
    </div>
    <div>
      <label for="hsd-ayahs" class="block text-sm font-medium mb-2">آيات تحتاج إلى مراجعة</label>
      <div class="flex flex-wrap items-center gap-2 p-2 rounded-xl border border-slate-300">
        <span class="…tag chip…">الآية 3 <button>×</button></span>
        <span class="…tag chip…">الآية 4 <button>×</button></span>
        <span class="…tag chip…">الآية 7 <button>×</button></span>
        <input type="text" placeholder="أضف رقم آية..." class="flex-1 min-w-0 border-0 …" />
      </div>
    </div>
  </div>

  <!-- Additional notes -->
  <div class="mt-5">
    <label for="hsd-quran-notes" class="block text-sm font-medium mb-2">ملاحظات إضافية على التلاوة</label>
    <textarea id="hsd-quran-notes" rows="3" class="…">أنصحك بالاستماع إلى تسجيل الشيخ المنشاوي قبل المحاولة الثانية، والتركيز على التطبيق العملي للأحكام أثناء التلاوة.</textarea>
  </div>
</article>
```

### `#hsd-actions` — action area

```html
<article class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <div class="flex flex-wrap items-center gap-3 mb-3">
    <button type="button" class="…btn-primary…">
      <svg>…check…</svg>
      حفظ المراجعة
    </button>
    <a href="#hsd-overall" class="…btn-secondary…">
      <svg>…save…</svg>
      حفظ كمسودة
    </a>
    <a href="homework-review.html" class="…btn-tertiary…">إلغاء</a>
  </div>
  <p class="text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">
    <svg>…info…</svg>
    هذا نموذج تجريبي — لا يتم حفظ المراجعة فعلياً.
  </p>
</article>
```

## Mobile collapse (per R12)

Below `lg`, the layout becomes single-column with **left context first** (student card → assignment card → submitted files → student note) then **right grading form** (overall → status → Quran evaluation → actions). Each internal article remains rounded card.

## Cross-page links

**Inbound**:

- `homework-review.html` per-row "مراجعة" CTA

**Outbound**:

- "إلغاء" → `homework-review.html`
- "حفظ كمسودة" → `#hsd-overall` (same-page anchor; visual stub)
- "حفظ المراجعة" → no navigation (visual `<button type="button">`)
- Breadcrumb "مراجعة الواجبات" → `homework-review.html`
- "السابق" / "التالي" → `homework-review.html#prev-row` / `#next-row` (same-page anchors on the queue page)

## Validation hooks

- **FR-060**: `<h1>` contains the locked submission title.
- **FR-061**: Two-column layout at lg+ via `lg:grid-cols-12 lg:col-span-5 / lg:col-span-7`. Left column has `#hsd-student-card`, `#hsd-assignment-card`, `#hsd-files`, `#hsd-student-note` in that order. Right column has `#hsd-overall`, `#hsd-status`, `#hsd-quran`, `#hsd-actions` in that order.
- **FR-062**: `#hsd-overall` contains `<input type="number" id="hsd-grade" value="65">`, a written-feedback `<textarea>` with ≥ 4 rows pre-filled, two stacked editable lists (`#hsd-strengths`, `#hsd-improvements`) each with ≥ 3 inputs and a `+ إضافة نقطة` button.
- **FR-063**: `#hsd-status` contains exactly 5 radio cards; the يحتاج تعديل card has `data-active="true"` and its `<input>` has the `checked` attribute. The "طلب إعادة التسليم" checkbox is `checked`. The R5 helper caption is present.
- **FR-064**: `#hsd-quran` contains 4 axis cards (الحفظ 85 / التجويد 60 / النطق 75 / الطلاقة 70) each with a numeric input + bar + comment input; below the grid: `#hsd-mistakes` numeric (5), tag input with 3 ayah chips, and a notes textarea. The R4-mirrored caption is present immediately below the h2.
- **FR-065**: `#hsd-actions` contains a `<button type="button">حفظ المراجعة</button>`, a "حفظ كمسودة" inline link, an "إلغاء" link to `homework-review.html`, and the prototype notice.
- **FR-066**: The `#hsd-header` row contains a "السابق / التالي" pair of inline links.
- **SC-006**: A reviewer finds — without further interaction — every required form element listed in spec.md SC-006.
