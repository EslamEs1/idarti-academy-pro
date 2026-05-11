# Contract: `pages/admin/student-teacher-assignments.html`

**Role**: Admin | **Active sidebar entry**: «تعيين الطلاب للمعلمين» (new in Spec 011) | **Anchor entity**: 18 Assignment records per data-model.md E1

## Page composition (top → bottom under RTL)

1. **Header** (reused) — search / bell / profile dropdown with Tajawal greeting "أهلاً بك، سارة محمد"
2. **Page header bar** — title «تعيين الطلاب للمعلمين» + subtitle «إدارة ربط الطلاب بالمعلمين عبر الدورات والمستويات وأنواع الجلسات» + page-end CTAs:
   - Primary CTA «+ تعيين طالب لمعلم» → `pages/admin/create-student-teacher-assignment.html`
   - Secondary outline CTA «تصدير CSV» — `<button type="button">` with `title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي"`, no `href`, no `download` attribute (visual-only, mirrors Spec 010 audit-log Q2)
3. **Five summary tiles** in a 5-column desktop grid (mobile-stacked, tablet 2+3 wrap):
   - إجمالي التعيينات: **18** (success-tone) — with a sub-line «16 نشطة · 1 موقوفة · 1 مكتملة» so the headline number is not mistaken for "16 active"
   - طلاب بدون معلم: **3** (warning-tone) — clickable link routes to `pages/admin/students.html` filtered view
   - معلمون وصلوا للسعة القصوى: **1 (الأستاذ أحمد)** (warm-tone, accent)
   - عمليات النقل هذا الشهر: **3** (neutral-tone)
   - تعيينات لطلاب غير ناطقين: **6** (info-tone)
4. **Filter bar** — 7 controls in 1 row (desktop) / wrap on mobile:
   - الطالب: `<input type="search">` (placeholder «اكتب اسم الطالب...»)
   - المعلم: `<select>` (5 options + «جميع المعلمين» default)
   - الدورة: `<select>` (existing courses from Spec 003)
   - المستوى: `<select>` (course-dependent)
   - نوع الطالب: radio group (ناطق / غير ناطق / الكل) — «الكل» selected by default
   - حالة التعيين: `<select>` (نشطة / موقوفة / منتهية / مكتملة / الكل)
   - نوع الجلسة: `<select>` (خاصة / جماعية / الكل)
5. **18-row × 13-column table** in `<div class="overflow-x-auto"><div class="min-w-[1200px]">`:

   | # | Column | Notes |
   |---|--------|-------|
   | 1 | الطالب | Name + STD-... ID tooltip |
   | 2 | العائلة | Name + FAM-... ID |
   | 3 | نوع الطالب | ناطق / غير ناطق chip — brand-primary / accent-orange |
   | 4 | الدورة | from Spec 003 catalog |
   | 5 | المستوى | text |
   | 6 | المعلم الحالي | Name + TCH-... ID |
   | 7 | نوع التعيين | one of 6 E2 enum values as chip |
   | 8 | نوع الجلسة | خاصة / جماعية chip |
   | 9 | نموذج الدفع | one of 4 E4 enum values + price subtotal |
   | 10 | تاريخ البدء | YYYY-MM-DD |
   | 11 | الجلسات المتبقية | "X من Y" + on-the-verge indicator for ≤ 2 |
   | 12 | الحالة | status badge (نشطة / موقوفة / منتهية / مكتملة) |
   | 13 | الإجراءات | 4 icon-buttons: عرض / تعديل / نقل / إيقاف (or استئناف on موقوف rows) |

   **Anchor row** (row 1): عبد الرحمن مؤمن / FAM-2023-0211 / ناطق بالعربية / دورة القرآن الكريم / المستوى الثالث / الأستاذ أحمد بن عبد الله / معلم رئيسي / خاصة / دورة كاملة — 380.00 ريال / 2024-09-15 / 18 من 24 / نشطة / 4-icon row.

   **Multi-teacher demo row** (row 2): عبد الرحمن مؤمن (SAME student, second row demonstrating multi-teacher rule) / FAM-2023-0211 / ناطق / حصص جماعية إضافية للقرآن الكريم / المستوى الثالث / الأستاذة منى سعد / معلم رئيسي / جماعية / اشتراك شهري — 25.00 ريال/جلسة / 2025-02-10 / حسب جدول الشهر / نشطة / 4-icon row.

   **Sister row** (row 3): سارة مؤمن / FAM-2023-0211 / ناطق / دورة القرآن الكريم / المستوى الثاني / الأستاذة منى سعد / معلم رئيسي / جماعية / دورة كاملة — 380.00 ريال / 2024-09-15 / 14 من 24 / نشطة / 4-icon row. **THE TRANSFER-PAGE PRE-POPULATION ANCHOR**.

   **Foreign-student anchor row** (row N — at least one): عمر شودري / FAM-2024-0089 / غير ناطق / دورة القرآن الكريم / المستوى الثالث / الأستاذ خالد العبدلي / معلم رئيسي / خاصة / دورة كاملة — 600.00 ريال (Rule 2) / 2026-05-15 / 24 من 24 / نشطة / 4-icon row.

   **EGP anchor row**: name (e.g., يوسف عبد الله المصري) / FAM-2024-... (Egypt-resident family) / غير ناطق / Egypt-tier course / level / الأستاذة هبة / معلم رئيسي / خاصة / دورة كاملة — **1,500.00 EGP** (Rule 8) / start-date / sessions / نشطة / 4-icon row.

   **موقوف anchor row** (1 of 18): student name / family / ناطق / course / level / teacher / type / session-type / payment-model / start-date / sessions / **موقوف** badge (neutral-gray + pause icon) / actions = عرض / تعديل / **استئناف** (sanctioned-modal `data-modal-open="confirm-resume-assignment"`) / حذف.

   **«على وشك الانتهاء» rows** (2 of 18): الجلسات المتبقية cell shows "2 من 10 — على وشك الانتهاء" (warning-amber indicator).

