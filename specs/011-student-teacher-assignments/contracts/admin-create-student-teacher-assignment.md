# Contract: `pages/admin/create-student-teacher-assignment.html`

**Role**: Admin | **Active sidebar entry**: «تعيين الطلاب للمعلمين» (the parent page) | **Anchor entity**: pre-rendered create-form for the **عمر شودري × الأستاذ خالد × «غير ناطق» / 600.00-ريال** demo state per data-model.md E1 + E5 + E6

## Page composition (top → bottom under RTL)

1. **Header** (reused).
2. **Page header bar** — breadcrumb «تعيين الطلاب للمعلمين › إنشاء تعيين جديد» + title «إنشاء تعيين جديد» + subtitle «إضافة طالب لمعلم على دورة ومستوى محددين مع نموذج دفع متوافق مع نوع الطالب».
3. **Form card** — 2-column desktop grid (mobile-stacked), 13 controls in canonical order:

   | # | Label | Type | Pre-filled value (demo state) |
   |---|-------|------|-------------------------------|
   | 1 | الطالب | `<select>` | «عمر شودري — STD-2024-0034» |
   | 2 | نوع الطالب | read-only chip (derived from student) | «غير ناطق بالعربية» (accent-orange + label) |
   | 3 | العائلة | `<select>` (auto-populated) | «عائلة شودري — FAM-2024-0089 — ولي الأمر: محمد إقبال شودري» |
   | 4 | الدورة | `<select>` | «دورة القرآن الكريم» |
   | 5 | المستوى | `<select>` | «المستوى الثالث» |
   | 6 | المعلم | `<select>` | «الأستاذ خالد العبدلي — TCH-2023-0013» |
   | 7 | نوع التعيين | `<select>` (6 options per E2 canonical order) | «معلم رئيسي» |
   | 8 | نوع الجلسة | `<select>` (2 options: خاصة / جماعية) | «خاصة» |
   | 9 | نموذج الدفع | `<select>` (4 options per E4 canonical order) | «دورة كاملة» |
   | 10 | عدد الجلسات | `<input type="number">` | 24 (disabled — derived from دورة كاملة) |
   | 11 | تاريخ البدء | `<input type="date">` | 2026-05-15 |
   | 12 | الأيام المفضّلة | multi-chip group (الأحد...السبت) | [الإثنين, الأربعاء] selected |
   | 13 | الوقت المفضّل | `<input type="time">` | 17:00 |
   | + | ملاحظات إدارية | `<textarea>` | «تم التواصل مع ولي الأمر السيد محمد إقبال شودري عبر واتساب وأكد البدء يوم الجمعة 15 مايو.» |

4. **Pricing-preview card** (immediately below the form, full-width or 8-column desktop span) — 4 lines:

   | Line | Label | Value | Caption |
   |------|-------|-------|---------|
   | 1 | سعر الطالب | **600.00 ريال** | «وفقاً لقاعدة التسعير #2 — دورة القرآن الكريم — المستوى الثالث — غير ناطق بالعربية» |
   | 2 | تقدير أرباح المعلم | **480.00 ريال** | «حسب فئة الراتب: حصص خاصة — غير ناطق — 80% من سعر الطالب» |
   | 3 | الضريبة المضافة | **90.00 ريال** | «15% — وفقاً لإعدادات الضريبة في إعدادات المنصة» |
   | 4 | رصيد العائلة المتاح | **0.00 ريال** | «حساب جديد — لا يوجد رصيد سابق على عائلة شودري» |

   **Footnote**: «* الأسعار تتغير تلقائياً عند تغيير نوع الطالب — هذا المعروض مبني على الحالة الحالية للنموذج.»

5. **Action bar** at footer:
   - Primary CTA «حفظ التعيين» — `<button type="button" data-modal-open="confirm-save-assignment">` (no real form submit)
   - Sibling caption immediately below: «آخر حفظ — لم يُحفظ بعد — هذا عرض مرئي فقط»
   - Secondary outline CTA «إلغاء» — links back to `pages/admin/student-teacher-assignments.html`

6. **Sanctioned modal block** at page bottom:
   - `id="modal-confirm-save-assignment"` (hidden by default)
   - Body title: «تأكيد إنشاء التعيين»
   - Projected post-action caption: «سيتم تعيين عمر شودري للأستاذ خالد العبدلي على دورة القرآن الكريم — المستوى الثالث ابتداءً من 2026-05-15 بنموذج دورة كاملة. السعر النهائي 600.00 ريال + 90.00 ضريبة = 690.00 ريال.»
   - Secondary caption: «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً.»
   - Buttons: «تأكيد الحفظ» (primary) / «إلغاء» (`data-modal-close`)

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#2) | Page exists at `pages/admin/create-student-teacher-assignment.html` |
| FR-020 | 13 form controls in canonical order |
| FR-021 | Assignment-type select has 6 options in canonical order |
| FR-022 | Session-type select has 2 options |
| FR-023 | Payment-model select has 4 options in canonical order |
| FR-024 | Pricing-preview card renders 4 lines citing Spec-010 rule ID + Spec-009 salary bucket + Spec-008 tax + family ID |
| FR-025 | «حفظ التعيين» CTA with `data-modal-open` + sibling «آخر حفظ — لم يُحفظ بعد» caption |
| FR-083 | Save CTA opens sanctioned modal with projected post-action caption + «هذا عرض مرئي فقط» |

## Constraints

- The form is pre-rendered in the seeded عمر state — Constitution V forbids JS state changes, so the form does NOT dynamically recompute when fields change. The inline footnote explains the dynamic-in-real-app behavior.
- All 6 assignment-type options selectable even though only «معلم رئيسي» is exercised in the demo state.
- The number-of-sessions input is `disabled` when payment-model is «دورة كاملة» or «حصة تجريبية» — visually grayed out with caption «يُحدَّد من نموذج الدفع».
- The pricing-preview values match the data-model E5/E6 anchors verbatim (600.00 / 480.00 / 90.00 / 0.00 — no contradiction with the Spec 008 INV-2026-0184 380-subtotal that applies to the persona's «ناطق» rate).
- The pricing-preview cites the Spec-010 rule ID by number, not by retyping the rule text — this preserves the single-source-of-truth discipline.
- No `href="#"`; the form's cancel button routes to the parent assignments page; the save CTA opens a modal.
- No live JS recomputation; no API call; no fake save.
- The cross-spec anchor identifier `FAM-2023-0211` is **NOT** mentioned here (the demo state is عمر / `FAM-2024-0089`); to satisfy SC-005's FAM-2023-0211 preservation, the persona's family ID appears on `student-teacher-assignment-details.html` instead.
