# Contract: `pages/admin/transfer-student-teacher.html`

**Role**: Admin | **Active sidebar entry**: «تعيين الطلاب للمعلمين» | **Anchor entity**: `ASN-2024-1185` (سارة مؤمن × الأستاذة منى → الأستاذ خالد) per data-model.md E8 transfer-page demo

## Page composition (top → bottom under RTL)

1. **Header** (reused).
2. **Page header bar** — breadcrumb «تعيين الطلاب للمعلمين › تفاصيل التعيين ASN-2024-1185 › نقل المعلم» + title «نقل الطالب من معلم إلى آخر» + subtitle «إجراء آمن يحفظ السجلات التاريخية للمعلم السابق».
3. **Current-assignment summary card** (read-only) at top — 7 chips/labels:
   - الطالب: «سارة مؤمن — STD-2023-0144 — 9 سنوات — جدة — ناطق بالعربية»
   - العائلة: «عائلة مؤمن — FAM-2023-0211»
   - الدورة والمستوى: «دورة القرآن الكريم — المستوى الثاني»
   - المعلم الحالي: «الأستاذة منى سعد — TCH-2023-0012» (highlighted brand-primary)
   - نوع التعيين / نوع الجلسة / نموذج الدفع: «معلم رئيسي / جماعية / دورة كاملة — 380.00 ريال»
   - تاريخ البدء: 2024-09-15
   - الجلسات المتبقية: 14 من 24
   - identifier chip: «ASN-2024-1185»

4. **Transfer form card** — 5 controls in canonical order:

   | # | Label | Type | Pre-fill |
   |---|-------|------|----------|
   | 1 | المعلم الجديد | `<select>` (other 3 teachers — excluding الأستاذة منى; at-capacity teachers visually distinguished with disabled-style + tooltip «هذا المعلم وصل للسعة القصوى») | «الأستاذ خالد العبدلي — TCH-2023-0013» |
   | 2 | تاريخ النقل | `<input type="date">` | 2026-05-15 |
   | 3 | سبب النقل | radio group (6 options per E8 Reason enum canonical order) | «تعارض في الجدول» selected (5th option) |
   | 4 | نطاق التطبيق | radio group (3 options per E8 Scope enum canonical order) | «الجلسات المستقبلية فقط» selected (1st — safe-default) |
   | 5 | ملاحظات إدارية | `<textarea>` | «بناءً على اتصال الوالد محمود مؤمن لتوحيد جدول الأخت سارة مع جدول أخيها عبد الرحمن لأنهما يدرسان في نفس المدرسة ولديهما مواعيد دراسية متشابهة.» |

5. **«إشعار حفظ السجل التاريخي» callout** — warning-amber border + warning icon + bold heading:
   - **Heading**: «إشعار حفظ السجل التاريخي»
   - **Body**: «سيتم الاحتفاظ بجميع التقارير والحضور والواجبات والسجلات المالية مرتبطةً بالمعلم الحالي — لن يُحذف أي سجل سابق. الطالب سينتقل إلى المعلم الجديد ابتداءً من تاريخ النقل المحدد، ولكن سجلاته السابقة ستظل مرتبطة بالمعلم السابق للمرجعية التاريخية.»
   - Renders **immediately above** the «تأكيد النقل» CTA — the most-prominent block on the page after the form.

6. **Action bar**:
   - Primary CTA «تأكيد النقل» — `<button type="button" data-modal-open="confirm-transfer">` (danger-amber styled per Constitution IV — warning tone)
   - Secondary outline CTA «إلغاء» → `pages/admin/student-teacher-assignment-details.html?id=ASN-2024-1185` (or simply the assignments-list page if the details file is hard-coded to ASN-2024-1184)
   - **NOTE**: Since the details page is hard-coded to ASN-2024-1184 (FR-030), the cancel CTA on this transfer page routes to the **assignments-list page** instead — `pages/admin/student-teacher-assignments.html`.

7. **Sanctioned modal block** at page bottom:
   - `id="modal-confirm-transfer"`
   - Body title: «تأكيد نقل المعلم»
   - Projected post-action caption: «سيتم نقل سارة مؤمن من الأستاذة منى سعد إلى الأستاذ خالد العبدلي ابتداءً من 2026-05-15 بسبب «تعارض في الجدول». يبقى ربط جميع السجلات السابقة (التقارير، الحضور، الواجبات، السجلات المالية) بالأستاذة منى سعد دون تغيير.»
   - Secondary caption: «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً.»
   - Buttons: «تأكيد النقل» (warning-amber) / «إلغاء» (`data-modal-close`)

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#4) | Page exists |
| FR-040 | Current-assignment summary card pre-populated for ASN-2024-1185 |
| FR-041 | 5-control form in canonical order |
| FR-042 | 6-radio reason group in canonical order; «تعارض في الجدول» pre-selected |
| FR-043 | 3-radio scope group in canonical order; «الجلسات المستقبلية فقط» pre-selected |
| FR-044 | Warning-amber callout above CTA with full body verbatim |
| FR-045 | «تأكيد النقل» CTA opens sanctioned modal with projected post-action + «هذا عرض مرئي فقط» |
| FR-080 | Reuses existing modal handler — no new JS |

## Constraints

- The new-teacher select shows الأستاذ أحمد (at capacity) as **disabled-styled** with the tooltip «هذا المعلم وصل للسعة القصوى» — but selectable in the static prototype (visual signal only).
- The «طلب ولي الأمر» / «عدم توفر المعلم» / «تغيير المستوى» / «تحسين الأداء» / «تعارض في الجدول» / «قرار إداري» radio order is canonical; do NOT alphabetize.
- The «الجلسات المستقبلية فقط» pre-selection is the safe-default (mirrors Spec 009 forward-only convention).
- The warning callout MUST be the most-visually-prominent block above the CTA — warning-amber border (`border-warning-500`), warning icon, bold heading, full body text. NOT a tiny footnote.
- No `href="#"`.
- The cancel CTA routes to the assignments-list page (not the details page, which is hard-coded to ASN-2024-1184 — a different identifier).
- The transfer modal body cites all 4 record types («التقارير، الحضور، الواجبات، السجلات المالية») by name — making the policy concrete.
- Latin digits inside Arabic copy (the project-wide convention; FR-081 spells it out for the currency-formatting case).
