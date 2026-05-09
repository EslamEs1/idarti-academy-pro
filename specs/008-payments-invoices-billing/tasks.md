# Tasks: Payments, Invoices, Tax Settings & Family Balance Frontend

**Input**: Design documents from `/specs/008-payments-invoices-billing/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: This is a static-frontend prototype. The spec does NOT request automated tests. Validation is via manual visual review + grep-based audits documented in quickstart.md §2 (15-row SC validation table) + §3 (12-gate Constitutional DoD).

**Organization**: Tasks are grouped by user story (US1 = Student/parent finance — P1; US2 = Admin operations — P2; US3 = Admin configuration — P3) so each story can be independently delivered, validated, and demoed. Each story is an MVP increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1 / US2 / US3)
- Setup / Foundational / Polish tasks have NO story label
- Include exact file paths in descriptions

## Path Conventions

- Static HTML pages live under `pages/<role>/` at the repository root.
- Shared CSS bundle: `assets/css/output.css` (rebuilt once during Polish).
- Shared JS handler: `assets/js/main.js` (NOT modified — zero new JS in this feature).
- Spec design docs: `specs/008-payments-invoices-billing/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the working environment + project state before authoring any new HTML.

- [ ] T001 Verify the branch is `008-payments-invoices-billing` and `.specify/feature.json` points at `specs/008-payments-invoices-billing` (run `git branch --show-current` + `cat .specify/feature.json`).
- [ ] T002 [P] Verify shared assets baseline: `wc -l assets/js/main.js` returns 68 (Spec 001/005/006/007 baseline) and `assets/css/output.css` exists at the Spec 007 baseline size.
- [ ] T003 [P] Verify all 10 sidebar inbound links already point to the new file paths via `grep -h -o 'href="[^"]*\(payment-history\|invoices\|invoice-details\|family-balance\|family-balances\|payments\|tax-settings\|create-manual-payment\)\.html"' pages/*/*.html | sort -u` — confirms zero prior-spec edits will be needed for sidebar correctness (per research.md §R20).

**Checkpoint**: Working environment confirmed; spec docs / assets / inbound links all aligned.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Capture the shared shell partials + lock the anchor sample-data tables so every page authors against the SAME numbers.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete. The arithmetic invariants captured here are the single source of truth for byte-identical cross-page rendering.

- [ ] T004 Capture the **student sidebar** verbatim from `pages/student/dashboard.html` (Spec 002 baseline; updated through Spec 007). Save as a working snippet to be embedded byte-identically into both `payment-history.html` and `invoice-details.html` with only the `aria-current="page"` + `is-active` indicator changing per page (active = "Payment History" on both new student pages; per research.md §R13).
- [ ] T005 Capture the **parent sidebar** verbatim from `pages/parent/dashboard.html`. Save as a working snippet for `parent/invoices.html` (active = "Invoices") and `parent/family-balance.html` (active = "Family Balance").
- [ ] T006 Capture the **admin sidebar** verbatim from `pages/admin/dashboard.html`. Save as a working snippet for the 6 admin pages with the appropriate active entry per research.md §R13: payments → "Payments"; invoices + invoice-details → "Invoices"; tax-settings → "Tax Settings"; family-balances → "Family Balances"; create-manual-payment → "Payments" (sub-flow).
- [ ] T007 [P] Capture the **header chrome** (search input + bell-as-anchor + profile dropdown + role-specific greeting) from each role's prior-spec dashboard: student greeting "عبد الرحمن مؤمن", parent greeting "ولي أمر الطالب عبد الرحمن", admin greeting "إدارة الأكاديمية".
- [ ] T008 [P] Verify the **anchor invoice INV-2026-0184 arithmetic** in research.md §R6: subtotal 380.00 + VAT 15% (57.00) = total 437.00 ريال; payment streams sum (200 Mada + 170 bank + 67 auto-balance = 437) matches total. Lock these values for use on student/invoice-details.html, admin/invoice-details.html, parent/invoices.html (row 7), and the persona's payment-history row 4.
- [ ] T009 [P] Verify the **family-balance ledger arithmetic** in research.md §R7: 7 rows (+500, -100, +60, -10, -67, +200, -133) sum to 450.00 ريال. Lock these values for parent/family-balance.html and the admin/family-balances.html FAM-2023-0211 row.
- [ ] T010 [P] Verify the **persona payment-history math** in research.md §R8: Total Paid summary card = 437 (INV-2026-0184) + 437 (INV-2026-0137) + 60 (INV-SES-2026-0205 partial) = **934.00 ريال**; Under Review row (69) excluded. Lock these values for student/payment-history.html.

**Checkpoint**: Foundation ready — all shells captured + all anchor arithmetic verified. User-story work can now begin (in parallel if multiple developers are available).

---

## Phase 3: User Story 1 — Student & Parent See Family Finances (Priority: P1) 🎯 MVP

