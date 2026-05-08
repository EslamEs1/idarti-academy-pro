# Contract — Admin Create Certificate Form

`pages/admin/create-certificate.html` — 8-field form for issuing a new certificate. Per FR-080..086.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-lg mx-auto space-y-6">

    <section id="cc-header"> … breadcrumb + h2 + caption … </section>
    <section id="cc-form"> … 8-field form in 2-col grid … </section>
    <section id="cc-actions"> … 3 action buttons + prototype notice … </section>

  </div>
</main>
```

## Sidebar / header

- **Sidebar**: 18-entry admin sidebar, **active = "الشهادات"** (same enumeration as `admin/certificates.html`).
- **Header**: same admin-shell header. `<title>` = `إصدار شهادة جديدة — لوحة المدير — منصة إدارتي`.

## Header (`#cc-header`)

```html
<section id="cc-header">
  <nav aria-label="breadcrumb" class="text-xs text-text-muted mb-3 flex items-center flex-wrap gap-1.5">
    <a href="certificates.html" class="hover:text-primary-700 hover:underline">إدارة الشهادات</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page" class="text-text-base">إصدار شهادة جديدة</span>
  </nav>
  <h2 class="text-xl md:text-2xl font-bold leading-tight">إصدار شهادة جديدة</h2>
  <p class="text-sm text-text-muted mt-1 leading-7">املأ الحقول التالية لإنشاء شهادة معتمدة جديدة. الشهادة تظهر للطالب وولي الأمر بعد الاعتماد.</p>
</section>
```

## Form (`#cc-form`) — FR-081 / FR-082 / FR-083

Outer wrapper (NO `<form action>` — visual only):

```html
<section id="cc-form" class="bg-white rounded-2xl p-5 md:p-6 lg:p-8 shadow-sm border border-slate-200">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <!-- 8 fields, each in its own labeled wrapper -->
  </div>
</section>
```

### Field 1 — الطالب

```html
<div class="md:col-span-1">
  <label for="cc-student" class="block text-sm font-semibold mb-2">الطالب <span class="text-danger-600">*</span></label>
  <select id="cc-student" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none">
    <option selected>عبد الرحمن مؤمن</option>
    <option>محمد السعيدي</option>
    <option>ليلى المنصور</option>
    <option>فيصل العتيبي</option>
    <option>أحمد الغامدي</option>
    <option>عمر القحطاني</option>
    <option>ريم الدوسري</option>
    <option>سارة الحربي</option>
  </select>
</div>
```

### Field 2 — نوع الشهادة

```html
<div class="md:col-span-1">
  <label for="cc-type" class="block text-sm font-semibold mb-2">نوع الشهادة <span class="text-danger-600">*</span></label>
  <select id="cc-type" class="…">
    <option selected>إتمام مستوى</option>
    <option>تميّز شهري</option>
    <option>حضور والتزام</option>
    <option>إجازة قرآنية</option>
    <option>جائزة خاصة</option>
  </select>
</div>
```

### Field 3 — الدورة

```html
<div class="md:col-span-1">
  <label for="cc-course" class="block text-sm font-semibold mb-2">الدورة <span class="text-danger-600">*</span></label>
  <select id="cc-course" class="…">
    <option selected>القرآن الكريم — المستوى الثالث</option>
    <option>القرآن الكريم — المستوى الثاني</option>
    <option>القرآن الكريم — المستوى الأول</option>
    <option>اللغة العربية — التعبير</option>
    <option>اللغة العربية — النحو</option>
    <option>الدراسات الإسلامية — السيرة</option>
    <option>الرياضيات — الأساسيات</option>
  </select>
</div>
```

### Field 4 — المستوى

```html
<div class="md:col-span-1">
  <label for="cc-level" class="block text-sm font-semibold mb-2">المستوى</label>
  <select id="cc-level" class="…">
    <option selected>المستوى الثالث</option>
    <option>المستوى الأول</option>
    <option>المستوى الثاني</option>
    <option>المستوى الرابع</option>
    <option>غير قابل للتطبيق</option>
  </select>
</div>
```

