# Contract — `pages/student/payment-history.html`

**User story**: US1 (Student & parent see family finances, P1) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Active sidebar entry**: Payment History (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#ph-header` | h1 + subtitle + persona greeting |
| Summary cards | `#ph-summary` | 4 cards (Total paid / Unpaid / Upcoming / Family balance) |
| Status legend strip | `#ph-legend` | 6-badge legend with text labels |
| Payment table | `#ph-table` | 7 rows demonstrating all 6 statuses |
| Tax-info footer | `#ph-tax-footer` | small caption with tax-number reference |

## Required content

### Header (`#ph-header`) — FR-002 / FR-005

- h1: `سجل المدفوعات`
- Subtitle: `تابع فواتيرك ومدفوعاتك ورصيد العائلة المتاح`
- Header chrome with persona greeting "عبد الرحمن مؤمن" (full name).
- Active sidebar entry "سجل المدفوعات" carries `aria-current="page"` + `is-active`.

### Summary cards (`#ph-summary`) — FR-010

Four cards in a single horizontal row at desktop breakpoint, stacking 2×2 at tablet, 1×4 at mobile:

| # | Card title | Value | Sub-caption |
|---|-----------|-------|-------------|
| 1 | إجمالي المدفوع | **934.00 ريال** | sum of {Paid + Partially-Paid} amounts; excludes Under Review |
| 2 | فواتير غير مدفوعة | **2** | غير مدفوعة + متأخّرة |
| 3 | الدفعة القادمة | **437.00 ريال مستحقة 2026-05-15** | INV-2026-0231 — link → invoice-details.html?from=upcoming |
| 4 | رصيد العائلة المتاح | **450.00 ريال** | link → `../parent/family-balance.html` (cross-role link permitted) |

### Status legend (`#ph-legend`) — FR-011

Inline `<ul>` of 6 badges, each pairs color + text + small icon (per research.md §R12):

| Badge | Tone | Icon |
|-------|------|------|
| مدفوعة | success-100 | check-circle |
| غير مدفوعة | warning-50 | clock |
| مدفوعة جزئياً | warning-100 | pie-chart-half |
| متأخّرة | danger-100 | alert-triangle |
| ملغاة | neutral-200 | x-circle |
| تحت المراجعة | info-100 | clipboard-check |

### Payment table (`#ph-table`) — FR-012, FR-013, FR-014, FR-015, FR-016

7 rows in this order (most recent first). Columns from start (right under RTL): رقم الفاتورة، الدورة/الحصة، المبلغ الأساسي، الضريبة، الإجمالي، الحالة، تاريخ الاستحقاق، إجراء.

| # | Invoice | Item | Subtotal | VAT | Total | Status | Due | Method | CTA |
|---|---------|------|----------|-----|-------|--------|-----|--------|-----|
| 1 | INV-2026-0231 | اشتراك مايو 2026 | 380.00 | 57.00 | 437.00 | غير مدفوعة | 2026-05-15 | — | عرض الفاتورة |
| 2 | INV-SES-2026-0212 | حصة مراجعة قبل الاختبار — 28 أبريل | 60.00 | 9.00 | 69.00 | تحت المراجعة | 2026-04-28 | إيصال بنكي | عرض |
| 3 | INV-SES-2026-0205 | حصة فردية للتأسيس النحوي — 25 أبريل | 100.00 | 15.00 | 115.00 | مدفوعة جزئياً | 2026-05-20 | بطاقة مدى | عرض الفاتورة |
| 4 | INV-2026-0184 | اشتراك أبريل 2026 | 380.00 | 57.00 | 437.00 | مدفوعة | 2026-04-30 | بطاقة + تحويل + رصيد | عرض الفاتورة → invoice-details.html |
| 5 | INV-2026-0137 | اشتراك مارس 2026 | 380.00 | 57.00 | 437.00 | مدفوعة | 2026-03-15 | بطاقة + رصيد | عرض الفاتورة |
| 6 | INV-SES-2026-0156 | حصة تعويضية فردية — 12 مارس | 60.00 | 9.00 | 69.00 | ملغاة | 2026-03-12 | — | عرض |
| 7 | INV-SES-2026-0098 | حصة فردية لمراجعة الأخطاء — 18 فبراير | 80.00 | 12.00 | 92.00 | متأخّرة (متأخّر منذ 74 يوم) | 2026-02-25 | — | ادفع الآن |

**Anchor row** (FR-014): row 4's "عرض الفاتورة" CTA links to `pages/student/invoice-details.html` (the deep-read of INV-2026-0184). Other CTAs link to the same page (single-detail-anchor pattern) per the convention established in Spec 004.

**Overdue row visual** (FR-011 + FR-014 edge case): row 7 uses danger-100 row background tint + the explicit "متأخّر منذ 74 يوم" duration text + the alert-triangle icon — color is never the sole indicator (FR-005 / Constitution IV).

### Tax-info footer (`#ph-tax-footer`)

Small caption (text-xs, neutral-600): "جميع المبالغ بالريال السعودي، شاملة ضريبة القيمة المضافة 15%. الرقم الضريبي: 312345678900003."

## Cross-references

- Sidebar: byte-identical to `pages/student/dashboard.html` sidebar (research.md §R13). Active = "Payment History" / "سجل المدفوعات".
- Header: byte-identical to prior-spec student greeting format.
- Anchor invoice row (row 4) → `invoice-details.html` (sibling page).
- Family-balance summary card (#4) → `../parent/family-balance.html` (cross-role link — students may view family balance).
- Currency labels: SAR rendered as "ريال" (Arabic word) per research.md §R10.

## Non-requirements (explicit)

- No JS handler for filtering / sorting / pagination — the 7-row table is static.
- No "إنشاء دفعة" CTA (this is a student-side page; manual-payment recording is admin-only).
- No EGP rows (this surface is student-side, SAR-only — research.md §R10).
- No in-page tabs.
