# Contract — Weekly Plan Page

`pages/student/weekly-plan.html` shows the student's plan for the current week. It contains exactly **9 content blocks** in this order: week range header, weekly goals, upcoming sessions, homework deadlines, review tasks, exam preparation, teacher reminders, progress checklist, motivational note.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <!-- Block 1: Week range header -->
    <section id="wk-range" class="…">…</section>

    <!-- Blocks 2–9 in a responsive grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section id="wk-goals" class="lg:col-span-1">…</section>
      <section id="wk-sessions" class="lg:col-span-2">…</section>
      <section id="wk-homework" class="lg:col-span-2">…</section>
      <section id="wk-reviews" class="lg:col-span-1">…</section>
      <section id="wk-exam-prep" class="lg:col-span-1">…</section>
      <section id="wk-teacher-reminders" class="lg:col-span-2">…</section>
      <section id="wk-checklist" class="lg:col-span-2">…</section>
      <section id="wk-motivation" class="lg:col-span-1">…</section>
    </div>
  </div>
</main>
```

## Block 1 — Week Range Header (`#wk-range`)

Full-width `bg-gradient-to-l from-primary-700 to-primary-900 text-white rounded-2xl p-5 md:p-6 shadow-md`. Contents:
- `<h2 class="text-xl md:text-2xl font-bold">27 أبريل – 3 مايو 2026</h2>`.
- Subtitle: `الأسبوع الحالي من مسار القرآن الكريم — المستوى الثالث`.
- Quick metric row: 3 inline mini-pills — `5 حصص مجدولة`, `4 واجبات مستحقة`, `1 اختبار شهري قادم`.

## Block 2 — Weekly Goals (`#wk-goals`)

Same content as the dashboard's Block 4 (E3 4 goals). Card visual: `bg-white rounded-xl border border-slate-200 p-5 shadow-sm`.

## Block 3 — Upcoming Sessions (`#wk-sessions`)

Header: `الحصص المباشرة لهذا الأسبوع`. Body: ≥ 2 session rows per E9.2. Each row reuses the E4 visual contract (compact variant): teacher avatar + title + date/time + course badge + type badge + "انضمام للحصة" button. Footer link: `عرض التقويم الكامل` → `calendar.html`.

## Block 4 — Homework Deadlines (`#wk-homework`)

Header: `مواعيد تسليم الواجبات`. Body: ≥ 3 homework rows per E9.3 (reuses E5 shape). Each row: title + course chip + due-date pill + status badge + "عرض الواجب" link.

## Block 5 — Review Tasks (`#wk-reviews`)

Header: `مهام المراجعة`. Body: `<ul>` of ≥ 2 items per E9.4. Each item: title (`text-sm font-medium`) + suggested duration (`text-xs text-text-muted`) + an inline `book-marked` icon.

## Block 6 — Exam Preparation (`#wk-exam-prep`)

Header: `استعداد للاختبار الشهري`. Body: `<ul>` of ≥ 2 items per E9.5 plus a banner: "اختبار المستوى الثالث في 5 مايو 2026 — تبقّى 6 أيام" using `bg-warning-50 border-s-4 border-warning-400`.

## Block 7 — Teacher Reminders (`#wk-teacher-reminders`)

Header: `تذكيرات من المعلمين`. Body: `<ul>` of ≥ 2 reminder cards per E9.6. Each card: `bg-accent-50 border border-accent-200 rounded-lg p-3` containing the teacher avatar + reminder text + date.

## Block 8 — Progress Checklist (`#wk-checklist`)

Header: `قائمة الإنجاز اليومي`. Body: `<ul>` of ≥ 5 checklist items per E9.7. Each row:

```html
<li class="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
  <input type="checkbox" disabled class="…" {checked-or-not} />
  <span class="text-sm {checked: 'line-through text-text-muted'} {unchecked: 'text-text-base'}">{labelAr}</span>
</li>
```

The `disabled` attribute keeps the visual state without inviting interaction (the prototype is read-only). 2 of 5 items are pre-checked.

## Block 9 — Motivational Note (`#wk-motivation`)

Card with `bg-success-50 border-s-4 border-success-500 rounded-xl p-5`. Contents:
- Quote-style block per E9.8 (single Arabic message, 1–3 sentences).
- Attribution row: avatar of the teacher (`الأستاذ أحمد`) + name + date `27 أبريل 2026`.
- Visual ornament: a `quote` Lucide icon in the top-start corner at `text-success-300`.

## Empty-state fallback

If any block were empty (which the contract forbids — every block has ≥ 2 items), the fallback message would read: `لا توجد عناصر في هذا القسم لهذا الأسبوع — أحسنت!` This contract enforces non-empty content; the empty-state markup is documented for completeness but not exercised on this page.

## Cross-block rules

- Card heading: `<h3 class="text-base font-semibold mb-3">`.
- Card body padding: `p-5`.
- Section gaps: `gap-6` (lg:) and `space-y-6` (top-level wrapper).
- All dates use Arabic Gregorian + Latin digits (e.g., `30 أبريل 2026`).
- All status badges drawn from the Spec 001 19-badge catalog.
