# Contract — Browse Courses Page

`pages/student/browse-courses.html` is the catalog discovery surface — the funnel entry for every new enrollment and every per-session booking. Per the Q1 clarification, all dual-pricing displays use the **viewer-emphasized** pattern (Arabic price bolder + larger; Foreign price as a smaller comparison line).

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <!-- Block 1: Hero -->
    <section id="bc-hero" class="bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
      <h2>اكتشف مساراتك التعليمية في إدارتي</h2>
      <p>تعلّم القرآن، اللغة العربية، الإنجليزية، الرياضيات، والدراسات الإسلامية — مع معلمين معتمدين وأسعار مرنة.</p>
      <!-- Decorative element: floating icons row -->
    </section>

    <!-- Block 2: Search + filter bar -->
    <section id="bc-search-filters" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 space-y-4">
      <div class="relative">
        <input type="text" placeholder="ابحث عن دورة، معلم، أو مهارة..." class="..." />
        <!-- search icon at inline-start -->
      </div>
      <div class="flex flex-wrap gap-2">
        <!-- 7 filter chips per E14 -->
      </div>
    </section>

    <!-- Block 3: Course grid -->
    <section id="bc-grid">
      <h3 class="text-base font-semibold mb-3">الدورات المتاحة (8)</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <!-- 8 course cards per E1 catalog inventory -->
      </div>
    </section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: 15 entries from Spec 002 hard-embedded; **active entry = "استعراض الدورات"** (`is-active` + `aria-current="page"`).
- Header: same as Spec 002 (bell-as-anchor); `<title>` = `استعراض الدورات — منصة إدارتي`; h1 = `استعراض الدورات`; subtitle = `8 دورات متاحة عبر 5 مسارات تعليمية`.

## Hero block (`#bc-hero`)

```html
<section id="bc-hero" class="bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
  <h2 class="text-xl md:text-2xl font-bold leading-tight">اكتشف مساراتك التعليمية في إدارتي</h2>
  <p class="text-white/85 text-sm md:text-base mt-2 leading-7 max-w-3xl">
    تعلّم القرآن الكريم، اللغة العربية، الإنجليزية، الرياضيات، والدراسات الإسلامية —
    مع معلمين معتمدين وأسعار مرنة تناسب الطلاب العرب وغير الناطقين بالعربية.
  </p>
  <!-- Decorative icon row (5 subject icons in white/20 chips) -->
  <div class="flex flex-wrap gap-2 mt-4">
    <span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 text-white px-3 py-1 text-xs font-semibold">
      <svg class="h-3.5 w-3.5">{book-open}</svg> القرآن الكريم
    </span>
    <!-- repeat for اللغة العربية, اللغة الإنجليزية, الرياضيات, الدراسات الإسلامية -->
  </div>
</section>
```

## Search input (FR-011)

```html
<div class="relative">
  <svg class="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-text-muted" aria-hidden="true">{search}</svg>
  <input type="text"
         placeholder="ابحث عن دورة، معلم، أو مهارة..."
         class="block w-full rounded-xl border border-slate-200 bg-surface-50 ps-10 pe-4 py-2.5 text-sm placeholder:text-text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500" />
</div>
```

The input is purely visual — no JS handler.

## Filter chips (FR-012)

7 chips per `data-model.md §E14`:

```html
<div class="flex flex-wrap gap-2">
  <button type="button" class="inline-flex items-center gap-1.5 rounded-full bg-surface-100 hover:bg-surface-200 text-text-base px-3.5 py-1.5 text-sm font-medium border border-slate-200">
    <svg class="h-3.5 w-3.5">{book-open}</svg>
    القرآن الكريم
  </button>
  <!-- repeat for the other 6 chips -->
</div>
```

`<button type="button">` is used so the elements are keyboard-focusable. None are pre-selected; no JS.

## Course card contract (FR-013, FR-014, FR-015, FR-016)

Each of 8 cards follows this structure:

```html
<article class="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">

  <!-- Optional corner badge -->
  <span class="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-{badge-token}-100 text-{badge-token}-700 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide">
    {badgeLabelAr}
  </span>

  <!-- Card image / icon header (subject-themed) -->
  <div class="h-28 bg-gradient-to-l from-{subject-token}-50 to-{subject-token}-100 rounded-t-2xl flex items-center justify-center">
    <svg class="h-12 w-12 text-{subject-token}-600">{subject-icon}</svg>
  </div>

  <div class="p-4 flex flex-col flex-1">

    <!-- Type + level pills -->
    <div class="flex items-center gap-2 mb-2">
      <span class="inline-flex items-center rounded-full bg-info-100 text-info-700 px-2 py-0.5 text-[0.625rem] font-semibold">{typeLabelAr}</span>
      <span class="inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[0.625rem] font-semibold">{levelLabelAr}</span>
    </div>

    <!-- Title -->
    <h3 class="text-base font-bold text-text-base leading-tight">{titleAr}</h3>

    <!-- Description -->
    <p class="text-xs text-text-muted leading-7 mt-1.5">{descriptionAr}</p>

    <!-- Teacher row -->
    <div class="flex items-center gap-2 mt-3">
      <div class="h-7 w-7 rounded-full bg-primary-700 text-white inline-flex items-center justify-center text-[0.625rem] font-semibold">أ.أ</div>
      <div class="text-xs">
        <p class="font-semibold text-text-base leading-tight">{teacherNameAr}</p>
        <p class="text-text-muted leading-tight">{teacherTitleAr}</p>
      </div>
    </div>

    <!-- Duration -->
    <p class="text-xs text-text-muted mt-2 inline-flex items-center gap-1">
      <svg class="h-3 w-3">{clock}</svg>
      {durationLabelAr}
    </p>

    <!-- Pricing block (Q1 clarification: viewer-emphasized) -->
    <div class="mt-4 pt-3 border-t border-slate-100">
      <!-- Matching rate (Arabic — emphasized) -->
      <div class="flex items-baseline gap-1">
        <span class="text-xl font-extrabold text-accent-700">{priceArabicFullMonthly}</span>
        <span class="text-sm font-medium text-text-base">ر.س / شهر (للطالب العربي)</span>
      </div>
      <!-- Comparison rate (Foreign — smaller) -->
      <p class="text-xs text-text-muted mt-1">
        للطلاب غير الناطقين بالعربية:
        <span class="font-semibold text-text-base">{priceForeignFullMonthly} USD / شهر</span>
      </p>
    </div>

    <!-- CTA -->
    <a href="course-details.html" class="mt-4 inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors">
      عرض التفاصيل
      <svg class="h-4 w-4 rtl:rotate-180">{chevron-left}</svg>
    </a>

  </div>
</article>
```

## Badge token map (FR-015)

| badgeKey | badgeLabelAr | colorToken |
|---|---|---|
| `popular` | الأكثر طلباً | `accent` (gold) |
| `new` | جديد | `success` (green) |
| `recommended` | موصى بك | `primary` (navy) |

## Subject token map (card image header)

| subjectKey | colorToken | iconLucide |
|---|---|---|
| `quran` | `primary` | book-open |
| `arabic` | `accent` | languages |
| `english` | `info` | globe |
| `math` | `success` | calculator |
| `islamic-studies` | `warning` | landmark |

## Responsive grid

- `< sm` (mobile, < 640 px): 1 column
- `sm-lg` (640-1023 px): 2 columns
- `lg-xl` (1024-1279 px): 3 columns
- `xl+` (≥ 1280 px): 4 columns (8 cards = exactly 2 rows)

## Inbound / outbound links

**Inbound**: sidebar "استعراض الدورات", dashboard hero "متابعة التعلم" (indirect via my-courses).
**Outbound**: every card "عرض التفاصيل" → `course-details.html`. Filter chips and search input are visual only (no outbound).
