# Contract — `pages/admin/invoice-details.html`

**User story**: US2 (Admin operates payments and invoices, P2) — see spec.md.
**Anchor invoice**: **INV-2026-0184** (same as student-side invoice-details.html — per research.md §R15).
**Active sidebar entry**: Invoices.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Breadcrumb | `#aid-breadcrumb` | "الفواتير / فاتورة INV-2026-0184" |
| Invoice header | `#aid-header` | invoice number + dates + status + auto-close caption |
| Two-column layout | (CSS grid) | left = invoice content, right = admin-only panels |
| Student info | `#aid-student` | name + grade + STD-id |
| Family info | `#aid-family` | parent + family-id |
| Line items | `#aid-items` | 1-row line-items table |
| Financial breakdown | `#aid-breakdown` | 8-line breakdown (identical to student page) |
| VAT line callout | `#aid-vat` | tax-number + tooltip → tax-settings.html |
| Payment-records timeline | `#aid-timeline` | 3 chronological events (admin-only) |
| Family-balance usage panel | `#aid-balance-usage` | -67.00 ريال + cross-link |
| Admin-notes panel | `#aid-admin-notes` | ≥ 2 entries |
| Action bar | `#aid-actions` | 5 buttons |

## Required content

### Breadcrumb (`#aid-breadcrumb`)

`<nav>`: `الفواتير` → `فاتورة INV-2026-0184` (last crumb non-link). The "الفواتير" crumb links to `invoices.html` (admin-side).

### Invoice header (`#aid-header`) — FR-070

Same fields as student-side:
- INV-2026-0184 / Issue 2026-04-01 / Due 2026-04-30 / Status badge "مدفوعة" / Caption "أُغلقت تلقائياً بتطبيق رصيد العائلة في تاريخ الاستحقاق".

### Student info (`#aid-student`)

عبد الرحمن مؤمن / الصف السادس / مسار القرآن الكريم — المستوى الثالث / STD-2024-0817.

### Family info (`#aid-family`)

ولي أمر الطالب عبد الرحمن / FAM-2023-0211 / الإخوة: سارة مؤمن.

### Line items (`#aid-items`)

Same 1-row table as student-side (380.00 ريال course subscription).

### Financial breakdown (`#aid-breakdown`) — same as student-side per FR-070

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

### VAT line callout (`#aid-vat`) — FR-073

Inline below the breakdown:
"ضريبة القيمة المضافة (15%) — 57.00 ريال — الرقم الضريبي: 312345678900003" with a tooltip/footnote anchor → `tax-settings.html`.

### Payment-records timeline (`#aid-timeline`) — FR-071 (ADMIN-ONLY)

3 chronological events:

| # | Date | Method | Amount | Actor |
|---|------|--------|--------|-------|
| 1 | 2026-04-12 | بطاقة مدى | 200.00 ريال | AHMED.K (موظف الاستقبال) |
| 2 | 2026-04-25 | تحويل بنكي | 170.00 ريال | SARA.M (موظفة المالية) |
| 3 | 2026-04-30 | تطبيق رصيد عائلي (تلقائي عند تاريخ الاستحقاق) | 67.00 ريال | نظام تلقائي **(تلقائي pill)** |

### Family-balance usage panel (`#aid-balance-usage`) — FR-072 (ADMIN-ONLY)

Single-entry panel:
- **Family**: FAM-2023-0211 (عائلة مؤمن)
- **Amount applied**: -67.00 ريال
- **Date**: 2026-04-30
- **Type**: استخدام للفاتورة (تلقائي)
- **Note**: تطبيق تلقائي عند تاريخ الاستحقاق — أغلق المبلغ المتبقّي
- **Cross-link**: `عرض رصيد العائلة` → `family-balances.html` (or to the specific family detail when that page exists)

### Admin-notes panel (`#aid-admin-notes`) — FR-074 (ADMIN-ONLY)

≥ 2 notes:

| # | Date | Author | Body |
|---|------|--------|------|
| 1 | 2026-04-25 | SARA.M | تم إرسال تذكير دفع للأهل عبر الواتساب لتسديد المبلغ المتبقّي |
| 2 | 2026-04-30 | نظام تلقائي | تم تطبيق رصيد العائلة المتاح (67.00 ريال) تلقائياً عند تاريخ الاستحقاق وفق سياسة المنصة لإغلاق الفاتورة |

### Action bar (`#aid-actions`) — FR-075 (ADMIN-ONLY)

5 buttons in this RTL-natural order from the start (right):

| # | Label | Tone | Icon | Action |
|---|-------|------|------|--------|
| 1 | تعليم كمدفوعة | success | check-circle | `<button type="button">` (visual only) |
| 2 | إضافة دفعة | primary | plus-circle | `<a href="create-manual-payment.html">` (real link) |
| 3 | تطبيق رصيد العائلة | info | wallet | `<button type="button">` (visual only) |
| 4 | تنزيل | neutral | download | `<button type="button">` (visual only) |
| 5 | **إلغاء الفاتورة** | danger | x-circle | `<button type="button">` (visual only); visually separated by a vertical divider before this button |

## Cross-references

- Sidebar: Active = "Invoices".
- Breadcrumb → `invoices.html`.
- VAT callout footnote → `tax-settings.html`.
- Family-balance cross-link → `family-balances.html`.
- "إضافة دفعة" → `create-manual-payment.html`.

## Non-requirements (explicit)

- No JS state-change for action buttons — they're visual stubs.
- No download handlers (the "تنزيل" button does not produce a real PDF).
- No mark-paid mutation (button-stub only — invoice already مدفوعة anyway, so the affordance is reference-only).
- No EGP variants (this anchor invoice is SAR; EGP invoices are demonstrated only in the admin/invoices.html table and tax-settings preview).
