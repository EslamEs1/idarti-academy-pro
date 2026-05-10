# Contract: `pages/admin/create-role.html`

**Role**: Admin | **Active sidebar entry**: «الأدوار والصلاحيات» (parent — sub-flow pattern) | **Anchor entity**: empty form scaffolding for a new Role per data-model.md E1+E2

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Breadcrumb**: «الأدوار والصلاحيات» → «إنشاء دور جديد»
3. **Page header bar** — title «إنشاء دور جديد» + subtitle «حدّد المعلومات الأساسية والصلاحيات للدور الجديد» — no page-end CTAs (form footer carries them)
4. **Two-column layout** (desktop): main form (start, ~70% width) + side panel (end, ~30% width). Stacks on mobile.
5. **Main form** — three sections in card-grouped vertical flow:
   - **Section 1 — معلومات أساسية** (FR-015):
     - اسم الدور (Arabic) — text input (required, placeholder «مثال: مساعد مالي»)
     - اسم الدور (English) — text input (optional, placeholder «e.g., Finance Assistant»)
     - نوع الدور — dropdown with 3 options: مدير / تشغيلي / دعم
   - **Section 2 — الوصف** (FR-015):
     - وصف الدور — textarea (4 rows, placeholder «اشرح الغرض من الدور والمستخدمين المستهدفين...»)
   - **Section 3 — الصلاحيات** (FR-015): 19-module accordion. Each accordion item:
     - **Module heading** (clickable to toggle expansion via existing tabs/dropdown handler — no new JS): module name (e.g., «المدفوعات») + chevron icon + count badge «0 من 7 مفعّلة» (visual-only count, since all 133 checkboxes are pre-rendered unchecked)
     - **Module body** (collapsed by default; first 3 modules — لوحة التحكم / الطلاب / العائلات — pre-expanded for visual demonstration): 7 checkboxes in a horizontal row labeled «عرض / إنشاء / تعديل / حذف / اعتماد / تصدير / وصول مالي»
     - 19 modules × 7 checkboxes = **133 pre-rendered `<input type="checkbox">` elements**, all unchecked
     - Module order: لوحة التحكم / الطلاب / العائلات / المعلمون / الدورات / الحصص المباشرة / الواجبات / الاختبارات / الشهادات / التقارير / المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم / المنبر الاجتماعي / إعدادات المنصة / سجل المراجعة
6. **Side panel — معاينة الدور** (FR-016): sticky position on desktop. Visual-only preview card showing:
   - Placeholder copy «اكتب اسم الدور لتظهر المعاينة» (italic, muted-tone)
   - A faint card outline below mimicking what a role card on `roles-permissions.html` would look like
   - Caption «التحديث في الوقت الفعلي غير متاح في النموذج التجريبي»
7. **Form footer action bar** (FR-017): «إنشاء الدور» (primary, success-tone, visual-only `<button type="submit">` of a `<form>` with no `action` attribute — Constitution V) + «إلغاء» (secondary, links to `roles-permissions.html`) + sibling caption «حفظ المسودة تلقائياً غير مفعّل في النموذج التجريبي» below

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#3) | Page exists at `pages/admin/create-role.html` |
| FR-015 | 3 form sections (basic info / description / permissions accordion) |
| FR-016 | Side panel preview card |
| FR-017 | Form footer action buttons |
| FR-067 | Zero `href="#"` |
| FR-068 | Reuses existing accordion via `data-tab-target` (or similar tab handler from main.js) — no new JS |

## Constraints

- 133 pre-rendered `<input type="checkbox">` checkboxes total; none checked by default.
- Accordion expansion uses the existing tabs handler from `main.js` (data-attribute pattern) — zero new JS.
- The «إنشاء الدور» button is `<button type="submit">` inside a `<form>` element with no `action` attribute and no `onsubmit` handler — clicking does nothing functional but the form structure is present for visual completeness.
- The «إلغاء» button is an `<a href="roles-permissions.html">` styled as a button per FR-067.
- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry: «الأدوار والصلاحيات» (parent — sub-flow pattern).
