# Tasks: Teacher Finance, Earnings, Advances & Salary Rules Frontend

**Input**: Design documents from `/specs/009-teacher-finance-payroll/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: This is a static-frontend prototype. The spec does NOT request automated tests. Validation is via manual visual review + grep-based audits documented in quickstart.md §"Success Criteria Validation Table" (16 SC rows) + §"Constitutional Definition-of-Done Verification" (12 gates).

**Organization**: Tasks are grouped by user story (US1 = Teacher views earnings / advances / settlement — P1 MVP; US2 = Admin operates teacher payroll — P2; US3 = Admin configures rules / disburses advances — P3). Each story is an independently testable, demoable MVP increment. The 8 new pages are split: US1 ships the 3 teacher-side pages; US2 ships 3 admin operational pages (teacher-finance + teacher-advances + teacher-settlement-details); US3 ships 2 admin configuration pages (teacher-salary-rules + create-teacher-advance). The dual-lens anchor STL-2026-04-TCH-0042 forces US1 + US2 to share the eleven-line financial breakdown — the byte-identity is verified at the US2/admin/teacher-settlement-details checkpoint.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1 / US2 / US3)
- Setup / Foundational / Polish tasks have NO story label
- Include exact file paths in descriptions

## Path Conventions

- Static HTML pages live under `pages/<role>/` at the repository root.
- Shared CSS bundle: `assets/css/output.css` (rebuilt once during Polish).
- Shared JS handler: `assets/js/main.js` (NOT modified — zero new JS in this feature; Q1 modals reuse existing modal handler).
- Spec design docs: `specs/009-teacher-finance-payroll/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the working environment + project state before authoring any new HTML.

- [x] T001 Verify the branch is `009-teacher-finance-payroll` and `.specify/feature.json` points at `specs/009-teacher-finance-payroll` (run `git branch --show-current` + `cat .specify/feature.json`).
- [x] T002 [P] Verify shared assets baseline: `wc -l assets/js/main.js` returns 68 (the Spec 001/005/006/007/008 baseline) and `assets/css/output.css` exists at the Spec 008 baseline size (~70-72 KB). **Additionally** confirm the modal-handler attribute pattern in `assets/js/main.js` lines 36-44 reads **`data-modal-open`** (on triggers — value = modal element ID) and **`data-modal-close`** (on close buttons inside `<div role="dialog">`) — these are the attributes the Q1 modals MUST use on `pages/admin/teacher-settlement-details.html`. Reject any planning doc that says `data-modal-trigger` / `data-modal-target` (those names are NOT recognized by the actual handler).
- [x] T003 [P] Verify all teacher and admin sidebar inbound links already point to the new file paths via `grep -h -o 'href="[^"]*\(earnings\|advances\|teacher-finance\|teacher-salary-rules\|teacher-advances\|create-teacher-advance\|teacher-settlement-details\|settlement-details\)\.html"' pages/teacher/*.html pages/admin/*.html | sort -u` — confirms zero prior-spec edits will be needed for sidebar correctness (per research.md D1 + plan.md §Summary).

**Checkpoint**: Working environment confirmed; spec docs / assets / inbound sidebar links all aligned.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Capture the shared shell partials + lock the anchor sample-data tables so every page authors against the SAME numbers.

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete. The arithmetic invariants captured here are the single source of truth for byte-identical cross-page rendering (SC-005 / SC-006 / SC-015).

- [x] T004 Capture the **teacher sidebar** verbatim from `pages/teacher/dashboard.html` (Spec 002 baseline, updated through Spec 008). Save as a working snippet to be embedded byte-identically into the 3 teacher pages with only the `aria-current="page"` + `is-active` indicator changing per page (active = "الأرباح" on `earnings.html` AND `settlement-details.html` since the latter is a deep-read of the same surface; active = "السلف" on `advances.html`).
- [x] T005 Capture the **admin sidebar** verbatim from `pages/admin/dashboard.html`. Save as a working snippet for the 5 admin pages with the active entry "مالية المعلمين" on all 5 (per plan.md §Summary — all admin teacher-finance pages are sub-flows of the same hub).
- [x] T006 [P] Capture the **header chrome** (search input + bell-as-anchor + profile dropdown + role-specific greeting) from each role's prior-spec dashboard: teacher greeting "أ. أحمد" (الأستاذ أحمد بن عبد الله — TCH-2024-0042 — anchor teacher), admin greeting "إدارة الأكاديمية".
- [x] T007 [P] Verify the **anchor settlement STL-2026-04-TCH-0042 arithmetic** in data-model.md §E9: 4 rate-bucket sessions (24×30=720 + 16×60=960 + 8×50=400 + 4×100=400) = 2,480.00 ريال + course-percentage (20% × 8,000) = 1,600.00 + bonus +200 = gross subtotal 4,280; -80 manual deduction = 4,200; -200 (ADV-2026-0012 final 3/3) -250 (ADV-2026-0023 month 1/4) = -450 advances; net = **3,750.00 ريال**. Lock these values for use on `pages/teacher/settlement-details.html`, `pages/admin/teacher-settlement-details.html`, and `pages/admin/teacher-finance.html` row 1.
- [x] T008 [P] Verify the **advance ledger arithmetic for الأستاذ أحمد** in data-model.md §E7: 600 + 600 + 1,000 = 2,200.00 ريال received; 600 (ADV-2025-0089) + 600 (ADV-2026-0012, including the in-flight final installment) + 250 (ADV-2026-0023 month 1) = 1,450.00 paid back; 1,000 - 250 = 750.00 remaining (all on ADV-2026-0023 over May/June/July 250 each). Lock these values for `pages/teacher/advances.html` and the 3 anchor-teacher rows on `pages/admin/teacher-advances.html`.
- [x] T009 [P] Verify the **May 2026 running-tally decomposition** per Q4 in data-model.md §E3: 5×30 + 2×60 + 1×50 + 1×100 = 150 + 120 + 50 + 100 = **420.00 ريال** across 9 sessions (5 ناطق-جماعية + 2 ناطق-خاصة + 1 غير-ناطق-جماعية + 1 غير-ناطق-خاصة). Lock for `pages/teacher/earnings.html` row 5.
- [x] T010 [P] Verify the **6-teacher roster + 8-rule salary table** in data-model.md §E1 + §E2: 6 teachers (5 SAR + 1 EGP) with 8 salary rules covering all 4 rate mechanisms (per-session rates × all 8; course-percentage on rules 1-4 + 8; fixed-monthly-amount on rule 6 — 1,200 ريال شهرياً for الأستاذ يوسف; موقوفة state on rule 8). Lock these values for `pages/admin/teacher-salary-rules.html` + `pages/admin/teacher-finance.html` + `pages/admin/teacher-advances.html`.

**Checkpoint**: Foundation ready — both shells captured + all anchor arithmetic verified. User-story work can now begin (in parallel if multiple developers are available).

---

## Phase 3: User Story 1 — Teacher Views Earnings, Advances, and Settlement (Priority: P1) 🎯 MVP

**Goal**: Deliver the three teacher-facing finance pages (`teacher/earnings.html` + `teacher/advances.html` + `teacher/settlement-details.html`) so the anchor teacher الأستاذ أحمد بن عبد الله can review his April 2026 settlement (بانتظار الاعتماد), his 3-advance ledger, and his eleven-line settlement breakdown end-to-end. **Read-only enforcement**: zero `<input type="number">` across the 3 pages (SC-010).

