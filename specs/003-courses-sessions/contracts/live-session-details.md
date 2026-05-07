# Contract — Live Session Details Page

`pages/student/live-session-details.html` is the per-session command center. It showcases **bundle session #1** (مراجعة خاصة 1: تطبيق أحكام الميم الساكنة) per Q4 + Q5 clarifications. The page shows the upcoming-state markup as primary; a small inline annotation describes the completed-state variant per R12.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-lg mx-auto space-y-6">

    <!-- Block 1: Hero -->
    <section id="lsd-hero">...</section>

    <!-- Block 2: Action area (join + add to calendar + copy link) -->
    <section id="lsd-actions">...</section>

    <!-- Block 3: Payment status block (per-session paid, unpaid) -->
    <section id="lsd-payment">...</section>

    <!-- Block 4: Preparation checklist -->
    <section id="lsd-prep">...</section>

    <!-- Block 5: Linked homework -->
    <section id="lsd-homework">...</section>

    <!-- Block 6: Completed-state annotation (the variant preview) -->
    <section id="lsd-completed-preview">...</section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: **NO active entry** (drill-down).
- `<title>` = `مراجعة خاصة 1: تطبيق أحكام الميم الساكنة — منصة إدارتي`; h1 = `مراجعة خاصة 1: تطبيق أحكام الميم الساكنة`; subtitle = `حصة 1 من 4 ضمن حزمة المراجعة الشهرية`.

## Block 1: Hero (`#lsd-hero`, FR-050)

```html
<section id="lsd-hero" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">

  <!-- Pills row -->
  <div class="flex flex-wrap items-center gap-2 mb-3">
    <span class="inline-flex items-center gap-1 rounded-full bg-accent-100 text-accent-700 px-2.5 py-1 text-xs font-semibold">
      <svg class="h-3 w-3">{user}</svg>
      خاصة (1:1)
    </span>
    <span class="inline-flex items-center rounded-full bg-info-100 text-info-700 px-2.5 py-1 text-xs font-semibold">
      <svg class="h-3 w-3">{layers}</svg>
      ضمن حزمة المراجعة الشهرية (1 من 4)
    </span>
    <span class="inline-flex items-center gap-1 rounded-full bg-info-50 text-info-700 px-2.5 py-1 text-xs font-semibold">
      <svg class="h-3 w-3">{calendar}</svg>
      قادم
    </span>
  </div>

  <h2 class="text-xl md:text-2xl font-bold leading-tight">مراجعة خاصة 1: تطبيق أحكام الميم الساكنة</h2>

  <!-- Course chip linking back -->
  <a href="course-details.html" class="mt-2 inline-flex items-center gap-1.5 text-xs text-accent-700 hover:text-accent-800 font-semibold">
    <svg class="h-3.5 w-3.5">{book-open}</svg>
    القرآن الكريم — المستوى الثالث
  </a>

  <!-- Date + duration row -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    <div class="flex items-start gap-2.5">
      <svg class="h-5 w-5 text-primary-700 flex-shrink-0 mt-0.5">{calendar}</svg>
      <div>
        <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-semibold">الموعد</p>
        <p class="text-sm font-semibold text-text-base">الجمعة 1 مايو 2026</p>
        <p class="text-xs text-text-muted">5:00 م إلى 6:00 م</p>
      </div>
    </div>

    <div class="flex items-start gap-2.5">
      <svg class="h-5 w-5 text-primary-700 flex-shrink-0 mt-0.5">{clock}</svg>
      <div>
        <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-semibold">المدّة</p>
        <p class="text-sm font-semibold text-text-base">60 دقيقة</p>
      </div>
    </div>
  </div>

  <!-- Teacher row -->
  <div class="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
    <div class="h-10 w-10 rounded-full bg-primary-700 text-white inline-flex items-center justify-center text-sm font-bold">أ.أ</div>
    <div>
      <p class="text-sm font-semibold text-text-base">الأستاذ أحمد بن عبد الله</p>
      <p class="text-xs text-text-muted">معلم القرآن الكريم — معتمد من جامعة الإمام</p>
    </div>
  </div>

</section>
```

## Block 2: Action area (`#lsd-actions`, FR-051)

