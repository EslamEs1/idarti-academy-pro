# Contract — `pages/admin/family-balances.html`

**User story**: US3 (Admin configures tax / balances / manual payments, P3) — see spec.md.
**Active sidebar entry**: Family Balances.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#fbal-header` | h1 + subtitle + إنشاء حركة رصيد CTA |
| Summary tiles | `#fbal-summary` | 3 tiles (count / SAR total / EGP total) |
| Filter strip | `#fbal-filters` | search + currency chips + zero-balance toggle |
| Families table | `#fbal-table` | 6 rows |

## Required content

### Header (`#fbal-header`) — FR-095

- h1: `أرصدة العائلات`
- Subtitle: `إدارة الرصيد المُسبق لكل عائلة على مستوى الأكاديمية`
- Top-right primary CTA: **`إنشاء حركة رصيد`** → `create-manual-payment.html#deposit` (per Q4 / research.md §R4)

### Summary tiles (`#fbal-summary`) — FR-090

3 tiles. Currencies are NEVER summed across tiles.

| # | Tile | Value |
|---|------|-------|
| 1 | عدد العائلات | 142 (4 of which carry zero balance) |
| 2 | إجمالي الرصيد بالريال | 18,540.00 ريال |
| 3 | إجمالي الرصيد بالجنيه | 4,820.00 EGP |

### Filter strip (`#fbal-filters`) — FR-091

Three controls in this RTL order:
1. **البحث** input — placeholder "ابحث باسم العائلة أو رقمها"
2. **العملة** chips — "الكل" (selected) / "ريال" / "EGP"
3. **العائلات بدون رصيد** toggle — `<button>` (visual only, default OFF)

### Families table (`#fbal-table`) — FR-092, FR-093, FR-094

6 anchor rows. Columns from start: العائلة، أولياء الأمر، الأبناء (count + tooltip names)، الرصيد الحالي + العملة، آخر معاملة، الإجراءات.

| # | Family | Parents | Children | Balance | Last txn | Actions |
|---|--------|---------|----------|--------:|---------:|---------|
| 1 | عائلة مؤمن (FAM-2023-0211) | ولي أمر الطالب عبد الرحمن | 2 (عبد الرحمن، سارة) | 450.00 ريال | 2026-05-08 | عرض / إضافة رصيد / خصم / تسوية |
| 2 | عائلة الحارثي (FAM-2022-0089) | — | 2 (نورة، خالد) | 1,200.00 ريال | 2026-04-29 | عرض / إضافة رصيد / خصم / تسوية |
| 3 | عائلة العتيبي (FAM-2024-0156) | — | 1 (عبدالعزيز) | **0.00 ريال** (zero-balance neutral badge) | 2026-03-15 | عرض / إضافة رصيد / خصم / تسوية |
| 4 | عائلة المنصور (FAM-2023-0312) | — | 3 (فهد، ريما، ليلى) | 850.00 ريال | 2026-05-05 | عرض / إضافة رصيد / خصم / تسوية |
| 5 | عائلة حسن (FAM-2024-0427، Cairo) | — | 2 (أحمد، فاطمة) | 380.00 EGP | 2026-05-03 | عرض / إضافة رصيد / خصم / تسوية |
| 6 | عائلة Hosni (FAM-2024-0511، Alexandria) | — | 1 (Yousuf) | 1,540.00 EGP | 2026-04-18 | عرض / إضافة رصيد / خصم / تسوية |

**Per-row 4-icon action menu** (FR-094):

| Icon | Label (tooltip) | Action |
|------|-----------------|--------|
| eye | عرض | View family details (links back to `../parent/family-balance.html` for FAM-2023-0211; button-stub for other families since their detail page is not in scope) |
| plus | إضافة رصيد | Links to `create-manual-payment.html#deposit` (balance-deposit mode) |
| minus | خصم | `<button type="button">` (visual only) |
| settings | تسوية | `<button type="button">` (visual only) |

**Currency badges** per row use research.md §R12 vocabulary: ريال (neutral) / EGP (info-50 distinct).

**Zero-balance row** (row 3): the balance "0.00 ريال" cell uses neutral-200 background tint with a small "بدون رصيد" caption — visually distinct but not danger-tone (zero is neutral, not failure).

## Cross-references

- Sidebar: Active = "Family Balances".
- Header CTA → `create-manual-payment.html#deposit` (real route, eliminates the only `href="#"` exception per Q4 / research.md §R4).
- Per-row "عرض" for FAM-2023-0211 → `../parent/family-balance.html` (cross-role link — admins can view what parents see).
- Per-row "إضافة رصيد" → `create-manual-payment.html#deposit`.

## Non-requirements (explicit)

- No JS filter / search handler.
- No real "deduct" or "adjustment" handlers — button-stubs.
- No "edit family" CTA (out of scope).
- The زر "View family detail" routes only for FAM-2023-0211; other families' button-stubs are accepted because individual family-detail pages are out of scope (the parent family-balance.html page IS the persona's family's detail page).