**Independent Test**: Open `pages/teacher/earnings.html` and verify (a) hero card displays "تسوية أبريل 2026 — بانتظار اعتماد الإدارة — 3,750.00 ريال" with primary CTA «عرض تفاصيل التسوية», (b) 11 summary cards render concrete numbers (52 / 40 / 12 / 32 / 20 / 2,480 / 1,600 / 200 / -80 / -450 / 3,750), (c) per-rate breakdown panel shows the 4 buckets (720 / 960 / 400 / 400 = 2,480), (d) earnings-history table shows 5 rows with both مدفوعة and بانتظار-الاعتماد + the May 420.00 ريال قيد-التحصيل row with its «تفصيل: 5+2+1+1» caption. Then open `pages/teacher/advances.html` and verify 3 summary tiles (2,200 / 1,450 / 750) + 3-row advance table demonstrating 3 statuses (مكتملة / شبه-مكتملة / نشطة) + upcoming-deductions side panel. Finally open `pages/teacher/settlement-details.html` and verify the 11-line financial-totals card (3,750.00 ريال net) + the Q2 «سياسة حافز التميز» caption citing the 92% Spec-006 figure + visual «تنزيل التسوية (PDF)» button + non-link «تواصل مع الإدارة» footer caption (no `href="#"`).

### Implementation for User Story 1

#### `pages/teacher/earnings.html` (per `contracts/teacher-earnings.md`)

- [x] T011 [US1] Author `pages/teacher/earnings.html` shell: `<html lang="ar" dir="rtl">` + `<head>` (Tajawal Google Fonts + `assets/css/output.css` link) + body shell with the captured teacher sidebar (active = "الأرباح") + header chrome (greeting "أ. أحمد") + footer.
- [x] T012 [P] [US1] Author `#earn-hero` (title «تسوية أبريل 2026» + status badge «بانتظار اعتماد الإدارة» info-tone + الصافي المستحق `3,750.00 ريال` large numeric + sub-line «الاعتماد المتوقّع 2026-05-12 — السداد المتوقّع 2026-05-15» + primary CTA «عرض تفاصيل التسوية» → `settlement-details.html`) inside `pages/teacher/earnings.html`.
- [x] T013 [P] [US1] Author `#earn-summary` 11-card responsive grid per FR-011 (الحصص المُنجزة 52 / حصص ناطق-بالعربية 40 / حصص غير-ناطق-بالعربية 12 / الحصص الجماعية 32 / الحصص الخاصة 20 / أرباح من الحصص 2,480.00 ريال / أرباح من الدورات 1,600.00 ريال / حوافز 200.00 ريال / خصومات يدوية -80.00 ريال / السلف المخصومة -450.00 ريال / الصافي المستحق 3,750.00 ريال) — each card carries a numeric value + a small contextual caption (e.g., "+12% مقارنة بشهر مارس") inside `pages/teacher/earnings.html`.
- [x] T014 [P] [US1] Author `#earn-buckets` per-rate breakdown panel with 4 rate-bucket rows + subtotal (use `font-tabular-nums` for column alignment): ناطق-جماعية 24×30=720 / ناطق-خاصة 16×60=960 / غير-ناطق-جماعية 8×50=400 / غير-ناطق-خاصة 4×100=400 — subtotal **2,480.00 ريال** inside `pages/teacher/earnings.html`.
- [x] T015 [P] [US1] Author `#earn-courses` course-earnings panel — 1 row "دورة القرآن الكريم — المستوى الثالث — 20% × 8,000.00 ريال = 1,600.00 ريال" + caption "إيرادات الدورة لشهر أبريل" inside `pages/teacher/earnings.html`.
- [x] T016 [P] [US1] Author `#earn-history` 5-row earnings-history table per FR-014: يناير 4,100 (مدفوعة 2026-02-08) / فبراير 3,820 (مدفوعة 2026-03-08) / مارس 3,400 (مدفوعة 2026-04-08) / **أبريل 3,750 بانتظار-الاعتماد (highlighted)** / مايو **420.00 + "تقدير" pill (small neutral-tone badge adjacent to the amount cell — A1 visual indicator per FR-014)** (قيد التحصيل) with explicit caption «تفصيل: 5+2+1+1 جلسة عبر 4 أنواع» — 8 columns (الشهر / الحصص / الإجمالية / الخصومات / السلف / الصافي / الحالة / إجراء) — May row CTA reads "غير متاح بعد" inside `pages/teacher/earnings.html`. Closed-month rows (يناير-أبريل) MUST NOT carry the "تقدير" pill — only May does.
- [x] T017 [P] [US1] Author `#earn-rules-panel` read-only side panel «ملخص قواعد الراتب الفعّالة» with 5 rows (4 per-session rates + 20% course-percentage) + info-icon hyperlink to `pages/admin/teacher-salary-rules.html` (visual link only) inside `pages/teacher/earnings.html`.
- [x] T018 [US1] Author `#earn-transparency` footer caption «العرض للقراءة فقط — لتعديل أي قيمة، يُرجى التواصل مع الإدارة عبر صفحة الرسائل» (FR-017 — non-link text, no `href="#"`) and verify `pages/teacher/earnings.html`: zero `<input type="number">` (SC-010); every status badge pairs color + text + icon; ريال label visible per amount (no $/USD); CTA on April row links to `settlement-details.html`.

#### `pages/teacher/advances.html` (per `contracts/teacher-advances.md`)

- [x] T019 [US1] Author `pages/teacher/advances.html` shell with the same teacher sidebar (active = "السلف") + header chrome.
- [x] T020 [P] [US1] Author `#adv-summary` 3 summary tiles inside `pages/teacher/advances.html`: إجمالي السلف المستلمة 2,200.00 ريال (caption "موزّعة على 3 سلف منذ 2025-11") / إجمالي المُسدَّد 1,450.00 ريال (caption "65.9% من الإجمالي") / الرصيد المتبقّي 750.00 ريال (caption "على ADV-2026-0023 فقط").
- [x] T021 [P] [US1] Author `#adv-history` 3-row advance-history table per FR-021 inside `pages/teacher/advances.html`: ADV-2025-0089 (2025-11-15, 600.00, إعداد منزل المدرس, تقسيط 200×3, مكتملة ✓ success-tone, "تم إغلاقها وفق الجدول") / ADV-2026-0012 (2026-02-15, 600.00, نفقات أسرية طارئة, تقسيط 200×3, شبه-مكتملة ⏳ warning-tone, "ستُغلق فور اعتماد تسوية أبريل") / ADV-2026-0023 (2026-04-01, 1,000.00, علاج طبي, تقسيط 250×4, نشطة ⏵ info-tone, "خُصمت أول دفعة ضمن تسوية أبريل المعلّقة") — 7 columns (رقم / تاريخ / مبلغ / سبب / طريقة / حالة / ملاحظة الإدارة).
- [x] T022 [P] [US1] Author `#adv-upcoming` side panel «جدول الخصم القادم» with 3 rows (مايو 250 / يونيو 250 / يوليو 250 — all on ADV-2026-0023) + total chip "إجمالي الخصومات القادمة 750.00 ريال موزّعة على 3 أشهر" inside `pages/teacher/advances.html`.
- [x] T023 [US1] Author `#adv-transparency` footer caption «السلف تُخصم تلقائياً من التسويات الشهرية وفق الجدول المعتمد. لا يمكن للمعلم تعديل سياسة الخصم — لطلب تعديل، يُرجى التواصل مع الإدارة» (FR-024) and verify `pages/teacher/advances.html`: zero `<input type="number">` (SC-010); the 3 status badges use 3 distinct color+icon+text pairings; the anchor teacher does NOT carry a "بانتظار الاعتماد" or "مرفوضة" row.

