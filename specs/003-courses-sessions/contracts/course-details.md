# Contract — Course Details Page

`pages/student/course-details.html` showcases the **Quran path Level 3 course** (`أحكام الميم الساكنة وحفظ الجزء الثلاثين`) per Q3 clarification. The page mixes marketing content (overview, "ماذا ستتعلم", curriculum, teacher profile, pricing matrix) with the persona's enrolled-state sections (تقدّمك في هذه الدورة, parent confidence) — both apply because the persona is enrolled in this course.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <!-- Block 1: Hero -->
    <section id="cd-hero">...</section>

    <!-- Block 2: What you'll learn -->
    <section id="cd-outcomes">...</section>

    <!-- Block 3: Curriculum -->
    <section id="cd-curriculum">...</section>

    <!-- Block 4: Teacher profile -->
    <section id="cd-teacher">...</section>

    <!-- Block 5: Pricing matrix (4 combinations) -->
    <section id="cd-pricing">...</section>

    <!-- Block 6: Included sessions / homework / exams / certificate -->
    <section id="cd-includes">...</section>

    <!-- Block 7: Enrolled-only — Your progress -->
    <section id="cd-progress">...</section>

    <!-- Block 8: Enrolled-only — Parent confidence -->
    <section id="cd-parent-confidence">...</section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: **NO active entry** (drill-down page; the inbound nav root is "دوراتي" or "استعراض الدورات", not this page).
- `<title>` = `أحكام الميم الساكنة وحفظ الجزء الثلاثين — منصة إدارتي`; h1 = `أحكام الميم الساكنة وحفظ الجزء الثلاثين`; subtitle = `مسار القرآن الكريم — المستوى الثالث`.

## Block 1: Hero (`#cd-hero`, FR-030)

```html
<section id="cd-hero" class="bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-6 md:p-8 shadow-md">

  <!-- Pills row -->
  <div class="flex flex-wrap items-center gap-2 mb-3">
    <span class="inline-flex items-center gap-1 rounded-full bg-info-500/30 text-white px-2.5 py-1 text-xs font-semibold">جماعي</span>
    <span class="inline-flex items-center rounded-full bg-white/15 text-white px-2.5 py-1 text-xs font-semibold">المستوى الثالث</span>
    <span class="inline-flex items-center gap-1 rounded-full bg-accent-500/30 text-accent-100 px-2.5 py-1 text-xs font-semibold">
      <svg class="h-3 w-3">{thumbs-up}</svg>
      موصى بك
    </span>
  </div>

  <h2 class="text-xl md:text-3xl font-extrabold leading-tight">أحكام الميم الساكنة وحفظ الجزء الثلاثين</h2>

  <p class="text-white/85 text-sm md:text-base mt-3 leading-7 max-w-3xl">
    مستوى متقدّم لإتقان أحكام الميم الساكنة الثلاثة (الإخفاء، الإدغام، الإظهار) مع
    حفظ كامل للجزء الثلاثين تحت إشراف معلم معتمد. مناسب لمن أنهى المستويين الأول والثاني.
  </p>

  <p class="text-white/70 text-xs mt-3 inline-flex items-center gap-1.5">
    <svg class="h-3.5 w-3.5">{clock}</svg>
    12 أسبوعاً — 3 حصص أسبوعياً
  </p>

  <!-- CTA row -->
  <div class="flex flex-wrap gap-3 mt-5">
    <a href="#cd-pricing" class="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors">
      اشتراك في الدورة
      <svg class="h-4 w-4 rtl:rotate-180">{chevron-left}</svg>
    </a>
    <a href="live-sessions.html" class="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors">
      <svg class="h-4 w-4">{video}</svg>
      حجز حصة فردية
    </a>
  </div>

</section>
```

## Block 2: What you'll learn (`#cd-outcomes`, FR-031)

```html
<section id="cd-outcomes" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
  <h3 class="text-base md:text-lg font-bold mb-4">ماذا ستتعلم في هذا المستوى</h3>
  <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <!-- 6 outcomes from data-model E11 -->
    <li class="flex items-start gap-2.5 text-sm text-text-base leading-7">
      <svg class="h-5 w-5 text-success-600 flex-shrink-0 mt-0.5">{check-circle}</svg>
      <span>{outcomeAr}</span>
    </li>
  </ul>
</section>
```

## Block 3: Curriculum (`#cd-curriculum`, FR-032)

The 4 levels from `data-model.md §E2` (mirrors Spec 002 §E2 path levels). The page is showing Level 3 details, but the curriculum block lists all 4 levels of the *full path* so the student sees where Level 3 sits in the broader journey.

