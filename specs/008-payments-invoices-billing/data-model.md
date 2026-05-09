# Phase 1 Data Model — Payments, Invoices, Tax Settings & Family Balance Frontend

This document defines the entity schemas + their concrete sample-data anchors that every contract and every page in this feature MUST consume verbatim. The schemas are descriptive — they are NOT real database tables (no backend exists). They define the shape of the static sample data each page hard-codes so reviewers can verify cross-page consistency.

The persona family + cross-spec continuity is in research.md §R5. The anchor invoice INV-2026-0184 arithmetic is in §R6. The family-balance ledger arithmetic is in §R7. The persona's payment-history math is in §R8. Sister Sara's parent-side rows are in §R9. Multi-currency demonstration scope is in §R10. The status badge vocabulary is in §R12. The admin payments table sample is in §R17. The admin invoices table sample is in §R18. The tax-settings example-invoice math is in §R19. **This file binds those decisions to entity field shapes that contracts/ and tasks.md reference.**

---

## E0. Shell schema (cross-cutting — applied to every page in this feature)

**Renders on**: All 10 pages.

**Fields**:
- **`<html lang="ar" dir="rtl">`**: locked.
- **`<head>`**: `<title>` (page-specific) + `<meta charset="UTF-8">` + `<meta name="viewport" content="width=device-width, initial-scale=1">` + Tajawal Google Fonts CDN link + `<link rel="stylesheet" href="../../assets/css/output.css">` (path adjusts per directory depth).
- **`<body class="bg-surface-50 text-text-base font-sans antialiased">`**: matches Spec 002-007 baseline.
- **Sidebar**: hard-embedded role partial — byte-identical across all pages of the same role except for the active-entry indicator (per research.md §R13):
  - Student pages (2): full 14-entry sidebar from `pages/student/dashboard.html`.
  - Parent pages (2): full parent sidebar from `pages/parent/dashboard.html`.
  - Admin pages (6): full admin sidebar from `pages/admin/dashboard.html`.
- **Header**: search input + bell-as-anchor + profile dropdown + persona greeting:
  - Student-side greeting: "عبد الرحمن مؤمن" (full name in own chrome).
  - Parent-side greeting: "ولي أمر الطالب عبد الرحمن".
  - Admin-side greeting: "إدارة الأكاديمية".
- **Main**: page-specific content (defined per E1 → E7 below).
- **Footer**: Spec 002 baseline footer.

**Active-entry indicator**: `aria-current="page"` + `is-active` class on the appropriate sidebar `<a>`. Mapping table is in research.md §R13.

**Cross-page invariants**:
- The student-page sidebar markup MUST be byte-identical across the 2 new student pages (only the active entry differs). Same for the 2 parent pages and the 6 admin pages.
- **Header greeting consistency** (verified during the Polish-phase manual review): each role's header MUST match the existing prior-spec convention — open `pages/student/dashboard.html` (Spec 002 baseline) for the student greeting format, `pages/parent/dashboard.html` for parent, `pages/admin/dashboard.html` for admin — and reuse the chosen format verbatim on the new pages.

---

## E1. Invoice (8 invoices for the persona's family + 2 for Sara + 5 for other families = 15 total)

