# Contract: `pages/admin/teacher-advances.html`

**Role**: Admin | **Active sidebar entry**: «مالية المعلمين» (sub-flow) | **Anchor**: 8 advances spanning all 4 statuses + EGP demonstration + status-aware action cells

## Page composition

1. **Header** (reused).
2. **Page title bar** — H1 «سلف المعلمين» + primary header CTA «إنشاء سلفة» → `pages/admin/create-teacher-advance.html`.
3. **Four summary tiles**:
   - إجمالي السلف النشطة — 2,750.00 ريال + 750.00 EGP separated — caption «6 سلف نشطة عبر 5 معلمين»
   - إجمالي المُسدَّد هذا الشهر — 1,000.00 ريال + 250.00 EGP — caption «من تسوية أبريل المعلّقة»
   - طلبات بانتظار الاعتماد — 1 طلب — caption «الأستاذ يوسف 500 ريال»
   - السلف المرفوضة (آخر 90 يوم) — 1 سلفة — caption «الأستاذة فاطمة 1,500 ريال»
4. **Filters strip** — 5 controls:
   - المعلّم dropdown
   - الحالة chips: نشطة / مكتملة / بانتظار الاعتماد / مرفوضة / الكل (شبه-مكتملة implied as a sub-state of نشطة on the chip group)
   - طريقة الخصم dropdown: تقسيط شهري ثابت / دفعة واحدة / نسبة من التسوية / الكل
   - شهر المنح dropdown
   - العملة chips: ريال / EGP / الكل
5. **Advances table** — 8 rows × 10 columns. Columns RTL order: رقم السلفة / المعلّم / تاريخ المنح / المبلغ / العملة / السبب / طريقة الخصم / شهر بدء الخصم / الحالة / الإجراءات.

   Anchor rows (per data-model.md E7):

   | # | Advance ID | Teacher | Granted | Amount | Currency | Reason | Method | Start | Status | Actions |
   |---|-----------|---------|---------|--------|----------|--------|--------|-------|--------|---------|
   | 1 | ADV-2025-0089 | الأستاذ أحمد | 2025-11-15 | 600.00 | ريال | إعداد منزل | تقسيط 3×200 | ديسمبر 2025 | مكتملة | عرض |
   | 2 | ADV-2026-0012 | الأستاذ أحمد | 2026-02-15 | 600.00 | ريال | نفقات أسرية طارئة | تقسيط 3×200 | مارس 2026 | شبه مكتملة | عرض + تعديل (caption "آخر دفعة ضمن تسوية معلّقة") |
   | 3 | ADV-2026-0023 | الأستاذ أحمد | 2026-04-01 | 1,000.00 | ريال | علاج طبي | تقسيط 4×250 | أبريل 2026 | نشطة | عرض / تعديل / إنهاء مبكر |
   | 4 | ADV-2026-0019 | الأستاذة منى | 2026-03-10 | 800.00 | ريال | رحلة عمل | تقسيط 4×200 | أبريل 2026 | نشطة | عرض / تعديل / إنهاء مبكر |
   | 5 | ADV-2026-0024 | الأستاذ يوسف | 2026-04-25 | 450.00 | ريال | رسوم دراسية للأبناء | تقسيط 3×150 | مايو 2026 | نشطة | عرض / تعديل / إنهاء مبكر |
   | 6 | **ADV-2026-EG-0007** | الأستاذة هبة | 2026-03-01 | 1,000.00 | **EGP (جنيه)** | نفقات شخصية | تقسيط 4×250 | أبريل 2026 | نشطة | عرض / تعديل / إنهاء مبكر |
   | 7 | ADV-2026-0031 | الأستاذ يوسف | 2026-05-08 | 500.00 | ريال | رسوم تجديد إقامة | تقسيط 2×250 | يونيو 2026 | **بانتظار الاعتماد** | **اعتماد + رفض** |
   | 8 | ADV-2026-0028 | الأستاذة فاطمة | 2026-04-22 | 1,500.00 | ريال | توسعة منزل | تقسيط 6×250 | مايو 2026 | **مرفوضة** (greyed, "محفوظ للسجل" caption, السبب "تجاوز سقف الراتب الشهري") | عرض السبب |

6. **Footnote near the table** (FR-066) — «السلف المرفوضة تبقى محفوظة في السجل لأغراض المراجعة الإدارية ولا يمكن حذفها».

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-060 | 4 summary tiles (currency-separated) |
| FR-061 | 5 filter controls |
| FR-062 | 8-row advances table |
| FR-063 | EGP row visible (row 6) |
| FR-064 | Status-aware action cells (5 distinct affordances) |
| FR-065 | إنشاء سلفة CTA |
| FR-066 | Audit-trail-rule footnote |
| FR-093 | All 4 statuses visible |
| FR-095 | ADV-2026-0012 + ADV-2026-0023 cross-references |

## Constraints

- All 4 advance statuses (نشطة / مكتملة / بانتظار-الاعتماد / مرفوضة) MUST be present (FR-093 + SC-011). شبه-مكتملة is the spec novelty appearing on row 2.
- Action cells MUST distinguish per-status:
  - نشطة → عرض + تعديل + إنهاء مبكر (3 buttons)
  - مكتملة → عرض only (read-only)
  - شبه-مكتملة → عرض + تعديل with caption
  - بانتظار الاعتماد → اعتماد + رفض (replacing standard view/edit pair)
  - مرفوضة → عرض السبب only (greyed read-only)
- Row 6 currency badge MUST be visible (per-row chip, not tooltip — FR-063).
- Sanctioned admin form filter inputs allowed.
