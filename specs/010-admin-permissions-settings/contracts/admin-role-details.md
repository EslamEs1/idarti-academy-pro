# Contract: `pages/admin/role-details.html`

**Role**: Admin | **Active sidebar entry**: «الأدوار والصلاحيات» (parent — deep-read pattern) | **Anchor entity**: مديرة المالية (Finance Manager) role with full 19×7 = 133-cell permission matrix per data-model.md E1+E2

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Breadcrumb**: «الأدوار والصلاحيات» → «صلاحيات: مديرة المالية»
3. **Page header bar** — title «صلاحيات: مديرة المالية» + role-type chip «تشغيلي» + status badge «نشطة» + page-end CTAs «حفظ التعديلات» (primary, success-tone) + «إلغاء» (secondary, neutral) → back to `roles-permissions.html`
4. **Matrix legend block** (top of matrix card, FR-011): three glyphs with text accompaniment (Constitution IV):
   - ✓ مسموح (success-green check icon, inline SVG, `aria-label="مسموح"`)
   - ✕ محجوب (danger-red X icon, inline SVG, `aria-label="محجوب"`)
   - – غير منطبق (neutral-gray dash, inline SVG, `aria-label="غير منطبق"`)
5. **Permission matrix** (FR-010): 19 module rows × 7 action columns = **133 cells**, wrapped in `<div class="overflow-x-auto"><table class="min-w-[900px]">` for tablet horizontal-scroll (FR-070).
   - **Column headers** (start to end under RTL, i.e., right-to-left): الوحدة / عرض / إنشاء / تعديل / حذف / اعتماد / تصدير / وصول مالي
   - **Row order** (per FR-010): لوحة التحكم / الطلاب / العائلات / المعلمون / الدورات / الحصص المباشرة / الواجبات / الاختبارات / الشهادات / التقارير / المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم / المنبر الاجتماعي / إعدادات المنصة / سجل المراجعة
   - **Cell values for Finance Manager** (per data-model.md E2 / research.md D4):

     | Module | View | Create | Edit | Delete | Approve | Export | Financial |
     |--------|:----:|:------:|:----:|:------:|:-------:|:------:|:---------:|
     | لوحة التحكم | ✓ | – | – | – | – | – | – |
     | الطلاب | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
     | العائلات | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
     | المعلمون | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
     | الدورات | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
     | الحصص المباشرة | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
     | الواجبات | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
     | الاختبارات | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
     | الشهادات | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
     | التقارير | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
     | **المدفوعات** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
     | **الفواتير** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
     | **إعدادات الضريبة** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
     | **رصيد العائلة** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
     | **مالية المعلم** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
     | **سُلَف المعلم** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
     | المنبر الاجتماعي | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
     | إعدادات المنصة | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
     | سجل المراجعة | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |

     **The 6 finance rows (المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم) are wrapped in HTML comment markers `<!-- MATRIX_ROWS_11_16_START -->` and `<!-- MATRIX_ROWS_11_16_END -->`** for SC-005 byte-identity diff against `user-details.html`'s mini-matrix.

   - **Cell glyph implementation**: each cell renders an inline SVG (success-green check / danger-red X / neutral-gray dash) accompanied by `aria-label="مسموح"` / `"محجوب"` / `"غير منطبق"` text — color is never the sole indicator (FR-069).
6. **Metadata strip** (below matrix, FR-013): 4-field horizontal flex:
   - الدور: مديرة المالية (Finance Manager)
   - المستخدمون المعيّنون: **3** (with cross-link «عرض المستخدمين» → `users.html` styled as a link with the role chip)
   - آخر تعديل: 2026-04-22 بواسطة محمد بن عبدالعزيز الإدريسي
   - الحالة: نشطة (success-green badge)
7. **Action bar footer** (FR-014): «حفظ التعديلات» (primary, success-tone, visual-only `<button type="button">`) + «إلغاء» (secondary, neutral, links to `roles-permissions.html`) + sibling caption «آخر حفظ — 2026-04-22 14:18 — بواسطة محمد بن عبدالعزيز» below

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#2) | Page exists at `pages/admin/role-details.html` |
| FR-010 | 19×7 = 133-cell matrix |
| FR-011 | 3-glyph legend at top |
| FR-012 | Finance Manager pattern (rows 11-16 all ✓; rows 2-6 + 10 View+Export only; rows 7-9 + 17-19 all ✕; row 1 View only) |
| FR-013 | Metadata strip below matrix |
| FR-014 | «حفظ التعديلات» / «إلغاء» action buttons |
| FR-067 | Zero `href="#"` |
| FR-069 | Inline SVG glyphs with aria-label text |
| FR-070 | `overflow-x-auto` + `min-w-[900px]` for matrix |

## Constraints

- The 6 finance rows MUST be marked with `<!-- MATRIX_ROWS_11_16_START -->` / `<!-- MATRIX_ROWS_11_16_END -->` comments AND must use byte-identical markup to the `<!-- MINI_MATRIX_START -->` / `<!-- MINI_MATRIX_END -->` block on user-details.html (SC-005).
- Cell glyph counts: 55 ✓ + 72 ✕ + 6 – = 133 (SC-008).
- No `href="#"` (SC-002).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry remains «الأدوار والصلاحيات» (parent), not literal «role-details» — deep-read pattern.
- Save/Cancel buttons are visual-only `<button type="button">` per Constitution V.
