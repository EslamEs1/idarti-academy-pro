# Contract — `pages/parent/family-balance.html`

**User story**: US1 (Student & parent see family finances, P1) — see spec.md.
**Persona**: ولي أمر الطالب عبد الرحمن.
**Active sidebar entry**: Family Balance.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#fb-header` | h1 + subtitle + Add-funds CTA |
| Hero balance card | `#fb-hero` | 450.00 ريال + family / child sub-line |
| Sub-summary tiles | `#fb-summary` | 4 tiles (deposits / used / refunds / adjustments) |
| Balance-history table | `#fb-history` | 7-row ledger spanning all 4 transaction types |
| Add-funds explanatory caption | `#fb-explainer` | small caption near the CTA |

## Required content

### Header (`#fb-header`)

- h1: `رصيد العائلة`
- Subtitle: `الرصيد المُسبق المُتاح للعائلة + سجل المعاملات`
- Top-right primary CTA: **`إضافة رصيد`** (`<button type="button">`, visual only, success-tone)

### Hero balance card (`#fb-hero`) — FR-040

Cream/parchment background card (matching the Spec 006 monthly-report header aesthetic):

- Large numeric: **450.00 ريال** (font-size: 4xl, primary-700)
- Label: `رصيد العائلة الحالي` (text-sm, neutral-600)
- Sub-line: `الرصيد مشترك بين: عبد الرحمن مؤمن، سارة مؤمن`
- Last-update timestamp: `آخر تحديث: 2026-05-08`

### Sub-summary tiles (`#fb-summary`) — FR-045

4 tiles in a horizontal row:

| # | Tile | Amount | Count chip |
|---|------|--------|------------|
| 1 | إجمالي الإيداعات | +700.00 ريال | 2 إيداع |
| 2 | إجمالي المُستخدَم | -167.00 ريال | 2 معاملة |
| 3 | إجمالي المُستردّ | +60.00 ريال | 1 استرداد |
| 4 | إجمالي التسويات | -143.00 ريال | 2 تسوية |

### Balance-history table (`#fb-history`) — FR-041, FR-042, FR-043

Columns from start: التاريخ، نوع المعاملة، المبلغ، بواسطة، الفاتورة المرتبطة، ملاحظة الإدارة، الرصيد بعد المعاملة.

| # | Date | Type | Amount | By | Linked invoice | Note | Running balance |
|---|------|------|--------|----|--------------:|-----:|------:|
| 1 | 2026-02-10 | إيداع | +500.00 ريال | ولي الأمر | — | إيداع أولي للعائلة | 500.00 ريال |
| 2 | 2026-03-25 | استخدام للفاتورة | -100.00 ريال | عبد الرحمن | INV-2026-0137 | تسديد جزئي شهر مارس | 400.00 ريال |
| 3 | 2026-04-08 | استرداد | +60.00 ريال | — | INV-SES-2026-0156 (ملغاة) | إلغاء حصة تعويضية | 460.00 ريال |
| 4 | 2026-04-22 | تسوية | -10.00 ريال | الإدارة | — | تسوية رسوم تحويل بنكي | 450.00 ريال |
| 5 | 2026-04-30 | استخدام للفاتورة | -67.00 ريال | عبد الرحمن | INV-2026-0184 | تطبيق تلقائي عند تاريخ الاستحقاق — أغلق المبلغ المتبقّي **(تلقائي pill)** | 383.00 ريال |
| 6 | 2026-05-05 | إيداع | +200.00 ريال | ولي الأمر | — | إيداع لشهر مايو | 583.00 ريال |
| 7 | 2026-05-08 | تسوية | -133.00 ريال | الإدارة | — | تعديل رصيد بناءً على طلب ولي الأمر | 450.00 ريال |

**Sum verification**: +500 -100 +60 -10 -67 +200 -133 = **+450.00 ريال** ✓ (matches hero card).

**Row 5's "تلقائي" pill** (per research.md §R12): info-50 background, bolt icon, label "تلقائي" — visually distinguishes auto-applied from manual usage.

### Add-funds explanatory caption (`#fb-explainer`) — FR-044

Small caption near the top "إضافة رصيد" CTA:
"يمكن للعائلة الإيداع مقدّماً لتسديد الفواتير القادمة تلقائياً."

## Cross-references

- Sidebar: byte-identical to `pages/parent/dashboard.html` sidebar. Active = "Family Balance".
- Linked-invoice column → relevant `invoice-details.html` (cross-role to student-side).
- "إضافة رصيد" header CTA — visual stub only (real top-up flow is out of scope; the admin equivalent CTA exists on family-balances.html and routes to create-manual-payment.html, but the parent-side stub stays visual to honor "no real money flow").

## Non-requirements (explicit)

- No real top-up handler — parent CTA is `<button type="button">` visual only.
- No JS filter / sort / paginate — table is static 7 rows.
- No EGP transactions (the persona's family is SAR-only).
- No tabs / no modals / no accordions.
