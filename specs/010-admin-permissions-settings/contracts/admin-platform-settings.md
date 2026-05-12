# Contract: `pages/admin/platform-settings.html`

**Role**: Admin | **Active sidebar entry**: «إعدادات المنصة» | **Anchor entity**: 7 configuration cards per data-model.md E8

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Page header bar** — title «إعدادات المنصة» + subtitle «الهوية، اللغة، العملة، التواصل، والشهادات الرسمية» + page-end caption «آخر حفظ — 2026-05-09 14:22 — بواسطة سارة محمد» (muted text, no CTA)
3. **Two-column layout** (desktop): main column (~70% width) + sticky save bar at footer. Stacks on mobile.
4. **Seven configuration cards** (FR-030) in vertical card-grouped flow:

   - **Card 1 — هوية الأكاديمية**:
     - اسم الأكاديمية (العربية): `<input type="text" value="أكاديمية إدارتي للتعليم">`
     - اسم الأكاديمية (English): `<input type="text" value="Idarti Academy for Education">`
     - الشعار المختصر: `<input type="text" value="إدارتي" maxlength="10">` (used for compact UI)
   - **Card 2 — الشعار**:
     - Visual: 200×200 placeholder image (current logo) + caption «الحجم الموصى به: 512×512 بكسل، PNG شفاف»
     - File input (visual-only): `<input type="file" accept="image/*" />` + button «رفع شعار جديد» (visual-only, no JS)
     - Secondary caption: «التغيير سيُعرض على جميع الفواتير والشهادات بعد الحفظ»
   - **Card 3 — الإعدادات الإقليمية** (FR-031):
     - الدولة الأساسية: `<select>` defaulted to «المملكة العربية السعودية» (with options for مصر / الإمارات / الكويت / قطر / البحرين / عُمان)
     - العملة الأساسية: `<select>` defaulted to «الريال السعودي (SAR)»
     - **العملات الثانوية**: chip group with **«الجنيه المصري (EGP)»** chip carrying a small ✕ removal button (visual-only) + a «+ إضافة عملة» button (visual-only)
     - Caption below the secondary-currencies chip group (FR-032): «العملات الثانوية المسموح بها — لا يتم جمعها مع العملة الأساسية في أي ملخص»
     - اللغة الأساسية: `<select>` defaulted to «العربية»
     - اللغات الثانوية: chip group with **«English»** chip + «+ إضافة لغة» button
     - الاتجاه الافتراضي: radio group with two options «من اليمين إلى اليسار (RTL)» (selected) + «من اليسار إلى اليمين (LTR)»
   - **Card 4 — معلومات التواصل**:
     - رقم الهاتف الموحّد: `<input type="tel" value="+966 11 234 5678">`
     - البريد الإلكتروني الرسمي: `<input type="email" value="info@idarti-academy.sa">`
     - العنوان: `<textarea>الرياض، المملكة العربية السعودية</textarea>`
     - الموقع الإلكتروني: `<input type="url" value="https://idarti-academy.sa">`
   - **Card 5 — تذييل الفاتورة**:
     - `<textarea rows="4">شكراً لاختياركم أكاديمية إدارتي. للاستفسار: info@idarti-academy.sa أو هاتف +966 11 234 5678. الرقم الضريبي: 312345678900003</textarea>`
     - Caption: «النص الذي يظهر في أسفل كل فاتورة مُصدَرة من المنصة»
   - **Card 6 — إعدادات الشهادات**:
     - اسم جهة الإصدار: `<input type="text" value="أكاديمية إدارتي للتعليم">`
     - توقيع المدير العام: visual placeholder image + file input «رفع توقيع جديد»
     - الختم الرسمي: visual placeholder image + file input «رفع ختم جديد»
     - Caption: «التوقيع والختم سيظهران على جميع الشهادات المُصدَرة بعد الحفظ»
   - **Card 7 — حفظ التغييرات** (FR-033, sticky footer): primary CTA «حفظ جميع التغييرات» (success-tone, full-width on mobile / right-aligned on desktop, visual-only `<button type="button">`) + secondary CTA «إلغاء التعديلات» (neutral, links back to admin dashboard) + sibling caption below the buttons «آخر حفظ — 2026-05-09 14:22 — بواسطة سارة محمد عبدالله»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#6) | Page exists at `pages/admin/platform-settings.html` |
| FR-030 | 7 configuration cards in this exact order |
| FR-031 | Default values: KSA / SAR / EGP chip / Arabic / English chip / RTL |
| FR-032 | «العملات الثانوية المسموح بها — لا يتم جمعها مع العملة الأساسية في أي ملخص» caption |
| FR-033 | Save button + «آخر حفظ» actor caption below |
| FR-067 | Zero `href="#"` |
| FR-068 | Zero new JS — dropdowns reuse existing handler |

## Constraints

- All file inputs are visual-only — no `<form>` action, no real upload handler.
- The «حفظ» button is `<button type="button">` per Constitution V (visual-only).
- The EGP chip in Card 3 secondary-currencies group MUST be present (SC-009).
- The multi-currency-never-summed caption MUST appear verbatim (SC-009).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry: «إعدادات المنصة» (literal — this is the section parent).
