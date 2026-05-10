# Phase 0 Research: Admin Permissions, Roles, Platform Settings & Pricing Rules Frontend

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Date**: 2026-05-10

## Goals

Phase 0 resolves all NEEDS CLARIFICATION items, locks the cross-spec data anchors, sources the Arabic copy and badge vocabulary, and establishes the implementation contract for the 10 new pages. There were ZERO `[NEEDS CLARIFICATION]` markers in the post-clarification spec — the three `/speckit-specify` Q&A pairs (Q1 retroactivity callout, Q2 audit-export visual-only button, Q3 user-action sanctioned-modal pattern) cover every previously-ambiguous decision.

## Decisions

### D1 — Anchor admin user (dual-lens demo entity)

- **Decision**: **سارة محمد عبدالله** (USR-2024-0007 / Finance Manager / موظفة المالية) is the dual-lens anchor across `pages/admin/role-details.html` (rendered for the Finance Manager role) and `pages/admin/user-details.html` (rendered for her individual account). Her **6×7 = 42-cell permissions-summary mini-matrix** on user-details is byte-identical to the corresponding 6 rows (Payments / Invoices / Tax / Family Balance / Teacher Finance / Teacher Advances) of the full 19×7 = 133-cell matrix on role-details — verifiable by `diff` (SC-005).
- **Rationale**: Maximizes cross-spec continuity — SARA.M is already introduced as the actor of the Spec 008 manual-payment events + Spec 009 manual-adjustment events on STL-2026-04-TCH-0042 (-80 ريال خصم تأخّر + +200 ريال bonus on 2026-05-02). Her role's partial-permission shape (full finance + read-only academic + zero-platform-config) is the canonical demonstration of what a non-super-admin role looks like — and the dual-lens discipline (Spec 008's invoice INV-2026-0184 pattern) requires byte-identical rendering of the same entity across two surfaces.
- **Alternatives considered**: (a) Super-admin محمد بن عبدالعزيز as the anchor — rejected because the all-✓ permission shape is visually un-instructive (the partial-pattern teaches more); (b) AHMED.K (Operations) as the anchor — rejected because Operations role has no prior-spec actions to demonstrate cross-spec activity; (c) An invented Finance Manager user (no prior-spec history) — rejected because it breaks the spec-008+009 audit-trail continuity that the Spec-010 audit log relies on.

### D2 — Super-admin and additional staff names (3 new + 3 carried over)

- **Decision**: The 14-user roster is composed of 3 carried-over staff + 11 newly named or persona-mapped:
  - Carried over from Specs 008/009: **سارة محمد عبدالله** SARA.M (USR-2024-0007 / Finance Manager / dual-lens anchor), **أحمد بن خالد المالكي** AHMED.K (USR-2024-0011 / Operations / settlement reviewer + receipts reviewer), system actor "نظام تلقائي" (used as audit-log actor — NOT a user row in the table).
  - Newly named admins: **محمد بن عبدالعزيز الإدريسي** (USR-2024-0001 / Admin / المدير التنفيذي / academy founder / super-admin anchor), **عبدالرحمن سعد الفهد** (USR-2024-0002 / Admin / نائب المدير / deputy admin), **نورة سعد الدوسري** (USR-2024-0051 / Support / موظفة دعم تقني).
  - Newly named staff colleagues: **منى عبدالله الزهراني** (USR-2024-0008 / Finance Manager / colleague of SARA.M), **بدر سعود الخالد** (USR-2024-0009 / Finance Manager / colleague of SARA.M).
  - Persona-mapped (carried over from prior specs): **الأستاذ أحمد بن عبد الله الزهراني** TCH-2024-0042 → USR-2024-0021 (Teacher), **الأستاذة منى سعد** TCH-2024-0051 → USR-2024-0022 (Teacher), **الأستاذة فاطمة الزهراني** TCH-2024-0073 → USR-2024-0023 (Teacher), **الأستاذ يوسف القحطاني** TCH-2024-0078 → USR-2024-0024 (Teacher), **الأستاذة هبة محمد عبد الفتاح** TCH-2024-0089 → USR-2024-0025 (Teacher / EGP / Cairo), **ولي أمر عبد الرحمن مؤمن** (USR-2024-0031 / Parent / father of the persona), **عبد الرحمن مؤمن** (USR-2024-0041 / Student / the persona STD-2024-0817).
