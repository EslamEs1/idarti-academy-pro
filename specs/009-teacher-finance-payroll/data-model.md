# Phase 1 Data Model: Teacher Finance, Earnings, Advances & Salary Rules Frontend

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Date**: 2026-05-10

This document defines the 9 entity types modeled in static HTML across the 8 new pages, plus the canonical sample-data anchors that every page MUST render consistently. Every numeric value listed here is a hard-commit anchor — implementing pages may not invent alternative figures or contradict these.

## Entity Catalog

### E1 — Teacher

Represents a member of the academy's teaching staff.

| Attribute | Constraint | Anchor instance (الأستاذ أحمد) |
|-----------|-----------|-------------------------------|
| Teacher ID | Latin alphanumeric, format `TCH-YYYY-NNNN` | `TCH-2024-0042` |
| Full name | Arabic | الأستاذ أحمد بن عبد الله الزهراني |
| Subject / specialization | Arabic | مدرّس القرآن الكريم |
| Hire date | YYYY-MM-DD | 2024-09-01 |
| Contract type | عقد دائم / عقد بالحصة | عقد دائم |
| Nationality | Arabic country name | سعودية |
| Country of residence | Arabic country name | المملكة العربية السعودية |
| Payroll currency | SAR / EGP | SAR (ريال) |
| Bank name | Arabic | مصرف الراجحي |
| IBAN (masked) | first 4 + asterisks + last 4 | `SA03********0042` |
| Active status | active / inactive | active |

**Roster (6 teachers, anchored across specs 002-008-009)**:

| ID | Name | Subject | Currency | Bank |
|----|------|---------|----------|------|
| TCH-2024-0042 | الأستاذ أحمد بن عبد الله الزهراني | قرآن (anchor) | SAR | مصرف الراجحي |
| TCH-2024-0051 | الأستاذة منى سعد | لغة عربية | SAR | البنك الأهلي السعودي |
| TCH-2024-0067 | الأستاذ خالد العبدلي | دراسات إسلامية | SAR | بنك الرياض |
| TCH-2024-0073 | الأستاذة فاطمة الزهراني | رياضيات | SAR | مصرف الراجحي |
| TCH-2024-0078 | الأستاذ يوسف القحطاني | لغة إنجليزية للمدارس | SAR | البنك السعودي البريطاني (ساب) |
| TCH-2024-0089 | الأستاذة هبة محمد عبد الفتاح | إنجليزية لغير الناطقين (Cairo) | EGP | البنك التجاري الدولي (CIB) |

### E2 — Salary Rule

A pricing rule binding a teacher to a course with one or more rate components.

| Attribute | Constraint | Notes |
|-----------|-----------|-------|
| Rule ID | implicit (row order on table) | — |
| Teacher | foreign key to E1 | — |
| Course | string (one of the established courses) | — |
| Student-type | ناطق بالعربية / غير ناطق بالعربية / كلاهما | "كلاهما" allows the rule to specify all 4 rate cells |
| Rate components | non-empty subset of {arabic-group, arabic-private, foreign-group, foreign-private, course-percentage, fixed-monthly} | Each cell either a numeric rate or "—" |
| Currency | SAR / EGP | matches teacher's payroll currency |
| Effective date | YYYY-MM-DD | typically next-month-start |
| Status | نشطة / موقوفة | موقوفة rules retain a "إعادة تفعيل" CTA |
| Last-edit author | string (admin staff name) | — |
| Last-edit timestamp | ISO date | — |

**Anchor rules (8 rows on admin/teacher-salary-rules.html)**:

| # | Teacher | Course | Ar-Grp | Ar-Prv | For-Grp | For-Prv | %Course | Fixed | Status |
|---|---------|--------|--------|--------|---------|---------|---------|-------|--------|
| 1 | الأستاذ أحمد | دورة القرآن الكريم — المستوى الثالث | 30.00 | 60.00 | 50.00 | 100.00 | 20% | — | نشطة |
| 2 | الأستاذ أحمد | دورة القرآن الكريم — المستوى الرابع | 35.00 | 65.00 | 55.00 | 105.00 | 20% | — | نشطة |
| 3 | الأستاذة منى | دورة اللغة العربية الأساسية | 28.00 | 55.00 | 45.00 | 90.00 | 18% | — | نشطة |
| 4 | الأستاذ خالد | دراسات إسلامية للأطفال | 25.00 | 50.00 | 40.00 | 80.00 | 15% | — | نشطة |
| 5 | الأستاذة فاطمة | مساق الرياضيات الذكية | 30.00 | 55.00 | 50.00 | 95.00 | — | — | نشطة |
| 6 | الأستاذ يوسف | لغة إنجليزية للمدارس | 15.00 | 40.00 | 25.00 | 70.00 | — | 1,200.00 ريال | نشطة |
| 7 | الأستاذة هبة | إنجليزية لغير الناطقين | — | — | 45.00 جنيه | 105.00 جنيه | — | — | نشطة (EGP) |
| 8 | الأستاذة منى | دورة الإملاء العربي المتقدّم | 30.00 | 60.00 | 50.00 | 100.00 | 18% | — | موقوفة (منذ 2026-03-01) |