#### `pages/teacher/settlement-details.html` (per `contracts/teacher-settlement-details.md`)

- [x] T024 [US1] Author `pages/teacher/settlement-details.html` shell with the teacher sidebar (active = "الأرباح" — deep-read of the same surface) + header chrome + breadcrumb "الأرباح / تسوية أبريل 2026 STL-2026-04-TCH-0042".
- [x] T025 [P] [US1] Author `#stl-header` (settlement ID `STL-2026-04-TCH-0042` + period «1 - 30 أبريل 2026» + issue/approval/payment dates + status badge «بانتظار اعتماد الإدارة» info-tone + caption «ستُسدَّد عبر مصرف الراجحي إلى الحساب المنتهي بـ 0042 فور الاعتماد») inside `pages/teacher/settlement-details.html`.
- [x] T026 [P] [US1] Author `#stl-teacher` "بيانات المعلّم" section per FR-031 (الاسم الكامل / TCH-2024-0042 / مدرّس القرآن الكريم / تاريخ التعيين 2024-09-01 / عقد دائم / الجنسية سعودية / مصرف الراجحي / IBAN `SA03********0042` masked) inside `pages/teacher/settlement-details.html`.
- [x] T027 [P] [US1] Author `#stl-buckets` 4-bucket session-earnings panel + subtotal — IDENTICAL values to `#earn-buckets` from T014 (720 / 960 / 400 / 400 = 2,480.00 ريال) per the two-views-one-entity discipline (SC-005) inside `pages/teacher/settlement-details.html`.
- [x] T028 [P] [US1] Author `#stl-courses` 2-row course-earnings panel inside `pages/teacher/settlement-details.html`: row 1 = «دورة القرآن الكريم — المستوى الثالث — 20% — إيرادات أبريل 8,000.00 ريال — حصة المعلّم 1,600.00 ريال»; row 2 = «—» labelled «لا توجد دورات بمبلغ ثابت لهذا المعلّم».
- [x] T029 [P] [US1] Author `#stl-bonus` bonus panel + **Q2 caption** inside `pages/teacher/settlement-details.html`: 1 row «حافز التميز شهر أبريل — +200.00 ريال — مُمنَح بواسطة SARA.M في 2026-05-01 — الملاحظة "بناءً على نسبة حضور الطلاب 92% وتقييم المراقب"». Directly below the row, the Q2 «سياسة حافز التميز» caption: «يُمنَح هذا الحافز عند تجاوز نسبة حضور الطلاب 90% خلال الشهر + تقييم إيجابي من المراقب الأكاديمي — المبلغ 200.00 ريال ثابت. تحقّق هذا الشرط في أبريل بنسبة حضور 92% (وفق التقرير `RPT-2026-04-Q03-007`).» (FR-034 + research.md §D5).
- [x] T030 [P] [US1] Author `#stl-deductions` manual-deductions panel — 1 row «خصم تأخّر 2 جلسة (14 + 22 أبريل) — -80.00 ريال — مُسجَّل بواسطة SARA.M في 2026-05-02 — "وفق سياسة الالتزام بالمواعيد، 40 ريال × 2 جلسة"» (FR-035) inside `pages/teacher/settlement-details.html`.
- [x] T031 [P] [US1] Author `#stl-advances` advance-deductions panel — 2 rows + subtotal + footnote inside `pages/teacher/settlement-details.html`: ADV-2026-0012 الدفعة 3 من 3 -200 + ADV-2026-0023 الدفعة 1 من 4 -250 = إجمالي -450.00 ريال + footnote «بعد سداد هاتين الدفعتين، تُغلق ADV-2026-0012 تلقائياً ويتبقّى من ADV-2026-0023 مبلغ 750.00 ريال على 3 دفعات.» (FR-036).
- [x] T032 [P] [US1] Author `#stl-totals` 11-line financial-totals card with `font-tabular-nums` + `divide-y` separators per FR-037: lines 1-11 (أرباح الحصص 2,480 / أرباح الدورات 1,600 / الحوافز +200 / **إجمالي الأرباح 4,280** / الخصومات اليدوية -80 / **الإجمالي بعد الخصومات 4,200** / السلف المخصومة -450 / **الصافي المستحق 3,750.00 ريال** / عملة الدفع ريال سعودي / الحساب البنكي المستهدف مصرف الراجحي SA03********0042 / الحالة بانتظار اعتماد الإدارة) inside `pages/teacher/settlement-details.html`.
- [x] T033 [US1] Author `#stl-actions` (visual buttons «تنزيل التسوية (PDF)» primary + «طباعة» secondary — both `<button type="button">`) and `#stl-footer` non-link caption «لطلب توضيح حول التسوية، يُرجى استخدام صفحة الرسائل عند توفّرها» (FR-039 — NO `href="#"`) and verify `pages/teacher/settlement-details.html`: zero `<input type="number">` (SC-010); zero `href="#"` (SC-004).

**Checkpoint**: User Story 1 (P1) complete. The 3 teacher-facing finance pages are independently functional and demoable as MVP. The anchor teacher can review his complete payroll picture without leaving the teacher surfaces.

---

## Phase 4: User Story 2 — Admin Operates Teacher Payroll Across the Academy (Priority: P2)

**Goal**: Deliver the 3 admin operational pages (`admin/teacher-finance.html` + `admin/teacher-advances.html` + `admin/teacher-settlement-details.html`) so the academy team can triage settlements, manage advances, deep-dive on individual settlements with admin-only audit-trail panels + sanctioned confirmation modals (Q1).

**Independent Test**: Open `pages/admin/teacher-finance.html` and verify 5 summary cards (with currency-separated SAR/EGP sub-totals) + 4 filter controls + 6-row teachers table including 5 SAR + 1 EGP teacher demonstrating 3 of 5 settlement states (مدفوعة / معتمدة / بانتظار-الاعتماد) + bulk-action affordance + 2 header CTAs. Then open `pages/admin/teacher-advances.html` and verify 4 summary tiles + 5 filter controls + 8-row advances table demonstrating ALL 4 advance statuses (مكتملة + نشطة + بانتظار-الاعتماد + مرفوضة) + شبه-مكتملة spec novelty + status-aware action cells + EGP row. Finally open `pages/admin/teacher-settlement-details.html` and verify the same anchor settlement STL-2026-04-TCH-0042 with byte-identical 11-line financial figures to the teacher-side page (SC-005) + 3 admin-only panels (سجل-الاعتماد timeline 5 events / تعديلات-يدوية with sign-color discipline / أثر-السلف with hyperlinks) + ملاحظات-إدارية thread (3 notes) + 5-button action bar with 3 sanctioned Q1 confirmation modals (اعتماد + تعليم-كمدفوعة + إعادة-فتح) + bank panel (no `href="#"`) + comparison mini-panel.

### Implementation for User Story 2

#### `pages/admin/teacher-finance.html` (per `contracts/admin-teacher-finance.md`)

