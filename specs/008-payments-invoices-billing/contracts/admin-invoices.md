# Contract — `pages/admin/invoices.html`

**User story**: US2 (Admin operates payments and invoices, P2) — see spec.md.
**Active sidebar entry**: Invoices.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#ai-header` | h1 + subtitle |
| Summary cards | `#ai-summary` | 5 cards |
| Filter strip | `#ai-filters` | 6 filter controls |
| Bulk-action affordance | `#ai-bulk` | master checkbox + dropdown |
| Invoices table | `#ai-table` | ≥ 12 rows (per research.md §R18) |

## Required content

### Header (`#ai-header`)

- h1: `الفواتير`
- Subtitle: `قائمة الفواتير على مستوى الأكاديمية مع أدوات الفلترة والإجراءات المجمّعة`

### Summary cards (`#ai-summary`) — FR-060

5 cards (count + amount-sum):

| # | Card | Count | Amount sum |
|---|------|-------|------------|
| 1 | إجمالي الفواتير | 142 | 64,392.00 ريال + 4,104.00 EGP |
| 2 | مدفوعة | 98 | 41,860.00 ريال + 1,710.00 EGP |
| 3 | غير مدفوعة | 28 | 14,520.00 ريال + 2,394.00 EGP |
| 4 | مدفوعة جزئياً | 6 | 1,260.00 ريال متبقّي |
| 5 | متأخّرة | 10 | 4,752.00 ريال |

### Filter strip (`#ai-filters`) — FR-061

6 controls. Visual-only (no JS state-change).

1. **حالة الدفع** chip group: "الكل" + 6 chips (مدفوعة / غير مدفوعة / مدفوعة جزئياً / متأخّرة / ملغاة / تحت المراجعة)
2. **نوع الطالب** chips: "الكل" + "ناطق بالعربية" + "غير ناطق بالعربية" (per Q3 / R3)
3. **نوع البند** dropdown: "الكل" + 5 types (دورة كاملة / حصة مباشرة / حصة خاصة / حصة جماعية / رسوم تسجيل)
4. **الشهر** dropdown: "كل الأشهر" + Dec 2025 → May 2026
5. **العملة** chips: "الكل" + "ريال" + "EGP"
6. **البحث** input: placeholder "ابحث برقم الفاتورة أو اسم الطالب"

### Bulk-action affordance (`#ai-bulk`) — FR-063

Above the table, two elements:
- **Master checkbox** in the table header column 1 (visual only — does NOT toggle child rows when clicked)
- **`إجراءات مجمّعة`** dropdown (`<button>` with `aria-disabled="true"` when no rows selected — pure CSS state). Dropdown options (visible when opened, but the dropdown is rendered with `aria-expanded="false"` by default):
  - تنزيل المحدّد
  - تعليم كمدفوعة
  - إرسال تذكير
  - تصدير CSV

### Invoices table (`#ai-table`) — FR-062, FR-064, FR-065

≥ 12 rows per research.md §R18. Columns from start: ☐ checkbox، رقم الفاتورة، الطالب، نوع الطالب، نوع البند، الإجمالي، العملة، الحالة، تاريخ الاستحقاق، إجراء.

(See research.md §R18 for the full 12-row anchor table.)

**Per-row affordances**:
- Leading checkbox (visual; no JS state).
- Trailing "عرض" CTA → `invoice-details.html` (admin-side detail page, anchor INV-2026-0184 demo).
- Status badge per row (using research.md §R12 vocabulary).
- "نوع الطالب" badge column: "ناطق بالعربية" (neutral) or "غير ناطق بالعربية" (info-50 distinct tone). Rows 11 + 12 of §R18 carry the "غير ناطق بالعربية" badge (≥ 2 rows per FR-062).
- Currency badge per row: "ريال" or "EGP".

## Cross-references

- Sidebar: byte-identical. Active = "Invoices".
- Per-row "عرض" CTA → `invoice-details.html` (sibling).

## Non-requirements (explicit)

- No JS bulk-toggle handler — master checkbox is visual.
- No real CSV export — "تصدير CSV" option is a button-stub.
- No filter-state persistence (filters are visual chips/dropdowns, not stateful).