**Goal**: Deliver the four customer-facing finance pages (student/payment-history + student/invoice-details + parent/invoices + parent/family-balance) so the persona's family can review their financial state end-to-end.

**Independent Test**: Open `pages/student/payment-history.html` and verify all four summary cards (934.00 / 2 / 437.00 / 450.00) + the 6-badge legend strip + the 7-row table demonstrating all 6 statuses; click "عرض الفاتورة" on the INV-2026-0184 row → confirm `pages/student/invoice-details.html` opens with the 8-line breakdown, 3-stream payment panel (with the "تلقائي" pill on stream 3), and 4-item-type reference panel; navigate to `pages/parent/invoices.html` → verify both children's invoices appear with filter chips by الطفل / الحالة / الشهر AND that Sister Sara's overdue INV-2026-0188 row is danger-tinted with a visible "ادفع الآن" CTA; finally navigate to `pages/parent/family-balance.html` → confirm the 450.00 ريال hero card, 4-tile sub-summary, and 7-row balance-history table demonstrating all 4 transaction types with the "تلقائي" pill on the 2026-04-30 row. No JS dependencies beyond the existing sidebar drawer; pages render under RTL.

### Implementation for User Story 1

#### `pages/student/payment-history.html` (per `contracts/student-payment-history.md`)

- [ ] T011 [US1] Author `pages/student/payment-history.html` shell: `<html lang="ar" dir="rtl">` + `<head>` (Tajawal, output.css link) + body shell with the captured student sidebar (active = "Payment History"), header chrome with greeting "عبد الرحمن مؤمن", and footer.
- [ ] T012 [P] [US1] Author `#ph-header` (h1 "سجل المدفوعات" + subtitle) and `#ph-summary` (4 summary cards with values from research.md §R8 — 934.00 / 2 / 437.00 due 2026-05-15 / 450.00) inside `pages/student/payment-history.html`.
- [ ] T013 [P] [US1] Author `#ph-legend` (6-badge inline legend strip using the research.md §R12 vocabulary: مدفوعة / غير مدفوعة / مدفوعة جزئياً / متأخّرة / ملغاة / تحت المراجعة) inside `pages/student/payment-history.html`.
- [ ] T014 [P] [US1] Author `#ph-table` 7-row payment table per `contracts/student-payment-history.md` table — anchor rows: INV-2026-0231 (Unpaid), INV-SES-2026-0212 (Under Review), INV-SES-2026-0205 (Partially Paid 60/115), INV-2026-0184 (Paid via 3 streams), INV-2026-0137 (Paid), INV-SES-2026-0156 (Cancelled), INV-SES-2026-0098 (Overdue 74-day duration text + alert-triangle + danger row tint). Per-row "عرض الفاتورة" CTA on row 4 → `invoice-details.html`.
- [ ] T015 [US1] Author `#ph-tax-footer` caption and verify `pages/student/payment-history.html`: every link resolves to a real existing file; status badges pair color + text + icon; SAR rendered as "ريال" only (no "SAR" / "ر.س"); LATIN digits inside Arabic per FR-005.

#### `pages/student/invoice-details.html` (per `contracts/student-invoice-details.md`)

- [ ] T016 [US1] Author `pages/student/invoice-details.html` shell with the same student sidebar (active = "Payment History" — deep-read of same surface) and header chrome.
- [ ] T017 [P] [US1] Author `#inv-breadcrumb` ("سجل المدفوعات / فاتورة INV-2026-0184") + `#inv-header` (INV number / 2026-04-01 / 2026-04-30 / status badge "مدفوعة" success-tone + caption "أُغلقت تلقائياً بتطبيق رصيد العائلة في تاريخ الاستحقاق") inside `pages/student/invoice-details.html`.
- [ ] T018 [P] [US1] Author `#inv-student` (عبد الرحمن مؤمن / الصف السادس / مسار القرآن — المستوى الثالث / STD-2024-0817) + `#inv-family` (ولي أمر الطالب عبد الرحمن / FAM-2023-0211 / إخوة سارة) inside `pages/student/invoice-details.html`.
- [ ] T019 [P] [US1] Author `#inv-items` (1-row line-items table for INV-2026-0184 — 380.00 ريال course subscription with hyperlink to `course-details.html` per FR-027) + `#inv-types-ref` (4-item-type reference panel per `contracts/student-invoice-details.md`) inside `pages/student/invoice-details.html`.
- [ ] T020 [P] [US1] Author `#inv-breakdown` (8-line breakdown from research.md §R6: 380 / 0 / 57 / 67 / 437 / 0 / 437 / مدفوعة) + `#inv-streams` (3-stream chronological list with "تلقائي" pill on the 2026-04-30 67.00 row) inside `pages/student/invoice-details.html`.
- [ ] T021 [P] [US1] Author `#inv-actions` (2 visual download buttons "تنزيل الفاتورة (PDF)" + "تنزيل إيصال الدفع (PDF)") + `#inv-tax-footer` caption inside `pages/student/invoice-details.html`.
- [ ] T022 [US1] Verify `pages/student/invoice-details.html`: financial figures byte-identical to research.md §R6 table; cross-link `course-details.html` exists in `pages/student/`; download buttons are `<button type="button">` (no `<a download>`); breadcrumb back-link to `payment-history.html` works.

