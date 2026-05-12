# Tasks: Admin Permissions, Roles, Platform Settings & Pricing Rules Frontend

**Input**: Design documents from `/specs/010-admin-permissions-settings/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: This is a static-frontend prototype. The spec does NOT request automated tests. Validation is via manual visual review + grep-based audits documented in quickstart.md §"Success Criteria Validation Table" (17 SC rows) + §"Constitutional Definition-of-Done Verification" (12 gates).

**Organization**: Tasks are grouped by user story (US1 = Super-admin governs roles + people — P1 MVP; US2 = Finance manager configures platform / pricing / student-types / notifications — P2; US3 = Operations audits via cross-cutting timeline — P3). Each story is an independently testable, demoable MVP increment. The 10 new pages are split: US1 ships 5 governance pages (`roles-permissions` + `role-details` + `create-role` + `users` + `user-details`); US2 ships 4 configuration pages (`platform-settings` + `pricing-rules` + `student-type-settings` + `notification-settings`); US3 ships 1 audit page (`audit-log`). The dual-lens anchor SARA.M's permission matrix forces US1's role-details + user-details to share the 6×7 permission mini-matrix — the byte-identity is verified at the US1/user-details checkpoint.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1 / US2 / US3)
- Setup / Foundational / Polish tasks have NO story label
- Include exact file paths in descriptions

## Path Conventions

- Static HTML pages live under `pages/admin/` at the repository root.
- Shared CSS bundle: `assets/css/output.css` (rebuilt once during Polish).
- Shared JS handler: `assets/js/main.js` (NOT modified — zero new JS in this feature; Q3 user-details modals reuse existing modal handler).
- Spec design docs: `specs/010-admin-permissions-settings/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the working environment + project state before authoring any new HTML.

- [x] T001 Verify the branch is `010-admin-permissions-settings` and `.specify/feature.json` points at `specs/010-admin-permissions-settings` (run `git branch --show-current` + `cat .specify/feature.json`).
- [x] T002 [P] Verify shared assets baseline: `wc -l assets/js/main.js` returns 68 (the Spec 001/005-009 baseline) and `assets/css/output.css` exists at the Spec 009 baseline size (~76-78 KB). **Additionally** confirm the modal-handler attribute pattern in `assets/js/main.js` lines 36-44 reads **`data-modal-open`** (on triggers — value = modal element ID) and **`data-modal-close`** (on close buttons inside `<div role="dialog">`) — these are the attributes the Q3 user-details modals MUST use on `pages/admin/user-details.html`. Reject any planning doc that says `data-modal-trigger` / `data-modal-target` (those names are NOT recognized by the actual handler).
- [x] T003 [P] Verify all admin sidebar inbound links already point to the two entry-point pages via `grep -hcE 'href="(roles-permissions|platform-settings)\.html"' pages/admin/*.html | awk -F: '{s+=$NF} END {print s}'` — expected ≥ 50 (18 refs to roles-permissions + 34 refs to platform-settings, slight aggregation tolerance). Confirms zero prior-spec edits will be needed for sidebar correctness (per research.md D2 + plan.md §Summary).

**Checkpoint**: Working environment confirmed; spec docs / assets / inbound sidebar links all aligned.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Capture the shared admin shell + lock the anchor sample-data tables so every page authors against the SAME numbers.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete. The matrix invariants captured here are the single source of truth for byte-identical cross-page rendering (SC-005 + SC-006 + SC-008).

- [x] T004 Capture the **admin sidebar** verbatim from `pages/admin/dashboard.html` (Spec 002 baseline, updated through Spec 009). Save as a working snippet to be embedded byte-identically into the 10 admin pages. The snippet MUST add a NEW entry «سجل المراجعة» (icon: scroll/clipboard, link to `audit-log.html`) immediately below «إعدادات المنصة» — this is the only structural sidebar change in Spec 010 (per FR-005), and it is added ONLY to the 10 new pages (not back-ported to prior-spec admin pages — preserves zero-prior-spec-edits discipline). Active-entry mapping per quickstart.md §"Page Inventory":
  - `roles-permissions.html` / `role-details.html` / `create-role.html` / `users.html` / `user-details.html` → active = «الأدوار والصلاحيات»
  - `platform-settings.html` / `pricing-rules.html` / `student-type-settings.html` / `notification-settings.html` → active = «إعدادات المنصة»
  - `audit-log.html` → active = «سجل المراجعة» (the literal new entry)
