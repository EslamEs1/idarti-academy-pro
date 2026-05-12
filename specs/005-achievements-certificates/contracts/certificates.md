# Contract — Student Certificates List

`pages/student/certificates.html` is the canonical certificates list. Per FR-020..026. **The download-only-inside-preview rule is enforced here**: no certificate card carries a download button.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <section id="cert-header"> … h2 + count caption + design-rule callout banner … </section>
    <section id="cert-filters"> … ≥ 3 visual filter chips (الكل + 3 type chips) … </section>
    <section id="cert-grid"> … 4 certificate cards per E1 student-side inventory … </section>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: 15-entry student sidebar, **active = "الإنجازات"**.
- **Header**: same Spec 002 chrome. `<title>` = `شهاداتي المعتمدة — منصة إدارتي`.

## Header section (`#cert-header`)

```html
<section id="cert-header">
  <div class="flex items-start justify-between gap-3 flex-wrap">
    <div>
      <h2 class="text-xl md:text-2xl font-bold leading-tight">شهاداتي المعتمدة</h2>
      <p class="text-sm text-text-muted mt-1">4 شهادات منذ بداية رحلتك — كل واحدة تستحق الفخر.</p>
    </div>
    <a href="achievements.html" class="text-xs text-text-muted hover:underline">← العودة للإنجازات</a>
  </div>

  <!-- Design-rule callout banner (FR-021) -->
  <aside class="mt-4 bg-info-50 border border-info-200 rounded-2xl p-4 flex items-start gap-3">
    <svg class="h-5 w-5 text-info-700 flex-shrink-0 mt-0.5">…info icon…</svg>
    <p class="text-sm text-info-900 leading-7">تنزيل الشهادة متاح من داخل صفحة المعاينة فقط — حافظ على رحلتك موثَّقة.</p>
  </aside>
</section>
```

## Filter chips (`#cert-filters`)

≥ 3 chips per FR-022 (we ship 4 to cover the 3 cert types in inventory + الكل):

```html
<section id="cert-filters" class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
  <div role="tablist" class="flex flex-wrap gap-2">
    <button type="button" class="is-active …active chip…">الكل (4)</button>
    <button type="button" class="…neutral chip…">إتمام مستوى (2)</button>
    <button type="button" class="…neutral chip…">تميّز شهري (1)</button>
    <button type="button" class="…neutral chip…">حضور والتزام (1)</button>
  </div>
</section>
```

## Certificate cards (`#cert-grid`)

`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5` containing exactly 4 cards from E1 student-side inventory.

**Per-card pattern** (Card 1 example):

```html
<article class="bg-white rounded-2xl border border-amber-200 shadow-sm p-5 md:p-6 hover:shadow-md transition-shadow">
  <!-- Decorative top strip -->
  <div class="h-1 bg-gradient-to-r from-accent-500 to-accent-300 -mx-5 -mt-5 mb-4 rounded-t-2xl md:-mx-6 md:-mt-6"></div>

  <!-- Type pill -->
  <div class="flex items-start justify-between gap-3 mb-3 flex-wrap">
    <span class="inline-flex items-center gap-1 rounded-full bg-accent-100 text-accent-700 px-2 py-0.5 text-xs font-semibold">
      <svg class="h-3 w-3">…award…</svg> إتمام مستوى
    </span>
    <span class="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2 py-0.5 text-xs font-semibold">
      <svg class="h-3 w-3">…check…</svg> معتمدة
    </span>
  </div>

  <!-- Title -->
  <h3 class="text-base md:text-lg font-bold text-primary-900 leading-tight mb-2">شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد</h3>

  <!-- Meta -->
  <p class="text-xs text-text-muted mb-3">الطالب: <strong class="text-text-base">عبد الرحمن مؤمن</strong></p>
  <div class="space-y-1.5 mb-3 text-xs">
    <div class="flex items-center gap-2"><svg class="h-3.5 w-3.5 text-primary-700">…book…</svg><span>القرآن الكريم — المستوى الأول</span></div>
    <div class="flex items-center gap-2"><div class="h-5 w-5 rounded-full bg-primary-700 text-white text-[0.5rem] flex items-center justify-center font-semibold">أ.أ</div><span>الأستاذ أحمد بن عبد الله</span></div>
    <div class="flex items-center gap-2"><svg class="h-3.5 w-3.5 text-primary-700">…calendar…</svg><span>5 يناير 2026</span></div>
  </div>

  <!-- Reason -->
  <p class="text-xs text-text-muted italic leading-7 border-s-2 border-amber-200 ps-3 mb-4">إتمام جميع متطلبات المستوى الأول بتقدير ممتاز</p>

  <!-- ONE CTA: "View" only. NO download button. -->
  <a href="certificate-preview.html" class="inline-flex items-center gap-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 text-sm font-semibold w-full justify-center">
    <svg class="h-4 w-4">…eye…</svg> عرض الشهادة
  </a>
</article>
```

**Card 2-4** follow the same pattern with their own data per E1 inventory:

- Card 2: شهادة إتمام المستوى الثاني — Cert L2 — 5 مارس 2026 — إتمام مستوى
- Card 3: شهادة التميّز الشهري — Cert MEXC — 15 أبريل 2026 — تميّز شهري (use rose tint instead of accent for type pill variety)
- Card 4: شهادة الالتزام بالحضور — Cert ATT — 10 أبريل 2026 — حضور والتزام (use success tint; signed by إدارة الأكاديمية, not a teacher — show ID badge أ.إ in success-700)

## The "no download button" rule

**Critical**: zero download/print/share clickable elements anywhere on this page. The only mention of "تنزيل" is inside the FR-021 callout banner text (which uses the word but not in any clickable element). SC-002 enforces this via grep.

## Cross-page links

**Inbound**:

- `parent/dashboard.html` line 79 (`certificates.html`)
- `achievements.html` footer CTA grid
- `my-courses.html` line 441 (completed-card "عرض الشهادة" — currently lands here or on achievements.html depending on prior wiring)

**Outbound**:

- Per-card "عرض الشهادة" → `certificate-preview.html` (only outbound action)
- Header back-link → `achievements.html`

## Validation hooks

- **FR-020**: h2 = "شهاداتي المعتمدة" + count caption.
- **FR-021**: `#cert-header` contains the callout banner with the rule text.
- **FR-022**: `#cert-filters` has ≥ 3 chips.
- **FR-023**: `#cert-grid` has exactly 4 cards covering 3 cert types.
- **FR-024**: Each card contains all required attributes + a single CTA.
- **FR-025/SC-002**: `grep -nE '(تنزيل|Download|PDF)' pages/student/certificates.html` finds matches ONLY inside the FR-021 callout banner text — never inside `<button>` or `<a class="…btn">`.
- **FR-026**: Responsive 1/2/3 col grid.