```html
<section id="lsd-actions" class="flex flex-col sm:flex-row flex-wrap gap-3">

  <!-- Primary: join button (enabled-looking) -->
  <button type="button" class="inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white rounded-xl px-5 py-3 text-sm font-bold transition-colors">
    <svg class="h-4 w-4">{video}</svg>
    انضمام إلى الحصة
  </button>

  <!-- Secondary: add to calendar -->
  <a href="calendar.html" class="inline-flex items-center justify-center gap-2 border border-slate-300 hover:bg-surface-50 text-text-base rounded-xl px-5 py-3 text-sm font-semibold transition-colors">
    <svg class="h-4 w-4">{calendar-plus}</svg>
    إضافة للتقويم
  </a>

  <!-- Tertiary: copy meeting link -->
  <button type="button" class="inline-flex items-center justify-center gap-2 text-accent-700 hover:text-accent-800 text-sm font-semibold transition-colors px-3 py-3">
    <svg class="h-4 w-4">{link}</svg>
    نسخ رابط الاجتماع
  </button>

</section>
```

## Block 3: Payment status block (`#lsd-payment`, FR-055)

Since the bundle is unpaid:

```html
<section id="lsd-payment" class="bg-warning-50 border-s-4 border-warning-500 rounded-2xl p-5 shadow-sm">
  <div class="flex items-start justify-between gap-4 flex-wrap">
    <div class="flex-1 min-w-0">
      <p class="inline-flex items-center gap-1.5 rounded-full bg-warning-100 text-warning-700 px-2.5 py-1 text-xs font-bold">
        <svg class="h-3 w-3">{alarm-clock}</svg>
        بانتظار الدفع — حجز حزمة المراجعة الشهرية
      </p>
      <p class="text-sm text-text-base leading-7 mt-2">
        هذه الحصة جزء من <span class="font-bold">حزمة المراجعة الشهرية</span> — يلزم
        حجز الحزمة كاملة (4 حصص) للوصول إلى أيٍّ منها.
      </p>
      <p class="text-xs text-text-muted mt-2">
        4 حصص × 75 ر.س + ضريبة 15% = <span class="font-bold text-text-base">345 ر.س</span>
      </p>
    </div>
    <a href="session-checkout-preview.html" class="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors flex-shrink-0">
      إتمام الدفع
      <svg class="h-4 w-4 rtl:rotate-180">{chevron-left}</svg>
    </a>
  </div>
</section>
```

## Block 4: Preparation checklist (`#lsd-prep`, FR-052)

≥ 3 items per data-model E12. Disabled checkboxes reflect doneState.

```html
<section id="lsd-prep" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
  <h3 class="text-base font-bold mb-3 inline-flex items-center gap-1.5">
    <svg class="h-4 w-4 text-primary-700">{list-checks}</svg>
    قبل الحصة (4 خطوات)
  </h3>
  <ul class="space-y-2.5">

    <li class="flex items-center gap-3 py-1.5">
      <input type="checkbox" disabled checked class="h-4 w-4 rounded border-slate-300 text-success-600" aria-label="مكتمل" />
      <span class="text-sm leading-7 text-text-muted line-through">راجع آيات الجزء 30 من الآية 1 إلى 20 (سورة النبأ)</span>
    </li>
    <li class="flex items-center gap-3 py-1.5">
      <input type="checkbox" disabled checked class="h-4 w-4 rounded border-slate-300 text-success-600" aria-label="مكتمل" />
      <span class="text-sm leading-7 text-text-muted line-through">حضّر السؤال الأول من الواجب الأخير (تطبيق إخفاء الميم)</span>
    </li>
    <li class="flex items-center gap-3 py-1.5">
      <input type="checkbox" disabled class="h-4 w-4 rounded border-slate-300" aria-label="غير مكتمل" />
      <span class="text-sm leading-7 text-text-base">تأكّد من جودة الكاميرا والميكروفون قبل الموعد بـ 10 دقائق</span>
    </li>
    <li class="flex items-center gap-3 py-1.5">
      <input type="checkbox" disabled class="h-4 w-4 rounded border-slate-300" aria-label="غير مكتمل" />
      <span class="text-sm leading-7 text-text-base">اختر مكاناً هادئاً مع إضاءة كافية</span>
    </li>

  </ul>
</section>
```

