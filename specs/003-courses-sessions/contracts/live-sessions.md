# Contract — Live Sessions Page

`pages/student/live-sessions.html` is the canonical schedule view — a 3-tab interface (قادمة / مكتملة / فائتة) plus a list/calendar view toggle plus a 5-control filter bar. The 3-tab UI uses the existing `data-tabs` ARIA-tablist handler from `assets/js/main.js` (Spec 001). Zero new JS.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <!-- Block 1: Filter bar -->
    <section id="ls-filters">...</section>

    <!-- Block 2: View toggle (list / calendar) -->
    <section id="ls-view-toggle">...</section>

    <!-- Block 3: Tabs (قادمة / مكتملة / فائتة) — list view -->
    <section id="ls-tabs">
      <div role="tablist">...</div>
      <div data-tabpanels>
        <div role="tabpanel" id="tab-upcoming">...</div>
        <div role="tabpanel" id="tab-completed" class="hidden">...</div>
        <div role="tabpanel" id="tab-missed" class="hidden">...</div>
      </div>
    </section>

    <!-- Block 4: Calendar view (mai 2026 month grid) -->
    <section id="ls-calendar" class="lg:hidden">...</section>
    <!--
      At lg+, the calendar view is rendered ALONGSIDE the tabs (visible always).
      At < lg, it stacks below.
      The view-toggle segmented control is purely a visual hint; both views are
      always present in the DOM.
    -->

  </div>
</main>
```

## Sidebar / header

- Sidebar: **active entry = "الحصص المباشرة"**.
- `<title>` = `الحصص المباشرة — منصة إدارتي`; h1 = `الحصص المباشرة`; subtitle = `جدول حصصك القادمة، المكتملة، والفائتة`.

## Block 1: Filter bar (`#ls-filters`, FR-042)

5 filter controls in a responsive flex row. All visual-only (no JS, no real filtering).

```html
<section id="ls-filters" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
  <div class="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
    <p class="text-xs font-semibold text-text-muted shrink-0 uppercase tracking-wide">تصفية بـ</p>

    <!-- 5 dropdowns -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 flex-1">
      <select class="rounded-lg border-slate-300 text-sm bg-surface-50 ps-3 pe-8 py-2 focus:border-accent-500 focus:ring-accent-500">
        <option>كل الدورات</option>
        <option>القرآن الكريم — المستوى الثالث</option>
        <option>اللغة العربية — البلاغة</option>
        <option>الدراسات الإسلامية — السيرة</option>
      </select>
      <select class="...">
        <option>كل المعلمين</option>
        <option>الأستاذ أحمد بن عبد الله</option>
      </select>
      <select class="...">
        <option>كل الأنواع</option>
        <option>جماعية</option>
        <option>خاصة</option>
      </select>
      <select class="...">
        <option>كل الحالات</option>
        <option>قادمة</option>
        <option>مكتملة</option>
        <option>فائتة</option>
      </select>
      <select class="...">
        <option>أبريل 2026</option>
        <option>مايو 2026</option>
        <option>يونيو 2026</option>
      </select>
    </div>
  </div>
</section>
```

## Block 2: View toggle (`#ls-view-toggle`, FR-044 + R11)

CSS-only segmented control — purely visual.

```html
<section id="ls-view-toggle" class="flex items-center justify-between gap-3">
  <div class="inline-flex rounded-xl bg-surface-100 border border-slate-200 p-1">
    <button type="button" class="inline-flex items-center gap-1.5 rounded-lg bg-white shadow-sm px-3 py-1.5 text-xs font-semibold text-text-base">
      <svg class="h-3.5 w-3.5">{list}</svg>
      عرض القائمة
    </button>
    <button type="button" class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-text-muted hover:text-text-base">
      <svg class="h-3.5 w-3.5">{calendar}</svg>
      عرض التقويم
    </button>
  </div>

  <p class="text-xs text-text-muted hidden md:block">آخر تحديث: اليوم — 2:00 م</p>
</section>
```

The first button is "active" (white card-like background); the second is "inactive" (muted text). Pure visual; no JS state.

## Block 3: Tabs structure (`#ls-tabs`, FR-040 + FR-041 + R3)

ARIA tablist using the existing handler. Counts in tab labels.

