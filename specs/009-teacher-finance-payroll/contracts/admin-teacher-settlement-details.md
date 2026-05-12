# Contract: `pages/admin/teacher-settlement-details.html`

**Role**: Admin | **Active sidebar entry**: «مالية المعلمين» (sub-flow) | **Anchor entity**: STL-2026-04-TCH-0042 (الأستاذ أحمد April 2026 — the dual-lens entity shared with `pages/teacher/settlement-details.html`)

## Page composition

The page reuses the entire teacher-side settlement-details layout (sections 2-9 of `teacher-settlement-details.md`) byte-identically, then adds **three admin-only panels** + a **5-button action bar** + the **3 confirmation modals** (Q1) + a **bank-info panel** + a **comparison mini-panel**.

### Shared with teacher-side (byte-identical)

1. Header (admin variant)
2. Settlement header section (STL-2026-04-TCH-0042 + period + dates + status badge + caption)
3. «بيانات المعلّم» section (TCH-2024-0042 + bank info)
4. 4-bucket session-earnings panel (24×30 / 16×60 / 8×50 / 4×100 = 2,480.00 ريال)
5. Course-earnings panel (1,600.00 ريال + empty fixed-amount row)
6. Bonus panel (+200.00 ريال) + **Q2 caption** (with admin-side sub-caption "هذه القاعدة موثّقة في سياسة الحوافز المعتمدة — لتعديل القاعدة، يُرجى التواصل مع المدير العام.")
7. Manual-deductions panel (-80.00 ريال)
8. Advance-deductions panel (2 rows -200 + -250 = -450.00 ريال + footnote)
9. 11-line financial-totals card (identical figures)

### Admin-only additions

10. **«سجل الاعتماد» timeline panel** (FR-081) — 5 chronological events:
    - 2026-05-01 — إنشاء التسوية (تلقائي عند إقفال الشهر) — السجل: نظام تلقائي
    - 2026-05-02 — إضافة خصم يدوي -80.00 ريال — السجل: SARA.M (موظفة المالية) — السبب: «جلستان متأخرتان 14 + 22 أبريل وفق سياسة الالتزام»
    - 2026-05-02 — إضافة حافز +200.00 ريال — السجل: SARA.M — السبب: «حافز التميز شهر أبريل بناءً على نسبة الحضور 92% وتقييم المراقب — يستوفي شرط ≥90% المنصوص عليه في سياسة الحوافز»
    - 2026-05-03 — مراجعة من قبل المدير المالي AHMED.K — حالة «جاهزة للاعتماد»
    - 2026-05-10 (متوقع) — اعتماد التسوية — معلّق

11. **«تعديلات يدوية» panel** (FR-082) — 2 rows + add-CTA:
    - +200.00 ريال — حافز التميز — SARA.M — 2026-05-01 — «بناءً على نسبة الحضور 92%» (success-tone +)
    - -80.00 ريال — خصم تأخّر جلستين — SARA.M — 2026-05-02 — «وفق سياسة الالتزام» (danger-tone −)
    - "إضافة تعديل يدوي" CTA above the list (visual-only, opens an inline composer demo-rendered with placeholder fields).

12. **«أثر السلف» panel** (FR-083) — 2 rows with hyperlinks:
    - **ADV-2026-0012** — الدفعة 3 من 3 — -200.00 ريال — هذه آخر دفعة، ستُغلق السلفة عند اعتماد التسوية → hyperlink to `pages/admin/teacher-advances.html#ADV-2026-0012`
    - **ADV-2026-0023** — الدفعة 1 من 4 — -250.00 ريال — يتبقّى 750.00 ريال على 3 أشهر → hyperlink to `pages/admin/teacher-advances.html#ADV-2026-0023`

13. **«ملاحظات إدارية» thread** (FR-084) — 3 notes:
    - 2026-05-02 — كاتب: SARA.M — «تم احتساب خصم تأخّر الجلستين وفق السياسة المعتمدة»
    - 2026-05-03 — كاتب: AHMED.K — «تأكيد على أن نسبة الحضور لشهر أبريل 92% تستحق حافز التميز»
    - 2026-05-09 — كاتب: SARA.M — «بانتظار اعتماد المدير العام لإصدار الدفعة عبر مصرف الراجحي»

14. **Action bar** (FR-085) — 5 buttons RTL order from start:
    - **اعتماد التسوية** (success-tone primary) — opens **Q1 modal #1**
    - **تعليم كمدفوعة** (primary) — opens **Q1 modal #2**
    - **تعديل يدوي** (info-tone) — opens FR-082 inline composer (visual)
    - **تنزيل** (neutral) — visual only
    - **إعادة فتح التسوية** (danger-tone, visually separated by vertical divider) — opens **Q1 modal #3**