- [x] T005 [P] Capture the **header chrome** (search input + bell-as-anchor + profile dropdown + admin greeting "إدارة الأكاديمية") from `pages/admin/dashboard.html`. Reuse byte-identically across all 10 new pages with NO modifications.
- [x] T006 [P] Verify the **8 role cards** in data-model.md §E1 + research.md §D3: Admin (2 users) / Finance Manager (3) / Teacher (5) / Parent (1) / Student (1) / Support (1) / Operations (1) / مساعد إداري (0 — موقوفة). User-count sum = **14** ✓. Lock these values for `pages/admin/roles-permissions.html` + the «إجمالي المستخدمين» tile + the users-table 14-row count.
- [x] T007 [P] Verify the **133-cell Finance Manager permission matrix** in data-model.md §E2 + research.md §D4: 19 module rows × 7 action columns. Cell-state counts: ✓ = **55** / ✕ = **72** / – = **6** (Dashboard's 6 "non-action" cells). The 6 finance rows (Payments / Invoices / Tax Settings / Family Balance / Teacher Finance / Teacher Advances — rows 11-16) carry all 7 ✓; rows 2-6 + 10 (Students/Families/Teachers/Courses/Live Sessions + Reports) carry only View+Export ✓; rows 7-9 + 17-19 (Assignments/Exams/Certificates + Social Hub/Platform Settings/Audit Log) all 7 ✕; row 1 (Dashboard) View only ✓ + 6 dashes. Lock these values — this matrix MUST be authored byte-identically into role-details.html (full 19-row form) AND user-details.html (rows 11-16 only) per SC-005.
- [x] T008 [P] Verify the **14-user roster** in data-model.md §E3 + research.md §D2: 2 Admin (USR-2024-0001 محمد بن عبدالعزيز / 0002 عبدالرحمن سعد) + 3 Finance (0007 سارة محمد anchor / 0008 منى عبدالله / 0009 بدر سعود) + 5 Teacher (0021-0025: الأستاذ أحمد / منى سعد / فاطمة / يوسف / هبة) + 1 Parent (0031 ولي أمر عبد الرحمن) + 1 Student (0041 عبد الرحمن مؤمن) + 1 Support (0051 نورة سعد — موقوف) + 1 Operations (0011 AHMED.K). Lock these values for `pages/admin/users.html` + the activity-preview events in `pages/admin/user-details.html`.
- [x] T009 [P] Verify the **9 pricing rules** in data-model.md §E4 + research.md §D8: 8 active + 1 موقوفة. Anchor figures: Rule 1 = 380.00 ريال (matches Spec 008 INV-2026-0184 subtotal) / Rule 2 = 600.00 ريال (Constitution-VI differential) / Rule 3 = 25.00 ريال / Rule 4 = 35.00 ريال / Rule 5 = 0.00 ريال (zero-price edge case) / Rule 6 = 60.00 ريال / Rule 7 = 80.00 ريال / Rule 8 = 1500.00 EGP / Rule 9 = 80.00 EGP موقوفة. Lock these values for `pages/admin/pricing-rules.html` + the example-calc cards on `pages/admin/student-type-settings.html` (the 25 + 3.75 = 28.75 ريال and 35 + 5.25 = 40.25 ريال arithmetic).
- [x] T010 [P] Verify the **24-event audit timeline** in data-model.md §E7 + research.md §D10: events span 7 days (2026-05-04 → 2026-05-10 inclusive) × 11 modules × 6 actors. Cross-spec identifiers cited: STL-2026-04-TCH-0042 (Spec 009, events 1+6) + INV-2026-0184 (Spec 008, event 2) + FAM-2023-0211 (Spec 008, events 2+20) + RPT-2026-04-Q03-007 (Spec 006, event 17) — exceeds SC-006's «≥ 4 distinct» requirement. «نظام تلقائي» actor on events 2+15 (≥ 1 per SC-007). Empty-payload «—» on events 3+24 (login). All IPs masked first-and-last-octet (94/78/212.***.***. or `—`). Lock these 24 events for `pages/admin/audit-log.html` + 5-event subset for the activity preview on `pages/admin/user-details.html`.
- [x] T011 [P] Verify the **28-toggle notification grid** in data-model.md §E6 + research.md §D9: 7 rows × 4 channels (المنصة / البريد / واتساب / SMS). Default state: row 1 (تذكير الواجبات) ON/ON/OFF/OFF + row 2 (تذكير الحصة) ON/ON/ON/OFF + row 3 (تذكير الدفع) ON/ON/ON/**ON** + row 4 (تقارير ولي الأمر) ON/ON/ON/OFF + row 5 (إشعارات الإنجازات) ON/ON/OFF/OFF + row 6 (تذكير مراجعة المعلم) ON/OFF/OFF/OFF + row 7 (تذكير دورة جديدة — deprecated) OFF/OFF/OFF/OFF. ON-count: 6+5+3+1 = **15** ✓ + deprecated row 4 OFF = total 28 toggles, 15 checked. Lock for `pages/admin/notification-settings.html`.

**Checkpoint**: Foundation ready — admin shell captured + all anchor data verified. User-story work can now begin (in parallel if multiple developers are available).

---

## Phase 3: User Story 1 — Super-admin Governs Roles, Permissions & People (Priority: P1) 🎯 MVP

**Goal**: Deliver the 5 governance pages (`roles-permissions.html` + `role-details.html` + `create-role.html` + `users.html` + `user-details.html`) so the super-admin محمد بن عبدالعزيز الإدريسي can perform his Sunday governance review end-to-end: scan 8 role cards, deep-read SARA.M's Finance Manager permission matrix, scan the 14-user roster, deep-read SARA.M's profile + sanctioned-modal admin actions, and route to the «إنشاء دور جديد» form.

**Independent Test**: Open `pages/admin/roles-permissions.html` and verify (a) 4 summary tiles (7 / 1 / 14 / 19×7), (b) 8 role cards in the canonical order with users-count sum = 14, (c) header CTA «+ إنشاء دور جديد» links to `create-role.html`. Then open `pages/admin/role-details.html` and verify the **133-cell matrix** + 3-glyph legend + Finance Manager pattern (6 finance rows all ✓ + governance rows all ✕). Then open `pages/admin/create-role.html` and verify the 3-section form (basic info / description / 19-module accordion of 133 checkboxes) + side preview panel. Then open `pages/admin/users.html` and verify the 14-row table covering all 7 roles with the EGP-context tag on row 11 (الأستاذة هبة). Finally open `pages/admin/user-details.html` and verify SARA.M's profile + the **42-cell mini-matrix byte-identical to role-details rows 11-16 (SC-005)** + 5-event activity preview (≥ 2 events match audit-log per SC-013) + 3 sanctioned-modal trigger buttons each opening a `<div role="dialog">` with «هذا عرض مرئي فقط» secondary caption (SC-012).

### Implementation for User Story 1

#### `pages/admin/roles-permissions.html` (per `contracts/admin-roles-permissions.md`)

- [x] T012 [US1] Author `pages/admin/roles-permissions.html` shell: `<html lang="ar" dir="rtl">` + `<head>` (Tajawal Google Fonts + `assets/css/output.css` link) + body shell with the captured admin sidebar (active = «الأدوار والصلاحيات» — including the new «سجل المراجعة» entry per T004) + header chrome + footer.
- [x] T013 [P] [US1] Author `#rp-header` page header bar (title «الأدوار والصلاحيات» + subtitle «إدارة المستويات الإدارية وصلاحيات الوصول لجميع وحدات المنصة» + page-end CTA «+ إنشاء دور جديد» primary button → `create-role.html`) inside `pages/admin/roles-permissions.html`.
- [x] T014 [P] [US1] Author `#rp-summary` 4-summary-tile grid per FR-006 (الأدوار الفعّالة 7 success-tone / الأدوار الموقوفة 1 neutral-tone / إجمالي المستخدمين 14 info-tone / الصلاحيات المعرّفة 19 وحدة × 7 إجراء warm-tone) inside `pages/admin/roles-permissions.html`.
- [x] T015 [P] [US1] Author `#rp-cards` 8-card grid (2-col desktop / 4 rows + 1 archived) per FR-007 + FR-008, in this exact order: المدير العام (2 users / "18 من 19 وحدة") / **مديرة المالية (3 users / "6 من 19 وحدة" — anchor with slightly highlighted background)** / المعلّم (5 / "8 من 19 وحدة") / ولي الأمر (1 / "5 من 19 وحدة") / الطالب (1 / "6 من 19 وحدة") / موظف الدعم (1 / "5 من 19 وحدة") / موظف التشغيل (1 / "9 من 19 وحدة") / **مساعد إداري (0 users / "دور موقوف منذ 2026-02-01" + موقوفة status badge + «إعادة تفعيل» CTA)** — all primary CTAs «عرض/تعديل» link to `role-details.html` inside `pages/admin/roles-permissions.html`.
- [x] T016 [US1] Author `#rp-footer` non-link footer caption «الأدوار تعكس سياسة الصلاحيات الفعلية للأكاديمية. لتعديل سياسة عامة، يُرجى التواصل مع المدير العام.» (FR-067 — non-link text) and verify `pages/admin/roles-permissions.html`: zero `href="#"` (SC-002); user-count sum across cards = 14; ≥ 14 mentions of role identifiers grep-validates SC-015; all 8 role cards present.

#### `pages/admin/role-details.html` (per `contracts/admin-role-details.md`)

- [x] T017 [US1] Author `pages/admin/role-details.html` shell with the same admin sidebar (active = «الأدوار والصلاحيات» — deep-read pattern, parent stays highlighted) + header chrome + breadcrumb «الأدوار والصلاحيات → صلاحيات: مديرة المالية» + page-end CTAs «حفظ التعديلات» (primary success-tone visual-only `<button type="button">`) + «إلغاء» (secondary, links to `roles-permissions.html`).
- [x] T018 [P] [US1] Author `#rd-page-header` (H1 «صلاحيات: مديرة المالية» + role-type chip «تشغيلي» + status badge «نشطة» success-tone) inside `pages/admin/role-details.html`.
- [x] T019 [P] [US1] Author `#rd-legend` 3-glyph legend block (FR-011): ✓ مسموح (success-green check inline SVG + `aria-label="مسموح"`) / ✕ محجوب (danger-red X inline SVG + `aria-label="محجوب"`) / – غير منطبق (neutral-gray dash inline SVG + `aria-label="غير منطبق"`). Color-AND-text-AND-icon per Constitution IV.
- [x] T020 [P] [US1] Author `#rd-matrix` 19-row × 7-column = **133-cell** permission matrix wrapped in `<div class="overflow-x-auto"><table class="min-w-[900px]">` (FR-070). Module row order per FR-010: لوحة التحكم / الطلاب / العائلات / المعلمون / الدورات / الحصص المباشرة / الواجبات / الاختبارات / الشهادات / التقارير / **المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم** / المنبر الاجتماعي / إعدادات المنصة / سجل المراجعة. Action column order: عرض / إنشاء / تعديل / حذف / اعتماد / تصدير / وصول مالي. Cell pattern per research.md §D4 + contracts/admin-role-details.md (55 ✓ + 72 ✕ + 6 –). **The 6 finance rows (rows 11-16) MUST be wrapped in HTML comment markers `<!-- MATRIX_ROWS_11_16_START -->` and `<!-- MATRIX_ROWS_11_16_END -->`** — these markers anchor SC-005's byte-identity diff against `user-details.html`'s mini-matrix. Each cell renders an inline SVG glyph + `aria-label` text (FR-069).
- [x] T021 [P] [US1] Author `#rd-metadata` strip below matrix per FR-013 (4-field horizontal flex): الدور: مديرة المالية / المستخدمون المعيّنون: 3 (with cross-link «عرض المستخدمين» → `users.html` styled as a link with the role chip) / آخر تعديل: 2026-04-22 بواسطة محمد بن عبدالعزيز الإدريسي / الحالة: نشطة (success-green badge) inside `pages/admin/role-details.html`.
- [x] T022 [US1] Author `#rd-action-bar` action buttons («حفظ التعديلات» primary visual-only + «إلغاء» secondary linking back) + sibling caption «آخر حفظ — 2026-04-22 14:18 — بواسطة محمد بن عبدالعزيز» (FR-014) and verify `pages/admin/role-details.html`: matrix has exactly 133 cells (SC-008); MATRIX_ROWS_11_16 markers wrap exactly 6 rows; zero `href="#"` (SC-002); legend present at top.

#### `pages/admin/create-role.html` (per `contracts/admin-create-role.md`)

- [x] T023 [US1] Author `pages/admin/create-role.html` shell with the admin sidebar (active = «الأدوار والصلاحيات» — sub-flow pattern) + header chrome + breadcrumb «الأدوار والصلاحيات → إنشاء دور جديد».
- [x] T024 [P] [US1] Author `#cr-form-section1` «معلومات أساسية» card per FR-015 inside `pages/admin/create-role.html`: 3 controls — اسم الدور Arabic text input (placeholder «مثال: مساعد مالي») / اسم الدور English text input (optional, placeholder «e.g., Finance Assistant») / نوع الدور dropdown with 3 options (مدير / تشغيلي / دعم).
- [x] T025 [P] [US1] Author `#cr-form-section2` «الوصف» card with `<textarea rows="4">` (placeholder «اشرح الغرض من الدور والمستخدمين المستهدفين...») inside `pages/admin/create-role.html`.
- [x] T026 [P] [US1] Author `#cr-form-section3` «الصلاحيات» 19-module collapsible accordion (FR-015). Each accordion item: heading with module name + chevron icon + count badge «0 من 7 مفعّلة» + body with 7 action checkboxes (عرض / إنشاء / تعديل / حذف / اعتماد / تصدير / وصول مالي). 19 modules × 7 checkboxes = **133 pre-rendered `<input type="checkbox">` elements, ALL UNCHECKED**. Modules in this order (matches T020): لوحة التحكم / الطلاب / العائلات / المعلمون / الدورات / الحصص المباشرة / الواجبات / الاختبارات / الشهادات / التقارير / المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم / المنبر الاجتماعي / إعدادات المنصة / سجل المراجعة. First 3 modules pre-expanded for visual demonstration; remaining 16 collapsed. Accordion expansion uses existing tabs handler — zero new JS (FR-068).
- [x] T027 [P] [US1] Author `#cr-side-preview` side panel (sticky on desktop) per FR-016 inside `pages/admin/create-role.html`: heading «معاينة الدور» + placeholder copy «اكتب اسم الدور لتظهر المعاينة» (italic muted-tone) + faint card outline mimicking a roles-permissions card + caption «التحديث في الوقت الفعلي غير متاح في النموذج التجريبي».
- [x] T028 [US1] Author `#cr-footer-actions` form footer per FR-017 inside `pages/admin/create-role.html`: «إنشاء الدور» (primary success-tone, `<button type="submit">` inside a `<form>` with no `action`) + «إلغاء» (secondary, `<a href="roles-permissions.html">` styled as a button per FR-067) + sibling caption «حفظ المسودة تلقائياً غير مفعّل في النموذج التجريبي» and verify: 133 `<input type="checkbox">` total, none `checked`; zero `href="#"` (SC-002); accordion uses existing handler only.

#### `pages/admin/users.html` (per `contracts/admin-users.md`)

- [x] T029 [US1] Author `pages/admin/users.html` shell with admin sidebar (active = «الأدوار والصلاحيات» — sub-flow pattern) + header chrome + page header bar (H1 «المستخدمون» + subtitle «جميع حسابات المنصة وحالات الوصول» + page-end CTA «+ مستخدم جديد» visual-only `<button type="button" title="إنشاء حساب جديد سيُتاح في إصدار قادم">`).
- [x] T030 [P] [US1] Author `#users-summary` 4-summary-tile grid per FR-018 (إجمالي المستخدمين 14 info-tone / نشط 13 success-tone / موقوف 1 danger-tone / بريد إلكتروني غير موثّق 2 warning-tone) inside `pages/admin/users.html`.
- [x] T031 [P] [US1] Author `#users-filters` filter bar per FR-019 inside `pages/admin/users.html`: role chip group (8 chips: الكل active / Admin / Finance Manager / Teacher / Parent / Student / Support / Operations) + status chip group (3 chips: الكل / نشط / موقوف) + `<input type="search" placeholder="ابحث بالاسم أو البريد أو الهاتف...">` + caption below «اكتب لتصفية النتائج» — visual-only filtering (no JS handler).
- [x] T032 [P] [US1] Author `#users-table` 14-row × 7-column table (6 data columns + action column) per FR-020 + data-model.md §E3 — wrap in `<div class="overflow-x-auto"><table class="min-w-[800px]">`. 14 rows in this exact order (per data-model.md table): row 1 محمد بن عبدالعزيز (المدير العام / نشط ✓ موثّق / 2026-05-10 08:00) → row 14 نورة سعد الدوسري (موظفة الدعم / **موقوف**). **Row 11 الأستاذة هبة** carries an **EGP/Cairo context tag** beside the role badge (FR-022). **Row 3 SARA.M** is the anchor (slightly highlighted row background). Each row's «الإجراء» column carries 3 icon-buttons: عرض (eye icon, `<a href="user-details.html">`) + تعديل (pencil icon, visual-only `<button type="button">`) + تعطيل (power icon, `<button type="button" data-modal-open="modal-disable-user">`) per FR-021 inside `pages/admin/users.html`.
- [x] T033 [US1] Author `#users-disable-modal` ONE shared `<div id="modal-disable-user" role="dialog" class="hidden">` block (footer of body, before `<script>`) carrying generic copy «هل أنت متأكد من تعطيل هذا الحساب؟» + secondary caption «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً» + buttons «تأكيد التعطيل» (danger-tone) + «إلغاء» (`data-modal-close`). Then verify `pages/admin/users.html`: 14 rows in table; status distribution 13/1; verification distribution 12/2; «عرض» icon-button per row links to `user-details.html`; EGP/Cairo tag visible on row 11; zero `href="#"` (SC-002); shared modal block uses existing handler only (FR-068).

#### `pages/admin/user-details.html` (per `contracts/admin-user-details.md`)

- [x] T034 [US1] Author `pages/admin/user-details.html` shell with admin sidebar (active = «الأدوار والصلاحيات» — deep-read) + header chrome + breadcrumb «الأدوار والصلاحيات → المستخدمون → سارة محمد عبدالله» + page header bar (title «سارة محمد عبدالله» + English subtitle «Sara Mohammed Abdullah» + role chip «مديرة المالية» linked to `role-details.html` + status badge «نشط ✓ موثّق»).
- [x] T035 [P] [US1] Author `#ud-profile-card` per FR-023 inside `pages/admin/user-details.html`: avatar visual (initials «س.م» on primary-tone background) + full name + English transliteration (muted) + email row (sara.m@idarti-academy.sa) + masked phone row (+966 50 *** 0007 per data-model.md §D13) + role chip clickable to role-details + account-creation date (2024-09-15).
- [x] T036 [P] [US1] Author `#ud-linked-account-card` per FR-024 inside `pages/admin/user-details.html`: caption «الحساب المرتبط» + body «لا يوجد حساب مرتبط — هذا حساب إداري بحت» + muted broken-link icon. Empty-state pattern per Constitution IV.
- [x] T037 [P] [US1] Author `#ud-mini-matrix-card` per FR-025 inside `pages/admin/user-details.html`: heading «ملخّص الصلاحيات الفعّالة» + sub-caption «الوحدات المالية الست — مسموح كامل» + the **6×7 = 42-cell mini-matrix** wrapped in `<!-- MINI_MATRIX_START -->` / `<!-- MINI_MATRIX_END -->` HTML comments. Rows MUST be byte-identical to role-details.html's MATRIX_ROWS_11_16 block: المدفوعات / الفواتير / إعدادات الضريبة / رصيد العائلة / مالية المعلم / سُلَف المعلم. All 42 cells = ✓ مسموح. Same Tailwind class structure + same inline SVG glyphs + same aria-labels as role-details.html. SC-005 byte-identity gate.
- [x] T038 [P] [US1] Author `#ud-account-status` side-rail card per FR-026 inside `pages/admin/user-details.html`: 6 fields — الحالة (نشط ✓ + موثّق ✓ success-green badges) / آخر تسجيل دخول (2026-05-10 09:12) / عنوان IP (`94.***.***.118` masked) / الجلسات النشطة (2 جلستان نشطتان) / المصادقة الثنائية (مفعّلة (تطبيق المصادقة)) / قوة كلمة المرور (قوية + success-green progress bar visual).
- [x] T039 [P] [US1] Author `#ud-activity-preview` 5-event list card per FR-027 inside `pages/admin/user-details.html`. Items sourced from audit-log.html for SC-013 cross-page consistency: (1) 2026-05-10 09:15 «أنشأت تعديل يدوي -80.00 ريال على **STL-2026-04-TCH-0042**» / (2) 2026-05-09 14:22 «حدّثت إعدادات المنصة — حقل تذييل الفاتورة» / (3) 2026-05-09 11:35 «أنشأت دفعة يدوية بمبلغ 200.00 ريال على INV-2026-0231» / (4) 2026-05-08 16:20 «سجّلت دفعة على STL-2026-04-TCH-0067 (الأستاذ خالد) بمبلغ 5,500.00 ريال» / (5) 2026-05-05 22:05 «صدّرت تقرير شهر أبريل (PDF) — التقرير: **RPT-2026-04-Q03-007**». Each entry shows action / module / timestamp / masked IP. Cross-link CTA «عرض السجل الكامل» → `audit-log.html`.
- [x] T040 [P] [US1] Author `#ud-action-bar` side-rail card per FR-028 inside `pages/admin/user-details.html`: heading «إجراءات إدارية» + 3 stacked sanctioned-modal trigger buttons (Q3): «تعطيل الحساب» (danger-tone outline + power-off icon, `<button type="button" data-modal-open="modal-disable-account">`) + «إعادة تعيين كلمة المرور» (warning-tone outline + key icon, `data-modal-open="modal-reset-password"`) + «إنهاء جميع الجلسات» (neutral outline + log-out icon, `data-modal-open="modal-end-sessions"`). Plus a non-link static caption «هذه الحساب مرتبط بسجل الموظفين المعتمد. لتعديل المعلومات الأساسية، يُرجى التواصل مع المدير العام.» (FR-067).
- [x] T041 [US1] Author the **3 sanctioned-modal blocks** at the end of `<body>` before `<script src="../../assets/js/main.js">` per FR-028 + FR-029 + research.md §D7 inside `pages/admin/user-details.html`: each is a `<div role="dialog" class="hidden" id="modal-{name}">` with title + body + secondary caption «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً» + 2 buttons (تأكيد primary action-tone-specific + إلغاء neutral with `data-modal-close`). Exact copy:
  - `#modal-disable-account`: title «تأكيد تعطيل الحساب» / body «سيتم تعطيل وصول سارة محمد عبدالله (موظفة المالية) إلى المنصة فوراً. لن تتمكّن من تسجيل الدخول حتى يتم إعادة تفعيل الحساب من قبل المدير العام.» / primary «تأكيد التعطيل» (danger-tone)
  - `#modal-reset-password`: title «تأكيد إعادة تعيين كلمة المرور» / body «سيتم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني sara.m@idarti-academy.sa. سيتم إنهاء جميع الجلسات النشطة بعد الإرسال.» / primary «تأكيد الإرسال» (warning-tone)
  - `#modal-end-sessions`: title «تأكيد إنهاء جميع الجلسات» / body «سيتم تسجيل خروج سارة محمد عبدالله من جميع الأجهزة (2 جلسات نشطة حالياً). يجب على المستخدمة تسجيل الدخول مجدداً.» / primary «تأكيد الإنهاء» (neutral primary)
  Then verify `pages/admin/user-details.html`: exactly 3 `data-modal-open=` triggers (SC-012); exactly 3 `<div role="dialog" class="hidden">` blocks each containing «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً» (SC-012); MINI_MATRIX block byte-identical to role-details.html's MATRIX_ROWS_11_16 (SC-005); ≥ 2 activity-preview events match audit-log.html identifiers (SC-013); zero `href="#"` (SC-002).

**Checkpoint**: User Story 1 (P1) complete. The 5 governance pages are independently functional and demoable as MVP. The super-admin can perform a complete governance review across roles, permissions, and people.

---

## Phase 4: User Story 2 — Finance Manager Configures Pricing, Student Types & Platform Settings (Priority: P2)

**Goal**: Deliver the 4 configuration pages (`platform-settings.html` + `pricing-rules.html` + `student-type-settings.html` + `notification-settings.html`) so SARA.M (or any platform admin) can review and configure the academy's identity, regional defaults, pricing rules with retroactivity discipline (Q1), the 2 student-type rules with example calculations, and the 28-toggle notification grid.

**Independent Test**: Open `pages/admin/platform-settings.html` and verify the 7 configuration cards (هوية / شعار / إقليمية / تواصل / تذييل / شهادات / حفظ) with KSA + SAR primary + EGP secondary chip + the multi-currency-never-summed caption (SC-009) + «آخر حفظ بواسطة سارة محمد» actor caption. Then open `pages/admin/pricing-rules.html` and verify the 9-row table covering 4 mechanisms × 2 student types + zero-price edge case (rule 5) + Q1 retroactivity callout (SC-010) + table footnote (SC-010). Then open `pages/admin/student-type-settings.html` and verify the 2-row table + the side-by-side example-calc cards (28.75 vs 40.25 ريال) + regulatory caption above table. Finally open `pages/admin/notification-settings.html` and verify the **7×4 = 28-toggle grid with exactly 15 ON** (SC-016) + per-row description sub-captions + the deprecated row 7 with all 4 OFF + معطّلة banner + side panel «قنوات الاتصال» with 4 capability cards.

### Implementation for User Story 2

#### `pages/admin/platform-settings.html` (per `contracts/admin-platform-settings.md`)

- [x] T042 [US2] Author `pages/admin/platform-settings.html` shell with admin sidebar (active = «إعدادات المنصة») + header chrome + page header bar (H1 «إعدادات المنصة» + subtitle «الهوية، اللغة، العملة، التواصل، والشهادات الرسمية» + page-end caption «آخر حفظ — 2026-05-09 14:22 — بواسطة سارة محمد» muted text — no CTA in header).
- [x] T043 [P] [US2] Author cards 1-2 per FR-030 inside `pages/admin/platform-settings.html`: **Card 1 «هوية الأكاديمية»** (academy name Arabic input «أكاديمية إدارتي للتعليم» + English input «Idarti Academy for Education» + short-form input «إدارتي» maxlength=10) + **Card 2 «الشعار»** (200×200 placeholder image + caption «الحجم الموصى به: 512×512 بكسل، PNG شفاف» + visual-only file input + button «رفع شعار جديد» + secondary caption «التغيير سيُعرض على جميع الفواتير والشهادات بعد الحفظ»).
- [x] T044 [P] [US2] Author **Card 3 «الإعدادات الإقليمية»** per FR-031 + FR-032 inside `pages/admin/platform-settings.html`: country dropdown defaulted to «المملكة العربية السعودية» (with options for مصر / الإمارات / الكويت / قطر / البحرين / عُمان) + primary-currency dropdown defaulted to «الريال السعودي (SAR)» + **secondary-currencies chip group** with 1 chip «الجنيه المصري (EGP)» (visual-only ✕ removal button) + «+ إضافة عملة» button + **caption below the chip group** «العملات الثانوية المسموح بها — لا يتم جمعها مع العملة الأساسية في أي ملخص» (SC-009 grep target) + language-primary dropdown defaulted to «العربية» + language-secondaries chip group with 1 chip «English» + direction radio group with «من اليمين إلى اليسار (RTL)» selected + «من اليسار إلى اليمين (LTR)» option.
- [x] T045 [P] [US2] Author cards 4-6 inside `pages/admin/platform-settings.html`: **Card 4 «معلومات التواصل»** (phone +966 11 234 5678 / email info@idarti-academy.sa / address textarea «الرياض، المملكة العربية السعودية» / website https://idarti-academy.sa) + **Card 5 «تذييل الفاتورة»** (textarea rows=4 with 247-char default footer text including tax number 312345678900003) + **Card 6 «إعدادات الشهادات»** (issuer name «أكاديمية إدارتي للتعليم» + signature-visual placeholder image + file input «رفع توقيع جديد» + seal-visual placeholder image + file input «رفع ختم جديد» + caption «التوقيع والختم سيظهران على جميع الشهادات المُصدَرة بعد الحفظ»).
- [x] T046 [US2] Author **Card 7 «حفظ التغييرات»** sticky footer per FR-033 inside `pages/admin/platform-settings.html`: primary CTA «حفظ جميع التغييرات» (success-tone, full-width on mobile / right-aligned on desktop, `<button type="button">`) + secondary CTA «إلغاء التعديلات» (neutral, links back to `dashboard.html`) + sibling caption below the buttons «آخر حفظ — 2026-05-09 14:22 — بواسطة سارة محمد عبدالله» (FR-033). Then verify `pages/admin/platform-settings.html`: zero `href="#"` (SC-002); EGP chip visible + multi-currency-never-summed caption visible (SC-009 dual grep); ≥ 12 form controls visible across the 7 cards (per scope/scale).

#### `pages/admin/pricing-rules.html` (per `contracts/admin-pricing-rules.md`)

- [x] T047 [US2] Author `pages/admin/pricing-rules.html` shell with admin sidebar (active = «إعدادات المنصة» — sub-flow pattern) + header chrome + breadcrumb «إعدادات المنصة → قواعد التسعير» + page header bar (H1 + subtitle + page-end CTA «+ قاعدة جديدة» primary, scrolls to form below via in-page anchor `#pr-form`).
- [x] T048 [P] [US2] Author `#pr-summary` 4-summary-tile grid per FR-034 inside `pages/admin/pricing-rules.html`: القواعد النشطة 8 success-tone / الموقوفة 1 neutral-tone / العملات المغطّاة 2 (chips «SAR / EGP») info-tone / أحدث تحديث 2026-05-01 warm-tone.
- [x] T049 [P] [US2] Author `#pr-table` 9-row × 7-column pricing-rules table per FR-035 + FR-036 + FR-037 + data-model.md §E4 — wrap in `<div class="overflow-x-auto"><table class="min-w-[900px]">`. Column headers: نوع القاعدة / نوع الطالب / السعر / يطبّق على / تاريخ السريان / الحالة / الإجراء. The 9 rows in exact order:
  - Rule 1: course-flat / **ناطق بالعربية** / **380.00 ريال** SAR badge / «دورة القرآن الكريم — المستوى الثالث» / 2024-09-01 / نشطة ✓
  - Rule 2: course-flat / **غير ناطق بالعربية** / **600.00 ريال** SAR badge / «دورة القرآن الكريم — المستوى الثالث (للناطقين بغير العربية)» / 2024-09-01 / نشطة ✓
  - Rule 3: live-group / ناطق بالعربية / 25.00 ريال SAR badge / «حصة جماعية ساعة واحدة» / 2024-09-01 / نشطة ✓
  - Rule 4: live-group / غير ناطق بالعربية / 35.00 ريال SAR badge / «حصة جماعية ساعة واحدة» / 2024-09-01 / نشطة ✓
  - Rule 5: live-private / كلاهما / **0.00 ريال** SAR badge / **«حصة تجريبية مجانية»** (FR-041 zero-price edge case, warm-tinted background) / 2025-01-01 / نشطة ✓
  - Rule 6: live-private / ناطق بالعربية / 60.00 ريال SAR badge / «حصة خاصة ساعة واحدة» / 2024-09-01 / نشطة ✓
  - Rule 7: live-private / غير ناطق بالعربية / 80.00 ريال SAR badge / «حصة خاصة ساعة واحدة» / 2024-09-01 / نشطة ✓
  - Rule 8: Egypt-tier course / غير ناطق بالعربية / **1500.00 EGP** EGP badge / «دورة الإنجليزية لغير الناطقين — المستوى الأول» / 2025-01-01 / نشطة ✓
  - Rule 9: Egypt-tier session / غير ناطق بالعربية / 80.00 EGP EGP badge / «حصة جماعية بالقاهرة» / 2025-01-01 / **موقوفة** (since 2026-03-15, with «إعادة تفعيل» CTA replacing «إيقاف»)
  Per-row action column: 3 icon-buttons (عرض / تعديل / إيقاف — or «إعادة تفعيل» on row 9) all visual-only.
- [x] T050 [P] [US2] Author `#pr-table-footnote` directly below the table per FR-040 inside `pages/admin/pricing-rules.html`: muted text `* جميع قواعد التسعير تُطبَّق إلى الأمام من تاريخ السريان.` (SC-010 grep target).
- [x] T051 [P] [US2] Author `#pr-form` rules-form panel per FR-038 + FR-039 (id="pr-form" anchor target for the page-header CTA) — 2-column desktop layout (form on start, callout on end). **Form fields (7)**: اسم القاعدة (Arabic text input) / نوع القاعدة (dropdown: course-flat / live-group / live-private / Egypt-tier) / نوع الطالب (radio group: ناطق بالعربية / غير ناطق بالعربية / كلاهما) / السعر (numeric input + toggleable currency tag SAR/EGP) / يطبّق على (dropdown of available courses or session classes) / تاريخ السريان (date picker defaulted to 2026-06-01) / الحالة (toggle نشطة/موقوفة). **Q1 retroactivity callout** (FR-039) sits beside the «تاريخ السريان» picker (right-side under RTL on desktop, above on mobile) — info-tone alert box with shield icon: heading «🛡️ سياسة عدم الرجعية» + body «تسري القاعدة على الفواتير الجديدة فقط من تاريخ السريان — لا تُعدَّل الفواتير المستحقة سابقاً. يضمن هذا التنظيم استقرار الالتزامات المالية للأسر وتوافقاً مع متطلبات هيئة الزكاة والضريبة في المملكة.» — SC-010 grep target. **Form footer**: «حفظ القاعدة» primary success-tone visual-only + «إلغاء» neutral + sibling caption «آخر حفظ بواسطة محمد بن عبدالعزيز — 2026-05-07 17:00» (timestamp aligns with audit-log event 13).
- [x] T052 [US2] Verify `pages/admin/pricing-rules.html`: 9 table rows with the 4 anchor figures (380 / 60 / 25 / 1500) present (SC-006 reconciliation with Spec 008); Q1 callout text «تسري القاعدة على الفواتير الجديدة فقط» visible AND footnote «جميع قواعد التسعير» visible — both grep-matchable per SC-010; rule 5 zero-price edge case visually distinct; rule 9 «إعادة تفعيل» CTA replaces «إيقاف»; per-row currency badges (SAR/EGP) — never summed; zero `href="#"` (SC-002).

#### `pages/admin/student-type-settings.html` (per `contracts/admin-student-type-settings.md`)

- [x] T053 [US2] Author `pages/admin/student-type-settings.html` shell with admin sidebar (active = «إعدادات المنصة» — sub-flow) + header chrome + breadcrumb «إعدادات المنصة → إعدادات نوع الطالب» + page header bar (H1 «إعدادات نوع الطالب» + subtitle «التصنيف الذي يحدّد التسعير وراتب المعلم وتسميات الفواتير والتقارير»).
- [x] T054 [P] [US2] Author `#sts-callout` regulatory caption above table per FR-045 inside `pages/admin/student-type-settings.html`: info-tone alert box «تُحدَّد فئة الطالب وفقاً للغته الأولى وليس الجنسية أو بلد الإقامة — هذا يضمن مساواة المعاملة بين الطلاب السعوديين والمصريين الناطقين بالعربية.»
- [x] T055 [P] [US2] Author `#sts-table` 2-row × 6-column student-type table per FR-042 + FR-043 + FR-046 inside `pages/admin/student-type-settings.html`. Columns: النوع / سلوك التسعير / سلوك راتب المعلم / تسمية الفاتورة / تسمية التقرير / الحالة + آخر تحديث + per-row action column (تعديل + إيقاف icons visual-only). Rows: row 1 «**ناطق بالعربية**» (cross-link to pricing-rules.html / cross-link to teacher-salary-rules.html / «طالب ناطق بالعربية» / «طالب ناطق بالعربية» / نشط ✓ / 2024-09-01 محمد بن عبدالعزيز) + row 2 «**غير ناطق بالعربية**» (same cross-link pattern / «طالب غير ناطق بالعربية» / «طالب غير ناطق بالعربية» / نشط ✓ / 2024-09-01 محمد بن عبدالعزيز). Both rows MUST use canonical Spec 008 Q3 labels verbatim.
- [x] T056 [P] [US2] Author `#sts-example-calc` example-calculation preview block per FR-044 inside `pages/admin/student-type-settings.html`: heading «معاينة التطبيق على حصة نموذجية» + 2-card side-by-side layout — **ناطق-بالعربية card** (success-tinted border): heading «طالب ناطق بالعربية» + body «حصة جماعية ساعة واحدة — السعر الأساسي 25.00 ريال + ضريبة القيمة المضافة 15% + 3.75 ريال — **الإجمالي المستحق 28.75 ريال**» + caption «وفق قاعدة التسعير #3 — نشطة منذ 2024-09-01». **غير-ناطق-بالعربية card** (warm-tinted border): heading «طالب غير ناطق بالعربية» + body «حصة جماعية ساعة واحدة — السعر الأساسي 35.00 ريال + ضريبة القيمة المضافة 15% + 5.25 ريال — **الإجمالي المستحق 40.25 ريال**» + caption «وفق قاعدة التسعير #4 — نشطة منذ 2024-09-01». Sub-caption below cards: «الفرق 11.50 ريال يعكس الفجوة في تسعير الفئة لتغطية تكلفة المواد التدريسية الإضافية للطلاب غير الناطقين بالعربية.»
- [x] T057 [US2] Author `#sts-footer` non-link static text «إعدادات نوع الطالب جزء من إعدادات السياسة العامة. لتعديل التصنيف، يُرجى التواصل مع المدير العام.» (FR-067) and verify `pages/admin/student-type-settings.html`: both rows use «ناطق بالعربية» / «غير ناطق بالعربية» canonical labels (SC-007 contributor); example-calc arithmetic exact (28.75 + 40.25 grep-matchable); zero `href="#"` (SC-002).

#### `pages/admin/notification-settings.html` (per `contracts/admin-notification-settings.md`)

- [x] T058 [US2] Author `pages/admin/notification-settings.html` shell with admin sidebar (active = «إعدادات المنصة» — sub-flow) + header chrome + breadcrumb «إعدادات المنصة → إعدادات الإشعارات» + page header bar (H1 + subtitle + page-end CTA «حفظ جميع التغييرات» primary success-tone visual-only).
- [x] T059 [P] [US2] Author `#ns-grid` main-column toggle grid per FR-047 + FR-048 + FR-049 + FR-050 + FR-051 inside `pages/admin/notification-settings.html`. Heading «الفئات والقنوات» + sub-caption «الفئات المعطّلة لا تُرسَل أي إشعار، حتى لو كانت القناة مفعّلة على المنصة». Header row: «الفئة / المنصة / البريد / واتساب / SMS». 7 rows in this exact order:
  - Row 1: تذكير الواجبات + description «يُرسَل قبل 24 ساعة من موعد تسليم الواجب وعند تجاوز الموعد» — toggles ON/ON/OFF/OFF
  - Row 2: تذكير الحصة + «يُرسَل قبل 30 دقيقة من بداية الحصة المباشرة» — ON/ON/ON/OFF
  - Row 3: تذكير الدفع + «يُرسَل قبل 3 أيام من تاريخ استحقاق الفاتورة وعند تجاوز التاريخ» — **ON/ON/ON/ON** (all 4)
  - Row 4: تقارير ولي الأمر + «يُرسَل في أول يوم من كل شهر مع رابط التقرير الشهري» — ON/ON/ON/OFF
  - Row 5: إشعارات الإنجازات + «يُرسَل فور حصول الطالب على شارة أو شهادة جديدة» — ON/ON/OFF/OFF
  - Row 6: تذكير مراجعة المعلم + «يُرسَل أسبوعياً للمعلمين عند وجود واجبات أو اختبارات تنتظر المراجعة» — ON/OFF/OFF/OFF
  - Row 7: **تذكير دورة جديدة (deprecated)** + «هذا الإشعار غير فعّال — يمكن إعادة تفعيله من إعدادات المنصة» — OFF/OFF/OFF/OFF + soft-gray «معطّلة» banner across the row + grey-tone toggle styling
  Each toggle is a peer-based Tailwind switch over `<input type="checkbox">` (Constitution V — pure HTML+CSS, no JS handler). Total 28 `<input type="checkbox">` elements, 15 with `checked` attribute (rows 1-6: 6+5+3+1 = 15). Active-row state count: **15 ON / 9 OFF** ✓ (FR-048).
- [x] T060 [P] [US2] Author `#ns-channels-panel` side panel per FR-052 inside `pages/admin/notification-settings.html`: heading «قنوات الاتصال» + 4 channel-capability cards stacked vertically — **المنصة card** (info-tone): «إشعار داخل المنصة في رمز الجرس + قائمة الإشعارات» + caption «متاح لجميع الباقات» / **البريد card** (success-tone): «بريد إلكتروني مع تنسيق HTML — يدعم العربية واللغات الأخرى» + caption «مجاني» / **واتساب card** (warning-tone): «رسائل واتساب عبر Twilio» + caption «متاح للمناطق المختارة (السعودية، الإمارات، مصر)» / **SMS card** (warm-tone): «رسائل نصية قصيرة» + caption «50 رسالة شهرياً ضمن الباقة الحالية، تكلفة إضافية للزيادة».
- [x] T061 [US2] Author `#ns-footer` non-link static text «التغييرات على إعدادات الإشعارات تُطبَّق فوراً بعد الحفظ على جميع المستخدمين الذين تنطبق عليهم الفئة.» and verify `pages/admin/notification-settings.html`: exactly 28 `<input type="checkbox">` elements (SC-016); exactly 15 with `checked` attribute (SC-016); deprecated row 7 with all 4 OFF + معطّلة banner; zero JS event handlers (FR-051); zero `href="#"` (SC-002).

**Checkpoint**: User Story 2 (P2) complete. The 4 configuration pages are independently functional. Stories 1 + 2 together close every constitutional admin sidebar entry except «سجل المراجعة» (which US3 ships).

---

## Phase 5: User Story 3 — Operations & Finance Staff Trace Across Modules and Time (Priority: P3)

**Goal**: Deliver the 1 audit page (`audit-log.html`) so operations + finance staff can perform their Monday weekly audit: scan 24 chronological events spanning 11 modules + 6 actors over 7 days with full cross-spec traceability (4 prior-spec identifiers cited verbatim) + visual-only «تصدير CSV» button (Q2) demonstrating the Export permission verb without faking the download.

**Independent Test**: Open `pages/admin/audit-log.html` and verify (a) 4 summary tiles (24 / 11 / 7 days / 6 users), (b) 4 filter controls + a result-count chip, (c) 24-row events table sorted descending starting with row 1 (2026-05-10 09:15 SARA.M / STL-2026-04-TCH-0042 manual adjustment) → row 24 (2026-05-04 09:00 AHMED.K login), (d) ≥ 4 prior-spec identifiers cited (SC-006), (e) ≥ 1 «نظام تلقائي» actor row (rows 2 + 15), (f) all IPs masked first-and-last-octet, (g) ≥ 1 empty-payload «—» row (rows 3 + 24), (h) Q2 «تصدير CSV» button with `title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي"` (SC-011).

### Implementation for User Story 3

#### `pages/admin/audit-log.html` (per `contracts/admin-audit-log.md`)

- [x] T062 [US3] Author `pages/admin/audit-log.html` shell with admin sidebar (active = «سجل المراجعة» — the literal new entry per T004 + FR-005) + header chrome + page header bar (H1 «سجل المراجعة» + subtitle «جميع الإجراءات الإدارية والنظامية على المنصة» + page-end controls).
- [x] T063 [P] [US3] Author the **Q2 «تصدير CSV» button** per FR-060 + research.md §D6 inside the page header's page-end-controls container in `pages/admin/audit-log.html`: `<button type="button" class="..." title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي"><svg>...download icon...</svg> تصدير CSV</button>` — secondary outline style (border-2 + bg-transparent), no `download=` attribute, no `href`, no `<a>` wrapper. The `title=` text is the SC-011 grep target. Adjacent to the button: a date-range picker control (visual-only) defaulted to «آخر 7 أيام (2026-05-04 → 2026-05-10)».
- [x] T064 [P] [US3] Author `#al-summary` 4-summary-tile grid per FR-053 inside `pages/admin/audit-log.html`: الإجراءات 24 info-tone / الوحدات المتأثّرة 11 warm-tone / النطاق الزمني 7 أيام success-tone / المستخدمون الفعّالون 6 accent-tone.
- [x] T065 [P] [US3] Author `#al-filters` filter bar per FR-054 inside `pages/admin/audit-log.html`: 4 filter dropdowns + 1 result-count chip:
  - **الوحدة** dropdown — 13 options per FR-054 (post-clarification): «الكل» + 11 supergroups (المالية والمدفوعات / مالية المعلم / رصيد العائلة / المصادقة / إعدادات المنصة / إعدادات الضريبة / المستخدمون / الأدوار والصلاحيات / الطلاب / التقارير / المنبر الاجتماعي) + the 12th «سجل المراجعة» self-reference for audit-log-export events. The summary tile «11 وحدة» counts the 11 supergroups (FR-053 supergroup-mapping rule: «المدفوعات + الفواتير + سُلَف المعلم» aggregate into «المالية والمدفوعات»).
  - **المستخدم** dropdown — 7 options (الكل / محمد بن عبدالعزيز / سارة محمد / أحمد بن خالد / نورة سعد / نظام تلقائي + 1 admin)
  - **النطاق الزمني** picker — defaulted to «آخر 7 أيام»
  - **نوع الإجراء** dropdown — 12 options (الكل / created / updated / approved / rejected / paid / disabled / login / viewed / executed / reviewed / exported)
  - **Result-count chip** beside filters: «24 من 24» (info-tone, visual-only — no-filter applied state)
- [x] T066 [P] [US3] Author `#al-table` 24-row × 7-column events table per FR-055 + FR-056 + FR-057 + FR-058 + FR-059 + FR-061 + research.md §D10 — wrap in `<div class="overflow-x-auto"><table class="min-w-[900px]">`. Column headers: المستخدم / الإجراء / الوحدة / التاريخ والوقت / IP / تفاصيل / الإجراء. **24 rows in this exact order (sorted descending by timestamp)** per data-model.md §E7 + research.md §D10 — see contracts/admin-audit-log.md for full row data. Cross-spec identifiers cited (≥ 4 distinct per SC-006): row 1 + row 6 reference **STL-2026-04-TCH-0042** (Spec 009) / row 2 references **INV-2026-0184** (Spec 008) / row 2 + row 20 reference **FAM-2023-0211** (Spec 008) / row 17 references **RPT-2026-04-Q03-007** (Spec 006). «نظام تلقائي» actor on rows 2 + 15 (FR-057). Empty-payload «—» on rows 3 + 24 (login events, FR-059). All IPs masked: SARA.M + MOHAMMED.A use `94.***.***.118`; AHMED.K uses `78.***.***.45`; NORA.S uses `212.***.***.91`; نظام تلقائي rows show `—`. Per-row action column (FR-061): single «عرض التفاصيل» chevron icon-button visual-only.
- [x] T067 [US3] Author `#al-footer` non-link static text «سجل المراجعة لا يُحذَف ولا يُعدَّل — هذه الميزة ضامنة للمساءلة وفق المعايير المحاسبية المعتمدة في المملكة.» (FR-067) and verify `pages/admin/audit-log.html`: 24 table rows; ≥ 4 prior-spec identifiers grep-validates (SC-006); ≥ 1 «نظام تلقائي» row visible (rows 2 + 15); all IPs match the masked pattern; rows 3 + 24 details cell = «—»; «تصدير CSV» button title attribute matches SC-011 grep target verbatim; zero `href="#"` (SC-002).

**Checkpoint**: User Story 3 (P3) complete. All 3 user stories independently functional. The 10 new pages collectively close the administrative-control layer of the platform — every admin sidebar entry now resolves to a real existing HTML file.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Bake-off audits + responsive validation + manual smoke-tests + final size verification + cross-spec traceability checks.

- [x] T068 [P] Run `npm run build:css` from repo root to regenerate `assets/css/output.css`. Confirm new utilities required by the 10 pages (e.g., `min-w-[900px]` for matrix horizontal-scroll, `grid-cols-[repeat(7,minmax(60px,1fr))]` for matrix grid, peer-based switch utilities for the 28-toggle notification grid, accordion-collapse utilities for create-role) are picked up by the JIT scan. Verify final size: `wc -c assets/css/output.css` ≤ 90112 (the 88 KB ceiling raised in Spec 009 — SC-014). **PASSED: 72,182 bytes**
- [x] T069 [P] **Zero prior-spec edits audit**: run `git status --porcelain | grep -vE 'pages/admin/(roles-permissions|role-details|create-role|users|user-details|platform-settings|pricing-rules|student-type-settings|notification-settings|audit-log)\.html|assets/css/output\.css'` and confirm empty output (only the 11 expected staged files exist — 10 new HTML + rebuilt output.css). Per SC-004. **PASSED: only meta files modified (feature.json, CLAUDE.md, specs/)**
- [x] T070 [P] **Zero `href="#"` audit (SC-002)**: run `grep -nE 'href="#"' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html` and confirm empty output. **PASSED: zero matches**
- [x] T071 [P] **Zero new JS audit (SC-003)**: confirm `wc -l assets/js/main.js` returns 68 (the Spec 009 baseline — unchanged). **PASSED: 68 lines**
- [x] T072 [P] **Two-views-one-entity matrix byte-identity verification (SC-005)**: run `diff <(awk '/<!-- MATRIX_ROWS_11_16_START -->/,/<!-- MATRIX_ROWS_11_16_END -->/' pages/admin/role-details.html) <(awk '/<!-- MINI_MATRIX_START -->/,/<!-- MINI_MATRIX_END -->/' pages/admin/user-details.html)` — only the 2 differing comment-marker lines should appear in the diff. Adjust the markers if they accidentally diverge during authoring; fix the cell content if the matrix rows themselves diverge. **The 6 matrix rows MUST be byte-identical** between the two files. **PASSED: only comment markers differ**
- [x] T073 [P] **Cross-spec audit-log traceability (SC-006)**: run `grep -E 'STL-2026-04-TCH-0042|INV-2026-0184|FAM-2023-0211|RPT-2026-04-Q03-007' pages/admin/audit-log.html | wc -l` and confirm ≥ 4. (Expected: STL ×2 events 1+6 / INV ×1 event 2 / FAM ×2 events 2+20 / RPT ×1 event 17 = 6 matches across 4 distinct identifiers.) **PASSED: 6 matches across 4 distinct identifiers**
- [x] T074 [P] **Arabic-vs-Foreign distinction visibility (SC-007)**: run `grep -c "ناطق بالعربية" pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html | awk -F: '{s+=$NF} END {print s}'` and confirm ≥ 6 contexts; same for «غير ناطق بالعربية» (≥ 6). Expected pages with hits: pricing-rules (≥ 6 — rules 1-7 student-type column) + student-type-settings (≥ 4 — 2 row labels + 2 example-calc cards) + users (≥ 1 — الأستاذة هبة EGP tag). **PASSED: 18 ناطق بالعربية / 10 غير ناطق بالعربية**
- [x] T075 [P] **Multi-currency configuration discipline (SC-009)**: run `grep "العملات الثانوية المسموح بها — لا يتم جمعها مع العملة الأساسية في أي ملخص" pages/admin/platform-settings.html | wc -l` and confirm ≥ 1; run `grep -E "EGP|الجنيه المصري" pages/admin/platform-settings.html | wc -l` and confirm ≥ 1. **PASSED: caption=1, EGP mentions=2**
- [x] T076 [P] **Retroactivity-discipline alignment (SC-010)**: run `grep -E 'تسري القاعدة على الفواتير الجديدة فقط|جميع قواعد التسعير' pages/admin/pricing-rules.html | wc -l` and confirm ≥ 2 matches (Q1 callout + footnote). **PASSED: 2 matches**
- [x] T077 [P] **Audit-log export-button discipline (SC-011)**: run `grep 'عرض مرئي فقط — لا يتم تنزيل ملف فعلي' pages/admin/audit-log.html | wc -l` and confirm ≥ 1; run `grep 'تصدير CSV' pages/admin/audit-log.html | wc -l` and confirm ≥ 1. **PASSED: title=1, button text=1**
- [x] T078 [P] **Sanctioned-modal pattern audit (SC-012)**: run `grep -c 'data-modal-open=' pages/admin/user-details.html` and confirm exactly **3**; run `grep -c 'هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً' pages/admin/user-details.html` and confirm ≥ 3. **PASSED: 3 modals / 3 captions**
- [x] T079 [P] **Role-card completeness audit (SC-015)**: run `grep -E '(super_admin|finance_manager|teacher|parent|student|support|operations|admin_assistant)' pages/admin/roles-permissions.html` and confirm matches for all 8 role identifiers (or their Arabic equivalents «المدير العام / مديرة المالية / المعلّم / ولي الأمر / الطالب / موظف الدعم / موظف التشغيل / مساعد إداري»). **PASSED: all 8 Arabic role names present**
- [x] T080 [P] **Notification toggle count audit (SC-016)**: run `grep -c 'type="checkbox"' pages/admin/notification-settings.html` and confirm exactly **28**; visually verify exactly 15 of them carry the `checked` attribute. **PASSED: 28 checkboxes / 15 checked**
- [x] T081 [P] **Spec-006 academic-figures untouched audit**: run `grep -nE '88%|88-100|89-100|ممتاز' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html` and confirm empty output (only `RPT-2026-04-Q03-007` should appear, only in audit-log event 17 per FR-056). **PASSED: zero matches**
- [x] T082 [P] **No-banned-frameworks audit**: run `grep -rE 'react|vue|angular|svelte|alpine|jquery|next|nuxt' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html` and confirm empty output (Constitution I). **PASSED: zero matches**
- [x] T083 [P] **No-API audit**: run `grep -rE 'fetch\(|axios|XMLHttpRequest|api/' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html` and confirm empty output. **PASSED: zero matches**
- [ ] T084 **Manual responsive validation (Constitutional DoD gate 2)**: open each of the 10 pages in a browser at 375px / 768px / 1024px / 1280px breakpoints; verify desktop full sidebar + content; tablet 768-1023px collapses dense surfaces (notably the 19×7 = 133-cell permission matrix on `role-details.html` and the 9-row pricing-rules table) to horizontal-scroll containers via the `min-w-[900px]` utility; mobile <768px collapses the sidebar via the existing main.js drawer; 28-toggle notification grid stacks gracefully (4 channel toggles per row become 2-up grid then 1-up below 480px).
- [ ] T085 **Manual modal smoke-test (Q3 sanctioned modals)**: open `pages/admin/user-details.html` in a browser; click each of the 3 modal-bound buttons («تعطيل الحساب» / «إعادة تعيين كلمة المرور» / «إنهاء جميع الجلسات»); verify each modal opens with the correct title + body + secondary caption «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً» + confirm/cancel buttons; verify «إلغاء» (carrying `data-modal-close`) closes each modal; verify the «تأكيد» button does NOT mutate page state (visual demo only). Confirm the `data-modal-open` / `data-modal-close` attributes match the existing main.js handler at lines 36-44 — these are the only correct attribute names; `data-modal-trigger` / `data-modal-target` are NOT recognized.
- [ ] T086 **Manual SC validation table run** (quickstart.md §"Success Criteria Validation Table"): walk through all 17 SC rows; tick each as passing.
- [ ] T087 **Manual Constitutional DoD verification** (quickstart.md §"Constitutional Definition-of-Done Verification"): walk through all 12 DoD gates; tick each as passing.

**Checkpoint**: All 10 pages shipped, all audits pass, the academy's administrative-control narrative is fully demoable end-to-end. Combined with Specs 001-009, the platform now has a coherent end-to-end story across student / parent / teacher / admin surfaces with full role-based-access governance, multi-currency configuration, retroactivity-disciplined pricing, and cross-cutting audit traceability.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories. The data invariants captured in T006-T011 are the single source of truth for byte-identical cross-page rendering and grep validations.
- **User Stories (Phases 3-5)**: All depend on Foundational completion.
  - **US1 (P1)**: Can start immediately after Foundational. The 5 governance pages share the matrix invariants from T007 — but since the matrix is captured statically in data-model.md, both `role-details.html` and `user-details.html` author from the same source; no functional dependency between them. T072 (Polish-phase byte-identity diff) is the ONLY cross-page check, and it can be deferred to Polish.
  - **US2 (P2)**: Can start after Foundational. No dependencies on US1.
  - **US3 (P3)**: Can start after Foundational. No dependencies on US1 or US2 — but the cross-spec identifiers in audit-log (STL-2026-04-TCH-0042 / INV-2026-0184 / FAM-2023-0211 / RPT-2026-04-Q03-007) come from prior specs, NOT from Spec 010 itself.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 → US2** (none): independent. US1 ships governance pages; US2 ships configuration pages. Nothing in US2 references a US1 page beyond shared sidebar.
- **US1 → US3** (cross-page consistency, not functional): The 5-event activity preview on `user-details.html` (US1 T039) sources events from the 24-event audit-log (US3 T066). If US3 ships before US1, the activity-preview can be authored against the canonical audit-log markup. If US1 ships first, the activity-preview is authored against `data-model.md §E7`'s 5-event subset (which is the canonical source anyway). SC-013 verifies the cross-page consistency at Polish — so order doesn't matter functionally.
- **US2 → US3** (none): independent. Nothing in US3 references US2's pricing-rules / platform-settings / etc. directly (audit events 13 + 18 + 22 reference pricing-rules + roles-permissions + tax-settings updates by name, but as labels — no link).
- **US3 → US1** (audit-log link from user-details): user-details.html's activity-preview block has a CTA «عرض السجل الكامل» → `audit-log.html`. If US1 ships before US3, this CTA 404s until US3 ships. Mitigation: ship US3 before or simultaneously with US1, OR mark the link as visual-only until US3 ships and then activate it.

### Within Each User Story

- The shell task (Tnnn-shell, e.g. T012, T017, T023, T029, T034, T042, T047, T053, T058, T062) MUST complete before content tasks for the same file.
- All [P] content tasks within a single user-story file CAN run in parallel only if they author into distinct sections (`<section id="...">`) of the same HTML file — practical implementation: one developer at a time per file, but multiple developers across files in parallel. The `[P]` markers below are interpreted as "different sections, no inter-section dependencies" — safe to author in any order within a single file.
- The verification task (Tnnn-final, e.g. T016, T022, T028, T033, T041, T046, T052, T057, T061, T067) MUST complete after all content tasks for that page.

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002 + T003).
- All Foundational tasks marked [P] can run in parallel (T005 + T006 + T007 + T008 + T009 + T010 + T011 — 7 verifications, all read-only).
- Once Foundational is done, US1 + US2 + US3 can all start in parallel (if 3 developers available).
- Within a single user story, content tasks marked [P] CAN run in parallel if working on distinct files (e.g., T013-T015 author into roles-permissions; T018-T021 author into role-details — 2 different files in US1).
- Polish phase: 16 [P] audits (T068-T083) are independent and can run in parallel.

---

## Parallel Example: User Story 1 — 5 Governance Pages with Pair-Programming

Once Foundational (Phase 2) completes, two-developer pair work can compress US1 to ~half the time of sequential authoring:

```bash
# Developer A authors the 3 list/governance-hub pages
Task: T012 → T016 (pages/admin/roles-permissions.html — shell + 3 sections + verification)
Task: T029 → T033 (pages/admin/users.html — shell + 4 sections + verification + 1 shared modal)

# Developer B authors the 2 detail/dual-lens-anchor pages + the create-role form
Task: T017 → T022 (pages/admin/role-details.html — shell + 5 sections + verification — includes the MATRIX_ROWS_11_16 markers)
Task: T034 → T041 (pages/admin/user-details.html — shell + 7 sections + 3 modals + verification — includes the MINI_MATRIX markers)
Task: T023 → T028 (pages/admin/create-role.html — shell + 5 sections + verification)
```

The byte-identity gate (T072 in Polish) is the ONLY cross-page verification within US1 — it requires both T020 (role-details matrix) AND T037 (user-details mini-matrix) to be complete. Developer B owns both, ensuring the markers + cell content stay aligned.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003).
2. Complete Phase 2: Foundational (T004-T011 — CRITICAL, blocks all stories).
3. Complete Phase 3: User Story 1 (T012-T041 — 5 governance pages).
4. **STOP and VALIDATE**: Open all 5 pages in browser; verify the Independent Test for US1; tick the relevant SC rows from quickstart.md.
5. Run T072 (matrix byte-identity diff) early — it should pass once T020 + T037 are both done.
6. Demo as **MVP**: the super-admin's complete governance review is reviewable end-to-end. Note: the «عرض السجل الكامل» link on user-details.html will 404 until US3 ships — flag this as a known pre-MVP limitation.

### Incremental Delivery (recommended for Spec 010)

1. Setup + Foundational → Foundation ready.
2. Add US1 (5 governance pages) → Test independently → Demo MVP.
3. Add US3 (1 audit page) → Test independently → Demo. Why US3 second: the audit-log resolves the «عرض السجل الكامل» link from user-details.html (US1 T039); shipping US3 second means all US1 CTAs resolve from then on.
4. Add US2 (4 configuration pages) → Test independently → Demo.
5. Polish (T068-T087) → Final size audit + grep audits + manual responsive + modal smoke-test → Done.

### Parallel Team Strategy

With multiple developers, after Foundational:

- **Developer A**: US1 (T012-T041) — 5 governance pages. Owns the matrix byte-identity discipline (MATRIX_ROWS_11_16 ↔ MINI_MATRIX).
- **Developer B**: US2 (T042-T061) — 4 configuration pages. Owns the multi-currency-never-summed caption + Q1 retroactivity callout + 28-toggle grid.
- **Developer C**: US3 (T062-T067) — 1 audit page. Owns the cross-spec traceability + Q2 export-button discipline + IP-masking convention.

The 3 user stories are sequence-independent until the Polish-phase audits run — T072 specifically requires US1 done; T073 requires US3 done.

---

## Notes

- [P] tasks on the same HTML file = "distinct sections of the same file"; safe to author in any order, but a single developer typically works one file at a time.
- [P] tasks on different files = truly parallel (different developers).
- [Story] label maps task to specific user story for traceability; Setup / Foundational / Polish tasks have NO story label.
- Each user story should be independently completable and testable per its Independent Test in spec.md.
- This is a static-frontend prototype — there are NO unit/integration tests in scope. Validation is via manual visual review + grep audits (quickstart.md).
- Commit after each task or logical group (`/speckit-git-commit` is the optional after-implement hook).
- Stop at any checkpoint to validate story independently.
- Avoid: vague tasks, same-file conflicts within parallel work, cross-story dependencies that break independence.
- The single cross-page byte-identity gate (T072 — role-details MATRIX_ROWS_11_16 ↔ user-details MINI_MATRIX) is the SC-005 anchor — do not skip it. The HTML comment markers (`<!-- MATRIX_ROWS_11_16_START -->` / `<!-- MATRIX_ROWS_11_16_END -->` on role-details.html, `<!-- MINI_MATRIX_START -->` / `<!-- MINI_MATRIX_END -->` on user-details.html) are the alignment anchors — do not rename them.
