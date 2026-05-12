# Contract — Student Achievements Hub

`pages/student/achievements.html` is the canonical motivation surface — the destination every prior-spec "Achievements" link points at. Per FR-010..015.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <section id="ach-header"> … h1 + motivational subtitle … </section>
    <section id="ach-summary"> … 4 summary cards (per data-model.md §E6 student) … </section>
    <section id="ach-featured"> … parchment-styled featured Quran L1 cert + "عرض الشهادة" CTA → certificate-preview.html … </section>
    <section id="ach-timeline"> … ≥ 6 timeline items per data-model.md §E5 in reverse-chronological order … </section>
    <section id="ach-recent-badges"> … ≥ 4 recently-earned badge tiles + "عرض كل الأوسمة" CTA → badges.html … </section>
    <section id="ach-cta-grid"> … 4 CTA cards (الشهادات / الاختبارات الشهرية / المستويات المكتملة / أوسمتي) … </section>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: 15-entry student sidebar from Spec 002, **active = "الإنجازات"** (`is-active` + `aria-current="page"`).
- **Header**: same Spec 002 chrome (bell-as-anchor, profile dropdown). `<title>` = `إنجازاتك التعليمية — منصة إدارتي`. Header h1 short version = "إنجازاتي"; main h2 in the page body = "إنجازاتك التعليمية".

## Header section (`#ach-header`)

```html
<section id="ach-header">
  <h2 class="text-xl md:text-2xl font-bold leading-tight">إنجازاتك التعليمية</h2>
  <p class="text-sm text-text-muted mt-2 leading-7">كل ما حقّقته في رحلتك التعليمية موثَّق هنا — اعرض تقدّمك بفخر لوالديك ومعلميك.</p>
</section>
```

## Summary cards (`#ach-summary`)

`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` containing 4 cards per E6. Each card uses the same pattern as Spec 004's summary cards (icon-block + count + label).

Counts: 4 / 5 / 2 / 7. Tints: accent / success / primary / rose.

## Featured certificate panel (`#ach-featured`)

A parchment-styled mini-card showcasing E1.1 (Quran L1):

```html
<section id="ach-featured" class="bg-amber-50 border-2 border-accent-500 rounded-2xl p-5 md:p-6 shadow-md">
  <div class="flex items-center gap-2 mb-3">
    <svg>…award icon at text-accent-700…</svg>
    <p class="text-xs uppercase tracking-wide text-accent-700 font-bold">الشهادة المميَّزة</p>
  </div>
  <h3 class="text-lg md:text-xl font-bold text-primary-900 mb-2">شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد</h3>
  <div class="text-sm text-primary-800 space-y-1.5 mb-4">
    <p><strong>الطالب:</strong> عبد الرحمن مؤمن</p>
    <p><strong>المعلم:</strong> الأستاذ أحمد بن عبد الله</p>
    <p><strong>تاريخ الإصدار:</strong> 5 يناير 2026</p>
    <p class="text-xs text-text-muted">رقم الشهادة: IDR-2026-Q01-0042</p>
  </div>
  <a href="certificate-preview.html" class="inline-flex items-center gap-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white px-5 py-2.5 text-sm font-bold">
    عرض الشهادة <svg class="rtl:rotate-180">…chevron…</svg>
  </a>
</section>
```

## Timeline (`#ach-timeline`)

Vertical timeline with 6 milestones from E5:

```html
<section id="ach-timeline" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <h3 class="text-base md:text-lg font-semibold mb-4">خط الإنجازات الأخيرة</h3>
  <ol class="relative ps-8 border-s-2 border-slate-200 space-y-5">
    <!-- 6 <li> entries, newest first; each with timeline-pin + content card -->
  </ol>
</section>
```

Each timeline entry has: a colored pin indicating type (شهادة / وسام / مستوى / اختبار), date, type pill, title, 1-line description.

## Recent badges (`#ach-recent-badges`)

`grid grid-cols-2 sm:grid-cols-4 gap-3` of 4 most-recently-earned badge tiles (from E2 — badges 1, 3, 7, 6 by date). Each tile is a smaller version of the full badge tile from `badges.html`. Bottom CTA "عرض كل الأوسمة" → `badges.html`.

## Footer CTA grid (`#ach-cta-grid`)

`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` of 4 large CTA cards:

| Label | Count caption | Icon | Target |
|---|---|---|---|
| الشهادات | 4 شهادات | `award` | `certificates.html` |
| الاختبارات الشهرية المجتازة | 5 اختبارات | `circle-check` | `monthly-exams-passed.html` |
| المستويات المكتملة | 2 من 4 | `layers` | `completed-levels.html` |
| أوسمتي | 7 أوسمة | `medal` | `badges.html` |

## Cross-page links

**Inbound** (verified):

- `dashboard.html` line 87 (sidebar) and line 674 ("عرض كل الإنجازات")
- `learning-journey.html` line 87
- `weekly-plan.html` line 87
- `notifications.html` line 367
- `my-courses.html` line 89 + line 441 (completed-card)
- All Spec 003/004 student pages (sidebar entry on each)

**Outbound**:

- `certificate-preview.html` (featured cert CTA)
- `certificates.html`, `monthly-exams-passed.html`, `completed-levels.html`, `badges.html` (footer CTA grid)

## Validation hooks

- **FR-010**: h1/h2 contains "إنجازاتك التعليمية" + subtitle.
- **FR-011**: `#ach-summary` has exactly 4 cards (4/5/2/7).
- **FR-012**: `#ach-featured` exists with Quran L1 details + cert-ID + CTA.
- **FR-013**: `#ach-timeline` has ≥ 5 entries (we ship 6).
- **FR-014**: `#ach-recent-badges` has ≥ 4 tiles + CTA.
- **FR-015**: `#ach-cta-grid` has 4 CTAs targeting the 4 detail pages.
- **SC-001**: 30-second scan answers all 5 questions.
