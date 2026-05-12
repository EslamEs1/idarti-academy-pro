# Contract — `pages/admin/payments.html`

**User story**: US2 (Admin operates payments and invoices, P2) — see spec.md.
**Active sidebar entry**: Payments.
**Admin greeting**: إدارة الأكاديمية.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#ap-header` | h1 + subtitle + persistent إنشاء دفعة يدوية CTA |
| Summary cards | `#ap-summary` | 5 cards |
| Filter strip | `#ap-filters` | 5 filter controls |
| Payments table | `#ap-table` | ≥ 10 rows demonstrating diverse states |

## Required content

### Header (`#ap-header`) — FR-002, FR-055

- h1: `المدفوعات`
- Subtitle: `لوحة عمليات المدفوعات على مستوى الأكاديمية`
- Top-right primary CTA: **`إنشاء دفعة يدوية`** → `create-manual-payment.html` (real `href`).

### Summary cards (`#ap-summary`) — FR-050

5 cards (each with amount + count chip):

| # | Card | Amount | Count |
|---|------|--------|-------|
| 1 | مدفوع اليوم | 1,610.00 ريال | 4 دفعات |
| 2 | مدفوع هذا الشهر | 12,856.00 ريال | 28 دفعة |
| 3 | تحت المراجعة | 138.00 ريال | 2 دفعتان |
| 4 | فاشل | 437.00 ريال | 1 دفعة |
| 5 | الإجمالي للسنة | 64,392.00 ريال | 142 دفعة |

### Filter strip (`#ap-filters`) — FR-051

5 controls in this RTL order:
1. **الحالة** dropdown: "الكل" + 4 statuses (مدفوعة / تحت المراجعة / فاشل / مستردّ)
2. **طريقة الدفع** dropdown: "الكل" + 7 methods (بطاقة مدى / تحويل بنكي / فيزا/ماستركارد / STC Pay / رصيد العائلة / إيصال يدوي / نقداً)
3. **النطاق الزمني** date-range picker (from/to inputs, visual only)
4. **الطالب** search input
5. **العائلة** search input

### Payments table (`#ap-table`) — FR-052, FR-053, FR-054

≥ 10 rows. Columns from start: معرّف الدفعة، الطالب، العائلة، المبلغ، العملة، الطريقة، الحالة، التاريخ، الفاتورة المرتبطة، إجراء.

| # | Payment ID | Student | Family | Amount | Cur | Method | Status | Date | Linked invoice | Action |
|---|-----------|---------|--------|--------|-----|--------|--------|------|----------------|--------|
| 1 | PAY-2026-0512 | عبد الرحمن مؤمن | عائلة مؤمن | 200.00 | ريال | بطاقة مدى | مدفوعة | 2026-04-12 | INV-2026-0184 | عرض / ⋮ |
| 2 | PAY-2026-0537 | عبد الرحمن مؤمن | عائلة مؤمن | 170.00 | ريال | تحويل بنكي | مدفوعة | 2026-04-25 | INV-2026-0184 | عرض / ⋮ |
| 3 | PAY-2026-0541 | عبد الرحمن مؤمن | عائلة مؤمن | 67.00 | ريال | رصيد العائلة (تلقائي) | مدفوعة | 2026-04-30 | INV-2026-0184 | عرض / ⋮ |
| 4 | PAY-2026-0548 | عبد الرحمن مؤمن | عائلة مؤمن | 60.00 | ريال | بطاقة مدى | مدفوعة | 2026-04-30 | INV-SES-2026-0205 | عرض / ⋮ |
| 5 | PAY-2026-0552 | عبد الرحمن مؤمن | عائلة مؤمن | 69.00 | ريال | إيصال بنكي يدوي | تحت المراجعة | 2026-04-26 | INV-SES-2026-0212 | عرض / ⋮ |
| 6 | PAY-2026-0561 | فهد المنصور | عائلة المنصور | 437.00 | ريال | فيزا/ماستركارد | فاشل | 2026-05-02 | INV-2026-0227 | عرض / ⋮ |
| 7 | PAY-2026-0568 | نورة الحارثي | عائلة الحارثي | 322.00 | ريال | STC Pay | مدفوعة | 2026-05-04 | INV-2026-0218 | عرض / ⋮ |
| 8 | PAY-2026-EG-0042 | أحمد حسن | عائلة حسن | 1,710.00 | EGP | تحويل بنكي | مدفوعة | 2026-05-03 | INV-EG-2026-0019 | عرض / ⋮ |
| 9 | PAY-2026-0573 | عبدالله رحمن | (individual) | 540.00 | ريال | بطاقة مدى | مستردّ | 2026-05-06 | INV-2026-0220 | عرض / ⋮ |
| 10 | PAY-2026-0581 | ولي أمر الطالب عبد الرحمن | عائلة مؤمن | 200.00 | ريال | تحويل بنكي | مدفوعة | 2026-05-05 | — (إيداع رصيد للعائلة) | عرض / ⋮ |

**Coverage**: 4 statuses (rows 1-4 + 7 + 8 + 10 = مدفوعة; row 5 = تحت المراجعة; row 6 = فاشل; row 9 = مستردّ). 6+ methods. 1 EGP row (row 8). 1 family-balance row (row 3 — auto-applied). 1 balance-deposit row (row 10 — invoice column = "—").

**Action column**: each row exposes 2 icon-buttons: `عرض` (eye, links to invoice-details.html for the linked invoice when present) + `⋮` (kebab, button-stub).

## Cross-references

- Sidebar: byte-identical to admin dashboard sidebar. Active = "Payments".
- Header "إنشاء دفعة يدوية" CTA → `create-manual-payment.html` (sibling page).
- Per-row "عرض" → `invoice-details.html` (admin-side) when invoice column populated.

## Non-requirements (explicit)

- No JS filter / sort logic — controls are visual.
- No bulk-action affordance (this surface is per-payment; bulk-action belongs on admin/invoices.html).
- The kebab-action menu is a button-stub (no dropdown menu rendered for the demo).