- [x] T034 [US2] Author `pages/admin/teacher-finance.html` shell with the admin sidebar (active = "مالية المعلمين") + header chrome (greeting "إدارة الأكاديمية") + page title bar with H1 «مالية المعلمين» + 2 header CTAs (primary «إنشاء سلفة جديدة» → `create-teacher-advance.html`; secondary «قواعد الرواتب» → `teacher-salary-rules.html`).
- [x] T035 [P] [US2] Author `#tf-summary` 5 summary cards per FR-040 inside `pages/admin/teacher-finance.html`: (1) إجمالي مدفوعات المعلمين الشهر الماضي (أبريل) `28,400.00 ريال` + `4,200.00 EGP` separated / (2) تسويات معلّقة 4 من 6 / (3) السلف المُصرفة هذا الشهر `1,000.00 ريال` + `2,500.00 EGP` / (4) الصافي المستحق المتوقّع لمايو `8,250.00 ريال` + `4,200.00 EGP` تقديري / (5) عدد المعلمين النشطين 6 (5 ريال + 1 جنيه مصري). Currencies NEVER summed across SAR and EGP.
- [x] T036 [P] [US2] Author `#tf-footnote` near summary cards «إجمالي مدفوعات الشهر الماضي يعكس الأرباح الإجمالية قبل خصم السلف؛ الصافي المدفوع للمعلمين يساوي الإجمالي ناقص السلف ناقص الخصومات اليدوية» (FR-046) inside `pages/admin/teacher-finance.html`.
- [x] T037 [P] [US2] Author `#tf-filters` 4 controls (الحالة chips الكل/بانتظار/معتمدة/مدفوعة/مرفوضة / الشهر dropdown / العملة chips الكل/ريال/EGP / البحث input — visual filter only) inside `pages/admin/teacher-finance.html`.
- [x] T038 [P] [US2] Author `#tf-bulk` (master-checkbox column header + «إجراءات مجمّعة» dropdown styled `aria-disabled="true"` for the no-rows-selected state, offering: اعتماد المحدّد / تعليم كمدفوعة / تنزيل التسويات (PDF) / تصدير CSV) inside `pages/admin/teacher-finance.html`.
- [x] T039 [P] [US2] Author `#tf-table` 6-row teachers-finance table per FR-042 + data-model.md §E9 (12 columns including leading checkbox + trailing «تفاصيل» CTA): الأستاذ أحمد (52 / 1,680 / 800 / 1,600 / -450 / **3,750** ريال / بانتظار-الاعتماد) → CTA `teacher-settlement-details.html` (canonical anchor) / الأستاذة منى (44 / 1,560 / 480 / 0 / -200 / **3,640** ريال / معتمدة) / الأستاذ خالد (38 / 1,140 / 0 / 600 / 0 / **5,500** ريال / مدفوعة 2026-05-08) / الأستاذة فاطمة (32 / 960 / 320 / 0 / 0 / **3,180** ريال / بانتظار-الاعتماد) / الأستاذ يوسف (36 / 540 / 600 / 1,200 fixed / -150 / **8,430** ريال / بانتظار-الاعتماد) / **الأستاذة هبة (40 / 0 / 4,200 / 0 / -250 / 3,950 EGP / معتمدة 2026-05-09)** inside `pages/admin/teacher-finance.html`.
- [x] T040 [US2] Verify `pages/admin/teacher-finance.html`: ≥ 1 EGP row present (الأستاذة هبة, SC-008); ≥ 3 of 5 settlement states visible (مدفوعة + معتمدة + بانتظار-الاعتماد per FR-094 + SC-016); per-row "تفاصيل" CTA on الأستاذ أحمد row links to `teacher-settlement-details.html`; both header CTAs resolve to real pages; bulk-action dropdown is visually disabled-styled when no rows selected; SAR/EGP NEVER summed across rows.

#### `pages/admin/teacher-advances.html` (per `contracts/admin-teacher-advances.md`)

- [x] T041 [US2] Author `pages/admin/teacher-advances.html` shell with the admin sidebar (active = "مالية المعلمين") + header chrome + page title bar H1 «سلف المعلمين» + primary header CTA «إنشاء سلفة» → `create-teacher-advance.html`.
- [x] T042 [P] [US2] Author `#ta-summary` 4 summary tiles per FR-060 inside `pages/admin/teacher-advances.html`: إجمالي السلف النشطة (2,750 ريال + 750 EGP separated, caption "6 سلف نشطة عبر 5 معلمين") / إجمالي المُسدَّد هذا الشهر (1,000 ريال + 250 EGP, caption "من تسوية أبريل المعلّقة") / طلبات بانتظار الاعتماد (1, caption "الأستاذ يوسف 500 ريال") / السلف المرفوضة آخر 90 يوم (1, caption "الأستاذة فاطمة 1,500 ريال").
- [x] T043 [P] [US2] Author `#ta-filters` 5 controls (المعلّم dropdown / الحالة chips نشطة/مكتملة/بانتظار/مرفوضة/الكل / طريقة الخصم dropdown / شهر المنح dropdown / العملة chips ريال/EGP/الكل) inside `pages/admin/teacher-advances.html`.
- [x] T044 [P] [US2] Author `#ta-table` 8-row advances table per FR-062 + data-model.md §E7 (10 columns RTL): row 1 ADV-2025-0089 الأستاذ أحمد 600 ريال إعداد منزل تقسيط 3×200 ديسمبر-2025 **مكتملة** عرض / row 2 ADV-2026-0012 الأستاذ أحمد 600 نفقات أسرية طارئة تقسيط 3×200 مارس-2026 **شبه-مكتملة** عرض/تعديل (caption "آخر دفعة ضمن تسوية معلّقة") / row 3 ADV-2026-0023 الأستاذ أحمد 1,000 علاج طبي تقسيط 4×250 أبريل-2026 **نشطة** عرض/تعديل/إنهاء-مبكر / row 4 ADV-2026-0019 الأستاذة منى 800 رحلة عمل تقسيط 4×200 أبريل-2026 نشطة / row 5 ADV-2026-0024 الأستاذ يوسف 450 رسوم دراسية تقسيط 3×150 مايو-2026 نشطة / **row 6 ADV-2026-EG-0007 الأستاذة هبة 1,000 EGP (جنيه) نفقات شخصية تقسيط 4×250 أبريل-2026 نشطة** / **row 7 ADV-2026-0031 الأستاذ يوسف 500 ريال رسوم تجديد إقامة تقسيط 2×250 يونيو-2026 بانتظار-الاعتماد action cell = اعتماد + رفض** / **row 8 ADV-2026-0028 الأستاذة فاطمة 1,500 ريال توسعة منزل تقسيط 6×250 مايو-2026 مرفوضة (greyed out, "محفوظ للسجل" caption, السبب "تجاوز سقف الراتب الشهري") action cell = عرض السبب** inside `pages/admin/teacher-advances.html`.
- [x] T045 [P] [US2] Author `#ta-footnote` «السلف المرفوضة تبقى محفوظة في السجل لأغراض المراجعة الإدارية ولا يمكن حذفها» (FR-066) inside `pages/admin/teacher-advances.html`.
- [x] T046 [US2] Verify `pages/admin/teacher-advances.html`: ALL 4 advance statuses visible per FR-093 + SC-011 (نشطة / مكتملة / بانتظار-الاعتماد / مرفوضة) + شبه-مكتملة spec novelty on row 2; row 6 EGP currency badge per-row visible (FR-063); status-aware action cells distinct per FR-064 (5 distinct affordances: عرض only / عرض+تعديل / عرض+تعديل+إنهاء-مبكر / اعتماد+رفض / عرض-السبب); ADV-2026-0012 + ADV-2026-0023 each appear ≥ 6 contexts overall (counted with the prior 4 teacher-side appearances) — SC-006.

#### `pages/admin/teacher-settlement-details.html` (per `contracts/admin-teacher-settlement-details.md`)

