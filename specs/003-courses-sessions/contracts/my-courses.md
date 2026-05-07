# Contract — My Courses Page

`pages/student/my-courses.html` is the daily pickup surface for active students — "where do I continue from?" — bridging the dashboard's "متابعة التعلم" CTA and any specific course-details page.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-8">

    <!-- Section 1: Active courses -->
    <section id="mc-active">
      <header class="flex items-center justify-between gap-4 mb-4">
        <h2 class="text-lg md:text-xl font-bold leading-tight">دوراتي النشطة <span class="text-sm font-normal text-text-muted">(3)</span></h2>
        <a href="browse-courses.html" class="text-sm font-medium text-accent-700 hover:text-accent-800 inline-flex items-center gap-1">
          استعرض دورات أخرى
          <svg class="h-3.5 w-3.5 rtl:rotate-180">{chevron-left}</svg>
        </a>
      </header>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- 3 active course cards -->
      </div>
    </section>

    <!-- Section 2: Completed courses -->
    <section id="mc-completed">
      <header class="mb-4">
        <h2 class="text-lg md:text-xl font-bold leading-tight">دورات أكملتها <span class="text-sm font-normal text-text-muted">(1)</span></h2>
      </header>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- 1 completed course card -->
      </div>
    </section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: **active entry = "دوراتي"**.
- `<title>` = `دوراتي — منصة إدارتي`; h1 = `دوراتي`; subtitle = `3 دورات نشطة + 1 دورة مكتملة`.

## Active course card contract (FR-021, FR-023)

```html
<article class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">

  <!-- Header row: course title + payment-model caption + level pill -->
  <div class="flex items-start justify-between gap-3 mb-3">
    <div class="min-w-0">
      <h3 class="text-base font-bold text-text-base leading-tight">{titleAr}</h3>
      <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-semibold mt-1">
        {paymentModelLabelAr}  <!-- اشتراك كامل / حصص مدفوعة فردياً -->
      </p>
    </div>
    <span class="inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[0.625rem] font-semibold flex-shrink-0">
      {levelLabelAr}
    </span>
  </div>

  <!-- Teacher row -->
  <div class="flex items-center gap-2 mb-4">
    <div class="h-8 w-8 rounded-full bg-primary-700 text-white inline-flex items-center justify-center text-xs font-semibold">أ.أ</div>
    <div class="text-xs">
      <p class="font-semibold text-text-base leading-tight">{teacherNameAr}</p>
      <p class="text-text-muted leading-tight">{teacherTitleAr}</p>
    </div>
  </div>

  <!-- Progress bar -->
  <div class="mb-3">
    <div class="flex items-baseline justify-between text-xs mb-1.5">
      <span class="text-text-muted">التقدّم في الدورة</span>
      <span class="font-bold text-text-base">{currentLevelProgressPct}%</span>
    </div>
    <div class="h-2 rounded-full bg-slate-100 overflow-hidden" role="progressbar" aria-valuenow="{progress}" aria-valuemin="0" aria-valuemax="100">
      <div class="h-full bg-success-500 rounded-full" style="width: {progress}%;"></div>
    </div>
    <!-- For per-session model, additional caption: -->
    <p class="text-[0.625rem] text-text-muted mt-1.5">3 من 8 حصص مدفوعة مكتملة</p>
  </div>

  <!-- Next lesson/session row -->
  <div class="flex items-start gap-2 bg-primary-50 border border-primary-100 rounded-lg p-3 mb-3">
    <svg class="h-4 w-4 text-primary-700 flex-shrink-0 mt-0.5">{video}</svg>
    <div class="text-xs flex-1 min-w-0">
      <p class="text-text-muted">الدرس القادم</p>
      <p class="font-semibold text-text-base leading-tight mt-0.5 truncate">{nextLessonTitleAr}</p>
      <p class="text-text-muted leading-tight">{nextLessonDateAr}</p>
    </div>
  </div>

  <!-- Footer row: homework count badge + teacher note preview -->
  <div class="flex items-center gap-3 mb-4 text-xs">
    <span class="inline-flex items-center gap-1 rounded-full bg-warning-100 text-warning-700 px-2 py-0.5 text-[0.625rem] font-semibold">
      <svg class="h-3 w-3">{clipboard-list}</svg>
      {homeworkCount} واجبات مستحقة
    </span>
  </div>
  <p class="text-xs text-text-muted leading-7 mb-4 italic line-clamp-2">
    "{teacherNotePreviewAr}" — {teacherNameShort}
  </p>

  <!-- Primary CTA -->
  <a href="course-details.html" class="mt-auto inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors">
    متابعة الدورة
    <svg class="h-4 w-4 rtl:rotate-180">{chevron-left}</svg>
  </a>

</article>
```