```html
<section id="ls-tabs" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

  <!-- Tablist -->
  <div role="tablist" class="flex border-b border-slate-200 bg-surface-50 px-2 pt-2">
    <button role="tab" type="button"
            id="tab-trigger-upcoming"
            aria-selected="true"
            aria-controls="tab-upcoming"
            class="is-active relative inline-flex items-center gap-1.5 rounded-t-lg px-4 py-2.5 text-sm font-semibold text-text-base bg-white border border-b-0 border-slate-200">
      قادمة
      <span class="inline-flex items-center justify-center min-w-[1.5rem] h-5 rounded-full bg-info-100 text-info-700 px-1.5 text-[0.625rem] font-bold">3</span>
    </button>
    <button role="tab" type="button"
            id="tab-trigger-completed"
            aria-selected="false"
            aria-controls="tab-completed"
            class="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-text-muted hover:text-text-base transition-colors">
      مكتملة
      <span class="inline-flex items-center justify-center min-w-[1.5rem] h-5 rounded-full bg-success-100 text-success-700 px-1.5 text-[0.625rem] font-bold">2</span>
    </button>
    <button role="tab" type="button"
            id="tab-trigger-missed"
            aria-selected="false"
            aria-controls="tab-missed"
            class="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-text-muted hover:text-text-base transition-colors">
      فائتة
      <span class="inline-flex items-center justify-center min-w-[1.5rem] h-5 rounded-full bg-danger-100 text-danger-700 px-1.5 text-[0.625rem] font-bold">2</span>
    </button>
  </div>

  <!-- Tabpanels -->
  <div data-tabpanels class="p-4 md:p-5">

    <div role="tabpanel" id="tab-upcoming" aria-labelledby="tab-trigger-upcoming" class="space-y-3">
      <!-- 3 upcoming session rows -->
    </div>

    <div role="tabpanel" id="tab-completed" aria-labelledby="tab-trigger-completed" class="hidden space-y-3">
      <!-- 2 completed session rows -->
    </div>

    <div role="tabpanel" id="tab-missed" aria-labelledby="tab-trigger-missed" class="hidden space-y-3">
      <!-- 2 missed session rows -->
    </div>

  </div>
</section>
```

The handler in `main.js` toggles `aria-selected`, `is-active`, and `hidden` on click — exactly what's needed.

## Session row contract (used in all three tabs)

```html
<article class="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-surface-50 transition-colors">

  <!-- Date block (date strip on md+, inline on mobile) -->
  <div class="flex md:flex-col items-center md:items-start gap-2 md:gap-0 flex-shrink-0 md:w-20">
    <p class="text-2xl md:text-3xl font-extrabold text-primary-700 leading-none">28</p>
    <p class="text-xs text-text-muted">أبريل 2026</p>
  </div>

  <!-- Vertical divider (md+) -->
  <div class="hidden md:block h-12 w-px bg-slate-200" aria-hidden="true"></div>

  <!-- Body -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 flex-wrap">
      <h4 class="text-sm md:text-base font-bold text-text-base">{titleAr}</h4>

      <!-- Type pill -->
      <span class="inline-flex items-center rounded-full bg-info-100 text-info-700 px-2 py-0.5 text-[0.625rem] font-semibold">{typeLabelAr}</span>

      <!-- Status pill (one of: قادم/مكتمل/فائت/ملغاة) -->
      <span class="inline-flex items-center gap-1 rounded-full bg-{status-token}-100 text-{status-token}-700 px-2 py-0.5 text-[0.625rem] font-semibold">
        <svg class="h-3 w-3">{status-icon}</svg>
        {statusLabelAr}
      </span>
    </div>

    <p class="text-xs text-text-muted mt-1">
      {courseTitleAr} · 7:00 م إلى 8:00 م · 60 دقيقة
    </p>

    <div class="flex items-center gap-2 mt-2">
      <div class="h-6 w-6 rounded-full bg-primary-700 text-white inline-flex items-center justify-center text-[0.5rem] font-semibold">أ.أ</div>
      <p class="text-xs text-text-muted">{teacherNameAr}</p>
    </div>

    <!-- For per-session paid: price tag -->
    <p class="mt-2 inline-flex items-center gap-1 rounded-full bg-accent-50 text-accent-700 px-2 py-0.5 text-[0.625rem] font-bold">
      75 ر.س / حصة · حالة الدفع: <span class="text-warning-700">بانتظار الدفع</span>
    </p>
    <!-- For included: simple caption -->
    <p class="mt-2 text-[0.625rem] text-success-700 font-semibold inline-flex items-center gap-1">
      <svg class="h-3 w-3">{check-circle}</svg> مشمولة في الاشتراك
    </p>
  </div>

  <!-- Action area -->
  <div class="flex items-center gap-2 flex-shrink-0 self-stretch md:self-center">
    <a href="live-session-details.html" class="inline-flex items-center gap-1.5 border border-slate-300 hover:bg-surface-50 text-text-base rounded-lg px-3 py-2 text-xs font-semibold">
      عرض التفاصيل
    </a>

    <!-- Upcoming + within join window: enabled-looking join button -->
    <button type="button" class="inline-flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white rounded-lg px-3 py-2 text-xs font-semibold">
      <svg class="h-3.5 w-3.5">{video}</svg>
      انضمام
    </button>

    <!-- Per-session paid + unpaid: "حجز" CTA -->
    <a href="session-checkout-preview.html" class="inline-flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-lg px-3 py-2 text-xs font-bold">
      حجز
    </a>

    <!-- Missed: "إعادة الجدولة" -->
    <a href="live-session-details.html" class="inline-flex items-center gap-1.5 text-warning-700 hover:text-warning-800 text-xs font-semibold">
      <svg class="h-3.5 w-3.5">{calendar-clock}</svg>
      إعادة الجدولة
    </a>
  </div>

</article>
```