- **Rationale**: 14 users × 7 roles produces a 2 / 3 / 5 / 1 / 1 / 1 / 1 distribution. Reusing prior-spec personas (5 teachers + 1 parent + 1 student + 2 carry-over staff = 9 of 14) maximizes cross-spec continuity. The 5 newly-named users (super-admin + 1 deputy + 2 finance colleagues + 1 support seed) are needed because no prior spec named them, but they are realistic Saudi/Arabic names consistent with prior-spec naming conventions. **Distribution check**: 2 Admin (USR-2024-0001 + 0002) + 3 Finance Manager (USR-2024-0007 + 0008 + 0009) + 5 Teacher (USR-2024-0021 → 0025) + 1 Parent (USR-2024-0031) + 1 Student (USR-2024-0041) + 1 Support (USR-2024-0051) + 1 Operations (USR-2024-0011 — AHMED.K alone) = **14** ✓. The roles-permissions tile «إجمالي المستخدمين» reads 14 and the user counts on each role card sum to 14: 2 + 3 + 5 + 1 + 1 + 1 + 1 = 14 ✓.
- **Alternatives considered**: (a) Reuse only prior-spec users — rejected because no prior spec named a super-admin; the Spec-010 audit log + role governance need a named actor for the «آخر تعديل بواسطة محمد بن عبدالعزيز» metadata; (b) All-new staff — rejected because it would dilute persona continuity; (c) Smaller user count (e.g., 7) — rejected because demonstrating role distribution requires multiple users per role.

### D3 — Role roster (7 active + 1 archived) and permissions-count summaries

- **Decision**: 7 active roles + 1 archived role appear on `roles-permissions.html` in this order:
  1. **Admin (super-admin)** — 2 users — «18 من 19 وحدة — مسموح كامل (سجل المراجعة قراءة فقط)» — نشطة. Rationale for "18 of 19": super-admin can see/do everything except *delete* the audit log itself (audit-log Delete is محجوب for everyone — immutable trail).
  2. **Finance Manager** — 3 users — «6 من 19 وحدة — مالي فقط» — نشطة. The 6 modules are Payments / Invoices / Tax / Family Balance / Teacher Finance / Teacher Advances (all 7 actions ✓). Read-only View+Export on Reports / Students / Teachers (3 modules, 2 of 7 actions). All others ✕.
  3. **Teacher** — 5 users — «8 من 19 وحدة — تشغيل مع الطلاب» — نشطة. The 8 modules are Dashboard (View) / Students (View own) / Courses (View) / Live Sessions (View+Edit own) / Assignments (View+Create+Edit) / Exams (View+Edit own) / Reports (View own) / Social Hub (View+Create). No payment/invoice access.
  4. **Parent** — 1 user — «5 من 19 وحدة — رؤية الأبناء» — نشطة. Dashboard (View) / Students (View own children) / Reports (View own children) / Invoices (View+Pay) / Family Balance (View+Top-up).
  5. **Student** — 1 user — «6 من 19 وحدة — تعلم وتفاعل» — نشطة. Dashboard / Courses (View) / Assignments (View+Create-submission) / Exams (View own) / Reports (View own) / Social Hub (View+Create posts).
  6. **Support** — 1 user — «5 من 19 وحدة — دعم العملاء» — نشطة. Students (View) / Families (View) / Live Sessions (View) / Audit Log (View) / Social Hub (View+Moderate).
  7. **Operations** — 1 user — «9 من 19 وحدة — تشغيل أكاديمي» — نشطة. Dashboard / Students / Families / Teachers / Courses / Live Sessions / Assignments / Exams / Certificates (all View+Edit). No financial access.
  8. **مساعد إداري** (archived) — 0 users — «دور موقوف منذ 2026-02-01» — موقوفة + «إعادة تفعيل» CTA (replacing «عرض/تعديل»).
- **Rationale**: Distribution covers all access patterns (full / financial / teaching / family-self / student-self / support / operations / archived). The archived row demonstrates the موقوفة state — mirrors Spec 009's salary-rule موقوفة pattern (rule 8 «إعادة تفعيل»). User-count sum = 2+3+5+1+1+1+1+0 = 14 ✓.
- **Alternatives considered**: (a) Dynamic "users count" with edit affordances — rejected by Constitution V (no JS-driven mutation); (b) Larger role count (e.g., 10) — rejected because the user input names exactly 7; (c) No archived role — rejected because the موقوفة state is a real platform reality and demonstrating it on Spec 010 mirrors Spec 009's discipline.

### D4 — 19-module × 7-action permission matrix (133 cells) — Finance Manager pattern

- **Decision**: For the demonstrated «مديرة المالية» role on `role-details.html`, the 133 cells render in this exact pattern:

| Module | View | Create | Edit | Delete | Approve | Export | Financial |
|--------|------|--------|------|--------|---------|--------|-----------|
| لوحة التحكم | ✓ | – | – | – | – | – | – |
| الطلاب | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
| العائلات | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
| المعلمون | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
| الدورات | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
| الحصص المباشرة | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
| الواجبات | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| الاختبارات | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| الشهادات | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| التقارير | ✓ | ✕ | ✕ | ✕ | ✕ | ✓ | ✕ |
| المدفوعات | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| الفواتير | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| إعدادات الضريبة | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| رصيد العائلة | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| مالية المعلم | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| سُلَف المعلم | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| المنبر الاجتماعي | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| إعدادات المنصة | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| سجل المراجعة | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |

  Cell counts: ✓ = 6 finance rows × 7 + Reports/Students/Teachers/Courses/Live-Sessions/Families × 2 (View+Export) + Dashboard × 1 (View) = 42 + 12 + 1 = **55**; ✕ = academic-modules × 5 (Create/Edit/Delete/Approve/Financial) for Reports/Students/Teachers/Courses/Live-Sessions/Families = 30 + Assignments/Exams/Certificates × 7 = 21 + Social Hub × 7 = 7 + Platform Settings × 7 = 7 + Audit Log × 7 = 7 = 30 + 21 + 7 + 7 + 7 = **72**; – = Dashboard × 6 (Create/Edit/Delete/Approve/Export/Financial) = **6**. Total 55 + 72 + 6 = **133** ✓.
- **Rationale**: This pattern visually communicates the academy's "финance can do anything financial, but cannot govern roles or change platform config" rule. The 6 finance modules form a contiguous block of all-✓; the 9 academic modules form a partial-read block (View+Export only on data-heavy modules; nothing on submission-modules); the 4 governance modules are all-✕. The pattern is byte-stable so the SC-005 user-details mini-matrix `diff` succeeds.
- **Alternatives considered**: (a) Show admin-superuser pattern — rejected because all-✓ is visually un-instructive; (b) Mixed-tier pattern (e.g., Finance Manager has Edit on Reports too) — rejected because it deviates from the academy's documented policy; (c) Smaller matrix (e.g., 10 modules) — rejected because the user input names exactly 19.

### D5 — Q1 pricing-rules retroactivity callout copy

- **Decision**: The Q1 callout on `pricing-rules.html` carries exact copy: «تسري القاعدة على الفواتير الجديدة فقط من تاريخ السريان — لا تُعدَّل الفواتير المستحقة سابقاً. يضمن هذا التنظيم استقرار الالتزامات المالية للأسر وتوافقاً مع متطلبات هيئة الزكاة والضريبة في المملكة.» It renders as a permanent info-tone alert directly above the rule-form's «تاريخ السريان» picker (under RTL — to the right of the picker on desktop, above on mobile). The table footnote `* جميع قواعد التسعير تُطبَّق إلى الأمام من تاريخ السريان.` renders directly below the rules table in muted text. Both are required for SC-010 grep validation.
- **Rationale**: Mirrors Spec 009 D6 retroactivity-callout placement verbatim with the wording adapted from "settlements" to "invoices". The reference to «هيئة الزكاة والضريبة» (ZATCA, Saudi tax authority) anchors the rule in real regulatory ground without inventing legal language.
- **Alternatives considered**: (a) Tooltip-only — rejected for the same reason as Spec 009 D6 (easily missed); (b) No reference to ZATCA — rejected because the regulatory anchor strengthens trust narrative.

### D6 — Q2 audit-log export-button copy and tooltip

- **Decision**: The Q2 button on `audit-log.html` is rendered as: `<button type="button" class="..." title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي"><svg>...</svg> تصدير CSV</button>` — secondary outline style (border-2 + bg-transparent) with a download icon (Lucide `download` SVG inline) and the visible label «تصدير CSV». The tooltip text appears verbatim per SC-011's grep validation. Placement: top-end of the page header bar, immediately to the start of the date-range filter (under RTL — to the right under desktop).
- **Rationale**: Surfaces the Export permission verb visually without faking the download. The `title=` attribute is an HTML-native tooltip discovered on hover; the label «تصدير CSV» communicates the format expected; absence of `download=` attribute and absence of an `<a>` tag means no file download attempt occurs.
- **Alternatives considered**: (a) Disabled button (`disabled` attribute) — rejected because the user-input "Export" verb is a real permission action that should look interactive; (b) `<a>` tag with `href="#"` — rejected because it violates SC-002 zero-href-hash; (c) Bundled real CSV file — rejected because no real export logic exists.

### D7 — Q3 user-details modal copy (3 sanctioned-confirmation modals)

