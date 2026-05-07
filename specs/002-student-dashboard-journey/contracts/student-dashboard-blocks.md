# Contract — Student Dashboard Blocks

This contract defines the ten content blocks of `pages/student/dashboard.html` in their final order (post-Q3 clarification: Parent Confidence moves to position 2). Each block has a stable HTML id, a fixed grid placement, and a field-level content contract.

The dashboard `<main>` uses the same wrapper from Spec 001:

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">
    <!-- block 1 -->
    <section id="db-hero" class="...">…</section>
    <!-- block 2 -->
    <section id="db-parent-snapshot" class="...">…</section>
    <!-- … -->
  </div>
</main>
```

## Block 1 — Welcome Hero (`#db-hero`)

**Grid**: full-width single card.
**Visual**: `bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-6 md:p-8 shadow-md`.

**Required fields**:
- Greeting: `أهلاً بعودتك، عبد الرحمن!` — `<h2>`, `text-xl md:text-2xl font-bold`.
- Path + level: `أنت الآن في مسار القرآن الكريم — المستوى الثالث`.
- Motivational sentence: `هدفك هذا الأسبوع: حضور حصتين وتسليم 3 واجبات.`
- Monthly progress: `<div role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" aria-label="التقدّم الشهري 68%">…</div>` + numeric `68%` label.
- Primary CTA: `<a href="weekly-plan.html" class="bg-accent-500 text-primary-900 …">عرض خطة الأسبوع</a>`.
- Secondary CTA: `<a href="my-courses.html" class="border border-white/40 text-white …">متابعة التعلم</a>`.

## Block 2 — Parent Confidence Snapshot (`#db-parent-snapshot`)

**Grid**: full-width single card.
**Visual**: `bg-accent-50 border-s-4 border-accent-500 rounded-2xl p-5 md:p-6 shadow-sm`.

**Required fields**:
- Caption: `ملخص يمكن لولي الأمر متابعته` — small `text-xs uppercase tracking-wide text-accent-700 font-semibold`.
- Four data rows in a `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`:
  1. Attendance: `92%` + `معدّل الحضور` + `users` icon.
  2. Homework: `85%` + `الالتزام بالواجبات` + `book-open-check` icon.
  3. Last teacher note: `<blockquote class="border-s-2 border-accent-300 ps-3 text-sm leading-7">…</blockquote>` + teacher name caption.
  4. Next evaluation: `12 مايو 2026` + `تقييم شهر مايو` + `calendar-clock` icon.

## Block 3 — Monthly Progress Overview (`#db-monthly-progress`)

**Grid**: `grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4`.

Six stat cards (one per metric from E1 fields). Each card:

```
┌──────────────────┐
│  [icon]   value  │
│  Arabic label    │
│  delta chip      │
└──────────────────┘
```

Card classes: `bg-white rounded-xl border border-slate-200 p-4 shadow-sm`. Icon in `h-10 w-10 rounded-full bg-{token}-100 text-{token}-700`.

Required cards (in order): attendance %, homework %, quiz average %, level progress %, achievement points (numeric), active live sessions (count).

## Block 4 — Weekly Goals (`#db-weekly-goals`)

**Grid**: full-width card containing a `<ul>` of 4 goals.
**Visual**: `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`.

Each goal row:
- Inline checkbox (visual only) on the inline-start.
- Goal text in `text-sm`.
- Status badge from data-model E3 on the inline-end.
- `gap-3 py-2.5 border-b border-slate-100 last:border-0`.

Section header: `أهداف هذا الأسبوع` (`<h3 class="text-base font-semibold mb-3">`) + a "عرض خطة الأسبوع كاملة" `<a>` linking to `weekly-plan.html`.

## Block 5 — Upcoming Live Session (`#db-upcoming-session`)

**Grid**: 2-column on `xl:` (this card + Block 6 share one row); single column below.
**Visual**: `bg-primary-50 border border-primary-200 rounded-xl p-5 shadow-sm`.

Required fields per data-model E4:
- Title (`<h3 class="text-lg font-bold">`).
- Teacher row: avatar initials + name.
- Date/time: `الإثنين 28 أبريل 2026 — 7:00 م`.
- Course badge.
- Type badge: `جماعي` / `خاص`.
- Primary "انضمام للحصة" button + secondary "إضافة للتقويم" button.

## Block 6 — Homework Reminders (`#db-homework`)

**Grid**: shares the `xl:` row with Block 5; single column below.
**Visual**: `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`.

Section header: `الواجبات المستحقة` + count `(3)`. Body: `<ul>` of ≥ 3 homework rows per E5. Footer link: `عرض كل الواجبات` → `assignments.html`.

## Block 7 — Teacher Notes (`#db-teacher-notes`)

**Grid**: `grid grid-cols-1 lg:grid-cols-3 gap-4` of 3 note cards.

Each note card per E6 (positive / improvement / Quran-specific). Visual differentiation via `border-s-4` color: success / accent / primary.

## Block 8 — Learning Path Progress (`#db-path-progress`)

**Grid**: full-width card.
**Visual**: `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`.

Section header: `مسار القرآن الكريم — التقدّم العام` + overall path % progress bar.

Below: a horizontal stepper on `lg:+` (vertical on mobile) showing the four levels per E2:

```
[●]──[●]──[◆]──[○]
 L1    L2    L3    L4
done  done  HALYA  locked
```

Active level (Level 3) gets the accent ring + "حالياً" label + level progress mini-bar `60%`.

## Block 9 — Achievement Preview (`#db-achievements`)

**Grid**: full-width card containing a `grid grid-cols-1 sm:grid-cols-3 gap-3` of 3 badge cards per E7. Section header: `إنجازاتك الأخيرة` + CTA: `عرض كل الإنجازات` → `achievements.html`.

## Block 10 — Journey Timeline Preview (`#db-journey-preview`)

**Grid**: full-width card.
**Visual**: `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`.

Section header: `محطات من رحلتك` + CTA: `عرض الرحلة كاملة` → `learning-journey.html`.

Body: a compact vertical timeline of the **5 most recent** milestones from E8 (positions 5–9: monthly quiz passed → Level 1 completed → first certificate → first badge → current Level 3 start). Each entry: dot + date + title + status badge inline. The current milestone (Level 3 start) carries the `حالياً` indicator.

## Cross-block rules

- Top-to-bottom spacing: `space-y-6` on the inner wrapper.
- Each card's heading uses `text-base font-semibold` unless explicitly noted; body text uses `text-sm leading-7` for prose, `text-sm` for inline labels.
- Every CTA links to a real-or-planned target (no `href="#"`); planned targets follow Spec 001's sidebar URL conventions.
- Every status indicator pairs color with text or icon (FR-035 carry-over).