- [x] T047 [US2] Author `pages/admin/teacher-settlement-details.html` shell (admin variant) with the admin sidebar (active = "مالية المعلمين") + header chrome + breadcrumb "مالية المعلمين / تفاصيل تسوية الأستاذ أحمد بن عبد الله — أبريل 2026".
- [x] T048 [P] [US2] Author the **shared sections 2-9 byte-identically with `pages/teacher/settlement-details.html`** (sections from T025-T032 — settlement header / بيانات-المعلّم / 4-bucket panel / 2-row course-earnings / bonus + Q2 caption + admin-side sub-caption "هذه القاعدة موثّقة في سياسة الحوافز المعتمدة — لتعديل القاعدة، يُرجى التواصل مع المدير العام." / manual-deductions panel / advance-deductions panel + footnote / 11-line financial-totals card) — IDENTICAL numeric figures (3,750.00 / 4,280.00 / -80.00 / -450.00 / 2,480 / 1,600 / 200) per SC-005 inside `pages/admin/teacher-settlement-details.html`.
- [x] T049 [P] [US2] Author `#stla-timeline` "سجل الاعتماد" admin-only panel per FR-081 inside `pages/admin/teacher-settlement-details.html` — 5 chronological events: 2026-05-01 إنشاء التسوية (نظام تلقائي) / 2026-05-02 إضافة خصم -80 (SARA.M, السبب "جلستان متأخرتان...") / 2026-05-02 إضافة حافز +200 (SARA.M, السبب "حافز التميز شهر أبريل بناءً على نسبة الحضور 92% — يستوفي شرط ≥90%") / 2026-05-03 مراجعة AHMED.K (حالة "جاهزة للاعتماد") / 2026-05-10 (متوقع) اعتماد التسوية (معلّق).
- [x] T050 [P] [US2] Author `#stla-adjustments` "تعديلات يدوية" admin-only panel per FR-082 inside `pages/admin/teacher-settlement-details.html` — 2 rows with sign-color discipline: **+200.00 ريال** حافز التميز SARA.M 2026-05-01 (success-tone +) / **-80.00 ريال** خصم تأخّر جلستين SARA.M 2026-05-02 (danger-tone −) — plus "إضافة تعديل يدوي" CTA above the list (visual-only, opens an inline composer placeholder).
- [x] T051 [P] [US2] Author `#stla-advance-impact` "أثر السلف" admin-only panel per FR-083 inside `pages/admin/teacher-settlement-details.html` — 2 rows with hyperlinks back to `teacher-advances.html` for each advance ID: ADV-2026-0012 الدفعة 3 من 3 -200.00 ريال (caption "هذه آخر دفعة، ستُغلق السلفة عند اعتماد التسوية") + ADV-2026-0023 الدفعة 1 من 4 -250.00 ريال (caption "يتبقّى 750.00 ريال على 3 أشهر").
- [x] T052 [P] [US2] Author `#stla-notes` "ملاحظات إدارية" thread per FR-084 — 3 notes inside `pages/admin/teacher-settlement-details.html`: 2026-05-02 SARA.M «تم احتساب خصم تأخّر الجلستين وفق السياسة المعتمدة» / 2026-05-03 AHMED.K «تأكيد على أن نسبة الحضور لشهر أبريل 92% تستحق حافز التميز» / 2026-05-09 SARA.M «بانتظار اعتماد المدير العام لإصدار الدفعة عبر مصرف الراجحي».
- [x] T053 [P] [US2] Author `#stla-actions` 5-button action bar per FR-085 inside `pages/admin/teacher-settlement-details.html` (RTL order from start): **«اعتماد التسوية»** (success-tone primary, `data-modal-open="modal-approve"`) / **«تعليم كمدفوعة»** (primary, `data-modal-open="modal-mark-paid"`) / «تعديل يدوي» (info-tone, opens FR-082 composer) / «تنزيل» (neutral) / **«إعادة فتح التسوية»** (danger-tone, vertical-divider-separated, `data-modal-open="modal-reopen"`). **Attribute name MUST be `data-modal-open` (NOT `data-modal-trigger`)** to match the existing main.js handler at lines 36-44.
- [x] T054 [P] [US2] Author the **3 sanctioned Q1 confirmation modals** per research.md §D4 + FR-085 inside `pages/admin/teacher-settlement-details.html` — each as `<div id="modal-{name}" role="dialog" class="hidden">` (hidden by default; the existing main.js handler removes the `hidden` class on open and adds it back on close — zero new JS). Each modal's close button (e.g., the «إلغاء» button + an X icon in the header) MUST carry the **`data-modal-close`** attribute (no value needed):
  - `<div id="modal-approve" role="dialog" class="hidden">`: title «تأكيد اعتماد تسوية أبريل 2026» + body «التسوية ستنتقل إلى حالة معتمدة — السداد المتوقّع 2026-05-15 عبر مصرف الراجحي إلى الحساب SA03********0042» + secondary caption «هذا عرض مرئي فقط — لن تُصدَر دفعة فعلية في الإصدار الحالي» + buttons «تأكيد الاعتماد» (success-tone, `<button type="button">` visual stub) / «إلغاء» (`<button type="button" data-modal-close>`).
  - `<div id="modal-mark-paid" role="dialog" class="hidden">`: title «تأكيد تسجيل الدفعة» + body «ستُسجَّل دفعة بمبلغ 3,750.00 ريال إلى الحساب SA03********0042 بتاريخ 2026-05-10 عبر مصرف الراجحي» + same visual-only caption + buttons «تأكيد التسجيل» / «إلغاء» (`data-modal-close`).
  - `<div id="modal-reopen" role="dialog" class="hidden">`: title «تأكيد إعادة فتح التسوية» + body «سيتم إعادة فتح التسوية وإلغاء أي اعتمادات سابقة — هذا الإجراء يُسجَّل في سجل الاعتماد ولا يمكن التراجع عنه دون موافقة المدير العام» + buttons «تأكيد الفتح» (danger-tone) / «إلغاء» (`data-modal-close`).
- [x] T055 [P] [US2] Author `#stla-bank` "بيانات المعلّم البنكية" panel per FR-086 inside `pages/admin/teacher-settlement-details.html`: مصرف الراجحي + IBAN `SA03********0042` + admin caption «تُسدَّد التسوية إلى هذا الحساب فور النقر على «تعليم كمدفوعة»» + static-disabled caption «(تعديل بيانات الحساب يتم من ملف المعلّم — يُنفَّذ في إصدار قادم)» (NO `href="#"` — non-link static text).
- [x] T056 [P] [US2] Author `#stla-comparison` "مقارنة بالشهر السابق" mini-panel per FR-087 inside `pages/admin/teacher-settlement-details.html`: مارس 2026 صافي 3,400.00 ريال / أبريل 2026 صافي 3,750.00 ريال / **الفرق +350.00 ريال (+10.3%)** + caption «بسبب 4 حصص إضافية + حافز التميز، وعلى الرغم من بدء خصم سلفة جديدة».
- [x] T057 [US2] **Critical SC-005 cross-page byte-identity verification**: open `pages/teacher/settlement-details.html` and `pages/admin/teacher-settlement-details.html` side-by-side; confirm 11 financial-totals lines match byte-identically (2,480 / 1,600 / +200 / 4,280 / -80 / 4,200 / -450 / **3,750** / ريال سعودي / SA03********0042 / بانتظار اعتماد الإدارة); 4 rate-bucket subtotals match; bonus + manual-deduction + advance-installment amounts match; the Q2 92% citation appears on both pages; admin-only panels (timeline / adjustments / advance-impact / notes / 5-action bar / 3 modals / bank panel / comparison) appear ONLY on admin page; verify zero `href="#"` (SC-004) on both pages.

