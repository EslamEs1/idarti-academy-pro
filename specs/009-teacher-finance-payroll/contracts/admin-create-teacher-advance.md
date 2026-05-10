# Contract: `pages/admin/create-teacher-advance.html`

**Role**: Admin | **Active sidebar entry**: «مالية المعلمين» (sub-flow) | **Demo state**: 800-ريال علاج-طبي-طارئ advance for الأستاذة منى سعد effective from يونيو 2026

## Page composition

1. **Header** (reused).
2. **Page title bar** — H1 «إنشاء سلفة جديدة» + breadcrumbs «مالية المعلمين › سلف المعلمين › إنشاء سلفة».
3. **Two-column layout (desktop) / stacked (mobile)** — form on the right (RTL primary side), impact-preview side card on the left.

### Form (right side under RTL) — 9 fields

   1. **المعلّم** select — 6 options (الأستاذ أحمد / **الأستاذة منى سعد** ✓ pre-selected / الأستاذ خالد / الأستاذة فاطمة / الأستاذ يوسف / الأستاذة هبة)
   2. **المبلغ** numeric input + currency badge — pre-fill `800.00` + badge «ريال» (visually swaps to «جنيه مصري» if EGP teacher selected, but the demo state shows ريال)
   3. **سبب السلفة** dropdown — 6 options (**علاج طبي طارئ** ✓ pre-selected / نفقات أسرية / رسوم دراسية / رسوم حكومية / إعداد منزل / أخرى)
   4. **طريقة الخصم** dropdown — 3 options (**تقسيط شهري ثابت** ✓ pre-selected / دفعة واحدة في الشهر القادم / نسبة من التسوية الشهرية حتى السداد)
   5. **عدد الأقساط** numeric input (visible because deduction-method = تقسيط) — pre-fill `4` + helper caption «الإجمالي 800.00 ÷ 4 = 200.00 ريال شهرياً» (rendered statically per FR-074 — no JS recalc)
   6. **شهر بدء الخصم** date picker (month-precision) — defaulted to **يونيو 2026**
   7. **ملاحظات إدارية** textarea — pre-fill «موافقة المدير العام بتاريخ 2026-05-09 عبر الاتصال — السلفة لتغطية تكاليف علاج طبي عاجل لأحد أبناء المعلّمة» + placeholder shown in design
   8. **مرفقات** drag-and-drop file-upload affordance + button — caption «PDF / JPG / PNG، حد أقصى 5MB» (visual only — no `<input type="file">` change handler)
   9. **Action buttons** row — primary «حفظ السلفة» (success-tone) + secondary «إلغاء» (returns to `pages/admin/teacher-advances.html`)

### Impact-preview side card (left under RTL on desktop, below the form on mobile)

   - Title «ملخص الأثر على التسوية»
   - Body (FR-079b): «التأثير المتوقع على تسوية يونيو 2026 للأستاذة منى سعد: -200.00 ريال (الدفعة 1 من 4) — سيُخفّض الصافي المستحق المتوقّع من ~3,840.00 ريال إلى ~3,640.00 ريال»
   - Sub-caption «هذه القيم تقديرية — قد تتغيّر بناءً على الحصص الفعلية والأرباح للشهر»

### Post-form captions (below the action buttons)

   - «بعد الحفظ» caption — «ستظهر السلفة الجديدة على صفحة سلف المعلمين وعلى صفحة سلف المعلمة المخصصة لها — السلفة قابلة للتعديل أو الإلغاء قبل اعتمادها» (FR-079).

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-070 | المعلّم select with الأستاذة منى pre-selected |
| FR-071 | Amount input + currency badge |
| FR-072 | Reason dropdown 6 options |
| FR-073 | Deduction method dropdown 3 options |
| FR-074 | Installments-count input + helper caption |
| FR-075 | Date picker defaulted يونيو 2026 |
| FR-076 | Notes textarea pre-filled |
| FR-077 | File-upload affordance |
| FR-078 | Save + Cancel buttons |
| FR-079 | Post-form captions |
| FR-079b | Impact-preview side card |

## Constraints

- The form is rendered in the "demo pre-fill state" — alternate states (other teachers, other deduction methods) are NOT rendered in the markup; the spec documents them but the implementation only ships the demo state.
- The dependent-field visibility (installments-count visible when method = تقسيط) is rendered statically — selecting a different method does NOT toggle visibility (no JS handler).
- The currency badge swap (ريال ↔ جنيه) is not JS-driven — markup statically reflects the demo state's currency (ريال for the الأستاذة منى pre-selection).
- File-upload area is a visual drop-zone aesthetic — no real handler.
- Save button is `<button type="button">` — no real form submission.
- Cancel button is an `<a href="teacher-advances.html">` link styled as a secondary button.
- All amounts use Latin digits inside Arabic copy (FR-005).