## Active card inventory

Per `research.md §R9`, 3 active courses:

1. **القرآن الكريم — أحكام الميم الساكنة** — اشتراك كامل, 60% — Next lesson: حصة "أحكام الميم الساكنة — تطبيق عملي" (28 أبريل 2026, 7:00 م) — 3 واجبات — teacher note preview.
2. **اللغة العربية — البلاغة والإنشاء** — اشتراك كامل, 35% — Next lesson: درس "علم البديع — المحسّنات اللفظية" (29 أبريل 2026, 6:00 م) — 1 واجب — teacher note preview.
3. **الدراسات الإسلامية — السيرة النبوية** — حصص مدفوعة فردياً (3/8 sessions paid), 38% — Next session: حصة "غزوة بدر الكبرى — التحليل" (2 مايو 2026, 4:00 م) — 0 واجبات — teacher note preview.

## Completed course card contract (FR-022)

```html
<article class="bg-success-50 rounded-2xl border-s-4 border-success-500 border-slate-200 p-5">

  <div class="flex items-start gap-3">
    <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success-100 text-success-700 flex-shrink-0">
      <svg class="h-6 w-6">{award}</svg>
    </span>

    <div class="flex-1 min-w-0">
      <h3 class="text-base font-bold text-text-base leading-tight">{titleAr}</h3>
      <p class="text-xs text-text-muted leading-tight mt-0.5">{teacherNameAr}</p>

      <div class="flex items-center gap-2 mt-2">
        <span class="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2 py-0.5 text-[0.625rem] font-semibold">
          <svg class="h-3 w-3">{check-circle-2}</svg>
          مكتمل
        </span>
        <span class="inline-flex items-center rounded-full bg-accent-100 text-accent-700 px-2 py-0.5 text-[0.625rem] font-semibold">
          {finalGradeLabelAr}  <!-- ممتاز -->
        </span>
      </div>

      <p class="text-xs text-text-muted mt-2">أُنجزت في {completionDateAr}</p>
    </div>
  </div>

  <div class="flex flex-wrap gap-2 mt-4">
    <a href="achievements.html" class="inline-flex items-center gap-1.5 bg-white border border-success-200 text-success-700 hover:bg-success-50 rounded-lg px-3 py-2 text-xs font-semibold">
      <svg class="h-3.5 w-3.5">{award}</svg>
      عرض الشهادة
    </a>
    <a href="course-details.html" class="inline-flex items-center gap-1.5 text-text-muted hover:text-text-base text-xs font-semibold py-2">
      مراجعة الدورة
      <svg class="h-3.5 w-3.5 rtl:rotate-180">{chevron-left}</svg>
    </a>
  </div>

</article>
```

## Completed card inventory

1. **القرآن الكريم — أساسيات التلاوة والتجويد (المستوى الأول)** — Completed 20 ديسمبر 2025 — Final grade ممتاز — Certificate available.

## Inbound / outbound links

**Inbound**: sidebar "دوراتي", dashboard hero "متابعة التعلم", browse-courses card "عرض التفاصيل" (indirectly).
**Outbound**: each active card "متابعة الدورة" → `course-details.html`; completed card "عرض الشهادة" → `achievements.html` (Spec 001 placeholder shell), "مراجعة الدورة" → `course-details.html`; "استعرض دورات أخرى" → `browse-courses.html`.
