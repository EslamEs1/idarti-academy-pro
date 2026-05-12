# Contract — Student Completed Levels

`pages/student/completed-levels.html` — list of finished curriculum levels in the persona's Quran path. Per FR-050..053.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <section id="cl-header"> … h2 + count "2 من 4" + 50% path-progress bar … </section>
    <section id="cl-completed"> … 2 completed-level cards from E4 … </section>
    <section id="cl-next-preview"> … Quran L3 in-progress preview at 60% … </section>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: 15-entry student sidebar, **active = "الإنجازات"**.
- **Header**: same Spec 002 chrome. `<title>` = `المستويات التي أكملتها — منصة إدارتي`.

## Header (`#cl-header`)

```html
<section id="cl-header" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <div class="flex items-start justify-between gap-3 flex-wrap mb-4">
    <div>
      <h2 class="text-xl md:text-2xl font-bold leading-tight">المستويات التي أكملتها</h2>
      <p class="text-sm text-text-muted mt-1">2 من 4 مستويات في مسار القرآن الكريم — أنت في منتصف الطريق!</p>
    </div>
    <a href="achievements.html" class="text-xs text-text-muted hover:underline">← العودة للإنجازات</a>
  </div>

  <!-- Path-progress bar (50%) -->
  <div class="space-y-2">
    <div class="flex items-center justify-between text-xs">
      <span class="font-semibold">تقدّم مسار القرآن الكريم</span>
      <span class="font-bold text-accent-700">2 / 4 (50%)</span>
    </div>
    <div class="h-3 bg-slate-200 rounded-full overflow-hidden flex">
      <div class="h-full bg-success-500" style="width: 25%" aria-label="L1 مكتمل"></div>
      <div class="h-full bg-success-500 border-s border-success-700" style="width: 25%" aria-label="L2 مكتمل"></div>
      <div class="h-full bg-accent-500" style="width: 15%" aria-label="L3 حالياً 60%"></div>
      <!-- Remaining 35% empty for L3 25%-60% partial + L4 25% -->
    </div>
    <div class="flex items-center justify-between text-xs text-text-muted">
      <span>المستوى الأول</span>
      <span>المستوى الثاني</span>
      <span class="text-accent-700 font-semibold">المستوى الثالث (حالياً)</span>
      <span>المستوى الرابع</span>
    </div>
  </div>
</section>
```

## Completed levels cards (`#cl-completed`)

`grid grid-cols-1 lg:grid-cols-2 gap-5` of 2 cards from E4 inventory.

**Card 1 (Quran L1)**:

```html
<article class="bg-white rounded-2xl border border-success-200 border-s-4 border-s-success-500 shadow-sm p-5 md:p-6">
  <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
    <div>
      <span class="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2 py-0.5 text-xs font-semibold mb-2">
        <svg class="h-3 w-3">…check-circle…</svg> مكتمل
      </span>
      <h3 class="text-base md:text-lg font-bold leading-tight">المستوى الأول — أساسيات التلاوة والتجويد</h3>
      <p class="text-xs text-text-muted mt-1">القرآن الكريم</p>
    </div>
    <span class="inline-flex items-center gap-1 rounded-full bg-accent-100 text-accent-700 px-2 py-0.5 text-xs font-bold">
      <svg class="h-3 w-3">…award…</svg> ممتاز
    </span>
  </div>

  <dl class="grid grid-cols-2 gap-3 text-sm pt-3 border-t border-slate-100">
    <div><dt class="text-xs text-text-muted">تاريخ البداية</dt><dd class="font-medium">1 سبتمبر 2025</dd></div>
    <div><dt class="text-xs text-text-muted">تاريخ الإكمال</dt><dd class="font-medium text-success-700">20 ديسمبر 2025</dd></div>
    <div><dt class="text-xs text-text-muted">المستوى التالي</dt><dd class="font-medium">المستوى الثاني (مكتمل ✓)</dd></div>
    <div><dt class="text-xs text-text-muted">الشهادة</dt><dd class="font-medium text-success-700"><span class="inline-flex items-center gap-1"><svg class="h-3.5 w-3.5">…check…</svg>متاحة</span></dd></div>
  </dl>

  <div class="flex flex-wrap gap-3 pt-4 mt-3 border-t border-slate-100">
    <a href="#planned" class="inline-flex items-center gap-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 text-sm font-semibold">
      <svg class="h-4 w-4">…file-text…</svg> عرض التقرير
    </a>
    <a href="certificates.html" class="inline-flex items-center gap-2 rounded-xl border border-accent-500 text-accent-700 hover:bg-accent-50 px-4 py-2 text-sm font-semibold">
      <svg class="h-4 w-4">…award…</svg> عرض الشهادة
    </a>
  </div>
</article>
```

**Card 2 (Quran L2)**: Same pattern with E4.2 data:

- Title: `المستوى الثاني — مدّ الحروف وأحكام النون الساكنة`
- Started: 5 يناير 2026
- Completed: 1 مارس 2026
- Final: ممتاز
- Next: `المستوى الثالث (حالياً — 60%)` (with mini progress bar)
- Certificate available ✓

## In-progress L3 preview (`#cl-next-preview`)

```html
<section id="cl-next-preview" class="bg-accent-50 border-2 border-accent-500 rounded-2xl p-5 md:p-6 shadow-sm">
  <div class="flex items-center gap-2 mb-3">
    <svg class="h-5 w-5 text-accent-700">…compass…</svg>
    <p class="text-xs uppercase tracking-wide text-accent-700 font-bold">المستوى التالي — قيد التقدّم</p>
  </div>
  <h3 class="text-base md:text-lg font-bold leading-tight mb-2">المستوى الثالث — أحكام الميم الساكنة وحفظ الجزء الثلاثين</h3>
  <p class="text-sm text-text-base mb-3">المحطّة الحالية: <strong>أحكام الميم الساكنة — تطبيق عملي</strong></p>
  <div class="space-y-1.5 mb-4">
    <div class="flex items-center justify-between text-xs">
      <span class="text-text-muted">تقدّمك في المستوى</span>
      <span class="font-bold text-accent-700">60%</span>
    </div>
    <div class="h-3 bg-white rounded-full overflow-hidden border border-accent-200"><div class="h-full bg-accent-500" style="width: 60%"></div></div>
  </div>
  <a href="my-courses.html" class="inline-flex items-center gap-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white px-5 py-2.5 text-sm font-bold">
    <svg class="h-4 w-4 rtl:rotate-180">…play/chevron…</svg> متابعة من حيث توقّفت
  </a>
</section>
```

## Cross-page links

**Inbound**: `achievements.html` footer CTA.

**Outbound**:
- Per-card "عرض التقرير" → `#planned` placeholder (future-spec level-report page).
- Per-card "عرض الشهادة" → `certificates.html`.
- "متابعة من حيث توقّفت" → `my-courses.html`.

## Validation hooks

- **FR-050**: h2 + count "2 من 4" + 50% path bar.
- **FR-051**: Exactly 2 completed-level cards with the locked dates (Sept 2025 / Dec 2025 / Jan 2026 / Mar 2026).
- **FR-052**: Each card has all required attributes + 2 CTAs.
- **FR-053**: `#cl-next-preview` shows L3 at 60% + "متابعة من حيث توقّفت" → my-courses.html.
- **SC-005**: Visual scan finds 2 cards + 50% bar + L3 preview.