## Status token map (FR-074)

| status | statusLabelAr | colorToken | icon |
|---|---|---|---|
| upcoming | قادم | info | calendar |
| completed | مكتمل | success | check-circle-2 |
| missed | فائت | slate | calendar-x |
| cancelled | ملغاة | danger | x-circle |

## Tab content inventory (data-model E4-A)

**Upcoming tab (3 rows)**:
1. حصة "أحكام الميم الساكنة — تطبيق عملي" — 28 أبريل 2026 — جماعية — included → "عرض التفاصيل" + "انضمام" (enabled)
2. حصة "تطبيق المدّ المنفصل والمتّصل" — 30 أبريل 2026 — جماعية — included → "عرض التفاصيل" + "انضمام" (visually muted; outside join window)
3. حصة "مراجعة خاصة 1: تطبيق أحكام الميم الساكنة" — 1 مايو 2026 — خاصة — per-session paid (UNPAID) → "عرض التفاصيل" + "حجز" (links to checkout)

**Completed tab (2 rows)**:
4. حصة "حفظ سورة النبأ" — 24 أبريل 2026 — جماعية — حضر → "عرض التفاصيل"
5. حصة "تجويد سورة الواقعة" — 17 أبريل 2026 — جماعية — حضر — recording متاح → "عرض التفاصيل"

**Missed tab (2 rows)**:
6. حصة "أحكام النون الساكنة — مراجعة" — 22 أبريل 2026 — جماعية — لم يحضر بسبب انقطاع الإنترنت → "عرض التفاصيل" + "إعادة الجدولة"
7. حصة "تجويد سورة الواقعة" — 15 أبريل 2026 — جماعية — لم يحضر بدون عذر → "عرض التفاصيل" + "إعادة الجدولة"

## Block 4: Calendar view (`#ls-calendar`, R11)

A 7-column month grid for مايو 2026, with session-marker dots on session dates.

```html
<section id="ls-calendar" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
  <header class="flex items-center justify-between mb-4">
    <h3 class="text-base font-bold">عرض التقويم — مايو 2026</h3>
    <div class="flex items-center gap-2">
      <button type="button" aria-label="الشهر السابق" class="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-surface-50">
        <svg class="h-4 w-4 rtl:rotate-180">{chevron-left}</svg>
      </button>
      <button type="button" aria-label="الشهر التالي" class="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-surface-50">
        <svg class="h-4 w-4 rtl:rotate-180">{chevron-right}</svg>
      </button>
    </div>
  </header>

  <!-- Days of week header -->
  <div class="grid grid-cols-7 gap-1 mb-2 text-[0.625rem] font-semibold text-text-muted text-center">
    <div>السبت</div><div>الأحد</div><div>الإثنين</div><div>الثلاثاء</div><div>الأربعاء</div><div>الخميس</div><div>الجمعة</div>
  </div>

  <!-- Month grid: 5 weeks × 7 days for مايو 2026 -->
  <div class="grid grid-cols-7 gap-1">
    <!-- Day cells with session dots -->
    <div class="aspect-square rounded-lg border border-slate-100 p-1.5 flex flex-col">
      <span class="text-xs text-text-base font-semibold">1</span>
      <span class="mt-auto h-1.5 w-1.5 rounded-full bg-accent-500" aria-label="حصة خاصة"></span>
    </div>
    <!-- ... -->
  </div>

  <!-- Legend -->
  <div class="flex items-center justify-center gap-4 mt-4 text-[0.625rem] text-text-muted">
    <span class="inline-flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-success-500"></span> حصة جماعية</span>
    <span class="inline-flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-accent-500"></span> حصة خاصة</span>
    <span class="inline-flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-danger-500"></span> اختبار</span>
  </div>
</section>
```

Calendar dates with markers (anchored to data-model.md):
- 1 مايو (accent — bundle session 1)
- 2 مايو (accent — bundle session 2)
- 3 مايو (accent — bundle session 3)
- 4 مايو (accent — bundle session 4)
- **5 مايو** (danger — monthly exam)
- 6 مايو (success — group session)
- 8 مايو (success)
- 12 مايو (success)
- 15 مايو (success)
- 22 مايو (success)

## Inbound / outbound links

**Inbound**: sidebar "الحصص المباشرة"; dashboard upcoming-session card "عرض كل الحصص"; course-details "حجز حصة فردية" and "عرض الكل"; weekly-plan "عرض كل الحصص".
**Outbound**: every row "عرض التفاصيل" → `live-session-details.html`; per-session paid + unpaid → "حجز" → `session-checkout-preview.html`; missed → "إعادة الجدولة" → `live-session-details.html`; "انضمام" buttons are visual-only (no real meeting integration).
