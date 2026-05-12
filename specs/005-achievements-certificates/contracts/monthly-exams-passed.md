# Contract — Student Monthly Exams Passed

`pages/student/monthly-exams-passed.html` — chronological list of 5 passed monthly exams. Per FR-040..043.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <section id="mep-header"> … h2 + count + cumulative average … </section>
    <section id="mep-list"> … 5 exam rows (table desktop / cards mobile) per E3 … </section>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: 15-entry student sidebar, **active = "الإنجازات"**.
- **Header**: same Spec 002 chrome. `<title>` = `الاختبارات الشهرية المجتازة — منصة إدارتي`.

## Header (`#mep-header`)

```html
<section id="mep-header">
  <div class="flex items-start justify-between gap-3 flex-wrap">
    <div>
      <h2 class="text-xl md:text-2xl font-bold leading-tight">الاختبارات الشهرية المجتازة</h2>
      <p class="text-sm text-text-muted mt-1">5 اختبارات منذ ديسمبر 2025 — متوسط درجاتك: <strong class="text-success-700">86.6 من 100</strong>.</p>
    </div>
    <a href="achievements.html" class="text-xs text-text-muted hover:underline">← العودة للإنجازات</a>
  </div>
</section>
```

## Exam list (`#mep-list`)

### Desktop table (md+)

```html
<div class="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
  <table class="w-full text-sm border-collapse">
    <thead class="bg-slate-50 text-text-muted">
      <tr>
        <th class="text-start font-semibold px-4 py-3">الشهر</th>
        <th class="text-start font-semibold px-4 py-3">الدورة</th>
        <th class="text-start font-semibold px-4 py-3">الدرجة</th>
        <th class="text-start font-semibold px-4 py-3">النسبة</th>
        <th class="text-start font-semibold px-4 py-3">الحالة</th>
        <th class="text-start font-semibold px-4 py-3">ملاحظة المعلم</th>
        <th class="text-start font-semibold px-4 py-3">إجراء</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <!-- 5 rows from E3 inventory in reverse-chronological order -->
    </tbody>
  </table>
</div>
```

**Per-row pattern** (Row 2 — 95% example):

```html
<tr class="hover:bg-success-50/30 transition-colors">
  <td class="px-4 py-3 align-top"><p class="font-semibold">مارس 2026</p><p class="text-xs text-text-muted mt-0.5">الاختبار الشهري النهائي للمستوى الثاني</p></td>
  <td class="px-4 py-3 align-top text-xs">القرآن الكريم — المستوى الثاني</td>
  <td class="px-4 py-3 align-top"><p class="text-base font-bold text-success-700">95 / 100</p></td>
  <td class="px-4 py-3 align-top">
    <div class="flex items-center gap-2">
      <div class="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden min-w-[5rem]"><div class="h-full bg-success-500" style="width: 95%"></div></div>
      <span class="text-xs font-bold text-success-700">95%</span>
    </div>
  </td>
  <td class="px-4 py-3 align-top"><span class="inline-flex items-center gap-1 rounded-full bg-success-100 text-success-700 px-2 py-0.5 text-xs font-semibold"><svg class="h-3 w-3">…award…</svg>ممتاز</span></td>
  <td class="px-4 py-3 align-top"><p class="text-xs text-text-base italic max-w-xs">"الأعلى في الفصل — أداء استثنائي يستحق التميّز الشهري."</p></td>
  <td class="px-4 py-3 align-top"><a href="#planned" class="text-xs font-medium text-accent-700 hover:underline">عرض التقرير</a></td>
</tr>
```

(Rows 1, 3, 4, 5 follow the same pattern with their own data per E3.)

### Mobile cards (< md)

Stacked `<article>` cards with the same content but in a vertically-laid-out card. Reuses the Spec 004 mobile-cards pattern.

## Empty-state documentation

Inline HTML comment near the bottom of `#mep-list`:

```html
<!--
  EMPTY STATE PATTERN (documented; not rendered):
  When the student has no passed exams yet:
  <div class="text-center py-12">
    <p class="text-sm font-medium">لم تجتز أيّ اختبار شهري بعد — اجتاز اختبارك الأول لتظهر هنا.</p>
  </div>
-->
```

## Cross-page links

**Inbound**: `achievements.html` footer CTA.

**Outbound**:
- Per-row "عرض التقرير" → `#planned` placeholder (future-spec exam-report page).
- Header back-link → `achievements.html`.

## Validation hooks

- **FR-040**: h2 + count caption "5 اختبارات منذ ديسمبر 2025" + cumulative avg "86.6 من 100".
- **FR-041**: 5 rows in reverse-chronological order with the locked scores (88/95/82/78/90).
- **FR-042**: Each row has all 7 required cells.
- **FR-043**: Responsive table → cards.
- **SC-004**: Visual scan finds 5 exams + highest 95% + average 86.6% + Monthly Excellence anchor (March row).