```html
<section id="cd-curriculum" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
  <h3 class="text-base md:text-lg font-bold mb-4">المنهج الدراسي للمسار الكامل</h3>

  <ol class="space-y-3">
    <li class="flex items-start gap-3 p-3 rounded-lg bg-success-50 border border-success-200">
      <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-success-100 text-success-700 flex-shrink-0 text-sm font-bold">L1</span>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h4 class="text-sm font-semibold text-text-base">أساسيات التلاوة والتجويد</h4>
          <span class="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2 py-0.5 text-[0.625rem] font-semibold">
            <svg class="h-3 w-3">{check-circle-2}</svg>
            مكتمل
          </span>
        </div>
        <p class="text-xs text-text-muted mt-1">12 حصة — 6 واجبات</p>
      </div>
    </li>

    <li class="flex items-start gap-3 p-3 rounded-lg bg-success-50 border border-success-200">
      <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-success-100 text-success-700 flex-shrink-0 text-sm font-bold">L2</span>
      <!-- مدّ الحروف وأحكام النون الساكنة — مكتمل — 15 حصة, 8 واجبات -->
    </li>

    <li class="flex items-start gap-3 p-3 rounded-lg bg-accent-50 border-2 border-accent-500">
      <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white flex-shrink-0 text-sm font-bold">L3</span>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h4 class="text-sm font-semibold text-text-base">أحكام الميم الساكنة وحفظ الجزء الثلاثين</h4>
          <span class="inline-flex items-center gap-1 rounded-full bg-accent-100 text-accent-700 px-2 py-0.5 text-[0.625rem] font-semibold">
            <svg class="h-3 w-3">{compass}</svg>
            حالياً
          </span>
        </div>
        <p class="text-xs text-text-muted mt-1">18 حصة — 10 واجبات</p>
        <!-- mini progress bar at 60% -->
      </div>
    </li>

    <li class="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
      <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-500 flex-shrink-0">
        <svg class="h-4 w-4">{lock}</svg>
      </span>
      <!-- L4 إتقان التلاوة وتفسير قصار السور — قادم — 20 حصة, 12 واجبات -->
    </li>
  </ol>
</section>
```

## Block 4: Teacher profile (`#cd-teacher`, FR-033)

```html
<section id="cd-teacher" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
  <h3 class="text-base md:text-lg font-bold mb-4">تعرّف على معلمك</h3>

  <div class="flex flex-col md:flex-row items-start gap-5">

    <!-- Avatar -->
    <div class="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-primary-700 text-white inline-flex items-center justify-center text-2xl font-bold flex-shrink-0">أ.أ</div>

    <div class="flex-1 min-w-0">
      <h4 class="text-lg font-bold text-text-base">الأستاذ أحمد بن عبد الله</h4>
      <p class="text-sm text-text-muted">معلم القرآن الكريم — معتمد من جامعة الإمام</p>

      <p class="text-sm text-text-base leading-7 mt-3">
        خبرة 12 عاماً في تعليم القرآن الكريم وعلوم التجويد. حاصل على إجازة في
        رواية حفص عن عاصم. متخصّص في تبسيط القواعد العلمية للطلاب وربطها بالتطبيق
        العملي على المصحف الشريف.
      </p>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        <div class="bg-surface-50 rounded-lg p-3 text-center">
          <p class="text-2xl font-extrabold text-primary-700">12</p>
          <p class="text-[0.625rem] text-text-muted leading-7 mt-0.5">سنة خبرة</p>
        </div>
        <div class="bg-surface-50 rounded-lg p-3 text-center">
          <p class="text-2xl font-extrabold text-primary-700">480</p>
          <p class="text-[0.625rem] text-text-muted leading-7 mt-0.5">طالب تخرّج معه</p>
        </div>
        <div class="bg-surface-50 rounded-lg p-3 text-center">
          <p class="text-2xl font-extrabold text-accent-700 inline-flex items-center gap-1">
            4.9 <svg class="h-4 w-4">{star}</svg>
          </p>
          <p class="text-[0.625rem] text-text-muted leading-7 mt-0.5">متوسّط التقييم</p>
        </div>
        <div class="bg-surface-50 rounded-lg p-3 text-center">
          <p class="text-2xl font-extrabold text-primary-700">7</p>
          <p class="text-[0.625rem] text-text-muted leading-7 mt-0.5">دورات يدرّسها</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Block 5: Pricing matrix (`#cd-pricing`, FR-034 + R10 + R4)

2×2 grid: 2 columns (Arabic / Foreign) × 2 rows (Full / Per-session). Arabic column visually emphasized.