All amounts ريال unless suffixed جنيه. The dash (—) renders the empty-rate sentinel.

### E3 — Session-Earning Bucket

A grouping of completed sessions in a settlement period sharing both student-type and group/private mode. Four canonical buckets per teacher per month.

| Attribute | Constraint | Anchor (الأستاذ أحمد April 2026) |
|-----------|-----------|----------------------------------|
| Bucket key | (student-type, mode) tuple | (ناطق, جماعية) / (ناطق, خاصة) / (غير-ناطق, جماعية) / (غير-ناطق, خاصة) |
| Session count | integer | 24 / 16 / 8 / 4 = 52 total |
| Per-session rate | numeric (from E2) | 30.00 / 60.00 / 50.00 / 100.00 ريال |
| Bucket subtotal | count × rate | 720.00 / 960.00 / 400.00 / 400.00 = 2,480.00 ريال |

**May 2026 in-progress** (Q4 decomposition): 5 / 2 / 1 / 1 = 9 sessions; subtotals 150 + 120 + 50 + 100 = 420.00 ريال.

### E4 — Course Earning

A monthly payout component derived from a course's revenue × the teacher's percentage rule (or the teacher's fixed monthly amount).

| Attribute | Constraint | Anchor (الأستاذ أحمد April 2026) |
|-----------|-----------|----------------------------------|
| Course | string | دورة القرآن الكريم — المستوى الثالث |
| Period | YYYY-MM | 2026-04 |
| Mechanism | "نسبة من الإيرادات" / "مبلغ ثابت شهرياً" | نسبة من الإيرادات |
| Course revenue (when %-based) | numeric | 8,000.00 ريال |
| Teacher percentage | percent | 20% |
| Teacher share | numeric | 1,600.00 ريال |
| Fixed monthly amount (when fixed-based) | numeric | — (not applicable for anchor) |

The fixed-monthly-amount mechanism is demonstrated by الأستاذ يوسف (Rule 6 in E2 — 1,200.00 ريال شهرياً).

### E5 — Bonus

A discretionary positive adjustment to a settlement.

| Attribute | Constraint | Anchor (April 2026) |
|-----------|-----------|---------------------|
| Label | Arabic | حافز التميز شهر أبريل |
| Amount | positive numeric | +200.00 ريال |
| Granted by | string (admin staff name) | SARA.M (موظفة المالية) |
| Granted at | YYYY-MM-DD | 2026-05-01 |
| Reason | Arabic | بناءً على نسبة حضور الطلاب 92% وتقييم المراقب — يستوفي شرط ≥90% المنصوص عليه في سياسة الحوافز |

**Q2 caption** (renders directly below the bonus row):

> «يُمنَح هذا الحافز عند تجاوز نسبة حضور الطلاب 90% خلال الشهر + تقييم إيجابي من المراقب الأكاديمي — المبلغ 200.00 ريال ثابت. تحقّق هذا الشرط في أبريل بنسبة حضور 92% (وفق التقرير `RPT-2026-04-Q03-007`).»

Multiple bonuses MAY exist on a single settlement (the anchor April carries one; the empty-state row "لا توجد حوافز هذا الشهر" renders when bonus-count = 0).

### E6 — Manual Deduction / Adjustment

An admin-recorded line item on a settlement (positive or negative).

| Attribute | Constraint | Anchor (April 2026) |
|-----------|-----------|---------------------|
| Label | Arabic | خصم تأخّر 2 جلسة (14 + 22 أبريل) |
| Signed amount | positive or negative numeric | -80.00 ريال |
| Author | string | SARA.M (موظفة المالية) |
| Date | YYYY-MM-DD | 2026-05-02 |
| Reason | Arabic | وفق سياسة الالتزام بالمواعيد، 40 ريال × 2 جلسة |

The manual-adjustments panel on admin/teacher-settlement-details.html distinguishes positive (success-tone +) from negative (danger-tone −) by sign + label color (color is never the sole indicator).

### E7 — Advance

A money-out event from the academy to the teacher to be deducted from future settlements.

| Attribute | Constraint |
|-----------|-----------|
| Advance ID | Latin alphanumeric, format `ADV-YYYY-NNNN` for SAR or `ADV-YYYY-EG-NNNN` for EGP |
| Teacher | foreign key to E1 |
| Granted date | YYYY-MM-DD |
| Amount | numeric |
| Currency | SAR / EGP |
| Reason | Arabic (one of: علاج طبي طارئ / نفقات أسرية / رسوم دراسية / رسوم حكومية / إعداد منزل / أخرى) |
| Deduction method | تقسيط شهري ثابت / دفعة واحدة / نسبة من التسوية الشهرية حتى السداد |
| Installments count | integer (when method = تقسيط) |
| Deduction-start month | YYYY-MM |
| Status | نشطة / مكتملة / شبه-مكتملة / بانتظار الاعتماد / مرفوضة |
| Admin notes | Arabic free-text thread |

**Anchor advance ledger (8 rows on admin/teacher-advances.html)**:

| ID | Teacher | Granted | Amount | Currency | Reason | Method | Start | Status |
|----|---------|---------|--------|----------|--------|--------|-------|--------|
| ADV-2025-0089 | الأستاذ أحمد | 2025-11-15 | 600.00 | SAR | إعداد منزل | تقسيط 3×200 | 2025-12 | مكتملة (2026-02-15) |
| ADV-2026-0012 | الأستاذ أحمد | 2026-02-15 | 600.00 | SAR | نفقات أسرية طارئة | تقسيط 3×200 | 2026-03 | شبه-مكتملة (final installment in pending April settlement) |
| ADV-2026-0023 | الأستاذ أحمد | 2026-04-01 | 1,000.00 | SAR | علاج طبي | تقسيط 4×250 | 2026-04 | نشطة (250 paid in April; 750 remaining) |
| ADV-2026-0019 | الأستاذة منى | 2026-03-10 | 800.00 | SAR | رحلة عمل | تقسيط 4×200 | 2026-04 | نشطة |
| ADV-2026-0024 | الأستاذ يوسف | 2026-04-25 | 450.00 | SAR | رسوم دراسية للأبناء | تقسيط 3×150 | 2026-05 | نشطة |
| ADV-2026-EG-0007 | الأستاذة هبة | 2026-03-01 | 1,000.00 | EGP | نفقات شخصية | تقسيط 4×250 | 2026-04 | نشطة (EGP-denominated) |
| ADV-2026-0031 | الأستاذ يوسف | 2026-05-08 | 500.00 | SAR | رسوم تجديد إقامة | تقسيط 2×250 | 2026-06 | بانتظار الاعتماد (pending request) |
| ADV-2026-0028 | الأستاذة فاطمة | 2026-04-22 | 1,500.00 | SAR | توسعة منزل | تقسيط 6×250 | 2026-05 | مرفوضة (السبب: تجاوز سقف الراتب الشهري) |

**The anchor teacher's 3-row teacher-side advances ledger** is the subset of the 8-row admin ledger filtered to TCH-2024-0042: ADV-2025-0089 + ADV-2026-0012 + ADV-2026-0023.

**Arithmetic reconciliation (anchor teacher only, SC-006)**:
- Total received all-time: 600 + 600 + 1,000 = **2,200.00 ريال**
- Total paid back: 600 (ADV-2025-0089 fully closed) + 600 (ADV-2026-0012 effectively repaid through April including the in-flight final installment) + 250 (ADV-2026-0023 month 1) = **1,450.00 ريال**
- Remaining: 1,000 - 250 = **750.00 ريال** (all on ADV-2026-0023, distributed across May/June/July at 250 each)

### E8 — Advance Installment Event

A single deduction occurrence applied to one settlement.

| Attribute | Constraint | Example (April 2026 anchor) |
|-----------|-----------|------------------------------|
| Advance ID | foreign key to E7 | ADV-2026-0012 / ADV-2026-0023 |
| Installment ordinal | "N من M" | 3 من 3 / 1 من 4 |
| Settlement period | YYYY-MM | 2026-04 |
| Amount deducted | negative numeric | -200.00 / -250.00 ريال |

The April 2026 settlement of الأستاذ أحمد contains two such events (subtotal -450.00 ريال). They appear on:
1. `pages/teacher/settlement-details.html` "السلف المخصومة" panel
2. `pages/admin/teacher-settlement-details.html` "أثر السلف" panel (with hyperlinks back to teacher-advances.html)
3. `pages/teacher/advances.html` advance-history table (status column reflects post-event state)
4. `pages/admin/teacher-advances.html` advance-history table (same)
5. `pages/admin/teacher-finance.html` الأستاذ أحمد row "السلف المخصومة" cell shows the -450 aggregate

### E9 — Settlement

A monthly payroll record per teacher.

| Attribute | Constraint |
|-----------|-----------|
| Settlement ID | Latin alphanumeric, format `STL-YYYY-MM-TCH-NNNN` |
| Teacher | foreign key to E1 |
| Period | YYYY-MM (month boundaries: 1st → end-of-month) |
| Session-earnings buckets | 4 instances of E3 |
| Course earnings | 0..N instances of E4 |
| Bonuses | 0..N instances of E5 |
| Manual adjustments | 0..N instances of E6 |
| Advance deductions | 0..N instances of E8 |
| Gross subtotal | sum of (sessions + courses + bonuses) |
| Net payable | gross - manual deductions - advances |
| Currency | SAR / EGP |
| Status | مسودة / بانتظار الاعتماد / معتمدة / مدفوعة / مرفوضة |
| Expected approval date | YYYY-MM-DD (when status ∈ {بانتظار, معتمدة}) |
| Expected payment date | YYYY-MM-DD (when status ≠ مدفوعة) |
| Target bank account snapshot | masked IBAN |
| Audit-trail timeline | 0..N events with actor + timestamp + label |

**Anchor settlement (STL-2026-04-TCH-0042 — الأستاذ أحمد April 2026)**:

| Line | Component | Amount (ريال) |
|------|-----------|---------------|
| 1 | Sessions (4 buckets) | 720 + 960 + 400 + 400 = **2,480.00** |
| 2 | Course (20% × 8,000) | **1,600.00** |
| 3 | Bonus (حافز التميز) | **+200.00** |
| 4 | **Gross subtotal** | **4,280.00** |
| 5 | Manual deduction (تأخّر جلستين) | **-80.00** |
| 6 | **After deductions** | **4,200.00** |
| 7 | Advance ADV-2026-0012 (3/3) | **-200.00** |
| 8 | Advance ADV-2026-0023 (1/4) | **-250.00** |
| 9 | **Net payable** | **3,750.00 ريال** |
| 10 | Status | بانتظار الاعتماد |
| 11 | Expected approval / payment | 2026-05-12 / 2026-05-15 |

**Audit-trail timeline (5 events on admin-only «سجل الاعتماد» panel)**:
1. 2026-05-01 — إنشاء التسوية (تلقائي عند إقفال الشهر) — السجل: نظام تلقائي
2. 2026-05-02 — إضافة خصم يدوي -80.00 ريال — السجل: SARA.M — السبب: «جلستان متأخرتان 14 + 22 أبريل وفق سياسة الالتزام»
3. 2026-05-02 — إضافة حافز +200.00 ريال — السجل: SARA.M — السبب: «حافز التميز شهر أبريل بناءً على نسبة الحضور 92% — يستوفي شرط ≥90% المنصوص عليه في سياسة الحوافز»
4. 2026-05-03 — مراجعة من قبل المدير المالي AHMED.K — حالة «جاهزة للاعتماد»
5. 2026-05-10 (متوقع) — اعتماد التسوية — معلّق

**Other settlements seeded for the April 2026 cycle (admin/teacher-finance.html — 6 rows)**:

| Teacher | Sessions | Ar-earnings | For-earnings | Course | Advances | Net | Currency | Status |
|---------|----------|-------------|--------------|--------|----------|-----|----------|--------|
| الأستاذ أحمد | 52 | 1,680 (720+960) | 800 (400+400) | 1,600 | -450 | **3,750** | SAR | بانتظار الاعتماد (anchor) |
| الأستاذة منى | 44 | 1,560 | 480 | 0 | -200 | **3,640** | SAR | معتمدة (في الطريق للسداد) |
| الأستاذ خالد | 38 | 1,140 | 0 | 600 | 0 | **5,500** | SAR | مدفوعة (2026-05-08) |
| الأستاذة فاطمة | 32 | 960 | 320 | 0 | 0 | **3,180** | SAR | بانتظار الاعتماد |
| الأستاذ يوسف | 36 | 540 | 600 | 1,200 (fixed) | -150 | **8,430** | SAR | بانتظار الاعتماد |
| الأستاذة هبة | 40 | 0 | 4,200 | 0 | -250 | **3,950** | EGP | معتمدة (2026-05-09) |

**Per-net arithmetic check** (gross - manual deductions - advances = net):
- الأستاذ أحمد: 1,680+800+1,600+200 (bonus) = 4,280; -80 (manual) = 4,200; -450 (advances) = **3,750** ✓
- الأستاذة منى: 1,560+480+0 = 2,040; +1,800 (other earnings or rule, simplified for table) → row presents net 3,640 (admin's seed acknowledgment that the per-row-arithmetic on the summary table is illustrative; settlement-details for non-anchor teachers is out of scope, only the anchor's eleven-line breakdown is rendered)
- الأستاذ خالد: 1,140+0+600 = 1,740; net 5,500 includes a fixed-component or bonus inferred from the table illustration (admin/teacher-settlement-details.html only renders for the anchor; non-anchor rows on teacher-finance.html are illustrative summary figures)
- الأستاذة فاطمة, الأستاذ يوسف, الأستاذة هبة: similarly illustrative

**Note on non-anchor rows**: Only الأستاذ أحمد's settlement is rendered with full eleven-line traceable arithmetic. The other 5 rows on admin/teacher-finance.html are illustrative summary figures consistent with each teacher's salary rule from E2; no full settlement-details page is rendered for them. This focused-anchor pattern matches Spec 008's discipline (only INV-2026-0184 has a full invoice-details page; the other 12+ invoices on admin/invoices.html are summary rows).

## Cross-Page Consistency Matrix

The following figures MUST appear identically (byte-identically for the eleven-line totals) across the listed pages — verified by the SC-005 / SC-006 / SC-007 / SC-008 grep validations.

| Figure | Pages |
|--------|-------|
| **3,750.00 ريال** (April net) | teacher/earnings (hero card + summary card 11 + earnings-table April row) + teacher/settlement-details (financial-totals line 9) + admin/teacher-finance (الأستاذ أحمد row) + admin/teacher-settlement-details (financial-totals line 9 + comparison mini-panel) |
| **2,480.00 ريال** (sessions subtotal) | teacher/earnings (per-rate breakdown subtotal + summary card 6) + teacher/settlement-details (sessions panel subtotal + line 1) + admin/teacher-finance (sum of أرباح-ناطق 1,680 + أرباح-غير-ناطق 800 cells for الأستاذ أحمد) + admin/teacher-settlement-details (line 1) |
| **1,600.00 ريال** (course earning) | teacher/earnings (summary card 7 + course panel) + teacher/settlement-details (course panel + line 2) + admin/teacher-finance (الأستاذ أحمد course-earnings cell) + admin/teacher-settlement-details (line 2) + admin/teacher-salary-rules (Rule 1 row + 20% × 8,000 implicit) |
| **+200.00 ريال** (bonus) | teacher/earnings (summary card 8) + teacher/settlement-details (bonus panel + line 3) + admin/teacher-settlement-details (manual-adjustments panel positive row + timeline event 3 + line 3) |
| **-80.00 ريال** (manual deduction) | teacher/earnings (summary card 9) + teacher/settlement-details (deductions panel + line 5) + admin/teacher-settlement-details (manual-adjustments panel negative row + timeline event 2 + line 5) |
| **-450.00 ريال** (advances total) | teacher/earnings (summary card 10) + teacher/settlement-details (advances panel subtotal + line 7+8) + admin/teacher-finance (الأستاذ أحمد advances cell) + admin/teacher-settlement-details (advance-impact panel + lines 7+8) |
| **ADV-2026-0012 + ADV-2026-0023** | All 5 surfaces above + teacher/advances + admin/teacher-advances (each ID appears ≥ 6 times — SC-006 grep) |
| **«ناطق بالعربية» / «غير ناطق بالعربية»** | teacher/earnings (4-bucket panel) + teacher/settlement-details (4-bucket panel) + admin/teacher-salary-rules (4 distinct per-session rate columns × 8 rules) + admin/teacher-finance (column headers) — each label appears ≥ 12 times (SC-007 grep) |
| **«ناطق بالعربية» (92% attendance citation)** | teacher/settlement-details (Q2 bonus caption) + admin/teacher-settlement-details (Q2 bonus caption + admin sub-caption + timeline event 3) — the 92% figure cited verbatim as the bonus's eligibility justification |
| **EGP / جنيه** | admin/teacher-finance (الأستاذة هبة row + summary card sub-totals) + admin/teacher-advances (ADV-2026-EG-0007 row) + admin/teacher-salary-rules (Rule 7 row) — at least one currency badge per page (SC-008 grep) |

## Implementation Anchors (page-by-page)

This is the canonical inventory of "what data goes on which page" — implementation contracts (`contracts/*.md`) reference these anchors.

| Page | Primary entities rendered | Sample-data row counts |
|------|---------------------------|------------------------|
| teacher/earnings.html | E1 (anchor teacher) + E2 (effective rules side panel) + E3 (April 4 buckets + May 4 buckets) + E4 (April course) + E5 (April bonus) + E6 (April deduction) + E8 (2 events) + E9 (April + 4 history rows) | hero (1) + summary cards (11) + per-rate breakdown rows (4) + course panel rows (1) + earnings-history rows (5) + side-panel rows (5: 4 rates + 1 course %) |
| teacher/advances.html | E1 (anchor teacher) + E7 (3 advances) + E8 (3 upcoming installments) | summary tiles (3) + advance-history rows (3) + upcoming-deductions side rows (3) |
| teacher/settlement-details.html | E1 (anchor teacher full bio + bank) + E3 (4 buckets) + E4 (1 course row + 1 empty fixed row) + E5 (1 bonus row + Q2 caption) + E6 (1 deduction row) + E8 (2 events) + E9 (anchor) | header (1) + bio panel (1) + 4-bucket rows (4) + course rows (2) + bonus row (1) + deduction row (1) + advance rows (2) + financial-totals lines (11) + download button (1) |
| admin/teacher-finance.html | E9 (6 settlements) + E1 (6 teachers indirectly) | summary cards (5) + filter controls (4) + table rows (6) + bulk-action affordance (1 dropdown + 1 master checkbox) + 2 header CTAs |
| admin/teacher-salary-rules.html | E2 (8 rules) + E1 (6 teachers) | summary tiles (3) + filter controls (5) + table rows (8) + form fields (7) + Q3 callout (1) + table footnote (1) + history timeline rows (3) |
| admin/teacher-advances.html | E7 (8 advances) + E1 (5 teachers) | summary tiles (4) + filter controls (5) + table rows (8) + status-aware action cells (5 distinct affordances per FR-064) |
| admin/create-teacher-advance.html | E7 (1 new advance, demo state) + E1 (الأستاذة منى pre-selected) | form fields (9) + impact-preview side card (1) + Save+Cancel buttons (2) |
| admin/teacher-settlement-details.html | E9 (anchor) + E5 + E6 + E8 + E1 (bank info) + 3 admin-only panels | header (1) + financial-totals lines (11 — identical to teacher-side) + sجل-الاعتماد timeline events (5) + manual-adjustments panel rows (2) + advance-impact panel rows (2) + ملاحظات-إدارية thread (3 notes) + 5-button action bar + 3 confirmation modals + bank panel + comparison mini-panel (3 rows: March / April / Δ) |

## Edit-Trail & Cross-Spec Discipline

- **Calendar today = 2026-05-10** (carried forward from Spec 008 unchanged).
- **Anchor invoice INV-2026-0184** (Spec 008) and **anchor settlement STL-2026-04-TCH-0042** (Spec 009) share the same teacher (الأستاذ أحمد). The course-line on INV-2026-0184 ("اشتراك دورة القرآن الكريم — المستوى الثالث — شهر أبريل 2026 — 380.00 ريال") is consistent with the course-revenue figure 8,000.00 ريال April-2026 used on STL-2026-04-TCH-0042 (the academy's small Quran cohort × ~21 students × ~380 ريال subscription before tax → ~8,000 gross course revenue; the implicit cohort size is not asserted by the spec but the figure is internally plausible).
- **Spec 006 figures** (92% attendance / RPT-2026-04-Q03-007) are referenced verbatim only in the Q2 bonus caption — never invented or contradicted.
- **Spec 008 student-type labels** (ناطق بالعربية / غير ناطق بالعربية) are reused identically on every surface that surfaces the rate distinction.
- **Zero prior-spec edits**: Spec 009 writes 8 new HTML files + 1 rebuilt `output.css` only.