**Renders on**:
- `pages/student/payment-history.html` (persona's table — 7 rows)
- `pages/student/invoice-details.html` (deep-dive — 1 invoice INV-2026-0184)
- `pages/parent/invoices.html` (both children — ≥ 8 rows)
- `pages/admin/invoices.html` (academy-wide — ≥ 12 rows)
- `pages/admin/invoice-details.html` (deep-dive — same INV-2026-0184)
- `pages/admin/payments.html` (linked-invoice column references)
- `pages/admin/create-manual-payment.html` (invoice select pre-fills with INV-2026-0231)

**Fields**:
- **id**: string (e.g., `INV-2026-0184`, `INV-SES-2026-0205`, `INV-EG-2026-0019`, `INV-REG-2026-0019`, `INV-GR-2026-0033`). Prefix conventions: `INV-` = subscription / full-course; `INV-SES-` = single live session OR private session; `INV-GR-` = group session; `INV-REG-` = registration fee; `INV-EG-` = Egypt-currency invoice. The numeric suffix is chronological-ish but not strictly sequential.
- **issue_date** / **due_date**: ISO date strings (e.g., `2026-04-01` / `2026-04-30`).
- **student_id**: foreign key to E6 Student (e.g., `STD-2024-0817` for the persona).
- **family_id**: foreign key to E5 Family (e.g., `FAM-2023-0211` for the Mu'min family).
- **line_items**: array of E1a InvoiceLineItem (anchor row count: 1 line item per invoice in this spec; multi-line invoices are NOT demonstrated).
- **subtotal**: sum of line-item totals (e.g., 380.00 ريال).
- **discount**: 0.00 ريال in every demo row (no discount-applied scenario in scope).
- **vat_percent**: 15 (KSA invoices) or 14 (EGP invoices) or 0 (registration-fee invoices, INV-REG-).
- **vat_amount**: subtotal × vat_percent / 100 (e.g., 57.00 for the anchor; 0.00 for INV-REG-2026-0019).
- **family_balance_applied**: signed amount applied from the family balance (e.g., 67.00 on INV-2026-0184). Default 0.00 if not applied.
- **paid_amount**: sum of all payment streams against this invoice — INCLUDES family-balance applications (e.g., 437.00 for INV-2026-0184; 60.00 for INV-SES-2026-0205).
- **remaining**: total − paid_amount (e.g., 0.00 for INV-2026-0184; 55.00 for INV-SES-2026-0205).
- **total**: subtotal − discount + vat_amount (e.g., 437.00).
- **status**: enum `مدفوعة` | `غير مدفوعة` | `مدفوعة جزئياً` | `متأخّرة` | `ملغاة` | `تحت المراجعة` | `مستردّ`. The first 6 are the spec-005 / FR-011 supported statuses on student/parent surfaces; `مستردّ` is a refund state visible only on admin surfaces (and on the corresponding family-balance refund row).
- **payment_method_summary**: string ("بطاقة مدى" / "تحويل بنكي" / "بطاقة + رصيد" / "بطاقة + تحويل + رصيد" / "إيصال بنكي" / em-dash for unpaid). Used in compact tables that show only one method-summary cell.
- **currency**: `ريال` (default) or `EGP`.
- **student_type**: enum `ناطق بالعربية` (default) or `غير ناطق بالعربية`. Visible on admin/invoices.html only.
- **item_type**: enum `دورة كاملة` | `حصة مباشرة` | `حصة خاصة` | `حصة جماعية` | `رسوم تسجيل`.

**Anchor row table** (all 15 invoices):

| id | student | family | issue | due | subtotal | vat% | vat | balance_applied | paid | remaining | total | status | currency | item_type |
|----|---------|--------|-------|-----|----------|------|-----|-----------------|------|-----------|-------|--------|----------|-----------|
| INV-2026-0042 | عبد الرحمن مؤمن | مؤمن | 2026-01-01 | 2026-01-15 | 380.00 | 15 | 57.00 | 0 | 437.00 | 0 | 437.00 | مدفوعة | ريال | دورة كاملة |
| INV-2026-0089 | عبد الرحمن مؤمن | مؤمن | 2026-02-01 | 2026-02-15 | 380.00 | 15 | 57.00 | 0 | 437.00 | 0 | 437.00 | مدفوعة | ريال | دورة كاملة |
| INV-SES-2026-0098 | عبد الرحمن مؤمن | مؤمن | 2026-02-15 | 2026-02-25 | 80.00 | 15 | 12.00 | 0 | 0 | 92.00 | 92.00 | متأخّرة | ريال | حصة خاصة |
| INV-2026-0107 | سارة مؤمن | مؤمن | 2026-02-01 | 2026-02-15 | 280.00 | 15 | 42.00 | 0 | 322.00 | 0 | 322.00 | مدفوعة | ريال | دورة كاملة |
| INV-2026-0137 | عبد الرحمن مؤمن | مؤمن | 2026-03-01 | 2026-03-15 | 380.00 | 15 | 57.00 | 100.00 | 437.00 | 0 | 437.00 | مدفوعة | ريال | دورة كاملة |
| INV-2026-0145 | سارة مؤمن | مؤمن | 2026-03-01 | 2026-03-15 | 280.00 | 15 | 42.00 | 0 | 322.00 | 0 | 322.00 | مدفوعة | ريال | دورة كاملة |
| INV-SES-2026-0156 | عبد الرحمن مؤمن | مؤمن | 2026-03-08 | 2026-03-12 | 60.00 | 15 | 9.00 | 60.00 (refunded) | 0 | 0 | 69.00 | ملغاة | ريال | حصة خاصة |
| INV-2026-0184 | عبد الرحمن مؤمن | مؤمن | 2026-04-01 | 2026-04-30 | 380.00 | 15 | 57.00 | 67.00 (auto) | 437.00 | 0 | 437.00 | مدفوعة | ريال | دورة كاملة |
| INV-2026-0188 | سارة مؤمن | مؤمن | 2026-04-01 | 2026-04-30 | 280.00 | 15 | 42.00 | 0 | 0 | 322.00 | 322.00 | متأخّرة | ريال | دورة كاملة |
| INV-SES-2026-0205 | عبد الرحمن مؤمن | مؤمن | 2026-04-22 | 2026-05-20 | 100.00 | 15 | 15.00 | 0 | 60.00 | 55.00 | 115.00 | مدفوعة جزئياً | ريال | حصة خاصة |
| INV-SES-2026-0212 | عبد الرحمن مؤمن | مؤمن | 2026-04-26 | 2026-04-28 | 60.00 | 15 | 9.00 | 0 | 69.00 | 0 | 69.00 | تحت المراجعة | ريال | حصة مباشرة |
| INV-2026-0220 | عبدالله رحمن | (individual) | 2026-04-15 | 2026-04-30 | 470.00 | 15 | 70.00 | 0 | 0 | 540.00 (refunded) | 540.00 | مستردّ | ريال | حصة خاصة |
| INV-2026-0227 | فهد المنصور | المنصور | 2026-05-01 | 2026-05-15 | 380.00 | 15 | 57.00 | 0 | 0 | 437.00 | 437.00 | غير مدفوعة | ريال | دورة كاملة |
| INV-2026-0231 | عبد الرحمن مؤمن | مؤمن | 2026-05-01 | 2026-05-15 | 380.00 | 15 | 57.00 | 0 | 0 | 437.00 | 437.00 | غير مدفوعة | ريال | دورة كاملة |
| INV-2026-0234 | سارة مؤمن | مؤمن | 2026-05-01 | 2026-05-20 | 280.00 | 15 | 42.00 | 0 | 0 | 322.00 | 322.00 | غير مدفوعة | ريال | دورة كاملة |
| INV-EG-2026-0019 | أحمد حسن | حسن | 2026-05-01 | 2026-05-15 | 1500.00 | 14 | 210.00 | 0 | 1710.00 | 0 | 1710.00 | مدفوعة | EGP | دورة كاملة |
| INV-EG-2026-0024 | Yousuf Hosni | Hosni | 2026-05-01 | 2026-05-15 | 2100.00 | 14 | 294.00 | 0 | 0 | 2394.00 | 2394.00 | غير مدفوعة | EGP | دورة كاملة |
| INV-GR-2026-0033 | ريما المنصور | المنصور | 2026-04-20 | 2026-04-30 | 45.00 | 15 | 6.75 | 0 | 51.75 | 0 | 51.75 | مدفوعة | ريال | حصة جماعية |
| INV-REG-2026-0019 | فاطمة حسن | حسن | 2026-04-15 | 2026-04-22 | 350.00 | 0 | 0 | 0 | 350.00 | 0 | 350.00 | مدفوعة | ريال | رسوم تسجيل |
| INV-2026-0218 | نورة الحارثي | الحارثي | 2026-04-25 | 2026-05-04 | 280.00 | 15 | 42.00 | 0 | 322.00 | 0 | 322.00 | مدفوعة | ريال | دورة كاملة |

(**20 rows — every row is a distinct anchored invoice** across the persona's family + Sara + 3 other Saudi families + 2 Egyptian families + 2 individual non-Arabic-speaking students. The persona himself owns 8 invoices in the table; Sister Sara owns 4; the remaining 8 are distributed across the other anchor families/students used by `admin/invoices.html` and `admin/payments.html`.)

### E1a. InvoiceLineItem (sub-entity)

**Fields**: type (enum, see Item Type below), title (string, e.g., "اشتراك دورة القرآن الكريم — المستوى الثالث (شهر أبريل 2026)"), period (e.g., "شهر أبريل 2026" or "حصة 18 أبريل 2026"), quantity (default 1), unit_price (e.g., 380.00), line_total (= quantity × unit_price). Optional `course_id` link to Spec 003 `course-details.html` for full-course items.

### E1b. Item Type (enumeration)

| Type | Demo invoice | Cross-link |
|------|--------------|------------|
| دورة كاملة | INV-2026-0184 + INV-2026-0231 + INV-2026-0137 + INV-2026-0188 + INV-2026-0145 + INV-EG-2026-0019 + ... | `pages/student/course-details.html` (Spec 003) — for full-course items only |
| حصة مباشرة | INV-SES-2026-0212 (مراجعة قبل الاختبار 28 أبريل) | `pages/student/live-session-details.html` (Spec 003) when present |
| حصة خاصة | INV-SES-2026-0205 (تأسيس نحوي 25 أبريل) + INV-SES-2026-0156 (تعويضية 12 مارس) + INV-SES-2026-0098 (مراجعة الأخطاء 18 فبراير) | — (private sessions don't have a public session-details page) |
| حصة جماعية | INV-GR-2026-0033 (حلقة مذاكرة جماعية — 3 أبريل) | — |
| رسوم تسجيل | INV-REG-2026-0019 (رسوم تسجيل فاطمة حسن — أبريل 2026) | — |

The 4-item-type reference panel on `pages/student/invoice-details.html` (FR-023) lists ONE example of each, as static reference text — not as actual line items on INV-2026-0184 (which has only 1 line item).

---

## E2. Payment (≥ 10 records on admin/payments.html + 3 timeline events on admin/invoice-details.html)

**Renders on**:
- `pages/admin/payments.html` (academy-wide table — ≥ 10 rows; see research.md §R17 for the anchor sample)
- `pages/admin/invoice-details.html` (3 timeline events for INV-2026-0184; see research.md §R6)

**Fields**:
- **id**: string (e.g., `PAY-2026-0512`, `PAY-2026-EG-0042`).
- **invoice_id**: foreign key to E1 Invoice (or null for balance-deposit events — row 10 in §R17).
- **student_id**: foreign key to E6 Student (or null for balance-deposit events).
- **family_id**: foreign key to E5 Family.
- **amount**: signed (positive for inflow; negative not used in this spec).
- **currency**: `ريال` or `EGP`.
- **method**: enum `بطاقة مدى` | `تحويل بنكي` | `فيزا/ماستركارد` | `STC Pay` | `رصيد العائلة (تلقائي)` | `رصيد العائلة` | `إيصال بنكي يدوي` | `إيداع رصيد` | `نقداً`.
- **status**: enum `مدفوعة` | `تحت المراجعة` | `فاشل` | `مستردّ`.
- **date**: ISO date.
- **actor**: string ("AHMED.K (موظف الاستقبال)" / "SARA.M (موظفة المالية)" / "نظام تلقائي" / specific named admin staff for non-anchor records).
- **note**: optional string (e.g., "تطبيق تلقائي عند تاريخ الاستحقاق").

**Anchor sample**: 10 rows in research.md §R17 (rows 1-10). The 3 timeline events on admin/invoice-details.html are rows 1, 2, 3 of §R17 (Mada 200 / bank 170 / auto-balance 67).

**Validation rule**: every Payment row's `amount` × FX rate (where applicable) MUST sum to the linked invoice's `paid_amount` minus the `family_balance_applied` (which is captured separately on E1 Invoice). For balance-deposit events with `invoice_id = null`, the amount appears as a Deposit row on the linked family's balance ledger (E3).

---

## E3. FamilyBalanceTransaction (7 records for FAM-2023-0211)

**Renders on**:
- `pages/parent/family-balance.html` (full ledger — 7 rows; see research.md §R7)
- `pages/admin/invoice-details.html` ("استخدام الرصيد العائلي" panel cross-references the 2026-04-30 row)
- `pages/admin/family-balances.html` (last-transaction-date column reads from the most recent row per family)

**Fields**:
- **id**: string (e.g., `BAL-2023-0211-007`).
- **family_id**: foreign key to E5 Family.
- **type**: enum `إيداع` | `استخدام للفاتورة` | `استرداد` | `تسوية`.
- **signed_amount**: signed number (+500.00 for deposit; -100.00 for used; +60.00 for refund; -10.00 for adjustment).
- **date**: ISO date.
- **linked_invoice_id**: optional foreign key (required for "استخدام للفاتورة" + "استرداد"; null for "إيداع" + "تسوية").
- **consuming_child**: optional string (e.g., "بواسطة عبد الرحمن"; required only for "استخدام للفاتورة" rows).
- **note**: string (e.g., "تطبيق تلقائي عند تاريخ الاستحقاق").
- **auto_applied**: boolean (true only for the 2026-04-30 row of FAM-2023-0211; renders the "تلقائي" pill).
- **running_balance**: cumulative sum at this row (computed; rendered in the "الرصيد بعد المعاملة" column on parent/family-balance.html).

**Anchor sample**: 7 rows in research.md §R7. Sum verifies to 450.00 ريال.

**Cross-family note**: each of the 5 other demo families (الحارثي / العتيبي / المنصور / حسن / Hosni) has at least 1 sample transaction (mostly the most recent one) recorded so the "آخر معاملة" date column on admin/family-balances.html reads from a real date rather than a placeholder. The full ledger for those families is NOT modeled in this spec — only the persona's family has the rich 7-row history.

---

## E4. TaxSetting (1 record — platform-wide configuration)

**Renders on**: `pages/admin/tax-settings.html` (sole consumer).

**Fields**:
- **enabled**: boolean (true).
- **percent**: integer (15 for default Saudi config).
- **country**: enum `المملكة العربية السعودية` | `جمهورية مصر العربية` (Saudi selected by default).
- **apply_to**: array of enum `الدورات الكاملة` | `الحصص المباشرة` | `الحصص الخاصة` | `رسوم التسجيل` (default: first 3 checked, registration fees unchecked).
- **tax_number**: string (15-digit Saudi format `312345678900003`).
- **footer_note**: string ("السعر شامل ضريبة القيمة المضافة. الرقم الضريبي: 312345678900003. شكراً لثقتكم بأكاديمية إدارتي.").
- **example_invoice_preview_ksa**: object (subtotal 380, vat 57, total 437, currency ريال).
- **example_invoice_preview_egypt**: object (subtotal 1500, vat 14% = 210, total 1710, currency EGP, country tax-number format hint shown).

**See research.md §R19 for the example-invoice math.**

---

## E5. Family (6 demo records visible on admin/family-balances.html)

**Renders on**:
- `pages/admin/family-balances.html` (full table — 6 rows)
- `pages/admin/payments.html` (family column references; cross-references the same Family records)
- `pages/admin/invoices.html` (family column references)
- `pages/admin/create-manual-payment.html` (family dropdown — at least the 6 demo families appear as options)
- `pages/parent/family-balance.html` (renders FAM-2023-0211 only — the persona's family)

**Fields**:
- **id**: string (e.g., `FAM-2023-0211`).
- **name**: string ("عائلة مؤمن" / "عائلة الحارثي" / etc.).
- **parent_name**: string ("ولي أمر الطالب عبد الرحمن").
- **enrolled_children**: array of E6 Student references (e.g., `[STD-2024-0817, STD-2024-0818]` for the persona's family).
- **current_balance**: signed number (450.00 for the persona's family).
- **balance_currency**: `ريال` (default; `EGP` for the 2 Egyptian families).
- **last_transaction_date**: ISO date (2026-05-08 for the persona's family; varies per family).
- **country**: `KSA` (default) or `Egypt`.

**Anchor sample**:

| id | name | parent | children | balance | currency | last txn | country |
|----|------|--------|----------|---------|----------|----------|---------|
| FAM-2023-0211 | عائلة مؤمن | ولي أمر الطالب عبد الرحمن | عبد الرحمن، سارة | 450.00 | ريال | 2026-05-08 | KSA |
| FAM-2022-0089 | عائلة الحارثي | (un-named) | نورة، خالد | 1,200.00 | ريال | 2026-04-29 | KSA |
| FAM-2024-0156 | عائلة العتيبي | (un-named) | عبدالعزيز | 0.00 | ريال | 2026-03-15 | KSA |
| FAM-2023-0312 | عائلة المنصور | (un-named) | فهد، ريما، ليلى | 850.00 | ريال | 2026-05-05 | KSA |
| FAM-2024-0427 | عائلة حسن | (un-named) | أحمد، فاطمة | 380.00 | EGP | 2026-05-03 | Egypt |
| FAM-2024-0511 | عائلة Hosni | (un-named) | Yousuf | 1,540.00 | EGP | 2026-04-18 | Egypt |

---

## E6. Student (8 demo records spanning the 2 student-type variants)

**Renders on**:
- `pages/admin/invoices.html` (student column on every row; ≥ 2 "غير ناطق بالعربية" rows)
- `pages/admin/payments.html` (student column on every row)
- `pages/admin/family-balances.html` (linked-students column shows count + tooltip listing names)
- `pages/admin/create-manual-payment.html` (student dropdown — pre-filtered to the chosen family's children)
- `pages/student/payment-history.html` (persona STD-2024-0817 only)
- `pages/student/invoice-details.html` (persona only)

**Fields**:
- **id**: string (e.g., `STD-2024-0817`).
- **name**: string ("عبد الرحمن مؤمن").
- **family_id**: foreign key to E5 Family (or null for non-family-affiliated individual students like عبدالله رحمن).
- **grade**: string ("الصف السادس").
- **track**: string ("مسار القرآن الكريم — المستوى الثالث").
- **student_type**: enum `ناطق بالعربية` | `غير ناطق بالعربية` (per Q3 / R3).
- **country_of_residence**: string (informational only; does NOT affect student_type).

**Anchor sample**:

| id | name | family | grade | track | student_type | country |
|----|------|--------|-------|-------|--------------|---------|
| STD-2024-0817 | عبد الرحمن مؤمن | FAM-2023-0211 | الصف السادس | مسار القرآن — المستوى الثالث | ناطق بالعربية | KSA (Riyadh) |
| STD-2024-0818 | سارة مؤمن | FAM-2023-0211 | الصف الثالث | اللغة العربية + الدراسات الإسلامية | ناطق بالعربية | KSA (Riyadh) |
| STD-2024-0903 | فهد المنصور | FAM-2023-0312 | — | — | ناطق بالعربية | KSA |
| STD-2024-0904 | ريما المنصور | FAM-2023-0312 | — | — | ناطق بالعربية | KSA |
| STD-2024-0721 | نورة الحارثي | FAM-2022-0089 | — | — | ناطق بالعربية | KSA |
| STD-2024-1102 | أحمد حسن | FAM-2024-0427 | — | — | ناطق بالعربية | Egypt (Cairo) |
| STD-2024-1103 | فاطمة حسن | FAM-2024-0427 | — | — | ناطق بالعربية | Egypt (Cairo) |
| STD-2024-1207 | Yousuf Hosni | FAM-2024-0511 | — | — | ناطق بالعربية | Egypt (Alexandria) |
| STD-2024-1311 | عبدالله رحمن | (individual) | — | مسار القرآن — المستوى الثاني | غير ناطق بالعربية | KSA (Riyadh, Indonesian) |
| STD-2024-1402 | يوسف عبد الكريم | (individual) | — | اللغة العربية المستوى الأول | غير ناطق بالعربية | USA (remote) |

---

## E7. AdminAction (visual-only — no state mutation)

**Renders on**:
- `pages/admin/invoice-details.html` (5-button action bar)
- `pages/admin/family-balances.html` (per-row 4-icon menu)
- `pages/admin/payments.html` (per-row 2-icon action cluster)
- `pages/admin/invoices.html` (bulk-action dropdown + per-row "عرض" CTA)

**Fields**:
- **label**: string (Arabic verb).
- **icon**: lucide name (e.g., `check-circle`, `plus-circle`, `wallet`, `download`, `x-circle`).
- **tone**: enum `success` | `primary` | `info` | `neutral` | `danger`.
- **destination**: page-relative href OR `<button type="button">` (visual-only).

**Action vocabulary**:

| Surface | Actions |
|---------|---------|
| admin/invoice-details.html action bar | تعليم كمدفوعة (success) / إضافة دفعة (primary, → create-manual-payment.html) / تطبيق رصيد العائلة (info) / تنزيل (neutral) / إلغاء الفاتورة (danger, vertical-divider-separated) |
| admin/family-balances.html row menu | عرض (eye, → individual family detail; if no detail page exists, links back to parent/family-balance.html for FAM-2023-0211 and to button-stub for others) / إضافة رصيد (plus, → create-manual-payment.html in balance-deposit mode) / خصم (minus, button-stub) / تسوية (settings, button-stub) |
| admin/payments.html row actions | عرض (eye, → linked invoice's invoice-details.html when applicable) / قائمة الإجراءات (kebab, button-stub) |
| admin/invoices.html bulk dropdown | تنزيل المحدّد / تعليم كمدفوعة / إرسال تذكير / تصدير CSV — all `<button type="button">` |

**Visual-only invariant**: every AdminAction renders without modifying any DOM state. Buttons are `<button type="button">`; navigations to other pages use real `href` to existing pages only.

---

## Cross-entity validation summary

The following invariants MUST hold across all entities + their renderings (verified by manual review during the Polish phase):

1. **Anchor-invoice byte-identity**: INV-2026-0184's E1 fields render byte-identically on student/invoice-details.html and admin/invoice-details.html (research.md §R6 / §R15).
2. **Family-balance ledger sum**: the 7 E3 rows for FAM-2023-0211 sum to exactly 450.00 ريال — matches both the parent/family-balance.html hero card AND the admin/family-balances.html "current_balance" column for FAM-2023-0211.
3. **Persona payment-history total**: the 7 E1 rows on student/payment-history.html have a "Paid + Partially Paid" sum of 934.00 ريال (excluding the Under Review row) — matches the FR-010 summary card 1.
4. **VAT line ubiquity**: every E1 invoice row that renders on a detail surface (student-side + admin-side invoice-details + tax-settings preview) MUST show a separate VAT line per research.md §R11.
5. **Currency consistency**: SAR rows render "ريال" (Arabic word); EGP rows render "EGP" (Latin code). No row mixes.
6. **Auto-application visibility**: the single auto-applied event (FAM-2023-0211 row 5 / INV-2026-0184 stream 3 / admin timeline event 3) MUST carry a "تلقائي" pill or label on all three rendering surfaces.
7. **Spec 006 academic figures untouched**: 92% / 88% / 88-100 / 89-100 / "ممتاز" / `RPT-2026-04-Q03-007` MUST NOT appear in any of the 10 new pages (research.md §R16 verification grep).
