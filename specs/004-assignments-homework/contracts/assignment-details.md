# Contract — Student Assignment Details Page

`pages/student/assignment-details.html` is the deep view of a single assignment. The featured assignment is **E1.1** (`quran-meem-sakinah-baqarah-1-10`) in the "يحتاج تعديل" state with 1 attempt used and 2 remaining (FR-020).

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-lg mx-auto space-y-6">

    <!-- Block 1: Header + meta-strip -->
    <section id="ad-header">
      <nav aria-label="breadcrumb">
        <a href="assignments.html">واجباتي</a> / <span aria-current="page">{titleAr}</span>
      </nav>
      <h1>{titleAr}</h1>
      <div id="ad-meta" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"> … 6 cells … </div>
    </section>

    <!-- Block 2: Required task -->
    <section id="ad-task" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
      <h2>المطلوب منك</h2>
      <p>{taskStatementAr}</p>
      <ol> … ≥ 3 sub-tasks … </ol>
    </section>

    <!-- Block 3: Teacher instructions -->
    <section id="ad-instructions" class="bg-primary-50 border-r-4 border-primary-500 rounded-2xl p-5 md:p-6">
      <h2>تعليمات المعلم</h2>
      <p>{teacherInstructionsAr}</p>
    </section>

    <!-- Block 4: Quran brief (only when quranSpecific) -->
    <section id="ad-quran-brief" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
      <h2>البريف القرآني</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>نطاق الحفظ والمراجعة …</div>
        <div>تركيز التجويد …</div>
        <div>أخطاء شائعة يجب تجنّبها …</div>
        <div>طريقة التسجيل المطلوبة …</div>
      </div>
    </section>

    <!-- Block 5: Attached materials -->
    <section id="ad-materials">
      <h2>الملفات والمراجع المرفقة</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- 5 attachment tiles per E2 -->
      </div>
    </section>

    <!-- Block 6: Submission history -->
    <section id="ad-history" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
      <h2>سجل التسليمات</h2>
      <ol class="relative ps-8 border-s-2 border-slate-200">
        <!-- ≥ 1 prior attempt per E4 -->
      </ol>
    </section>

    <!-- Block 7: Action area -->
    <section id="ad-actions" class="sticky bottom-4 bg-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-200">
      <a class="btn-primary" href="submit-assignment.html">إعادة التسليم</a>
      <a class="btn-secondary">تنزيل ملفات الواجب</a>
      <a class="btn-tertiary" href="assignments.html">العودة لقائمة الواجبات</a>
    </section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: 15 entries from Spec 002; **active entry = "الواجبات"**.
- Header: same as Spec 002; `<title>` = `{titleAr} — واجباتي — منصة إدارتي`; h1 = `{titleAr}`.

## Meta-strip block (`#ad-meta`)

Six labeled cells in a responsive grid (2 col mobile / 3 col tablet / 6 col desktop). Each cell:

```html
<div class="bg-slate-50 rounded-xl p-3 md:p-4">
  <p class="text-xs text-text-muted mb-1">{labelAr}</p>
  <p class="text-sm font-semibold text-text-base">{value}</p>
</div>
```

Cells (in order):

| Label | Value |
|---|---|
| الدورة | القرآن الكريم — المستوى الثالث |
| المعلم | الأستاذ أحمد العمري (with avatar chip) |
| تاريخ الإنشاء | 2 مايو 2026 |
| تاريخ التسليم | 10 مايو 2026 |
| الحالة | (status pill: يحتاج تعديل) |
| الدرجة الحالية | 65 / 100 |

## Task block (`#ad-task`)

Sample content for E1.1:

```html
<h2 class="text-base md:text-lg font-semibold mb-3">المطلوب منك</h2>
<p class="text-sm text-text-base leading-7 mb-4">عليك حفظ الآيات 1 إلى 10 من سورة البقرة، ثم تسجيل تلاوتك بصوت واضح مع تطبيق أحكام الميم الساكنة الثلاثة (الإخفاء الشفوي، الإدغام الشفوي، الإظهار الشفوي) في كل موضع. هذا الواجب جزء من تثبيت أحكام الجزء الأول من سورة البقرة قبل اختبار المنتصف.</p>
<ol class="list-decimal ps-6 space-y-2 text-sm text-text-base">
  <li>احفظ الآيات 1 إلى 10 من سورة البقرة.</li>
  <li>سجّل تلاوتك بصوت واضح في مكان هادئ — مدة التسجيل بين 60 و 90 ثانية.</li>
  <li>طبّق أحكام الميم الساكنة في كل موضع — الإخفاء الشفوي، الإدغام الشفوي، الإظهار الشفوي.</li>
  <li>راجع التسجيل قبل الرفع وتأكد من جودة الصوت.</li>
</ol>
```

## Teacher instructions block (`#ad-instructions`)

Quote-style panel with the navy accent (Spec 001 design tokens). Sample content:

> "أحبائي الطلاب، اعتنوا بإتقان أحكام الميم الساكنة فهي الأساس الذي تُبنى عليه باقي أحكام النون الساكنة والتنوين. ركّزوا في الآية الأولى عند 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ' — لاحظوا كيف يُطبَّق الإظهار. وفي 'وَمِمَّا رَزَقْنَاهُمْ' لاحظوا الإدغام الشفوي. سجّلوا في مكان هادئ بسماعة جيدة، واستمعوا للتسجيل قبل الرفع. لمن أعاد التسليم — حاولوا التطبيق الأبطأ هذه المرة حتى يتضح الفرق بين الأحكام الثلاثة. أنا متاح للأسئلة في وقت المتابعة المسائي."

Followed by a teacher avatar + name caption beneath.

## Quran brief block (`#ad-quran-brief`)

Per E3, four labeled blocks in a 2-column grid (1 col mobile):

### نطاق الحفظ والمراجعة

```text
سورة البقرة، الآيات 1 إلى 10
تقريباً 65 كلمة — مع التركيز على ضبط الإعراب والوقف.
```

### تركيز التجويد

```text
أحكام الميم الساكنة — ثلاثة أحكام:
1. الإخفاء الشفوي — تخفى الميم الساكنة عند الباء، مع غنّة بمقدار حركتين.
2. الإدغام الشفوي — تدغم الميم الساكنة في الميم المتحركة بعدها مع غنّة.
3. الإظهار الشفوي — تظهر الميم الساكنة عند ملاقاتها لباقي الحروف.
```

### أخطاء شائعة يجب تجنّبها

(per R7 — 4 bullets):

1. الخلط بين الإخفاء الشفوي والإدغام الشفوي عند الالتقاء بالباء.
2. ترك الغنّة عند الإدغام الشفوي.
3. المبالغة في الإظهار حتى تصبح الميم وكأنها مفتوحة.
4. إقلاب الميم نوناً أو تنويناً عند الإخفاء.

### طريقة التسجيل المطلوبة

```text
مكان هادئ، 60-90 ثانية، صوت واضح، التزام بمخارج الحروف.
```

## Attached materials block (`#ad-materials`)

5 attachment tiles per E2. Tile pattern (PDF example):

```html
<a href="#planned" class="block bg-white rounded-2xl border border-slate-200 hover:border-rose-300 hover:shadow-sm p-4 group transition-all">
  <div class="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-rose-50 text-rose-700 mb-3">
    <svg>…file-text icon…</svg>
  </div>
  <p class="text-sm font-semibold text-text-base mb-1 line-clamp-2">ملخص أحكام الميم الساكنة.pdf</p>
  <p class="text-xs text-text-muted mb-3">PDF — 1.4 MB</p>
  <span class="text-xs font-medium text-rose-700 group-hover:underline">تنزيل الملف ←</span>
</a>
```

