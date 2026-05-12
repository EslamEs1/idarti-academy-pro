# Contract: `pages/admin/pricing-rules.html`

**Role**: Admin | **Active sidebar entry**: «إعدادات المنصة» (parent — sub-flow pattern) | **Anchor entity**: 9 pricing rules per data-model.md E4

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Breadcrumb**: «إعدادات المنصة» → «قواعد التسعير»
3. **Page header bar** — title «قواعد التسعير» + subtitle «أسعار الدورات والحصص حسب نوع الطالب وطريقة التقديم» + page-end CTA «+ قاعدة جديدة» (primary button, scrolls to form below — visual-only via in-page anchor)
4. **Four summary tiles** (FR-034) in a 4-column desktop grid:
   - القواعد النشطة: **8** (success-tone)
   - الموقوفة: **1** (neutral-tone)
   - العملات المغطّاة: **2** (info-tone with chips «SAR / EGP»)
   - أحدث تحديث: **2026-05-01** (warm-tone)
5. **Pricing-rules table** (FR-035, FR-036) — 9 rows × 7 columns. Wrapped in `<div class="overflow-x-auto"><table class="min-w-[900px]">` for tablet.
   - **Column headers** (under RTL): نوع القاعدة / نوع الطالب / السعر / يطبّق على / تاريخ السريان / الحالة / الإجراء
   - **9 rows** (per data-model.md E4):

     | # | Type | Student type | Price | Currency | Applies to | Effective | Status |
     |---|------|--------------|-------|----------|------------|-----------|--------|
     | 1 | course-flat (دورة كاملة) | ناطق بالعربية | **380.00 ريال** | SAR badge | دورة القرآن الكريم — المستوى الثالث | 2024-09-01 | نشطة ✓ |
     | 2 | course-flat (دورة كاملة) | غير ناطق بالعربية | **600.00 ريال** | SAR badge | دورة القرآن الكريم — المستوى الثالث (للناطقين بغير العربية) | 2024-09-01 | نشطة ✓ |
     | 3 | live-group (حصة جماعية) | ناطق بالعربية | **25.00 ريال** | SAR badge | حصة جماعية ساعة واحدة | 2024-09-01 | نشطة ✓ |
     | 4 | live-group (حصة جماعية) | غير ناطق بالعربية | **35.00 ريال** | SAR badge | حصة جماعية ساعة واحدة | 2024-09-01 | نشطة ✓ |
     | 5 | live-private (حصة خاصة) | كلاهما | **0.00 ريال** | SAR badge | حصة تجريبية مجانية (FR-041 zero-price edge case) | 2025-01-01 | نشطة ✓ |
     | 6 | live-private (حصة خاصة) | ناطق بالعربية | **60.00 ريال** | SAR badge | حصة خاصة ساعة واحدة | 2024-09-01 | نشطة ✓ |
     | 7 | live-private (حصة خاصة) | غير ناطق بالعربية | **80.00 ريال** | SAR badge | حصة خاصة ساعة واحدة | 2024-09-01 | نشطة ✓ |
     | 8 | Egypt-tier course (دورة مصرية) | غير ناطق بالعربية | **1500.00 EGP** | EGP badge | دورة الإنجليزية لغير الناطقين — المستوى الأول | 2025-01-01 | نشطة ✓ |
     | 9 | Egypt-tier session (حصة مصرية) | غير ناطق بالعربية | **80.00 EGP** | EGP badge | حصة جماعية بالقاهرة | 2025-01-01 | **موقوفة** (since 2026-03-15, reason: «إعادة هيكلة الباقة المصرية») |

   - **Per-row action column**: 3 icon-buttons (عرض / تعديل / إيقاف — or «إعادة تفعيل» on row 9 since it's موقوفة) — all visual-only `<button type="button">` per FR-066
6. **Table footnote** (FR-040) — directly below the table in muted text:
   `* جميع قواعد التسعير تُطبَّق إلى الأمام من تاريخ السريان.`

7. **Rules form panel** (FR-038) — below the table, in a card-grouped 2-column desktop layout (form on start, callout on end):
   - **Form fields** (7 fields):
     - اسم القاعدة (Arabic): text input
     - نوع القاعدة: dropdown (course-flat / live-group / live-private / Egypt-tier)
     - نوع الطالب: radio group (ناطق بالعربية / غير ناطق بالعربية / كلاهما)
     - السعر: numeric input + currency tag (toggleable SAR / EGP)
     - يطبّق على: dropdown of available courses or session classes
     - تاريخ السريان: date picker (defaulted to 2026-06-01)
     - الحالة: toggle (نشطة / موقوفة)
   - **Q1 retroactivity callout** (FR-039) — sits beside the «تاريخ السريان» picker (under RTL: to the right on desktop, above on mobile). Info-tone alert box with icon:
     - Heading: «🛡️ سياسة عدم الرجعية»
     - Body: «تسري القاعدة على الفواتير الجديدة فقط من تاريخ السريان — لا تُعدَّل الفواتير المستحقة سابقاً. يضمن هذا التنظيم استقرار الالتزامات المالية للأسر وتوافقاً مع متطلبات هيئة الزكاة والضريبة في المملكة.»
   - **Form footer**: «حفظ القاعدة» (primary success-tone, visual-only) + «إلغاء» (neutral) + sibling caption «آخر حفظ بواسطة محمد بن عبدالعزيز — 2026-05-07 17:00» (timestamp aligns with audit-log event 13)

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#7) | Page exists at `pages/admin/pricing-rules.html` |
| FR-034 | 4 summary tiles |
| FR-035 | 9-row table covering 4 mechanisms × 2 student types + edge cases |
| FR-036 | Per-row 7 columns + per-row currency badge |
| FR-037 | 4 canonical anchor figures (380 / 60 / 25 / 1500) preserved |
| FR-038 | 7-field rule form |
| FR-039 | Q1 retroactivity callout beside effective-date picker |
| FR-040 | Table footnote `* جميع قواعد التسعير تُطبَّق إلى الأمام من تاريخ السريان.` |
| FR-041 | Rule 5 «حصة تجريبية مجانية» zero-price edge case |
| FR-067 | Zero `href="#"` |

## Constraints

- 9 rows in the table — exact count.
- All 4 anchor figures (380 / 60 / 25 / 1500) MUST appear (SC-006 reconciliation with Spec 008).
- The Q1 callout text MUST appear verbatim with «تسري القاعدة على الفواتير الجديدة فقط» substring (SC-010).
- The footnote text MUST appear verbatim with «جميع قواعد التسعير» substring (SC-010).
- Currency badges per row (SAR or EGP) — never summed across rows.
- The «حصة تجريبية مجانية» row 5 has price `0.00 ريال` — visually distinct (e.g., warm-tone background) but not visually broken.
- The موقوفة row 9 carries the «إعادة تفعيل» CTA replacing «إيقاف» — mirrors Spec 009 rule-8 pattern.
- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry: «إعدادات المنصة» (parent — sub-flow pattern).