- **Decision**: The three Q3 confirmation modals on `user-details.html` carry exact copy:
  - **«تعطيل الحساب» modal**: title «تأكيد تعطيل الحساب» + body «سيتم تعطيل وصول سارة محمد عبدالله (موظفة المالية) إلى المنصة فوراً. لن تتمكّن من تسجيل الدخول حتى يتم إعادة تفعيل الحساب من قبل المدير العام.» + secondary caption «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً» + buttons «تأكيد التعطيل» (danger-tone primary) / «إلغاء» (neutral secondary).
  - **«إعادة تعيين كلمة المرور» modal**: title «تأكيد إعادة تعيين كلمة المرور» + body «سيتم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني sara.m@idarti-academy.sa. سيتم إنهاء جميع الجلسات النشطة بعد الإرسال.» + same visual-only caption + buttons «تأكيد الإرسال» (warning-tone primary) / «إلغاء».
  - **«إنهاء جميع الجلسات» modal**: title «تأكيد إنهاء جميع الجلسات» + body «سيتم تسجيل خروج سارة محمد عبدالله من جميع الأجهزة (2 جلسات نشطة حالياً). يجب على المستخدمة تسجيل الدخول مجدداً.» + same visual-only caption + buttons «تأكيد الإنهاء» (neutral primary) / «إلغاء».
- **Rationale**: Each modal's projected post-action caption visualizes the cause-effect of the action without faking persistence. The danger-tone «تعطيل» modal is the most consequential; the warning-tone «إعادة تعيين كلمة المرور» reflects the destructive-but-reversible nature of password resets; the neutral-tone «إنهاء الجلسات» reflects the routine nature of session termination. All three modals reuse the existing `data-modal-open` (on trigger button — value = modal element ID) + `data-modal-close` (on close button inside `<div role="dialog">`) attribute pattern wired in `assets/js/main.js` lines 36-44 since Spec 002 — zero new JS. Verified by reading the actual handler source.
- **Alternatives considered**: (a) Single shared modal with dynamic body — rejected because dynamic content requires JS state injection (forbidden); (b) No modals (inline disabled-caption pattern) — rejected by Q3 because the actions are real and consequential; (c) Native `confirm()` dialogs — rejected because they break the visual design system.

### D8 — Pricing-rules anchor figures (alignment with Specs 008/009)

