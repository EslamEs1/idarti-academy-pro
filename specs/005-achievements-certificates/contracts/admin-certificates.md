# Contract — Admin Certificates Management

`pages/admin/certificates.html` — academy-wide certificate management list with **state-aware per-row actions** (Q1 clarification). Per FR-070..077.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-xl mx-auto space-y-6">

    <section id="ac-header"> … h2 + subtitle + primary "إصدار شهادة جديدة" CTA … </section>
    <section id="ac-summary"> … 4 summary cards (per E6 admin-side) … </section>
    <section id="ac-filters"> … 4 select dropdowns + search input … </section>
    <section id="ac-list"> … ≥ 8 certificate rows (table desktop / cards mobile) per E1 admin-side … </section>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: **18-entry admin sidebar** hard-embedded verbatim from `pages/admin/dashboard.html` lines 33–192. The full enumeration in execution order: (1) الرئيسية → `dashboard.html`, (2) الطلاب → `students.html`, (3) العائلات → `families.html`, (4) المعلمون → `teachers.html`, (5) الدورات → `courses.html`, (6) الحصص المباشرة → `live-sessions.html`, (7) الواجبات → `assignments.html`, (8) الاختبارات → `exams.html`, (9) **الشهادات → `certificates.html`** (`is-active` + `aria-current="page"` on this page), (10) التقارير → `reports.html`, (11) المدفوعات → `payments.html`, (12) الفواتير → `invoices.html`, (13) إعدادات الضريبة → `tax-settings.html`, (14) أرصدة العائلات → `family-balances.html`, (15) مالية المعلمين → `teacher-finance.html`, (16) الأدوار والصلاحيات → `roles-permissions.html`, (17) المجتمع التعليمي → `social-hub.html`, (18) إعدادات المنصة → `platform-settings.html`. Plus the Log Out link at the sidebar footer. **All 18 `<a>` elements MUST be present** — copy the entire `<aside>` block from `pages/admin/dashboard.html` and only change `aria-current="page"` and `is-active` to land on entry #9.
- **Header**: same admin-shell header as the admin dashboard (admin user "مدير الأكاديمية"). `<title>` = `إدارة الشهادات — لوحة المدير — منصة إدارتي`.

## Header (`#ac-header`)

```html
<section id="ac-header">
  <div class="flex items-start justify-between gap-3 flex-wrap">
    <div>
      <h2 class="text-xl md:text-2xl font-bold leading-tight">إدارة الشهادات</h2>
      <p class="text-sm text-text-muted mt-1">18 شهادة معتمدة هذا الفصل — راجع، حرّر، أو أصدر شهادات جديدة.</p>
    </div>
    <a href="create-certificate.html" class="inline-flex items-center gap-2 rounded-xl bg-accent-500 hover:bg-accent-400 text-primary-900 px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">
      <svg class="h-4 w-4">…plus-circle…</svg> إصدار شهادة جديدة
    </a>
  </div>
</section>
```

## Summary cards (`#ac-summary`)

`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` of 4 cards from E6 admin-side: 18 / 3 / 2 / 1 with success / info / accent / danger tints.

## Filters (`#ac-filters`)

Search + 4 selects per E7 admin-side.

## Submissions table (`#ac-list`) — state-aware actions

### Desktop table (md+)

```html
<table class="w-full text-sm border-collapse">
  <thead class="bg-slate-50 text-text-muted">
    <tr>
      <th class="text-start font-semibold px-4 py-3">الطالب</th>
      <th class="text-start font-semibold px-4 py-3">الشهادة / الدورة</th>
      <th class="text-start font-semibold px-4 py-3">المعلم</th>
      <th class="text-start font-semibold px-4 py-3">النوع</th>
      <th class="text-start font-semibold px-4 py-3">تاريخ الإصدار</th>
      <th class="text-start font-semibold px-4 py-3">الحالة</th>
      <th class="text-start font-semibold px-4 py-3">إجراءات</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-100">
    <!-- 8 rows from E1 admin-side inventory -->
  </tbody>
</table>
```

### State-aware action cell pattern (per Q1 / R4 / FR-075)

Each row's `<td>` for إجراءات contains an inline-flex of 4 elements; the third one's label and tint flip per row state:

**Row 1 (Pending — بانتظار الاعتماد)**:

```html
<td class="px-4 py-3 align-top">
  <div class="inline-flex items-center gap-1">
    <a href="../student/certificate-preview.html" class="…icon-link" aria-label="عرض"><svg class="h-4 w-4">…eye…</svg></a>
    <a href="create-certificate.html" class="…icon-link" aria-label="تعديل"><svg class="h-4 w-4">…edit…</svg></a>
    <button type="button" class="inline-flex items-center gap-1 rounded-lg bg-success-100 hover:bg-success-200 text-success-700 px-2 py-1 text-xs font-semibold" aria-label="إصدار">
      <svg class="h-3.5 w-3.5">…check-circle…</svg> إصدار
    </button>
    <button type="button" class="…danger-icon-button" aria-label="إلغاء"><svg class="h-4 w-4 text-danger-600">…x-circle…</svg></button>
  </div>
</td>
```

**Rows 2-7 (Active — معتمدة)**:

```html
<td class="px-4 py-3 align-top">
  <div class="inline-flex items-center gap-1">
    <a href="../student/certificate-preview.html" class="…icon-link" aria-label="عرض"><svg class="h-4 w-4">…eye…</svg></a>
    <a href="create-certificate.html" class="…icon-link" aria-label="تعديل"><svg class="h-4 w-4">…edit…</svg></a>
    <button type="button" class="inline-flex items-center gap-1 rounded-lg bg-info-100 hover:bg-info-200 text-info-700 px-2 py-1 text-xs font-semibold" aria-label="إعادة إصدار">
      <svg class="h-3.5 w-3.5">…send…</svg> إعادة إصدار
    </button>
    <button type="button" class="…danger-icon-button" aria-label="إلغاء"><svg class="h-4 w-4 text-danger-600">…x-circle…</svg></button>
  </div>
</td>
```

**Row 8 (Revoked — ملغاة, visually muted)**:

```html
<tr class="opacity-60">
  <!-- … other cells with strikethrough applied to title via .line-through class … -->
  <td class="px-4 py-3 align-top">
    <div class="inline-flex items-center gap-1">
      <a href="../student/certificate-preview.html" class="…icon-link" aria-label="عرض"><svg class="h-4 w-4">…eye…</svg></a>
      <span class="…icon-link cursor-not-allowed text-slate-300" aria-label="تعديل (معطّل)" aria-disabled="true"><svg class="h-4 w-4">…edit…</svg></span>
      <button type="button" class="inline-flex items-center gap-1 rounded-lg bg-accent-100 hover:bg-accent-200 text-accent-700 px-2 py-1 text-xs font-semibold" aria-label="إعادة تفعيل">
        <svg class="h-3.5 w-3.5">…rotate-ccw…</svg> إعادة تفعيل
      </button>
      <span class="…icon-link cursor-not-allowed text-slate-300" aria-label="إلغاء (معطّل)" aria-disabled="true"><svg class="h-4 w-4">…x-circle…</svg></span>
    </div>
  </td>
</tr>
```

### Per-row data (E1 admin-side, 8 rows)

Per `data-model.md §E1` admin-side inventory (R8). Row 1 = Pending Quran L3 for the persona (third slot: "إصدار"). Rows 2-3 = persona's L1 + L2 active certs (third slot: "إعادة إصدار" — these reconcile with student-side `certificates.html` cards 1+2 per FR-091/093). Rows 4-7 = other students' active certs covering إتمام مستوى / تميّز شهري / إجازة قرآنية / جائزة خاصة. Row 8 = revoked attendance certificate for سارة الحربي (third slot: "إعادة تفعيل").

### Mobile cards (< md)

Stacked `<article>` cards with the same content + state-aware action cluster.

## Cross-page links

**Inbound**:

- `pages/admin/dashboard.html` line 111 (sidebar)

**Outbound**:

- "إصدار شهادة جديدة" → `create-certificate.html`
- Per-row "عرض" → `../student/certificate-preview.html`
- Per-row "تعديل" → `create-certificate.html` (with HTML comment about edit-prefill)

## Validation hooks

- **FR-070**: h2 = "إدارة الشهادات" + subtitle + 18-entry admin sidebar.
- **FR-071**: 4 summary cards (18/3/2/1).
- **FR-072**: Primary "إصدار شهادة جديدة" CTA → `create-certificate.html`.
- **FR-073**: 4 selects + search input.
- **FR-074**: ≥ 8 rows + ≥ 5 students + ≥ 4 cert types.
- **FR-075**: State-aware actions — verify (a) row 1 (pending) shows "إصدار" success-tinted, (b) rows 2-7 (active) show "إعادة إصدار" info-tinted, (c) row 8 (revoked) shows "إعادة تفعيل" accent-tinted with disabled تعديل + إلغاء.
- **FR-076**: Each of the 3 states is represented by ≥ 1 row.
- **FR-077**: Responsive table → cards.
- **SC-007**: Visual scan finds 4 cards + ≥ 8 rows + 4 actions per row + ≥ 1 muted "ملغاة" row + primary CTA.
