# Contract — Session Checkout Preview Page

`pages/student/session-checkout-preview.html` is a **visual prototype only** — no real payment processing. It anchors to the **حزمة المراجعة الشهرية 4-session bundle** (Q4 + Q5 clarifications) with default state: 345 ر.س subtotal, 200 ر.س family-balance applied, **145 ر.س due** → payment-method radios stay active.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-md mx-auto space-y-5">

    <!-- Page intro: prototype notice + back link -->
    <section id="cp-intro">...</section>

    <!-- Block 1: Booking summary (the bundle) -->
    <section id="cp-summary">...</section>

    <!-- Block 2: Student-type indicator + price for that type -->
    <section id="cp-student-type">...</section>

    <!-- Block 3: Price calculation (base → tax → subtotal) -->
    <section id="cp-pricing">...</section>

    <!-- Block 4: Family prepaid balance -->
    <section id="cp-balance">...</section>

    <!-- Block 5: Amount due -->
    <section id="cp-amount-due">...</section>

    <!-- Block 6: Payment methods -->
    <section id="cp-payment-methods">...</section>

    <!-- Block 7: Confirm + cancel + prototype notice -->
    <section id="cp-confirm">...</section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: **NO active entry** (drill-down).
- `<title>` = `إتمام حجز حزمة المراجعة الشهرية — منصة إدارتي`; h1 = `إتمام حجز حزمة المراجعة الشهرية`; subtitle = `145 ر.س مستحق بعد خصم رصيد العائلة`.

## Page intro (`#cp-intro`, FR-066)

```html
<section id="cp-intro" class="bg-info-50 border border-info-200 rounded-2xl p-4 flex items-start gap-3">
  <svg class="h-5 w-5 text-info-700 flex-shrink-0 mt-0.5">{info}</svg>
  <div class="flex-1">
    <p class="text-sm font-semibold text-info-700">شاشة عرض تجريبية</p>
    <p class="text-xs text-text-base leading-7 mt-0.5">
      هذه صفحة معاينة لتجربة الدفع — لا يتمّ تنفيذ أيّ عملية دفع فعلية في هذا
      النموذج الأوّلي. الزر "تأكيد الحجز" بصري فقط.
    </p>
  </div>
</section>
```

## Block 1: Booking summary (`#cp-summary`, FR-060)

Lists the bundle title + all 4 sessions inside.

```html
<section id="cp-summary" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
  <header class="flex items-start justify-between gap-3 mb-4">
    <div>
      <p class="text-[0.625rem] uppercase tracking-wide text-text-muted font-semibold mb-1">ملخص الحجز</p>
      <h2 class="text-lg md:text-xl font-bold leading-tight">حزمة المراجعة الشهرية</h2>
      <p class="text-xs text-text-muted leading-7 mt-1">
        أربع حصص مراجعة خاصة 1:1 مع الأستاذ أحمد قبل الاختبار الشهري
      </p>
    </div>
    <span class="inline-flex items-center gap-1 rounded-full bg-accent-100 text-accent-700 px-2.5 py-1 text-xs font-semibold flex-shrink-0">
      <svg class="h-3 w-3">{user}</svg>
      خاصة
    </span>
  </header>

  <!-- Course chip -->
  <a href="course-details.html" class="inline-flex items-center gap-1.5 text-xs text-accent-700 hover:text-accent-800 font-semibold mb-3">
    <svg class="h-3.5 w-3.5">{book-open}</svg>
    القرآن الكريم — المستوى الثالث
  </a>

  <!-- Teacher row -->
  <div class="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
    <div class="h-8 w-8 rounded-full bg-primary-700 text-white inline-flex items-center justify-center text-xs font-semibold">أ.أ</div>
    <div class="text-xs">
      <p class="font-semibold text-text-base leading-tight">الأستاذ أحمد بن عبد الله</p>
      <p class="text-text-muted leading-tight">معلم القرآن الكريم</p>
    </div>
  </div>

  <!-- 4 sessions inside the bundle -->
  <div>
    <p class="text-xs font-semibold text-text-base mb-2">الحصص المتضمّنة (4)</p>
    <ol class="space-y-2 text-xs">
      <li class="flex items-center gap-3 p-2.5 rounded-lg bg-surface-50">
        <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-bold text-[0.625rem] flex-shrink-0">1</span>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-text-base">مراجعة خاصة 1: تطبيق أحكام الميم الساكنة</p>
          <p class="text-text-muted leading-tight mt-0.5">الجمعة 1 مايو 2026 — 5:00 م</p>
        </div>
      </li>
      <li class="flex items-center gap-3 p-2.5 rounded-lg bg-surface-50">
        <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-bold text-[0.625rem] flex-shrink-0">2</span>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-text-base">مراجعة خاصة 2: حفظ الجزء الثلاثين</p>
          <p class="text-text-muted leading-tight mt-0.5">السبت 2 مايو 2026 — 5:00 م</p>
        </div>
      </li>
      <li class="flex items-center gap-3 p-2.5 rounded-lg bg-surface-50">
        <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-bold text-[0.625rem] flex-shrink-0">3</span>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-text-base">مراجعة خاصة 3: تطبيق أحكام التجويد</p>
          <p class="text-text-muted leading-tight mt-0.5">الأحد 3 مايو 2026 — 5:00 م</p>
        </div>
      </li>
      <li class="flex items-center gap-3 p-2.5 rounded-lg bg-surface-50">
        <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-100 text-accent-700 font-bold text-[0.625rem] flex-shrink-0">4</span>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-text-base">مراجعة خاصة 4: محاكاة الاختبار الشهري</p>
          <p class="text-text-muted leading-tight mt-0.5">الإثنين 4 مايو 2026 — 5:00 م</p>
        </div>
      </li>
    </ol>
  </div>
</section>
```

