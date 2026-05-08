# Contract — Certificate Preview Page

`pages/student/certificate-preview.html` is the **only page in this feature that has download/print/share actions**. Per FR-030..035. Showcases E1.1 (Quran L1 certificate).

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-100">
  <div class="max-w-4xl mx-auto space-y-6">

    <nav id="cp-breadcrumb"> … breadcrumb … </nav>
    <article id="cp-certificate"> … parchment-styled certificate … </article>
    <section id="cp-actions"> … 4-button action cluster (Download/Print/Share/Back) … </section>
    <p id="cp-prototype-notice"> … inline notice … </p>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: 15-entry student sidebar, **active = "الإنجازات"**.
- **Header**: same Spec 002 chrome. `<title>` = `معاينة الشهادة: شهادة إتمام المستوى الأول — منصة إدارتي`.

## Breadcrumb (`#cp-breadcrumb`)

```html
<nav aria-label="breadcrumb" class="text-xs text-text-muted flex items-center flex-wrap gap-1.5">
  <a href="achievements.html" class="hover:text-primary-700 hover:underline">إنجازاتي</a>
  <span aria-hidden="true">/</span>
  <a href="certificates.html" class="hover:text-primary-700 hover:underline">شهاداتي المعتمدة</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page" class="text-text-base">شهادة إتمام المستوى الأول</span>
</nav>
```

## The parchment certificate (`#cp-certificate`) — FR-030 / FR-031

The visual centerpiece of the entire feature. Cream/parchment background, gold border, deep navy text, Tajawal display weight for the persona's name.

```html
<article id="cp-certificate" class="bg-amber-50 border-4 border-accent-500 rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl ring-2 ring-accent-300 ring-offset-4 ring-offset-amber-50/40 text-center text-primary-900 relative overflow-hidden">

  <!-- Decorative corner ornaments -->
  <div class="absolute top-3 start-3 h-12 w-12 border-t-4 border-s-4 border-accent-600 rounded-tl-xl rtl:rounded-tr-xl rtl:rounded-tl-none" aria-hidden="true"></div>
  <div class="absolute top-3 end-3 h-12 w-12 border-t-4 border-e-4 border-accent-600 rounded-tr-xl rtl:rounded-tl-xl rtl:rounded-tr-none" aria-hidden="true"></div>
  <div class="absolute bottom-3 start-3 h-12 w-12 border-b-4 border-s-4 border-accent-600 rounded-bl-xl rtl:rounded-br-xl rtl:rounded-bl-none" aria-hidden="true"></div>
  <div class="absolute bottom-3 end-3 h-12 w-12 border-b-4 border-e-4 border-accent-600 rounded-br-xl rtl:rounded-bl-xl rtl:rounded-br-none" aria-hidden="true"></div>

  <!-- (a) Academy logo -->
  <header class="mb-6">
    <div class="inline-flex items-center gap-2">
      <span class="text-3xl md:text-4xl font-extrabold tracking-tight">إدارتي</span>
      <span class="h-3 w-3 rounded-full bg-accent-500" aria-hidden="true"></span>
    </div>
    <p class="text-xs text-text-muted mt-1 tracking-widest uppercase">أكاديمية إدارتي للتعليم</p>
  </header>

  <!-- (b) Decorative ornament strip -->
  <div class="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
    <span class="h-px w-16 bg-accent-500"></span>
    <svg class="h-6 w-6 text-accent-600">…flourish/star…</svg>
    <span class="h-px w-16 bg-accent-500"></span>
  </div>

  <!-- (c) Certificate title -->
  <h1 class="text-2xl md:text-3xl font-bold leading-tight mb-6 text-primary-900">شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد</h1>

  <!-- (d) Prefix -->
  <p class="text-sm md:text-base text-primary-800 mb-3">تشهد أكاديمية إدارتي بأنّ الطالب</p>

  <!-- (e) Student name (largest font on page) -->
  <p class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-900 leading-snug py-3 mb-3" lang="ar">عبد الرحمن مؤمن</p>

  <!-- (f) Suffix + course/level details -->
  <p class="text-sm md:text-base text-primary-800 leading-8 max-w-2xl mx-auto mb-8">
    قد أتمّ بنجاح المستوى الأول من مسار القرآن الكريم — أساسيات التلاوة والتجويد —
    وذلك بتقدير <strong class="text-accent-700">ممتاز</strong>،
    بعد التزامه بالحضور وأداء جميع الواجبات والاختبارات المطلوبة.
  </p>

  <!-- (g) Issue date block -->
  <p class="text-sm font-medium text-primary-800 mb-10">صدر بتاريخ: <strong>5 يناير 2026</strong></p>

  <!-- (h) Two-column footer: signature + seal -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-end max-w-3xl mx-auto pt-8 border-t-2 border-accent-300">

    <!-- Signature (right side in RTL) -->
    <div class="text-center md:text-end">
      <div class="text-2xl text-primary-700 italic mb-2 font-bold" lang="ar" aria-hidden="true">أ. أحمد</div>
      <div class="h-px bg-primary-700 w-32 mx-auto md:ms-auto md:me-0 mb-2"></div>
      <p class="text-xs text-primary-800 font-semibold">الأستاذ أحمد بن عبد الله</p>
      <p class="text-xs text-text-muted">معلم القرآن الكريم</p>
    </div>

    <!-- Academy seal (left side in RTL) -->
    <div class="flex justify-center md:justify-start">
      <div class="relative h-28 w-28 rounded-full border-2 border-accent-600 bg-amber-100 flex items-center justify-center text-accent-700">
        <svg class="h-12 w-12">…award/star icon…</svg>
        <!-- Rotating text inscription around the circle (decorative) -->
        <span class="absolute -top-2 -end-2 inline-flex items-center rounded-full bg-accent-500 px-2 py-0.5 text-[0.6rem] font-bold text-primary-900 uppercase tracking-wider">رسمي</span>
      </div>
    </div>

  </div>

  <!-- (i) Certificate ID + QR placeholder -->
  <footer class="mt-10 pt-6 border-t border-accent-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-muted">
    <p>رقم الشهادة: <strong class="text-primary-800 font-mono">IDR-2026-Q01-0042</strong></p>
    <div class="flex items-center gap-2">
      <!-- Decorative QR placeholder -->
      <div class="grid grid-cols-4 gap-0.5 w-12 h-12" aria-hidden="true">
        <div class="bg-primary-900"></div><div class="bg-amber-50"></div><div class="bg-primary-900"></div><div class="bg-primary-900"></div>
        <div class="bg-amber-50"></div><div class="bg-primary-900"></div><div class="bg-amber-50"></div><div class="bg-primary-900"></div>
        <div class="bg-primary-900"></div><div class="bg-primary-900"></div><div class="bg-amber-50"></div><div class="bg-amber-50"></div>
        <div class="bg-amber-50"></div><div class="bg-primary-900"></div><div class="bg-primary-900"></div><div class="bg-primary-900"></div>
      </div>
      <span>امسح للتحقّق من صحّة الشهادة</span>
    </div>
  </footer>

</article>
```