**Checkpoint**: User Story 2 (P2) complete. The 3 admin operational pages are independently functional. Stories 1 + 2 together deliver the dual-lens settlement experience with byte-identical financial figures across teacher and admin perspectives.

---

## Phase 5: User Story 3 — Admin Defines Salary Rules and Disburses an Advance (Priority: P3)

**Goal**: Deliver the 2 admin configuration pages (`admin/teacher-salary-rules.html` + `admin/create-teacher-advance.html`) so the academy can configure per-teacher pricing with explicit retroactivity transparency (Q3) and disburse new advances with cause-effect impact preview.

**Independent Test**: Open `pages/admin/teacher-salary-rules.html` and verify (a) 3 summary tiles + 5 filter controls + 8-row 10-column rules table covering all 4 rate mechanisms (rule 1 per-session+%, rule 6 fixed-monthly 1,200 ريال, rule 7 EGP-only foreign rates, rule 8 موقوفة state with «إعادة تفعيل» CTA) + (b) rule-creation/edit form panel below the table with 7 fields pre-filled for the demo state (الأستاذ أحمد raise to 65 ريال effective 2026-06-01) + (c) **Q3 retroactivity callout** «تسري القاعدة على التسويات الجديدة فقط — لا تُعدَّل التسويات السابقة» beside the effective-date picker + (d) table footnote `* جميع القواعد تُطبَّق إلى الأمام من تاريخ السريان.` + (e) 3-entry historical-changes timeline. Then open `pages/admin/create-teacher-advance.html` and verify the 9-field form pre-filled for the demo state (الأستاذة منى pre-selected, 800.00 ريال, علاج طبي طارئ, تقسيط 4×200, شهر بدء يونيو-2026, ملاحظات pre-filled) + impact-preview side card "-200.00 ريال على تسوية يونيو 2026 — الصافي يتراجع من ~3,840 إلى ~3,640" + Save+Cancel buttons + post-form caption.

### Implementation for User Story 3

#### `pages/admin/teacher-salary-rules.html` (per `contracts/admin-teacher-salary-rules.md`)

- [x] T058 [US3] Author `pages/admin/teacher-salary-rules.html` shell with the admin sidebar (active = "مالية المعلمين") + header chrome + page title bar H1 «قواعد رواتب المعلمين».
- [x] T059 [P] [US3] Author `#sr-summary` 3 summary tiles inside `pages/admin/teacher-salary-rules.html`: عدد القواعد النشطة 7 / عدد المعلمين المُغطّون 6 معلمين / آخر تحديث للقاعدة 2026-04-15 بواسطة SARA.M (FR-050).
- [x] T060 [P] [US3] Author `#sr-filters` 5 controls (المعلّم dropdown / الدورة dropdown / نوع الطالب chips ناطق-بالعربية+غير-ناطق+الكل / الحالة chips نشطة+موقوفة+الكل / البحث) inside `pages/admin/teacher-salary-rules.html`.
- [x] T061 [P] [US3] Author `#sr-table` 8-row 10-column rules table (`min-w-[850px]` for tablet horizontal-scroll) per FR-052 + data-model.md §E2 inside `pages/admin/teacher-salary-rules.html`. Columns: المعلّم / الدورة / **ناطق-جماعية** / **ناطق-خاصة** / **غير-ناطق-جماعية** / **غير-ناطق-خاصة** / % الدورة / مبلغ ثابت شهرياً / الحالة / الإجراءات. Rows:
  1. الأستاذ أحمد / دورة القرآن الكريم — المستوى الثالث / 30 / 60 / 50 / 100 ريال / 20% / — / نشطة / تعديل/إيقاف
  2. الأستاذ أحمد / دورة القرآن الكريم — المستوى الرابع / 35 / 65 / 55 / 105 ريال / 20% / — / نشطة
  3. الأستاذة منى / دورة اللغة العربية الأساسية / 28 / 55 / 45 / 90 ريال / 18% / — / نشطة
  4. الأستاذ خالد / دراسات إسلامية للأطفال / 25 / 50 / 40 / 80 ريال / 15% / — / نشطة
  5. الأستاذة فاطمة / مساق الرياضيات الذكية / 30 / 55 / 50 / 95 ريال / — / — / نشطة
  6. الأستاذ يوسف / لغة إنجليزية للمدارس / 15 / 40 / 25 / 70 ريال / — / **1,200 ريال شهرياً** / نشطة
  7. **الأستاذة هبة / إنجليزية لغير الناطقين / — / — / 45 / 105 جنيه / — / — / نشطة (EGP)**
  8. **الأستاذة منى / دورة الإملاء العربي المتقدّم / 30 / 60 / 50 / 100 ريال / 18% / — / موقوفة (منذ 2026-03-01) / إعادة تفعيل**
- [x] T062 [P] [US3] Author `#sr-table-footnote` directly below the table: `* جميع القواعد تُطبَّق إلى الأمام من تاريخ السريان.` (small muted text per FR-055b clarification Q3) inside `pages/admin/teacher-salary-rules.html`.
- [x] T063 [P] [US3] Author `#sr-form` rule-creation/edit form panel with 7 fields per FR-055 inside `pages/admin/teacher-salary-rules.html` — pre-filled for the demo state (الأستاذ أحمد raise to 65 ريال effective 2026-06-01): المعلّم select → الأستاذ أحمد / الدورة select → دورة القرآن الكريم - المستوى الثالث / نوع الطالب chips → ناطق بالعربية / نوع المعدّل dropdown → لكل حصة خاصة / المبلغ numeric input → 65.00 + currency badge "ريال" / تاريخ السريان date picker → 2026-06-01 / ملاحظات textarea → "موافقة المدير العام بتاريخ 2026-04-30 — رفع المعدّل للحصص الخاصة بسبب الكفاءة" / primary «حفظ القاعدة» + secondary «إلغاء» buttons.
- [x] T064 [P] [US3] Author `#sr-q3-callout` permanent regulatory callout (info-tone alert) directly above (or beside on desktop RTL) the «تاريخ السريان» picker inside `pages/admin/teacher-salary-rules.html`: «تسري القاعدة على التسويات الجديدة فقط من تاريخ السريان — لا تُعدَّل التسويات السابقة أو المدفوعة أو المعتمدة. لتعديل تسوية مغلقة، يُرجى استخدام «إعادة فتح التسوية» في صفحة تفاصيل التسوية الإدارية.» (FR-055b — Q3 clarification verbatim).
- [x] T065 [P] [US3] Author `#sr-history` "تاريخ التغييرات" timeline panel per FR-056 inside `pages/admin/teacher-salary-rules.html` — 3 historical entries: 2026-04-15 SARA.M «رفع نسبة الأستاذ أحمد على دورة المستوى الرابع من 18% إلى 20%» / 2026-03-01 AHMED.K «إيقاف قاعدة الأستاذة منى لدورة الإملاء العربي المتقدّم بعد تعليق الدورة» / 2026-01-10 SARA.M «إنشاء قاعدة الأستاذة هبة بالجنيه المصري (45/105 جنيه group/private)».
- [x] T066 [US3] Verify `pages/admin/teacher-salary-rules.html`: 4 distinct per-session rate columns visible across all 8 rows; row 6 fixed monthly amount 1,200 ريال demonstrated; row 7 EGP rates with «جنيه» badge; row 8 موقوفة greyed out with «إعادة تفعيل» CTA replacing the standard «تعديل/إيقاف» pair; Q3 callout text rendered verbatim; table footnote present; rate-mechanism coverage (per-session + course-percentage on rules 1-4+8, fixed-monthly on rule 6, per-session-only on rules 5+7) demonstrates all 4 mechanisms per FR-053 + FR-091.