```html
<section id="cd-pricing" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
  <h3 class="text-base md:text-lg font-bold mb-1">خيارات الدفع</h3>
  <p class="text-xs text-text-muted mb-5">اختر الخطة المناسبة لك. الأسعار شاملة الضريبة المضافة 15% للطلاب العرب.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

    <!-- Cell 1: Arabic + Full course (EMPHASIZED) -->
    <article class="bg-accent-50 border-2 border-accent-500 rounded-xl p-5 relative">
      <span class="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-accent-500 text-white px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide">الأنسب لك</span>
      <p class="text-[0.625rem] uppercase tracking-wide text-accent-700 font-bold">طالب عربي · اشتراك كامل</p>
      <p class="mt-2"><span class="text-3xl font-extrabold text-accent-700">600</span> <span class="text-base font-medium">ر.س / شهر</span></p>
      <ul class="text-xs text-text-base leading-7 mt-4 space-y-1">
        <li class="inline-flex items-start gap-1.5"><svg class="h-3 w-3 text-success-600 mt-1">{check}</svg> 12 حصة جماعية / شهر</li>
        <li class="inline-flex items-start gap-1.5"><svg class="h-3 w-3 text-success-600 mt-1">{check}</svg> 10 واجبات + اختبار شهري</li>
        <li class="inline-flex items-start gap-1.5"><svg class="h-3 w-3 text-success-600 mt-1">{check}</svg> شهادة معتمدة عند الإتمام</li>
      </ul>
      <button type="button" class="w-full mt-4 bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors">اشترك الآن</button>
    </article>

    <!-- Cell 2: Foreign + Full course (COMPARISON) -->
    <article class="bg-white border border-slate-200 rounded-xl p-5">
      <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-bold">طالب غير عربي · اشتراك كامل</p>
      <p class="mt-2"><span class="text-2xl font-bold text-text-base">200</span> <span class="text-sm font-medium text-text-muted">USD / شهر</span></p>
      <ul class="text-xs text-text-muted leading-7 mt-4 space-y-1">
        <li>نفس مزايا الاشتراك العربي</li>
        <li>المحتوى يُقدّم بالعربية مع إرشادات إنجليزية</li>
      </ul>
    </article>

    <!-- Cell 3: Arabic + Per-session (EMPHASIZED but secondary) -->
    <article class="bg-white border-2 border-accent-300 rounded-xl p-5">
      <p class="text-[0.625rem] uppercase tracking-wide text-accent-700 font-bold">طالب عربي · حصة فردية</p>
      <p class="mt-2"><span class="text-2xl font-extrabold text-accent-700">75</span> <span class="text-sm font-medium">ر.س / حصة</span></p>
      <ul class="text-xs text-text-base leading-7 mt-4 space-y-1">
        <li>ادفع فقط مقابل الحصص التي تريدها</li>
        <li>مرونة كاملة في الجدولة</li>
        <li>مناسبة للمراجعة والاستعداد للاختبار</li>
      </ul>
      <a href="live-sessions.html" class="block w-full mt-4 text-center border border-accent-500 text-accent-700 hover:bg-accent-50 rounded-lg px-4 py-2.5 text-sm font-bold">احجز حصة</a>
    </article>

    <!-- Cell 4: Foreign + Per-session (COMPARISON) -->
    <article class="bg-white border border-slate-200 rounded-xl p-5">
      <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-bold">طالب غير عربي · حصة فردية</p>
      <p class="mt-2"><span class="text-xl font-bold text-text-base">25</span> <span class="text-sm font-medium text-text-muted">USD / حصة</span></p>
      <ul class="text-xs text-text-muted leading-7 mt-4 space-y-1">
        <li>نفس شروط الحصص الفردية للطلاب العرب</li>
      </ul>
    </article>

  </div>
</section>
```

## Block 6: Included sessions + homework + exams + certificate (`#cd-includes`, FR-035 + FR-036)