## Block 5: Linked homework (`#lsd-homework`, FR-053)

≥ 1 linked homework card per data-model E13.

```html
<section id="lsd-homework" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
  <h3 class="text-base font-bold mb-3 inline-flex items-center gap-1.5">
    <svg class="h-4 w-4 text-warning-600">{clipboard-list}</svg>
    الواجب المرتبط
  </h3>

  <article class="flex items-start gap-3 p-3 rounded-lg border border-slate-200">
    <span class="inline-flex h-9 w-9 items-center justify-center rounded-md bg-warning-50 text-warning-700 flex-shrink-0">
      <svg class="h-5 w-5">{file-text}</svg>
    </span>
    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-semibold text-text-base">تطبيق أحكام الميم الساكنة في سورة النبأ</h4>
      <p class="text-xs text-text-muted mt-0.5">يُستحق: الخميس 30 أبريل 2026 — الأستاذ أحمد بن عبد الله</p>
      <span class="inline-flex items-center gap-1 rounded-full bg-info-100 text-info-700 px-2 py-0.5 text-[0.625rem] font-semibold mt-1.5">
        <svg class="h-3 w-3">{eye}</svg>
        قيد المراجعة
      </span>
    </div>
    <a href="assignments.html" class="inline-flex items-center gap-1 text-xs font-semibold text-accent-700 hover:text-accent-800 self-center flex-shrink-0">
      عرض الواجب
      <svg class="h-3.5 w-3.5 rtl:rotate-180">{chevron-left}</svg>
    </a>
  </article>
</section>
```

## Block 6: Completed-state annotation (`#lsd-completed-preview`, FR-054 + R12)

The single-page upcoming-variant + annotation pattern.

```html
<aside id="lsd-completed-preview" class="bg-info-50 border border-info-200 rounded-2xl p-5">
  <p class="inline-flex items-center gap-1.5 rounded-full bg-info-100 text-info-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wide">
    <svg class="h-3 w-3">{eye}</svg>
    معاينة الحالة بعد انتهاء الحصة
  </p>
  <p class="text-sm text-text-base leading-7 mt-3">
    عند اكتمال الحصة، يُستبدل زر "انضمام إلى الحصة" بمؤشّر حضورك (تمّ الحضور /
    لم تحضر)، ويظهر قسم "ملاحظات المعلم" بتعليق الأستاذ أحمد، وزر "عرض التسجيل"
    (أو نص "التسجيل غير متاح" إن لم يكن متوفّراً).
  </p>

  <!-- Mini visual preview of the after-state -->
  <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">

    <div class="bg-white rounded-lg p-3 border border-slate-200">
      <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-semibold mb-1">سيتغيّر</p>
      <span class="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2 py-0.5 text-[0.625rem] font-bold">
        <svg class="h-3 w-3">{check-circle-2}</svg>
        تمّ الحضور
      </span>
    </div>

    <div class="bg-white rounded-lg p-3 border border-slate-200">
      <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-semibold mb-1">سيُضاف</p>
      <p class="text-xs text-text-base leading-7 italic">
        "أداء عبد الرحمن في تطبيق إخفاء الميم كان ممتازاً..."
      </p>
    </div>

    <div class="bg-white rounded-lg p-3 border border-slate-200">
      <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-semibold mb-1">سيُضاف</p>
      <button type="button" class="inline-flex items-center gap-1 text-xs text-accent-700 font-semibold">
        <svg class="h-3 w-3">{play}</svg>
        عرض التسجيل
      </button>
    </div>

  </div>
</aside>
```

## Inbound / outbound links

**Inbound**: every live-sessions row "عرض التفاصيل"; missed-row "إعادة الجدولة"; dashboard upcoming-session card "تفاصيل"; weekly-plan upcoming-session card.
**Outbound**: course chip → `course-details.html`; "إضافة للتقويم" → `calendar.html`; payment-status block "إتمام الدفع" → `session-checkout-preview.html`; "عرض الواجب" → `assignments.html`; "انضمام إلى الحصة" + "نسخ رابط الاجتماع" + "عرض التسجيل" are visual-only (no real meeting/recording integration).
