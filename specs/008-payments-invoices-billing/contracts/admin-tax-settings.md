# Contract — `pages/admin/tax-settings.html`

**User story**: US3 (Admin configures tax / balances / manual payments, P3) — see spec.md.
**Active sidebar entry**: Tax Settings.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#ts-header` | h1 + subtitle + informational callout |
| Toggle row | `#ts-toggle` | Tax-enabled toggle + sub-caption |
| Configuration form | `#ts-form` | percent / country / apply-to / tax-number / footer-note |
| Example-invoice preview | `#ts-preview` | KSA + Egypt side-by-side cards |
| Action footer | `#ts-actions` | Save / Cancel buttons |

## Required content

### Header (`#ts-header`) — FR-088

- h1: `إعدادات الضريبة`
- Subtitle: `إدارة ضريبة القيمة المضافة (VAT) المُطبَّقة على الفواتير`
- **Informational callout** (info-tinted box, 1 short paragraph):
  > "رسوم التسجيل معفاة من الضريبة وفق سياسة الأكاديمية. تغيير قائمة 'تطبيق الضريبة على' يؤثر فقط في الفواتير المُصدَرة بعد الحفظ، ولا يُعيد احتساب الفواتير التاريخية."

### Toggle row (`#ts-toggle`) — FR-080

Top of form:
- Toggle: **`تفعيل الضريبة`** in the ON state (success-tone green) — visual only, no JS handler.
- Sub-caption: "الضريبة مُطبَّقة على الفواتير وفقاً للإعدادات أدناه."

### Configuration form (`#ts-form`)

Form fields in this order (each with a visible `<label for>`):

1. **نسبة الضريبة** (`#ts-percent`) — `<input type="number" value="15">` + `%` suffix label. (FR-081)
2. **الدولة** (`#ts-country`) — `<select>` with two options: "المملكة العربية السعودية" (selected) + "جمهورية مصر العربية". Each option has a small format hint visible below the select: "نسبة 15% — رقم ضريبي 15 خانة (يبدأ بـ 3)" / "نسبة 14% — رقم ضريبي 9 خانات". (FR-082)
3. **تطبيق الضريبة على** (`#ts-apply-to`) — checkbox group with 4 items in this order: (FR-083)
   - ☑ الدورات الكاملة
   - ☑ الحصص المباشرة
   - ☑ الحصص الخاصة
   - ☐ رسوم التسجيل (intentionally unchecked)
4. **الرقم الضريبي** (`#ts-tax-number`) — `<input type="text" value="312345678900003">`. (FR-084)
5. **ملاحظة تذييل الفاتورة** (`#ts-footer-note`) — `<textarea>` with default value: (FR-085)
   > "السعر شامل ضريبة القيمة المضافة. الرقم الضريبي: 312345678900003. شكراً لثقتكم بأكاديمية إدارتي."

### Example-invoice preview (`#ts-preview`) — FR-086

Section heading: "معاينة حساب الفاتورة"

Two cards side-by-side at desktop, stacked at mobile:

#### KSA card (titled "مثال — المملكة العربية السعودية، 15%")

| Line | Amount |
|------|--------|
| اشتراك دورة — المستوى الثالث (شهر مايو 2026) | 380.00 ريال |
| المجموع الفرعي | 380.00 ريال |
| ضريبة القيمة المضافة (15%) | 57.00 ريال |
| **الإجمالي** | **437.00 ريال** |

Footer: "الرقم الضريبي: 312345678900003"

#### Egypt card (titled "مثال بديل — جمهورية مصر العربية، 14%")

| Line | Amount |
|------|--------|
| اشتراك دورة — مستوى متقدم (شهر مايو 2026) | 1,500.00 EGP |
| المجموع الفرعي | 1,500.00 EGP |
| ضريبة القيمة المضافة (14%) | 210.00 EGP |
| **الإجمالي** | **1,710.00 EGP** |

Footer: "Sample tax number — 200-456-789 (9-digit Egyptian format)"

### Action footer (`#ts-actions`) — FR-087

Right-end (RTL-end → start) of the page:
- Primary: `حفظ الإعدادات` (`<button type="button">`, success-tone)
- Secondary: `إلغاء` (`<button type="button">`, neutral)

Both visual only.

## Cross-references

- Sidebar: Active = "Tax Settings".
- The VAT-line callouts on student-side and admin-side invoice-details pages reference this page via tooltip/footnote.

## Non-requirements (explicit)

- No JS save handler.
- No real form submission.
- No multi-step wizard — single-page form.
- No country-3rd option (only KSA and Egypt are demoed).
