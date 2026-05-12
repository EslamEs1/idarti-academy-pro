# Contract: `pages/teacher/settlement-details.html`

**Role**: Teacher | **Active sidebar entry**: «الأرباح» (deep-read of the parent surface) | **Anchor entity**: STL-2026-04-TCH-0042 (الأستاذ أحمد April 2026 settlement, status بانتظار الاعتماد) — the dual-lens entity shared with `pages/admin/teacher-settlement-details.html`

## Page composition

1. **Header** (reused).
2. **Settlement header section**:
   - Settlement ID `STL-2026-04-TCH-0042`
   - Period «1 - 30 أبريل 2026»
   - Issue date 2026-05-01 / Expected approval 2026-05-12 / Expected payment 2026-05-15
   - Status badge «بانتظار اعتماد الإدارة» (info-tone) + caption «ستُسدَّد عبر مصرف الراجحي إلى الحساب المنتهي بـ ‎0042 فور الاعتماد».
3. **«بيانات المعلّم» section** — name الأستاذ أحمد بن عبد الله الزهراني / TCH-2024-0042 / مدرّس القرآن الكريم / تاريخ التعيين 2024-09-01 / عقد دائم / الجنسية سعودية / البنك مصرف الراجحي / IBAN `SA03********0042` (masked).
4. **«أرباح الحصص حسب نوع الطالب» panel** — 4 rate-bucket rows (identical to teacher/earnings.html FR-012):
   - ناطق بالعربية — جماعية: 24 × 30.00 = 720.00 ريال
   - ناطق بالعربية — خاصة: 16 × 60.00 = 960.00 ريال
   - غير ناطق بالعربية — جماعية: 8 × 50.00 = 400.00 ريال
   - غير ناطق بالعربية — خاصة: 4 × 100.00 = 400.00 ريال
   - **Subtotal: 2,480.00 ريال**
5. **«أرباح الدورات» panel** — 2 rows:
   - دورة القرآن الكريم — المستوى الثالث — قاعدة "20% من الإيرادات" — إيرادات الدورة لشهر أبريل 8,000.00 ريال — حصة المعلّم **1,600.00 ريال**
   - — — labelled «لا توجد دورات بمبلغ ثابت لهذا المعلّم» (empty-state for the second mechanism)
6. **«حوافز» panel** — 1 row + Q2 caption:
   - حافز التميز شهر أبريل — +200.00 ريال — مُمنَح بواسطة SARA.M (موظفة المالية) في 2026-05-01 — الملاحظة «بناءً على نسبة حضور الطلاب 92% وتقييم المراقب»
   - **Q2 «سياسة حافز التميز» caption** (directly below the row): «يُمنَح هذا الحافز عند تجاوز نسبة حضور الطلاب 90% خلال الشهر + تقييم إيجابي من المراقب الأكاديمي — المبلغ 200.00 ريال ثابت. تحقّق هذا الشرط في أبريل بنسبة حضور 92% (وفق التقرير `RPT-2026-04-Q03-007`).»
7. **«خصومات يدوية» panel** — 1 row:
   - خصم تأخّر 2 جلسة (14 + 22 أبريل) — -80.00 ريال — مُسجَّل بواسطة SARA.M في 2026-05-02 — الملاحظة «وفق سياسة الالتزام بالمواعيد، 40 ريال × 2 جلسة»
8. **«السلف المخصومة» panel** — 2 rows + subtotal + footnote:
   - ADV-2026-0012 — الدفعة الأخيرة 3 من 3 — -200.00 ريال — مُجدوَل في تاريخ 2026-04-30
   - ADV-2026-0023 — الدفعة 1 من 4 — -250.00 ريال — مُجدوَل في تاريخ 2026-04-30
   - **إجمالي السلف المخصومة -450.00 ريال**
   - Footnote «بعد سداد هاتين الدفعتين، تُغلق ADV-2026-0012 تلقائياً ويتبقّى من ADV-2026-0023 مبلغ 750.00 ريال على 3 دفعات.»
9. **Financial-totals card** — 11 lines (use `font-tabular-nums` + `divide-y` separators):
   1. أرباح الحصص: 2,480.00 ريال
   2. أرباح الدورات: 1,600.00 ريال
   3. الحوافز: +200.00 ريال
   4. **إجمالي الأرباح: 4,280.00 ريال**
   5. الخصومات اليدوية: -80.00 ريال
   6. **الإجمالي بعد الخصومات: 4,200.00 ريال**
   7. السلف المخصومة: -450.00 ريال
   8. **الصافي المستحق: 3,750.00 ريال**
   9. عملة الدفع: ريال سعودي
   10. الحساب البنكي المستهدف: مصرف الراجحي SA03********0042
   11. الحالة: بانتظار اعتماد الإدارة
10. **Action area** — visual buttons:
    - Primary «تنزيل التسوية (PDF)» (visual, no `<a download>`)
    - Secondary «طباعة» (visual)
11. **«تواصل مع الإدارة» footer caption** — non-link text «لطلب توضيح حول التسوية، يُرجى استخدام صفحة الرسائل عند توفّرها» (no `href="#"`).

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-030 | Header section |
| FR-031 | بيانات المعلّم section |
| FR-032 | 4-bucket session-earnings panel |
| FR-033 | 2-row course-earnings panel |
| FR-034 | Bonus panel + Q2 caption |
| FR-035 | Manual-deductions panel |
| FR-036 | Advance-deductions panel + footnote |
| FR-037 | 11-line financial-totals card |
| FR-038 | Download / Print buttons |
| FR-039 | Footer caption (no `href="#"`) |
| FR-090 | Arabic-vs-Foreign labels |
| FR-095 | Cross-page advance traceability |
| FR-096 | Zero `<input type="number">` |

## Constraints

- The 11 financial lines MUST render byte-identically on `pages/admin/teacher-settlement-details.html` (SC-005).
- The Q2 caption MUST cite the 92% figure from Spec 006's `RPT-2026-04-Q03-007` verbatim.
- The «تواصل مع الإدارة» footer is non-link text — zero `href="#"` (SC-004).
- Zero `<input type="number">` (SC-010).
