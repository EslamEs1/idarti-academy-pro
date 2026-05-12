# Contract — `pages/student/invoice-details.html`

**User story**: US1 (Student & parent see family finances, P1) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Anchor invoice**: **INV-2026-0184** (April 2026 subscription, مدفوعة via 3 streams + auto-balance).
**Active sidebar entry**: Payment History (deep-read of payment-history.html).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Breadcrumb | `#inv-breadcrumb` | "سجل المدفوعات / فاتورة INV-2026-0184" |
| Invoice header | `#inv-header` | invoice number + dates + status badge + auto-close caption |
| Student info | `#inv-student` | name + grade + track + STD-id |
| Family info | `#inv-family` | parent + family-id + enrolled siblings |
| Line items | `#inv-items` | 1-line items table for the actual invoice |
| Item-type reference panel | `#inv-types-ref` | static reference of all 4 item-type examples |
| Financial breakdown | `#inv-breakdown` | 8-line breakdown |
| Payment-method panel | `#inv-streams` | 3-stream chronological list with auto-pill |
| Download button cluster | `#inv-actions` | 2 visual download buttons |
| Tax footer note | `#inv-tax-footer` | tax number + note |

## Required content

### Breadcrumb (`#inv-breadcrumb`)

`<nav>` element: `سجل المدفوعات` → `فاتورة INV-2026-0184` (last crumb non-link).

### Invoice header (`#inv-header`) — FR-020

| Field | Value |
|-------|-------|
| Invoice number | INV-2026-0184 |
| Issue date | 2026-04-01 |
| Due date | 2026-04-30 |
| Status badge | مدفوعة (success-tone) |
| Caption (below badge) | أُغلقت تلقائياً بتطبيق رصيد العائلة في تاريخ الاستحقاق |

### Student info (`#inv-student`) — FR-021

- الاسم: عبد الرحمن مؤمن
- الصف: السادس
- المسار: مسار القرآن الكريم — المستوى الثالث
- رقم الطالب: STD-2024-0817

### Family info (`#inv-family`) — FR-022

- ولي الأمر: ولي أمر الطالب عبد الرحمن
- رقم العائلة: FAM-2023-0211
- الإخوة المسجّلون: سارة مؤمن (الصف الثالث)

### Line items (`#inv-items`)

1-row line-items table. Columns: نوع البند، البند، الفترة، الكمية، السعر، الإجمالي.

| # | Type | Item | Period | Qty | Price | Total |
|---|------|------|--------|-----|-------|-------|
| 1 | دورة كاملة | اشتراك دورة القرآن الكريم — المستوى الثالث (شهر أبريل 2026) | شهر أبريل 2026 | 1 | 380.00 ريال | 380.00 ريال |

The "اشتراك دورة القرآن الكريم — المستوى الثالث" cell is a hyperlink (`<a href="course-details.html">`) per FR-027.

### Item-type reference panel (`#inv-types-ref`) — FR-023

Heading: "مرجع: أنواع البنود المدعومة" (text-sm, neutral-700, info-callout boxed).
Caption: "هذه الفاتورة تحتوي على بند واحد فقط. الجدول أدناه يوضّح أنواع البنود التي قد تظهر في فواتير أخرى:"

| Type | Sample item | Sample price |
|------|-------------|--------------|
| دورة كاملة | اشتراك دورة القرآن الكريم — المستوى الثالث (شهر أبريل 2026) | 380.00 ريال |
| حصة مباشرة محدّدة | حصة قراءة المتشابهات — 18 أبريل 2026 | 60.00 ريال |
| حصة خاصة | حصة فردية لمراجعة الأخطاء — 12 مارس 2026 | 80.00 ريال |
| حصة جماعية | حلقة مذاكرة جماعية — 3 أبريل 2026 | 45.00 ريال |

This is **reference text**, not actual invoice line items.

### Financial breakdown (`#inv-breakdown`) — FR-024

Right-aligned (RTL-natural) financial-breakdown panel:

| Line | Amount |
|------|--------|
| المجموع الفرعي | 380.00 ريال |
| الخصم | 0.00 ريال |
| الضريبة (15%) | 57.00 ريال |
| الرصيد العائلي المُستخدَم | 67.00 ريال |
| المبلغ المدفوع | 437.00 ريال |
| المبلغ المتبقّي | 0.00 ريال |
| **الإجمالي** | **437.00 ريال** |
| الحالة | مدفوعة |

### Payment-method panel (`#inv-streams`) — FR-025

Three-row chronological list:

| # | Date | Method | Amount | Note |
|---|------|--------|--------|------|
| 1 | 2026-04-12 | بطاقة مدى | 200.00 ريال | — |
| 2 | 2026-04-25 | تحويل بنكي | 170.00 ريال | — |
| 3 | 2026-04-30 | رصيد العائلة | 67.00 ريال | (تطبيق تلقائي عند تاريخ الاستحقاق) — **تلقائي** pill rendered |

The third row's "تلقائي" pill uses info-50 background + bolt icon (per research.md §R12). Sum = 200 + 170 + 67 = **437.00 ريال** ✓.

### Download button cluster (`#inv-actions`) — FR-026

Two `<button type="button">` buttons in a horizontal cluster:
- Primary: `تنزيل الفاتورة (PDF)` — neutral-tone with download icon
- Secondary: `تنزيل إيصال الدفع (PDF)` — neutral-tone with download icon

Both visual-only — no `<a download>` attribute, no real PDF file. Constitution Principle II permits download-button visuals when no real file is bundled.

### Tax footer note (`#inv-tax-footer`)

Small caption (text-xs, neutral-600): "السعر شامل ضريبة القيمة المضافة. الرقم الضريبي: 312345678900003."

## Cross-references

- Sidebar: byte-identical to student dashboard sidebar. Active = "Payment History".
- Breadcrumb: links back to `payment-history.html`.
- Line item full-course: links to `course-details.html` (Spec 003) per FR-027.

## Non-requirements (explicit)

- No "Pay now" CTA (invoice is fully paid; this is an archive view).
- No JS handlers — every interaction is visual or navigational (real `href` to existing pages).
- No "Cancel invoice" / "Mark paid" / "Add payment" actions — those belong on the admin-side `invoice-details.html`.
