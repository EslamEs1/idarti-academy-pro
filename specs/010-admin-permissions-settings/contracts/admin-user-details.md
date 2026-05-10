# Contract: `pages/admin/user-details.html`

**Role**: Admin | **Active sidebar entry**: «الأدوار والصلاحيات» (parent — deep-read pattern) | **Anchor entity**: SARA.M (USR-2024-0007 / Finance Manager) per data-model.md E3 — the dual-lens demo user

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Breadcrumb**: «الأدوار والصلاحيات» → «المستخدمون» → «سارة محمد عبدالله»
3. **Page header bar** — title «سارة محمد عبدالله» (Arabic) + English subtitle «Sara Mohammed Abdullah» + role chip «مديرة المالية» (link to `role-details.html`) + status badge «نشط ✓ موثّق» + page-end CTAs (kept minimal — header carries no destructive actions; those live in the action bar at bottom)
4. **Two-column layout** (desktop): main column (start, ~65% width) + side rail (end, ~35% width). Stacks on mobile.
5. **Main column** (top → bottom):
   - **Profile card** (FR-023):
     - Avatar circle (sample image or initials «س.م» on a primary-tone background)
     - Full name «سارة محمد عبدالله» — large heading
     - English transliteration «Sara Mohammed Abdullah» — muted subhead
     - Email row: «البريد الإلكتروني: sara.m@idarti-academy.sa»
     - Phone row: «الهاتف: +966 50 *** 0007» (masked per data-model.md D13)
     - Role chip clickable to `role-details.html`
     - Account-creation row: «أُنشئ الحساب: 2024-09-15»
   - **Linked-account card** (FR-024): empty-state pattern. Caption «الحساب المرتبط» + body copy «لا يوجد حساب مرتبط — هذا حساب إداري بحت» + muted icon (link-broken)
   - **Permissions-summary mini-matrix card** (FR-025): heading «ملخّص الصلاحيات الفعّالة» + sub-caption «الوحدات المالية الست — مسموح كامل» + the **6 × 7 = 42-cell mini-matrix** wrapped in `<!-- MINI_MATRIX_START -->` / `<!-- MINI_MATRIX_END -->` HTML comments for SC-005 byte-identity diff against role-details.html.
     - Rows (in this exact order — must be byte-identical to role-details.html rows 11-16): المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم
     - Columns: عرض / إنشاء / تعديل / حذف / اعتماد / تصدير / وصول مالي
     - All 42 cells = ✓ مسموح (success-green check + aria-label)
   - **Activity-preview list card** (FR-027): heading «آخر النشاطات» + 5-item vertical list. Each item: action verb + module + timestamp + masked IP. Items (sourced from audit-log.html for SC-013 cross-page consistency):
     - 2026-05-10 09:15 — «أنشأت تعديل يدوي -80.00 ريال على STL-2026-04-TCH-0042» — مالية المعلم — IP `94.***.***.118`
     - 2026-05-09 14:22 — «حدّثت إعدادات المنصة — حقل تذييل الفاتورة» — إعدادات المنصة — IP `94.***.***.118`
     - 2026-05-09 11:35 — «أنشأت دفعة يدوية بمبلغ 200.00 ريال على INV-2026-0231» — المدفوعات — IP `94.***.***.118`
     - 2026-05-08 16:20 — «سجّلت دفعة على STL-2026-04-TCH-0067 (الأستاذ خالد) بمبلغ 5,500.00 ريال» — مالية المعلم — IP `94.***.***.118`
     - 2026-05-05 22:05 — «صدّرت تقرير شهر أبريل (PDF) — المرسل إليه ولي أمر عبد الرحمن مؤمن» — التقارير — IP `94.***.***.118`
   - Cross-link CTA «عرض السجل الكامل» → `audit-log.html?user=USR-2024-0007` (the link includes a query param for visual semantics; the audit-log.html page is static so the param is decorative)
