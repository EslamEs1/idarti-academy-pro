# Contract — `pages/parent/invoices.html`

**User story**: US1 (Student & parent see family finances, P1) — see spec.md.
**Persona**: ولي أمر الطالب عبد الرحمن.
**Active sidebar entry**: Invoices.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#pi-header` | h1 + subtitle + parent greeting |
| Summary tiles | `#pi-summary` | 4 tiles (count / unpaid / overdue / total remaining) |
| Family-balance caption | `#pi-balance-caption` | small caption linking to family-balance.html |
| Filter strip | `#pi-filters` | child chips + status dropdown + month dropdown |
| Invoices table | `#pi-table` | ≥ 8 rows spanning both children |

## Required content

### Header (`#pi-header`) — FR-002

- h1: `فواتير الأبناء`
- Subtitle: `تابع فواتير عبد الرحمن وسارة في صفحة واحدة`
- Header chrome with parent greeting "ولي أمر الطالب عبد الرحمن".

### Summary tiles (`#pi-summary`) — FR-030

4 tiles spanning the persona's family invoices over the last 6 months (Dec 2025 → May 2026):

| # | Tile | Value |
|---|------|-------|
| 1 | إجمالي الفواتير | 11 (count of E1 records for FAM-2023-0211 in the 6-month window) |
| 2 | غير مدفوعة | 2 (INV-2026-0231 + INV-2026-0234) |
| 3 | متأخّرة | 2 (INV-SES-2026-0098 + INV-2026-0188) |
| 4 | إجمالي المتبقّي | **1,228.00 ريال** (sum of remaining amounts across all unpaid / overdue / partially-paid rows: INV-2026-0231 437 (persona May) + INV-2026-0234 322 (Sara May) + INV-2026-0188 322 (Sara April overdue) + INV-SES-2026-0098 92 (persona Feb overdue) + INV-SES-2026-0205 55 (persona partial remaining) = 1,228.00 ريال) |

### Family-balance caption (`#pi-balance-caption`) — FR-035

Below summary tiles, an info-tinted strip:
"الرصيد المتاح: 450.00 ريال — يُطبَّق تلقائياً على الفواتير المستحقة" → links to `family-balance.html`.

### Filter strip (`#pi-filters`) — FR-031

Three filter controls in this RTL order:
1. **الطفل** (chip group): "جميع الأبناء" (selected) / "عبد الرحمن" / "سارة"
2. **الحالة** (dropdown): "الكل" (selected) + 6 status options
3. **الشهر** (dropdown): "كل الأشهر" (selected) + Dec 2025 / Jan 2026 / Feb 2026 / Mar 2026 / Apr 2026 / May 2026

All visual-only (no JS).

### Invoices table (`#pi-table`) — FR-032, FR-033, FR-034

≥ 8 rows. Columns from start: رقم الفاتورة، الطفل، البند، الإجمالي، الحالة، تاريخ الاستحقاق، إجراء.

| # | Invoice | Child | Item | Total | Status | Due | CTA |
|---|---------|-------|------|-------|--------|-----|-----|
| 1 | INV-2026-0231 | عبد الرحمن | اشتراك مايو 2026 | 437.00 | غير مدفوعة | 2026-05-15 | ادفع الآن |
| 2 | INV-2026-0234 | سارة | اشتراك مايو 2026 | 322.00 | غير مدفوعة | 2026-05-20 | ادفع الآن |
| 3 | INV-2026-0188 | سارة | اشتراك أبريل 2026 | 322.00 | متأخّرة (red row tint) | 2026-04-30 | ادفع الآن |
| 4 | INV-SES-2026-0098 | عبد الرحمن | حصة فردية فبراير | 92.00 | متأخّرة (red row tint) | 2026-02-25 | ادفع الآن |
| 5 | INV-SES-2026-0205 | عبد الرحمن | حصة خاصة 25 أبريل | 115.00 | مدفوعة جزئياً (60/115) | 2026-05-20 | ادفع الآن |
| 6 | INV-SES-2026-0212 | عبد الرحمن | حصة مراجعة 28 أبريل | 69.00 | تحت المراجعة | 2026-04-28 | عرض |
| 7 | INV-2026-0184 | عبد الرحمن | اشتراك أبريل 2026 | 437.00 | مدفوعة | 2026-04-30 | عرض الفاتورة |
| 8 | INV-2026-0145 | سارة | اشتراك مارس 2026 | 322.00 | مدفوعة | 2026-03-15 | عرض الفاتورة |
| 9 | INV-2026-0137 | عبد الرحمن | اشتراك مارس 2026 | 437.00 | مدفوعة | 2026-03-15 | عرض الفاتورة |
| 10 | INV-2026-0107 | سارة | اشتراك فبراير 2026 | 322.00 | مدفوعة | 2026-02-15 | عرض الفاتورة |

Sara's overdue row 3 + persona's overdue row 4 are both danger-tinted with red row backgrounds + alert-triangle icons + "ادفع الآن" CTAs.

**Status×CTA matrix** (FR-034):
- غير مدفوعة / متأخّرة / مدفوعة جزئياً → "ادفع الآن" (warning/danger tone, primary)
- مدفوعة / ملغاة → "عرض الفاتورة" (neutral)
- تحت المراجعة → "عرض" (info-tone)

The "عرض الفاتورة" CTA on persona's INV-2026-0184 row links to `../student/invoice-details.html` (cross-role link permitted — parents can view their child's invoice).

## Cross-references

- Sidebar: byte-identical to `pages/parent/dashboard.html` sidebar. Active = "Invoices".
- Family-balance caption → `family-balance.html` (sibling page).
- Persona invoice row CTA → `../student/invoice-details.html` (the only existing invoice-detail page).

## Non-requirements (explicit)

- No JS filter logic — chips and dropdowns are visual.
- No bulk-action affordance (parent surface; bulk-action is admin-only).
- No "Add payment" CTA — parent doesn't record payments.
- No EGP rows (parent's family is SAR — Cairo families have their own admin-only surfaces).