## Block 2: Student-type indicator (`#cp-student-type`, FR-061)

```html
<section id="cp-student-type" class="bg-accent-50 border-s-4 border-accent-500 rounded-2xl p-4">
  <p class="text-[0.625rem] uppercase tracking-wide text-accent-700 font-bold inline-flex items-center gap-1.5">
    <svg class="h-3.5 w-3.5">{user-check}</svg>
    تصنيف الطالب
  </p>
  <p class="text-sm font-bold text-text-base mt-1">طالب عربي · يُطبَّق سعر السوق المحلّي</p>
  <p class="text-xs text-text-muted mt-2 leading-7">
    سعر الحصة الواحدة لك: <span class="font-bold text-accent-700">75 ر.س</span> · 
    للطلاب غير الناطقين بالعربية: <span class="font-semibold">25 USD / حصة</span>
  </p>
</section>
```

## Block 3: Price calculation (`#cp-pricing`, FR-062)

```html
<section id="cp-pricing" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
  <h3 class="text-base font-bold mb-3">حساب السعر</h3>
  <dl class="text-sm divide-y divide-slate-100">

    <div class="flex items-center justify-between gap-2 py-3">
      <dt class="text-text-base">السعر الأساسي للحزمة</dt>
      <dd class="text-text-muted">4 حصص × 75 ر.س = <span class="font-bold text-text-base">300 ر.س</span></dd>
    </div>

    <div class="flex items-center justify-between gap-2 py-3">
      <dt class="text-text-base inline-flex items-center gap-1.5">
        ضريبة القيمة المضافة <span class="text-[0.625rem] text-text-muted">(15%)</span>
      </dt>
      <dd class="text-text-muted">+ <span class="font-bold text-text-base">45 ر.س</span></dd>
    </div>

    <div class="flex items-center justify-between gap-2 py-3 bg-surface-50 -mx-5 px-5">
      <dt class="font-bold text-text-base">الإجمالي قبل الرصيد</dt>
      <dd class="font-extrabold text-lg text-text-base">345 ر.س</dd>
    </div>

  </dl>
</section>
```

## Block 4: Family prepaid balance (`#cp-balance`, FR-063)

```html
<section id="cp-balance" class="bg-info-50 border border-info-200 rounded-2xl p-5">
  <header class="flex items-start justify-between gap-3 mb-3">
    <div>
      <p class="text-[0.625rem] uppercase tracking-wide text-info-700 font-bold inline-flex items-center gap-1.5">
        <svg class="h-3.5 w-3.5">{wallet}</svg>
        رصيد العائلة المتاح
      </p>
      <p class="text-2xl font-extrabold text-info-700 mt-1">750 ر.س</p>
    </div>
  </header>

  <!-- Apply toggle (visual checkbox, pre-checked) -->
  <label class="flex items-start gap-2.5 cursor-pointer mt-3 p-3 bg-white rounded-lg border border-info-200">
    <input type="checkbox" disabled checked class="h-4 w-4 rounded border-info-300 text-info-600 mt-0.5" aria-label="استخدام الرصيد للدفع" />
    <div class="flex-1">
      <p class="text-sm font-semibold text-text-base">استخدام الرصيد للدفع</p>
      <p class="text-xs text-text-muted leading-7 mt-0.5">
        سيُخصم من الرصيد: <span class="font-bold text-info-700">200 ر.س</span> ·
        يبقى في الرصيد: <span class="font-semibold">550 ر.س</span>
      </p>
    </div>
  </label>
</section>
```

## Block 5: Amount due (`#cp-amount-due`)

```html
<section id="cp-amount-due" class="bg-accent-500 text-primary-900 rounded-2xl p-5 shadow-md">
  <div class="flex items-center justify-between gap-3 flex-wrap">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-900/70 font-bold">المبلغ المستحق بعد خصم الرصيد</p>
      <p class="text-3xl md:text-4xl font-extrabold mt-1">145 ر.س</p>
    </div>
    <p class="text-xs text-primary-900/70 leading-7">
      للطلاب غير الناطقين بالعربية:<br/>
      <span class="font-bold text-primary-900">~62 USD بعد خصم الرصيد</span>
    </p>
  </div>
</section>
```