### Field 5 — المعلم الموقّع

```html
<div class="md:col-span-1">
  <label for="cc-teacher" class="block text-sm font-semibold mb-2">المعلم الموقّع <span class="text-danger-600">*</span></label>
  <select id="cc-teacher" class="…">
    <option selected>الأستاذ أحمد بن عبد الله</option>
    <option>الأستاذة سلمى الحارثي</option>
    <option>الشيخ عبد الله الراشد</option>
    <option>الأستاذ عمر الزهراني</option>
    <option>إدارة الأكاديمية</option>
  </select>
</div>
```

### Field 6 — تاريخ الإصدار

```html
<div class="md:col-span-1">
  <label for="cc-date" class="block text-sm font-semibold mb-2">تاريخ الإصدار <span class="text-danger-600">*</span></label>
  <input type="date" id="cc-date" value="2026-05-08" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
</div>
```

### Field 7 — سبب الإصدار (full width)

```html
<div class="md:col-span-2">
  <label for="cc-reason" class="block text-sm font-semibold mb-2">سبب الإصدار <span class="text-danger-600">*</span></label>
  <textarea id="cc-reason" rows="3" class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none">إتمام جميع متطلبات المستوى الثالث بنجاح وبتقدير ممتاز</textarea>
  <p class="text-xs text-text-muted mt-1.5">سيظهر هذا النص على الشهادة كسبب الاعتماد.</p>
</div>
```

### Field 8 — ملاحظات إضافية (full width)

```html
<div class="md:col-span-2">
  <label for="cc-notes" class="block text-sm font-semibold mb-2">ملاحظات إضافية <span class="text-xs font-normal text-text-muted">(اختياري)</span></label>
  <textarea id="cc-notes" rows="3" placeholder="أيّ ملاحظات داخلية للأرشيف — لا تظهر على الشهادة." class="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"></textarea>
</div>
```

## Action area (`#cc-actions`) — FR-084 / FR-085

```html
<section id="cc-actions" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <div class="flex flex-wrap items-center gap-3 mb-3">

    <!-- Primary: Preview -->
    <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white px-5 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">
      <svg class="h-4 w-4">…eye…</svg> معاينة الشهادة
    </button>

    <!-- Secondary: Save -->
    <button type="button" class="inline-flex items-center gap-2 rounded-xl border border-success-500 text-success-700 hover:bg-success-50 px-5 py-3 text-sm font-bold transition-colors">
      <svg class="h-4 w-4">…save…</svg> حفظ الشهادة
    </button>

    <!-- Tertiary: Cancel -->
    <a href="certificates.html" class="text-xs text-text-muted hover:text-text-base hover:underline">إلغاء</a>
  </div>

  <p class="text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">
    <svg class="h-4 w-4 flex-shrink-0">…info…</svg>
    هذا نموذج تجريبي — لا يتم حفظ الشهادة فعلياً.
  </p>
</section>
```

## Cross-page links

**Inbound**:

- `admin/certificates.html` "إصدار شهادة جديدة" primary CTA + per-row "تعديل" link

**Outbound**:

- "معاينة الشهادة" → no real navigation (visual stub; would conceptually open `../student/certificate-preview.html`)
- "حفظ الشهادة" → no real navigation
- "إلغاء" → `certificates.html`

## Validation hooks

- **FR-080**: h2 + breadcrumb + caption.
- **FR-081**: Exactly 8 form inputs in 2-col grid (1 col mobile).
- **FR-082**: Each input has a paired `<label for="…">` matching the input's `id`. Verify via grep: every `id="cc-*"` appears in a corresponding `for="cc-*"`.
- **FR-083**: Pre-filled values match the persona's "next imaginable certificate" (Quran L3).
- **FR-084**: 3 action elements — 2 `<button type="button">` + 1 `<a href="certificates.html">`.
- **FR-085**: Prototype notice present.
- **FR-086**: 2-col grid at md+ → 1-col below md.
- **SC-008**: Visual scan finds 8 labeled inputs + 3 actions + prototype notice.
