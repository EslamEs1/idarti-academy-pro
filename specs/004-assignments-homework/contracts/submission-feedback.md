# Contract — Submission Feedback Page

`pages/student/submission-feedback.html` is the closing surface of the homework loop — the page that proves the academy's "we follow up seriously" promise. The featured state is **the teacher's verdict on attempt 1** of E1.1 (`quran-meem-sakinah-baqarah-1-10`) — graded "needs revision" with attempts remaining (FR-040).

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-lg mx-auto space-y-6">

    <!-- Block 1: Header + meta-strip -->
    <section id="sf-header">
      <nav aria-label="breadcrumb">
        <a href="assignments.html">واجباتي</a> /
        <a href="assignment-details.html">{titleAr}</a> /
        <span aria-current="page">ملاحظات المعلم</span>
      </nav>
      <h1>ملاحظات المعلم على: {titleAr}</h1>
      <div id="sf-meta" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"> … 6 cells … </div>
    </section>

    <!-- Block 2: Teacher feedback quote -->
    <section id="sf-feedback" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 border-r-4 border-r-primary-500">
      <header class="flex items-center gap-3 mb-3">
        <div class="…teacher avatar…">أ.أ</div>
        <div>
          <p class="text-sm font-semibold">الأستاذ أحمد العمري</p>
          <p class="text-xs text-text-muted">7 مايو 2026 — الساعة 14:32 م</p>
        </div>
      </header>
      <blockquote class="text-sm text-text-base leading-8">…</blockquote>
    </section>

    <!-- Block 3: Strengths / Improvements panels (side by side desktop, stacked mobile) -->
    <section id="sf-strengths-improvements" class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="bg-success-50 border border-success-200 rounded-2xl p-5">
        <h2>نقاط قوّتك</h2>
        <ul> … ≥ 3 bullets with check-circle icons … </ul>
      </div>
      <div class="bg-warning-50 border border-warning-200 rounded-2xl p-5">
        <h2>نقاط للتحسين</h2>
        <ul> … ≥ 3 bullets with alert-circle icons … </ul>
      </div>
    </section>

    <!-- Block 4: Quran evaluation rubric -->
    <section id="sf-quran" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
      <h2>تقييم الأداء القرآني</h2>
      <p class="…independence caption…">…</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- 4 axis cards per E5 -->
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-100">
        <p>عدد الأخطاء المرصودة: 5 أخطاء</p>
        <p>آيات تحتاج إلى مراجعة: الآيات 3 و 4 و 7</p>
      </div>
    </section>

    <!-- Block 5: Resubmission panel -->
    <section id="sf-resubmit" class="bg-warning-50 border border-warning-300 rounded-2xl p-5 md:p-6">
      <header class="flex items-start gap-3 mb-4">
        <svg>…alert-triangle large…</svg>
        <div>
          <h2>المعلم طلب إعادة تسليم هذا الواجب</h2>
          <p>راجع نقاط التحسين أعلاه قبل المحاولة الثانية.</p>
        </div>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>الموعد النهائي لإعادة التسليم: 10 مايو 2026</div>
        <div>المحاولات المتبقية: 2 من أصل 3</div>
      </div>
      <a href="submit-assignment.html" class="…btn-primary…">إعادة التسليم الآن</a>
    </section>

    <!-- Block 6: Attempts timeline -->
    <section id="sf-attempts" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
      <h2>محاولاتك السابقة</h2>
      <ol class="relative ps-8 border-s-2 border-slate-200">
        <!-- 1 attempt visible (current) + inline annotation about future attempts -->
      </ol>
    </section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: 15 entries from Spec 002; **active entry = "الواجبات"**.
- Header: same as Spec 002; `<title>` = `ملاحظات المعلم: {titleAr} — منصة إدارتي`.

## Meta-strip block (`#sf-meta`)

Six cells matching FR-041:

| Label | Value |
|---|---|
| الدورة | القرآن الكريم — المستوى الثالث |
| المعلم | الأستاذ أحمد العمري |
| الحالة | (status pill: يحتاج تعديل) |
| الدرجة | 65 / 100 (with a small horizontal progress bar showing 65% fill) |
| تاريخ التقييم | 7 مايو 2026 — الساعة 14:32 م |
| المحاولة | 1 من 3 |

## Teacher feedback block (`#sf-feedback`)

The 4-6 sentence Arabic feedback message from FR-042:

```html
<blockquote class="text-sm md:text-base text-text-base leading-8 ps-4 border-s-2 border-primary-200">
  أداؤك في هذه المحاولة جيد، عبدالرحمن، خاصة في الإظهار الشفوي عند ملاقاتك للحروف الخمسة في الآية الأولى — كان واضحاً وسليماً. لكنّ تركيزك على الإخفاء الشفوي يحتاج تحسيناً ملحوظاً، خصوصاً في الآية الثالثة عند 'لِمَنْ آمَنَ' — لاحظ كيف أظهرت الميم بدل إخفائها مع الميم بعدها بعد ذلك. كذلك في الآية السابعة عند 'وَعَلَى أَبْصَارِهِمْ' — كانت الغنّة قصيرة جداً، يجب أن تكون بمقدار حركتين. أنصحك بالاستماع إلى تسجيل الشيخ المنشاوي المرفق في تفاصيل الواجب، والتركيز على التطبيق الأبطأ في المحاولة الثانية حتى يتضح الفرق بين الأحكام الثلاثة. أنا واثق أنك ستتقن هذه الأحكام في المحاولة القادمة بإذن الله.
</blockquote>
```