6. **Table-footer pagination caption**: «عرض 18 من 18 تعييناً» (no real pagination needed; the 18 rows are the entirety of the seeded scenario).
7. **4 sanctioned modal blocks** at the page bottom (hidden by default — toggled by the existing main.js handler):
   - `id="modal-confirm-stop-assignment"` — opened by the «إيقاف» icon on any نشطة row. Body: «سيتم إيقاف التعيين ابتداءً من 2026-05-12 — تبقى السجلات السابقة محفوظة لدى المعلم الحالي.» + «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً». Buttons: تأكيد الإيقاف / إلغاء.
   - `id="modal-confirm-resume-assignment"` — opened by «استئناف» on the موقوف row. Body: «سيتم استئناف التعيين ابتداءً من 2026-05-12 — تستأنف الجلسات والفواتير حسب نموذج الدفع المحدد.» + secondary caption. Buttons: تأكيد الاستئناف / إلغاء.

   (The save-assignment and transfer modals are NOT on this page — they live on the create-form and transfer pages respectively.)

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#1) | Page exists at `pages/admin/student-teacher-assignments.html` |
| FR-002 | Admin sidebar gains 2 new entries — this page is the target of the first |
| FR-004 | No `href="#"` anywhere on this page |
| FR-010 | 5 summary tiles |
| FR-011 | 7-control filter bar in canonical order |
| FR-012 | 18-row × 13-column table |
| FR-013 | ≥ 6 «غير ناطق» rows |
| FR-014 | ≥ 1 موقوف row + ≥ 1 EGP row |
| FR-015 | 4 icon-buttons per row in canonical order (with استئناف replacing the default 4 on موقوف rows) |
| FR-016 | Page-header «+ تعيين طالب لمعلم» CTA + visual-only «تصدير CSV» |
| FR-080 | Reuses existing modal handler — no new JS |
| FR-081 | EGP row renders «1,500.00 EGP» (no conversion / no sum) |

## Constraints

- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (the project-wide convention; FR-081 spells it out for the currency-formatting case).
- Color-AND-label-AND-icon for all chips and status badges (Constitution IV).
- The «تصدير CSV» button is `<button type="button">` with `title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي"` — no `href`, no `download`.
- 13-column table renders inside `<div class="overflow-x-auto"><div class="min-w-[1200px]">` to satisfy mobile/tablet horizontal-scroll.
- Row 1 anchor identifier `ASN-2024-1184` (visible in row tooltip or aria-label) — required for SC-003 cross-page anchor count.
- The 5 summary tile values are consistent: 18 active total includes the 6 «غير ناطق» subset; the 3 «طلاب بدون معلم» are not on the table (waiting list); the 3 «عمليات النقل هذا الشهر» are reflected by 3 rows whose history timeline shows a transfer event in May 2026 (not all 3 transfers happened to ASN-2024-1184 — most happened to OTHER assignments seeded in the data-model).
- The «معلم وصل للسعة القصوى — 1» card cites الأستاذ أحمد by name; the card is informational, not a filter — clicking it does NOT filter the table (no JS).
