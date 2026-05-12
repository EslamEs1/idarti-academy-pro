# Contract — `pages/admin/create-manual-payment.html`

**User story**: US3 (Admin configures tax / balances / manual payments, P3) — see spec.md.
**Active sidebar entry**: Payments (sub-flow).

## Two operational modes (per Q4 / research.md §R4)

| Mode | Entry point | Pre-fills |
|------|-------------|-----------|
| **Invoice-payment** (default) | persistent CTA on `admin/payments.html` + "إضافة دفعة" on `admin/invoice-details.html` | family عائلة مؤمن + student عبد الرحمن + invoice INV-2026-0231 + amount 437.00 + method تحويل بنكي + date 2026-05-10 |
| **Balance-deposit** | "إنشاء حركة رصيد" CTA on `admin/family-balances.html` (URL fragment `#deposit`) | family pre-selected (whichever); invoice = sentinel "— إيداع رصيد للعائلة بدون فاتورة محددة —"; method "إيداع رصيد"; amount blank; date 2026-05-10 |

The rendered HTML for the **default demo state is invoice-payment mode** with the persona's family pre-selected. The balance-deposit mode is documented in the FRs and represented by the sentinel option in the invoice select; switching modes is visually documented but not JS-driven.

**URL fragment is documentation-only**: the inbound link from `admin/family-balances.html` ("إنشاء حركة رصيد" CTA) carries `#deposit`. This fragment is descriptive — it signals the admin's intent — but **no JavaScript reads or acts on it**, so the rendered page still opens in invoice-payment mode (mode pill: "وضع: تسديد فاتورة"). To switch into balance-deposit mode, the admin selects the sentinel option "— إيداع رصيد للعائلة بدون فاتورة محددة —" in the invoice dropdown. Discoverability of balance-deposit mode therefore relies on the sentinel option rather than on a fragment-driven mode-switch (consistent with Constitution V's "no new JS handlers" rule).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#cmp-header` | h1 + breadcrumb + mode pill |
| Form | `#cmp-form` | All inputs |
| Receipt-upload affordance | `#cmp-upload` | drop-zone aesthetic |
| Action footer | `#cmp-actions` | Save / Cancel buttons + after-save caption |

## Required content

### Header (`#cmp-header`)

- Breadcrumb: `المدفوعات` → `إنشاء دفعة يدوية` (last crumb non-link).
- h1: `إنشاء دفعة يدوية`
- Subtitle: `سجّل دفعة جديدة لفاتورة قائمة، أو أَودِع رصيداً مُسبقاً للعائلة`
- Mode pill (info-tinted, top-right): "وضع: تسديد فاتورة" (default) — pill text changes to "وضع: إيداع رصيد" in balance-deposit mode (visual indicator only).

### Form (`#cmp-form`)

Form fields in this order (each with visible `<label for>`):

1. **العائلة** (`#cmp-family`) — `<select>` with ≥ 6 options (FR-100):
   - عائلة مؤمن (FAM-2023-0211) — **selected**
   - عائلة الحارثي (FAM-2022-0089)
   - عائلة العتيبي (FAM-2024-0156)
   - عائلة المنصور (FAM-2023-0312)
   - عائلة حسن (FAM-2024-0427، Cairo)
   - عائلة Hosni (FAM-2024-0511، Alexandria)

2. **الطالب** (`#cmp-student`) — `<select>` with options pre-filtered to the chosen family's children (rendered as if family عائلة مؤمن is selected) (FR-101):
   - عبد الرحمن مؤمن (STD-2024-0817) — **selected**
   - سارة مؤمن (STD-2024-0818)

3. **الفاتورة** (`#cmp-invoice`) — `<select>` with options narrowed to the persona's open invoices (FR-102):
   - INV-2026-0231 — اشتراك مايو 2026 — 437.00 ريال (مستحقة 2026-05-15) — **selected**
   - INV-SES-2026-0205 — حصة فردية للتأسيس النحوي — متبقّي 55.00 ريال
   - INV-SES-2026-0098 — حصة فردية لمراجعة الأخطاء — 92.00 ريال (متأخّرة منذ 74 يوم)
   - **— إيداع رصيد للعائلة بدون فاتورة محددة —** (sentinel option for balance-deposit mode)

4. **المبلغ المدفوع** (`#cmp-amount`) — `<input type="number" value="437.00">` + currency badge `ريال`. (FR-103)

5. **طريقة الدفع** (`#cmp-method`) — `<select>` with grouped options (FR-104):
   - **مجموعة "إيداع للعائلة":** إيداع رصيد (visible only in balance-deposit mode visually)
   - **مجموعة "تسديد فاتورة":**
     - نقداً
     - تحويل بنكي — **selected**
     - بطاقة مدى
     - فيزا/ماستركارد
     - STC Pay
     - رصيد العائلة
     - إيصال يدوي

6. **تاريخ الدفع** (`#cmp-date`) — `<input type="date" value="2026-05-10">`. (FR-105)

7. **ملاحظات** (`#cmp-notes`) — `<textarea>` with placeholder: (FR-106)
   > "أدخل أي ملاحظات إدارية تتعلق بهذه الدفعة (رقم مرجعي، اسم المُحوِّل، إلخ.)"

### Receipt-upload affordance (`#cmp-upload`) — FR-107

Visual drop-zone:
- `<div>` with dashed border + cloud-upload icon centered
- Text: "اسحب وأفلت الإيصال هنا، أو انقر للاختيار من جهازك"
- Hint: "PDF / JPG / PNG حتى 5MB"
- No `<input type="file">` change handler

### Action footer (`#cmp-actions`) — FR-108, FR-109

Two buttons + caption:
- Primary: `حفظ الدفعة` (success-tone, `<button type="button">`)
- Secondary: `إلغاء` → `payments.html` (real `<a href>`)
- Below buttons, info caption (text-xs, neutral-600):
  > "بعد الحفظ ستظهر الدفعة في صفحة 'المدفوعات' وستُحدَّث حالة الفاتورة المرتبطة. (في وضع 'إيداع رصيد': ستظهر الحركة في سجل رصيد العائلة على صفحة 'أرصدة العائلات').";

## Cross-references

- Sidebar: Active = "Payments".
- "إلغاء" → `payments.html`.
- "حفظ الدفعة" — visual only.
- Linked from `admin/payments.html` (persistent CTA), `admin/invoice-details.html` ("إضافة دفعة" action), and `admin/family-balances.html` ("إنشاء حركة رصيد" CTA + per-row "إضافة رصيد").

## Non-requirements (explicit)

- No JS state-change for mode switching — both modes are documented but the rendered HTML reflects only the default invoice-payment mode (the sentinel option in the invoice select makes the alternative mode visible).
- No real file upload.
- No real form submission.
- No date-validation logic.
- No cascading dropdown JS handler — the student select pre-renders only the Mu'min children (matching the family preselection).