## Strengths / Improvements (`#sf-strengths-improvements`)

Two panels, side-by-side on md+ breakpoint:

### نقاط قوّتك (success / green)

```html
<ul class="space-y-3">
  <li class="flex items-start gap-3 text-sm leading-7">
    <svg class="h-5 w-5 text-success-600 flex-shrink-0">…check-circle…</svg>
    <span>الإظهار الشفوي مطبَّق بشكل ممتاز في الآيات 1 و 2 و 5.</span>
  </li>
  <li class="flex items-start gap-3 text-sm leading-7">
    <svg class="h-5 w-5 text-success-600 flex-shrink-0">…check-circle…</svg>
    <span>الحفظ مكتمل بدون أخطاء جوهرية في كلمات الآيات.</span>
  </li>
  <li class="flex items-start gap-3 text-sm leading-7">
    <svg class="h-5 w-5 text-success-600 flex-shrink-0">…check-circle…</svg>
    <span>جودة التسجيل ممتازة — صوت واضح وخالٍ من التشويش.</span>
  </li>
  <li class="flex items-start gap-3 text-sm leading-7">
    <svg class="h-5 w-5 text-success-600 flex-shrink-0">…check-circle…</svg>
    <span>الالتزام بمدة التسجيل المطلوبة (60-90 ثانية).</span>
  </li>
</ul>
```

### نقاط للتحسين (warning / amber)

```html
<ul class="space-y-3">
  <li class="flex items-start gap-3 text-sm leading-7">
    <svg class="h-5 w-5 text-warning-600 flex-shrink-0">…alert-circle…</svg>
    <span>الإخفاء الشفوي يحتاج تركيزاً أكبر — خاصة عند الالتقاء بالباء في الآية 3.</span>
  </li>
  <li class="flex items-start gap-3 text-sm leading-7">
    <svg class="h-5 w-5 text-warning-600 flex-shrink-0">…alert-circle…</svg>
    <span>الغنّة في الإدغام الشفوي قصيرة جداً — يجب أن تكون بمقدار حركتين.</span>
  </li>
  <li class="flex items-start gap-3 text-sm leading-7">
    <svg class="h-5 w-5 text-warning-600 flex-shrink-0">…alert-circle…</svg>
    <span>توقفات قصيرة بين الكلمات تكسر الطلاقة — حاول الربط بين الآيات.</span>
  </li>
</ul>
```

## Quran evaluation block (`#sf-quran`) — per Q1 / R4

Header includes the **independence caption** mandated by FR-044:

```html
<h2 class="text-base md:text-lg font-semibold mb-2">تقييم الأداء القرآني</h2>
<p class="text-xs text-text-muted leading-7 mb-5 italic">
  المحاور أعلاه تفصيلية لأدائك في كل مهارة. التقييم العام (65 / 100) في الأعلى تقدير شامل من المعلم يأخذ في الاعتبار جودة التسجيل، الالتزام، وسلوكيات الأدب القرآني إلى جانب المهارات.
</p>
```

(Note: "أعلاه" refers to the four axis cards rendered immediately below this caption — the caption explicitly tells the reader the cards are diagnostic.)

### 4 axis cards

Each axis card per E5:

```html
<div class="bg-slate-50 rounded-xl p-4 md:p-5">
  <div class="flex items-center justify-between mb-2">
    <h3 class="text-sm font-semibold flex items-center gap-2">
      <svg class="h-4 w-4 text-primary-700">…book-open…</svg>
      الحفظ
    </h3>
    <span class="text-lg font-bold text-success-700">85 / 100</span>
  </div>
  <div class="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
    <div class="h-full bg-success-500" style="inline-size: 85%"></div>
  </div>
  <p class="text-xs text-text-muted leading-7">حفظ ممتاز للآيات — كلمات قليلة جداً تحتاج تثبيتاً.</p>
</div>
```

Four axes per E5 with their values and color tints:

| Axis | Score | Bar tint | Comment |
|---|---|---|---|
| الحفظ | 85 | success-500 | حفظ ممتاز للآيات — كلمات قليلة جداً تحتاج تثبيتاً. |
| التجويد | 60 | warning-500 | تطبيق الإخفاء الشفوي يحتاج تركيزاً أكبر — خاصة عند الالتقاء بالباء. |
| النطق | 75 | info-500 | النطق واضح بشكل عام — المخارج الجانبية تحتاج تعديلاً. |
| الطلاقة | 70 | info-500 | الطلاقة جيدة — حاول تقليل الوقفات الطويلة بين الآيات. |