#### `pages/admin/create-teacher-advance.html` (per `contracts/admin-create-teacher-advance.md`)

- [x] T067 [US3] Author `pages/admin/create-teacher-advance.html` shell with the admin sidebar (active = "مالية المعلمين") + header chrome + page title bar H1 «إنشاء سلفة جديدة» + breadcrumb "مالية المعلمين › سلف المعلمين › إنشاء سلفة" + 2-column desktop layout (form right under RTL / preview side card left).
- [x] T068 [P] [US3] Author `#cta-form` 9-field form pre-filled for the demo state
  - **المعلّم** select (6 options) → **الأستاذة منى سعد** ✓ pre-selected
  - **المبلغ** numeric input → `800.00` + currency badge «ريال»
  - **سبب السلفة** dropdown (6 options + أخرى free-text) → **علاج طبي طارئ** ✓ pre-selected
  - **طريقة الخصم** dropdown (3 options) → **تقسيط شهري ثابت** ✓ pre-selected
  - **عدد الأقساط** numeric input (visible because تقسيط) → `4` + helper «الإجمالي 800.00 ÷ 4 = 200.00 ريال شهرياً»
  - **شهر بدء الخصم** date picker (month) → defaulted **يونيو 2026**
  - **ملاحظات إدارية** textarea → pre-fill «موافقة المدير العام بتاريخ 2026-05-09 عبر الاتصال — السلفة لتغطية تكاليف علاج طبي عاجل لأحد أبناء المعلّمة»
  - **مرفقات** drag-and-drop file-upload affordance + caption "PDF / JPG / PNG، حد أقصى 5MB" (visual only — no `<input type="file">` change handler)
  - **Buttons row**: primary «حفظ السلفة» (success-tone) + secondary «إلغاء» (returns to `teacher-advances.html`)
- [x] T069 [P] [US3] Author `#cta-impact` impact-preview side card per FR-079b inside `pages/admin/create-teacher-advance.html` (RTL left side on desktop, below form on mobile): title «ملخص الأثر على التسوية» + body «التأثير المتوقع على تسوية يونيو 2026 للأستاذة منى سعد: -200.00 ريال (الدفعة 1 من 4) — سيُخفّض الصافي المستحق المتوقّع من ~3,840.00 ريال إلى ~3,640.00 ريال» + sub-caption «هذه القيم تقديرية — قد تتغيّر بناءً على الحصص الفعلية والأرباح للشهر».
- [x] T070 [P] [US3] Author `#cta-post-save` caption block below the action buttons inside `pages/admin/create-teacher-advance.html`: «بعد الحفظ» — «ستظهر السلفة الجديدة على صفحة سلف المعلمين وعلى صفحة سلف المعلمة المخصصة لها» + «السلفة قابلة للتعديل أو الإلغاء قبل اعتمادها».
- [x] T071 [US3] Verify `pages/admin/create-teacher-advance.html`: form is rendered in the static demo state (الأستاذة منى pre-selected, تقسيط expanded variant only — alternate states documented in spec but NOT rendered in markup); cascading dropdowns + dependent-field visibility are pre-rendered (no JS handlers); receipt-upload is a visual drop-zone aesthetic with no `<input type="file">`; «حفظ السلفة» is `<button type="button">` (no real form submission); «إلغاء» is `<a href="teacher-advances.html">` styled as secondary button; Latin digits inside Arabic copy (FR-005); no `href="#"` (SC-004).

**Checkpoint**: User Story 3 (P3) complete. All 3 user stories independently functional. The 8 new pages collectively close every constitutional teacher and admin sidebar entry pertaining to payroll, earnings, advances, and salary rules.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: One-time CSS rebuild + cross-spec audits + the 16-row SC validation table from quickstart.md + the 12-gate Constitutional DoD.

- [x] T072 [P] Run `npm run build:css` from repo root to regenerate `assets/css/output.css`. Confirm the new utilities required by the 8 pages (e.g., `font-tabular-nums`, `divide-y-2`, `min-w-[850px]`, `border-double` if used) are picked up by the JIT scan. Verify final size: `wc -c assets/css/output.css` ≤ 81920 (the 80 KB constitutional ceiling — SC-013).
- [x] T073 [P] **Zero prior-spec edits audit**: run `git status --porcelain | grep -vE 'pages/teacher/(earnings|advances|settlement-details)\.html|pages/admin/(teacher-finance|teacher-salary-rules|teacher-advances|create-teacher-advance|teacher-settlement-details)\.html|assets/css/output\.css'` and confirm empty output (only the 9 expected staged files exist — 8 new HTML + rebuilt output.css).
- [x] T074 [P] **Zero `href="#"` audit (SC-004)**: run `grep -nE 'href="#"' pages/teacher/{earnings,advances,settlement-details}.html pages/admin/{teacher-finance,teacher-salary-rules,teacher-advances,create-teacher-advance,teacher-settlement-details}.html` and confirm empty output.
- [x] T075 [P] **Read-only-for-teacher audit (SC-010)**: run `grep -nE '<input type="number"' pages/teacher/{earnings,advances,settlement-details}.html` and confirm empty output.
- [x] T076 [P] **Zero new JS audit (SC-014)**: confirm `wc -l assets/js/main.js` returns 68 (the Spec 008 baseline — unchanged).
- [x] T077 [P] **Cross-page byte-identity verification (SC-005)**: run `diff <(grep -A30 "أرباح الحصص:" pages/teacher/settlement-details.html) <(grep -A30 "أرباح الحصص:" pages/admin/teacher-settlement-details.html)` and confirm zero numeric divergence in the 11 financial-totals lines.
- [x] T078 [P] **Advance-cross-reference ubiquity (SC-006)**: run `grep -c "ADV-2026-0012" pages/teacher/{earnings,advances,settlement-details}.html pages/admin/{teacher-finance,teacher-salary-rules,teacher-advances,create-teacher-advance,teacher-settlement-details}.html | awk -F: '{s+=$NF} END {print s}'` and confirm ≥ 6; same for ADV-2026-0023 (expect ≥ 6 each).
- [x] T079 [P] **Arabic-vs-Foreign distinction visibility (SC-007)**: run `grep -c "ناطق بالعربية" <8 files> | awk -F: '{s+=$NF} END {print s}'` and confirm ≥ 12 contexts; same for `غير ناطق بالعربية` (≥ 12).
- [x] T080 [P] **Multi-currency three-surface presence (SC-008)**: run `grep -lE 'EGP|جنيه' pages/admin/teacher-finance.html pages/admin/teacher-advances.html pages/admin/teacher-salary-rules.html` and confirm all three filenames are returned.
- [x] T081 [P] **Spec-006 academic-figures audit (SC-012)**: run `grep -nE 'RPT-2026-04-Q03-007|88%|88-100|89-100|ممتاز' pages/teacher/{earnings,advances,settlement-details}.html pages/admin/{teacher-finance,teacher-salary-rules,teacher-advances,create-teacher-advance,teacher-settlement-details}.html` and confirm: only `RPT-2026-04-Q03-007` appears (only in the Q2 bonus caption on `pages/teacher/settlement-details.html` + `pages/admin/teacher-settlement-details.html`); no other locked Spec-006 figure appears anywhere.
- [x] T082 [P] **No-banned-frameworks audit**: run `grep -rE 'react|vue|angular|svelte|alpine|jquery|next|nuxt' pages/teacher/{earnings,advances,settlement-details}.html pages/admin/teacher-*.html pages/admin/create-teacher-advance.html` and confirm empty output (Constitution I).
- [x] T083 [P] **No-API audit**: run `grep -rE 'fetch\(|axios|XMLHttpRequest|api/' pages/teacher/{earnings,advances,settlement-details}.html pages/admin/teacher-*.html pages/admin/create-teacher-advance.html` and confirm empty output.
- [x] T084 **Manual responsive validation (Constitutional DoD gate 2)**: open each of the 8 pages in a browser at 375px / 768px / 1024px / 1280px breakpoints; verify desktop full sidebar + content; tablet 768-1279px collapses dense tables (notably the 10-column salary-rules table) to horizontal-scroll containers via the `min-w-[850px]` utility; mobile <768px collapses the sidebar via the existing main.js drawer.
- [x] T085 **Manual modal smoke-test (Q1 sanctioned modals)**: open `pages/admin/teacher-settlement-details.html` in a browser; click each of the 3 modal-bound buttons («اعتماد التسوية» / «تعليم كمدفوعة» / «إعادة فتح التسوية»); verify each modal opens with the correct title + body + secondary caption + buttons; verify «إلغاء» (carrying `data-modal-close`) closes each modal; verify «تأكيد» does NOT mutate page state (visual demo only). Confirm the `data-modal-open` / `data-modal-close` attributes match the existing main.js handler at lines 36-44 — these are the only correct attribute names; `data-modal-trigger` / `data-modal-target` are NOT recognized.
- [x] T086 **Manual SC validation table run** (quickstart.md §"Success Criteria Validation Table"): walk through all 16 SC rows; tick each as passing.
- [x] T087 **Manual Constitutional DoD verification** (quickstart.md §"Constitutional Definition-of-Done Verification"): walk through all 12 DoD gates; tick each as passing.