## Action cluster (`#cp-actions`) — FR-032

```html
<section id="cp-actions" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">

    <!-- (1) PRIMARY: Download PDF (visual stub, NO real action) -->
    <button type="button" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white px-5 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">
      <svg class="h-4 w-4">…download…</svg> تنزيل PDF
    </button>

    <!-- (2) SECONDARY: Print (visual stub) -->
    <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 hover:bg-surface-50 text-text-base px-5 py-3 text-sm font-semibold transition-colors">
      <svg class="h-4 w-4">…printer…</svg> طباعة
    </button>

    <!-- (3) TERTIARY: Share with parent (visual stub) -->
    <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 hover:bg-surface-50 text-text-base px-5 py-3 text-sm font-semibold transition-colors">
      <svg class="h-4 w-4">…share…</svg> مشاركة مع ولي الأمر
    </button>

    <!-- (4) Back to certificates (real link) -->
    <a href="certificates.html" class="inline-flex items-center justify-center gap-2 text-sm text-text-muted hover:text-primary-700 hover:underline px-3 py-3">
      <svg class="h-3.5 w-3.5 rtl:rotate-180">…chevron…</svg> العودة للشهادات
    </a>

  </div>
</section>
```

## Prototype notice (`#cp-prototype-notice`) — FR-033

```html
<p id="cp-prototype-notice" class="text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">
  <svg class="h-4 w-4 flex-shrink-0">…info…</svg>
  هذا نموذج تجريبي — لا يتم تنزيل ملف فعلي عند النقر.
</p>
```

## Print stylesheet (FR-035)

A `@media print` block in `assets/css/input.css` (added once, applies globally) hides:

- `#app-sidebar`, `#app-header`, `#cp-actions`, `#cp-prototype-notice`, `[data-sidebar-backdrop]`

And ensures `#cp-certificate` is centered on the printed A4 page. Per `research.md §R11`.

## Cross-page links

**Inbound**:

- `achievements.html` featured-cert CTA
- `certificates.html` per-card "عرض الشهادة"
- `admin/certificates.html` per-row "عرض"

**Outbound**:

- "العودة للشهادات" → `certificates.html`
- Breadcrumb: `achievements.html` and `certificates.html`

## Validation hooks

- **FR-030**: `#cp-certificate` has `bg-amber-50 border-4 border-accent-500` styling.
- **FR-031**: All 9 certificate-content elements (a-i) present in correct order.
- **FR-032**: `#cp-actions` has exactly 4 elements: 3 `<button type="button">` + 1 `<a href="certificates.html">`.
- **FR-033**: `#cp-prototype-notice` exists with the warning copy.
- **FR-034**: Responsive — at < 768 px the certificate scales proportionally; the action cluster stacks vertically (`flex-col sm:flex-row`).
- **FR-035**: A `@media print` block exists in `assets/css/input.css` (verify via `grep -A 12 '@media print' assets/css/input.css`). After `npm run build:css`, the rule appears in `output.css`.
- **SC-003**: Visual scan finds the parchment + 4 buttons + ID + signature + seal.