The external-link tile uses `href="https://quran.com/2"` and target `_blank` + rel `noopener noreferrer` per R11.

## Submission history block (`#ad-history`)

Vertical timeline. For E1.1, exactly 1 prior attempt is rendered:

```html
<ol class="relative ps-8 border-s-2 border-slate-200 space-y-6">
  <li>
    <span class="absolute -inline-start-1.5 inline-flex items-center justify-center h-8 w-8 rounded-full bg-warning-100 text-warning-700 ring-4 ring-white">
      <svg>…alert-triangle…</svg>
    </span>
    <div class="bg-white rounded-2xl border border-slate-200 p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-semibold">المحاولة 1 من 3 محاولات مسموح بها</h3>
        <span class="text-xs text-text-muted">7 مايو 2026 — الساعة 09:14 ص</span>
      </div>
      <div class="flex items-center gap-3 mb-2">
        <button type="button" aria-label="تشغيل التسجيل" class="…">…play icon…</button>
        <span class="text-sm font-medium">تسجيل-الميم-الساكنة-المحاولة-1.mp3</span>
        <span class="text-xs text-text-muted">01:18</span>
      </div>
      <div class="flex items-center justify-between text-xs">
        <span class="…status pill: يحتاج تعديل…">يحتاج تعديل</span>
        <span class="text-text-muted">الدرجة: 65 / 100</span>
      </div>
      <a href="submission-feedback.html" class="text-xs font-medium text-accent-700 hover:underline mt-3 inline-flex items-center gap-1">عرض ملاحظات المعلم →</a>
    </div>
  </li>
</ol>
```

Below the single attempt, an inline annotation:

```html
<p class="text-xs text-text-muted mt-4 italic">
  * بعد إعادة التسليم، ستظهر المحاولة الثانية كبطاقة جديدة في أعلى هذه القائمة، وتنخفض المحاولة الأولى إلى الأسفل.
</p>
```

## Action area (`#ad-actions`)

Sticky-to-bottom on desktop:

```html
<section id="ad-actions" class="sticky bottom-4 bg-white rounded-2xl p-4 md:p-5 shadow-lg border border-slate-200 flex flex-wrap items-center gap-3">
  <a href="submit-assignment.html" class="…btn-primary…">إعادة التسليم</a>
  <a href="#ad-materials" class="…btn-secondary…">تنزيل ملفات الواجب</a>
  <a href="assignments.html" class="…btn-tertiary…">العودة لقائمة الواجبات</a>
</section>
```

## Cross-page links

**Inbound**:

- `assignments.html` per-row "عرض التفاصيل" CTA
- `dashboard.html` / `weekly-plan.html` per-row "عرض الواجب" CTA (these go through `assignments.html` first; if extended, they could deep-link here)

**Outbound**:

- "إعادة التسليم" → `submit-assignment.html`
- "العودة لقائمة الواجبات" → `assignments.html`
- Submission history "عرض ملاحظات المعلم" → `submission-feedback.html`
- External-link attachment → `https://quran.com/2`

## Validation hooks

- **FR-020**: `<h1>` text matches the locked title.
- **FR-021**: 6 cells inside `#ad-meta`.
- **FR-022**: `#ad-task` contains a `<p>` paragraph + `<ol>` with ≥ 3 `<li>`.
- **FR-023**: `#ad-instructions` contains ≥ 4 sentences.
- **FR-024**: `#ad-materials` contains exactly 5 tiles, one of each type. The external-link tile's `href` is `https://quran.com/2` (verifies SC-007).
- **FR-025**: `#ad-quran-brief` contains 4 sub-blocks.
- **FR-026**: `#ad-history` contains ≥ 1 attempt entry with all required sub-elements.
- **FR-027**: `#ad-actions` contains the 3 CTAs in the order specified.
- **SC-002**: A 30-second visual scan answers the 5 questions in spec.md SC-002.