#### `pages/parent/invoices.html` (per `contracts/parent-invoices.md`)

- [ ] T023 [US1] Author `pages/parent/invoices.html` shell with the parent sidebar (active = "Invoices") + header chrome (greeting "ولي أمر الطالب عبد الرحمن").
- [ ] T024 [P] [US1] Author `#pi-header` + `#pi-summary` (4 summary tiles: 11 / 2 / 2 / 906.00 ريال) + `#pi-balance-caption` (info-tinted strip linking to `family-balance.html`) inside `pages/parent/invoices.html`.
- [ ] T025 [P] [US1] Author `#pi-filters` (3 controls: child chips / status dropdown / month dropdown — visual only) inside `pages/parent/invoices.html`.
- [ ] T026 [P] [US1] Author `#pi-table` (≥ 8 rows spanning both children per `contracts/parent-invoices.md` — anchor rows include Sara's overdue INV-2026-0188 with red row tint + "ادفع الآن" CTA, persona's overdue INV-SES-2026-0098, persona's INV-2026-0184 paid, and the status×CTA matrix per FR-034) inside `pages/parent/invoices.html`.
- [ ] T027 [US1] Verify `pages/parent/invoices.html`: per-row CTAs route correctly per FR-034 status×CTA matrix; persona invoice cross-link → `../student/invoice-details.html`; family-balance caption links to `family-balance.html`.

#### `pages/parent/family-balance.html` (per `contracts/parent-family-balance.md`)

- [ ] T028 [US1] Author `pages/parent/family-balance.html` shell with the parent sidebar (active = "Family Balance") + header chrome.
- [ ] T029 [P] [US1] Author `#fb-header` (h1 + subtitle + top-right `إضافة رصيد` visual CTA) + `#fb-hero` (cream/parchment hero card showing 450.00 ريال + last-update 2026-05-08 + children sub-line) inside `pages/parent/family-balance.html`.
- [ ] T030 [P] [US1] Author `#fb-summary` 4-tile sub-summary (إجمالي الإيداعات +700 / إجمالي المُستخدَم -167 / إجمالي المُستردّ +60 / إجمالي التسويات -143 — note the negative red-tinted minus on the last tile) inside `pages/parent/family-balance.html`.
- [ ] T031 [P] [US1] Author `#fb-history` 7-row balance-history table per research.md §R7 — verify columns include التاريخ / نوع المعاملة / المبلغ / بواسطة / الفاتورة المرتبطة / ملاحظة الإدارة / الرصيد بعد المعاملة; row 5 carries the "تلقائي" pill (info-50 + bolt icon).
- [ ] T032 [US1] Author `#fb-explainer` caption ("يمكن للعائلة الإيداع مقدّماً لتسديد الفواتير القادمة تلقائياً.") and verify `pages/parent/family-balance.html`: 7-row sum = 450.00 ريال; all 4 transaction types present; row 5 visually distinct via "تلقائي" pill.

**Checkpoint**: User Story 1 (P1) complete. The four customer-facing finance pages are independently functional and demoable as MVP. The persona's family can review their full financial state without leaving the customer surfaces.

---

## Phase 4: User Story 2 — Admin Operates Payments and Invoices (Priority: P2)

**Goal**: Deliver the three admin operational pages (admin/payments + admin/invoices + admin/invoice-details) so the academy team can triage payments, manage invoices, and deep-dive on individual invoices with admin-only audit trail panels.

**Independent Test**: Open `pages/admin/payments.html` and verify 5 summary cards + 5 filter controls + 10-row table with diverse statuses/methods/families and at least 1 EGP row; navigate to `pages/admin/invoices.html` and verify 5 summary cards + 6 filter controls (including the "ناطق بالعربية / غير ناطق بالعربية" student-type chips per Q3) + bulk-action affordance + 12-row table spanning all 6 statuses + both student types + both currencies + all 4 item types; navigate to `pages/admin/invoice-details.html` and verify the same anchor invoice INV-2026-0184 with byte-identical financial figures to the student-side page + 3 admin-only panels (timeline / balance-usage / admin notes) + 5-button action bar (تعليم كمدفوعة / إضافة دفعة / تطبيق رصيد العائلة / تنزيل / إلغاء الفاتورة with danger-tone separator).

### Implementation for User Story 2

#### `pages/admin/payments.html` (per `contracts/admin-payments.md`)

- [ ] T033 [US2] Author `pages/admin/payments.html` shell with the admin sidebar (active = "Payments") + header chrome (greeting "إدارة الأكاديمية") + persistent top-right `إنشاء دفعة يدوية` CTA → `create-manual-payment.html`.
- [ ] T034 [P] [US2] Author `#ap-header` + `#ap-summary` (5 summary cards: مدفوع اليوم 1,610.00 / مدفوع هذا الشهر 12,856.00 / تحت المراجعة 138.00 / فاشل 437.00 / إجمالي السنة 64,392.00 — each with count chip) inside `pages/admin/payments.html`.
- [ ] T035 [P] [US2] Author `#ap-filters` (5 controls: status dropdown / method dropdown / date-range / student search / family search — visual only) inside `pages/admin/payments.html`.
- [ ] T036 [P] [US2] Author `#ap-table` 10-row table per research.md §R17 (rows 1-10 anchored: Mada 200 / bank 170 / auto-balance 67 / Mada 60 / Under Review receipt 69 / Failed Visa 437 / STC Pay 322 / **EGP bank transfer 1,710** / Refunded 540 / **balance-deposit 200 with invoice column = "—"**) inside `pages/admin/payments.html`.
- [ ] T037 [US2] Verify `pages/admin/payments.html`: ≥ 1 EGP row present; ≥ 1 row with method "رصيد العائلة (تلقائي)"; ≥ 1 balance-deposit row (no linked invoice); per-row "عرض" CTA links to invoice-details.html where applicable; "إنشاء دفعة يدوية" CTA links to create-manual-payment.html.

#### `pages/admin/invoices.html` (per `contracts/admin-invoices.md`)

- [ ] T038 [US2] Author `pages/admin/invoices.html` shell with the admin sidebar (active = "Invoices") + header chrome.
- [ ] T039 [P] [US2] Author `#ai-header` + `#ai-summary` (5 summary cards: إجمالي 142 / مدفوعة 98 / غير مدفوعة 28 / مدفوعة جزئياً 6 / متأخّرة 10 — each with count + amount-sum chip preserving currency separation) inside `pages/admin/invoices.html`.
- [ ] T040 [P] [US2] Author `#ai-filters` 6 controls inside `pages/admin/invoices.html`: حالة الدفع chip group / **نوع الطالب** chips "ناطق بالعربية" + "غير ناطق بالعربية" per Q3 / نوع البند dropdown / الشهر dropdown / العملة chips / search input.
- [ ] T041 [P] [US2] Author `#ai-bulk` (master-checkbox column header + "إجراءات مجمّعة" dropdown styled `aria-disabled="true"` for the no-rows-selected state) inside `pages/admin/invoices.html`.
- [ ] T042 [P] [US2] Author `#ai-table` 12-row table per research.md §R18 — verify all 6 statuses + both student types (≥ 2 "غير ناطق بالعربية" rows: STD-2024-1207 Hosni + STD-2024-1311 عبدالله رحمن or STD-2024-1402 يوسف عبد الكريم) + both currencies (≥ 2 EGP rows) + all 4 item types (دورة كاملة / حصة مباشرة / حصة خاصة / حصة جماعية + رسوم تسجيل tax-exempt) appear; per-row "عرض" CTA → `invoice-details.html`.
- [ ] T043 [US2] Verify `pages/admin/invoices.html`: bulk-action dropdown is visually disabled when no rows selected (CSS state only); per-row checkboxes are present; student-type badges use distinct tones per research.md §R12.

#### `pages/admin/invoice-details.html` (per `contracts/admin-invoice-details.md`)

- [ ] T044 [US2] Author `pages/admin/invoice-details.html` shell with the admin sidebar (active = "Invoices" — deep-read of same surface) + header chrome + breadcrumb "الفواتير / فاتورة INV-2026-0184".
- [ ] T045 [P] [US2] Author `#aid-header` (status "مدفوعة" + auto-close caption — byte-identical to student/invoice-details.html per research.md §R15) + `#aid-student` + `#aid-family` + `#aid-items` (same line-item) + `#aid-breakdown` (same 8-line table) + `#aid-vat` (callout with tax number 312345678900003 + footnote tooltip → `tax-settings.html`) inside `pages/admin/invoice-details.html`.
- [ ] T046 [P] [US2] Author `#aid-timeline` 3-event Payment-records timeline per research.md §R6: 2026-04-12 Mada 200 / AHMED.K, 2026-04-25 bank transfer 170 / SARA.M, 2026-04-30 auto-applied balance 67 / نظام تلقائي **(تلقائي pill)** inside `pages/admin/invoice-details.html`.
- [ ] T047 [P] [US2] Author `#aid-balance-usage` panel (-67.00 ريال entry tied to FAM-2023-0211 + cross-link "عرض رصيد العائلة" → `family-balances.html`) + `#aid-admin-notes` panel (≥ 2 entries from FR-074 — SARA.M whatsapp reminder + nameless system note about auto-application) inside `pages/admin/invoice-details.html`.
- [ ] T048 [P] [US2] Author `#aid-actions` 5-button action bar inside `pages/admin/invoice-details.html`: تعليم كمدفوعة (success) / إضافة دفعة (primary, real `<a href="create-manual-payment.html">`) / تطبيق رصيد العائلة (info) / تنزيل (neutral) / **إلغاء الفاتورة** (danger, vertical-divider-separated). All non-link buttons are `<button type="button">` visual stubs.
- [ ] T049 [US2] **Critical SC-003 cross-page byte-identity verification**: open `pages/student/invoice-details.html` and `pages/admin/invoice-details.html` side-by-side; confirm subtotal 380 / discount 0 / VAT 57 / balance-used 67 / paid 437 / remaining 0 / total 437 / status مدفوعة all match byte-identically; payment-stream amounts (200 / 170 / 67) match; timeline actor names appear only on the admin page.

**Checkpoint**: User Story 2 (P2) complete. The three admin operational pages are independently functional. Stories 1 + 2 together deliver the customer + operations finance experience.

---

## Phase 5: User Story 3 — Admin Configures Tax / Manages Balances / Records Manual Payments (Priority: P3)

**Goal**: Deliver the three admin configuration pages (admin/tax-settings + admin/family-balances + admin/create-manual-payment) so the academy can configure VAT, manage families' prepaid balances, and record manual money-in events.

**Independent Test**: Open `pages/admin/tax-settings.html` and verify VAT toggle ON + 15% input + Saudi country selected (Egypt as alternative) + 4 apply-to checkboxes (3 checked, registration fees unchecked) + tax number 312345678900003 + footer-note textarea + KSA/Egypt example-invoice cards side-by-side (380→437 ريال / 1500→1710 EGP); navigate to `pages/admin/family-balances.html` and verify 3 currency-separated summary tiles + filter strip + 6-row families table including 1 zero-balance row + 2 EGP rows; click the top-right `إنشاء حركة رصيد` CTA → confirm it routes to `create-manual-payment.html#deposit` (NOT `href="#"`); navigate to `pages/admin/create-manual-payment.html` and verify the 2-mode form: invoice-payment mode (default — pre-filled with عائلة مؤمن / عبد الرحمن / INV-2026-0231 / 437.00 / تحويل بنكي / 2026-05-10) + balance-deposit mode (sentinel option in invoice select + "إيداع رصيد" method option).

### Implementation for User Story 3

#### `pages/admin/tax-settings.html` (per `contracts/admin-tax-settings.md`)

- [ ] T050 [US3] Author `pages/admin/tax-settings.html` shell with the admin sidebar (active = "Tax Settings") + header chrome.
- [ ] T051 [P] [US3] Author `#ts-header` (h1 + subtitle + informational callout about registration-fee exemption + non-retroactive policy) + `#ts-toggle` (Tax-enabled toggle in ON state with success-tone + sub-caption) inside `pages/admin/tax-settings.html`.
- [ ] T052 [P] [US3] Author `#ts-form` configuration form inside `pages/admin/tax-settings.html`: نسبة الضريبة input (15) + الدولة dropdown (Saudi selected, Egypt alternative — both with format hints) + 4-checkbox apply-to group (الدورات الكاملة ✓ / الحصص المباشرة ✓ / الحصص الخاصة ✓ / **رسوم التسجيل ☐** unchecked) + الرقم الضريبي input (312345678900003) + ملاحظة تذييل الفاتورة textarea (default text from FR-085).
- [ ] T053 [P] [US3] Author `#ts-preview` 2-card example-invoice preview per research.md §R19 — KSA card (380 → 57 → 437 ريال + tax number 312345678900003) and Egypt card (1500 → 210 → 1710 EGP + 9-digit Egyptian format hint) side-by-side at desktop breakpoint, stacked at mobile.
- [ ] T054 [P] [US3] Author `#ts-actions` (Save + Cancel buttons — visual only) inside `pages/admin/tax-settings.html`.
- [ ] T055 [US3] Verify `pages/admin/tax-settings.html`: every form field has visible `<label for>`; example-cards math verified (380×1.15=437, 1500×1.14=1710); no JS toggle handlers — toggle renders ON via static state.

#### `pages/admin/family-balances.html` (per `contracts/admin-family-balances.md`)

- [ ] T056 [US3] Author `pages/admin/family-balances.html` shell with the admin sidebar (active = "Family Balances") + header chrome + top-right `إنشاء حركة رصيد` primary CTA → `create-manual-payment.html#deposit` (per Q4).
- [ ] T057 [P] [US3] Author `#fbal-header` + `#fbal-summary` 3-tile summary inside `pages/admin/family-balances.html` — currencies NEVER summed across tiles: عدد العائلات 142 / إجمالي الرصيد بالريال 18,540.00 / إجمالي الرصيد بالجنيه 4,820.00.
- [ ] T058 [P] [US3] Author `#fbal-filters` (search input + currency chips ريال / EGP / الكل + zero-balance toggle — visual only) inside `pages/admin/family-balances.html`.
- [ ] T059 [P] [US3] Author `#fbal-table` 6-row families table per `contracts/admin-family-balances.md` inside `pages/admin/family-balances.html`: row 1 مؤمن 450 ريال / row 2 الحارثي 1,200 ريال / row 3 العتيبي **0.00 ريال** zero-balance / row 4 المنصور 850 ريال / row 5 حسن 380 EGP / row 6 Hosni 1,540 EGP. Per-row 4-icon action menu: عرض / إضافة رصيد (→ create-manual-payment.html#deposit) / خصم (visual stub) / تسوية (visual stub).
- [ ] T060 [US3] Verify `pages/admin/family-balances.html`: row 1 "عرض" cross-links to `../parent/family-balance.html` (FAM-2023-0211 detail = parent surface); zero-balance row uses neutral-200 tint with "بدون رصيد" caption (NOT danger-tone); EGP and SAR rows visually distinct via currency badges per research.md §R12.

#### `pages/admin/create-manual-payment.html` (per `contracts/admin-create-manual-payment.md`)

- [ ] T061 [US3] Author `pages/admin/create-manual-payment.html` shell with the admin sidebar (active = "Payments" — sub-flow) + header chrome + breadcrumb "المدفوعات / إنشاء دفعة يدوية" + mode pill (default "وضع: تسديد فاتورة").
- [ ] T062 [P] [US3] Author `#cmp-form` cascading dropdowns inside `pages/admin/create-manual-payment.html`: العائلة select with ≥ 6 options (عائلة مؤمن preselected), الطالب select pre-filtered to Mu'min children (عبد الرحمن preselected), **الفاتورة select with INV-2026-0231 preselected + sentinel option "— إيداع رصيد للعائلة بدون فاتورة محددة —"** for balance-deposit mode (per Q4).
- [ ] T063 [P] [US3] Author `#cmp-form` data-entry fields inside `pages/admin/create-manual-payment.html`: المبلغ المدفوع input (default 437.00) + currency badge ريال + طريقة الدفع select (≥ 7 options grouped under "إيداع للعائلة" + "تسديد فاتورة" subheadings, تحويل بنكي pre-selected) + تاريخ الدفع input (default 2026-05-10) + ملاحظات textarea (with placeholder).
- [ ] T064 [P] [US3] Author `#cmp-upload` (visual drop-zone with dashed border + cloud-upload icon + 5MB hint, NO `<input type="file">` change handler) + `#cmp-actions` (Save primary + Cancel secondary linking to `payments.html` + after-save info caption explaining mode-aware destinations) inside `pages/admin/create-manual-payment.html`.
- [ ] T065 [US3] Verify `pages/admin/create-manual-payment.html`: every form field has visible `<label for>`; cascading dropdowns are pre-rendered (no JS); both operational modes (invoice-payment + balance-deposit) are documented via the sentinel option + grouped method options + mode-aware after-save caption.

**Checkpoint**: User Story 3 (P3) complete. All three admin configuration pages are independently functional. The full 10-page finance feature is now structurally complete across student / parent / admin roles.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: One-time CSS rebuild + comprehensive validation against the 15-row Success Criteria table + 12-gate Constitutional Definition-of-Done + zero-prior-spec-edits audit.

### CSS rebuild

- [ ] T066 Run `npm run build:css` from repo root (one-shot Tailwind JIT regeneration of `assets/css/output.css` to pick up any new utility classes referenced by the 10 new HTML files — e.g., `border-dashed` on the receipt-upload affordance, `font-tabular-nums` on numeric columns, etc.).
- [ ] T067 [P] Verify CSS bundle size — `wc -c assets/css/output.css` MUST be ≤ 81920 bytes (80 KB ceiling per Spec 001 / SC-013).
- [ ] T068 [P] Verify zero new JS — `wc -l assets/js/main.js` MUST equal 68 (Spec 001/005/006/007 baseline; SC-014).

### Success Criteria validation (quickstart.md §2)

- [ ] T069 [P] Run **SC-001** check: `ls pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html` — all 10 must exist; manually verify active sidebar entry per page per research.md §R13.
- [ ] T070 [P] Run **SC-002** + **SC-011** manual scan: open `pages/student/payment-history.html` and confirm all 6 status badges visible in `#ph-legend` strip + table rows within 10s; row 7 (INV-SES-2026-0098 overdue) carries danger-tone red + "متأخّر منذ 74 يوم" + alert-triangle icon (color is never the sole indicator).
- [ ] T071 [P] Run **SC-003** end-to-end trace: payment-history → click "عرض الفاتورة" on INV-2026-0184 row → confirm 8-line breakdown + 3 streams; switch to admin → open admin/invoice-details.html → confirm byte-identical figures + 3 admin-only panels + 5-action bar; total time ≤ 90s; zero broken links.
- [ ] T072 [P] Run **SC-004** + **SC-015** zero-broken-links + zero-`href="#"` grep across all 10 new pages. Both queries MUST return zero matches.
- [ ] T073 [P] Run **SC-005** math verification on `pages/student/payment-history.html`: Total Paid summary card "934.00 ريال" = 437 + 437 + 60 (sum of {Paid + Partially-Paid paid amounts}); 69 from Under Review row NOT included.
- [ ] T074 [P] Run **SC-006** VAT-line ubiquity grep: `grep -c 'ضريبة\|15%\|14%' pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html | awk -F: '{sum+=$2} END {print sum}'` MUST be ≥ 25.
- [ ] T075 [P] Run **SC-007** multi-currency 3-surface presence: `grep -l 'EGP' pages/admin/payments.html pages/admin/family-balances.html pages/admin/tax-settings.html pages/admin/invoices.html` MUST return all 4 file matches.
- [ ] T076 [P] Run **SC-008** four-balance-types presence on `pages/parent/family-balance.html`: `grep -E 'إيداع|استخدام للفاتورة|استرداد|تسوية' pages/parent/family-balance.html | sort -u | wc -l` MUST be ≥ 4.
- [ ] T077 [P] Run **SC-009** currency-label correctness — student/parent surfaces MUST NOT contain "SAR" / "ر.س" / "$" / "USD"; admin EGP usage MUST be the Latin code "EGP" (not "£" / "ج.م").
- [ ] T078 [P] Run **SC-010** manual visual: open `pages/admin/invoices.html`, confirm `#ai-bulk` master checkbox + "إجراءات مجمّعة" dropdown visible above `#ai-table` even with no rows selected.
- [ ] T079 [P] Run **SC-012** Spec 006 academic-figures untouched: `grep -l 'RPT-2026-04-Q03-007\|92%\|88-100\|89-100\|ممتاز' pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html` MUST return zero matches.

### Constitutional Definition-of-Done (quickstart.md §3, 12 gates)

- [ ] T080 [P] Manual visual review at 4 breakpoints (375 / 768 / 1024 / 1280 px) for all 10 new pages — Constitutional Gate 2 (responsive across desktop / tablet / mobile).
- [ ] T081 [P] Verify Constitutional Gates 4 + 6 + 12 — header + sidebar consistent across pages within each role; visual professionalism per Spec 001 design tokens; RTL rendering correct on every page.
- [ ] T082 [P] Verify Constitutional Gates 7 + 8 + 9 — no banned framework strings (`grep -nrE 'react|vue|angular|svelte|next|nuxt|alpine|jquery' pages/008* assets/`); no API call patterns (`grep -nrE 'fetch\(|axios|XMLHttpRequest|api/' pages/008*`); single output.css consumed.

### Zero-prior-spec-edits audit

- [ ] T083 Run `git status` from repo root. The output MUST show ONLY these 11 staged paths: `assets/css/output.css` + `pages/student/payment-history.html` + `pages/student/invoice-details.html` + `pages/parent/invoices.html` + `pages/parent/family-balance.html` + `pages/admin/payments.html` + `pages/admin/invoices.html` + `pages/admin/invoice-details.html` + `pages/admin/tax-settings.html` + `pages/admin/family-balances.html` + `pages/admin/create-manual-payment.html`. Plus the spec docs under `specs/008-payments-invoices-billing/` (these are this spec's own deliverables, not "prior-spec edits"). If any other file outside those paths shows `modified` (e.g., a Spec 002-007 page like `pages/student/dashboard.html`), the implementation has violated the zero prior-spec edits discipline — investigate and revert.

### Final validation gates

- [ ] T084 Run quickstart.md §3 12-gate checklist end-to-end and tick all 12 boxes.
- [ ] T085 Final `git diff --stat` review — confirm the diff matches the expected 11 files + spec docs; no surprise changes.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** — T001-T003 — no dependencies, can start immediately.
- **Foundational (Phase 2)** — T004-T010 — depends on Setup. **BLOCKS all user stories** because shell partials and anchor arithmetic must be locked before page authoring begins.
- **User Stories (Phases 3-5)** — depend on Foundational complete.
  - Stories can proceed in parallel with multiple developers (US1, US2, US3 are independent).
  - Or sequentially in priority order (P1 → P2 → P3) for solo development.
- **Polish (Phase 6)** — T066-T085 — depends on ALL desired user stories complete. T066 (CSS rebuild) MUST run after every page is authored so the JIT scan picks up every new utility in a single pass.

### User Story Dependencies

- **US1 (P1) — Student & Parent finance**: Independent of US2 / US3. Anchor invoice INV-2026-0184 figures are shared with US2 (admin/invoice-details.html) but the spec mandates byte-identical rendering, so authoring order is interchangeable as long as both consume research.md §R6.
- **US2 (P2) — Admin operations**: Independent of US1 / US3. Cross-references US1's INV-2026-0184 anchor (T049 byte-identity verification) but does NOT require US1 pages to exist before US2 pages are authored.
- **US3 (P3) — Admin configuration**: Independent of US1 / US2. Tax-settings.html is referenced by SC-006 / VAT-callout footnotes on invoice-detail pages, but those footnotes use a real-link `<a href="tax-settings.html">` that resolves once both files exist.

### Within Each User Story

- **Shell first**: page shell (head + sidebar + header + footer) MUST be authored before main-content sections (it provides the document structure).
- **Sections in parallel**: once the shell is in place, multiple `#anchor` sections can be authored in parallel by different developers (or in any order by a single developer).
- **Verification last**: each page's verification task (the last task in its block — T015 / T022 / T027 / T032 / T037 / T043 / T049 / T055 / T060 / T065) runs after all that page's sections are complete.

### Parallel Opportunities

- T002 + T003 can run in parallel within Setup.
- T005 + T006 + T007 can run in parallel within Foundational (different sidebar source files).
- T008 + T009 + T010 can run in parallel within Foundational (different arithmetic verifications, no file writes).
- Within US1: after the 4 shell tasks (T011 + T016 + T023 + T028) complete, all the `#anchor` section tasks (T012-T014, T017-T021, T024-T026, T029-T031) are parallelizable across developers because each writes to a distinct page.
- Within US2: similarly T034-T036 / T039-T042 / T045-T048 are parallelizable.
- Within US3: similarly T051-T054 / T057-T059 / T062-T064 are parallelizable.
- Phase 6 tasks T067-T082 are nearly all parallelizable (different validators against different files).

---

## Parallel Example: User Story 1 (after shells in place)

```bash
# After T011 + T016 + T023 + T028 complete (all 4 page shells exist),
# 13 section-authoring tasks can run in parallel:

Task: "T012 Author #ph-header + #ph-summary in pages/student/payment-history.html"
Task: "T013 Author #ph-legend in pages/student/payment-history.html"
Task: "T014 Author #ph-table in pages/student/payment-history.html"
Task: "T017 Author #inv-breadcrumb + #inv-header in pages/student/invoice-details.html"
Task: "T018 Author #inv-student + #inv-family in pages/student/invoice-details.html"
Task: "T019 Author #inv-items + #inv-types-ref in pages/student/invoice-details.html"
Task: "T020 Author #inv-breakdown + #inv-streams in pages/student/invoice-details.html"
Task: "T021 Author #inv-actions + #inv-tax-footer in pages/student/invoice-details.html"
Task: "T024 Author #pi-header + #pi-summary + #pi-balance-caption in pages/parent/invoices.html"
Task: "T025 Author #pi-filters in pages/parent/invoices.html"
Task: "T026 Author #pi-table in pages/parent/invoices.html"
Task: "T029 Author #fb-header + #fb-hero in pages/parent/family-balance.html"
Task: "T030 Author #fb-summary in pages/parent/family-balance.html"
Task: "T031 Author #fb-history in pages/parent/family-balance.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003).
2. Complete Phase 2: Foundational (T004-T010) — **CRITICAL** — locks shells + arithmetic.
3. Complete Phase 3: User Story 1 (T011-T032) — 22 tasks delivering the 4 customer-facing finance pages.
4. **STOP and VALIDATE**: Open the 4 student/parent pages and walk through the US1 Independent Test. Confirm the full finance loop is demoable end-to-end.
5. Demo the MVP — at this point the academy's families can review their finances in the prototype.

### Incremental Delivery

1. Setup + Foundational → Foundation ready (T001-T010).
2. Add US1 (T011-T032) → MVP ready → validate + demo.
3. Add US2 (T033-T049) → admin operational layer → validate + demo.
4. Add US3 (T050-T065) → admin configuration layer → full feature ready.
5. Polish phase (T066-T085) → CSS rebuild + 15-row SC validation + 12-gate Constitutional DoD + zero-prior-spec-edits audit.

### Parallel Team Strategy

With 3 developers after Foundational completes:
- Developer A: User Story 1 (4 customer-facing pages — 22 tasks).
- Developer B: User Story 2 (3 admin operational pages — 17 tasks).
- Developer C: User Story 3 (3 admin configuration pages — 16 tasks).

The single tight cross-page coordination point is T049 (byte-identity verification between student/invoice-details and admin/invoice-details) — Developer A and Developer B should sync on the anchor arithmetic at the start of their stories and run T049 jointly at the end.

The Polish phase (T066-T085) requires the team to converge: T066 (CSS rebuild) must run once all 10 pages are authored, then the SC validation tasks (T067-T082) can fan back out across the team.

---

## Notes

- [P] tasks = different files (or distinct anchor sections within a page that can be authored independently), no dependencies on incomplete tasks.
- [Story] label maps task to specific user story for traceability.
- Each user story is independently completable, testable, and demoable.
- This is a static-frontend prototype — there are no automated tests. Validation is via manual visual review + grep audits in quickstart.md.
- Commit after each task or logical group — branch is `008-payments-invoices-billing`.
- Zero prior-spec edits — if `git status` ever shows a Spec 001-007 file as `modified`, stop and investigate.
- Total tasks: **85** (3 setup + 7 foundational + 22 US1 + 17 US2 + 16 US3 + 20 polish).