6. **Side rail** (top → bottom):
   - **Account-status card** (FR-026):
     - الحالة: نشط ✓ + موثّق ✓ (success-green badges)
     - آخر تسجيل دخول: 2026-05-10 09:12
     - عنوان IP: `94.***.***.118`
     - الجلسات النشطة: 2 جلستان نشطتان
     - المصادقة الثنائية: مفعّلة (تطبيق المصادقة)
     - قوة كلمة المرور: قوية (success-green progress bar)
   - **Action bar card** (FR-028): heading «إجراءات إدارية» + 3 stacked buttons:
     - «تعطيل الحساب» (danger-tone outline + power-off icon) — `<button type="button" data-modal-open="modal-disable-account">`
     - «إعادة تعيين كلمة المرور» (warning-tone outline + key icon) — `<button type="button" data-modal-open="modal-reset-password">`
     - «إنهاء جميع الجلسات» (neutral outline + log-out icon) — `<button type="button" data-modal-open="modal-end-sessions">`
   - **Linked-staff caption** (non-link static text per FR-067): «هذه الحساب مرتبط بسجل الموظفين المعتمد. لتعديل المعلومات الأساسية، يُرجى التواصل مع المدير العام.»

7. **Three sanctioned-modal blocks** (FR-028 + FR-029) — rendered inline at the end of `<body>` before `<script src="../../assets/js/main.js">`. Each is a `<div role="dialog" class="hidden" id="modal-{name}">` containing:
   - **#modal-disable-account** (Q3 D7):
     - Title: «تأكيد تعطيل الحساب»
     - Body: «سيتم تعطيل وصول سارة محمد عبدالله (موظفة المالية) إلى المنصة فوراً. لن تتمكّن من تسجيل الدخول حتى يتم إعادة تفعيل الحساب من قبل المدير العام.»
     - Secondary caption: «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً»
     - Buttons: «تأكيد التعطيل» (danger-tone primary) + «إلغاء» (neutral secondary, `data-modal-close`)
   - **#modal-reset-password** (Q3 D7):
     - Title: «تأكيد إعادة تعيين كلمة المرور»
     - Body: «سيتم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني sara.m@idarti-academy.sa. سيتم إنهاء جميع الجلسات النشطة بعد الإرسال.»
     - Secondary caption: «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً»
     - Buttons: «تأكيد الإرسال» (warning-tone primary) + «إلغاء» (neutral secondary, `data-modal-close`)
   - **#modal-end-sessions** (Q3 D7):
     - Title: «تأكيد إنهاء جميع الجلسات»
     - Body: «سيتم تسجيل خروج سارة محمد عبدالله من جميع الأجهزة (2 جلسات نشطة حالياً). يجب على المستخدمة تسجيل الدخول مجدداً.»
     - Secondary caption: «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً»
     - Buttons: «تأكيد الإنهاء» (neutral primary) + «إلغاء» (neutral secondary, `data-modal-close`)

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#5) | Page exists at `pages/admin/user-details.html` |
| FR-023 | Profile card |
| FR-024 | Linked-account card with empty-state «لا يوجد حساب مرتبط — هذا حساب إداري بحت» |
| FR-025 | 6×7 = 42-cell mini-matrix wrapped in HTML comment markers (SC-005) |
| FR-026 | Account-status card with 6 fields |
| FR-027 | 5-event activity preview list |
| FR-028 | 3 sanctioned-modal trigger buttons (Q3) |
| FR-029 | 3 modal bodies with «هذا عرض مرئي فقط» secondary caption |
| FR-067 | Zero `href="#"` |
| FR-068 | Reuses existing `data-modal-open` / `data-modal-close` pattern |

## Constraints

- The mini-matrix block MUST be byte-identical to role-details.html's `<!-- MATRIX_ROWS_11_16_START -->` block (SC-005 `diff` test).
- Exactly **3** `data-modal-open=` triggers (SC-012).
- Exactly **3** `<div role="dialog" class="hidden">` modal blocks each carrying «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً» (SC-012).
- IP / phone / email masking conventions per data-model.md D13.
- At least 2 of the 5 activity-preview events match audit-log.html identifiers (SC-013): event 1 (STL-2026-04-TCH-0042 manual adjustment) + event 17 (RPT-2026-04-Q03-007 export) + event 13 (pricing-rule update on 2026-05-07 17:00 — but this is one of the 5 here too) + event 7 (INV-2026-0231 manual payment) + event 9 (STL-2026-04-TCH-0067 paid).
- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry: «الأدوار والصلاحيات» (parent — deep-read pattern).