### Below-grid summary lines

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-100">
  <div class="flex items-center gap-3 text-sm">
    <svg class="h-5 w-5 text-warning-600">…alert-octagon…</svg>
    <span><strong>عدد الأخطاء المرصودة:</strong> 5 أخطاء</span>
  </div>
  <div class="flex items-start gap-3 text-sm">
    <svg class="h-5 w-5 text-info-600 flex-shrink-0 mt-0.5">…book-marked…</svg>
    <span><strong>آيات تحتاج إلى مراجعة:</strong> الآيات 3 و 4 و 7</span>
  </div>
</div>
```

## Resubmission panel (`#sf-resubmit`)

Per FR-045:

```html
<section id="sf-resubmit" class="bg-warning-50 border-2 border-warning-300 rounded-2xl p-5 md:p-6">
  <header class="flex items-start gap-4 mb-4">
    <div class="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-warning-100 text-warning-700">
      <svg class="h-6 w-6">…rotate-ccw…</svg>
    </div>
    <div class="min-w-0">
      <h2 class="text-base md:text-lg font-semibold text-warning-900">المعلم طلب إعادة تسليم هذا الواجب</h2>
      <p class="text-sm text-warning-800 mt-1 leading-7">راجع نقاط التحسين أعلاه ولاحظ الآيات التي تحتاج تركيزاً قبل المحاولة الثانية.</p>
    </div>
  </header>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
    <div class="bg-white rounded-xl p-3 flex items-center gap-3">
      <svg class="h-5 w-5 text-warning-600">…calendar-clock…</svg>
      <div class="text-sm">
        <p class="text-xs text-text-muted">الموعد النهائي لإعادة التسليم</p>
        <p class="font-semibold">10 مايو 2026 — قبل 23:59</p>
      </div>
    </div>
    <div class="bg-white rounded-xl p-3 flex items-center gap-3">
      <svg class="h-5 w-5 text-warning-600">…repeat…</svg>
      <div class="text-sm">
        <p class="text-xs text-text-muted">المحاولات المتبقية</p>
        <p class="font-semibold">لديك محاولتان متبقيتان من أصل 3</p>
      </div>
    </div>
  </div>
  <a href="submit-assignment.html" class="…btn-primary…">
    <svg>…send…</svg>
    إعادة التسليم الآن
  </a>
</section>
```

## Attempts timeline (`#sf-attempts`)

Single attempt visible (the current one, marked as expanded), plus an annotation about future attempts:

```html
<ol class="relative ps-8 border-s-2 border-slate-200 space-y-5">
  <li>
    <span class="absolute -inline-start-1.5 inline-flex items-center justify-center h-8 w-8 rounded-full bg-warning-100 text-warning-700 ring-4 ring-white">
      <svg>…dot-fill…</svg>
    </span>
    <div class="bg-warning-50 rounded-2xl border border-warning-200 p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-semibold">المحاولة 1 — الحالية</h3>
        <span class="…status pill: يحتاج تعديل…">يحتاج تعديل</span>
      </div>
      <div class="flex items-center gap-3 text-xs text-text-muted">
        <span>7 مايو 2026 — 09:14 ص</span>
        <span aria-hidden="true">·</span>
        <span>تسجيل-الميم-الساكنة-المحاولة-1.mp3</span>
        <span aria-hidden="true">·</span>
        <span class="font-semibold">65 / 100</span>
      </div>
    </div>
  </li>
</ol>
<p class="text-xs text-text-muted mt-4 italic">
  * بعد إتمام المحاولة الثانية، ستظهر أعلى هذه القائمة وتنخفض المحاولة الأولى إلى الأسفل.
</p>
```

## Cross-page links

**Inbound**:

- `assignments.html` per-row "عرض الملاحظات" CTA (for مقبول / يحتاج تعديل / مرفوض rows)
- `assignment-details.html` submission-history "عرض ملاحظات المعلم" link

**Outbound**:

- "إعادة التسليم الآن" → `submit-assignment.html`
- Breadcrumb "واجباتي" → `assignments.html`
- Breadcrumb assignment title → `assignment-details.html`

## Validation hooks

- **FR-040**: `<h1>` contains the locked title.
- **FR-041**: `#sf-meta` has 6 cells; the grade cell shows both numeric (65 / 100) and a `<div class="h-2 bg-slate-200">` progress bar.
- **FR-042**: `#sf-feedback` contains a `<blockquote>` with ≥ 4 sentences and a teacher avatar+name caption.
- **FR-043**: `#sf-strengths-improvements` contains 2 panels, each with ≥ 3 `<li>` items + appropriate icons.
- **FR-044**: `#sf-quran` contains 4 axis cards (الحفظ 85 / التجويد 60 / النطق 75 / الطلاقة 70), the 2-line summary (mistakes / ayahs), AND the **independence caption** ("المحاور أعلاه تفصيلية…"). The caption text must contain the substring "تقدير شامل".
- **FR-045**: `#sf-resubmit` exists with the headline, deadline, attempts-remaining caption, and primary CTA `<a href="submit-assignment.html">`.
- **FR-046**: `#sf-attempts` contains 1 attempt entry + the annotation paragraph.
- **SC-004**: A 30-second visual scan answers the 5 questions in spec.md SC-004.
