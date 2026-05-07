# Contract — Learning Journey Page

`pages/student/learning-journey.html` is a single-purpose page: a vertical chronological timeline of student milestones. It reuses the student shell from Spec 001 (with the two new sidebar entries from `student-shell-delta.md`), and contains exactly one content block beneath the header.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-lg mx-auto">

    <!-- Page intro card -->
    <section class="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm mb-6">
      <h2 class="text-lg md:text-xl font-bold leading-tight">رحلتي التعليمية</h2>
      <p class="text-sm text-text-muted leading-7 mt-1">
        كل ما حدث منذ انضمامك للأكاديمية حتى اليوم — مرتّباً من الأقدم إلى الأحدث.
        <strong class="text-text-base">اضغط على أي محطة لقراءة تفاصيلها.</strong>
      </p>
      <!-- Journey stats strip: 4 mini stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        <!-- enrollment date / months active / milestones / certificates -->
      </div>
    </section>

    <!-- The timeline -->
    <ol class="relative ms-4 md:ms-6 border-s-2 border-slate-200">
      <!-- 9 milestone <li> entries -->
    </ol>

  </div>
</main>
```

The intro card carries 4 mini stats:
1. `5 سبتمبر 2025` — `تاريخ الانضمام` (icon: `calendar-plus`).
2. `8 أشهر` — `مدة العضوية` (icon: `clock`).
3. `9` — `محطات مكتملة` (icon: `flag`).
4. `1` — `شهادة معتمدة` (icon: `award`).

## Timeline entry contract

Each `<li>` follows this structure:

```html
<li class="relative ps-6 pb-8 last:pb-0">
  <!-- the rail dot, absolutely positioned over the rail -->
  <span aria-hidden="true"
        class="absolute -start-[9px] top-1.5 h-4 w-4 rounded-full bg-{state}-500 ring-4 ring-{state}-100"></span>

  <!-- the milestone card -->
  <div class="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm">
    <div class="flex items-start justify-between gap-3 flex-wrap">
      <div class="flex items-center gap-2">
        <!-- type icon (small, in a tinted square) -->
        <span class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-{state}-50 text-{state}-700">
          <!-- Lucide icon -->
        </span>
        <h3 class="text-sm md:text-base font-semibold">{titleAr}</h3>
      </div>
      <!-- status badge from Spec 001 catalog -->
      <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-{state}-100 text-{state}-700">
        <!-- status icon --> {statusBadgeAr}
      </span>
    </div>
    <p class="text-xs text-text-muted mt-1">{dateAr} · {relatedCourseAr}</p>
    <p class="text-sm text-text-base leading-7 mt-2">{descriptionAr}</p>
  </div>
</li>
```

`{state}` ∈ {`success`, `accent`, `slate`} per the milestone's status (completed / current / upcoming). Past milestones use `success`; the *current* milestone (last entry — Level 3 start) uses `accent` and carries:
- A larger rail dot (`h-5 w-5`) with a pulsing-style outer ring (pure CSS class: `ring-8 ring-accent-100`).
- A dedicated "حالياً" pill above the title, in `bg-accent-100 text-accent-700`.
- The card border: `border-2 border-accent-500` (instead of the standard `border-slate-200`).

## Mobile vs desktop

- **< 1024 px**: rail and cards stack tightly (`ms-4`, smaller cards). Single column.
- **≥ 1024 px**: rail offset (`ms-6`), cards slightly wider (`p-5`), date+course caption inline with the title row.

No horizontal scrollbar at any breakpoint.

## Required milestones (≥ 9)

Drawn from data-model §E8 in the listed order:

1. الانضمام للأكاديمية (5 سبتمبر 2025) — مكتمل
2. بداية أول دورة (12 سبتمبر 2025) — مكتمل
3. حضور أول حصة مباشرة (15 سبتمبر 2025) — مكتمل
4. تسليم أول واجب (22 سبتمبر 2025) — مكتمل
5. اجتياز اختبار شهري (30 أكتوبر 2025) — ناجح
6. إنهاء المستوى الأول (20 ديسمبر 2025) — ممتاز
7. نيل أول شهادة (5 يناير 2026) — ممتاز
8. نيل وسام 'بطل الواجبات' (10 فبراير 2026) — ممتاز
9. بدء المستوى الثالث (1 أبريل 2026) — حالياً (state = current)

## Bottom navigation

A small "العودة للرئيسية" link below the timeline returns to `dashboard.html`. No "Mark all as read"-style controls — this page is purely informational.