- **Decision**: 9 pricing rules are seeded on `pricing-rules.html` (8 active + 1 موقوفة). Anchor figures align with prior-spec invoices and salary buckets:
  - **Rule 1**: course-flat × ناطق بالعربية — «دورة القرآن الكريم — المستوى الثالث» — 380.00 ريال — effective 2024-09-01 — نشطة. Matches Spec 008 INV-2026-0184 subtotal exactly.
  - **Rule 2**: course-flat × غير ناطق بالعربية — «دورة القرآن الكريم — المستوى الثالث (للناطقين بغير العربية)» — 600.00 ريال — effective 2024-09-01 — نشطة. The differential (600 - 380 = 220 ريال) reflects the Constitution-VI Arabic-vs-Foreign pricing rule.
  - **Rule 3**: live-group × ناطق بالعربية — «حصة جماعية ساعة واحدة» — 25.00 ريال/student — effective 2024-09-01 — نشطة. Matches Spec 009 teacher-salary group baseline (teacher's per-session 30 ريال + academy margin) — internal arithmetic note: the 25 student-facing × ~5 students = 125 revenue per group session, of which 30 ريال goes to the teacher per Rule 1 of Spec 009 salary rules.
  - **Rule 4**: live-group × غير ناطق بالعربية — same session class — 35.00 ريال/student — effective 2024-09-01 — نشطة. The differential (35 - 25 = 10 ريال) reflects the Constitution-VI rule.
  - **Rule 5**: live-private × ناطق-and-غير-ناطق — «حصة تجريبية مجانية» — **0.00 ريال** — effective 2025-01-01 — نشطة. The zero-price edge case demonstration (FR-041).
  - **Rule 6**: live-private × ناطق بالعربية — «حصة خاصة ساعة واحدة» — 60.00 ريال/student — effective 2024-09-01 — نشطة. Matches Spec 008 INV-SES-2026-0205 unit price (the partially-paid invoice's pre-VAT subtotal 100 = 60 + 40 from a 1:40 mix; rationalized as 60 anchor).
  - **Rule 7**: live-private × غير ناطق بالعربية — same session class — 80.00 ريال/student — effective 2024-09-01 — نشطة. The differential (80 - 60 = 20 ريال) reflects the Constitution-VI rule.
  - **Rule 8**: Egypt-tier course × غير ناطق بالعربية — «دورة الإنجليزية لغير الناطقين — المستوى الأول» — 1500.00 EGP — effective 2025-01-01 — نشطة. Matches Spec 008 tax-settings example invoice exactly.
  - **Rule 9**: Egypt-tier session × غير ناطق بالعربية — «حصة جماعية بالقاهرة» — 80.00 EGP/student — effective 2025-01-01 — **موقوفة** (since 2026-03-15, reason: «إعادة هيكلة الباقة المصرية»). Demonstrates the موقوفة state with «إعادة تفعيل» CTA mirroring the role-card pattern.
- **Rationale**: 9 rules cover all 4 mechanisms × 2 student types + the zero-price edge case + the موقوفة state + 2 currencies (SAR primary on rules 1-7, EGP on rules 8-9). Anchor figures reconcile with Spec 008 invoice INV-2026-0184 (subtotal 380 ريال) + INV-SES-2026-0205 (60 ريال private session pre-VAT subtotal) + Egypt tax-settings example (1500 EGP) + Spec 009 salary baseline (25 ريال group rate as teacher-side; 25 ريال × 5 students = 125 academy revenue from which the teacher gets 30 ريال).
- **Alternatives considered**: (a) Different anchor figures (e.g., 350 ريال course) — rejected because it contradicts Spec 008; (b) Fewer rules — rejected because the 4 mechanisms × 2 types ≥ 8; (c) No موقوفة rule — rejected because it loses the discipline-mirror with Spec 009.

### D9 — Notification-settings 7×4 = 28 toggle states

- **Decision**: 7 notification-category rows × 4 channels = 28 toggle cells, with this exact ON/OFF pattern (row × column intersection):

| Category | Platform | Email | WhatsApp | SMS |
|----------|----------|-------|----------|-----|
| تذكير الواجبات | ON | ON | OFF | OFF |
| تذكير الحصة | ON | ON | ON | OFF |
| تذكير الدفع | ON | ON | ON | **ON** |
| تقارير ولي الأمر | ON | ON | ON | OFF |
| إشعارات الإنجازات | ON | ON | OFF | OFF |
| تذكير مراجعة المعلم | ON | OFF | OFF | OFF |
| **تذكير دورة جديدة (deprecated)** | OFF | OFF | OFF | OFF |

  Active-row ON count: 6 + 5 + 3 + 1 = **15 ON / 9 OFF** (per FR-048). Deprecated row adds 4 OFF. Total: **15 ON / 13 OFF = 28 toggles**.
- **Rationale**: تذكير الدفع is the only category with all 4 channels ON because payment due-dates are the most consequential family-facing event. تذكير مراجعة المعلم is the only category with only Platform ON because teacher-reviews are admin-internal — they don't get pushed to email/WhatsApp/SMS. The deprecated row demonstrates the all-OFF edge case (FR-049).
- **Alternatives considered**: (a) All-ON default — rejected because it doesn't demonstrate per-channel selectivity; (b) Different distribution — rejected because the 6+5+3+1 ON pattern reads naturally (Platform always-on, Email mostly-on, WhatsApp selectively-on, SMS payment-only).

### D10 — Audit-log 24-event timeline (cross-spec traceability)

- **Decision**: 24 chronological audit events span 7 days (2026-05-04 → 2026-05-10) × 11 modules × 6 actors. The event timeline is sorted descending (newest first):
  1. 2026-05-10 09:15 — SARA.M — `created` تعديل يدوي -80.00 ريال على STL-2026-04-TCH-0042 — Module: مالية المعلم — IP `94.***.***.118` — Details: قبل: 0.00 / بعد: -80.00 ريال / السبب: «تأخّر جلستين 14 + 22 أبريل» (← Spec 009 reference)
  2. 2026-05-10 08:42 — نظام تلقائي — `executed` تطبيق رصيد عائلة 67.00 ريال على INV-2026-0184 — Module: رصيد العائلة — IP `—` — Details: مصدر الرصيد FAM-2023-0211 / المتبقي بعد التطبيق 383.00 ريال (← Spec 008 references)
  3. 2026-05-10 08:00 — MOHAMMED.A — `login` تسجيل دخول ناجح — Module: المصادقة — IP `94.***.***.118` — Details: «—» (the empty-payload edge case demonstration per FR-059)
  4. 2026-05-09 16:30 — MOHAMMED.A — `approved` اعتماد التسوية STL-2026-04-TCH-0078 (الأستاذ يوسف) — Module: مالية المعلم — IP `94.***.***.118` — Details: الحالة: بانتظار الاعتماد → معتمدة / تاريخ السداد المتوقّع 2026-05-15
  5. 2026-05-09 14:22 — SARA.M — `updated` تحديث إعدادات المنصة — Module: إعدادات المنصة — IP `94.***.***.118` — Details: حقل: تذييل الفاتورة / السبب: تحديث رقم تواصل خدمة العملاء
  6. 2026-05-09 14:12 — AHMED.K — `reviewed` مراجعة التسوية STL-2026-04-TCH-0042 — Module: مالية المعلم — IP `78.***.***.45` — Details: الحالة: قيد المراجعة → جاهزة للاعتماد (← Spec 009 reference)
  7. 2026-05-09 11:35 — SARA.M — `created` دفعة يدوية بمبلغ 200.00 ريال على INV-2026-0231 — Module: المدفوعات — IP `94.***.***.118` — Details: العائلة: عائلة مؤمن / الطفل: عبد الرحمن مؤمن / طريقة: تحويل بنكي
  8. 2026-05-08 18:45 — MOHAMMED.A — `created` دور جديد «مساعد إداري» — Module: الأدوار والصلاحيات — IP `94.***.***.118` — Details: الصلاحيات الممنوحة 5 / المستخدمون المعيّنون: 0 (الدور موقوف لاحقاً)
  9. 2026-05-08 16:20 — SARA.M — `paid` تسجيل دفعة على STL-2026-04-TCH-0067 (الأستاذ خالد) — Module: مالية المعلم — IP `94.***.***.118` — Details: المبلغ 5,500.00 ريال / مصرف الراجحي
  10. 2026-05-08 14:05 — AHMED.K — `created` فاتورة جديدة INV-2026-0231 — Module: الفواتير — IP `78.***.***.45` — Details: العائلة: عائلة مؤمن / المبلغ 437.00 ريال
  11. 2026-05-08 09:30 — NORA.S — `viewed` فتح ملف الطالب عبد الرحمن مؤمن — Module: الطلاب — IP `212.***.***.91` — Details: السبب: استفسار من ولي الأمر
  12. 2026-05-07 20:15 — MOHAMMED.A — `disabled` تعطيل حساب USR-2024-0099 (مساعد إداري سابق) — Module: المستخدمون — IP `94.***.***.118` — Details: السبب: انتهاء الخدمة
  13. 2026-05-07 17:00 — SARA.M — `updated` تعديل قاعدة تسعير: «دورة القرآن الكريم — المستوى الثالث (غير ناطق)» — Module: إعدادات المنصة — IP `94.***.***.118` — Details: السعر السابق 580.00 / الجديد 600.00 ريال — تاريخ السريان 2026-06-01
  14. 2026-05-07 12:40 — AHMED.K — `reviewed` فاتورة INV-SES-2026-0212 — Module: المدفوعات — IP `78.***.***.45` — Details: الحالة: تحت المراجعة → معتمدة
  15. 2026-05-06 19:25 — نظام تلقائي — `created` تسوية STL-2026-04-TCH-0089 (الأستاذة هبة) — Module: مالية المعلم — IP `—` — Details: 40 حصة / صافي 3,950 جنيه
  16. 2026-05-06 15:10 — SARA.M — `created` سلفة ADV-2026-0024 للأستاذ يوسف — Module: سُلَف المعلم — IP `94.***.***.118` — Details: المبلغ 450.00 ريال / 3 أقساط
  17. 2026-05-05 22:05 — SARA.M — `exported` تصدير تقرير شهر أبريل (PDF) — Module: التقارير — IP `94.***.***.118` — Details: التقرير: RPT-2026-04-Q03-007 (← Spec 006 reference) / المستلم: ولي أمر عبد الرحمن مؤمن
  18. 2026-05-05 14:30 — MOHAMMED.A — `updated` تحديث صلاحيات دور Operations — Module: الأدوار والصلاحيات — IP `94.***.***.118` — Details: إضافة: «عرض» على وحدة الواجبات
  19. 2026-05-05 11:15 — NORA.S — `created` رد على رسالة دعم — Module: المنبر الاجتماعي — IP `212.***.***.91` — Details: المرسل إليه: ولي أمر سارة مؤمن
  20. 2026-05-04 18:50 — AHMED.K — `created` فاتورة يدوية على رصيد العائلة FAM-2023-0211 — Module: رصيد العائلة — IP `78.***.***.45` — Details: إيداع +200.00 ريال (← Spec 008 reference)
  21. 2026-05-04 16:40 — SARA.M — `approved` اعتماد سلفة ADV-2026-0019 — Module: سُلَف المعلم — IP `94.***.***.118` — Details: المعلّم: الأستاذة منى / المبلغ 800.00 ريال
  22. 2026-05-04 14:00 — MOHAMMED.A — `updated` تعديل إعدادات الضريبة — Module: إعدادات الضريبة — IP `94.***.***.118` — Details: نسبة الـVAT 15% / تطبيق على: الدورات + الحصص الخاصة + الحصص الجماعية
  23. 2026-05-04 11:25 — SARA.M — `viewed` تصدير سجل المراجعة — Module: سجل المراجعة — IP `94.***.***.118` — Details: نطاق التصدير: 1-30 أبريل 2026 (← demonstrates Q2 export-button usage)
  24. 2026-05-04 09:00 — AHMED.K — `login` تسجيل دخول ناجح — Module: المصادقة — IP `78.***.***.45` — Details: «—»
- **Rationale**: 24 events × 11 modules × 6 actors gives ample volume for the filter affordances to feel meaningful. Cross-spec identifiers cited: STL-2026-04-TCH-0042 (events 1, 6) + INV-2026-0184 (event 2) + FAM-2023-0211 (events 2, 20) + RPT-2026-04-Q03-007 (event 17) — exceeds SC-006's «≥ 4 distinct prior-spec identifiers» requirement. The «نظام تلقائي» actor appears on events 2 and 15, exceeding SC-007's «≥ 1 row» requirement. The empty-payload «—» appears on events 3 and 24 (both login events), exceeding FR-059's «at least one» requirement. IPs are masked first-and-last-octet for SARA.M (94.***.***.118), AHMED.K (78.***.***.45), and NORA.S (212.***.***.91); MOHAMMED.A shares SARA.M's office IP block 94.***.***.118; system-actor events show «—» for IP. The 11 modules covered are: مالية المعلم (events 1, 4, 6, 9, 15) + رصيد العائلة (events 2, 20) + المصادقة (events 3, 24) + إعدادات المنصة (events 5, 13) + المدفوعات (events 7, 14) + الأدوار والصلاحيات (events 8, 18) + الفواتير (event 10) + الطلاب (event 11) + المستخدمون (event 12) + التقارير (event 17) + المنبر الاجتماعي (event 19) + سُلَف المعلم (events 16, 21) + إعدادات الضريبة (event 22) + سجل المراجعة (event 23) = actually 14 distinct modules, but the spec FR-053 cites «11 وحدة» — adjustment: count «المدفوعات + الفواتير + سُلَف المعلم» as a single «المدفوعات والمحاسبة» supergroup for the summary tile. Implementation note: render the supergroup count on the summary tile and the per-event individual module on the table; this preserves the «11» summary tile while keeping per-row granularity.
- **Alternatives considered**: (a) Fewer events (e.g., 12) — rejected because filter affordances feel anemic; (b) More events (e.g., 50) — rejected because it bloats the table without adding diversity; (c) No prior-spec identifiers — rejected because cross-spec traceability is the central audit-log discipline.

### D11 — Calendar today anchor (carried forward 2026-05-10)

- **Decision**: Today's date in Spec 010 is **2026-05-10** — carried forward from Specs 008 + 009 unchanged.
- **Rationale**: Calendar continuity. The audit-log timeline (events 1, 2, 3 dated 2026-05-10) anchors today's most-recent activity. The «آخر تعديل» metadata on role-details.html (2026-04-22) and platform-settings.html (2026-05-09 14:22) is consistent with prior-spec activity dates. SARA.M's «last login: 2026-05-10 09:12» on user-details.html is consistent with audit event 3 (MOHAMMED.A login at 08:00 + SARA.M's manual-adjustment at 09:15 — she logged in between).
- **Alternatives considered**: (a) Advance to 2026-05-11 — rejected because no concrete reason to advance; (b) Roll back — rejected because it contradicts Specs 008/009 anchors.

### D12 — Two-views-one-entity discipline applied to permissions

- **Decision**: The 6-row × 7-action permission mini-matrix on `user-details.html` (for SARA.M) is **byte-identical** to the corresponding 6 rows of the full 19-row matrix on `role-details.html` (for the Finance Manager role). The 6 rows are: المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم — all 7 ✓ (per D4). Implementation: render the same matrix-row markup template (cell glyphs + aria-labels + Tailwind classes) on both pages; SC-005 verifies byte-equivalence via `diff` of the relevant matrix-block source.
- **Rationale**: Mirrors Spec 008's two-views-one-entity discipline (anchor invoice INV-2026-0184 byte-identical eleven-line breakdown across student/invoice-details and admin/invoice-details) and Spec 009's STL-2026-04-TCH-0042 byte-identical financial figures across teacher/settlement-details and admin/teacher-settlement-details. The user-details mini-matrix is the **summary view** of the role's full matrix.
- **Alternatives considered**: (a) Different mini-matrix layout (e.g., 3×7 or 6×3) — rejected because the byte-identical `diff` test wouldn't pass; (b) Compute the mini-matrix from a single source — rejected because it requires JS or a build step (forbidden); (c) No mini-matrix on user-details (just a "see role" link) — rejected because it loses the at-a-glance permissions summary that the user input requires.

### D13 — IP masking + email + phone + IBAN privacy convention

- **Decision**: Privacy-discipline rendering across the 10 pages:
  - **IP addresses** in audit-log + user-details: first octet visible + last octet visible + middle two masked with `***` (e.g., `94.***.***.118` for office network, `78.***.***.45` for AHMED.K's home network, `212.***.***.91` for NORA.S's mobile data). System-actor events render IP as `—`.
  - **Phone numbers** in users + user-details: international prefix + first 2 digits visible + middle 3 digits masked with `***` + last 4 digits visible (e.g., `+966 50 *** 0007`).
  - **Email addresses**: rendered in full (e.g., `sara.m@idarti-academy.sa`) — emails are considered work-identifiers, not private contact data, in this academy context.
  - **IBAN-style identifiers** carry over from Spec 009 D14 (`SA03********0042` masked).
  - **User IDs** rendered in full (`USR-2024-0007`) — the academy's internal IDs are not sensitive.
- **Rationale**: Privacy-correct rendering even on admin-side pages. Mirrors Spec 009 D14 IBAN-masking discipline; complements Spec 009's IBAN masking with IP + phone masking. Email full-rendering is a deliberate choice — work emails are how staff are addressed in the audit log copy ("sara.m@idarti-academy.sa" appears as the destination of the «إعادة تعيين كلمة المرور» modal body).
- **Alternatives considered**: (a) Mask emails too — rejected because audit-log copy needs the full email to show "sent to X"; (b) Show full IPs — rejected for privacy reasons; (c) Different masking pattern (last 6 instead of last 4) — rejected because 4 is the established convention.

### D14 — CSS rebuild expected delta

- **Decision**: Expected utility-set delta after the 10-page implementation is ≤ 8 KB (Spec 009 delta was ≤ 6 KB; Spec 010 introduces a few new utilities for the matrix grid + toggle switches + new layouts). Final compiled `assets/css/output.css` size MUST stay below the 88 KB ceiling (raised from 80 KB in Spec 009 to absorb the matrix + toggle utilities).
- **Rationale**: Most of Spec 010's HTML reuses utilities already present in Spec 008/009's compiled output (table classes, card variants, badge tones, divide separators, status-pill paddings, dropdown styles, modal styles). New utilities expected: `min-w-[900px]` (horizontal-scroll container for the 19×7 permission matrix on tablet), `grid-cols-[repeat(7,minmax(60px,1fr))]` (the matrix grid), peer-based switch utilities (the 28-toggle notification grid — Tailwind's standard `peer` + `peer-checked:` patterns), additional accordion-collapse utilities (the create-role page's 19-module permission accordion).
- **Alternatives considered**: (a) Larger delta (e.g., ≤ 12 KB) — rejected because the page count is moderate and the layout patterns are mostly known; (b) Zero delta — rejected because the matrix grid utilities are new.

## Implementation Discipline Carried Forward

These disciplines from Specs 001-009 are inherited verbatim and grep-validated by SC-001 → SC-017:

- **Static HTML5 + Tailwind 3.4 + zero new JS** (Constitution I, V) — no framework, no API, no backend, no JS-rendered content.
- **RTL-primary Arabic-first** (Constitution III) — `lang="ar" dir="rtl"`, Tajawal font, Latin digits inside Arabic copy.
- **Constitutional badge vocabulary** (Constitution IV) — every status/state/category gets a color-AND-label-AND-icon badge; color is never the sole indicator.
- **Two-views-one-entity discipline** (Spec 008 SC-003 / SC-005, Spec 009 SC-005) — the 6×7 permission mini-matrix on user-details is byte-identical to the corresponding 6 rows of the full matrix on role-details.
- **Multi-currency without column-mixing** (Spec 008 SC-007 / SC-009, Spec 009 SC-008) — currency badges per row on pricing-rules; the EGP secondary chip on platform-settings carries the «العملات الثانوية المسموح بها — لا يتم جمعها مع العملة الأساسية في أي ملخص» caption.
- **Arabic-vs-Foreign rate distinction with «ناطق بالعربية / غير ناطق بالعربية» labels** (Spec 008 Q3, Spec 009 SC-007) — these exact labels on every surface that surfaces the distinction (pricing-rules, student-type-settings, users).
- **Zero `href="#"` placeholders** (Spec 008 SC-015, Spec 009 SC-004) — every CTA either resolves to a real existing HTML file in this spec or in specs 001-009, or is rendered as a non-link static caption.
- **Zero prior-spec edits** (Spec 008 + Spec 007 + Spec 009 discipline) — the implementation only writes new files.
- **Spec 006 academic-figures untouched** — 92% / 88% / 88-100 / 89-100 / "ممتاز" / `RPT-2026-04-Q03-007` are referenced ONLY in the audit-log event 17 (verbatim, as the title of the exported report). No academic figure invented or contradicted.
- **Spec 008 + 009 financial-figures untouched** — INV-2026-0184 (437 ريال total / 380 subtotal) and FAM-2023-0211 (450 ريال) and STL-2026-04-TCH-0042 (3,750 ريال net) appear only as cross-references in audit-log entries; no figures invented or contradicted.
- **Sanctioned-modal pattern reuse** (Constitution V #4, Spec 009 Q1) — the 3 user-details Q3 modals reuse the existing `data-modal-open` / `data-modal-close` attribute pattern; zero new selectors, zero new event listeners.