15. **«بيانات المعلّم البنكية» panel** (FR-086) — مصرف الراجحي + IBAN `SA03********0042` + admin caption «تُسدَّد التسوية إلى هذا الحساب فور النقر على «تعليم كمدفوعة»» + static-disabled caption «(تعديل بيانات الحساب يتم من ملف المعلّم — يُنفَّذ في إصدار قادم)» (NO `href="#"`).

16. **«مقارنة بالشهر السابق» mini-panel** (FR-087):
    - مارس 2026 — صافي 3,400.00 ريال
    - أبريل 2026 — صافي 3,750.00 ريال
    - الفرق +350.00 ريال (+10.3%)
    - Caption «بسبب 4 حصص إضافية + حافز التميز، وعلى الرغم من بدء خصم سلفة جديدة».

### Q1 confirmation modals (3 sanctioned modals reusing main.js modal handler)

**Modal #1 — «اعتماد التسوية»** (triggered by the success-tone «اعتماد التسوية» button):
- Title: «تأكيد اعتماد تسوية أبريل 2026»
- Body: «التسوية ستنتقل إلى حالة معتمدة — السداد المتوقّع 2026-05-15 عبر مصرف الراجحي إلى الحساب SA03********0042»
- Secondary caption: «هذا عرض مرئي فقط — لن تُصدَر دفعة فعلية في الإصدار الحالي»
- Buttons: «تأكيد الاعتماد» (success-tone primary) / «إلغاء» (neutral secondary)

**Modal #2 — «تعليم كمدفوعة»** (triggered by the primary-tone «تعليم كمدفوعة» button):
- Title: «تأكيد تسجيل الدفعة»
- Body: «ستُسجَّل دفعة بمبلغ 3,750.00 ريال إلى الحساب SA03********0042 بتاريخ 2026-05-10 عبر مصرف الراجحي»
- Secondary caption: «هذا عرض مرئي فقط — لن تُصدَر دفعة فعلية في الإصدار الحالي»
- Buttons: «تأكيد التسجيل» (primary) / «إلغاء»

**Modal #3 — «إعادة فتح التسوية»** (triggered by the danger-tone «إعادة فتح التسوية» button):
- Title: «تأكيد إعادة فتح التسوية»
- Body: «سيتم إعادة فتح التسوية وإلغاء أي اعتمادات سابقة — هذا الإجراء يُسجَّل في سجل الاعتماد ولا يمكن التراجع عنه دون موافقة المدير العام»
- Buttons: «تأكيد الفتح» (danger-tone) / «إلغاء»

All three modals reuse the existing **`data-modal-open`** / **`data-modal-close`** attribute pattern from `assets/js/main.js` (lines 36-44). The trigger button carries `data-modal-open="modal-{name}"` (value = the modal element's `id`); the close button inside `<div id="modal-{name}" role="dialog" class="hidden">` carries `data-modal-close`. The handler removes the `hidden` class on open and adds it back on close. **Zero new JS** — only markup.

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-080 | Anchor STL-2026-04-TCH-0042 with byte-identical 11 financial lines |
| FR-081 | سجل الاعتماد timeline (5 events) |
| FR-082 | تعديلات يدوية panel + add-CTA |
| FR-083 | أثر السلف panel + hyperlinks |
| FR-084 | ملاحظات إدارية thread (3 notes) |
| FR-085 | 5-button action bar + Q1 modals |
| FR-086 | بيانات المعلّم البنكية panel (no `href="#"`) |
| FR-087 | مقارنة بالشهر السابق mini-panel |
| FR-090 | Q2 caption with admin sub-caption |
| FR-095 | Cross-page advance traceability via hyperlinks |

## Constraints

- Sections 2-9 MUST render byte-identically with `pages/teacher/settlement-details.html` (SC-005 — diff yields zero numeric divergence).
- The 3 Q1 modals MUST be rendered as `<div role="dialog">` elements in the page's HTML, hidden by default, toggled by the existing main.js modal handler — **no new JS**.
- The «تعديل بيانات الحساب» affordance (FR-086) MUST be a static disabled caption, never `href="#"` (SC-004).
- Manual-adjustments panel sign-color discipline: success-tone `+` for positive, danger-tone `-` for negative; sign + label both visible.
- `أثر السلف` panel hyperlinks resolve to `pages/admin/teacher-advances.html` (with optional `#ADV-XXXX` fragment for stretch goal — fragment links to the row are visual-only).