**Checkpoint**: All 8 pages shipped, all audits pass, the academy's teacher-payroll narrative is fully demoable end-to-end alongside the family-finance narrative shipped in Spec 008.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories. The arithmetic invariants captured in T007-T010 are the single source of truth for byte-identical cross-page rendering.
- **User Stories (Phases 3-5)**: All depend on Foundational completion.
  - **US1 (P1)**: Can start immediately after Foundational. No dependencies on other stories.
  - **US2 (P2)**: Can start after Foundational. The dual-lens settlement (T048 + T057) requires the same anchor figures as US1's T027/T032 — BUT both sides author from the same `data-model.md §E9` source; no functional dependency. US2 can ship without US1.
  - **US3 (P3)**: Can start after Foundational. No dependencies on US1 or US2.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 → US2** (loose): The teacher-side settlement-details page (T024-T033) and the admin-side settlement-details page (T047-T057) share the eleven-line financial breakdown. T057 is the cross-page byte-identity verification gate — it requires both pages to exist. If only one user story is shipped (e.g., MVP = US1 only), the byte-identity check is deferred.
- **US1 → US3** (none): independent.
- **US2 → US3** (none): independent. The «إنشاء سلفة جديدة» CTA on `admin/teacher-finance.html` (US2 T034) and the «إنشاء سلفة» CTA on `admin/teacher-advances.html` (US2 T041) link to `admin/create-teacher-advance.html` (US3 T067) — meaning if US2 ships before US3, the CTAs would 404. Either ship US3 before US2, or ship both together. The recommended order is **US1 → US3 → US2** (or US1 + US2 + US3 in parallel) so that all CTAs resolve to existing pages at every checkpoint.

### Within Each User Story

- The shell task (Tnnn1) MUST complete before content tasks (Tnnn2-Tnnn7) — they all author into the same file.
- All [P] content tasks within a single user-story file CAN run in parallel only if they author into distinct sections (`<section id="...">`) of the same HTML file — practical implementation: one developer at a time per file, but multiple developers across files in parallel. The `[P]` markers below are interpreted as "different sections, no inter-section dependencies" — safe to author in any order within a single file.
- The verification task (Tnnn-final, e.g. T018, T023, T033, T040, T046, T057, T066, T071) MUST complete after all content tasks for that page.

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002 + T003).
- All Foundational tasks marked [P] can run in parallel (T006 + T007 + T008 + T009 + T010 — 5 verifications, all read-only).
- Once Foundational is done, US1 + US2 + US3 can all start in parallel (if 3 developers available).
- Within a single user story, content tasks marked [P] CAN run in parallel if working on distinct files (e.g., T012 + T020 + T025 are on 3 different teacher-side files).
- Polish phase: all 11 [P] audits (T072-T083) are independent and can run in parallel.

---

## Parallel Example: User Story 1 — 3 Teacher Pages in Parallel

Once Foundational (Phase 2) completes, three developers can work in parallel:

```bash
# Developer A authors pages/teacher/earnings.html
Task: T011 → T018 (shell + 7 content tasks + verification)

# Developer B authors pages/teacher/advances.html
Task: T019 → T023 (shell + 4 content tasks + verification)

# Developer C authors pages/teacher/settlement-details.html
Task: T024 → T033 (shell + 9 content tasks + verification)
```

All three pages are independent. After all three checkpoint, verify the side-panel (T017) on `earnings.html` correctly references the salary rule that gets fully rendered on `pages/admin/teacher-salary-rules.html` (US3 T061) — but this is a forward-reference verification; the link works as long as US3 ships at any point before final demo.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003).
2. Complete Phase 2: Foundational (T004-T010 — CRITICAL, blocks all stories).
3. Complete Phase 3: User Story 1 (T011-T033 — 3 teacher pages).
4. **STOP and VALIDATE**: Open all 3 teacher pages in browser; verify the Independent Test for US1; tick the relevant SC rows from quickstart.md.
5. Run the cross-page audit T077 — but it will fail because admin/teacher-settlement-details.html does not exist yet. Defer T077 until US2 ships.
6. Demo as **MVP**: the anchor teacher's complete payroll picture is reviewable end-to-end.

### Incremental Delivery (recommended for Spec 009)

1. Setup + Foundational → Foundation ready.
2. Add US1 (3 teacher pages) → Test independently → Demo MVP.
3. Add US3 (2 admin configuration pages) → Test independently → Demo. Why US3 before US2: admin/teacher-finance.html (US2) carries 2 header CTAs that link to admin/create-teacher-advance.html (US3 T067) and admin/teacher-salary-rules.html (US3 T058); shipping US3 before US2 means the US2 CTAs resolve to existing pages from day 1.
4. Add US2 (3 admin operational pages) → Test independently → Demo. The cross-page byte-identity verification (T057) now passes.
5. Polish (T072-T087) → Final size audit + grep audits + manual responsive + modal smoke-test → Done.

### Parallel Team Strategy

With multiple developers, after Foundational:

- **Developer A**: US1 (T011-T033) — 3 teacher pages
- **Developer B**: US2 (T034-T057) — 3 admin operational pages
- **Developer C**: US3 (T058-T071) — 2 admin configuration pages

The 3 user stories are sequence-independent until the cross-page audits run in Polish (T077 specifically requires US1 + US2 both done).

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
- The single cross-page checkpoint (T057 manual side-by-side review for teacher↔admin settlement-details byte-identity) is the key SC-005 gate — do not skip it.
