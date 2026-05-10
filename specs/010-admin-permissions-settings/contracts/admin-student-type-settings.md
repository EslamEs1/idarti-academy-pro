# Contract: `pages/admin/student-type-settings.html`

**Role**: Admin | **Active sidebar entry**: «إعدادات المنصة» (parent — sub-flow pattern) | **Anchor entity**: 2 student-type rows per data-model.md E5

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Breadcrumb**: «إعدادات المنصة» → «إعدادات نوع الطالب»
3. **Page header bar** — title «إعدادات نوع الطالب» + subtitle «التصنيف الذي يحدّد التسعير وراتب المعلم وتسميات الفواتير والتقارير» + page-end caption (no CTA — both types are platform-locked, edits go through the admin pricing-rules page)
4. **Regulatory caption above table** (FR-045) — info-tone alert box:
   «تُحدَّد فئة الطالب وفقاً للغته الأولى وليس الجنسية أو بلد الإقامة — هذا يضمن مساواة المعاملة بين الطلاب السعوديين والمصريين الناطقين بالعربية.»
5. **Student-type table** (FR-042, FR-043) — 2 rows × 6 columns:
   - **Column headers** (under RTL): النوع / سلوك التسعير / سلوك راتب المعلم / تسمية الفاتورة / تسمية التقرير / الحالة + آخر تحديث
   - **2 rows** (per data-model.md E5):

     | # | Slug | Arabic label | Pricing tier | Salary bucket | Invoice label | Report label | Status | Last updated |
     |---|------|--------------|--------------|---------------|---------------|--------------|--------|--------------|
     | 1 | arabic_speaker | **ناطق بالعربية** | [اعرض القواعد](../admin/pricing-rules.html) (filter) | [اعرض الأسعار](../admin/teacher-salary-rules.html) (filter) | طالب ناطق بالعربية | طالب ناطق بالعربية | نشط ✓ | 2024-09-01 / محمد بن عبدالعزيز |
     | 2 | non_arabic_speaker | **غير ناطق بالعربية** | [اعرض القواعد](../admin/pricing-rules.html) | [اعرض الأسعار](../admin/teacher-salary-rules.html) | طالب غير ناطق بالعربية | طالب غير ناطق بالعربية | نشط ✓ | 2024-09-01 / محمد بن عبدالعزيز |

   - **Per-row action column**: 2 icon-buttons «تعديل» (pencil, visual-only) + «إيقاف» (pause, visual-only)
6. **Example-calculation preview block** (FR-044) — heading «معاينة التطبيق على حصة نموذجية» + 2-card side-by-side layout (stacks on mobile):

   - **ناطق-بالعربية card** (success-tinted background border):
     - Heading: «طالب ناطق بالعربية»
     - Body: حصة جماعية ساعة واحدة
       - السعر الأساسي: 25.00 ريال
       - ضريبة القيمة المضافة 15%: + 3.75 ريال
       - **الإجمالي المستحق: 28.75 ريال**
     - Caption: «وفق قاعدة التسعير #3 — نشطة منذ 2024-09-01»
   - **غير-ناطق-بالعربية card** (warm-tinted background border):
     - Heading: «طالب غير ناطق بالعربية»
     - Body: حصة جماعية ساعة واحدة
       - السعر الأساسي: 35.00 ريال
       - ضريبة القيمة المضافة 15%: + 5.25 ريال
       - **الإجمالي المستحق: 40.25 ريال**
     - Caption: «وفق قاعدة التسعير #4 — نشطة منذ 2024-09-01»
   - **Sub-caption below the cards**: «الفرق 11.50 ريال يعكس الفجوة في تسعير الفئة لتغطية تكلفة المواد التدريسية الإضافية للطلاب غير الناطقين بالعربية.»

7. **Footer caption** (non-link static text per FR-067): «إعدادات نوع الطالب جزء من إعدادات السياسة العامة. لتعديل التصنيف، يُرجى التواصل مع المدير العام.»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#8) | Page exists at `pages/admin/student-type-settings.html` |
| FR-042 | 2 student-type rows with canonical labels |
| FR-043 | Per-row 4 behavior columns + status + last-updated |
| FR-044 | Side-by-side example-calculation cards (28.75 vs 40.25 ريال) |
| FR-045 | Regulatory caption above table |
| FR-046 | Both rows نشط + visual-only edit affordances |
| FR-067 | Zero `href="#"` |

## Constraints

- Both rows MUST use the canonical Spec 008 Q3 labels «ناطق بالعربية» / «غير ناطق بالعربية» verbatim (SC-007).
- The example-calc cards MUST contain the exact arithmetic: 25 + 3.75 = 28.75 and 35 + 5.25 = 40.25 (verifiable by `grep`).
- The pricing-tier and salary-bucket cells contain real cross-page links (no `href="#"`).
- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry: «إعدادات المنصة» (parent — sub-flow pattern).