## Block 6: Payment methods (`#cp-payment-methods`, FR-064)

3 visual radio-cards. First (Visa) is pre-selected.

```html
<section id="cp-payment-methods" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
  <h3 class="text-base font-bold mb-3">طريقة الدفع</h3>
  <div class="space-y-2.5">

    <!-- Method 1: Credit Card (PRE-SELECTED) -->
    <label class="flex items-center gap-3 p-3 rounded-xl border-2 border-accent-500 bg-accent-50 cursor-pointer">
      <input type="radio" name="payment-method" disabled checked class="h-4 w-4 text-accent-600 border-accent-300" aria-label="بطاقة ائتمانية فيزا" />
      <div class="flex items-center gap-3 flex-1">
        <span class="inline-flex h-9 w-12 items-center justify-center rounded-md bg-info-700 text-white text-[0.625rem] font-extrabold tracking-widest">VISA</span>
        <div>
          <p class="text-sm font-semibold text-text-base">بطاقة ائتمانية</p>
          <p class="text-xs text-text-muted">Visa تنتهي بـ 4242</p>
        </div>
      </div>
      <span class="text-[0.625rem] text-accent-700 font-bold uppercase tracking-wide">المختارة</span>
    </label>

    <!-- Method 2: Mada -->
    <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-surface-50 cursor-pointer">
      <input type="radio" name="payment-method" disabled class="h-4 w-4 text-accent-600 border-slate-300" aria-label="مدى" />
      <div class="flex items-center gap-3 flex-1">
        <span class="inline-flex h-9 w-12 items-center justify-center rounded-md bg-success-700 text-white text-[0.625rem] font-extrabold tracking-widest">مدى</span>
        <div>
          <p class="text-sm font-semibold text-text-base">مدى</p>
          <p class="text-xs text-text-muted">بطاقة تنتهي بـ 8821</p>
        </div>
      </div>
    </label>

    <!-- Method 3: Apple Pay -->
    <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-surface-50 cursor-pointer">
      <input type="radio" name="payment-method" disabled class="h-4 w-4 text-accent-600 border-slate-300" aria-label="Apple Pay" />
      <div class="flex items-center gap-3 flex-1">
        <span class="inline-flex h-9 w-12 items-center justify-center rounded-md bg-text-base text-white text-[0.625rem] font-bold"> Pay</span>
        <div>
          <p class="text-sm font-semibold text-text-base">Apple Pay</p>
          <p class="text-xs text-text-muted">مرتبط بـ iPhone — عبد الرحمن</p>
        </div>
      </div>
    </label>

  </div>
</section>
```

## Block 7: Confirm + cancel + reminder (`#cp-confirm`, FR-065 + FR-066)

```html
<section id="cp-confirm" class="space-y-4">
  <div class="flex flex-col sm:flex-row gap-3">
    <button type="button" class="inline-flex items-center justify-center gap-2 flex-1 bg-primary-700 hover:bg-primary-800 text-white rounded-xl px-5 py-3.5 text-base font-bold transition-colors">
      <svg class="h-5 w-5">{check-circle-2}</svg>
      تأكيد الحجز
    </button>
    <a href="live-session-details.html" class="inline-flex items-center justify-center gap-2 border border-slate-300 hover:bg-surface-50 text-text-base rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors">
      إلغاء
    </a>
  </div>
  <p class="text-center text-[0.625rem] text-text-muted leading-7">
    بتأكيدك الحجز، أنت توافق على شروط الاستخدام وسياسة الإلغاء —
    <span class="text-info-700 font-semibold">شاشة بصرية فقط، لا يتمّ تنفيذ دفع فعلي.</span>
  </p>
</section>
```

## Edge case: balance covers fully (FR-067)

The default state shows 145 ر.س due (per Q5). For documentation completeness, here's how the page would render if the family balance fully covered the cost (e.g., a single 75 ر.س session):

- Block 5 (amount due) shows `0 ر.س` in success-green styling.
- Block 6 payment-method radios are visually disabled (slate background, opacity 0.5) with a caption above: "الدفع تمّ بالكامل من رصيد العائلة. لا حاجة لاختيار وسيلة دفع."
- Block 7 confirm button text becomes `تأكيد الحجز (مجاناً)`.

Not the default rendering — kept here as a contract reference for future implementations.

## Inbound / outbound links

**Inbound**: live-session-details "إتمام الدفع" (the canonical entry); live-sessions row "حجز" (per-session paid + unpaid sessions).
**Outbound**: course chip → `course-details.html`; "إلغاء" → `live-session-details.html`; "تأكيد الحجز" → no-op (visual button); all other links/inputs are visual-only.