```html
<section id="cd-includes" class="grid grid-cols-1 md:grid-cols-3 gap-4">

  <!-- Sub-card 1: Included live sessions (FR-035) -->
  <article class="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
    <header class="flex items-center justify-between gap-2 mb-3">
      <h4 class="text-sm font-bold inline-flex items-center gap-1.5">
        <svg class="h-4 w-4 text-primary-700">{video}</svg>
        الحصص المضمنة
      </h4>
      <a href="live-sessions.html" class="text-[0.625rem] text-accent-700 hover:text-accent-800 font-semibold">عرض الكل</a>
    </header>
    <ul class="space-y-2.5 text-xs">
      <li class="bg-primary-50 border border-primary-100 rounded-lg p-2.5">
        <p class="font-semibold text-text-base">حصة "أحكام الميم الساكنة — تطبيق عملي"</p>
        <p class="text-text-muted mt-0.5">الثلاثاء 28 أبريل 2026 — 7:00 م</p>
        <span class="inline-flex items-center gap-1 rounded-full bg-info-100 text-info-700 px-2 py-0.5 text-[0.5rem] font-semibold mt-1.5">قادم</span>
      </li>
      <li class="border border-slate-200 rounded-lg p-2.5">
        <p class="font-semibold text-text-base">حصة "تطبيق المدّ المنفصل والمتّصل"</p>
        <p class="text-text-muted mt-0.5">الأربعاء 30 أبريل 2026 — 7:00 م</p>
      </li>
    </ul>
  </article>

  <!-- Sub-card 2: Homework + exams (FR-036) -->
  <article class="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
    <h4 class="text-sm font-bold inline-flex items-center gap-1.5 mb-3">
      <svg class="h-4 w-4 text-warning-600">{clipboard-list}</svg>
      الواجبات والاختبارات
    </h4>
    <dl class="space-y-2 text-xs">
      <div class="flex items-center justify-between gap-2 py-1 border-b border-slate-100">
        <dt class="text-text-muted">إجمالي الواجبات</dt>
        <dd class="font-bold text-text-base">10 واجبات</dd>
      </div>
      <div class="flex items-center justify-between gap-2 py-1 border-b border-slate-100">
        <dt class="text-text-muted">إجمالي الاختبارات</dt>
        <dd class="font-bold text-text-base">3 اختبارات شهرية + اختبار نهائي</dd>
      </div>
    </dl>
  </article>

  <!-- Sub-card 3: Certificate -->
  <article class="bg-success-50 rounded-xl border border-success-200 p-5">
    <h4 class="text-sm font-bold inline-flex items-center gap-1.5 mb-3 text-success-700">
      <svg class="h-4 w-4">{award}</svg>
      الشهادة المعتمدة
    </h4>
    <p class="text-xs text-text-base leading-7">
      نعم — ستحصل على شهادة معتمدة من أكاديمية إدارتي عند إتمام جميع الحصص واجتياز
      الاختبار النهائي بتقدير لا يقل عن "جيد جداً".
    </p>
  </article>

</section>
```

## Block 7: Your progress (enrolled-only, `#cd-progress`, FR-037)

```html
<section id="cd-progress" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
  <h3 class="text-base md:text-lg font-bold mb-1">تقدّمك في هذه الدورة</h3>
  <p class="text-xs text-text-muted mb-4">المحطّة الحالية — أحكام الميم الساكنة (تطبيق عملي)</p>

  <div class="mb-2">
    <div class="flex items-baseline justify-between text-sm mb-2">
      <span class="text-text-muted">إجمالي تقدّم المستوى</span>
      <span class="font-extrabold text-2xl text-accent-700">60%</span>
    </div>
    <div class="h-3 rounded-full bg-slate-100 overflow-hidden" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="تقدّمك في هذه الدورة 60%">
      <div class="h-full bg-gradient-to-l from-accent-400 to-accent-600 rounded-full" style="width: 60%;"></div>
    </div>
  </div>

  <a href="my-courses.html" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800">
    متابعة الدورة من حيث توقّفت
    <svg class="h-3.5 w-3.5 rtl:rotate-180">{chevron-left}</svg>
  </a>
</section>
```

## Block 8: Parent confidence snapshot (enrolled-only, `#cd-parent-confidence`, FR-038)

Mirrors Spec 002's parent-confidence card pattern, anchored to the same persona data.

```html
<section id="cd-parent-confidence" class="bg-accent-50 border-s-4 border-accent-500 rounded-2xl p-5 md:p-6 shadow-sm">
  <p class="text-xs uppercase tracking-wide text-accent-700 font-bold inline-flex items-center gap-1.5 mb-3">
    <svg class="h-4 w-4">{users}</svg>
    ملخص يمكن لولي الأمر متابعته
  </p>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    <!-- 4 stat tiles: attendance 92%, homework 85%, last note quote, next evaluation 12 مايو 2026 -->
    <!-- exact same data as dashboard parent-confidence card -->
  </div>
</section>
```

## Inbound / outbound links

**Inbound**: every browse-courses card "عرض التفاصيل"; every my-courses active card "متابعة الدورة"; my-courses completed card "مراجعة الدورة"; live-session-details "Course chip" (the chip linking back to course-details).
**Outbound**: hero "اشتراك في الدورة" → `#cd-pricing` anchor on same page; hero + cell-3 + nothing-blocks "حجز حصة فردية" / "احجز حصة" → `live-sessions.html`; cell-1 "اشترك الآن" → no-op (visual button, no real flow); curriculum, teacher, includes — all visual; "متابعة الدورة من حيث توقّفت" → `my-courses.html`; "عرض الكل" (in includes block) → `live-sessions.html`.
