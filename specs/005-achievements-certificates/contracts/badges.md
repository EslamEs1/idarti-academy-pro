# Contract — Student Badges Wall

`pages/student/badges.html` — wall of 7 badge tiles. Per FR-060..066.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <section id="bdg-header"> … h2 + "7 من 7" + motivational subtitle … </section>
    <section id="bdg-grid"> … 7 badge tiles per E2 inventory … </section>
    <section id="bdg-aspiration"> … aspirational closing copy + motivational graphic … </section>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: 15-entry student sidebar, **active = "الإنجازات"**.
- **Header**: same Spec 002 chrome. `<title>` = `أوسمتي — منصة إدارتي`.

## Header (`#bdg-header`)

```html
<section id="bdg-header" class="bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
  <div class="flex items-start justify-between gap-3 flex-wrap">
    <div>
      <h2 class="text-xl md:text-2xl font-bold leading-tight">أوسمتي</h2>
      <p class="text-white/80 text-sm md:text-base mt-1">7 من 7 أوسمة — كل وسام يعكس جانباً من تميّزك. اعرض ما تفتخر به على ملفك الشخصي.</p>
    </div>
    <div class="flex items-center gap-2">
      <div class="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/15 text-accent-300">
        <svg class="h-7 w-7">…medal…</svg>
      </div>
      <a href="achievements.html" class="text-xs text-white/70 hover:text-white hover:underline">← العودة للإنجازات</a>
    </div>
  </div>
</section>
```

## Badge wall (`#bdg-grid`)

`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5` of 7 badge tiles.

**Per-tile pattern** (Badge 2 — Homework Hero example):

```html
<article class="bg-white rounded-2xl border-2 border-slate-200 p-5 md:p-6 shadow-sm hover:shadow-md hover:border-accent-300 transition-all flex flex-col">

  <!-- Large medallion icon at top -->
  <div class="flex justify-center mb-4">
    <div class="relative inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-accent-100 to-accent-300 text-accent-700 ring-4 ring-accent-100/60">
      <svg class="h-10 w-10">…award icon…</svg>
      <!-- Optional sparkle decoration -->
      <span class="absolute -top-1 -end-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-500 text-white text-xs">★</span>
    </div>
  </div>

  <!-- Name -->
  <h3 class="text-lg font-bold text-text-base text-center leading-tight mb-1">بطل الواجبات</h3>
  <p class="text-xs text-text-muted text-center mb-4 leading-7">لمن يلتزم بتسليم كل واجباته في موعدها</p>

  <!-- Earned date + reason -->
  <div class="text-xs space-y-2 pt-3 border-t border-slate-100 mt-auto">
    <div class="flex items-center gap-2"><svg class="h-3.5 w-3.5 text-accent-700">…calendar-check…</svg><span><strong>حصل عليه:</strong> 15 يناير 2026</span></div>
    <p class="text-text-muted leading-7 italic">"تسليم جميع الواجبات في موعدها 3 أشهر متتالية — مستحق منذ بداية شهر يناير 2026."</p>
  </div>

  <!-- Visibility chip -->
  <div class="pt-3 mt-3 border-t border-slate-100">
    <span class="inline-flex items-center gap-1 rounded-full bg-success-50 text-success-700 px-2 py-0.5 text-xs font-medium border border-success-200">
      <svg class="h-3 w-3">…eye…</svg> مرئي على ملفك الشخصي
    </span>
  </div>
</article>
```

**All 7 badges** (per E2 inventory):

| # | Name | Hue | Icon | Earned date | Visibility |
|---|---|---|---|---|---|
| 1 | وسام الحضور المتميّز | success-500 → success-100 medallion | `star` | 10 أبريل 2026 | مرئي |
| 2 | بطل الواجبات | accent-500 → accent-100 | `award` | 15 يناير 2026 | مرئي |
| 3 | أوّل الفصل | primary-700 → primary-100 | `trophy` | 20 أبريل 2026 | مرئي |
| 4 | الأكثر تطوراً | info-500 → info-100 | `trending-up` | 5 مارس 2026 | مرئي |
| 5 | متقن القرآن | warning-500 → warning-100 | `book-open` | 1 مارس 2026 | **خاص** (`bg-slate-50 text-slate-700` chip with `lock` icon) |
| 6 | وسام التميّز الشهري | rose-500 → rose-100 | `medal` | 15 أبريل 2026 | مرئي |
| 7 | وسام المثابرة | emerald-500 → emerald-100 | `target` | 25 أبريل 2026 | **خاص** |

5 public + 2 private mix per FR-065.

**Visibility chip variants**:

```html
<!-- Public -->
<span class="inline-flex items-center gap-1 rounded-full bg-success-50 text-success-700 px-2 py-0.5 text-xs font-medium border border-success-200">
  <svg class="h-3 w-3">…eye…</svg> مرئي على ملفك الشخصي
</span>

<!-- Private -->
<span class="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-xs font-medium border border-slate-200">
  <svg class="h-3 w-3">…lock…</svg> خاص بك فقط
</span>
```

## Aspirational footer (`#bdg-aspiration`)

```html
<section id="bdg-aspiration" class="bg-accent-50 border-s-4 border-accent-500 rounded-2xl p-5 md:p-6 text-center md:text-start">
  <div class="flex items-center justify-center md:justify-start gap-3 flex-wrap">
    <svg class="h-10 w-10 text-accent-600">…sparkles/star…</svg>
    <div>
      <p class="text-base md:text-lg font-bold">استمر في الالتزام لتنال أوسمة جديدة</p>
      <p class="text-sm text-text-muted leading-7 mt-1">هل تعرف صديقاً يستحق وساماً؟ شجّعه ليكسب نفس الأوسمة.</p>
    </div>
  </div>
</section>
```

## Empty-state documentation

Inline HTML comment near `#bdg-grid`:

```html
<!--
  EMPTY STATE PATTERN (documented; not rendered):
  When no badges earned yet:
  <div class="text-center py-12">
    <p class="font-medium">لم تحصل على أيّ وسام حتى الآن — لكن كل تقدم يقربك من أوّل وسام لك.</p>
  </div>
-->
```

## Cross-page links

**Inbound**: `achievements.html` footer CTA + recent-badges section.

**Outbound**: Header back-link → `achievements.html`.

## Validation hooks

- **FR-060**: h2 + count "7 من 7" + motivational subtitle.
- **FR-061**: Exactly 7 badge tiles covering the locked names (Attendance Star / Homework Hero / Top of Class / Most Improved / Quran Progress / Monthly Excellence / Consistency Badge).
- **FR-062**: Each tile has icon + name + description + earned date + reason + visibility chip.
- **FR-063**: 7 distinct accent hues (success / accent / primary / info / warning / rose / emerald).
- **FR-064**: Locked dates per data-model E2.
- **FR-065**: ≥ 5 mark "مرئي" + ≥ 1 marks "خاص" — verifiable via `grep -c 'مرئي على ملفك الشخصي'` (≥ 5) and `grep -c 'خاص بك فقط'` (≥ 1).
- **FR-066**: `#bdg-aspiration` exists with motivational copy.
- **SC-006**: Visual scan finds all 7 badges + visibility mix.
